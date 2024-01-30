import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>verify account</a>
        `;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      relationTo: "products",
      hasMany: true,
      type: "relationship",
    },
    {
      name: "product_files",
      label: "Product Files",
      admin: {
        condition: () => false,
      },
      relationTo: "product_files",
      hasMany: true,
      type: "relationship",
    },
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};

export default Users;
