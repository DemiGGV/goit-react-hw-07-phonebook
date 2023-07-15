import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import {
  FormContainerCSS,
  FieldInputCSS,
  ErrorField,
  LabelDiv,
} from '../MainContainerCSS';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import { setError } from 'redux/contactsSlice';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (value, { resetForm }) => {
    const { name, number } = value;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      dispatch(setError(`${name.trim()} already in contacts!`));
      return;
    }
    dispatch(
      addContact({
        name: name.trim(),
        phone: number.trim(),
      })
    );
    resetForm();
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(5, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      <FormContainerCSS>
        <LabelDiv>
          <FieldInputCSS type="text" name="name" />
          <ErrorMessage component={ErrorField} name="name" />
        </LabelDiv>
        <LabelDiv>
          <FieldInputCSS type="tel" name="number" />
          <ErrorMessage component={ErrorField} name="number" />
        </LabelDiv>
        <button type="submit">Add contact</button>
      </FormContainerCSS>
    </Formik>
  );
};
