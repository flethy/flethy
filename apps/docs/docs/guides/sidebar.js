module.exports = [
  { type: "doc", id: "guides/intro" },
  {
    type: "category",
    label: "Components",
    link: {
      type: "generated-index",
      title: "Components",
      slug: "/category/guides/components",
    },
    items: [
      {
        type: "doc",
        id: "guides/components/connectors",
      },
      {
        type: "doc",
        id: "guides/components/flow",
      },
    ],
  },
  {
    type: "category",
    label: "Flows",
    link: {
      type: "generated-index",
      title: "Flows",
      slug: "/category/guides/flows",
    },
    items: [
      {
        type: "doc",
        id: "guides/flows/envvars-and-secrets",
      },
      {
        type: "doc",
        id: "guides/flows/next-node",
      },
      {
        type: "doc",
        id: "guides/flows/assignments",
      },
      {
        type: "doc",
        id: "guides/flows/none-kind",
      },
      {
        type: "doc",
        id: "guides/flows/examples",
      },
    ],
  },
  {
    type: "category",
    label: "Tutorials",
    link: {
      type: "generated-index",
      title: "Tutorials",
      slug: "/category/guides/tutorials",
    },
    items: [
      {
        type: "doc",
        id: "guides/tutorials/twitter-thread",
      },
    ],
  },
];
