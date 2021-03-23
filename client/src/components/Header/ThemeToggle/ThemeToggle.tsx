import { FC } from 'react';

import st from './../Header.module.css';

type ThemeToggleType = {
    themeToggled: boolean
    onToggle: () => void
}

const ThemeToggle: FC<ThemeToggleType> = ({ themeToggled, onToggle }) => {
    return (
        <div className={`${st.toggle} ${themeToggled ? st.dark: ''}`} onClick={onToggle}>
            <div className={st.night}></div> 
        </div>
    );
}

export default ThemeToggle;