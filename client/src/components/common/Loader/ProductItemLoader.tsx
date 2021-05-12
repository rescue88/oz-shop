import { FC } from "react";
import ContentLoader from "react-content-loader";

const ProductItemLoader: FC = () => {
    return (
        <div style={{backgroundColor: 'rgb(15, 22, 66)'}}>
            <ContentLoader 
                speed={2}
                width={375}
                height={510}
                viewBox="0 0 375 510"
                backgroundColor="#33f681"
                foregroundColor="#ffa84c"
            >
                <rect x="60" y="30" rx="0" ry="0" width="250" height="270" /> 
                <rect x="21" y="316" rx="7" ry="7" width="53" height="33" /> 
                <rect x="276" y="316" rx="0" ry="0" width="76" height="30" /> 
                <rect x="21" y="370" rx="0" ry="0" width="244" height="28" /> 
                <rect x="21" y="410" rx="0" ry="0" width="315" height="37" /> 
                <rect x="1" y="468" rx="0" ry="0" width="185" height="40" /> 
                <rect x="189" y="468" rx="0" ry="0" width="185" height="40" />
            </ContentLoader>
        </div>
    );
}

export default ProductItemLoader;