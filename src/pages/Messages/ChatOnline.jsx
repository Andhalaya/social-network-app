import axios from "axios";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/theme"


export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const { friends } = useAuth();
    const { theme } = useTheme();
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
        console.log("Friends:", friends);
        console.log("Online Users:", onlineUsers);
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `${API_DOMAIN}/conversations/find/${currentId}/${user._id}`
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
                ? <div style={{ textAlign: 'center' }}>No friends connected</div>
                : onlineFriends.map((o) => (
                    <div style={{ cursor: 'pointer', backgroundColor: 'blue' }} onClick={() => handleClick(o)}>
                        <div className="chatOnlineImgContainer">
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o?.fullName}</span>
                    </div>
                ))}
        </div>
    );
}