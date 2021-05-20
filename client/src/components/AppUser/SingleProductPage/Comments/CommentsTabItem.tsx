import { FC, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom';

import defaultAva from './../../../../assets/images/defaultAva.png';
import { convertBuffer, getStorageItem } from '../../../../assets/helpers/helpers';
import { CommentProductType, StateType } from '../../../../types/stateTypes';
import HeaderNavProfileIcon from '../../../Header/HeaderNav/Icons/HeaderNavProfileIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import { useSelector } from 'react-redux';
import CommentsTabForm from './CommentsTabForm';

type CommentsTabItemType = {
    comment: CommentProductType;
    deleteHandler: (user: string, product: string) => void;
    updateHandler: (user: string, product: string, text: string, positive: boolean) => void;
}

const CommentsTabItem: FC<CommentsTabItemType> = ({comment, deleteHandler, updateHandler}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    // const [editModeState, setEditModeState] = 
    const {userId} = getStorageItem()!;
    const {permissions} = useSelector((state: StateType) => state.user);
    
    const toggleEditModeHandler = () => {
        setEditMode(prev => !prev);
    }

    return (
        <div className={`commentItem ${comment.positive ? 'positive': 'negative'}`}>
            {
                userId === comment.user ? (
                    <NavLink to='/app/profile' className="commentItem__image">
                        <img src={comment.avatar.data ? convertBuffer(comment.avatar.data.data) : defaultAva} alt="" />
                    </NavLink>
                ) : (
                    <div className="commentItem__image">
                        <img src={comment.avatar.data ? convertBuffer(comment.avatar.data.data) : defaultAva} alt="" />
                    </div>
                )
            }
            <div className="commentItem__content">
                <div className="commentItem__content_login">{comment.login} {userId === comment.user ? <HeaderNavProfileIcon /> : null }</div>
                <div className="commentItem__content_date">{comment.created}</div>
                {
                    editMode ? (
                        <CommentsTabForm 
                            text={comment.text}
                            toggleEditMode={toggleEditModeHandler}
                            addOrUpdateComment={updateHandler}
                            productId={comment.product}
                        />
                    ) : (
                        <div className="commentItem__content_text">{comment.text}</div>
                    )
                }
            </div>
                <div className="commentItem__settings centered-col">
                    {
                        userId === comment.user ? (
                            <div className="editComment">
                                <Tooltip title="Змінити коментар" arrow>
                                    <button type="button" onClick={toggleEditModeHandler}><EditIcon /></button>
                                </Tooltip>
                            </div>
                        ) : null
                    }
                    {
                        userId === comment.user || permissions === 'admin' ? (
                            <div className="deleteComment">
                                <Tooltip title="Видалити коментар" arrow>
                                    <button type="button" onClick={() => deleteHandler(comment.user, comment.product)}><DeleteIcon /></button>
                                </Tooltip>
                            </div>
                        ) : null
                    }
                </div>
        </div>
    );
}

export default CommentsTabItem;