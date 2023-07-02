import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import MovieModel from "../../MovieModel";
import { useNavigate } from "react-router-dom";

Movie.propTypes = {
  movie: PropTypes.object,
  onDelete: PropTypes.func,
};

export default function Movie({
  movie: { id, title, year, genre, image },
  onDelete,
}) {
  const [img, setImg] = useState(null);
  const nav = useNavigate();
  const movieModel = new MovieModel();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const response = await movieModel.getImage(image);
    const blob = await response.blob();
    setImg(URL.createObjectURL(blob));
  };

  return (
    <Card sx={{ maxWidth: 345, background: "#505050", color: "white" }}>
      {img && <CardMedia sx={{ height: 140 }} image={img} title={title} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{year}</Typography>
        <Typography variant="body2">{genre}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => {
            nav("/" + id);
          }}
          sx={{
            width: "100%",
            background: "#40607e",
          }}
        >
          Details
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onDelete(id);
          }}
          fullWidth
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
