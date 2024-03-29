module.exports = [
  { type: "doc", id: "api/flethy-execution-platform" },
  {
    type: "category",
    label: "Workflows",
    link: {
      type: "generated-index",
      title: "Workflows",
      slug: "/category/api/workflows",
    },
    items: [
      {
        type: "doc",
        id: "api/put",
        label: "Add or update a workflow",
        className: "api-method put",
      },
      {
        type: "doc",
        id: "api/list",
        label: "List Workflows",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/get",
        label: "Get Workflow",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/delete",
        label: "Delete Workflow",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "api/start",
        label: "Start instance",
        className: "api-method post",
      },
    ],
  },
];
