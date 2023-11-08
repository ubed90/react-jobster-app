import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const BarChartComponent: React.FC<{
  monthlyApplications: { date: string; count: number }[]
}> = ({ monthlyApplications }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
