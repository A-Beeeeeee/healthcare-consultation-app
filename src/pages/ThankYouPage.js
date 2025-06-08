import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const consultationData = location.state?.consultationData;

  if (!consultationData) {
    navigate('/');
    return null;
  }

  const containerStyle = {
    textAlign: 'center',
    padding: '3rem 0',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const successIconStyle = {
    fontSize: '4rem',
    color: '#28a745',
    marginBottom: '1rem'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '25px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  };

  return (
    <div className="container">
      <div style={containerStyle}>
        <div style={successIconStyle}>✅</div>
        <h1 style={{ color: '#28a745', marginBottom: '1rem' }}>
          Thank You for Your Consultation!
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '2rem' }}>
          Your consultation request has been successfully submitted.
        </p>

        <div style={cardStyle}>
          <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
            Consultation Summary
          </h4>
          <div style={{ textAlign: 'left' }}>
            <p><strong>Name:</strong> {consultationData.name}</p>
            <p><strong>Age:</strong> {consultationData.age}</p>
            <p><strong>Gender:</strong> {consultationData.gender}</p>
            <p><strong>Symptom:</strong> {consultationData.symptom}</p>
            <p><strong>Duration:</strong> {consultationData.duration}</p>
            <p><strong>Severity:</strong> {consultationData.severity}</p>
            {consultationData.additionalNotes && (
              <p><strong>Additional Notes:</strong> {consultationData.additionalNotes}</p>
            )}
          </div>
        </div>

        <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h5 style={{ color: '#2c3e50', marginBottom: '1rem' }}>What Happens Next?</h5>
          <div style={{ textAlign: 'left' }}>
            <p>• A qualified healthcare professional will review your consultation</p>
            <p>• You will receive a response within 24 hours</p>
            <p>• Check your email for detailed medical advice</p>
            <p>• Follow-up consultations can be scheduled if needed</p>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={() => navigate('/')}
        >
          Start New Consultation
        </button>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <p style={{ color: '#856404', margin: 0, fontSize: '0.9rem' }}>
            <strong>Important:</strong> This consultation is for informational purposes only. 
            In case of emergency, please call your local emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;