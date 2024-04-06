import IconButton from '@mui/material/IconButton';
import { useTheme } from "../theme";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LightMode from '@mui/icons-material/LightMode';
import Brightness2Icon from '@mui/icons-material/Brightness2';

function Header () {
    
    const {theme, toggleTheme} = useTheme();
    return (
        <nav className={`header ${theme}`}>
            <div className="logo">LazyCoder</div>
            <div className="nav">
                <IconButton>
                    <SettingsIcon className={`icon ${theme}`}/>
                </IconButton>
                <IconButton>
                    <NotificationsIcon className={`icon ${theme}`}/>
                </IconButton>
                <IconButton>
                    < MarkChatUnreadOutlinedIcon className={`icon ${theme}`}/>
                </IconButton>
                <IconButton>
                    <PersonRoundedIcon className={`icon ${theme}`}/>
                </IconButton>
                <div className={`switchButton ${theme}`}>
                    <IconButton className={`circle ${theme}`} style={{left: theme === 'dark' ? '38px' : '0px'}} onClick={toggleTheme}>
                        {theme === 'light' ? <LightMode className={`sun ${theme}`} /> : <Brightness2Icon className={`moon ${theme}`} />}
                    </IconButton>
                </div>
            </div>
        </nav>
    )
}

export default Header