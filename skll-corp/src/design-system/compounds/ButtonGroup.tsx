interface ButtonGroupProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export default function ButtonGroup({ children, direction = 'horizontal', className = '' }: ButtonGroupProps) {
  return (
    <div
      className={`flex ${
        direction === 'vertical' ? 'flex-col' : 'flex-row'
      } gap-2 ${className}`}
    >
      {children}
    </div>
  )
}
