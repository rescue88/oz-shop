import { FC } from "react";
import ContentLoader from "react-content-loader";

const CommentProductTabLoader: FC = () => {
    return (
        <div className="commentProductLoader">
            <ContentLoader 
                speed={2}
                width={600}
                height={160}
                viewBox="0 0 600 160"
                backgroundColor="#33f681"
                foregroundColor="#ffa84c"
            >
                <rect x="17" y="21" rx="0" ry="0" width="120" height="120" /> 
                <rect x="150" y="21" rx="0" ry="0" width="108" height="26" /> 
                <rect x="150" y="60" rx="0" ry="0" width="122" height="18" /> 
                <rect x="150" y="91" rx="0" ry="0" width="292" height="50" />
            </ContentLoader>
        </div>
    );
}

export default CommentProductTabLoader;