import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { allUser, GetLoggedInUser } from "../service/auth/thunk";
import Sidebar from "../component/Sidebar";
import ChatWindow from "../component/ChatWindow";
import { getChatByUserId } from "../service/chat/thunk";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, users} = useSelector(
    (state: RootState) => state.auth,
  );

  const { loggedInUser } = useSelector(
    (state: RootState) => state.loggedInUser,
  );

  const { allChats } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(GetLoggedInUser());
    dispatch(allUser());
  }, [dispatch]);


  useEffect(() => {
  if (loggedInUser?.id) {
    dispatch(getChatByUserId({ userId: loggedInUser.id }));
  }
}, [loggedInUser?.id, dispatch]);


  const chats = allChats?.chats ?? [];

  const selectedChatDetails = useMemo(() => {
  return chats.find(
    (chat) => chat._id === selectedChat?._id
  );
}, [chats, selectedChat]);


  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <div
        className={`${selectedChat ? "hidden md:flex" : "flex"} w-full md:w-auto h-full`}
      >
        <Sidebar
          users={users}
          allChats={allChats.chats}
          selectedId={selectedChat?._id}
          onSelectChat={setSelectedChat}
          loading={loading}
        />
      </div>

      <div
        className={`${!selectedChat ? "hidden md:flex" : "flex"} flex-1 h-full`}
      >
        <ChatWindow
        loggedInUser={loggedInUser}
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
