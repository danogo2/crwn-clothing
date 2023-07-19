import { FormInput as Input, FormInputLabel, Group } from './form-input.styles';

// general input component
const FormInput = ({ label, id, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} id={id} />
      {label && (
        <FormInputLabel
          $shrink={otherProps.value.length ? true : false}
          htmlFor={id}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;

// OLD VERSION for scss reference
// general input component
/*
import './form-input.styles.scss';
const FormInput = ({ label, id, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} id={id} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};
*/
