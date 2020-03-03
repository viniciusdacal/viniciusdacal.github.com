module.exports = {
  siteMetadata: {
    title: `Vinicius Dacal`,
    author: `Vinicius Dacal`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `vinicius_dacal`,
      instagram: 'vinicius.dacal',
      youtube: 'UClivdzft5YgnZfindGaLYxg',
      linkedin: 'viniciusdacal',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              wrapperStyle: fluidResult => fluidResult.presentationWidth < 960 ? '' : 'margin-left: -20%; margin-right: -20%;',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '197317508026813',
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://viniciusdacal.us19.list-manage.com/subscribe/post?u=5e4a2f5bc0af35d1027bc0805&amp;id=7dee1a7511',
      },
    }
    //`gatsby-plugin-netlify-cms`,
    // {
    //   resolve: 'gatsby-plugin-netlify-cms',
    //   // manualInit: true,
    //   options: {
    //     modulePath: `${__dirname}/src/cms/cms.js`,
    //   },
    // },
    // 'gatsby-plugin-netlify', // make sure to keep it last in the array
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
