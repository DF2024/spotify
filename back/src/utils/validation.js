

export const isValidEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};


export const isValidUsername = (username) => {
  return typeof username === 'string' && username.trim().length >= 3;
};


export const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};


export const validateRegisterInput = (username, email, password) => {
  if (!isValidUsername(username)) {
    return {
      isValid: false,
      error: 'El nombre de usuario debe tener al menos 3 caracteres.'
    };
  }
  
  if (!isValidEmail(email)) {
    return { 
      isValid: false, 
      error: 'El correo electrónico no es válido.' 
    };
  }

  if (!isValidPassword(password)) {
    return {
      isValid: false,
      error: 'La contraseña debe tener al menos 6 caracteres.'
    };
  }

  return { isValid: true };
};