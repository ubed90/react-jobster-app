import { FaTimes } from 'react-icons/fa'
import { SmallSidebarWrapper } from '../assets/wrappers'
import { Logo, NavLinks } from '.'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { toggleSidebar } from '../features/user'

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <SmallSidebarWrapper>
      <div className={`sidebar-container ${isSidebarOpen && 'show-sidebar'}`}>
        <div className="content">
          <button type="button" onClick={toggle} className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
            <NavLinks toggleSidebar={toggle} />
          </header>
        </div>
      </div>
    </SmallSidebarWrapper>
  )
}

export default SmallSidebar
