'use client';

import { ExperiencesExplorer } from '@/components/ExperiencesExplorer';
import { useFavorites } from '@/hooks/useFavorites';

export function ExperiencesPageClient() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return <ExperiencesExplorer favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />;
}
