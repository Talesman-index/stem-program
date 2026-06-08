import { notFound } from 'next/navigation';
import { disciplinesData } from '../../../data/disciplines';
import DisciplineDetailClient from './DisciplineDetailClient';

export function generateStaticParams() {
  return [
    { slug: 'biology' },
    { slug: 'chemistry' },
    { slug: 'mathematics' },
    { slug: 'robotics' },
    { slug: 'virtual-reality' },
    { slug: 'greenhouse-science' },
    { slug: 'esports' }
  ];
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function DisciplineDetail({ params }: PageProps) {
  const data = disciplinesData[params.slug];

  if (!data) {
    notFound();
  }

  return <DisciplineDetailClient data={data} />;
}
