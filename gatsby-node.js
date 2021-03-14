const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const cmsBlogPost = path.resolve(`./src/templates/cms-blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        localPosts: allMarkdownRemark(
          sort: {fields: [frontmatter___date], order: ASC},
          filter: {frontmatter: {date: {ne: null}}},
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        datoCmsPages: allDatoCmsStoryPage{
          nodes {
            id
            slug            
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const localPosts = result.data.localPosts.nodes
  const datoCmsPages = result.data.datoCmsPages.nodes


  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (localPosts.length > 0) {
    localPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : localPosts[index - 1].id
      const nextPostId = index === localPosts.length - 1 ? null : localPosts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Create blog posts -called Stories– pages from DatoCMS

  if (datoCmsPages.length > 0) {
    datoCmsPages.forEach((post, index) => {
      const previousPostId = index === 0 ? null : datoCmsPages[index - 1].id
      const nextPostId = index === datoCmsPages.length - 1 ? null : datoCmsPages[index + 1].id

      createPage({
        path: post.slug,
        component: cmsBlogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  //The following functions will retrieve file names and then asign value as slug
  if (node.internal.type === `MarkdownRemark` && !node.parent.includes('DatoCmsTextNode')) {
    //DatoCMS posts are not local files, so this excludes nodes with DatoCMS parents 
  
      const value = createFilePath({ node, getNode })

      createNodeField({
        name: `slug`,
        node,
        value,
      })
  } 
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
