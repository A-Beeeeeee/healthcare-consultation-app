import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateConsultationForm } from '../utils/validation';
import LoadingSpinner from '../components/LoadingSpinner';

const ConsultationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSymptom = location.state?.symptom;
  
  // ALL useState hooks must be at the top level - before any conditions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    duration: '',
    severity: '',
    additionalNotes: '',
    emergencyContact: '',
    allergies: '',
    currentMedications: ''
  });
  const [errors, setErrors] = useState({});

  // Use useEffect for redirection instead of conditional return
  useEffect(() => {
    if (!selectedSymptom) {
      navigate('/symptoms');
    }
  }, [selectedSymptom, navigate]);

  // Early return for loading state and missing symptom
  if (!selectedSymptom) {
    return null; // Will redirect via useEffect
  }

  if (isSubmitting) {
    return <LoadingSpinner message="Submitting your consultation..." />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validation = validateConsultationForm(formData);
    
    if (validation.isValid) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const consultationData = {
        ...formData,
        symptom: selectedSymptom.name,
        submissionDate: new Date().toLocaleDateString(),
        consultationId: 'HC-' + Date.now()
      };
      
      navigate('/thank-you', { state: { consultationData } });
    } else {
      setErrors(validation.errors);
      setIsSubmitting(false);
    }
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '1rem',
    marginBottom: '0.5rem'
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginRight: '1rem'
  };

  const sectionStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '6px',
    marginBottom: '2rem',
    border: '1px solid #e9ecef'
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2c3e50' }}>Medical Consultation Form</h2>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          backgroundColor: '#e3f2fd', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          marginTop: '1rem'
        }}>
          <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>
            {selectedSymptom.icon}
          </span>
          <span style={{ color: '#1976d2', fontWeight: 'bold' }}>
            Selected Symptom: {selectedSymptom.name}
          </span>
        </div>
      </div>

      <form style={formStyle} onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div style={sectionStyle}>
          <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>📋 Personal Information</h4>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                ...inputStyle,
                borderColor: errors.name ? '#dc3545' : '#ced4da'
              }}
              placeholder="Enter your full name"
            />
            {errors.name && <div style={errorStyle}>{errors.name}</div>}
          </div>

          <div className="row">
            <div className="col-md-4">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.age ? '#dc3545' : '#ced4da'
                  }}
                  placeholder="Age"
                  min="1"
                  max="120"
                />
                {errors.age && <div style={errorStyle}>{errors.age}</div>}
              </div>
            </div>
            
            <div className="col-md-4">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.gender ? '#dc3545' : '#ced4da'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
              </div>
            </div>

            <div className="col-md-4">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? '#dc3545' : '#ced4da'
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.phone ? '#dc3545' : '#ced4da'
                  }}
                  placeholder="Your phone number"
                />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Symptom Details Section */}
        <div style={sectionStyle}>
          <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🏥 Symptom Details</h4>
          
          <div className="row">
            <div className="col-md-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Duration of Symptoms *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.duration ? '#dc3545' : '#ced4da'
                  }}
                >
                  <option value="">Select Duration</option>
                  <option value="less-than-24h">Less than 24 hours</option>
                  <option value="1-3-days">1-3 days</option>
                  <option value="4-7-days">4-7 days</option>
                  <option value="more-than-week">More than a week</option>
                </select>
                {errors.duration && <div style={errorStyle}>{errors.duration}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Severity Level *
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.severity ? '#dc3545' : '#ced4da'
                  }}
                >
                  <option value="">Select Severity</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="very-severe">Very Severe</option>
                </select>
                {errors.severity && <div style={errorStyle}>{errors.severity}</div>}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              style={{
                ...inputStyle,
                minHeight: '100px',
                resize: 'vertical'
              }}
              placeholder="Please provide any additional details about your symptoms..."
            />
          </div>
        </div>

        {/* Medical History Section */}
        <div style={sectionStyle}>
          <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>💊 Medical History</h4>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Allergies
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="List any allergies (if none, type 'None')"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Current Medications
            </label>
            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleInputChange}
              style={{
                ...inputStyle,
                minHeight: '100px',
                resize: 'vertical'
              }}
              placeholder="List any medications you are currently taking..."
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            type="submit"
            style={buttonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;