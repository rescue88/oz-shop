import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearProductComments, createComment, deleteComment, getProductComments } from '../../../../redux/reducers/commentReducer';
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
    }, [dispatch]);

    const addCommentHandler = useCallback(async (productId: string, userId: string, text: string, positive: boolean) => {
        setIsFetching(true);

        await dispatch(createComment(productId, userId, text, positive));

        setIsFetching(false);
    }, [dispatch]);

    const updateCommentHandler = useCallback(async () => {
        setIsFetching(true);
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
    }, [addCommentHandler, deleteCommentHandler]);

    return (
        <div className="singleProduct__content_comments">
            <CommentsTabForm 
                addHandler={addCommentHandler} 
                isFetching={isFetching} 
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
                                deleteHandler={deleteCommentHandler}
                            />
                        ))
                    ) : (
                        <div style={{fontSize: '1.6rem', fontWeight: 300}}>Коментарі ще не додано</div>
                    )
                }
            </div>
        </div>
    );
}

export default CommentsTab;