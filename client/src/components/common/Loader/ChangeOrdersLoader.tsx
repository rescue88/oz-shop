import { FC } from "react";
import ContentLoader from "react-content-loader";

const ChangeOrdersLoader: FC = () => {
    return (
        <div className="changeOrders__item">
            <ContentLoader 
                speed={2}
                width={800}
                height={325}
                viewBox="0 0 800 325"
                backgroundColor="#33f681"
                foregroundColor="#ffa84c"
            >
                <rect x="158" y="11" rx="0" ry="0" width="289" height="28" /> 
                <rect x="20" y="61" rx="0" ry="0" width="162" height="28" /> 
                <rect x="20" y="102" rx="0" ry="0" width="225" height="28" /> 
                <rect x="20" y="145" rx="0" ry="0" width="202" height="28" /> 
                <rect x="20" y="274" rx="0" ry="0" width="150" height="30" /> 
                <rect x="178" y="270" rx="7" ry="7" width="84" height="39" /> 
                <rect x="470" y="58" rx="0" ry="0" width="162" height="28" /> 
                <rect x="470" y="103" rx="0" ry="0" width="225" height="28" /> 
                <rect x="470" y="144" rx="0" ry="0" width="202" height="28" /> 
                <rect x="20" y="203" rx="0" ry="0" width="330" height="28" /> 
                <rect x="615" y="274" rx="0" ry="0" width="36" height="30" /> 
                <rect x="662" y="274" rx="0" ry="0" width="36" height="30" />
            </ContentLoader>
        </div>
    );
}

export default ChangeOrdersLoader;