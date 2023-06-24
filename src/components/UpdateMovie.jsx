import { useParams, Outlet } from "react-router";

export default function UpdateMovie() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div>UpdateMovie</div>
      <Outlet />
    </>
  );
}
