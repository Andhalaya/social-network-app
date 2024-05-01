import axios from "axios";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import { useAuth } from "../../context/AuthProvider";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/users/${friendId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );   
        setUser(res.data);
        console.log("friend data", res.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="inline-left gap">
        <img src={`${API_DOMAIN}/public/default.jpg`} style={{ borderRadius: 40, width: "40px" }}/>
        <span className="conversationName">{user ? user.fullName : ''}</span>
    </div>
  );
}