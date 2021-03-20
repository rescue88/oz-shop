import { FC } from 'react';
import FooterNav from './FooterNav/FooterNav';

import st from './Footer.module.css';
import FooterNetwork from './FooterNetwork/FooterNetwork';

const Footer: FC = () => {
    return (
        <footer className={st.footer}>
            <FooterNav />
            <FooterNetwork />
            <div className={st.footer__rights}>©ТОВ "OZ" 2021. Усі права захищені.</div>
        </footer>
    );
}

export default Footer;