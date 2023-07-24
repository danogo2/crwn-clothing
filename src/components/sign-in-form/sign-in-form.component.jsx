import { useState, useContext } from 'react'; // don't need useContext, firebase auth state observer has it covered
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer } from './sign-in-form.styles.jsx';
// import { UserContext } from '../../contexts/user.context'; // don't need, firebase auth state observer has it covered

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // getting setCurrentUser state setter from UserContext.Provider
  // hooking component to the useContext will trigger rerender of this component(runs the whole function again, doesn't repaint any dom if nothing's changed) even if value is not used
  // const { setCurrentUser } = useContext(UserContext); // don't need, firebase auth state observer has it covered

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (value !== '') {
      e.target.classList.add('shrinkLabel');
    }

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async event => {
    // by default buttons inside a form have type submit and trigger form submit on click
    // to prevent that from happening we can set type to 'button' or:
    // event.preventDefault(); // preventing form submit,

    // destructuring user from the response
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      // signed in
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // set curretn user so any component in UserContext.Provider has access to this data
      // setCurrentUser(user); // don't need, firebase auth state observer has it covered
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(
            'cannot sign in user with this email and password',
            error.message
          );
      }
    }
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          id='email-sign-in'
          label='email'
          required
          type='email'
          name='email'
          onChange={handleChange}
          value={email}
        />
        <FormInput
          id='password-sign-in'
          label='password'
          required
          type='password'
          name='password'
          onChange={handleChange}
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Submit</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
