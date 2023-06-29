import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import MovieCardSkeleton from "./MovieCardSkeleton";

AllMovies.propTypes = {
  filter: PropTypes.string,
};

export default function AllMovies({ filter }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies([]);

    console.log(loading, error, movies, filter);
  }, []);

  const renderSkeleton = () => {
    return Array.from({ length: 8 }).map((item, index) => {
      return (
        <Grid
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

  const renderError = () => {};

  const renderMovies = () => {};

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
