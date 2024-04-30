import axios from "axios";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../utils/api-domain";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/conversations/${friendId}`);   
        setUser(res.data);
        console.log("Conversation:", res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName">{user?._id}</span>
    </div>
  );
}