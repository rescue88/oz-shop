import { FC } from 'react';

const StatsNumbers: FC = () => {
    return (
        <div className="stats__numbers centered-row">
            <div className="stats__numbers_item centered-col"><span>Користувачів</span><span>3</span></div>
            <div className="stats__numbers_item centered-col"><span>Куплено товарів</span><span>14</span></div>
            <div className="stats__numbers_item centered-col"><span>Замовлень</span><span>5</span></div>
            <div className="stats__numbers_item centered-col"><span>Товарів на складі</span><span>127</span></div>
            <div className="stats__numbers_item centered-col"><span>Діючі знижки</span><span>2</span> </div>
            <div className="stats__numbers_item centered-col"><span>Найбільша знижка</span><span>50%</span></div>
            <div className="stats__numbers_item centered-col"><span>Сума покупок</span><span>₴ 27000</span></div>
            <div className="stats__numbers_item centered-col"><span>Профіт</span><span>₴ 5400</span></div>
        </div>
    );
}

export default StatsNumbers;