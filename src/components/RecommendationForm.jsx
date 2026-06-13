import { useState } from 'react'

function RecommendationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    zodiac: '',
    goal: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    zodiac: '',
    goal: ''
  })

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ]

  const goals = ['Career', 'Wealth', 'Health', 'Education', 'Marriage']

  // Validate Name - Only alphabets and spaces
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required'
    }
    if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
      return 'Name should only contain letters (A-Z, a-z) and spaces (minimum 2 characters)'
    }
    return ''
  }

  // Validate Age - Positive number between 1 and 120
  const validateAge = (age) => {
    if (!age) {
      return 'Age is required'
    }
    const ageNum = Number(age)
    if (isNaN(ageNum)) {
      return 'Age must be a number'
    }
    if (ageNum < 1) {
      return 'Age must be greater than 0'
    }
    if (ageNum > 120) {
      return 'Age must be less than 120'
    }
    if (!Number.isInteger(ageNum)) {
      return 'Age must be a whole number'
    }
    return ''
  }

  // Validate Zodiac
  const validateZodiac = (zodiac) => {
    if (!zodiac) {
      return 'Please select your zodiac sign'
    }
    return ''
  }

  // Validate Goal
  const validateGoal = (goal) => {
    if (!goal) {
      return 'Please select your life goal'
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Special handling for name - prevent numbers and special chars
    if (name === 'name') {
      // Allow only letters and spaces
      const filteredValue = value.replace(/[^A-Za-z\s]/g, '')
      setFormData({ ...formData, [name]: filteredValue })
      
      // Validate on the fly
      const error = validateName(filteredValue)
      setErrors({ ...errors, [name]: error })
    } 
    else if (name === 'age') {
      // Allow only numbers, no negative, no decimal
      const filteredValue = value.replace(/[^0-9]/g, '')
      setFormData({ ...formData, [name]: filteredValue })
      
      const error = validateAge(filteredValue)
      setErrors({ ...errors, [name]: error })
    }
    else {
      setFormData({ ...formData, [name]: value })
      // Clear error for select fields
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    let error = ''
    
    if (name === 'name') error = validateName(value)
    if (name === 'age') error = validateAge(value)
    if (name === 'zodiac') error = validateZodiac(value)
    if (name === 'goal') error = validateGoal(value)
    
    setErrors({ ...errors, [name]: error })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields
    const nameError = validateName(formData.name)
    const ageError = validateAge(formData.age)
    const zodiacError = validateZodiac(formData.zodiac)
    const goalError = validateGoal(formData.goal)
    
    setErrors({
      name: nameError,
      age: ageError,
      zodiac: zodiacError,
      goal: goalError
    })
    
    // Check if any errors exist
    if (!nameError && !ageError && !zodiacError && !goalError) {
      onSubmit(formData)
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error-message')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  return (
    <div className="form-container">
      <h2>📿 Get Your Personalized Recommendation</h2>
      <p className="form-subtitle">Fill in your details to find your perfect gemstone</p>
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label>✨ Your Name <span className="required">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your name"
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
          <small className="hint">Only letters and spaces allowed</small>
        </div>
        
        {/* Age Field */}
        <div className="form-group">
          <label>📅 Age <span className="required">*</span></label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your age (e.g., 25)"
            className={errors.age ? 'error-input' : ''}
          />
          {errors.age && <div className="error-message">{errors.age}</div>}
          <small className="hint">Must be between 1 and 120 years</small>
        </div>
        
        {/* Zodiac Field */}
        <div className="form-group">
          <label>🌟 Zodiac Sign <span className="required">*</span></label>
          <select
            name="zodiac"
            value={formData.zodiac}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.zodiac ? 'error-input' : ''}
          >
            <option value="">-- Select your zodiac sign --</option>
            {zodiacSigns.map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
          {errors.zodiac && <div className="error-message">{errors.zodiac}</div>}
        </div>
        
        {/* Goal Field */}
        <div className="form-group">
          <label>🎯 Life Goal <span className="required">*</span></label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.goal ? 'error-input' : ''}
          >
            <option value="">-- Select your life goal --</option>
            {goals.map(goal => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
          {errors.goal && <div className="error-message">{errors.goal}</div>}
        </div>
        
        <button type="submit" className="submit-btn">
          🔮 Get Recommendation
        </button>
      </form>
      
      <div className="form-footer">
        <p>⚡ All fields are required</p>
      </div>
    </div>
  )
}

export default RecommendationForm