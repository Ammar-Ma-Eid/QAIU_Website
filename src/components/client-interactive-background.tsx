'use client';

import dynamic from 'next/dynamic';

const InteractiveBackground = dynamic(
  () => import('@/components/interactive-background'),
  {
    ssr: false,
  }
);

export default function ClientInteractiveBackground() {
  return <InteractiveBackground />;
}
