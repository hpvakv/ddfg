import { useState } from 'react'
import { FiMenu, FiX, FiMoon, FiSun, FiUser } from 'react-icons/fi'
import '../styles/Header.css'

const Header = ({ isDarkMode, toggleTheme, onMobileAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const navItems = [
    { name: 'Rules', href: '#rules' },
    { name: 'Claims', href: '#claims' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' }
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">Savaan</span>
          <span className="logo-subtitle">सवान</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          
          <button className="auth-button" onClick={onMobileAuthClick} aria-label="Login/Register">
            <FiUser />
            <span>Login/Sign Up</span>
          </button>
          
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header