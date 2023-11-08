import React from 'react'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

interface INavLinksProps {
  toggleSidebar?(): void
}

const NavLinks: React.FC<INavLinksProps> = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map(({ icon, id, path, text }) => {
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }}
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
