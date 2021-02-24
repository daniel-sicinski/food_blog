import React from "react"
import { NavLinks } from "../NavLinks/NavLinks"
import { AiOutlineClose } from "react-icons/ai"
import { NavHeder } from "../NavHeader/NavHeder"
// @ts-ignore
import logoLarge from "../../../assets/logo-primary-large.svg"

type SidebarProps = {
  isOpen: boolean
  closeSidebar: () => void
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({
  isOpen,
  closeSidebar,
}) => {
  const sidebarClasses = ["sidebar", isOpen ? "sidebar--visible" : ""].join(" ")

  return (
    <aside className={sidebarClasses}>
      <section className="section-center sidebar__section">
        <NavHeder logo={logoLarge}>
          <button onClick={() => closeSidebar()} className="sidebar__close-btn">
            <AiOutlineClose />
          </button>
        </NavHeder>
        <div>
          <NavLinks className={"sidebar__nav-links"} />
        </div>
      </section>
    </aside>
  )
}
