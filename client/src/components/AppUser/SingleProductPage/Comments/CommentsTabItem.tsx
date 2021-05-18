import { FC } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import defaultAva from './../../../../assets/images/defaultAva.png';
import { convertBuffer, getStorageItem } from '../../../../assets/helpers/helpers';
import { CommentProductType } from '../../../../types/stateTypes';
import HeaderNavProfileIcon from '../../../Header/HeaderNav/Icons/HeaderNavProfileIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import DeleteIcon from '../../../common/Icons/DeleteIcon';

type CommentsTabItemType = {
    comment: CommentProductType;
    deleteHandler: (user: string, product: string) => void;
    updateHandler?: (user: string, product: string, text: string, positive: boolean) => void;
}

const CommentsTabItem: FC<CommentsTabItemType> = ({comment, deleteHandler}) => {
    const userId: string | undefined = getStorageItem()?.userId;

    return (
        <div className={`commentsItems__item ${comment.positive ? 'positive': 'negative'}`}>
            <div className="commentsItems__item_image">
                <img src={comment.avatar.data ? convertBuffer(comment.avatar.data.data) : defaultAva} alt="" />
            </div>
            <div className="commentsItems__item_info">
                <div className="login">{comment.login} {userId === comment.user ? <HeaderNavProfileIcon /> : null }</div>
                <div className="date">{comment.created}</div>
                <div className="text">{comment.text}</div>
            </div>
            {
                userId === comment.user ? (
                    <div className="commentsItems__item_settings centered-col">
                        <div className="editComment">
                            <Tooltip title="Змінити коментар" arrow>
                                <button type="button"><EditIcon /></button>
                            </Tooltip>
                        </div>
                        <div className="deleteComment">
                            <Tooltip title="Видалити коментар" arrow>
                                <button type="button" onClick={() => deleteHandler(userId, comment.product)}><DeleteIcon /></button>
                            </Tooltip>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default CommentsTabItem;