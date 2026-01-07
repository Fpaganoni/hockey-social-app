import Alert from "@mui/material/Alert";

export function Error({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 px-4 py-6 space-y-8 ">
      <Alert
        sx={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--error)",
        }}
        severity="error"
      >
        {children}
      </Alert>
    </div>
  );
}
