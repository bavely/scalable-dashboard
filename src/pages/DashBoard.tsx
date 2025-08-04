import { ChartAreaInteractive } from '@/components/Charts/chart-area-interactive'
import { SectionCards } from '@/components/Charts/section-cards'
import { useUsersStore } from '@/hooks/useUsersStore'
import { useEffect, useState } from 'react'
import type { User } from '@/types/index'

const DashBoard = () => {
  const { users , fetchAndSetUsers} = useUsersStore()
 const [dashboardData, setDashboardData] = useState<User[]>([])

  useEffect(() => {
    if (users.length === 0) {
      fetchAndSetUsers()
    }
  }, [])

  useEffect(() => {
    setDashboardData(users)
  }, [users])

  return (
    <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards users={dashboardData} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive  />
        </div>
      </div>
    </div>
  </div>
  )
}

export default DashBoard