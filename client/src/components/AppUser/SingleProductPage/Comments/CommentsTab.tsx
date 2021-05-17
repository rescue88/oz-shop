import { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../../../redux/reducers/commentReducer';

import CommentsTabForm from './CommentsTabForm';
import CommentsTabItem from './CommentsTabItem';

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
            <div className="commentsItems">
                {
                    Array(5).fill(0).map((item, idx) => (<CommentsTabItem key={idx} />))
                }
            </div>
        </div>
    );
}

export default CommentsTab;