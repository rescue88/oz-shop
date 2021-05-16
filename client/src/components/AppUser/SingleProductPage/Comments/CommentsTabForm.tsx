import { Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { ValidateDescription } from '../../../../assets/validators/validators';
import MySimpleTextarea from '../../../common/Input/MySimpleTextarea';
import MySubmitButton from '../../../common/MySubmitButton';

const CommentsTabForm: FC = () => {
    return (
        <div className="commentsForm">
            <Formik
                initialValues={{
                    'text': '',
                    'positive': ''
                }}
                onSubmit={async (data, {setSubmitting, resetForm}) => {
                    setSubmitting(true);

                    

                    setSubmitting(false);

                    resetForm();
                }}
            >
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div>
                                <Field 
                                    validate={ValidateDescription} 
                                    name="text" 
                                    placeholder="Напишіть відгук..." 
                                    type="textarea"
                                    as={MySimpleTextarea}
                                /> 
                            </div>
                            <div>
                                <MySubmitButton 
                                    disabled={isSubmitting}
                                    text='Залишити коментар'
                                />
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default CommentsTabForm;