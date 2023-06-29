import { Skeleton, Stack } from "@mui/material";

export default function MovieCardSkeleton() {
  return (
    <Stack spacing={2} sx={{ margin: "10px" }}>
      <Skeleton variant="rounded" width={210} height={120} />
      <Skeleton variant="rounded" width={210} height={30} />
      <Skeleton variant="rounded" width={105} height={30} />
      <Skeleton variant="rounded" width={105} height={30} />
    </Stack>
  );
}
