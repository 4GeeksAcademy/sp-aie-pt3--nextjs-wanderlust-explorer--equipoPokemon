'use client';

import { useFavorites } from '@/hooks/useFavorites';

export default function ProfilePage() {
  const { favoritesCount } = useFavorites();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Perfil</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Alex Traveler</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Viajero curioso, fanatico de experiencias gastronomicas y rutas culturales urbanas.
          Siempre buscando su siguiente viaje de fin de semana.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pais base</p>
            <p className="mt-1 text-lg font-bold text-slate-900">Espana</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Miembro desde</p>
            <p className="mt-1 text-lg font-bold text-slate-900">2024</p>
          </div>
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Favoritos guardados</p>
            <p className="mt-1 text-lg font-black">{favoritesCount}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
