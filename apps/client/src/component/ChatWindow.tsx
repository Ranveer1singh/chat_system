import { Avatar, IconButton, TextField } from "@mui/material";
import {
  Search,
  MoreVert,
  ArrowBack,
  TagFaces,
  AttachFile,
  Send,
} from "@mui/icons-material";
import type { IChat, IMessage, MessageType } from "../dto";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getMessagesByChat, sendMessage } from "../service/chat/messageThunk";
import { useSocket } from "../hooks/useSocket";
import { sendMessagee } from "../service/message/thunk";

interface ChatWindowProps {
  chat: IChat | null | undefined;
  message: string;
  setMessage: (val: string) => void;
  onBack: () => void;
}

const ChatWindow = ({ chat, message, setMessage, onBack }: ChatWindowProps) => {
  const dispatch = useDispatch<AppDispatch>();
  // const { messages } = useSelector((state: RootState) => state.chat)
  const { messages } = useSelector((state: RootState) => state.message);

  const { users } = useSelector((state: RootState) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current user ID (you can pass this as prop or get from auth state)
  const currentUserId = "6a2c2814d2faa0c0f92dfc23";

  // Setup socket listener for real-time messages
  useSocket(chat?._id);

  // Fetch messages when chat changes
  useEffect(() => {
    if (chat?._id) {
      dispatch(getMessagesByChat({ chatId: chat._id }));
    }
  }, [chat?._id, dispatch]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);

  const onSendMessage = () => {
    if (!message.trim() || !chat?._id) return;

    dispatch(
      sendMessagee({
        chatId: chat._id,
        senderId: currentUserId,
        type: "TEXT" as MessageType,
        content: message.trim(),
      }),
    );
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  // Get other participant name from chat
  const getParticipantName = () => {
    if (!chat?.participants) return "User";
    const otherParticipantId = chat.participants.find(
      (p) => p !== currentUserId,
    );
    const participant = users.find((u) => u._id === otherParticipantId);
    return participant?.fullName || "User";
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-[#F8F9F8]">
        <div className="w-24 h-24 bg-[#E8F0E8] rounded-full flex items-center justify-center mb-6 animate-bounce">
          <span className="text-4xl">🌿</span>
        </div>
        <h2 className="text-2xl font-bold text-[#2D6936]">Stay Rooted</h2>
        <p className="text-gray-500 max-w-[250px] mt-2">
          Choose a conversation to start a calm and secure chat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F8] relative h-full">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <IconButton className="md:hidden !text-[#2D6936]" onClick={onBack}>
            <ArrowBack />
          </IconButton>
          <Avatar className="!bg-[#2D6936]">{getParticipantName()[0]}</Avatar>
          <div>
            <p className="font-bold text-gray-800 leading-tight">
              {getParticipantName()}
            </p>
            <p className="text-[11px] text-[#2D6936] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#44b700] rounded-full"></span>{" "}
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <IconButton className="!text-gray-400">
            <Search />
          </IconButton>
          <IconButton className="!text-gray-400">
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {messages.messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <>
            <div className="self-center bg-gray-200/50 px-3 py-1 rounded-full">
              <span className="text-[10px] text-gray-500 font-bold uppercase">
                Today
              </span>
            </div>
            {messages.messages.map((msg: IMessage) => (
              <div
                key={msg._id}
                className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.senderId === currentUserId
                      ? "bg-[#2D6936] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.senderId === currentUserId
                        ? "text-green-200"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
        <div className="flex bg-gray-50 rounded-full flex-1 items-center px-2">
          <IconButton size="small">
            <TagFaces className="text-gray-400" />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
          />
          <IconButton size="small">
            <AttachFile className="text-gray-400 rotate-45" />
          </IconButton>
        </div>
        <IconButton
          disabled={!message.trim()}
          onClick={onSendMessage}
          className={`${message.trim() ? "!bg-[#2D6936] !text-white" : "!bg-gray-100 !text-gray-300"} shadow-md`}
        >
          <Send className="text-[20px]" />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatWindow;
