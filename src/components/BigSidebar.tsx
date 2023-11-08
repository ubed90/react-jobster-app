import { useSelector } from 'react-redux'
import { BigSidebarWrapper } from '../assets/wrappers'
import { RootState } from '../Store'
import { Logo, NavLinks } from '.'

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.user)

  return (
    <BigSidebarWrapper>
      <div
        className={
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </BigSidebarWrapper>
  )
}

export default BigSidebar
