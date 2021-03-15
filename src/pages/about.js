import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data, location }) => {
  const page = data.datoCmsAboutPage
  const siteTitle = data.site.siteMetadata?.title || `Title`

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
          <h1 itemProp="headline">{page.title}</h1>
          <img src={page.cover.url} alt={page.cover.alt} width="632px"/>
          {/* <StaticImage
            //className="bio-avatar"
            layout="fixed"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../images/jantonioavalos-picture-S20.jpg"
            width={632}
            //height={50}
            quality={95}
            alt={page.cover.alt}
          /> */}
        </header>
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
      }
    }
    datoCmsAboutPage {
      title
      cover {
        alt
        url
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
