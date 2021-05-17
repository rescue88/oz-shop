import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../../../redux/thunks/commentReducer';

import CommentsTabForm from './CommentsTabForm';

export type CommentsTabType = {
    productId: string;
}

const CommentsTab: FC<CommentsTabType> = ({productId}) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();

    const getCommentsHandler = useCallback(async () => {
        setIsFetching(true);
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

    }, [addCommentHandler]);

    return (
        <div className="singleProduct__content_comments">
            <CommentsTabForm 
                addHandler={addCommentHandler} 
                isFetching={isFetching} 
                productId={productId} 
            />
        </div>
    );
}

export default CommentsTab;