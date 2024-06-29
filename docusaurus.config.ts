import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Security E",
  tagline: "",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://security-e.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "security-e", // Usually your GitHub org/user name.
  projectName: "security-e.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-tw",
    locales: ["zh-tw"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          blogSidebarTitle: "最近貼文",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Security E",
      logo: {
        alt: "",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "文件",
        },
        { to: "/blog", label: "部落格", position: "left" },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://github.com/orgs/security-e",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "目錄",
          items: [
            {
              label: "文件",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "更多",
          items: [
            {
              label: "部落格",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/security-e",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Security E. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oceanicNext,
      darkTheme: prismThemes.oceanicNext,
      additionalLanguages: ["java"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
