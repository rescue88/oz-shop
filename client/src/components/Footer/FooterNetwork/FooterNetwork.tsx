import { FC } from 'react';

import InstagramIcon from './FooterNetworkIcon/InstagramIcon';
import LinkedInIcon from './FooterNetworkIcon/LinkedInIcon';
import TelegramIcon from './FooterNetworkIcon/TelegramIcon';
import ViberIcon from './FooterNetworkIcon/ViberIcon';

const FooterNetwork: FC = () => {
    return (
        <div className="footer__network">
            <a href="/" target="_blank">
                <TelegramIcon />
            </a>
            <a href="/" target="_blank">
                <ViberIcon />
            </a>
            <a href="/" target="_blank">
                <InstagramIcon />
            </a>
            <a href="/" target="_blank">
                <LinkedInIcon />
            </a>
        </div>
    );
}

export default FooterNetwork;