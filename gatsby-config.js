module.exports = {
  siteMetadata: {
    title: `Zensemaker`,
    author: {
      name: `J. Antonio Avalos`,
      summary: `Productivity, strategy and communication skills for creatives.`,
    },
    description: `Short-form stories about productivity, strategy and communication skills. New posts every other day.`,
    siteUrl: `https://blog.jantonioavalos.com/`,
    social: {
      handle: `jantonioavalos`,
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
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: [],
        excludePaths: ["/"],
        height: 4,
        prependToBody: false,
        color: `#4576c5`,
        footerHeight: 0,
        headerHeight: 0,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,    
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-MYG8PB533X", // Google Analytics / GA
          ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {          
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
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
            serialize: ({ query: { site, allDatoCmsStoryPage } }) => {
              return allDatoCmsStoryPage.nodes.map(node => {
                let datoCmsFrontmatter = {
                  "title": node.title, 
                  "date": node.date
                }
                return Object.assign({}, datoCmsFrontmatter, {
                  description: node.bodyTextNode.childMarkdownRemark.excerpt,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{ "content:encoded": node.bodyTextNode.childMarkdownRemark.html }],
                })
              })
            },
            query: `
              {
                allDatoCmsStoryPage {
                  nodes {
                    slug
                    date(formatString: "MMMM DD, YYYY")
                    title
                    bodyTextNode {
                      childMarkdownRemark {
                        excerpt
                        html
                      }
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
        name: `Zensemaker`,
        short_name: `Zensemaker`,
        start_url: `/`,
        background_color: `#F4F9FF`,
        theme_color: `#4576c5`,
        display: `minimal-ui`,
        icon: `src/images/Zensemaker.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://blog.jantonioavalos.com`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    'gatsby-plugin-dark-mode',
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
