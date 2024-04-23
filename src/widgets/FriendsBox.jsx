import { useTheme } from "../context/theme";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Divider } from "@mui/material";
import { API_DOMAIN } from "../utils/api-domain";

function FriendsBox() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/users`,
                { headers: { Authorization: `Bearer ${token}` } });
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(u =>
        u._id !== user._id && u.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFollow = async (filteredUser) => {
        try {
            const res = await axios.patch(
                `${API_DOMAIN}/users/follow/${filteredUser._id}`,
                { userId: user._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

        } catch (error) {
            console.error("Error toggling follow:", error);
        }
    };

    return (
        <div className="friends">
            <div className={`box ${theme}`}>

                <div className="space-between margin-bottom">
                    <h3 className="color" style={{ fontWeight: '500' }}>Lazy Coders</h3>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="search user"
                            style={{ width: '75px' }}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <SearchIcon className={`icon ${theme}`} style={{ width: '20px', marginRight: '10px' }} />
                    </div>

                </div>
                <Divider />
                {filteredUsers.map(filteredUser => (
                    <div className="space-between" key={filteredUser._id}>
                        <div className="inline-left gap">
                            <img src={`${API_DOMAIN}/${filteredUser.profilePicture}`} alt="name" style={{ borderRadius: 40, width: "40px" }} />
                            <div className="column">
                                <h4>{`@${filteredUser.userName}`}</h4>
                                <h6 style={{ fontWeight: '400', fontSize: '12px' }}>{filteredUser.fullName}</h6>
                                <h6 style={{ fontWeight: '400', fontSize: '12px' }}>{filteredUser.occupation}</h6>
                            </div>
                        </div>
                        <button className="follow-btn" onClick={() => toggleFollow(filteredUser)}>
                            {user.friends.includes(filteredUser._id) ? '- unfollow' : '+ follow'}
                        </button>
                    </div>
                ))}

            </div>
        </div>

    )
}

export default FriendsBox;
