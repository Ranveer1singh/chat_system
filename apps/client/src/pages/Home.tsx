import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
// import {
//   List, ListItem, ListItemAvatar, Avatar, ListItemText,
//   IconButton, TextField, InputAdornment, Badge
// } from '@mui/material';
// import { Search, MoreVert, EditNote, Send, ArrowBack, AttachFile, TagFaces, DoneAll } from '@mui/icons-material';
import { allUser } from '../service/auth/thunk';
import Sidebar from '../component/Sidebar';
import ChatWindow from '../component/ChatWindow';
import { getChatByUserId } from '../service/chat/thunk';


const Home = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, users } = useSelector((state: RootState) => state.auth);
  const { allChats } = useSelector((state: RootState) => state.chat);
  useEffect(() => {
    dispatch(allUser());
    dispatch(getChatByUserId({userId:"69c8ceadc0bd08e2f1e96460"}));
  }, [dispatch]);
  const userChats = useMemo(()=>{
    return allChats.chats
  },[allChats]) 
  const chats = allChats?.chats ?? [];
const selectedChatDetails = chats.find((chat) => chat._id === selectedChat?._id);
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3">
          <p className="text-red-500">{error}</p>
        </div>
      )}
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
          chat={selectedChatDetails} 
          message={message} 
          setMessage={setMessage}
          onBack={() => setSelectedChat(null)}
        />
      </div>
    </div>
  );
};

export default Home;