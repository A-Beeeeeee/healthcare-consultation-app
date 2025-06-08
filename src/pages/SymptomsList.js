import React from 'react';
import { useNavigate } from 'react-router-dom';
import { symptoms } from '../utils/symptomsData';

const SymptomsList = () => {
  const navigate = useNavigate();

  const cardStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    backgroundColor: 'white'
  };

  const handleSymptomClick = (symptom) => {
    navigate('/consultation', { state: { symptom } });
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: '#2c3e50' }}>Select Your Symptom</h2>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          Choose the symptom that best describes your current condition
        </p>
      </div>
      
      <div className="row">
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="col-md-4">
            <div
              style={cardStyle}
              onClick={() => handleSymptomClick(symptom)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#3498db';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {symptom.icon}
              </div>
              <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
                {symptom.name}
              </h4>
              <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                {symptom.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomsList;