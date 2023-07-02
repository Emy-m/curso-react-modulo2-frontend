import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import MovieModel from "../../MovieModel";
import { useNavigate } from "react-router-dom";

MovieForm.propTypes = {
  movie: PropTypes.object,
};

const imageURL = import.meta.env.VITE_IMAGES_URL;

export default function MovieForm({ movie }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onSubmit = (data) => {
    data.id = movie.id;

    if (movie.image != data.image) {
      data.image = data.image[0];
    }

    const movieModel = new MovieModel();
    movieModel
      .updateMovie(data)
      .then(() => nav("/"))
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: true })}
        defaultValue={movie.title}
      />
      {errors.title && <span>This field is required</span>}
      <input
        {...register("year", { required: true })}
        defaultValue={movie.year}
      />
      {errors.year && <span>This field is required</span>}

      <input
        accept="image/png"
        {...register("genre", { required: true })}
        defaultValue={movie.genre}
      />
      {errors.genre && <span>This field is required</span>}

      <img src={imageURL + "/" + movie.image} />
      <input
        type="file"
        accept="image/png"
        {...register("image", { required: movie.id ? false : true })}
      />
      {errors.image && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
