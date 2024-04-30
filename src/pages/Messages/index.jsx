import { useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/theme";
import { API_DOMAIN } from "../../utils/api-domain";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import Header from "../../components/Header";
import io from 'socket.io-client';
import "./Messages.css";
import SpinningIcon from "../../components/SpinningIcon";
import Message from "../../components/Message";
import * as Icons from "../../utils/Icons";
import { lazy, Suspense } from "react";

const FriendsBox = lazy(() => import("../../widgets/FriendsBox"));

function Messages() {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [chats, setChats] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [users, setUsers] = useState([])
    const userId = user._id

    useEffect(() => {
        const socket = io(`${API_DOMAIN}`);
    
        socket.on('connect', () => {
            console.log('Connected to server');
        });
    
        socket.on('newMessage', (message) => {
          
            setMessages(prevMessages => [...prevMessages, message]);
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);
    
    const sendMessage = async () => {
        if (!selectedChat || !messageText) return;
    
        try {
           
            const message = {
                conversationId: selectedChat._id,
                text: messageText,
                sender: userId
            };
            socket.emit('sendMessage', message);
        } catch (error) {
            console.error('Error sending message:', error);
            return;
        }
    
        setMessageText('');
    };

    const fetchFriends = async () => {
        try {
            const res = await axios.get(`${API_DOMAIN}/users`)
            setUsers(res.data)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
       const fetchChats = async () => {
        try {
            const response = await axios.get(`${API_DOMAIN}/conversations/${userId}`);
            setChats(response.data);

        } catch (error) {
            console.error('Error fetching chats:', error);
        }
        fetchChats();
    }; 
    }, [userId])

    

    const fetchMessages = async (chatId) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/messages/${chatId}`);
            setMessages(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    const handleUserClick = async (friendId) => {
        try {

            const existingChat = chats.find(c => {
                return c.members.includes(userId) && c.members.includes(friendId);
            });

            if (existingChat) {
                setSelectedChat(existingChat);
                fetchMessages(existingChat._id);
            } else {

                const response = await axios.post(`${API_DOMAIN}/conversations`, {
                    receiverId: friendId,
                    senderId: userId
                });
                const newChat = response.data;
                setChats([...chats, newChat]);
                setSelectedChat(newChat);
                fetchMessages(newChat._id);
            }
        } catch (error) {
            console.error('Error handling user click:', error);
        }
    };


    useEffect(() => {
        if (selectedChat) {
            fetchMessages(selectedChat._id);
        }
    }, [selectedChat]);

    return (
        <>
            <Header />
            <div className={`main ${theme}`}>
                <div>
                  <div className="friends">
                    <h2>FRIENDS</h2>
                    {users.map((user, index) => (
                        <p onClick={() => handleUserClick(user._id)} key={index} className='user'>{user.fullName}</p>
                    ))}
                </div>
                <FriendsBox type='chat' />  
                </div>
                
                <div className='messages'>
                    <h2>Mensajes</h2>  
                    {selectedChat && (
                        <div>
                            <h3>Chat con {selectedChat.members[1]}</h3>
                            <ul>
                                {messages.map((message, index) => (
                                    <li key={index} style={{backgroundColor:(message.sender === userId) ? 'red' : 'blue'}}>{message.text}</li>
                                ))}
                            </ul>

                        </div>
                    )}
                    <div className="message-input">
                        <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
                <div className='chats'>
                    <h2>CHATS</h2>
                    <ul>
                        {chats.map((chat, index) => (
                            <li key={index} onClick={() => setSelectedChat(chat)}>
                                {chat.members[1]}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Messages;