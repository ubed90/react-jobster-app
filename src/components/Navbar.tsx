import { FaAlignLeft, FaCaretDown, FaHome, FaUserCircle } from 'react-icons/fa'
import { NavbarWrapper } from '../assets/wrappers'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { Logo } from '.'
import { clearStore, logoutUser, toggleSidebar } from '../features/user'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  // * Toggle Logout Dropdown
  const [showLogout, setShowLogout] = useState<boolean>(false)

  // * Toggle Func
  const toggle = () => {
    dispatch(toggleSidebar())
  }

  const navigate = useNavigate()

  return (
    <NavbarWrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout && 'show-dropdown'}`}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore('User Logged out Successfully!'))
                return navigate('/landing')
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  )
}

export default Navbar
