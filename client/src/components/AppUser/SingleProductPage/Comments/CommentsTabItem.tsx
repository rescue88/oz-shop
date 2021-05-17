import { FC } from 'react';

import defaultAva from './../../../../assets/images/defaultAva.png';
import { convertBuffer } from '../../../../assets/helpers/helpers';
import { CommentProductType } from '../../../../types/stateTypes';

type CommentsTabItemType = {
    comment: CommentProductType;
}

const CommentsTabItem: FC<CommentsTabItemType> = ({comment}) => {
    return (
        <div className="commentsItems__item">
            <div className="commentsItems__item_image">
                <img src={comment.avatar.data ? convertBuffer(comment.avatar.data.data) : defaultAva} alt="" />
            </div>
            <div className="commentsItems__item_info">
                <div className="login">{comment.login}</div>
                <div className="date">{comment.created}</div>
                <div className="text">{comment.text}</div>
            </div>
            <div className="commentsItems__item_settings">settings</div>
        </div>
    );
}

export default CommentsTabItem;