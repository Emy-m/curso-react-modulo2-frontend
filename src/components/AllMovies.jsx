import { PropTypes } from "prop-types";

AllMovies.propTypes = {
  filter: PropTypes.string,
};

export default function AllMovies({ filter }) {
  return <div>{"AllMovies " + filter}</div>;
}
