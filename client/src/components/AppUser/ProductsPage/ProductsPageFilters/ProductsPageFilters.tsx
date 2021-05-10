import { FC, useState } from 'react';

const ProductsPageFilters: FC = () => {
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false);

    return (
        <div className="productsPage__filters space-betw-row">
            <div className="category">
                <ul>
                    <li className="active">Всі</li>
                    <li>Для кухні</li>
                    <li>Для дому</li>
                    <li>Кліматична техніка</li>
                    <li>Аксесуари</li>
                    <li>Гігієна</li>
                </ul>
            </div>
            <div className="sortBy">
                <div className="sortBy__label">
                    <svg
                        aria-hidden="true" 
                        focusable="false" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 320 512"
                    >
                        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                    </svg>
                    <b>Сортувати по:</b>
                    <span>ціні</span>
                </div>
                <div className="sortBy__popup">
                    <ul>
                        <li className="active">ціні</li>
                        <li>рейтингу</li>
                        <li>назві</li>
                        <li>даті</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductsPageFilters;