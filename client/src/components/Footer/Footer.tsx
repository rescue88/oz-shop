import { FC } from 'react';

import FooterNav from './FooterNav/FooterNav';
import FooterNetwork from './FooterNetwork/FooterNetwork';

const Footer: FC = () => {
    return (
        <footer className="footer space-betw-row">
            <FooterNav />
            <FooterNetwork />
            <div className="footer__rights">©ТОВ "OZ" 2021. Усі права захищено.</div>
        </footer>
    );
}

export default Footer;