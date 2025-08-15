'use client';

import { Layers, Link2, Waves, BookMarked, type LucideProps } from 'lucide-react';
import type { FC } from 'react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  layers: Layers,
  'link-2': Link2,
  waves: Waves,
  default: BookMarked,
};

interface DynamicIconProps extends LucideProps {
  name?: string | null;
}

const DynamicIcon: FC<DynamicIconProps> = ({ name, ...props }) => {
  const Icon = (name && iconMap[name.toLowerCase()]) || iconMap.default;
  return <Icon {...props} />;
};

export default DynamicIcon;
