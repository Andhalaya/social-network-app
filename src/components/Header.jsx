import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from "../context/theme";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LightMode from '@mui/icons-material/LightMode';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthProvider';
import * as Icons from "../utils/Icons"

function Header() {

    const { theme, toggleTheme } = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const open = Boolean(anchorEl);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout();
        handleClose();
    };

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className={`header ${theme}`}>
            <div className={`logo ${theme}`} onClick={() => { navigate('/home') }}>
                <img src="logo3.png" alt="" width='45px' />
                LazyCoder
            </div>
            <div className='menu'>
                <MenuRoundedIcon sx={{ marginRight: '35px' }} onClick={handleShowMenu} />
            </div>

            <div className={`nav ${showMenu ? 'nav-mobile' : 'hidden'}`}>

                <Icons.IoNotificationsOutline className={`icon ${theme}`} />

                < Icons.IoChatbubblesOutline className={`icon ${theme}`} />

                <Icons.FaRegUser onClick={() => { navigate('/my-profile') }} className={`icon ${theme}`} />
                <IconButton
                    onClick={(e) => { setAnchorEl(e.currentTarget) }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Icons.IoSettingsOutline className={`icon ${theme}`} />
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
                <div className={`switchButton ${theme}`}>
                    <IconButton className={`circle ${theme}`} style={{ left: theme === 'dark' ? '38px' : '0px' }} onClick={toggleTheme}>
                        {theme === 'light' ? <LightMode className={`sun ${theme}`} /> : <Brightness2Icon className={`moon ${theme}`} />}
                    </IconButton>
                </div>
            </div>

        </div>
    )
}

export default Header