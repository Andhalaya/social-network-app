import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from "../context/theme";
import LightMode from '@mui/icons-material/LightMode';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthProvider';
import DropdownMenu from './Menu';
import * as Icons from "../utils/Icons"

function Header() {

    const { theme, toggleTheme } = useTheme();
    const [showMenu, setShowMenu] = useState(false);
    const [color, setColor] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const changeColor = () => {
        if (window.scrollY >= 90) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    window.addEventListener('scroll', changeColor)

    const handleLogout = () => {
        logout();
        handleClose();
    };

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const options = [
        {
            label: 'Logout',
            onClick: handleLogout,
            icon: Icons.IoIosLogOut
        },
        {
            label: 'Option 1',
            onClick: () => handleLogout,
        },
    ]

    return (
        <div className={color ? `header color ${theme}` : `header ${theme}`}>
            <div className={`logo ${theme}`} onClick={() => { navigate('/home') }}>
                <img src="logo.png" alt="" width='45px' />
                LazyCoder
            </div>
            <div className='menu'>
                <MenuRoundedIcon sx={{ marginRight: '35px' }} onClick={handleShowMenu} />
            </div>

            <div className={`nav ${showMenu ? 'nav-mobile' : 'hidden'}`}>
                <Icons.AiOutlineUser onClick={() => { navigate('/my-profile') }} className={`icon ${theme}`} />
                <Icons.IoNotificationsOutline className={`icon ${theme}`} />
                <Icons.IoChatbubblesOutline onClick={() => { navigate('/messages') }} className={`icon ${theme}`} />
                <DropdownMenu
                    trigger={<Icons.IoSettingsOutline className={`icon ${theme}`} />}
                >
                    <li className='dropdown-item'>
                        Change theme
                        <div className={`switchButton ${theme}`}>
                            <IconButton className={`circle ${theme}`} style={{ left: theme === 'dark' ? '38px' : '0px' }} onClick={toggleTheme}>
                                {theme === 'light' ? <LightMode className={`sun ${theme}`} /> : <Brightness2Icon className={`moon ${theme}`} />}
                            </IconButton>
                        </div>
                    </li>
                    <li onClick={handleLogout} className='dropdown-item'>
                        <Icons.IoIosLogOut className={`icon ${theme}`} />
                        Logout
                    </li>

                </DropdownMenu>


            </div>

        </div>
    )
}

export default Header