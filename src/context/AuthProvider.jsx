import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_DOMAIN } from '../utils/api-domain';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_DOMAIN}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.data.user) {
            setIsLoggedIn(true);
            setUser(response.data.user.user);
            setFriends(response.data.user.friendsData)

          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkToken();
  }, [token]);

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`${API_DOMAIN}/users/${user._id}/friends`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setFriends(res.data);
  } catch (error) {
      console.error("Error fetching friends:", error);
  }
  }

  useEffect(() => {
    fetchFriends();
  }, [user])

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, friends, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
