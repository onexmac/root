import { motion, type HTMLMotionProps } from 'framer-motion'
import { transitions } from '../motion/presets'

type TextVariant = 'display' | 'heading' | 'subheading' | 'body' | 'label' | 'caption' | 'overline'
type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label'

const variantStyles: Record<TextVariant, string> = {
  display: 'text-ds-2xl font-semibold tracking-[0.4px] leading-[40px]',
  heading: 'text-ds-lg font-semibold tracking-[0.4px] leading-[24px]',
  subheading: 'text-ds-base font-semibold tracking-[0.4px] leading-[24px]',
  body: 'text-ds-base font-normal tracking-[0.25px] leading-[24px]',
  label: 'text-ds-sm font-semibold tracking-[0.4px] leading-[20px] uppercase',
  caption: 'text-ds-sm font-normal tracking-[0.25px] leading-[20px]',
  overline: 'text-ds-xs font-semibold tracking-[0.4px] leading-[14px] uppercase',
}

const defaultElement: Record<TextVariant, TextElement> = {
  display: 'h1',
  heading: 'h2',
  subheading: 'h3',
  body: 'p',
  label: 'span',
  caption: 'span',
  overline: 'span',
}

interface TextProps extends Omit<HTMLMotionProps<'p'>, 'children'> {
  variant?: TextVariant
  as?: TextElement
  mono?: boolean
  muted?: boolean
  secondary?: boolean
  inverse?: boolean
  accent?: boolean
  children: React.ReactNode
  animate?: boolean
}

export default function Text({
  variant = 'body',
  as,
  mono,
  muted,
  secondary,
  inverse,
  accent,
  children,
  className = '',
  animate: shouldAnimate = false,
  ...props
}: TextProps) {
  const tag = as || defaultElement[variant]
  const Component = motion[tag] as typeof motion.p

  const colorClass = accent
    ? 'text-ds-accent'
    : inverse
    ? 'text-ds-text-inverse'
    : muted
    ? 'text-ds-text-muted'
    : secondary
    ? 'text-ds-text-secondary'
    : 'text-ds-text-primary'

  const fontClass = mono ? 'font-mono' : 'font-sans'

  return (
    <Component
      className={`${variantStyles[variant]} ${colorClass} ${fontClass} ${className}`}
      {...(shouldAnimate ? transitions.fadeIn : {})}
      {...props}
    >
      {children}
    </Component>
  )
}
