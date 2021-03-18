/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FaTwitterSquare, FaMedium, FaLinkedin, FaGithub } from 'react-icons/fa'
import { IconContext } from "react-icons";

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
            A blog written by <Link to={`/about`} itemProp="url">{author.name}<br/></Link>{author.summary}                    
            <br />
            <a href={`https://twitter.com/${social?.handle || ``}`} target="_blank" rel="noreferrer">
              <IconContext.Provider value={{ className: 'react-icons-bio' }}><FaTwitterSquare /></IconContext.Provider>
            </a>
            <a href={`https://${social?.handle + `.` || ``}medium.com/`} target="_blank" rel="noreferrer">
              <IconContext.Provider value={{ className: 'react-icons-bio' }}><FaMedium /></IconContext.Provider>
            </a>
            <a href={`https://linkedin.com/in/${social?.handle || ``}`} target="_blank" rel="noreferrer">
              <IconContext.Provider value={{ className: 'react-icons-bio' }}><FaLinkedin /></IconContext.Provider>
            </a>
            <a href={`https://github.com/${social?.handle || ``}`} target="_blank" rel="noreferrer">
              <IconContext.Provider value={{ className: 'react-icons-bio' }}><FaGithub /></IconContext.Provider>
            </a>
          </p>
      )}
    </div>
  )
}

export default Bio
