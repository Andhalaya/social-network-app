import { useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/theme";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import Header from "../../components/Header";
import io from 'socket.io-client';
import "./Messages.css";
import SpinningIcon from "../../components/SpinningIcon";
import Message from "./Message";
import Conversation from "./Conversation";
import ChatOnline from "./ChatOnline"
import * as Icons from "../../utils/Icons";
import { lazy, Suspense } from "react";
import AnimatedBox from "../../components/Box";

const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));

function Messages() {
    const { theme } = useTheme();
    const { token, user, friends } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef();

    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(`${API_DOMAIN}`);
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.friends.filter((f) => users.some((u) => u.userId === f))
            );
            console.log("Current user:", user.fullName)
        });
    }, [user]);

    const getConversations = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/conversations/${user._id}`);
            setConversations(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/messages/` + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user._id);

        const sendMessage = async () => {
            try {
                const res = await axios.post(`${API_DOMAIN}/messages`, message);
                setMessages([...messages, res.data]);
                setNewMessage("");
            } catch (err) {
                console.log(err);
            }
        }

        if (onlineUsers.includes(receiverId)) {
            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId,
                text: newMessage,
            });
            sendMessage();

        } else {
            sendMessage();
        }
    };

    const startChat = async (friendId) => {
        try {
            const res = await axios.post(`${API_DOMAIN}/conversations`, {
                senderId: user._id,
                receiverId: friendId
            })
            setCurrentChat(res.data)
            getConversations();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <Header />
            <div className={`main ${theme}`}>
                <div className="conversations">
                    <ChatOnline
                        onlineUsers={onlineUsers}
                        currentId={user._id}
                        setCurrentChat={setCurrentChat}
                    />
                    <div className={`box3 ${theme}`}>
                        <p className="inder margin-bottom">CONVERSATIONS</p>
                        <div className="conversations-list">
                            {conversations.map((c) => (
                                <div key={c._id} onClick={() => setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`chat ${theme}`}>
                    <div className={`box2 ${theme}`}>
                        <div className="receiver">
                            <div className="inline-left gap">
                                <img src={`${API_DOMAIN}/public${user.profilePicture}`} style={{ borderRadius: 40, width: "40px" }} />
                                <p>{user.fullName}</p>
                            </div>
                            <Icons.BsThreeDotsVertical className={`icon ${theme}`} />
                        </div>
                        <div >
                            {currentChat ? (
                                <div className='messages' style={{ padding: '20px' }}>
                                    {messages.map((m) => (
                                        <div className="message-box" ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="noConversationText">
                                    Select a user to start a chat.
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`box3 ${theme}`}>
                        <div className="send-box">
                            <input
                                className="chatMessageInput"
                                placeholder="write something..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            />
                            <div className="send-btn" onClick={handleSubmit}>
                                Send
                            </div>
                        </div>
                    </div>
                </div>
                <div className="users">
                    <div className="box3 column">
                        <p className="inder margin-bottom">FRIENDS</p>
                        <div className="friends-list">
                            {friends.map((f) => (
                                <div className="space-between">
                                    <div className="inline-left gap">
                                        <img src={`${API_DOMAIN}/public/${f.profilePicture}`} style={{ borderRadius: 40, width: "30px" }} />
                                        <div key={f._id} >{f.fullName}</div>
                                    </div>
                                    <Icons.IoChatbubblesOutline className={`icon ${theme}`} onClick={() => startChat(f._id)}/>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Messages;
