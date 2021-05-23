import { FC } from 'react';
import ContentLoader from "react-content-loader";

const UserTabOrdersLoader: FC = () => {
    return (
        <ContentLoader 
            speed={2}
            width={650}
            height={250}
            viewBox="0 0 650 250"
            backgroundColor="#33f681"
            foregroundColor="#ffa84c"
        >
            <rect x="164" y="11" rx="0" ry="0" width="289" height="28" /> 
            <rect x="20" y="61" rx="0" ry="0" width="162" height="28" /> 
            <rect x="20" y="102" rx="0" ry="0" width="225" height="28" /> 
            <rect x="20" y="145" rx="0" ry="0" width="202" height="28" /> 
            <rect x="352" y="196" rx="0" ry="0" width="150" height="30" /> 
            <rect x="512" y="191" rx="7" ry="7" width="84" height="39" />
        </ContentLoader>
    );
}

export default UserTabOrdersLoader;