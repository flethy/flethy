// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "flethy",
  tagline:
    "Integrate with over 300 services without further dependencies for free",
  url: "https://flethy.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.webp",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "flethy", // Usually your GitHub org/user name.
  projectName: "flethy", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/flethy/flethy/tree/main/apps/docs",
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi-docs
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/flethy/flethy/tree/main/apps/docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "apiDocs",
        docsPluginId: "classic",
        config: {
          flethyapi: {
            // Note: petstore key is treated as the <id> and can be used to specify an API doc instance when using CLI commands
            specPath: "openapi/swagger.json", // Path to designated spec file
            outputDir: "docs/api", // Output directory for generated .mdx docs
            downloadUrl: "/openapi.json",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
          // burgers: {
          //   specPath: "examples/food/burgers/openapi.yaml",
          //   outputDir: "api/food/burgers",
          // },
        },
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"], // Allows use of @theme/ApiItem and other components

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "flethy",
        logo: {
          alt: "flethy logo",
          src: "img/favicon.webp",
        },
        items: [
          {
            type: "doc",
            docId: "guides/intro",
            position: "left",
            label: "Guides",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            type: "doc",
            label: "API",
            position: "left",
            docId: "api/flethy-execution-platform",
          },
          {
            type: "doc",
            label: "Integrations",
            position: "left",
            docId: "integrations/start",
          },
          {
            href: "https://github.com/flethy/flethy",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/guides/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/flethy",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/flethycom",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "OpenAPI Spec",
                href: "https://docs.flethy.com/openapi.json",
              },
              {
                label: "GitHub",
                href: "https://github.com/flethy/flethy",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} flethy. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
