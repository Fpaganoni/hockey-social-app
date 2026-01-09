import { Search } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

function Filter({
  value,
  onChange,
  className,
  placeholder = "Search...",
}: FilterProps) {
  return (
    <div className={cn(className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground"
        size={20}
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

export { Filter };
