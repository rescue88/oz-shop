import { Field, Form, Formik } from 'formik';
import { FC } from 'react';

import { getStorageItem } from '../../../../assets/helpers/helpers';
import { ValidateComment } from '../../../../assets/validators/validators';
import MySimpleRadioBtn from '../../../common/Input/MySimpleRadioBtn';
import MySimpleTextarea from '../../../common/Input/MySimpleTextarea';
import MySubmitButton from '../../../common/MySubmitButton';
import { CommentsTabType } from './CommentsTab';

type CommentsTabFormType = {
    isFetching: boolean;
    addHandler: (productId: string, userId: string, text: string, positive: boolean) => void;
} & CommentsTabType;

const CommentsTabForm: FC<CommentsTabFormType> = ({isFetching, productId, addHandler}) => {
    return (
        <div className="commentsForm">
            <Formik
                initialValues={{
                    'text': '',
                    'positive': 'positive'
                }}
                onSubmit={async (data, {setSubmitting, resetForm}) => {
                    setSubmitting(true);

                    const userId: string = getStorageItem()!.userId;
                    await addHandler(userId, productId, data.text, Boolean(data.positive));

                    setSubmitting(false);

                    resetForm();
                }}
            >
                {
                    ({isSubmitting}) => (
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
                                    type="radio"
                                    id="positive"
                                    name="positive"
                                    value="positive"
                                    label="Позитивний"
                                    disabled={isFetching}
                                />
                                <MySimpleRadioBtn 
                                    type="radio"
                                    id="negative"
                                    name="positive"
                                    value=""
                                    label="Негативний"
                                    disabled={isFetching}
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