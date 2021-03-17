import * as React from "react"
import { Link } from "gatsby"
import ThemesToggler from "./themes-toggler"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>        
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        <ThemesToggler/>
      </header>
      <main>{children}</main>
      <footer>
        Zensemaker © {new Date().getFullYear()}. All rights reserved. Built by
        {` `}
        <a href="https://jantonioavalos.com">@jantonioavalos</a>
      </footer>
    </div>
  )
}

export default Layout
