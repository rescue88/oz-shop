import { Field, Form, Formik } from 'formik';
import { FC } from 'react';

import { ValidateComment } from '../../../../assets/validators/validators';
import MySimpleRadioBtn from '../../../common/Input/MySimpleRadioBtn';
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

                    console.log(data);
                    

                    setSubmitting(false);

                    resetForm();
                }}
            >
                {
                    ({isSubmitting, values}) => (
                        <Form>
                            <div className="form__input">
                                <Field 
                                    width={true}
                                    label="Заповнити відгук"
                                    validate={ValidateComment} 
                                    name="text" 
                                    placeholder="Напишіть відгук..." 
                                    type="textarea"
                                    as={MySimpleTextarea}
                                /> 
                            </div>
                            <div className="commentsForm__radio">
                                <MySimpleRadioBtn 
                                    name="positive"
                                    value="hi"
                                    label="Позитивний"
                                />  
                            </div>
                            <div className="form__submit commentsForm__submit">
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