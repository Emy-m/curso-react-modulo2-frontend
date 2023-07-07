import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieModel from "../../MovieModel";
import MovieFormSkeleton from "./MovieFormSkeleton";
import MovieForm from "./MovieForm";

export default function UpdateMovie() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setMovie([]);
      setError(null);

      const movieModel = new MovieModel();
      movieModel
        .getMovie(id)
        .then((m) => {
          if (!m.error) {
            setMovie(m);
          } else {
            return new Promise((resolve, reject) => reject(m));
          }
        })
        .catch((error) => {
          if (error.error) {
            setError(error.message + " " + error.error);
          } else {
            setError(error.toString());
          }
        });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <MovieFormSkeleton />
  ) : error ? (
    <>{error}</>
  ) : (
    movie.map((m) => <MovieForm key={m.id} movie={m} />)
  );
}
