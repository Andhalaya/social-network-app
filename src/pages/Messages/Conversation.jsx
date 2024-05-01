import axios from "axios";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import { useAuth } from "../../context/AuthProvider";

export default function Conversation({ conversation, currentUser, lastMessage }) {
    const [user, setUser] = useState(null);
    const { token } = useAuth();
  
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/users/${friendId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });   
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getUser();
    }, [currentUser, conversation, token]);

    return (
        <div className="inline-left">
            {user && lastMessage && (
                <>
                    <img src={`${API_DOMAIN}/public/${user.profilePicture}`} style={{ borderRadius: 40, width: "40px" }}/>
                    <span className="conversationName">{user.fullName}</span>
                    <p>Last message: {lastMessage.text}</p>
                </>
            )}
        </div>
    );
}
