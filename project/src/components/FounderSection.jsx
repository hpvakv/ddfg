import '../styles/FounderSection.css'

const FounderSection = () => {
  const founders = [
    {
      id: 1,
      name: 'Rajesh Kumar Singh',
      designation: 'IAS Officer & Co-Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      message: 'Every government employee deserves dignity and support for their family. Savaan bridges that gap with compassion and efficiency.',
      department: 'Ministry of Social Justice'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      designation: 'Medical Officer & Co-Founder',
      image: 'https://images.pexels.com/photos/5214400/pexels-photo-5214400.jpeg?auto=compress&cs=tinysrgb&w=400',
      message: 'Having witnessed countless families struggle after losing their breadwinner, I believe Savaan is the solution we always needed.',
      department: 'Department of Health'
    },
    {
      id: 3,
      name: 'Amit Verma',
      designation: 'IPS Officer & Technical Lead',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      message: 'Technology should serve humanity. Through Savaan, we are ensuring that no government employee\'s family faces hardship alone.',
      department: 'Ministry of Home Affairs'
    }
  ]

  return (
    <section className="founder-section">
      <div className="founder-container">
        <div className="section-header">
          <h2>Meet Our Founders</h2>
          <p>Dedicated government servants committed to supporting their fellow colleagues</p>
        </div>

        <div className="founders-grid">
          {founders.map((founder) => (
            <div key={founder.id} className="founder-card">
              <div className="founder-image-container">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="founder-image"
                />
                <div className="founder-overlay">
                  <div className="department-badge">{founder.department}</div>
                </div>
              </div>
              
              <div className="founder-content">
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-designation">{founder.designation}</p>
                
                <blockquote className="founder-message">
                  "{founder.message}"
                </blockquote>
                
                <div className="founder-badge">
                  <span className="verification-icon">✓</span>
                  <span>Verified Government Officer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mission-statement">
          <div className="mission-content">
            <h3>Our Collective Mission</h3>
            <p>
              Born from personal experiences and driven by genuine empathy, Savaan represents 
              the collective will of government employees to stand together. We believe that 
              when one of us falls, the entire community should rise to support their family.
            </p>
            <div className="mission-stats">
              <div className="mission-stat">
                <span className="stat-number">20+</span>
                <span className="stat-text">Years Combined Experience</span>
              </div>
              <div className="mission-stat">
                <span className="stat-number">1000+</span>
                <span className="stat-text">Families Personally Helped</span>
              </div>
              <div className="mission-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-text">Commitment to Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FounderSection