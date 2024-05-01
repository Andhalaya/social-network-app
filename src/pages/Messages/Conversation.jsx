import axios from "axios";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../utils/api-domain";
import { useAuth } from "../../context/AuthProvider";
import moment from 'moment';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  function calculateTimeAgo(timestamp) {
    return moment(timestamp).format("LT");
}
  
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
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
       {user && (
        <div className="conversation">
            <div className="inline-left gap">
               <img src={`${API_DOMAIN}/public/${user.profilePicture}`} style={{ borderRadius: 40, width: "30px" }}/>
                <p>{user.fullName}</p>  
            </div>         
          <div className="lastMessage">
            <p style={{fontSize:'12px'}}>{conversation.messages.length > 0 ?  calculateTimeAgo(conversation.messages[conversation.messages.length - 1].createdAt) : ''}</p>
            <p>{conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].text : <em style={{fontSize:'12px'}}>No messages yet</em>}</p>
          </div>
        </div>
      )}
    </>
  );
}