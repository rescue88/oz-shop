import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StateType } from '../../../../../../types/stateTypes';
import UserCommentsItem from './UserCommentsItem';
import { clearUserComments, deleteComment, getUserComments } from './../../../../../../redux/reducers/commentReducer';
import { getStorageItem } from '../../../../../../assets/helpers/helpers';
import CommentProductTabLoader from '../../../../../common/Loader/CommentProductTabLoader';

const UserComments: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const userId: string = getStorageItem()!.userId;
    const dispatch = useDispatch();
    const comments = useSelector((state: StateType) => state.comment.user);

    const getComments = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getUserComments(userId));

        setIsFetching(false);
    }, [dispatch, userId]);

    const deleteCommentHandler = useCallback(async (productId: string) => {
        setIsFetching(true);

        await dispatch(deleteComment(userId, productId));

        setIsFetching(false);
    }, [dispatch, userId]);

    useEffect(() => {
        getComments();
        
        return () => {
            dispatch(clearUserComments());
        }
    }, [deleteCommentHandler]);

    return (
        <div className="userAdds__comments">
            <div className="userAdds__comments_items">
                {
                    isFetching ? (
                        Array(5).fill(0).map((item, idx) => <CommentProductTabLoader key={idx} />)
                    ) : (
                        comments.length ? (
                            comments.map(item => (
                                <UserCommentsItem 
                                    key={item._id}
                                    comment={item}
                                    isFetching={isFetching}
                                    deleteComment={deleteCommentHandler}
                                />   
                            ))
                        ) : (
                            <div className="no-items">Коментарі ще не додано</div>
                        )
                    )
                }                    
            </div>
        </div>
    )
};

export default UserComments;