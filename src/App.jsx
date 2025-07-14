import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FounderSection from './components/FounderSection'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showMobileAuth, setShowMobileAuth] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }
  
  const handleMobileAuthClick = () => {
    setShowMobileAuth(true)
  }

  return (
    <div className="App">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onMobileAuthClick={handleMobileAuthClick}
      />
      <main>
        <HeroSection 
          showMobileAuth={showMobileAuth} 
          setShowMobileAuth={setShowMobileAuth}
        />
        <StatsSection />
        <FounderSection />
      </main>
      <Footer />
    </div>
  )
}

export default App