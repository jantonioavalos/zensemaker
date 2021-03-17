import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data, location }) => {
  const page = data.datoCmsAboutPage
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const image = getImage(page.cover)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={page.title}
        description={page.bodyTextNode.childMarkdownRemark.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/AboutPage"
      >
        <header>
          <h1 itemProp="headline" className="main-heading">{page.title}</h1>
          <br />
          <GatsbyImage
            image={image}
            alt={page.cover.alt}
          />
        </header>
        <br />
        <section
          dangerouslySetInnerHTML={{ __html: page.bodyTextNode.childMarkdownRemark.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    datoCmsAboutPage {
      title
      cover {
        alt
        gatsbyImageData(placeholder: BLURRED, width: 632)
      }
      bodyTextNode {
        childMarkdownRemark {
          html
          excerpt
        }
      }
    }
  }
`
