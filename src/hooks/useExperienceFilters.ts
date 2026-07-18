import { useMemo } from 'react';
import type { Experience, ExperienceCategory } from '@/types/Experience';

export const EXPERIENCE_CATEGORIES: ExperienceCategory[] = [
  'Adventure',
  'Culture',
  'Food',
  'Wellness',
  'Nature',
];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createCaseInsensitiveRegex(term: string) {
  const safeTerm = escapeRegex(term.trim());
  return new RegExp(safeTerm, 'i');
}

interface UseExperienceFiltersParams {
  experiences: Experience[];
  searchTerm: string;
  category: string;
  destinationTerm: string;
}

export function useExperienceFilters({
  experiences,
  searchTerm,
  category,
  destinationTerm,
}: UseExperienceFiltersParams) {
  return useMemo(() => {
    const titleRegex = createCaseInsensitiveRegex(searchTerm);
    const destinationRegex = createCaseInsensitiveRegex(destinationTerm);

    return experiences.filter((experience) => {
      const titleMatches =
        searchTerm.trim().length === 0 || titleRegex.test(experience.title);

      const categoryMatches =
        category.trim().length === 0 || experience.category === category;

      const destinationMatches =
        destinationTerm.trim().length === 0 || destinationRegex.test(experience.destination);

      return titleMatches && categoryMatches && destinationMatches;
    });
  }, [experiences, searchTerm, category, destinationTerm]);
}
