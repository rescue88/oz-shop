import { FC } from 'react';
import ContentLoader from "react-content-loader";

const HomeLatestLoader: FC = () => {
    return (
        <ContentLoader 
            speed={2}
            width={250}
            height={400}
            viewBox="0 0 250 400"
            backgroundColor="#33f681"
            foregroundColor="#ffa84c"
        >
            <rect x="-2" y="0" rx="0" ry="0" width="250" height="300" /> 
            <rect x="-2" y="311" rx="0" ry="0" width="250" height="45" /> 
            <rect x="182" y="365" rx="0" ry="0" width="63" height="29" />
        </ContentLoader>
    );
}

export default HomeLatestLoader;

