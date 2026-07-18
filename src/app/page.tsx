import Link from 'next/link';
import { experiences } from '@/data/experiences';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e2e8f0_0%,#f8fafc_40%,#f8fafc_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur sm:p-12">
        <p className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
          Tu proxima escapada
        </p>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
          Descubre {experiences.length} experiencias y convierte cualquier semana en una aventura.
        </h1>

        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Busca por destino, filtra por categoria y guarda tus favoritas para planificar viajes con una vista clara y rapida.
        </p>

        <Link
          href="/experiences"
          className="inline-flex items-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Explorar experiencias
        </Link>
      </section>
    </main>
  );
}
