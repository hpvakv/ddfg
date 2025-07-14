import { useState } from 'react'
import { FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield, FiCheck, FiX, FiEdit, FiSearch } from 'react-icons/fi'
import '../styles/HeroSection.css'

const HeroSection = ({ showMobileAuth, setShowMobileAuth }) => {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otp, setOtp] = useState('')
  const [departmentSearch, setDepartmentSearch] = useState('')
  const [showOtherDepartment, setShowOtherDepartment] = useState(false)
  const [formData, setFormData] = useState({
    // Segment 1 - User Verification
    mobile: '',
    
    // Segment 2 - Basic Details
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    mobileHome: '',
    bloodGroup: '',
    aadharNumber: '',
    panNumber: '',
    
    // Segment 3 - Job Details
    department: '',
    otherDepartment: '',
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
    
    // Agreement
    agreeTerms: false
  })

  const departments = [
    'Department of Health',
    'Department of Education',
    'Department of Transport',
    'Department of Finance',
    'Ministry of Home Affairs',
    'Ministry of Defence',
    'Department of Agriculture',
    'Department of Rural Development',
    'Department of Social Justice',
    'Department of Women and Child Development'
  ]

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const relations = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-fetch nominee account holder names
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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  const handleRegistrationSubmit = (e) => {
    e.preventDefault()
    setShowRegistration(false)
    setShowSuccess(true)
  }

  const sendOTP = () => {
    if (formData.mobile.length === 10) {
      setOtpSent(true)
    }
  }

  const verifyOTP = () => {
    if (otp === '2004') {
      setOtpVerified(true)
      nextStep()
    }
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    if (step === 1 || otpVerified) {
      setCurrentStep(step)
    }
  }

  const getStepProgress = () => {
    return (currentStep / 6) * 100
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const totalSteps = 5
    
    // Step 1 - User Verification
    if (otpVerified) completed++
    
    // Step 2 - Basic Details
    if (formData.name && formData.email && formData.password && formData.gender && formData.dob && formData.aadharNumber && formData.panNumber) completed++
    
    // Step 3 - Job Details
    if (formData.department && formData.departmentUniqueId && formData.jobDescription && formData.block && formData.post && formData.jobAddress && formData.district) completed++
    
    // Step 4 - Nominee Details
    if (formData.firstNomineeName && formData.firstNomineeRelation && formData.firstNomineeMobile && formData.firstNomineeAccountNumber && formData.firstNomineeIFSC) completed++
    
    // Step 5 - Other Details
    if (formData.homeAddress && formData.homeDistrict) completed++
    
    return Math.round((completed / totalSteps) * 100)
  }

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com')
  }

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return password.length >= 6 && hasUppercase && hasLowercase && hasSpecialChar
  }

  const formatPAN = (value) => {
    return value.toUpperCase()
  }

  const filteredDepartments = departments.filter(dept =>
    dept.toLowerCase().includes(departmentSearch.toLowerCase())
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>User Verification</h3>
            <div className="form-group">
              <label>
                <FiPhone className="input-icon" />
                Mobile Number *
              </label>
              <div className="mobile-input-group">
                <span className="country-code">🇮🇳 +91</span>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                    handleInputChange('mobile', value)
                  }}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  required
                />
                {!otpSent && (
                  <button 
                    type="button" 
                    className="verify-button"
                    onClick={sendOTP}
                    disabled={formData.mobile.length !== 10}
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div className="form-group">
                <label>Enter OTP *</label>
                <div className="otp-input-group">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                    placeholder="Enter 4-digit OTP"
                    maxLength="4"
                  />
                  <button 
                    type="button" 
                    className="verify-button"
                    onClick={verifyOTP}
                    disabled={otp.length !== 4}
                  >
                    Verify OTP
                  </button>
                </div>
                <p className="otp-note">Use OTP: 2004 for verification</p>
              </div>
            )}

            {otpVerified && (
              <div className="verification-success">
                <FiCheck className="success-icon" />
                <span>Mobile number verified successfully</span>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="form-step">
            <h3>Basic Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiUser className="input-icon" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
                    handleInputChange('name', value)
                  }}
                  placeholder="Enter full name (letters only)"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiMail className="input-icon" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@gmail.com"
                  className={formData.email && !validateEmail(formData.email) ? 'error' : ''}
                  required
                />
                {formData.email && !validateEmail(formData.email) && (
                  <span className="error-text">Email must end with @gmail.com</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Min 6 chars, 1 upper, 1 lower, 1 special"
                    className={formData.password && !validatePassword(formData.password) ? 'error' : ''}
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
                {formData.password && !validatePassword(formData.password) && (
                  <span className="error-text">Password must have min 6 chars, 1 uppercase, 1 lowercase, 1 special char</span>
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
                  <option value="transgender">Transgender</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiCalendar className="input-icon" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile (Verified)</label>
                <input
                  type="text"
                  value={`+91 ${formData.mobile}`}
                  disabled
                  className="prefilled-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile (Home)</label>
                <input
                  type="tel"
                  value={formData.mobileHome}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                    handleInputChange('mobileHome', value)
                  }}
                  placeholder="Optional home number"
                  maxLength="10"
                />
              </div>
              <div className="form-group">
                <label>Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Aadhar Number *</label>
                <input
                  type="text"
                  value={formData.aadharNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                    handleInputChange('aadharNumber', value)
                  }}
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                  required
                />
              </div>
              <div className="form-group">
                <label>PAN Number *</label>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={(e) => {
                    const value = formatPAN(e.target.value).slice(0, 10)
                    handleInputChange('panNumber', value)
                  }}
                  placeholder="PAN number (auto uppercase)"
                  maxLength="10"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="form-step">
            <h3>Job Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Department *</label>
                <div className="search-select">
                  <div className="search-input-group">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      value={departmentSearch}
                      onChange={(e) => setDepartmentSearch(e.target.value)}
                      placeholder="Search department..."
                    />
                  </div>
                  {departmentSearch && (
                    <div className="search-results">
                      {filteredDepartments.map(dept => (
                        <div 
                          key={dept}
                          className="search-result-item"
                          onClick={() => {
                            handleInputChange('department', dept)
                            setDepartmentSearch('')
                            setShowOtherDepartment(false)
                          }}
                        >
                          {dept}
                        </div>
                      ))}
                      {filteredDepartments.length === 0 && (
                        <div 
                          className="search-result-item other-option"
                          onClick={() => {
                            setShowOtherDepartment(true)
                            setDepartmentSearch('')
                          }}
                        >
                          Other - Type manually
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {formData.department && (
                  <div className="selected-department">
                    Selected: {formData.department}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Department Unique ID *</label>
                <input
                  type="text"
                  value={formData.departmentUniqueId}
                  onChange={(e) => handleInputChange('departmentUniqueId', e.target.value)}
                  required
                />
              </div>
            </div>

            {showOtherDepartment && (
              <div className="form-group">
                <label>Department Name (Manual Entry) *</label>
                <input
                  type="text"
                  value={formData.otherDepartment}
                  onChange={(e) => {
                    handleInputChange('otherDepartment', e.target.value)
                    handleInputChange('department', e.target.value)
                  }}
                  placeholder="Enter department name manually"
                  required
                />
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label>Job Description *</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Block *</label>
                <input
                  type="text"
                  value={formData.block}
                  onChange={(e) => handleInputChange('block', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Post *</label>
                <input
                  type="text"
                  value={formData.post}
                  onChange={(e) => handleInputChange('post', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Sub Post *</label>
                <input
                  type="text"
                  value={formData.subPost}
                  onChange={(e) => handleInputChange('subPost', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiMapPin className="input-icon" />
                  Job Address *
                </label>
                <textarea
                  value={formData.jobAddress}
                  onChange={(e) => handleInputChange('jobAddress', e.target.value)}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>District *</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="form-step">
            <h3>Nominee Details</h3>
            
            <div className="nominee-section">
              <h4>First Nominee (Mandatory)</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.firstNomineeName}
                    onChange={(e) => handleInputChange('firstNomineeName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Relationship *</label>
                  <select
                    value={formData.firstNomineeRelation}
                    onChange={(e) => handleInputChange('firstNomineeRelation', e.target.value)}
                    required
                  >
                    <option value="">Select Relationship</option>
                    {relations.map(relation => (
                      <option key={relation} value={relation.toLowerCase()}>{relation}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.firstNomineeMobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      handleInputChange('firstNomineeMobile', value)
                    }}
                    maxLength="10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Account Holder Name *</label>
                  <input
                    type="text"
                    value={formData.firstNomineeAccountHolder}
                    onChange={(e) => handleInputChange('firstNomineeAccountHolder', e.target.value)}
                    placeholder="Auto-filled from nominee name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bank Name *</label>
                  <input
                    type="text"
                    value={formData.firstNomineeBankName}
                    onChange={(e) => handleInputChange('firstNomineeBankName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Account Number *</label>
                  <input
                    type="text"
                    value={formData.firstNomineeAccountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      handleInputChange('firstNomineeAccountNumber', value)
                    }}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>IFSC Code *</label>
                  <input
                    type="text"
                    value={formData.firstNomineeIFSC}
                    onChange={(e) => handleInputChange('firstNomineeIFSC', e.target.value.toUpperCase())}
                    maxLength="11"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Branch Name *</label>
                  <input
                    type="text"
                    value={formData.firstNomineeBranchName}
                    onChange={(e) => handleInputChange('firstNomineeBranchName', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="nominee-section">
              <h4>Second Nominee (Optional)</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.secondNomineeName}
                    onChange={(e) => handleInputChange('secondNomineeName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Relationship</label>
                  <select
                    value={formData.secondNomineeRelation}
                    onChange={(e) => handleInputChange('secondNomineeRelation', e.target.value)}
                  >
                    <option value="">Select Relationship</option>
                    {relations.map(relation => (
                      <option key={relation} value={relation.toLowerCase()}>{relation}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.secondNomineeMobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      handleInputChange('secondNomineeMobile', value)
                    }}
                    maxLength="10"
                  />
                </div>
                <div className="form-group">
                  <label>Account Holder Name</label>
                  <input
                    type="text"
                    value={formData.secondNomineeAccountHolder}
                    onChange={(e) => handleInputChange('secondNomineeAccountHolder', e.target.value)}
                    placeholder="Auto-filled from nominee name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    value={formData.secondNomineeBankName}
                    onChange={(e) => handleInputChange('secondNomineeBankName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    value={formData.secondNomineeAccountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      handleInputChange('secondNomineeAccountNumber', value)
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>IFSC Code</label>
                  <input
                    type="text"
                    value={formData.secondNomineeIFSC}
                    onChange={(e) => handleInputChange('secondNomineeIFSC', e.target.value.toUpperCase())}
                    maxLength="11"
                  />
                </div>
                <div className="form-group">
                  <label>Branch Name</label>
                  <input
                    type="text"
                    value={formData.secondNomineeBranchName}
                    onChange={(e) => handleInputChange('secondNomineeBranchName', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="form-step">
            <h3>Other Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>
                  <FiMapPin className="input-icon" />
                  Home Address *
                </label>
                <textarea
                  value={formData.homeAddress}
                  onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Home District *</label>
                <input
                  type="text"
                  value={formData.homeDistrict}
                  onChange={(e) => handleInputChange('homeDistrict', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Disease (if any)</label>
                <input
                  type="text"
                  value={formData.disease}
                  onChange={(e) => handleInputChange('disease', e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="form-group">
                <label>Cause of Illness (if any)</label>
                <textarea
                  value={formData.causeOfIllness}
                  onChange={(e) => handleInputChange('causeOfIllness', e.target.value)}
                  rows="3"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="form-step">
            <h3>Review & Submit</h3>
            <div className="preview-content">
              <div className="preview-sections">
                <div className="preview-section">
                  <div className="preview-header">
                    <h3>User Verification</h3>
                    <button type="button" className="edit-button" onClick={() => goToStep(1)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="preview-data">
                    <p><strong>Mobile:</strong> +91 {formData.mobile} <span className="verified">✓ Verified</span></p>
                  </div>
                </div>

                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Basic Details</h3>
                    <button type="button" className="edit-button" onClick={() => goToStep(2)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="preview-data">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Date of Birth:</strong> {formData.dob}</p>
                    <p><strong>Home Mobile:</strong> {formData.mobileHome || 'Not provided'}</p>
                    <p><strong>Blood Group:</strong> {formData.bloodGroup || 'Not provided'}</p>
                    <p><strong>Aadhar Number:</strong> {formData.aadharNumber}</p>
                    <p><strong>PAN Number:</strong> {formData.panNumber}</p>
                  </div>
                </div>

                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Job Details</h3>
                    <button type="button" className="edit-button" onClick={() => goToStep(3)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="preview-data">
                    <p><strong>Department:</strong> {formData.department}</p>
                    <p><strong>Department ID:</strong> {formData.departmentUniqueId}</p>
                    <p><strong>Job Description:</strong> {formData.jobDescription}</p>
                    <p><strong>Block:</strong> {formData.block}</p>
                    <p><strong>Post:</strong> {formData.post}</p>
                    <p><strong>Sub Post:</strong> {formData.subPost}</p>
                    <p><strong>Job Address:</strong> {formData.jobAddress}</p>
                    <p><strong>District:</strong> {formData.district}</p>
                  </div>
                </div>

                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Nominee Details</h3>
                    <button type="button" className="edit-button" onClick={() => goToStep(4)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="nominee-group">
                    <h4>First Nominee</h4>
                    <div className="preview-data">
                      <p><strong>Name:</strong> {formData.firstNomineeName}</p>
                      <p><strong>Relationship:</strong> {formData.firstNomineeRelation}</p>
                      <p><strong>Mobile:</strong> {formData.firstNomineeMobile}</p>
                      <p><strong>Bank:</strong> {formData.firstNomineeBankName}</p>
                      <p><strong>Account:</strong> {formData.firstNomineeAccountNumber}</p>
                      <p><strong>IFSC:</strong> {formData.firstNomineeIFSC}</p>
                      <p><strong>Branch:</strong> {formData.firstNomineeBranchName}</p>
                    </div>
                  </div>
                  
                  {formData.secondNomineeName && (
                    <div className="nominee-group">
                      <h4>Second Nominee</h4>
                      <div className="preview-data">
                        <p><strong>Name:</strong> {formData.secondNomineeName}</p>
                        <p><strong>Relationship:</strong> {formData.secondNomineeRelation}</p>
                        <p><strong>Mobile:</strong> {formData.secondNomineeMobile}</p>
                        <p><strong>Bank:</strong> {formData.secondNomineeBankName}</p>
                        <p><strong>Account:</strong> {formData.secondNomineeAccountNumber}</p>
                        <p><strong>IFSC:</strong> {formData.secondNomineeIFSC}</p>
                        <p><strong>Branch:</strong> {formData.secondNomineeBranchName}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="preview-section">
                  <div className="preview-header">
                    <h3>Other Details</h3>
                    <button type="button" className="edit-button" onClick={() => goToStep(5)}>
                      <FiEdit /> Edit
                    </button>
                  </div>
                  <div className="preview-data">
                    <p><strong>Home Address:</strong> {formData.homeAddress}</p>
                    <p><strong>Home District:</strong> {formData.homeDistrict}</p>
                    <p><strong>Disease:</strong> {formData.disease || 'None'}</p>
                    <p><strong>Cause of Illness:</strong> {formData.causeOfIllness || 'None'}</p>
                  </div>
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
                  <span className="completion-percentage">{getCompletionPercentage()}% Complete</span>
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
                  <div className={`step ${currentStep >= 1 ? 'active' : ''}`} onClick={() => goToStep(1)}>
                    <span>1</span>
                    <label>Verification</label>
                  </div>
                  <div className={`step ${currentStep >= 2 ? 'active' : ''} ${otpVerified ? '' : 'disabled'}`} onClick={() => goToStep(2)}>
                    <span>2</span>
                    <label>Basic</label>
                  </div>
                  <div className={`step ${currentStep >= 3 ? 'active' : ''} ${otpVerified ? '' : 'disabled'}`} onClick={() => goToStep(3)}>
                    <span>3</span>
                    <label>Job</label>
                  </div>
                  <div className={`step ${currentStep >= 4 ? 'active' : ''} ${otpVerified ? '' : 'disabled'}`} onClick={() => goToStep(4)}>
                    <span>4</span>
                    <label>Nominee</label>
                  </div>
                  <div className={`step ${currentStep >= 5 ? 'active' : ''} ${otpVerified ? '' : 'disabled'}`} onClick={() => goToStep(5)}>
                    <span>5</span>
                    <label>Other</label>
                  </div>
                  <div className={`step ${currentStep >= 6 ? 'active' : ''} ${otpVerified ? '' : 'disabled'}`} onClick={() => goToStep(6)}>
                    <span>6</span>
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
                  
                  {currentStep < 6 ? (
                    currentStep === 1 ? (
                      otpVerified ? (
                        <button type="button" className="next-button" onClick={nextStep}>
                          Next Step
                        </button>
                      ) : null
                    ) : (
                      <button type="button" className="next-button" onClick={nextStep}>
                        Next Step
                      </button>
                    )
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
                  setOtpVerified(false)
                  setOtpSent(false)
                  setOtp('')
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