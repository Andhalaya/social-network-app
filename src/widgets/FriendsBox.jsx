import { useTheme } from "../context/theme";
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Divider } from "@mui/material";
import { API_DOMAIN } from "../utils/api-domain";
import SpinningIcon from "../components/SpinningIcon";
import AnimatedBox from "../components/Box";
import * as Icons from "../utils/Icons";

function FriendsBox({ type }) {
    const { theme } = useTheme();
    const { token, user, friends, setUser } = useAuth(); 
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [updateUsers, setUpdateUsers] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [updateUsers]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/users`,
                { headers: { Authorization: `Bearer ${token}` } });
            if (type === 'home') {
                setUsers(res.data)
            } else if (type === 'profile') {
                setUsers(friends);
            }

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleFollow = async (filteredUser) => {
        try {
            const res = await axios.patch(
                `${API_DOMAIN}/users/follow/${filteredUser._id}`,
                { userId: user._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(res.data.user);

        } catch (error) {
            console.error("Error toggling follow:", error);
        }
    };

    let filteredUsers;
    if (type === 'home') {
        filteredUsers = users.filter(u => u.userName.toLowerCase().includes(searchTerm.toLowerCase()));
        filteredUsers = filteredUsers.sort(() => 0.5 - Math.random()).slice(0, 4);
    } else if (type === 'profile') {
        filteredUsers = users.filter(u => user.friends.includes(u._id) && u.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const handleShowMore = () => {
        setUpdateUsers(!updateUsers);
    };

    return (
        <div className="friends">
            <AnimatedBox >
                <div className="space-between margin-bottom">
                    <div className="inline-left gap">
                        <p className="inder h4">LAZY CODERS</p>
                        {type === 'home' && (
                            <div onClick={handleShowMore}><SpinningIcon /></div>
                        )}
                    </div>
                    {/* <div className="search-box">
                        <input
                            type="text"
                            placeholder="search user"
                            style={{ width: '75px' }}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <SearchIcon className={`icon ${theme}`} style={{ width: '20px', marginRight: '10px' }} />
                    </div> */}
                    <Icons.IoSearch  className={`icon white ${theme}`} />
                </div>
                {filteredUsers.map(filteredUser => (
                    <div className="space-between margin-top" key={filteredUser._id}>
                        <div className="inline-left gap">
                            <img src={`${API_DOMAIN}/public${filteredUser.profilePicture ? filteredUser.profilePicture : '/uploads/default.jpg'}`} style={{ borderRadius: 40, width: "40px" }} />
                            <div className="column">
                                <p className={`typography3 ${theme}`}>{filteredUser.fullName}</p>
                                <p className={`typography4 ${theme}`}>{filteredUser.occupation ? filteredUser.occupation : 'full-time lazyCoder'}</p>
                            </div>
                        </div>
                        <button className="follow-btn" onClick={() => toggleFollow(filteredUser)}>
                            {user.friends.includes(filteredUser._id) ? <Icons.HiUserRemove className={`icon orange ${theme}`} style={{fontSize: '30px'}} /> : <Icons.HiOutlineUserAdd className={`icon ${theme}`} style={{fontSize: '30px'}} />}
                        </button>
                    </div>
                ))}
            </AnimatedBox>
        </div>
    )
}

export default FriendsBox;
