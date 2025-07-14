import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import '../styles/Footer.css'

const Footer = () => {
  const quickLinks = [
    { name: 'Rules & Guidelines', href: '#rules' },
    { name: 'How to Claim', href: '#claims' },
    { name: 'About Savaan', href: '#about' },
    { name: 'Success Stories', href: '#stories' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Privacy Policy', href: '#privacy' }
  ]

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiInstagram, href: '#', label: 'Instagram' }
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription')
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <span className="logo-text">Savaan</span>
              <span className="logo-subtitle">सवान</span>
            </div>
            <p className="brand-description">
              A platform created by government employees, for government employees. 
              Standing together in times of loss, supporting families with dignity and care.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="social-link"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <div>
                  <span className="contact-label">Email</span>
                  <a href="mailto:support@savaan.gov.in" className="contact-value">
                    support@savaan.gov.in
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <div>
                  <span className="contact-label">Helpline</span>
                  <a href="tel:+911234567890" className="contact-value">
                    +91 1234-567-890
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <div>
                  <span className="contact-label">Address</span>
                  <span className="contact-value">
                    New Delhi, India 110001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-description">
              Subscribe to receive updates about new features, success stories, and important announcements.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </div>
            </form>
            <div className="newsletter-note">
              <small>
                * We respect your privacy. Unsubscribe at any time.
              </small>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 Savaan. All rights reserved.</p>
              <p className="government-note">
                A Government of India Initiative
              </p>
            </div>
            
            <div className="footer-bottom-links">
              <a href="#terms" className="bottom-link">Terms of Service</a>
              <a href="#privacy" className="bottom-link">Privacy Policy</a>
              <a href="#accessibility" className="bottom-link">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer