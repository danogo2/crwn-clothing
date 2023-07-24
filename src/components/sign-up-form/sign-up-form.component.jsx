import { useState } from 'react'; // don't need useContext, firebase auth state observer has it covered
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import { SignUpContainer } from './sign-up.styles.jsx';
import Button from '../button/button.component.jsx';
// import { UserContext } from '../../contexts/user.context.jsx'; // don't need, firebase auth state observer has it covered

// initial values for form inputs
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // const { setCurrentUser } = useContext(UserContext); // don't need, firebase auth state observer has it covered

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Entered passwords are different');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = response;
      // setCurrentUser(user); // don't need, firebase auth state observer has it covered
      createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create a user, email already in use');
      } else {
        console.log('error creating a user', error.message);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (value !== '') {
      event.target.classList.add('shrinkLabel');
    }

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>I don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmPassword'
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button buttonType='base' type='submit'>
          Submit
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
