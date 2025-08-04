import { ChartAreaInteractive } from '@/components/Charts/chart-area-interactive'
import { SectionCards } from '@/components/Charts/section-cards'
import React from 'react'
import { useUsersStore } from '@/hooks/useUsersStore'

const DashBoard = () => {
  const { users } = useUsersStore()

  return (
    <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards users={users} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive users={users} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default DashBoard