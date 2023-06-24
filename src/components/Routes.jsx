import { Navigate, useRoutes } from "react-router";
import AllMovies from "./AllMovies";
import UpdateMovie from "./UpdateMovie";
import MovieForm from "./MovieForm";

export default function Routes({ filter }) {
  let element = useRoutes([
    {
      path: "/",
      element: <AllMovies filter={filter} />,
    },
    {
      path: ":id",
      element: <UpdateMovie />,
    },
    {
      path: "/add",
      element: <MovieForm />,
    },
    { path: "*", element: <Navigate to={"/"} /> },
  ]);

  return element;
}
