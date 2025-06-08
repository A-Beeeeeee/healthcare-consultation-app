export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateAge = (age) => {
  const numAge = parseInt(age);
  return numAge >= 1 && numAge <= 120;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateConsultationForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
  }
  
  if (!validateAge(formData.age)) {
    errors.age = 'Please enter a valid age (1-120)';
  }
  
  if (!validateRequired(formData.gender)) {
    errors.gender = 'Please select gender';
  }
  
  if (!validateRequired(formData.duration)) {
    errors.duration = 'Please select symptom duration';
  }
  
  if (!validateRequired(formData.severity)) {
    errors.severity = 'Please select severity level';
  }
  
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};