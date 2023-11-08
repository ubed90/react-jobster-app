import React from 'react'
import { StatItemWrapper } from '../assets/wrappers'

export interface IStatItemProps {
  title: string
  count: number
  icon: JSX.Element
  color: string
  bcg: string
}

const StatItem: React.FC<IStatItemProps> = ({
  title,
  icon,
  count,
  color,
  bcg,
}) => {
  return (
    <StatItemWrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </StatItemWrapper>
  )
}

export default StatItem
