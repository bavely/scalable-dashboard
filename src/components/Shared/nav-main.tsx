import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const location = useLocation()



  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Link to={item.url} key={item.title} >
            <SidebarMenuItem >
                <SidebarMenuButton aria-current={location.pathname === item.url ? 'page' : undefined} className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer ${location.pathname === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}>
                  {item.title}
                </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
