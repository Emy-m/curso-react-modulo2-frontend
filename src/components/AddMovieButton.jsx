import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function AddMovieButton() {
  const nav = useNavigate();
  return (
    <Fab
      color="success"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
      }}
      onClick={() => {
        nav("/add");
      }}
    >
      <AddIcon />
    </Fab>
  );
}
