import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name?: string;
  className?: string;
  fallback?: LucideIcon;
}

export function DynamicIcon({
  name,
  className = 'w-5 h-5',
  fallback: FallbackIcon = LucideIcons.Zap,
  ...props
}: DynamicIconProps) {
  if (!name) {
    return <FallbackIcon className={className} {...props} />;
  }

  // Normalize icon name: "zap" -> "Zap", "terminal" -> "Terminal", "trending-up" -> "TrendingUp"
  const cleanName = name
    .trim()
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  // Look up in lucide-react
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon | undefined>;
  const IconComponent = iconMap[cleanName] || iconMap[name] || FallbackIcon;

  return <IconComponent className={className} {...props} />;
}
