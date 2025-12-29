import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const Home = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    const generatedRoomId = crypto.randomUUID().slice(0, 8);
    navigate(`/room/${generatedRoomId}`, { state: { name } });
  };

  const handleJoinRoom = () => {
    if (!name.trim() || !roomId.trim()) {
      alert("Please enter name and room ID");
      return;
    }
    navigate(`/room/${roomId}`, { state: { name } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1f2933 0%, #0f1115 60%)",
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 3,
          backgroundColor: "#15171A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "#fff", fontWeight: 600 }}
          >
            Whiteboard Collaboration
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#9CA3AF", mt: 1, mb: 3 }}
          >
            Collaborate in real-time with your team
          </Typography>

          {/* Name input */}
          <TextField
            fullWidth
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "#fff" },
              label: { color: "#9CA3AF" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0f1115",
              },
            }}
          />

          {/* Create room */}
          <Button
            fullWidth
            size="large"
            onClick={handleCreateRoom}
            sx={{
              mb: 2,
              background:
                "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                background:
                  "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
              },
            }}
          >
            Create New Room
          </Button>

          <Divider sx={{ my: 2, borderColor: "#2a2d34" }}>OR</Divider>

          {/* Join room */}
          <TextField
            fullWidth
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            sx={{
              mb: 2,
              input: { color: "#fff" },
              label: { color: "#9CA3AF" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#0f1115",
              },
            }}
          />

          <Button
            fullWidth
            variant="outlined"
            onClick={handleJoinRoom}
            sx={{
              color: "#E5E7EB",
              borderColor: "#374151",
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                borderColor: "#6366F1",
                backgroundColor: "rgba(99,102,241,0.08)",
              },
            }}
          >
            Join Room
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
