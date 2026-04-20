import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, TextField, InputAdornment, Badge } from '@mui/material';
import { Search, MoreVert, EditNote } from '@mui/icons-material';

interface SidebarProps {
  users: any[];
  selectedId: string | null;
  onSelectChat: (user: any) => void;
  loading: boolean;
}

const Sidebar = ({ users, selectedId, onSelectChat, loading }: SidebarProps) => {
  return (
    <div className="w-full md:w-[400px] border-r border-gray-100 flex flex-col h-full bg-white">
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
           slotProps={{
    input: {
      className: "!rounded-xl !bg-gray-50 border-none px-2",
      startAdornment: (
        <InputAdornment position="start">
          <Search className="text-gray-400" />
        </InputAdornment>
      ),
    },
  }}
          sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        />
      </div>

      <List className="flex-grow overflow-y-auto mt-2 px-2">
        {loading ? (
          <p className="text-center text-gray-400 mt-4">Loading gardeners...</p>
        ) : (
          users.map((user) => (
            <ListItem
              key={user._id}
              onClick={() => onSelectChat(user)}
              className={`rounded-2xl mb-1 cursor-pointer transition-all ${selectedId === user._id ? 'bg-[#E8F0E8]' : 'hover:bg-gray-50'
                }`}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  invisible={!user.active}
                  sx={{ '& .MuiBadge-badge': { backgroundColor: '#44b700' } }}
                >
                  <Avatar className="!bg-[#2D6936] !text-[#E8F0E8] shadow-sm">
                    {user.fullName[0].toUpperCase()}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={<span className="text-[15px] font-semibold text-gray-800">{user.fullName}</span>}
                secondary={<span className="text-xs text-gray-400">@{user.userName}</span>}
              />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default Sidebar;