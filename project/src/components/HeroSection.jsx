import { useState, useEffect } from 'react'
import { FiShield, FiEye, FiEyeOff, FiX, FiUser, FiMail, FiPhone, FiLock, FiCheck, FiEdit, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import '../styles/HeroSection.css'

const HeroSection = ({ showMobileAuth, setShowMobileAuth }) => {
  const [activeTab, setActiveTab] = useState('login')
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    // Segment 1 - User Verification
    mobile: '',
    otp: '',
    isOtpSent: false,
    isOtpVerified: false,
    
    // Segment 2 - Basic Details
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    mobileHome: '',
    bloodGroup: '',
    aadharNumber: '',
    panNumber: '',
    
    // Segment 3 - Job Details
    department: '',
    customDepartment: '',
    departmentUniqueId: '',
    jobDescription: '',
    block: '',
    post: '',
    subPost: '',
    jobAddress: '',
    district: '',
    
    // Segment 4 - Nominee Details
    firstNomineeName: '',
    firstNomineeRelation: '',
    firstNomineeMobile: '',
    firstNomineeAccountHolder: '',
    firstNomineeBankName: '',
    firstNomineeAccountNumber: '',
    firstNomineeIFSC: '',
    firstNomineeBranchName: '',
    secondNomineeName: '',
    secondNomineeRelation: '',
    secondNomineeMobile: '',
    secondNomineeAccountHolder: '',
    secondNomineeBankName: '',
    secondNomineeAccountNumber: '',
    secondNomineeIFSC: '',
    secondNomineeBranchName: '',
    
    // Segment 5 - Other Details
    homeAddress: '',
    homeDistrict: '',
    disease: '',
    causeOfIllness: '',
    
    // Terms
    agreeTerms: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [stats, setStats] = useState({
    users: 15420,
    helped: 245000000,
    requests: 89
  })

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const increment = 50
      
      const userTarget = 15420
      const helpedTarget = 245000000
      const requestsTarget = 89
      
      let userCurrent = 0
      let helpedCurrent = 0
      let requestsCurrent = 0
      
      const timer = setInterval(() => {
        if (userCurrent < userTarget) {
          userCurrent += Math.ceil(userTarget / increment)
          if (userCurrent > userTarget) userCurrent = userTarget
        }
        
        if (helpedCurrent < helpedTarget) {
          helpedCurrent += Math.ceil(helpedTarget / increment)
          if (helpedCurrent > helpedTarget) helpedCurrent = helpedTarget
        }
        
        if (requestsCurrent < requestsTarget) {
          requestsCurrent += Math.ceil(requestsTarget / increment)
          if (requestsCurrent > requestsTarget) requestsCurrent = requestsTarget
        }
        
        setStats({
          users: userCurrent,
          helped: helpedCurrent,
          requests: requestsCurrent
        })
        
        if (userCurrent === userTarget && helpedCurrent === helpedTarget && requestsCurrent === requestsTarget) {
          clearInterval(timer)
        }
      }, duration / increment)
    }
    
    animateStats()
  }, [])

  // Auto-fetch nominee account holder names
  useEffect(() => {
    if (formData.firstNomineeName && !formData.firstNomineeAccountHolder) {
      setFormData(prev => ({
        ...prev,
        firstNomineeAccountHolder: prev.firstNomineeName
      }))
    }
  }, [formData.firstNomineeName])

  useEffect(() => {
    if (formData.secondNomineeName && !formData.secondNomineeAccountHolder) {
      setFormData(prev => ({
        ...prev,
        secondNomineeAccountHolder: prev.secondNomineeName
      }))
    }
  }, [formData.secondNomineeName])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let processedValue = value

    // Input restrictions
    if (name === 'mobile' || name === 'mobileHome' || name === 'firstNomineeMobile' || name === 'secondNomineeMobile') {
      processedValue = value.replace(/\D/g, '').slice(0, 10)
    } else if (name === 'aadharNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 12)
    } else if (name === 'firstNomineeAccountNumber' || name === 'secondNomineeAccountNumber') {
      processedValue = value.replace(/\D/g, '')
    } else if (name === 'panNumber') {
      processedValue = value.toUpperCase().slice(0, 10)
    } else if (name === 'name' || name === 'firstNomineeName' || name === 'secondNomineeName') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '')
    } else if (name === 'otp') {
      processedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }))
    
    // Auto-fill account holder names
    if (field === 'firstNomineeName') {
      setFormData(prev => ({
        ...prev,
        firstNomineeAccountHolder: value
      }))
    }
    if (field === 'secondNomineeName') {
      setFormData(prev => ({
        ...prev,
        secondNomineeAccountHolder: value
      }))
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const departments = [
    'Ministry of Home Affairs',
    'Ministry of Defence', 
    'Ministry of Finance',
    'Ministry of Health and Family Welfare',
    'Ministry of Education',
    'Ministry of Railways',
    'Ministry of External Affairs',
    'Ministry of Social Justice and Empowerment',
    'Ministry of Agriculture and Farmers Welfare',
    'Ministry of Rural Development',
    'Ministry of Urban Development',
    'Ministry of Environment and Forests',
    'Ministry of Information Technology',
    'Ministry of Labour and Employment',
    'Other'
  ]

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const relations = ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other']

  const sendOTP = () => {
    if (formData.mobile.length === 10) {
      setFormData(prev => ({ ...prev, isOtpSent: true }))
      // In real implementation, send OTP to mobile
      console.log('OTP sent to:', formData.mobile)
    }
  }

  const verifyOTP = () => {
    if (formData.otp === '2004') {
      setFormData(prev => ({ ...prev, isOtpVerified: true }))
      setCurrentStep(2)
    } else {
      setFormErrors({ otp: 'Invalid OTP. Use 2004 for demo.' })
    }
  }

  const validateStep = (step) => {
    const errors = {}
    
    if (step === 1) {
      if (!formData.mobile || formData.mobile.length !== 10) {
        errors.mobile = 'Valid 10-digit mobile number required'
      }
      if (formData.isOtpSent && !formData.otp) {
        errors.otp = 'OTP is required'
      }
    }
    
    if (step === 2) {
      if (!formData.name.trim()) errors.name = 'Name is required'
      if (!formData.email.trim()) {
        errors.email = 'Email is required'
      } else if (!formData.email.endsWith('@gmail.com')) {
        errors.email = 'Email must be @gmail.com'
      }
      if (!formData.password) {
        errors.password = 'Password is required'
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/.test(formData.password)) {
        errors.password = 'Password must be 6+ chars with uppercase, lowercase & special char'
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
      if (!formData.gender) errors.gender = 'Gender is required'
      if (!formData.dob) errors.dob = 'Date of birth is required'
      if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
        errors.aadharNumber = 'Valid 12-digit Aadhar number required'
      }
      if (!formData.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        errors.panNumber = 'Valid PAN number required (e.g., ABCDE1234F)'
      }
    }
    
    if (step === 3) {
      if (!formData.department) errors.department = 'Department is required'
      if (formData.department === 'Other' && !formData.customDepartment) {
        errors.customDepartment = 'Custom department name is required'
      }
      if (!formData.departmentUniqueId) errors.departmentUniqueId = 'Department ID is required'
      if (!formData.jobDescription) errors.jobDescription = 'Job description is required'
      if (!formData.post) errors.post = 'Post is required'
      if (!formData.jobAddress) errors.jobAddress = 'Job address is required'
      if (!formData.district) errors.district = 'District is required'
    }
    
    if (step === 4) {
      if (!formData.firstNomineeName) errors.firstNomineeName = 'First nominee name is required'
      if (!formData.firstNomineeRelation) errors.firstNomineeRelation = 'First nominee relation is required'
      if (!formData.firstNomineeMobile || formData.firstNomineeMobile.length !== 10) {
        errors.firstNomineeMobile = 'Valid 10-digit mobile number required'
      }
      if (!formData.firstNomineeBankName) errors.firstNomineeBankName = 'Bank name is required'
      if (!formData.firstNomineeAccountNumber) errors.firstNomineeAccountNumber = 'Account number is required'
      if (!formData.firstNomineeIFSC) errors.firstNomineeIFSC = 'IFSC code is required'
      if (!formData.firstNomineeBranchName) errors.firstNomineeBranchName = 'Branch name is required'
    }
    
    if (step === 5) {
      if (!formData.homeAddress) errors.homeAddress = 'Home address is required'
      if (!formData.homeDistrict) errors.homeDistrict = 'Home district is required'
      if (!formData.agreeTerms) errors.agreeTerms = 'You must agree to terms and conditions'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.isOtpVerified) {
      if (formData.mobile.length === 10 && !formData.isOtpSent) {
        sendOTP()
      } else if (formData.isOtpSent && formData.otp) {
        verifyOTP()
      }
      return
    }
    
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1)
      } else {
        setShowPreview(true)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeTab === 'register') {
      setShowRegistrationForm(true)
      setCurrentStep(1)
    } else {
      console.log('Form submitted:', formData)
    }
  }

  const handleFinalSubmit = () => {
    console.log('Final registration submitted:', formData)
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      closeModal()
    }, 3000)
    setShowSuccessMessage(false)
    setCurrentStep(1)
    setCompletionPercentage(0)
    // Reset form
    setFormData({
      mobile: '', otp: '', isOtpSent: false, isOtpVerified: false,
      name: '', email: '', password: '', confirmPassword: '', gender: '', dob: '',
      mobileHome: '', bloodGroup: '', aadharNumber: '', panNumber: '',
      department: '', customDepartment: '', departmentUniqueId: '', jobDescription: '',
      block: '', post: '', subPost: '', jobAddress: '', district: '',
      firstNomineeName: '', firstNomineeRelation: '', firstNomineeMobile: '',
      firstNomineeAccountHolder: '', firstNomineeBankName: '', firstNomineeAccountNumber: '',
      firstNomineeIFSC: '', firstNomineeBranchName: '',
      secondNomineeName: '', secondNomineeRelation: '', secondNomineeMobile: '',
      secondNomineeAccountHolder: '', secondNomineeBankName: '', secondNomineeAccountNumber: '',
      secondNomineeIFSC: '', secondNomineeBranchName: '',
      homeAddress: '', homeDistrict: '', disease: '', causeOfIllness: '', agreeTerms: false
    })
  }

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    let totalFields = 0
    let filledFields = 0

    // Segment 1 - Mobile verification
    totalFields += 1
    if (isOtpVerified) filledFields += 1

    // Segment 2 - Basic Details
    const basicFields = ['name', 'email', 'password', 'gender', 'dob', 'aadharNumber', 'panNumber']
    totalFields += basicFields.length
    basicFields.forEach(field => {
      if (formData[field] && formData[field].trim() !== '') filledFields += 1
    })

    // Segment 3 - Job Details
    const jobFields = ['department', 'departmentId', 'jobDescription', 'jobAddress', 'district']
    totalFields += jobFields.length
    jobFields.forEach(field => {
      if (formData[field] && formData[field].trim() !== '') filledFields += 1
    })

    // Segment 4 - Nominee Details
    const nomineeFields = ['firstNomineeName', 'firstNomineeRelation', 'firstNomineeMobile', 'firstNomineeBankName', 'firstNomineeAccountNumber', 'firstNomineeIfsc']
    totalFields += nomineeFields.length
    nomineeFields.forEach(field => {
      if (formData[field] && formData[field].trim() !== '') filledFields += 1
    })

    // Segment 5 - Other Details
    const otherFields = ['homeAddress', 'homeDistrict']
    totalFields += otherFields.length
    otherFields.forEach(field => {
      if (formData[field] && formData[field].trim() !== '') filledFields += 1
    })

    const percentage = Math.round((filledFields / totalFields) * 100)
    setCompletionPercentage(percentage)
    return percentage
  }

  // Update percentage when form data changes
  useEffect(() => {
    if (showRegistration) {
      calculateCompletionPercentage()
    }
  }, [formData, isOtpVerified, showRegistration])

  const getCompletionPercentage = () => {
    return Math.round((currentStep / 5) * 100)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const editStep = (step) => {
    setShowPreview(false)
    setCurrentStep(step)
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            {/* Left Side - Emotional Message */}
            <div className="hero-left">
              <h1 className="hero-title">
                Standing Together in <span className="gradient-text">Times of Loss</span>
              </h1>
              
              <p className="hero-description">
                Savaan is a dedicated platform created by government employees to support 
                the families of their fellow colleagues after an unfortunate demise.
              </p>

              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{stats.users.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Registered Users</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{formatCurrency(stats.helped)}</div>
                  <div className="stat-label">Families Helped</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.requests}</div>
                  <div className="stat-label">Active Requests</div>
                </div>
              </div>

              <div className="motivational-quote">
                <blockquote>
                  "एक साथी गया, हज़ार साथ बने।"
                </blockquote>
                <cite>- Savaan Community</cite>
              </div>

              <div className="verification-badge">
                <FiShield className="shield-icon" />
                <span>Government Verified Platform</span>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="hero-right">
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
                  <button 
                    className={`tab-button ${activeTab === 'forgot' ? 'active' : ''}`}
                    onClick={() => setActiveTab('forgot')}
                  >
                    Reset Password
                  </button>
                </div>

                <div className="form-content">
                  {activeTab === 'login' && (
                    <form onSubmit={handleSubmit} className="auth-form">
                      <div className="login-header">
                        <h3>Welcome Back</h3>
                        <p>Access your Savaan account to manage support requests and connect with the community.</p>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(prev => !prev)}
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
                        <a href="#" className="forgot-link" onClick={() => setActiveTab('forgot')}>
                          Forgot Password?
                        </a>
                      </div>
                      <button type="submit" className="submit-button">
                        <FiShield className="button-icon" />
                        Secure Login
                      </button>

                      <div className="form-divider">
                        <span>OR</span>
                      </div>

                      <div className="form-group">
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Login with Mobile + OTP"
                          className="mobile-input"
                        />
                        <button type="button" className="otp-button">
                          <FiPhone className="button-icon" />
                          Send OTP
                        </button>
                      </div>

                      <div className="login-footer">
                        <p>New to Savaan? <a href="#" onClick={() => setActiveTab('register')} className="register-link">Create Account</a></p>
                      </div>
                    </form>
                  )}

                  {activeTab === 'register' && (
                    <div className="register-info">
                      <div className="register-icon">
                        <FiUser size={48} />
                      </div>
                      <h3>Join Savaan Community</h3>
                      <p>Create your account to access financial assistance and support services for government employees.</p>
                      <button 
                        className="submit-button"
                        onClick={() => setShowRegistrationForm(true)}
                      >
                        <FiUser className="button-icon" />
                        Start Registration
                      </button>
                      <div className="register-benefits">
                        <div className="benefit-item">
                          <FiCheck className="check-icon" />
                          <span>Verified Government Employee Status</span>
                        </div>
                        <div className="benefit-item">
                          <FiCheck className="check-icon" />
                          <span>24/7 Support Access</span>
                        </div>
                        <div className="benefit-item">
                          <FiCheck className="check-icon" />
                          <span>Secure Financial Assistance</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'forgot' && (
                    <form onSubmit={handleSubmit} className="auth-form">
                      <div className="forgot-header">
                        <h3>Reset Password</h3>
                        <p>Enter your email or mobile number to receive reset instructions.</p>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="forgot-email">Email Address</label>
                        <input
                          type="email"
                          id="forgot-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>

                      <button type="submit" className="submit-button">
                        <FiMail className="button-icon" />
                        Send Reset Link
                      </button>

                      <div className="form-divider">
                        <span>OR</span>
                      </div>

                      <div className="form-group">
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Reset via Mobile + OTP"
                          className="mobile-input"
                        />
                        <button type="button" className="otp-button">
                          <FiPhone className="button-icon" />
                          Send OTP
                        </button>
                      </div>
                      
                      <div className="back-to-login">
                        <p>Remember your password? <a href="#" onClick={() => setActiveTab('login')} className="login-link">Back to Login</a></p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Overlay Form */}
      {(showRegistrationForm || showMobileAuth) && (
        <div className="registration-overlay">
          <div className="registration-modal">
            <div className="modal-header">
              <h2>
                {showPreview ? 'Review Your Information' : 'Register for Savaan'}
                <span className="completion-percentage">{getCompletionPercentage()}% Complete</span>
              </h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowRegistrationForm(false)
                  setShowMobileAuth(false)
                  setShowPreview(false)
                }}
              >
                <FiX />
              </button>
            </div>
            
            {showMobileAuth && (
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
                <button 
                  className={`mobile-tab ${activeTab === 'forgot' ? 'active' : ''}`}
                  onClick={() => setActiveTab('forgot')}
                >
                  Reset Password
                </button>
              </div>
            )}

            {!showMobileAuth && !showPreview && (
              <div className="progress-bar">
                <div className="progress-steps">
                  <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                    <span>1</span>
                    <label>User Verification</label>
                  </div>
                  <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                    <span>2</span>
                    <label>Basic Details</label>
                  </div>
                  <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                    <span>3</span>
                    <label>Job Details</label>
                  </div>
                  <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                    <span>4</span>
                    <label>Nominee Details</label>
                  </div>
                  <div className={`step ${currentStep >= 5 ? 'active' : ''}`}>
                    <span>5</span>
                    <label>Other Details</label>
                  </div>
                </div>
                <div className="progress-line">
                  <div className="progress-fill" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
                    className="progress-fill"
                    style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {showMobileAuth ? (
              <div className="mobile-auth-content">
                {/* Mobile auth content remains the same */}
              </div>
            ) : showPreview ? (
              <div className="preview-content">
                <div className="preview-sections">
                  <div className="preview-section">
                    <div className="preview-header">
                      <h3>User Verification</h3>
                      <button className="edit-button" onClick={() => editStep(1)}>
                        <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="preview-data">
                      <p><strong>Mobile:</strong> +91 {formData.mobile}</p>
                      <p><strong>Status:</strong> <span className="verified">✓ Verified</span></p>
                    </div>
                  </div>

                  <div className="preview-section">
                    <div className="preview-header">
                      <h3>Basic Details</h3>
                      <button className="edit-button" onClick={() => editStep(2)}>
                        <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="preview-data">
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Gender:</strong> {formData.gender}</p>
                      <p><strong>Date of Birth:</strong> {formData.dob}</p>
                      {formData.mobileHome && <p><strong>Home Mobile:</strong> {formData.mobileHome}</p>}
                      {formData.bloodGroup && <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>}
                      <p><strong>Aadhar Number:</strong> {formData.aadharNumber}</p>
                      <p><strong>PAN Number:</strong> {formData.panNumber}</p>
                    </div>
                  </div>

                  <div className="preview-section">
                    <div className="preview-header">
                      <h3>Job Details</h3>
                      <button className="edit-button" onClick={() => editStep(3)}>
                        <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="preview-data">
                      <p><strong>Department:</strong> {formData.department === 'Other' ? formData.customDepartment : formData.department}</p>
                      <p><strong>Department ID:</strong> {formData.departmentUniqueId}</p>
                      <p><strong>Job Description:</strong> {formData.jobDescription}</p>
                      {formData.block && <p><strong>Block:</strong> {formData.block}</p>}
                      <p><strong>Post:</strong> {formData.post}</p>
                      {formData.subPost && <p><strong>Sub Post:</strong> {formData.subPost}</p>}
                      <p><strong>Job Address:</strong> {formData.jobAddress}</p>
                      <p><strong>District:</strong> {formData.district}</p>
                    </div>
                  </div>

                  <div className="preview-section">
                    <div className="preview-header">
                      <h3>Nominee Details</h3>
                      <button className="edit-button" onClick={() => editStep(4)}>
                        <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="preview-data">
                      <div className="nominee-group">
                        <h4>First Nominee</h4>
                        <p><strong>Name:</strong> {formData.firstNomineeName}</p>
                        <p><strong>Relation:</strong> {formData.firstNomineeRelation}</p>
                        <p><strong>Mobile:</strong> {formData.firstNomineeMobile}</p>
                        <p><strong>Bank:</strong> {formData.firstNomineeBankName}</p>
                        <p><strong>Account:</strong> {formData.firstNomineeAccountNumber}</p>
                        <p><strong>IFSC:</strong> {formData.firstNomineeIFSC}</p>
                      </div>
                      {formData.secondNomineeName && (
                        <div className="nominee-group">
                          <h4>Second Nominee</h4>
                          <p><strong>Name:</strong> {formData.secondNomineeName}</p>
                          <p><strong>Relation:</strong> {formData.secondNomineeRelation}</p>
                          <p><strong>Mobile:</strong> {formData.secondNomineeMobile}</p>
                          {formData.secondNomineeBankName && (
                            <>
                              <p><strong>Bank:</strong> {formData.secondNomineeBankName}</p>
                              <p><strong>Account:</strong> {formData.secondNomineeAccountNumber}</p>
                              <p><strong>IFSC:</strong> {formData.secondNomineeIFSC}</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="preview-section">
                    <div className="preview-header">
                      <h3>Other Details</h3>
                      <button className="edit-button" onClick={() => editStep(5)}>
                        <FiEdit /> Edit
                      </button>
                    </div>
                    <div className="preview-data">
                      <p><strong>Home Address:</strong> {formData.homeAddress}</p>
                      <p><strong>Home District:</strong> {formData.homeDistrict}</p>
                      {formData.disease && <p><strong>Disease:</strong> {formData.disease}</p>}
                      {formData.causeOfIllness && <p><strong>Cause of Illness:</strong> {formData.causeOfIllness}</p>}
                    </div>
                  </div>
                </div>

                <div className="preview-actions">
                  <button 
                    className="prev-button"
                    onClick={() => setShowPreview(false)}
                  >
                    <FiArrowLeft /> Back to Edit
                  </button>
                  <button 
                    className="submit-button"
                    onClick={handleFinalSubmit}
                  >
                    <FiCheck /> Submit Registration
                  </button>
                </div>
              </div>
            ) : (
              <form className="registration-form">
                {/* Segment 1 - User Verification */}
                {currentStep === 1 && (
                  <div className="form-step">
                    <h3>User Verification</h3>
                    
                    <div className="form-group">
                      <label htmlFor="mobile">
                        <FiPhone className="input-icon" />
                        Mobile Number *
                      </label>
                      <div className="mobile-input-group">
                        <span className="country-code">+91</span>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter 10-digit mobile number"
                          className={formErrors.mobile ? 'error' : ''}
                          maxLength="10"
                        />
                        {!formData.isOtpSent && (
                          <button 
                            type="button" 
                            className="otp-button"
                            onClick={sendOTP}
                            disabled={formData.mobile.length !== 10}
                          >
                            Send OTP
                          </button>
                        )}
                      </div>
                      {formErrors.mobile && <span className="error-text">{formErrors.mobile}</span>}
                    </div>

                    {formData.isOtpSent && !formData.isOtpVerified && (
                      <div className="form-group">
                        <label htmlFor="otp">
                          <FiLock className="input-icon" />
                          Enter OTP *
                        </label>
                        <div className="otp-input-group">
                          <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleInputChange}
                            placeholder="Enter 4-digit OTP"
                            className={formErrors.otp ? 'error' : ''}
                            maxLength="4"
                          />
                          <button 
                            type="button" 
                            className="verify-button"
                            onClick={verifyOTP}
                            disabled={formData.otp.length !== 4}
                          >
                            Verify
                          </button>
                        </div>
                        {formErrors.otp && <span className="error-text">{formErrors.otp}</span>}
                        <small className="otp-note">Demo OTP: 2004</small>
                      </div>
                    )}

                    {formData.isOtpVerified && (
                      <div className="verification-success">
                        <FiCheck className="success-icon" />
                        <span>Mobile number verified successfully!</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Segment 2 - Basic Details */}
                {currentStep === 2 && (
                  <div className="form-step">
                    <h3>Basic Details</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">
                          <FiUser className="input-icon" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={formErrors.name ? 'error' : ''}
                        />
                        {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">
                          <FiMail className="input-icon" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your @gmail.com email"
                          className={formErrors.email ? 'error' : ''}
                        />
                        {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="password">
                          <FiLock className="input-icon" />
                          Password *
                        </label>
                        <div className="password-input">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Min 6 chars, 1 upper, 1 lower, 1 special"
                            className={formErrors.password ? 'error' : ''}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(prev => !prev)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                        {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          <FiLock className="input-icon" />
                          Confirm Password *
                        </label>
                        <div className="password-input">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            className={formErrors.confirmPassword ? 'error' : ''}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                          >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                        {formErrors.confirmPassword && <span className="error-text">{formErrors.confirmPassword}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="gender">Gender *</label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={formErrors.gender ? 'error' : ''}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                        {formErrors.gender && <span className="error-text">{formErrors.gender}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="dob">Date of Birth *</label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className={formErrors.dob ? 'error' : ''}
                        />
                        {formErrors.dob && <span className="error-text">{formErrors.dob}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="mobileHome">Home Mobile (Optional)</label>
                        <div className="mobile-input-group">
                          <span className="country-code">+91</span>
                          <input
                            type="tel"
                            id="mobileHome"
                            name="mobileHome"
                            value={formData.mobileHome}
                            onChange={handleInputChange}
                            placeholder="Enter home mobile number"
                            maxLength="10"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group (Optional)</label>
                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map((group, index) => (
                            <option key={index} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="aadharNumber">Aadhar Number *</label>
                        <input
                          type="text"
                          id="aadharNumber"
                          name="aadharNumber"
                          value={formData.aadharNumber}
                          onChange={handleInputChange}
                          placeholder="Enter 12-digit Aadhar number"
                          className={formErrors.aadharNumber ? 'error' : ''}
                          maxLength="12"
                        />
                        {formErrors.aadharNumber && <span className="error-text">{formErrors.aadharNumber}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="panNumber">PAN Number *</label>
                        <input
                          type="text"
                          id="panNumber"
                          name="panNumber"
                          value={formData.panNumber}
                          onChange={handleInputChange}
                          placeholder="Enter PAN number (e.g., ABCDE1234F)"
                          className={formErrors.panNumber ? 'error' : ''}
                          maxLength="10"
                        />
                        {formErrors.panNumber && <span className="error-text">{formErrors.panNumber}</span>}
                      </div>
                    </div>

                    <div className="mobile-prefetch">
                      <p><strong>Mobile Number:</strong> +91 {formData.mobile} ✓</p>
                    </div>
                  </div>
                )}

                {/* Segment 3 - Job Details */}
                {currentStep === 3 && (
                  <div className="form-step">
                    <h3>Job Details</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="department">Department *</label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className={formErrors.department ? 'error' : ''}
                        >
                          <option value="">Search and select department</option>
                          {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                          ))}
                        </select>
                        {formErrors.department && <span className="error-text">{formErrors.department}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="departmentUniqueId">Department Unique ID *</label>
                        <input
                          type="text"
                          id="departmentUniqueId"
                          name="departmentUniqueId"
                          value={formData.departmentUniqueId}
                          onChange={handleInputChange}
                          placeholder="Enter department unique ID"
                          className={formErrors.departmentUniqueId ? 'error' : ''}
                        />
                        {formErrors.departmentUniqueId && <span className="error-text">{formErrors.departmentUniqueId}</span>}
                      </div>
                    </div>

                    {formData.department === 'Other' && (
                      <div className="form-group">
                        <label htmlFor="customDepartment">Custom Department Name *</label>
                        <input
                          type="text"
                          id="customDepartment"
                          name="customDepartment"
                          value={formData.customDepartment}
                          onChange={handleInputChange}
                          placeholder="Enter your department name"
                          className={formErrors.customDepartment ? 'error' : ''}
                        />
                        {formErrors.customDepartment && <span className="error-text">{formErrors.customDepartment}</span>}
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="jobDescription">Job Description *</label>
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your job role and responsibilities"
                        rows="3"
                        className={formErrors.jobDescription ? 'error' : ''}
                      ></textarea>
                      {formErrors.jobDescription && <span className="error-text">{formErrors.jobDescription}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="block">Block (Optional)</label>
                        <input
                          type="text"
                          id="block"
                          name="block"
                          value={formData.block}
                          onChange={handleInputChange}
                          placeholder="Enter block"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="post">Post *</label>
                        <input
                          type="text"
                          id="post"
                          name="post"
                          value={formData.post}
                          onChange={handleInputChange}
                          placeholder="Enter your post"
                          className={formErrors.post ? 'error' : ''}
                        />
                        {formErrors.post && <span className="error-text">{formErrors.post}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="subPost">Sub Post (Optional)</label>
                        <input
                          type="text"
                          id="subPost"
                          name="subPost"
                          value={formData.subPost}
                          onChange={handleInputChange}
                          placeholder="Enter sub post"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="district">District *</label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          placeholder="Enter district"
                          className={formErrors.district ? 'error' : ''}
                        />
                        {formErrors.district && <span className="error-text">{formErrors.district}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="jobAddress">Job Address *</label>
                      <textarea
                        id="jobAddress"
                        name="jobAddress"
                        value={formData.jobAddress}
                        onChange={handleInputChange}
                        placeholder="Enter complete job address"
                        rows="3"
                        className={formErrors.jobAddress ? 'error' : ''}
                      ></textarea>
                      {formErrors.jobAddress && <span className="error-text">{formErrors.jobAddress}</span>}
                    </div>
                  </div>
                )}

                {/* Segment 4 - Nominee Details */}
                {currentStep === 4 && (
                  <div className="form-step">
                    <h3>Nominee Details</h3>
                    
                    <div className="nominee-section">
                      <h4>First Nominee (Mandatory)</h4>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="firstNomineeName">Nominee Name *</label>
                          <input
                            type="text"
                            id="firstNomineeName"
                            name="firstNomineeName"
                            value={formData.firstNomineeName}
                            onChange={handleInputChange}
                            placeholder="Enter nominee name"
                            className={formErrors.firstNomineeName ? 'error' : ''}
                          />
                          {formErrors.firstNomineeName && <span className="error-text">{formErrors.firstNomineeName}</span>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="firstNomineeRelation">Relation *</label>
                          <select
                            id="firstNomineeRelation"
                            name="firstNomineeRelation"
                            value={formData.firstNomineeRelation}
                            onChange={handleInputChange}
                            className={formErrors.firstNomineeRelation ? 'error' : ''}
                          >
                            <option value="">Select Relation</option>
                            {relations.map((relation, index) => (
                              <option key={index} value={relation}>{relation}</option>
                            ))}
                          </select>
                          {formErrors.firstNomineeRelation && <span className="error-text">{formErrors.firstNomineeRelation}</span>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="firstNomineeMobile">Mobile Number *</label>
                        <div className="mobile-input-group">
                          <span className="country-code">+91</span>
                          <input
                            type="tel"
                            id="firstNomineeMobile"
                            name="firstNomineeMobile"
                            value={formData.firstNomineeMobile}
                            onChange={handleInputChange}
                            placeholder="Enter 10-digit mobile number"
                            className={formErrors.firstNomineeMobile ? 'error' : ''}
                            maxLength="10"
                          />
                        </div>
                        {formErrors.firstNomineeMobile && <span className="error-text">{formErrors.firstNomineeMobile}</span>}
                      </div>

                      <h5>Bank Details</h5>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="firstNomineeAccountHolder">Account Holder Name *</label>
                          <input
                            type="text"
                            id="firstNomineeAccountHolder"
                            name="firstNomineeAccountHolder"
                            value={formData.firstNomineeAccountHolder}
                            onChange={handleInputChange}
                            placeholder="Auto-filled from nominee name"
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="firstNomineeBankName">Bank Name *</label>
                          <input
                            type="text"
                            id="firstNomineeBankName"
                            name="firstNomineeBankName"
                            value={formData.firstNomineeBankName}
                            onChange={handleInputChange}
                            placeholder="Enter bank name"
                            className={formErrors.firstNomineeBankName ? 'error' : ''}
                          />
                          {formErrors.firstNomineeBankName && <span className="error-text">{formErrors.firstNomineeBankName}</span>}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="firstNomineeAccountNumber">Account Number *</label>
                          <input
                            type="text"
                            id="firstNomineeAccountNumber"
                            name="firstNomineeAccountNumber"
                            value={formData.firstNomineeAccountNumber}
                            onChange={handleInputChange}
                            placeholder="Enter account number"
                            className={formErrors.firstNomineeAccountNumber ? 'error' : ''}
                          />
                          {formErrors.firstNomineeAccountNumber && <span className="error-text">{formErrors.firstNomineeAccountNumber}</span>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="firstNomineeIFSC">IFSC Code *</label>
                          <input
                            type="text"
                            id="firstNomineeIFSC"
                            name="firstNomineeIFSC"
                            value={formData.firstNomineeIFSC}
                            onChange={handleInputChange}
                            placeholder="Enter IFSC code"
                            className={formErrors.firstNomineeIFSC ? 'error' : ''}
                          />
                          {formErrors.firstNomineeIFSC && <span className="error-text">{formErrors.firstNomineeIFSC}</span>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="firstNomineeBranchName">Branch Name *</label>
                        <input
                          type="text"
                          id="firstNomineeBranchName"
                          name="firstNomineeBranchName"
                          value={formData.firstNomineeBranchName}
                          onChange={handleInputChange}
                          placeholder="Enter branch name"
                          className={formErrors.firstNomineeBranchName ? 'error' : ''}
                        />
                        {formErrors.firstNomineeBranchName && <span className="error-text">{formErrors.firstNomineeBranchName}</span>}
                      </div>
                    </div>

                    <div className="nominee-section">
                      <h4>Second Nominee (Optional)</h4>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="secondNomineeName">Nominee Name</label>
                          <input
                            type="text"
                            id="secondNomineeName"
                            name="secondNomineeName"
                            value={formData.secondNomineeName}
                            onChange={handleInputChange}
                            placeholder="Enter nominee name"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="secondNomineeRelation">Relation</label>
                          <select
                            id="secondNomineeRelation"
                            name="secondNomineeRelation"
                            value={formData.secondNomineeRelation}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Relation</option>
                            {relations.map((relation, index) => (
                              <option key={index} value={relation}>{relation}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="secondNomineeMobile">Mobile Number</label>
                        <div className="mobile-input-group">
                          <span className="country-code">+91</span>
                          <input
                            type="tel"
                            id="secondNomineeMobile"
                            name="secondNomineeMobile"
                            value={formData.secondNomineeMobile}
                            onChange={handleInputChange}
                            placeholder="Enter 10-digit mobile number"
                            maxLength="10"
                          />
                        </div>
                      </div>

                      {formData.secondNomineeName && (
                        <>
                          <h5>Bank Details (Optional)</h5>
                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="secondNomineeAccountHolder">Account Holder Name</label>
                              <input
                                type="text"
                                id="secondNomineeAccountHolder"
                                name="secondNomineeAccountHolder"
                                value={formData.secondNomineeAccountHolder}
                                onChange={handleInputChange}
                                placeholder="Auto-filled from nominee name"
                                readOnly
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="secondNomineeBankName">Bank Name</label>
                              <input
                                type="text"
                                id="secondNomineeBankName"
                                name="secondNomineeBankName"
                                value={formData.secondNomineeBankName}
                                onChange={handleInputChange}
                                placeholder="Enter bank name"
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="secondNomineeAccountNumber">Account Number</label>
                              <input
                                type="text"
                                id="secondNomineeAccountNumber"
                                name="secondNomineeAccountNumber"
                                value={formData.secondNomineeAccountNumber}
                                onChange={handleInputChange}
                                placeholder="Enter account number"
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="secondNomineeIFSC">IFSC Code</label>
                              <input
                                type="text"
                                id="secondNomineeIFSC"
                                name="secondNomineeIFSC"
                                value={formData.secondNomineeIFSC}
                                onChange={handleInputChange}
                                placeholder="Enter IFSC code"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="secondNomineeBranchName">Branch Name</label>
                            <input
                              type="text"
                              id="secondNomineeBranchName"
                              name="secondNomineeBranchName"
                              value={formData.secondNomineeBranchName}
                              onChange={handleInputChange}
                              placeholder="Enter branch name"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Segment 5 - Other Details */}
                {currentStep === 5 && (
                  <div className="form-step">
                    <h3>Other Details</h3>
                    
                    <div className="form-group">
                      <label htmlFor="homeAddress">Home Address *</label>
                      <textarea
                        id="homeAddress"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        placeholder="Enter complete home address"
                        rows="3"
                        className={formErrors.homeAddress ? 'error' : ''}
                      ></textarea>
                      {formErrors.homeAddress && <span className="error-text">{formErrors.homeAddress}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="homeDistrict">Home District *</label>
                      <input
                        type="text"
                        id="homeDistrict"
                        name="homeDistrict"
                        value={formData.homeDistrict}
                        onChange={handleInputChange}
                        placeholder="Enter home district"
                        className={formErrors.homeDistrict ? 'error' : ''}
                      />
                      {formErrors.homeDistrict && <span className="error-text">{formErrors.homeDistrict}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="disease">Disease (Optional)</label>
                        <input
                          type="text"
                          id="disease"
                          name="disease"
                          value={formData.disease}
                          onChange={handleInputChange}
                          placeholder="Enter any known disease"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="causeOfIllness">Cause of Illness (Optional)</label>
                        <input
                          type="text"
                          id="causeOfIllness"
                          name="causeOfIllness"
                          value={formData.causeOfIllness}
                          onChange={handleInputChange}
                          placeholder="Enter cause of illness"
                        />
                      </div>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className={formErrors.agreeTerms ? 'error' : ''}
                        />
                        <span className="checkmark"></span>
                        I agree to the <a href="#" className="link">Terms and Conditions</a> and <a href="#" className="link">Privacy Policy</a> *
                      </label>
                      {formErrors.agreeTerms && <span className="error-text">{formErrors.agreeTerms}</span>}
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  {currentStep > 1 && (
                    <button type="button" className="prev-button" onClick={handlePrevStep}>
                      <FiArrowLeft /> Previous
                    </button>
                  )}
                  
                  <button type="button" className="next-button" onClick={handleNextStep}>
                    {currentStep === 5 ? (
                      <>
                        <FiCheck /> Review & Submit
                      </>
                    ) : (
                      <>
                        Next Step <FiArrowRight />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default HeroSection