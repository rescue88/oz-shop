import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import { convertBuffer } from '../../../../../../assets/helpers/helpers';
import { CommentUserType } from '../../../../../../types/stateTypes';
import defaultProductPic from './../../../../../../assets/images/defaultProduct.png';
import DeleteIcon from '../../../../../common/Icons/DeleteIcon';

type UserCommentsItemType = {
    comment: CommentUserType;
    isFetching: boolean;
    deleteComment: (productId: string) => void;
}

const UserCommentsItem: FC<UserCommentsItemType> = ({isFetching, comment, deleteComment}) => {
    return (
        <div className={`commentItem ${comment.positive ? 'positive' : 'negative'}`}>
            <NavLink to={`/app/products/${comment.product}`} className="commentItem__image">
                <img src={comment.image.data ? convertBuffer(comment.image.data.data) : defaultProductPic} alt="" />
            </NavLink>
            <div className="commentItem__content">
                <div className="commentItem__content_name">Коментар до продукту:&nbsp;<span>{comment.name}</span></div>
                <div className="commentItem__content_date">{comment.created}</div>
                <div className="commentItem__content_text">{comment.text}</div>
            </div>
            <Tooltip title="Видалити коментар" arrow>
                <button 
                    className="deleteBtn"
                    type="button" 
                    onClick={() => deleteComment(comment.product)}
                    disabled={isFetching}
                >
                    <DeleteIcon />
                </button>
            </Tooltip>
        </div>
    );
}

export default UserCommentsItem;