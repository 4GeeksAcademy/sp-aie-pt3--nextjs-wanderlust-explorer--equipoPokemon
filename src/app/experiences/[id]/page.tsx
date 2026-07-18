import { notFound } from 'next/navigation';
import { experiences } from '@/data/experiences';
import { ExperienceDetail } from '@/components/ExperienceDetail';

interface ExperienceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetail experience={experience} />;
}
