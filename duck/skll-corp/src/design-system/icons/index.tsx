export { default as Home } from './Home'
export { default as Config } from './Config'
export { default as User } from './User'
export { default as Chat } from './Chat'
export { default as Folder } from './Folder'
export { default as Filter } from './Filter'
export { default as Cmplx } from './Cmplx'
export { default as Reload } from './Reload'
export { default as Open } from './Open'
export { default as Close } from './Close'
export { default as Arrow } from './Arrow'
export { default as Edit } from './Edit'
export { default as Lens } from './Lens'
export { default as Info } from './Info'
export { default as Go } from './Go'
export { default as Add } from './Add'
export { default as Good } from './Good'
export { default as Minus } from './Minus'
export { default as List } from './List'
export { default as Delete } from './Delete'
export { default as SIn } from './SIn'
export { default as Stacked } from './Stacked'
export { default as SO } from './SO'
export { default as SX } from './SX'
export { default as SOut } from './SOut'
export { default as Plus } from './Plus'

import Home from './Home'
import Config from './Config'
import User from './User'
import Chat from './Chat'
import Folder from './Folder'
import Filter from './Filter'
import Cmplx from './Cmplx'
import Reload from './Reload'
import Open from './Open'
import Close from './Close'
import Arrow from './Arrow'
import Edit from './Edit'
import Lens from './Lens'
import Info from './Info'
import Go from './Go'
import Add from './Add'
import Good from './Good'
import Minus from './Minus'
import List from './List'
import Delete from './Delete'
import SIn from './SIn'
import Stacked from './Stacked'
import SO from './SO'
import SX from './SX'
import SOut from './SOut'
import Plus from './Plus'

const iconMap = {
  home: Home, config: Config, user: User, chat: Chat,
  folder: Folder, filter: Filter, cmplx: Cmplx, reload: Reload,
  open: Open, close: Close, arrow: Arrow, edit: Edit,
  lens: Lens, info: Info, go: Go, add: Add,
  good: Good, minus: Minus, list: List, delete: Delete,
  'stack-in': SIn, stacked: Stacked, 'stack-empty': SO, 'stack-x': SX,
  'stack-out': SOut, plus: Plus,
} as const

export type IconName = keyof typeof iconMap

interface IconProps {
  name: IconName
  size?: number
  className?: string
  color?: string
}

export function Icon({ name, size = 24, className, color = 'currentColor' }: IconProps) {
  const Component = iconMap[name]
  return <Component size={size} className={className} color={color} />
}
