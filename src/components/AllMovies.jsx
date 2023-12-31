import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieModel from "../../MovieModel";
import Movie from "./Movie";

AllMovies.propTypes = {
  filter: PropTypes.string,
};

export default function AllMovies({ filter }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const movieModel = new MovieModel();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchMovies(signal);

    return () => {
      controller.abort();
    };
  }, [filter]);

  const fetchMovies = async (signal) => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);

      const response = await movieModel.getMovies(filter, signal);
      setMovies(response);
    } catch (error) {
      if (!signal.aborted) {
        setMovies([]);

        if (error.error) {
          setError(error.message + " " + error.error);
        } else {
          setError(error.toString());
        }
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  const deleteMovie = async (id) => {
    const response = await movieModel.deleteMovie(id);

    if (!response.error) {
      fetchMovies();
    }
  };

  const renderSkeleton = () => {
    return Array.from({ length: 8 }).map((item, index) => {
      return (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
        >
          <MovieCardSkeleton />
        </Grid>
      );
    });
  };

  const renderError = () => {
    return <>{error}</>;
  };

  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <Grid
          item
          key={movie.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          justifyContent="center"
        >
          <Movie movie={movie} onDelete={deleteMovie} />
        </Grid>
      );
    });
  };

  return (
    <>
      {loading ? (
        <Grid container spacing={2}>
          {renderSkeleton()}
        </Grid>
      ) : error ? (
        renderError()
      ) : movies && movies.length > 0 ? (
        <Grid container spacing={2}>
          {renderMovies()}
        </Grid>
      ) : (
        <>No movies found</>
      )}
    </>
  );
}
