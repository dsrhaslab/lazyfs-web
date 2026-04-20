// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LazyFS',
  tagline: 'A FUSE Filesystem with an internal dedicated page cache, which can be used to simulate data loss on unsynced writes',
  favicon: 'img/favicon.ico',

  trailingSlash: false, // Optional: cleaner URLs


  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dsrhaslab.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/lazyfs-web/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dsrhaslab', // Usually your GitHub org/user name.
  projectName: 'lazyfs-web', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: [
            'en',
            'ar',
            'de',
            'es',
            'fr',
            'hi',
            'it',
            'ko',
            'pl',
            'pt',
            'ru',
            'sv',
            'ta',
            'uk',
            'vi',
            'zh',
        ],
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
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'bugs',                                // unique ID
        path: 'bugs',                              // path to the folder
        routeBasePath: 'bugs',                     // URL path = /bugs
        sidebarPath: require.resolve('./bugsSidebar.js'), // separate sidebar
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      image: 'img/LazyFS.png',
      navbar: {
        title: 'LazyFS',
        // logo: {
        //   alt: 'LazyFS Logo',
        //   // src: 'img/logo.svg',
        //   // src: 'img/LazyFS.png',
        // },
        items: [
          {
            href: 'https://github.com/dsrhaslab/lazyfs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark', // or 'light'
        // links: [

        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/dsrhaslab/lazyfs',
        //       },
        //       {
        //         label: 'Issues',
        //         href: 'https://github.com/dsrhaslab/lazyfs/issues',
        //       },
        //     ],
        //   },

        // ],
        copyright: `© ${new Date().getFullYear()} DSR HASLab.
        Built with Docusaurus. Licensed under the MIT License.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

// // @ts-check
// // `@type` JSDoc annotations allow editor autocompletion and type checking
// // (when paired with `@ts-check`).
// // There are various equivalent ways to declare your Docusaurus config.
// // See: https://docusaurus.io/docs/api/docusaurus-config

// import {themes as prismThemes} from 'prism-react-renderer';

// // This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// /** @type {import('@docusaurus/types').Config} */
// const config = {
//   title: 'LazyFS',
//   tagline: 'A FUSE Filesystem with an internal dedicated page cache, which can be used to simulate data loss on unsynced writes',
//   favicon: 'img/favicon.ico',

//   trailingSlash: false, // Optional: cleaner URLs


//   // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
//   future: {
//     v4: true, // Improve compatibility with the upcoming Docusaurus v4
//   },

//   // Set the production url of your site here
//   url: 'https://dsrhaslab.github.io',
//   // Set the /<baseUrl>/ pathname under which your site is served
//   // For GitHub pages deployment, it is often '/<projectName>/'
//   baseUrl: '/lazyfs-web/',

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: 'dsrhaslab', // Usually your GitHub org/user name.
//   projectName: 'lazyfs-web', // Usually your repo name.

//   onBrokenLinks: 'throw',
//   onBrokenMarkdownLinks: 'warn',

//   // Even if you don't use internationalization, you can use this field to set
//   // useful metadata like html lang. For example, if your site is Chinese, you
//   // may want to replace "en" with "zh-Hans".
//   i18n: {
//     defaultLocale: 'en',
//     locales: [
//             'en',
//             'ar',
//             'de',
//             'es',
//             'fr',
//             'hi',
//             'it',
//             'ko',
//             'pl',
//             'pt',
//             'ru',
//             'sv',
//             'ta',
//             'uk',
//             'vi',
//             'zh',
//         ],
//   },

//   presets: [
//     [
//       'classic',
//       /** @type {import('@docusaurus/preset-classic').Options} */
//       ({
//         docs: {
//           sidebarPath: './sidebars.js',
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
//         },
//         blog: {
//           showReadingTime: true,
//           feedOptions: {
//             type: ['rss', 'atom'],
//             xslt: true,
//           },
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
//           // Useful options to enforce blogging best practices
//           onInlineTags: 'warn',
//           onInlineAuthors: 'warn',
//           onUntruncatedBlogPosts: 'warn',
//         },
//         theme: {
//           customCss: './src/css/custom.css',
//         },
//       }),
//     ],
//   ],
//   plugins: [
//     [
//       '@docusaurus/plugin-content-docs',
//       {
//         id: 'bugs',                                // unique ID
//         path: 'bugs',                              // path to the folder
//         routeBasePath: 'bugs',                     // URL path = /bugs
//         sidebarPath: require.resolve('./bugsSidebar.js'), // separate sidebar
//       },
//     ],
//   ],
//   themeConfig:
//     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
//     ({
//       // Replace with your project's social card
//       // image: 'img/docusaurus-social-card.jpg',
//       image: 'img/LazyFS.png',
//       navbar: {
//         title: 'LazyFS',
//         logo: {
//           alt: 'LazyFS Logo',
//           src: 'img/logo.svg',
//         },
//         items: [
//           { to: '/docs/intro', label: 'Docs', position: 'left' },
//           { to: '/bugs/intro', label: 'Bugs', position: 'left' },
//           { to: '/blog', label: 'Blog', position: 'left' },
//           {
//             href: 'https://github.com/dsrhaslab/lazyfs',
//             label: 'GitHub',
//             position: 'right',
//           },
//         ],
//       },
//       footer: {
//         style: 'dark', // or 'light'
//         links: [
//           {
//             title: 'Docs',
//             items: [
//               {
//                 label: 'How it works',
//                 to: '/docs/category/how-it-works',
//               },
//               {
//                 label: 'Getting Started',
//                 to: '/docs/category/getting-started',
//               },
//             ],
//           },
//           {
//             title: 'Community',
//             items: [
//               {
//                 label: 'GitHub',
//                 href: 'https://github.com/dsrhaslab/lazyfs',
//               },
//               {
//                 label: 'Issues',
//                 href: 'https://github.com/dsrhaslab/lazyfs/issues',
//               },
//             ],
//           },
//           {
//             title: 'More',
//             items: [
//               {
//                 label: 'Blog',
//                 to: '/blog',
//               },
//               // {
//               //   label: 'Publications',
//               //   to: '/docs/publications',
//               // }
//             ],
//           },
//         ],
//         copyright: `© ${new Date().getFullYear()} DSR HASLab.
//         Built with Docusaurus. Licensed under the MIT License.`,
//       },
//       prism: {
//         theme: prismThemes.github,
//         darkTheme: prismThemes.dracula,
//       },
//     }),
// };

// export default config;
