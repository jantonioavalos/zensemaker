/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            handle
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/jantonioavalos-picture-S20.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <Link to={`/about`} itemProp="url">{author.name + `. `}</Link>{author?.summary || null}
          {` Follow him on `} 
          <a href={`https://twitter.com/${social?.handle || ``}`} target="_blank" rel="noreferrer">
            Twitter
          </a>
          {`, `} 
          <a href={`https://${social?.handle + `.` || ``}medium.com/`} target="_blank" rel="noreferrer">
            Medium
          </a>
          {`, `} 
          <a href={`https://linkedin.com/in/${social?.handle || ``}`} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {`, or  `} 
          <a href={`https://github.com/${social?.handle || ``}`} target="_blank" rel="noreferrer">
            Github 
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
