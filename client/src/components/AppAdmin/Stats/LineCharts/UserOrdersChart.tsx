import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Січень 2021',
        "К-ть товарів": 4,
    },
    {
        name: 'Лютий 2021',
        "К-ть товарів": 6,
    },
    {
        name: 'Березень 2021',
        "К-ть товарів": 10,
    },
    {
        name: 'Квітень 2021',
        "К-ть товарів": 13,
    },
    {
        name: 'Травень 2021',
        "К-ть товарів": 17,
    },
];

const UserOrdersChart: FC = () => {
    return (
        <>
            <div className="chart-header">Кількість проданих товарів за місяцями</div>
            <ResponsiveContainer className="chartBlock" width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 50,
                        left: 20,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="name" style={{fill: '#FFF', fontSize: '1.4rem'}} dx={-17} dy={7} />
                    <YAxis style={{fill: '#FFF', fontSize: '1.4rem'}} />
                    <Tooltip />
                    <Line type="monotone" dataKey="К-ть товарів" stroke="rgb(255, 168, 76)" />
                </LineChart>
        </ResponsiveContainer>
        </>
    );
}

export default UserOrdersChart;