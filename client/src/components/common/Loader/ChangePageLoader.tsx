import { FC } from "react"
import ContentLoader from "react-content-loader"

const ChangePageLoader: FC = () => {
    return (
        <div className="changePageLoader">
            <ContentLoader 
                speed={2}
                width={800}
                height={40}
                viewBox="0 0 850 40"
                backgroundColor="#33f681"
                foregroundColor="#ffa84c"
            >
                <rect x="5" y="7" rx="0" ry="0" width="94" height="25" /> 
                <rect x="108" y="7" rx="0" ry="0" width="165" height="25" /> 
                <rect x="289" y="7" rx="0" ry="0" width="115" height="25" /> 
                <rect x="415" y="7" rx="0" ry="0" width="115" height="25" /> 
                <rect x="545" y="7" rx="0" ry="0" width="35" height="25" />
            </ContentLoader>
        </div>
    )
}

export default ChangePageLoader;