'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Experience } from '@/types/Experience';
import { useFavorites } from '@/hooks/useFavorites';

interface ExperienceDetailProps {
  experience: Experience;
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(experience.id);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl space-y-6">
        <Link
          href="/experiences"
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
        >
          Volver al explorador
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src={experience.imageUrl}
              alt={experience.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="space-y-5 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">{experience.title}</h1>
                <p className="mt-2 text-sm text-slate-600">{experience.destination}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(experience.id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  favorite
                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              </button>
            </div>

            <div className="grid gap-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700 sm:grid-cols-4">
              <p>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Categoria</span>
                {experience.category}
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Precio</span>
                ${experience.price}
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Rating</span>
                {experience.rating.toFixed(1)}
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Duracion</span>
                {experience.duration ?? 'N/A'}
              </p>
            </div>

            <p className="text-base leading-7 text-slate-700">{experience.description}</p>
          </div>
        </article>
      </section>
    </main>
  );
}
