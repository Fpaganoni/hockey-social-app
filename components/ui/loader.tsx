import CircularProgress from "@mui/material/CircularProgress";

export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress size={60} color="inherit" />
    </div>
  );
}
