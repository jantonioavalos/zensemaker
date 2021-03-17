import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaMoon } from 'react-icons/fa';
import { IoSunnySharp } from 'react-icons/io5';
import { IconContext } from "react-icons";
import Toggle from 'react-toggle'

import "react-toggle/style.css"
class ThemesToggler extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <Toggle
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
              className='custom-classname'
              icons={{
                checked: <IconContext.Provider value={{ className: 'react-icons-toggler' }}><IoSunnySharp /></IconContext.Provider>,
                unchecked: <IconContext.Provider value={{ className: 'react-icons-toggler' }}><FaMoon /></IconContext.Provider>,
              }}
            />{' '}
            {/* <span>Theme</span> */}
          </label>          
        )}
      </ThemeToggler>
    )
  }
}

export default ThemesToggler