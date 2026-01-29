import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText,
  IconButton, TextField, InputAdornment, Badge
} from '@mui/material';
import { Search, MoreVert, EditNote, Send, ArrowBack, AttachFile, TagFaces, DoneAll } from '@mui/icons-material';
import { allUser } from '../service/auth/thunk';

const Home = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, users } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);
  const CHAT_USERS = [
    { id: 1, name: 'Arjun Sharma', lastMsg: 'See you at the forest trail!', time: '10:20 AM', online: true, unread: 0 },
    { id: 2, name: 'Priya Patela', lastMsg: 'Sent a photo', time: 'Yesterday', online: false, unread: 2 },
    { id: 3, name: 'Eco Group', lastMsg: 'John: We should plant more trees.', time: 'Monday', online: true, unread: 0 },
    { id: 4, name: 'Suresh Raina', lastMsg: 'The project is ready.', time: 'Jan 12', online: false, unread: 0 },
  ];

  const MOCK_MESSAGES = [
    { id: 1, text: "Hey! How's the new chat app coming along?", sender: 'them', time: '10:00 AM' },
    { id: 2, text: "It's going great! The forest green theme looks amazing.", sender: 'me', time: '10:02 AM' },
    { id: 3, text: "I agree, it feels very calm. 🌿", sender: 'them', time: '10:05 AM' },
  ];

  console.log(users);
  return (
    <div className="flex h-screen bg-white overflow-hidden">

      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-[400px] border-r border-gray-100 flex-col h-full bg-white`}>
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2D6936]">Messages</h1>
            <div className="flex gap-1">
              <IconButton className="!text-[#2D6936]"><EditNote /></IconButton>
              <IconButton className="!text-gray-400"><MoreVert /></IconButton>
            </div>
          </div>
          <TextField
            fullWidth
            placeholder="Search conversations..."
            variant="outlined"
            size="small"
            InputProps={{
              className: "!rounded-xl !bg-gray-50 border-none px-2",
              startAdornment: <InputAdornment position="start"><Search className="text-gray-400" /></InputAdornment>,
            }}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
          />
        </div>

        <List className="flex-grow overflow-y-auto mt-2 px-2">
          {CHAT_USERS.map((user) => (
            <ListItem
              key={user.id}
              onClick={() => setSelectedChat(user)}
              className={`rounded-2xl mb-1 cursor-pointer transition-all ${selectedChat?.id === user.id ? 'bg-[#E8F0E8]' : 'hover:bg-gray-50'
                }`}
              secondaryAction={
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[11px] ${user.unread > 0 ? 'text-[#2D6936] font-bold' : 'text-gray-400'}`}>
                    {user.time}
                  </span>
                  {user.unread > 0 && (
                    <div className="bg-[#2D6936] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {user.unread}
                    </div>
                  )}
                </div>
              }
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  invisible={!user.online}
                  sx={{ '& .MuiBadge-badge': { backgroundColor: '#44b700' } }}
                >
                  <Avatar className="!bg-[#2D6936] !text-[#E8F0E8] shadow-sm">
                    {user.name[0]}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={<span className={`text-[15px] ${user.unread > 0 ? 'font-bold text-black' : 'font-semibold text-gray-800'}`}>{user.name}</span>}
                secondary={
                  <div className="flex items-center gap-1">
                    {user.id === 1 && <DoneAll className="text-[14px] text-[#2D6936]" />}
                    <span className="text-sm text-gray-500 truncate block w-[160px]">
                      {user.lastMsg}
                    </span>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>

      <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#F8F9F8] relative`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/80 backdrop-blur-md p-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <IconButton className="md:hidden !text-[#2D6936]" onClick={() => setSelectedChat(null)}>
                  <ArrowBack />
                </IconButton>
                <Avatar className="!bg-[#2D6936] !w-10 !h-10 shadow-sm">{selectedChat.name[0]}</Avatar>
                <div>
                  <p className="font-bold text-gray-800 leading-tight">{selectedChat.name}</p>
                  <p className="text-[11px] text-[#2D6936] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#44b700] rounded-full"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <IconButton className="!text-gray-400"><Search /></IconButton>
                <IconButton className="!text-gray-400"><MoreVert /></IconButton>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col custom-scrollbar">
              {/* Center Date Badge */}
              <div className="self-center bg-gray-200/50 px-3 py-1 rounded-full">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Today</span>
              </div>

              {MOCK_MESSAGES.map((msg) => (
                <div key={msg.id} className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${msg.sender === 'me'
                    ? 'bg-[#2D6936] text-white self-end rounded-tr-none'
                    : 'bg-white text-gray-800 self-start rounded-tl-none'
                  }`}>
                  <p className="text-[14px] leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'me' ? 'text-white/60' : 'text-gray-400'}`}>
                    <span className="text-[9px] font-medium">{msg.time}</span>
                    {msg.sender === 'me' && <DoneAll className="text-[14px]" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <div className="flex bg-gray-50 rounded-full flex-1 items-center px-2">
                <IconButton size="small"><TagFaces className="text-gray-400" /></IconButton>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
                />
                <IconButton size="small"><AttachFile className="text-gray-400 rotate-45" /></IconButton>
              </div>
              <IconButton
                disabled={!message.trim()}
                className={`${message.trim() ? '!bg-[#2D6936] !text-white' : '!bg-gray-100 !text-gray-300'} !transition-all shadow-md`}
              >
                <Send className="text-[20px]" />
              </IconButton>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="w-24 h-24 bg-[#E8F0E8] rounded-full flex items-center justify-center mb-6 animate-bounce duration-1000">
              <span className="text-4xl">🌿</span>
            </div>
            <h2 className="text-2xl font-bold text-[#2D6936]">Stay Rooted</h2>
            <p className="text-gray-500 max-w-[250px] mt-2">Choose a conversation to start a calm and secure chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;