import { EXPERIENCE_CATEGORIES } from '@/hooks/useExperienceFilters';

interface FilterBarProps {
  category: string;
  destinationTerm: string;
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

export function FilterBar({
  category,
  destinationTerm,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Categoria</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
        >
          <option value="">Todas</option>
          {EXPERIENCE_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Destino (ciudad o pais)</span>
        <input
          type="text"
          value={destinationTerm}
          onChange={(event) => onDestinationChange(event.target.value)}
          placeholder="Ej: Japan"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
        />
      </label>
    </div>
  );
}
