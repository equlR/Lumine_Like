import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  Email: Yup.string()
    .required('Please enter your email')
    .email('Please enter a valid email')
    .trim()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Invalid email format'
    ),
  Password: Yup.string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters')
});

export const registerValidationSchema = Yup.object().shape({
  FullName: Yup.string()
    .required('Please enter your full name')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      'Please enter a valid name'
    )
    .trim(),

  Email: Yup.string()
    .required('Please enter your email')
    .email('Please enter a valid email')
    .trim()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Invalid email format'
    ),

  Password: Yup.string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain:\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character'
    ),

  ConfirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('Password'), null], 'Passwords must match')
});
