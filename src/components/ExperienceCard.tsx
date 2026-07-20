'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Experience } from '@/types/Experience';

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: ExperienceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{experience.title}</h3>
            <p className="text-sm text-slate-600">{experience.destination}</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">
            {experience.rating.toFixed(1)}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-slate-600">{experience.description}</p>

        <div className="flex items-center justify-between">
          <p className="text-base font-black text-slate-900">${experience.price}</p>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            {experience.category}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/experiences/${experience.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Ver detalle
          </Link>
          <button
            type="button"
            onClick={() => onToggleFavorite(experience.id)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${
              isFavorite
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
            }`}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-6.716-4.35-9.193-8.293C1.063 9.931 2.215 6.5 5.545 5.49c2.023-.614 3.662.176 4.643 1.428.981-1.252 2.62-2.042 4.643-1.428 3.33 1.01 4.482 4.441 2.738 7.217C18.716 16.65 12 21 12 21z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
