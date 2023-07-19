// Button made with styled components
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from './button.styles.jsx';
// default
// inverted
// google sign in
// */

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
//
//
//
//
//
//
//
// Button made with scss, before adding styled components

// import './button.styles.scss';
// /*
// default
// inverted
// google sign in
// */

// const BUTTON_TYPE_CLASSES = {
//   google: 'google-sign-in',
//   inverted: 'inverted',
// };

// const Button = ({ children, buttonType, ...otherProps }) => {
//   return (
//     <button
//       className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
//       {...otherProps}
//     >
//       {children}
//     </button>
//   );
// };
