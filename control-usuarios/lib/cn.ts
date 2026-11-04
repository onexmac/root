// Tailwind class merger. clsx handles conditionals/arrays/objects; twMerge
// resolves conflicting Tailwind utilities so the last one wins (e.g. passing
// `p-2` after `p-4` keeps `p-2`, not both).

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
