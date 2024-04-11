import { useTheme } from "../context/theme";
import { Divider, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthProvider';
import { useState, useEffect } from "react";
import axios from 'axios';

function FriendsBox() {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3023/users',
                { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data)
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className={`box ${theme}`} style={{ height: '600px', padding:'20px' }}>
            <div className="column" style={{ gap: 15, margin: '0'}}>
                <div className="space-between">
                   <h3 style={{fontWeight:'500'}}>Lazy Coders</h3>
                    <div className="search-box">
                        <input type="text" placeholder="search user" style={{width:'75px'}}/>
                        <IconButton>
                            <SearchIcon className={`icon ${theme}`} style={{width:'20px'}}/>
                        </IconButton>
                    </div> 
                </div>
                
                {users.map(user => (
                    <div className="space-between" style={{ gap: 45 }} key={user._id}>
                        <div className="inline-left" style={{ gap: 5 }}>
                            <img src={user.profilePicture} alt="name" style={{ borderRadius: 40, width: "40px" }} />
                            <div>
                                <h4>{`@${user.userName}`}</h4>
                                <h6 style={{ fontWeight: '400', fontSize: '12px' }}>{user.occupation}</h6>
                            </div>
                        </div>
                        <button className="follow-btn">- unfollow</button>
                    </div>
               ))}
            </div>
        </div>
    )
}

export default FriendsBox;

