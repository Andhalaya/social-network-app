import { useTheme } from "../context/theme";
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from "react";
import axios from 'axios';
import { API_DOMAIN } from "../utils/api-domain";
import SpinningIcon from "../components/SpinningIcon";
import AnimatedBox from "../components/Box";
import * as Icons from "../utils/Icons";
import { useNavigate } from "react-router"

function FriendsBox({ type, userData }) {
    const { theme } = useTheme();
    const { token, user, setUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [profileUser, setProfileUser] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        setProfileUser(userData || user);
    }, [userData, user]);

    useEffect(() => {
        if (type === 'home') {
            fetchUsers();
        } else if (type === 'profile') {
            fetchFriends();
        }
    }, [type, profileUser]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/users`);
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchFriends = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/users/${profileUser._id}/friends`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching friends:", error);
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
        filteredUsers = users.filter(u => u.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (type === 'profile') {
        filteredUsers = users.filter(u => userData && userData.friends.includes(u._id) && u.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    }


    const handleShowMore = () => {
        fetchUsers();
    };

    return (
        <div className="friends">
            <AnimatedBox >
                <div className="space-between margin-bottom">
                    <div className="inline-left gap">
                        <p className="inder h4">{type === 'home' ? 'LAZY CODERS' : 'FRIENDS'}</p>
                        {type === 'home' && (
                            <div onClick={handleShowMore}><SpinningIcon /></div>
                        )}
                    </div>
                    <Icons.IoSearch className={`icon white ${theme}`} onClick={() => setShowSearchInput(!showSearchInput)} />
                </div>
                {showSearchInput && (
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="search user"
                            style={{ width: '75px' }}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                )}

                {filteredUsers.length === 0 ?
                    <div style={{ textAlign: 'center', padding: '15px 0px' }}> <p>No friends yet!</p> </div>
                    : filteredUsers.map(filteredUser => (
                        <div className="space-between margin-top" key={filteredUser._id}>
                            <div className="inline-left gap">
                                <img src={`${API_DOMAIN}/public${filteredUser.profilePicture ? filteredUser.profilePicture : '/uploads/default.jpg'}`} style={{ borderRadius: 40, width: "40px" }} />
                                <div className="column">
                                    <p
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { navigate(`/profile/${filteredUser._id}`) }}
                                        className={`typography3 ${theme}`}
                                    >
                                        {filteredUser.fullName}
                                    </p>
                                    <p className={`typography4 ${theme}`}>{filteredUser.occupation}</p>
                                </div>
                            </div>
                            {profileUser._id === user._id && (
                                <button className="follow-btn" onClick={() => toggleFollow(filteredUser)}>
                                    {user.friends.includes(filteredUser._id) ? <Icons.HiUserRemove className={`icon orange ${theme}`} style={{ fontSize: '30px' }} /> : <Icons.HiOutlineUserAdd className={`icon ${theme}`} style={{ fontSize: '30px' }} />}
                                </button>
                            )}

                        </div>
                    ))}
            </AnimatedBox>
        </div>
    )
}

export default FriendsBox;
