import { Suspense } from 'react';
import { ExperiencesPageClient } from '@/components/ExperiencesPageClient';

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-sm text-slate-600">Cargando explorador...</p>
          </div>
        </main>
      }
    >
      <ExperiencesPageClient />
    </Suspense>
  );
}
