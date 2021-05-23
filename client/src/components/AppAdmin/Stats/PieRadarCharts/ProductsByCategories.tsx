import { FC } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
    {
        subject: 'Для кухні',
        A: 3,
        B: 3,
        fullMark: 3,
    },
    {
        subject: 'Для дому',
        A: 3,
        B: 3,
        fullMark: 3,
    },
    {
        subject: 'Кліматичні',
        A: 2,
        B: 2,
        fullMark: 3,
    },
    {
        subject: 'Аксесуари',
        A: 2,
        B: 2,
        fullMark: 3,
    },
    {
        subject: 'Для гігієни',
        A: 3,
        B: 3,
        fullMark: 3,
    },
];

const ProductsByCategories: FC = () => {
    return (
        <>
            <div className="chart-header">Кількість товарів по категоріям</div>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="A" stroke="rgb(255, 168, 76)" fill="rgb(51, 246, 129)" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </>
    );
}

export default ProductsByCategories;