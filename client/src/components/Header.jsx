import {IconButton, Menu, MenuItem} from '@mui/material';
import { useTheme } from "../context/theme";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LightMode from '@mui/icons-material/LightMode';
import {useState} from 'react';
import { useAuth } from '../context/AuthProvider';

function Header () {
    
    const {theme, toggleTheme} = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { logout } = useAuth();

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout();
        handleClose(); 
    };

    return (
        <nav className={`header ${theme}`}>
            <div className="logo">LazyCoder</div>
            <div className="nav">
                <IconButton 
                    onClick={(e) => { setAnchorEl(e.currentTarget)}} 
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <SettingsIcon className={`icon ${theme}`}/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
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