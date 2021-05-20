import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearProductComments, createComment, deleteComment, getProductComments, updateComment } from '../../../../redux/reducers/commentReducer';
import { StateType } from '../../../../types/stateTypes';
import CommentProductTabLoader from '../../../common/Loader/CommentProductTabLoader';
import CommentsTabForm from './CommentsTabForm';
import CommentsTabItem from './CommentsTabItem';

export type CommentsTabType = {
    productId: string;
}

const CommentsTab: FC<CommentsTabType> = ({productId}) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();
    const comments = useSelector((state: StateType) => state.comment.product);

    const getCommentsHandler = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getProductComments(productId));

        setIsFetching(false);
    }, [dispatch, productId]);

    const addCommentHandler = useCallback(async (userId: string, productId: string, text: string, positive: boolean) => {
        setIsFetching(true);

        await dispatch(createComment(userId, productId, text, positive));

        setIsFetching(false);
    }, [dispatch]);

    const updateCommentHandler = useCallback(async (userId: string, productId: string, text: string, positive: boolean) => {
        setIsFetching(true);

        await dispatch(updateComment(userId, productId, text, positive));

        setIsFetching(false);
    }, [dispatch]);

    const deleteCommentHandler = useCallback(async (user: string, product: string) => {
        setIsFetching(true);

        await dispatch(deleteComment(user, product));

        setIsFetching(false);
    }, [dispatch]);

    // get comments at the beginning and after changes
    useEffect(() => {
        getCommentsHandler();

        return () => {
            dispatch(clearProductComments());
        }
    }, [addCommentHandler, updateCommentHandler, deleteCommentHandler]);

    return (
        <div className="singleProduct__content_comments">
            <CommentsTabForm 
                addOrUpdateComment={addCommentHandler}  
                productId={productId} 
            />
            <div className="commentsItems">
                {
                    isFetching ? (
                        Array(5).fill(0).map((item, idx) => <CommentProductTabLoader key={idx} />)
                    ) : comments.length ? (
                        comments.map(item => (
                            <CommentsTabItem 
                                key={item._id}
                                comment={item} 
                                updateHandler={updateCommentHandler}
                                deleteHandler={deleteCommentHandler}
                            />
                        ))
                    ) : (
                        <div className="no-items">Коментарі ще не додано</div>
                    )
                }
            </div>
        </div>
    );
}

export default CommentsTab;