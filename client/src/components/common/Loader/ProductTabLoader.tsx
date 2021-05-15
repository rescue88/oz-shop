import { FC } from "react";
import ContentLoader from "react-content-loader";

const ProductTabLoader: FC = () => {
    return (
        <ContentLoader 
            speed={2}
            width={900}
            height={625}
            viewBox="0 0 900 625"
            backgroundColor="#33f681"
            foregroundColor="#ffa84c"
        >
            <rect x="12" y="36" rx="0" ry="0" width="289" height="45" /> 
            <rect x="12" y="96" rx="7" ry="7" width="68" height="45" /> 
            <rect x="436" y="107" rx="0" ry="0" width="156" height="28" /> 
            <rect x="12" y="161" rx="0" ry="0" width="650" height="58" />
            <rect x="12" y="230" rx="0" ry="0" width="305" height="407" /> 
            <rect x="332" y="229" rx="0" ry="0" width="107" height="38" /> 
            <rect x="332" y="281" rx="0" ry="0" width="275" height="77" /> 
            <rect x="332" y="369" rx="7" ry="7" width="95" height="54" /> 
            <rect x="445" y="369" rx="7" ry="7" width="95" height="54" /> 
            <rect x="332" y="437" rx="0" ry="0" width="156" height="28" /> 
            <rect x="332" y="474" rx="0" ry="0" width="156" height="28" /> 
            <rect x="332" y="512" rx="0" ry="0" width="156" height="28" /> 
            <rect x="332" y="551" rx="0" ry="0" width="156" height="28" /> 
            <rect x="389" y="596" rx="0" ry="0" width="105" height="28" /> 
            <rect x="503" y="588" rx="7" ry="7" width="71" height="40" /> 
        </ContentLoader>
    );
}

export default ProductTabLoader;
