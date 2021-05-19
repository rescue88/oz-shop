import { Field, Form, Formik } from 'formik';
import { FC } from 'react';

import { getStorageItem } from '../../../../assets/helpers/helpers';
import { ValidateComment } from '../../../../assets/validators/validators';
import MySimpleRadioBtn from '../../../common/Input/MySimpleRadioBtn';
import MySimpleTextarea from '../../../common/Input/MySimpleTextarea';
import MySubmitButton from '../../../common/MySubmitButton';
import { CommentsTabType } from './CommentsTab';

type CommentsTabFormType = {
    text?: string;
    toggleEditMode?: () => void;
    addOrUpdateComment: (productId: string, userId: string, text: string, positive: boolean) => void;
} & CommentsTabType;

const CommentsTabForm: FC<CommentsTabFormType> = ({text, productId, addOrUpdateComment, toggleEditMode}) => {
  return (
        <div className="commentsForm">
            <Formik
                initialValues={{
                    'text': text ? text : '',
                    'positive': 'positive'
                }}
                onSubmit={async (data, {setSubmitting, resetForm}) => {
                    setSubmitting(true);

                    const userId: string = getStorageItem()!.userId;
                    await addOrUpdateComment(userId, productId, data.text, Boolean(data.positive));

                    setSubmitting(false);

                    resetForm();
                    if(text) {
                        toggleEditMode!();
                    }
                }}
            >
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="form__input">
                                <Field 
                                    updateComment={text ? true : false}
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
                                    disabled={isSubmitting}
                                />
                                <MySimpleRadioBtn 
                                    type="radio"
                                    id="negative"
                                    name="positive"
                                    value=""
                                    label="Негативний"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form__submit commentsForm__submit">
                                <MySubmitButton 
                                    disabled={isSubmitting}
                                    text={text ? 'Оновити коментар' : 'Залишити коментар'}
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