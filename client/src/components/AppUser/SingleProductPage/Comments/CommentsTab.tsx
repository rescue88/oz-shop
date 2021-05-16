import { FC } from 'react';
import CommentsTabForm from './CommentsTabForm';

const CommentsTab: FC = () => {
    return (
        <div className="singleProduct__content_comments">
            <CommentsTabForm />
        </div>
    );
}

export default CommentsTab;