import { FC } from 'react';

const DeliveryPage: FC = () => {
    return (
        <div className="delivery">
            <h1 className="delivery__header">Доставка та оплата</h1>
            <hr />
            <div className="delivery__text">
                Доставка здійснюється виключно за допомогою сервісу "Нова пошта" по території усієї України.
            </div>
            <div className="delivery__text">
                Оплату можна здійснити зразу на сайті або оформити замовлення з можливістю оплати на місці, при отриманні товару у
                відділенні НП.
            </div>
            <div className="delivery__text">
                У майбутньому планується розширення кількості способів доставки та оплати. Особлива увага приділяється оплаті
                криптовалютою.
            </div>
        </div> 
    );
}

export default DeliveryPage;