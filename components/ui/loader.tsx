import CircularProgress from "@mui/material/CircularProgress";

interface childrenProps {
  size?: number;
  children?: string;
}

export function Loader({ children, size = 60 }: childrenProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center justify-center h-screen">
      <h2 className="text-inherit">{children}</h2>
      <CircularProgress size={size} color="inherit" />
    </div>
  );
}
