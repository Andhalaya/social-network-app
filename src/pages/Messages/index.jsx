import { useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/theme";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import Header from "../../components/Header";
import { io } from "socket.io-client";
import "./Messages.css";
import SpinningIcon from "../../components/SpinningIcon";
import Message from "../../components/Message";
import * as Icons from "../../utils/Icons";
import { lazy, Suspense } from "react";

const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));

function Messages() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const socket = io('/');
    const [conversations, setConversations] = useState(null)
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await axios.get(`${API_DOMAIN}/conversations/662e443bdedf82fea5f9ed60`);
            setConversations(response);
            console.log(response)
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };
    const sendMessage = async () => {
        try {
            
            await axios.post(`${API_DOMAIN}/messages`, {
                conversationId: '662e443bdedf82fea5f9ed60', 
                sender: user._id,
                text: messageText
            });
            setMessageText('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    

    return (
        <>
            <Header />
            <div className={`main ${theme}`}>
                <div className={`conversations ${theme}`}>
                    <div className={`box ${theme}`}>
                        <p className="inder h4 margin-bottom">CONVERSATIONS</p>
                        <div className="conversation-box">
                            <div className="inline-left gap">
                                <img src={`${API_DOMAIN}/public/uploads/default.jpg`} style={{ borderRadius: 40, width: "40px" }} />
                                <p>{user.fullName}</p>
                            </div>
                            <div className="roboto light small" style={{ marginLeft: '50px' }}>
                                <p>hello? how are you? Long time no see. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`messages ${theme}`}>
                    <div className={`box1 ${theme}`}>
                        <div className="receiver">
                            <div className="inline-left gap">
                                <img src={`${API_DOMAIN}/public/uploads/default.jpg`} style={{ borderRadius: 40, width: "40px" }} />
                                <p>{user.fullName}</p>
                            </div>
                            <Icons.BsThreeDotsVertical className={`icon ${theme}`} />
                        </div>
                        <div></div>
                        <Message />
                    </div>
                    <div className={`box ${theme}`}>
                        <div className="send-box">
                            <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                            <div className="send-btn" onClick={sendMessage}>SEND</div >
                        </div>
                    </div>
                </div>
                <div className={`users ${theme}`}>
                    <Suspense fallback={<div className={`loadingBox3 box ${theme}`}>Loading...<SpinningIcon /></div>}>
                        <FriendsBox type="chat" />
                    </Suspense>
                </div>
            </div>
        </>

    )
}

export default Messages;