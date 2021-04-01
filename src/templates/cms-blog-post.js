import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CmsBlogPostTemplate = ({ data, location }) => {
  const story = data.datoCmsStoryPage
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const image = getImage(story.cover)
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={story.title}
        description={story.bodyTextNode.childMarkdownRemark.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{story.title}</h1>
          <p>{story.date + ` • ` + story.bodyTextNode.childMarkdownRemark.timeToRead + ` min read`}</p>
          {/* Does it have cover */ image ? 
            <GatsbyImage image={image} alt={story.cover.alt} /> : null
          }          
        </header>        
        {/* TODO: Use proper CSS in cover images */}
        { image ? <br /> : null }
        <section
          dangerouslySetInnerHTML={{ __html: story.bodyTextNode.childMarkdownRemark.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio className="blog-post-bio"/>
        </footer>
        <hr />
      </article>
      <nav className="blog-post-nav">
        <h4>Continue reading</h4>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/" + previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/" + next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default CmsBlogPostTemplate

export const pageQuery = graphql`
  query CmsBlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    datoCmsStoryPage(id: { eq: $id }){
      id
      slug
      title
      cover {
        alt
        gatsbyImageData(placeholder: BLURRED, width: 632, forceBlurhash: false,)
      }
      date(formatString: "MMMM DD, YYYY")
      bodyTextNode {
        childMarkdownRemark {
          excerpt(pruneLength: 160)
          html
          timeToRead
        }
      }
    }
    previous: datoCmsStoryPage(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: datoCmsStoryPage(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`
