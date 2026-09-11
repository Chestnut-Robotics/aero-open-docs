// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aero Hand',  
  tagline: 'Empowering Physical AI with the Best Dexterous Hands',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.tetheria.ai/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'chestnut-robotics', // Usually your GitHub org/user name.
  projectName: 'aero-open-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/chestnut-robotics/aero-open-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/chestnut-robotics/aero-open-docs/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.png',
      algolia: {
        appId: '2S8W7KORIR',
        apiKey: '303872aa28d220970de83fdd162da887',
        indexName: 'docs.tetheria.ai',
        contextualSearch: true,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Chestnut Robotics Logo',
          src: 'img/Logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            type: 'search',
            position: 'right',
          }
        // TODO: uncomment this when we have a blog
        //   {to: '/blog', label: 'Blog', position: 'left'},
        //   {
        //     href: 'https://github.com/facebook/docusaurus',
        //     label: 'GitHub',
        //     position: 'right',
        //   },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // TODO: uncomment this when we have a docs
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
              {
                label: 'Aero Hand Open',
                href: 'https://chestnut-robotics.github.io/aero-hand-open/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/ZQKWK7NebQ',
              },
              {
                label: 'X',
                href: 'https://x.com/TetherIA_ai',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/@TetherIA_ai',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/tetheria/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'Homepage',
                href: 'https://chestnut.bot/',
              },
              {
                label: 'Shop',
                href: 'https://shop.tetheria.ai',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/chestnut-robotics',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Chestnut Robotics, Inc. (formerly TetherIA)`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
