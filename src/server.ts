import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import nextBuild from "next/dist/build";
import path from "path";
import { stripeWebHookHandler } from "./webhook";
import { PayloadRequest } from "payload/types";
import { parse } from "url";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

export type WebHookRequest = IncomingMessage & { rawBody: Buffer };

const start = async () => {
  const webHookMiddleware = bodyParser.json({
    verify: (req: WebHookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.post("/api/webhooks/stripe", webHookMiddleware, stripeWebHookHandler);

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  const cartRouter = express.Router();

  cartRouter.use(payload.authenticate);

  cartRouter.get("/", async (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) return res.redirect(`/sign-in?origin=cart`);

    const parsedUrl = parse(req.url, true);

    return nextApp.render(req, res, "/cart", parsedUrl.query);
  });

  app.use("/cart", cartRouter);
  
  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js production build started`);

      //@ts-expect-error
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    });

    return;
  }

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    app.listen(PORT, () => {
      payload.logger.info(`next.js started`);

      app.listen(PORT, () => {
        payload.logger.info(
          `next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
        );
      });
    });
  });
};
start();
