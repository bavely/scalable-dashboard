import { AppSidebar } from "@/components/Shared/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"

export default function Main({ children }: Readonly<{ children: React.ReactNode }>) {

    const location = useLocation()
    const isAddUserPage = location.pathname === '/add'
    const isDashBoard = location.pathname === '/'
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background-secondary backdrop-blur-sm sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 z-50">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold">{isAddUserPage ? 'Add User' : isDashBoard ? 'Dashboard' : 'User List'}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1 flex justify-end">
          <ModeToggle  />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
