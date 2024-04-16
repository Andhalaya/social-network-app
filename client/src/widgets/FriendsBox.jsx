import { useTheme } from "../context/theme";
import { Divider, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from "react";
import axios from 'axios';
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

    const toggleFollow = async (userId) => {
        try {
            const res = await axios.patch(
                `${API_DOMAIN}/users/follow/${userId}`,
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(res.data)
            fetchUsers();
        } catch (error) {
            console.error("Error toggling follow:", error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`box ${theme}`} style={{ height: '600px', padding: '20px' }}>
            <div className="column" style={{ gap: 15, margin: '0' }}>
                <div className="space-between">
                    <h3 style={{ fontWeight: '500' }}>Lazy Coders</h3>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="search user"
                            style={{ width: '75px' }}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <SearchIcon className={`icon ${theme}`} style={{ width: '20px',marginRight:'10px' }} />
                    </div>
                </div>

                {filteredUsers.map(filteredUser => (
                    <div className="space-between" style={{ gap: 45, alignItems:'start' }} key={filteredUser._id}>
                        <div className="inline-left" style={{ gap: 10, alignItems:'start' }}>
                            <img src={filteredUser.profilePicture} alt="name" style={{ borderRadius: 40, width: "40px" }} />
                            <div style={{marginTop: '-5px'}}>
                                <h4>{`@${filteredUser.userName}`}</h4>
                                <h6 style={{ fontWeight: '400', fontSize: '12px' }}>{filteredUser.fullName}</h6>
                                <h6 style={{ fontWeight: '400', fontSize: '12px' }}>{filteredUser.occupation}</h6>
                            </div>
                        </div>
                       
                        <button onClick={() => toggleFollow(filteredUser._id)}>Follow/Unfollow</button>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FriendsBox;
