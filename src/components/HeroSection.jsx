import { useState } from 'react'
import { FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield, FiCheck, FiX, FiEdit } from 'react-icons/fi'
import '../styles/HeroSection.css'

const HeroSection = ({ showMobileAuth, setShowMobileAuth }) => {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [mobileVerified, setMobileVerified] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    
    // Employment Details
    employeeId: '',
    department: '',
    designation: '',
    joiningDate: '',
    currentSalary: '',
    officeAddress: '',
    
    // Nominee Details
    nominee1Name: '',
    nominee1Relation: '',
    nominee1Share: '',
    nominee1Mobile: '',
    nominee2Name: '',
    nominee2Relation: '',
    nominee2Share: '',
    nominee2Mobile: '',
    
    // Agreement
    agreeTerms: false
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  const handleRegistrationSubmit = (e) => {
    e.preventDefault()
    setShowRegistration(false)
    setShowSuccess(true)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepProgress = () => {
    return (currentStep / 4) * 100
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiUser className="input-icon" />
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiUser className="input-icon" />
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiMail className="input-icon" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiCalendar className="input-icon" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiPhone className="input-icon" />
                  Mobile Number *
                </label>
                <div className="mobile-input-group">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                  {!mobileVerified && (
                    <button 
                      type="button" 
                      className="verify-button"
                      onClick={() => setMobileVerified(true)}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {mobileVerified && (
                  <div className="verification-success">
                    <FiCheck className="success-icon" />
                    <span>Mobile number verified successfully</span>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="form-step">
            <h3>Employment Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Employee ID *</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="health">Department of Health</option>
                  <option value="education">Department of Education</option>
                  <option value="transport">Department of Transport</option>
                  <option value="finance">Department of Finance</option>
                  <option value="home">Ministry of Home Affairs</option>
                  <option value="defence">Ministry of Defence</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Designation *</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Joining *</label>
                <input
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Current Monthly Salary *</label>
                <input
                  type="number"
                  value={formData.currentSalary}
                  onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                  placeholder="Enter amount in INR"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiMapPin className="input-icon" />
                  Office Address *
                </label>
                <textarea
                  value={formData.officeAddress}
                  onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                  rows="3"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="form-step">
            <h3>Nominee Information</h3>
            
            <div className="nominee-section">
              <h4>Primary Nominee</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.nominee1Name}
                    onChange={(e) => handleInputChange('nominee1Name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Relationship *</label>
                  <select
                    value={formData.nominee1Relation}
                    onChange={(e) => handleInputChange('nominee1Relation', e.target.value)}
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Share Percentage *</label>
                  <input
                    type="number"
                    value={formData.nominee1Share}
                    onChange={(e) => handleInputChange('nominee1Share', e.target.value)}
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.nominee1Mobile}
                    onChange={(e) => handleInputChange('nominee1Mobile', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="nominee-section">
              <h4>Secondary Nominee (Optional)</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.nominee2Name}
                    onChange={(e) => handleInputChange('nominee2Name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Relationship</label>
                  <select
                    value={formData.nominee2Relation}
                    onChange={(e) => handleInputChange('nominee2Relation', e.target.value)}
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Share Percentage</label>
                  <input
                    type="number"
                    value={formData.nominee2Share}
                    onChange={(e) => handleInputChange('nominee2Share', e.target.value)}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.nominee2Mobile}
                    onChange={(e) => handleInputChange('nominee2Mobile', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="form-step">
            <h3>Review & Submit</h3>
            <div className="preview-content">
              <div className="preview-sections">
                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Personal Information</h3>
                    <button type="button" className="edit-button" onClick={() => setCurrentStep(1)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="preview-data">
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Mobile:</strong> +91 {formData.mobile} {mobileVerified && <span className="verified">✓ Verified</span>}</p>
                    <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                  </div>
                </div>

                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Employment Details</h3>
                    <button type="button" className="edit-button" onClick={() => setCurrentStep(2)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="preview-data">
                    <p><strong>Employee ID:</strong> {formData.employeeId}</p>
                    <p><strong>Department:</strong> {formData.department}</p>
                    <p><strong>Designation:</strong> {formData.designation}</p>
                    <p><strong>Joining Date:</strong> {formData.joiningDate}</p>
                    <p><strong>Monthly Salary:</strong> ₹{formData.currentSalary}</p>
                    <p><strong>Office Address:</strong> {formData.officeAddress}</p>
                  </div>
                </div>

                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Nominee Information</h3>
                    <button type="button" className="edit-button" onClick={() => setCurrentStep(3)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="nominee-group">
                    <h4>Primary Nominee</h4>
                    <div className="preview-data">
                      <p><strong>Name:</strong> {formData.nominee1Name}</p>
                      <p><strong>Relationship:</strong> {formData.nominee1Relation}</p>
                      <p><strong>Share:</strong> {formData.nominee1Share}%</p>
                      <p><strong>Mobile:</strong> {formData.nominee1Mobile}</p>
                    </div>
                  </div>
                  
                  {formData.nominee2Name && (
                    <div className="nominee-group">
                      <h4>Secondary Nominee</h4>
                      <div className="preview-data">
                        <p><strong>Name:</strong> {formData.nominee2Name}</p>
                        <p><strong>Relationship:</strong> {formData.nominee2Relation}</p>
                        <p><strong>Share:</strong> {formData.nominee2Share}%</p>
                        <p><strong>Mobile:</strong> {formData.nominee2Mobile}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    required
                  />
                  <span className="checkmark"></span>
                  <span>
                    I agree to the <a href="#" className="link">Terms and Conditions</a> and 
                    <a href="#" className="link"> Privacy Policy</a>. I confirm that all information 
                    provided is accurate and complete.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              Standing Together in Times of <span className="gradient-text">Loss</span>
            </h1>
            <p className="hero-description">
              A compassionate platform created by government employees, for government employees. 
              When tragedy strikes, we ensure no family faces hardship alone. Join thousands of 
              colleagues who believe in collective support and dignity for all.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">15,420+</div>
                <div className="stat-label">Registered Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">₹24.5Cr</div>
                <div className="stat-label">Total Support Given</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2,847</div>
                <div className="stat-label">Families Helped</div>
              </div>
            </div>

            <div className="motivational-quote">
              <blockquote>
                "In the service of the nation, we stand united. In times of loss, we stand together."
              </blockquote>
              <cite>- Savaan Community Pledge</cite>
            </div>

            <div className="verification-badge">
              <FiShield className="shield-icon" />
              <div>
                <strong>Government Verified Platform</strong>
                <br />
                <small>Trusted by 45+ departments across India</small>
              </div>
            </div>
          </div>

          <div className="hero-right">
            {!showForgotPassword ? (
              <>
                <div className="form-container">
                  <div className="form-tabs">
                    <button 
                      className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                      onClick={() => setActiveTab('login')}
                    >
                      Login
                    </button>
                    <button 
                      className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
                      onClick={() => setActiveTab('register')}
                    >
                      Register
                    </button>
                  </div>

                  <div className="form-content">
                    {activeTab === 'login' ? (
                      <>
                        <div className="login-header">
                          <h3>Welcome Back</h3>
                          <p>Sign in to access your Savaan account and connect with your community</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                          <div className="form-group">
                            <label htmlFor="email">Email or Employee ID</label>
                            <input
                              type="text"
                              id="email"
                              placeholder="Enter your email or employee ID"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                required
                              />
                              <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                              </button>
                            </div>
                          </div>

                          <div className="remember-forgot">
                            <label className="remember-me">
                              <input type="checkbox" />
                              <span className="checkmark"></span>
                              Remember me
                            </label>
                            <button
                              type="button"
                              className="forgot-link"
                              onClick={() => setShowForgotPassword(true)}
                            >
                              Forgot Password?
                            </button>
                          </div>

                          <button type="submit" className="submit-button">
                            <FiUser className="button-icon" />
                            Sign In
                          </button>
                        </form>

                        <div className="form-divider">
                          <span>or continue with</span>
                        </div>

                        <div className="form-group mobile-input">
                          <label htmlFor="mobile">Mobile Number</label>
                          <div className="mobile-input-group">
                            <span className="country-code">+91</span>
                            <input
                              type="tel"
                              id="mobile"
                              placeholder="Enter mobile number"
                            />
                          </div>
                        </div>

                        <button type="button" className="otp-button">
                          <FiPhone />
                          Send OTP
                        </button>

                        <div className="login-footer">
                          <p>
                            New to Savaan? 
                            <button
                              type="button"
                              className="register-link"
                              onClick={() => setActiveTab('register')}
                            >
                              Create Account
                            </button>
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="register-info">
                        <div className="register-icon">
                          <FiShield size={40} />
                        </div>
                        <h3>Join the Savaan Community</h3>
                        <p>
                          Register to become part of a supportive network of government employees 
                          committed to helping each other in times of need.
                        </p>
                        
                        <button 
                          className="submit-button"
                          onClick={() => setShowRegistration(true)}
                        >
                          <FiUser className="button-icon" />
                          Start Registration
                        </button>

                        <div className="register-benefits">
                          <div className="benefit-item">
                            <FiCheck className="check-icon" />
                            <span>Verified government employee network</span>
                          </div>
                          <div className="benefit-item">
                            <FiCheck className="check-icon" />
                            <span>Transparent support system</span>
                          </div>
                          <div className="benefit-item">
                            <FiCheck className="check-icon" />
                            <span>24/7 community assistance</span>
                          </div>
                          <div className="benefit-item">
                            <FiCheck className="check-icon" />
                            <span>Secure and confidential platform</span>
                          </div>
                        </div>

                        <div className="login-footer">
                          <p>
                            Already have an account? 
                            <button
                              type="button"
                              className="register-link"
                              onClick={() => setActiveTab('login')}
                            >
                              Sign In
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="form-container">
                <div className="form-content">
                  <div className="forgot-header">
                    <h3>Reset Password</h3>
                    <p>Enter your email address and we'll send you a link to reset your password</p>
                  </div>

                  <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                      <label htmlFor="reset-email">Email Address</label>
                      <input
                        type="email"
                        id="reset-email"
                        placeholder="Enter your registered email"
                        required
                      />
                    </div>

                    <button type="submit" className="submit-button">
                      <FiMail className="button-icon" />
                      Send Reset Link
                    </button>
                  </form>

                  <div className="back-to-login">
                    <p>
                      Remember your password? 
                      <button
                        type="button"
                        className="login-link"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Back to Login
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Auth Modal */}
        {showMobileAuth && (
          <div className="registration-overlay">
            <div className="registration-modal">
              <div className="modal-header">
                <h2>Access Savaan</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowMobileAuth(false)}
                >
                  <FiX />
                </button>
              </div>

              <div className="mobile-auth-tabs">
                <button 
                  className={`mobile-tab ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button 
                  className={`mobile-tab ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>

              <div className="mobile-auth-content">
                {activeTab === 'login' ? (
                  <>
                    <div className="login-header">
                      <h3>Welcome Back</h3>
                      <p>Sign in to access your Savaan account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                      <div className="form-group">
                        <label htmlFor="mobile-email">Email or Employee ID</label>
                        <input
                          type="text"
                          id="mobile-email"
                          placeholder="Enter your email or employee ID"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="mobile-password">Password</label>
                        <div className="password-input">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="mobile-password"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>

                      <button type="submit" className="submit-button">
                        <FiUser className="button-icon" />
                        Sign In
                      </button>
                    </form>

                    <div className="form-divider">
                      <span>or continue with</span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="mobile-number">Mobile Number</label>
                      <div className="mobile-input-group">
                        <span className="country-code">+91</span>
                        <input
                          type="tel"
                          id="mobile-number"
                          placeholder="Enter mobile number"
                        />
                      </div>
                    </div>

                    <button type="button" className="otp-button">
                      <FiPhone />
                      Send OTP
                    </button>
                  </>
                ) : (
                  <div className="register-info">
                    <div className="register-icon">
                      <FiShield size={40} />
                    </div>
                    <h3>Join Savaan Community</h3>
                    <p>Register to become part of our supportive network</p>
                    
                    <button 
                      className="submit-button"
                      onClick={() => {
                        setShowMobileAuth(false)
                        setShowRegistration(true)
                      }}
                    >
                      <FiUser className="button-icon" />
                      Start Registration
                    </button>

                    <div className="register-benefits">
                      <div className="benefit-item">
                        <FiCheck className="check-icon" />
                        <span>Verified network</span>
                      </div>
                      <div className="benefit-item">
                        <FiCheck className="check-icon" />
                        <span>Transparent support</span>
                      </div>
                      <div className="benefit-item">
                        <FiCheck className="check-icon" />
                        <span>24/7 assistance</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegistration && (
          <div className="registration-overlay">
            <div className="registration-modal">
              <div className="modal-header">
                <h2>
                  Register for Savaan
                  <span className="completion-percentage">{Math.round(getStepProgress())}% Complete</span>
                </h2>
                <button 
                  className="close-button"
                  onClick={() => setShowRegistration(false)}
                >
                  <FiX />
                </button>
              </div>

              <div className="progress-bar">
                <div className="progress-steps">
                  <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                    <span>1</span>
                    <label>Personal</label>
                  </div>
                  <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                    <span>2</span>
                    <label>Employment</label>
                  </div>
                  <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                    <span>3</span>
                    <label>Nominees</label>
                  </div>
                  <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                    <span>4</span>
                    <label>Review</label>
                  </div>
                </div>
                <div className="progress-line">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getStepProgress()}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="registration-form">
                {renderStep()}

                <div className="form-actions">
                  {currentStep > 1 && (
                    <button type="button" className="prev-button" onClick={prevStep}>
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 4 ? (
                    <button type="button" className="next-button" onClick={nextStep}>
                      Next Step
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="submit-button"
                      disabled={!formData.agreeTerms}
                    >
                      <FiCheck className="button-icon" />
                      Complete Registration
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <div className="success-overlay">
            <div className="success-modal">
              <div className="success-icon">
                <div className="checkmark">✓</div>
              </div>
              
              <h2>Registration Successful!</h2>
              <p>Welcome to the Savaan community. Your account has been created successfully.</p>
              
              <div className="success-details">
                <p><FiMail /> Verification email sent to {formData.email}</p>
                <p><FiPhone /> SMS confirmation sent to +91 {formData.mobile}</p>
                <p><FiShield /> Account verification in progress</p>
              </div>
              
              <div className="success-message">
                <p>
                  "Together we stand, together we support. Welcome to a community that cares."
                </p>
              </div>
              
              <button 
                className="submit-button"
                onClick={() => {
                  setShowSuccess(false)
                  setShowRegistration(false)
                  setCurrentStep(1)
                }}
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection