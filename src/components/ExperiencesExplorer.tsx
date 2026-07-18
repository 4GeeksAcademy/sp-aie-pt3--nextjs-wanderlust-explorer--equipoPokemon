'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { experiences } from '@/data/experiences';
import { ExperienceCard } from '@/components/ExperienceCard';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { useFavorites } from '@/hooks/useFavorites';
import { useExperienceFilters } from '@/hooks/useExperienceFilters';

export function ExperiencesExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const destinationTerm = searchParams.get('destination') ?? '';

  const { isFavorite, toggleFavorite } = useFavorites();

  function updateParam(name: 'search' | 'category' | 'destination', value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(name, value.trim());
    } else {
      params.delete(name);
    }

    const nextQueryString = params.toString();
    const nextUrl = nextQueryString.length > 0 ? `${pathname}?${nextQueryString}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  const filteredExperiences = useExperienceFilters({
    experiences,
    searchTerm,
    category,
    destinationTerm,
  });

  const stats = useMemo(
    () => `${filteredExperiences.length} de ${experiences.length} experiencias`,
    [filteredExperiences.length],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Explorador de Experiencias
          </h1>
          <p className="mt-2 text-sm text-slate-600">{stats}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="space-y-4">
            <SearchBar value={searchTerm} onChange={(value) => updateParam('search', value)} />
            <FilterBar
              category={category}
              destinationTerm={destinationTerm}
              onCategoryChange={(value) => updateParam('category', value)}
              onDestinationChange={(value) => updateParam('destination', value)}
            />
          </div>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900">No se encontraron resultados</h2>
            <p className="mt-2 text-sm text-slate-600">
              Ajusta tu busqueda o limpia los filtros para ver mas experiencias.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isFavorite={isFavorite(experience.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
