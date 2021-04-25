module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: false,
    PARALLEL_SOURCING: false,
    FAST_DEV: false
  },
  siteMetadata: {
    title: "Aile du Maine Planneur",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          indentedSyntax: false,
        },
      },
    },
    "gatsby-plugin-image",
    `gatsby-plugin-scroll-reveal`,
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-modal-routing-3",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: "./static/img",
        name: 'uploads',
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
