'use client';

import { experiences } from '@/data/experiences';
import { ExperienceCard } from '@/components/ExperienceCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const favoriteExperiences = experiences.filter((experience) => favoriteIds.includes(experience.id));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Mis Favoritos</h1>
          <p className="mt-2 text-sm text-slate-600">
            {favoriteExperiences.length} experiencias guardadas.
          </p>
        </div>

        {favoriteExperiences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900">Aun no tienes favoritos</h2>
            <p className="mt-2 text-sm text-slate-600">
              Ve al explorador y marca experiencias para verlas aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteExperiences.map((experience) => (
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
