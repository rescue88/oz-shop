import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearProductComments, createComment, getProductComments } from '../../../../redux/reducers/commentReducer';
import { StateType } from '../../../../types/stateTypes';
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

    useEffect(() => {
        getCommentsHandler();

        return () => {
            dispatch(clearProductComments());
        }
    }, [addCommentHandler]);

    return (
        <div className="singleProduct__content_comments">
            <CommentsTabForm 
                addHandler={addCommentHandler} 
                isFetching={isFetching} 
                productId={productId} 
            />
            <div className="commentsItems">
                {
                    comments.length ? (
                        comments.map(item => (
                            <CommentsTabItem comment={item} />
                        ))
                    ) : (
                        <div>Коментарі поки не додано</div>
                    )
                }
            </div>
        </div>
    );
}

export default CommentsTab;