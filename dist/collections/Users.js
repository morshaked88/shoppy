"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrimaryActionEmail_1 = require("../components/emails/PrimaryActionEmail");
var adminAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin")
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
var Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "Verify Email",
                    buttonText: "Verify Email",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token),
                });
            },
        },
    },
    access: {
        read: adminAndUser,
        create: function () { return true; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: function () { return false; },
            },
            relationTo: "products",
            hasMany: true,
            type: "relationship",
        },
        {
            name: "product_files",
            label: "Product Files",
            admin: {
                condition: function () { return false; },
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
exports.default = Users;
