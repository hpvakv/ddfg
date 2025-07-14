import { useState, useEffect, useRef } from 'react'
import '../styles/StatsSection.css'

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    { label: 'Total Registered Users', value: '15,420+', icon: '👥' },
    { label: 'Total Amount Helped', value: '₹24.5 Crores', icon: '💰' },
    { label: 'Active Support Requests', value: '89', icon: '📋' },
    { label: 'Success Stories', value: '2,847', icon: '✅' },
    { label: 'Government Departments', value: '45+', icon: '🏛️' },
    { label: 'Average Response Time', value: '24 Hours', icon: '⚡' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <div className="stats-header">
          <h2>Making a Real Impact</h2>
          <p>See how Savaan is transforming lives across government departments</p>
        </div>
        
        <div className="marquee-container">
          <div className={`marquee-track ${isVisible ? 'animate' : ''}`}>
            {[...stats, ...stats].map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="live-indicator">
          <div className="pulse-dot"></div>
          <span>Live Data • Updated Every Hour</span>
        </div>
      </div>
    </section>
  )
}

export default StatsSection