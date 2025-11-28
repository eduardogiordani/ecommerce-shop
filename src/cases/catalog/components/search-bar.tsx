import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-6 w-full max-w-xl">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
          <Search className="h-4 w-4" />
        </span>

        <Input
          type="text"
          placeholder="Buscar produtos por nome ou descrição..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 rounded-full border-muted-foreground/20 bg-background pl-10 text-sm shadow-sm transition focus:border-emerald-500 focus:ring-emerald-500/40"
        />
      </div>

      {searchTerm && (
        <p className="mt-1 text-xs text-muted-foreground">
          Mostrando resultados para: <span className="font-medium">{searchTerm}</span>
        </p>
      )}
    </div>
  );
}
