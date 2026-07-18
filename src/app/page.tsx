import { experiences } from '../data/experiences';
import { Experience } from '../types/Experience';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Wanderlust Explorer
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-zinc-400">
            Discover {experiences.length} unforgettable experiences around the world
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {experiences.map((experience: Experience) => (
            <div key={experience.id} className="group relative bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative h-64 overflow-hidden">
                <Image
                  src={experience.imageUrl}
                  alt={experience.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                      {experience.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {experience.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm font-semibold dark:text-white">{experience.rating}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-zinc-300 line-clamp-2">
                  {experience.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${experience.price} <span className="text-sm font-normal text-gray-500">/ person</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    {experience.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
