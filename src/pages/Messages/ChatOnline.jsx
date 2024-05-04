import axios from "axios";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/theme"


export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const { token, friends } = useAuth();
    const { theme } = useTheme();
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `${API_DOMAIN}/conversations/find/${currentId}/${user._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`chatOnline box3 ${theme}`}>
            <p className="inder margin-bottom">CONNECTED FRIENDS</p>
            {onlineFriends.length === 0
                ? <div style={{ textAlign: 'center', color:'rgba(254, 117, 77, 0.68)' }}>No friends connected</div>
                : onlineFriends.map((o) => (
                    <div className="connected-user" key={o._id} onClick={() => handleClick(o)}>
                        <div className="inline-left gap" style={{position:'relative'}}>
                            <div className="green-dot"></div>
                            <img src={`${API_DOMAIN}/public${o.profilePicture ? o.profilePicture : '/uploads/default.jpg'}`} alt=""  style={{ borderRadius: 40, width: "30px" }}/>
                            <p className="chatOnlineName">{o?.fullName}</p>
                        </div>
                        
                    </div>
                ))}
        </div>
    );
}