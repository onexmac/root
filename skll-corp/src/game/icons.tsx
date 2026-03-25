import React from 'react';
import type { TileType } from './types';

interface IconProps {
  size?: number;
  className?: string;
}

const EmailIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="2" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="22" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const ChartIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="12" width="4" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="6" width="4" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="17" y="3" width="4" height="17" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="1" y1="21" x2="23" y2="21" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

const BriefcaseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <rect x="10" y="11" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const ClockIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="12" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    {[0, 1, 2, 3].map((i) => (
      <line
        key={i}
        x1="12"
        y1="3"
        x2="12"
        y2="4.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        transform={`rotate(${i * 90} 12 12)`}
      />
    ))}
  </svg>
);

const FolderIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M2 6C2 4.89543 2.89543 4 4 4H9L11 7H20C21.1046 7 22 7.89543 22 9V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

const GearIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="12"
        y1="2"
        x2="12"
        y2="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${angle} 12 12)`}
      />
    ))}
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
  </svg>
);

export const TILE_ICONS: Record<TileType, React.FC<IconProps>> = {
  email: EmailIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  clock: ClockIcon,
  folder: FolderIcon,
  gear: GearIcon,
};

export const TILE_COLORS: Record<TileType, string> = {
  email: '#4ecdc4',
  chart: '#ff6b6b',
  briefcase: '#ffd93d',
  clock: '#6c5ce7',
  folder: '#a8e6cf',
  gear: '#ff8a5c',
};
