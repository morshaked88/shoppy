import { CollectionConfig, Access } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (user?.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "All orders placed by you",
  },
  access: {
    read: yourOwn,
    update: ({req}) => req.user?.role === "admin",
    create: ({req}) => req.user?.role === "admin",
    delete: ({req}) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user?.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
    },
  ],
};

export default Orders;