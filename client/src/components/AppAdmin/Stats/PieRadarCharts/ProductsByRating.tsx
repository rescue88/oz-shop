import { FC } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
    {
        subject: 'Колонка Tronsmart Elemnt T6',
        A: 9.5,
        B: 9.5,
        fullMark: 10,
    },
    {
        subject: 'Люстра Trio Rustica',
        A: 10,
        B: 10,
        fullMark: 10,
    },
    {
        subject: 'Корзина GIFF L=560',
        A: 10,
        B: 10,
        fullMark: 10,
    },
    {
        subject: 'Парфуми My Golden Parfume',
        A: 8.5,
        B: 8.5,
        fullMark: 10,
    },
    {
        subject: 'Холодильник BOSCH KGN39VI306',
        A: 7.5,
        B: 7.5,
        fullMark: 10,
    },
];

const ProductsByRating: FC = () => {
    return (
        <>
            <div className="chart-header">Товари з найбільшою оцінкою</div>
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

export default ProductsByRating;