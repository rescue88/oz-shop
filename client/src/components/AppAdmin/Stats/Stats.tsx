import { FC } from 'react';

import ProductsByCategories from './PieRadarCharts/ProductsByCategories';
import ProductsByRating from './PieRadarCharts/ProductsByRating';
import StatsNumbers from './StatsNumbers';
import UserOrdersChart from './LineCharts/UserOrdersChart';

const Stats: FC = () => {
    return (
        <div className="stats">
            <StatsNumbers />
            <div className="stats__line">
                <div className="stats__line_item"><UserOrdersChart /></div>
            </div>
            <div className="stats__pieRadar">
                <div className="stats__pieRadar_item"><ProductsByCategories /></div>
                <div className="stats__pieRadar_item"><ProductsByRating /></div>
            </div>
        </div>
    );
}

export default Stats;