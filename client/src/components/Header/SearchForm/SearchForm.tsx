import { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import MyTextField from '../../common/MyTextField';
import MySubmitButton from '../../common/MySubmitButton';

const SearchForm: FC = () => {
    return (
        <Formik
            initialValues={{ searchText: '' }} 
            onSubmit={(data, {setSubmitting}) => {
                setSubmitting(true);
                console.log('submit', data);
                setSubmitting(false);
            }}
        >
            {
                ({values, errors, isSubmitting}) => (
                    <Form>
                        <Field width={300} placeholder="Ключове слово" name="searchText" type="input" as={MyTextField} />
                        <MySubmitButton disabled={isSubmitting} text="Знайти" />
                    </Form>
                )
            }
        </Formik>
    );
}

export default SearchForm;