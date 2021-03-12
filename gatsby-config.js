module.exports = {
  siteMetadata: {
    title: `Zensemaker Blog`,
    author: {
      name: `J. Antonio Avalos`,
      summary: `UX Architect writing about productivity, strategy and communication skills for creatives`,
    },
    description: `Short-form stories about productivity, strategy and communication skills. New posts every other day.`,
    siteUrl: `https://zensemaker.gatsbyjs.io/`,
    social: {
      twitter: `jantonioavalos`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
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
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
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
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zensemaker Blog`,
        short_name: `Zensemaker`,
        start_url: `/`,
        background_color: `#FDFBfA`,
        theme_color: `#E16259`,
        display: `minimal-ui`,
        icon: `src/images/Zensemaker.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
    resolve: `gatsby-source-datocms`,
    options: {
      // You can find your read-only API token under the Settings > API tokens
      // section of your administrative area. Make sure to grant both CDA and CMA permissions.
      apiToken: `945916afc25f10a2ab7d0eb53060f4`,

      // The project environment to read from. Defaults to the primary environment:
      environment: `main`,

      // If you are working on development/staging environment, you might want to
      // preview the latest version of records instead of the published one:
      previewMode: false,

      // Disable automatic reloading of content when some change occurs on DatoCMS:
      disableLiveReload: false,

      // Custom API base URL (most don't need this)
      // apiUrl: 'https://site-api.datocms.com',

      // Setup locale fallbacks
      // In this example, if some field value is missing in Italian, fall back to English
      localeFallbacks: {
        it: ['en'],
      },
    },
  },
  ],
}
