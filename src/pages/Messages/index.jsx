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

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${API_DOMAIN}/conversations/${user._id}`);
                console.log(res.data)
                setConversations(res.data);
                console.log("getConversations", res.data)
            } catch (err) {
                console.log(err);
            }
        };
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
        try{
            const res = await axios.post(`${API_DOMAIN}/conversations`, {
                senderId: user._id,
                receiverId: friendId
            })
            setCurrentChat(res.data)
            console.log(res.data)
        }catch(error){
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
                <h2>{user.fullName} {user._id}</h2>
                <div style={{ display: 'flex' }}>
                    <div className="conversations">
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                        <div>
                        {friends.map((f)=>(
                            <div onClick={() => startChat(f._id)}>{f.fullName}</div>
                        ))}
                    </div>
                    </div>
                    <div className='messages'>
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                    <ChatOnline
                        onlineUsers={onlineUsers}
                        currentId={user._id}
                        setCurrentChat={setCurrentChat}
                    />
                </div>
            </div>
        </>
    );
}

export default Messages;
