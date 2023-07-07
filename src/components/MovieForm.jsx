import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import MovieModel from "../../MovieModel";
import { useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MovieFormSkeleton from "./MovieFormSkeleton";

MovieForm.propTypes = {
  movie: PropTypes.object,
};

const imageURL = import.meta.env.VITE_IMAGES_URL;

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    backgroundColor: "#b3b3b3",
  },
  "& .MuiFormLabel-root": {
    color: "black",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#a73535",
    fontWeight: "bold",
  },
});

export default function MovieForm({ movie }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = () => {
    const movieModel = new MovieModel();
    movieModel
      .getAllGenres()
      .then((data) => {
        setGenres(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.error) {
          setError(error.message + " " + error.error);
        } else {
          setError(error.toString());
        }
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    const movieModel = new MovieModel();
    if (movie) {
      data.id = movie.id;

      if (movie.image != data.image) {
        data.image = data.image[0];
      }

      movieModel
        .updateMovie(data)
        .then(() => nav("/"))
        .catch((e) => console.log(e));
    } else {
      data.image = data.image[0];
      movieModel
        .addMovie(data)
        .then(() => nav("/"))
        .catch((e) => console.log(e));
    }
  };

  return loading ? (
    <MovieFormSkeleton />
  ) : error ? (
    <>{error}</>
  ) : (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      justifyContent="center"
    >
      <Stack spacing={2}>
        <StyledTextField
          variant="filled"
          label="Title"
          {...register("title", { required: true })}
          defaultValue={movie?.title}
          error={!!errors.title}
          helperText={errors.title && "This field is required"}
        />

        <StyledTextField
          variant="filled"
          label="Year"
          type="number"
          {...register("year", { required: true })}
          defaultValue={movie?.year}
          error={!!errors.year}
          helperText={errors.year && "This field is required"}
        />

        {genres && genres.length > 0 && (
          <StyledTextField
            variant="filled"
            label="Genre"
            select
            {...register("genre", { required: true })}
            defaultValue={movie?.genre ? movie.genre : genres[0]}
            error={!!errors.genre}
            helperText={errors.genre && "This field is required"}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </StyledTextField>
        )}

        {movie && <img src={imageURL + "/" + movie?.image} />}
        <StyledTextField
          variant="filled"
          label="image"
          type="file"
          focused
          accept="image/png"
          {...register("image", { required: movie?.id ? false : true })}
          error={!!errors.image}
          helperText={errors.image && "This field is required"}
        />

        <Button variant="contained" color="success" type="submit">
          Send
        </Button>
      </Stack>
    </Box>
  );
}
