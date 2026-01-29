import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText,
  IconButton, TextField, InputAdornment, Badge
} from '@mui/material';
import { Search, MoreVert, EditNote, Send, ArrowBack, AttachFile, TagFaces, DoneAll } from '@mui/icons-material';
import { allUser } from '../service/auth/thunk';
import Sidebar from '../component/Sidebar';
import ChatWindow from '../component/ChatWindow';

const Home = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, users } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);
  // const CHAT_USERS = [
  //   { id: 1, name: 'Arjun Sharma', lastMsg: 'See you at the forest trail!', time: '10:20 AM', online: true, unread: 0 },
  //   { id: 2, name: 'Priya Patela', lastMsg: 'Sent a photo', time: 'Yesterday', online: false, unread: 2 },
  //   { id: 3, name: 'Eco Group', lastMsg: 'John: We should plant more trees.', time: 'Monday', online: true, unread: 0 },
  //   { id: 4, name: 'Suresh Raina', lastMsg: 'The project is ready.', time: 'Jan 12', online: false, unread: 0 },
  // ];

  // const MOCK_MESSAGES = [
  //   { id: 1, text: "Hey! How's the new chat app coming along?", sender: 'them', time: '10:00 AM' },
  //   { id: 2, text: "It's going great! The forest green theme looks amazing.", sender: 'me', time: '10:02 AM' },
  //   { id: 3, text: "I agree, it feels very calm. 🌿", sender: 'them', time: '10:05 AM' },
  // ];

  // console.log(users);
  return (
    <div className="flex h-screen bg-white overflow-hidden">

     <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
        <Sidebar 
          users={users} 
          selectedId={selectedChat?._id} 
          onSelectChat={setSelectedChat}
          loading={loading}
        />
      </div>

      <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 h-full`}>
        <ChatWindow 
          chat={selectedChat} 
          message={message} 
          setMessage={setMessage}
          onBack={() => setSelectedChat(null)}
        />
      </div>
    </div>
  );
};

export default Home;