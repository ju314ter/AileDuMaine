import React, {useState} from 'react'
import { Link } from 'gatsby'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import logo from '../img/logo.svg'
import Drawer from '@material-ui/core/Drawer';

const Navbar = ({ show, collapse }) => {

  const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false)
  const toggleMenu = (open) => (event) => {
    setMobileMenuVisibility(open)
  }

  return (
    <nav
      className={`custom-navbar is-transparent ${show ? "" : "hidden-menu"}`}
      role="navigation"
      aria-label="main-navigation"
    >
    {!collapse ? (
      <>
        <div className="left-links is-flex">
          <div className="navlink-wrapper">
            <Link activeClassName="activeLink" className="navlink has-text-white-ter" to="/decouverte">
              Découvrir
            </Link>
          </div>
          <div className="navlink-wrapper">
            <Link activeClassName="activeLink" className="navlink has-text-white-ter" to="/materiel">
              Materiel
            </Link>
          </div>
          <div className="navlink-wrapper">
            <Link activeClassName="activeLink" className="navlink has-text-white-ter" to="/envol">
              S'envoler
            </Link>
          </div>
        </div>
        <div className="middle-links">
          <Link className="has-text-white-ter" to="/">
            <img src={logo} alt="Logo" style={{ width: 65 }} />
          </Link>
        </div>
        <div className="right-links is-flex flex-end" style={{cursor: 'pointer'}}>
          <div className="navlink-wrapper">
            <Link to="/modalactu" activeClassName="activeLink" className="navlink has-text-white-ter"
              state={{
                modal: true
              }}>
              Actualités
            </Link>
          </div>
          <div className="navlink-wrapper">
            <Link to="/tarif" activeClassName="activeLink" className="navlink has-text-white-ter">
              Tarifs
            </Link>
          </div>
          <div className="navlink-wrapper">
            <Link to="/faq" activeClassName="activeLink" className="navlink has-text-white-ter">
              F.A.Q
            </Link>
          </div>
        </div>
      </>
    )
    :
    (
      <>
        <Link className="menu-titre" to="/">
          <img src={logo} alt="Logo" style={{ width: 65 }} />
        </Link>
        <MenuRoundedIcon className="menu-icon" onClick={toggleMenu(true)}/>
        <Drawer anchor='bottom' open={mobileMenuVisibility} onClose={toggleMenu(false)}>
          <div className="drawer-inner">
            <Link activeClassName="activeLink" className="navlink has-text-white-ter" to="/decouverte" onClick={toggleMenu(false)}>
              Découvrir
            </Link>
            <Link activeClassName="activeLink" className="navlink has-text-white-ter" to="/materiel" onClick={toggleMenu(false)}>
              Materiel
            </Link>
            <Link activeClassName="activeLink" className="navlink has-text-white-ter" to="/envol" onClick={toggleMenu(false)}>
              S'envoler
            </Link>
            <Link to="/modalactu" activeClassName="activeLink" className="navlink has-text-white-ter" onClick={toggleMenu(false)}
              state={{
                modal: true
              }}>
              Actualités
            </Link>
            <Link to="/tarif" activeClassName="activeLink" className="navlink has-text-white-ter" onClick={toggleMenu(false)}>
              Tarifs
            </Link>
            <Link to="/faq" activeClassName="activeLink" className="navlink has-text-white-ter" onClick={toggleMenu(false)}>
              F.A.Q
            </Link>
          </div>
        </Drawer>
      </>
    )}
    </nav>
  )
}

export default Navbar
