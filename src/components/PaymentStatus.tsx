"use client";

import { trpc } from "@/trpc/client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

type IPaymentStatusProps = {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
};

const PaymentStatus: FC<IPaymentStatusProps> = ({
  orderEmail,
  orderId,
  isPaid,
}) => {
  const router = useRouter();
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    {
      orderId,
    },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) {
      router.refresh();
    }
  }, [data?.isPaid, router]);

  return (
    <div className="mt-16 grid  gap-x-4 text-sm text-gray-600 grid-cols-1 grid-rows-2">
      <div>
        <p className="font-medium text-gray-900">Shipping to</p>
        <p>{orderEmail}</p>
      </div>
      <div>
        <p className="font-medium text-gray-900 mt-4">Order Status</p>
        <p>{isPaid ? "Payment successful" : "Pending Payment"}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;
