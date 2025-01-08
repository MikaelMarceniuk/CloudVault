import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Image as ImgIcon, LayoutGrid, Trash2, Users } from 'lucide-react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <div className="px-2">
        <SidebarHeader>
          <div className="px-2 pt-2 flex">
            <span className="text-xl font-bold">Start Page</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem className="space-y-2 pt-2">
              <SidebarMenuButton
              // asChild
              // isActive
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid
                    size={22}
                    fill="black"
                  />
                  <span className="text-base font-medium">All your files</span>
                </div>
              </SidebarMenuButton>

              <SidebarMenuButton
              // asChild
              // isActive
              >
                <div className="flex items-center gap-2">
                  <ImgIcon
                    size={22}
                    // fill="black"
                    // stroke="white"
                  />
                  <span className="text-base font-medium">Pictures</span>
                </div>
              </SidebarMenuButton>

              <SidebarMenuButton
              // asChild
              // isActive
              >
                <div className="flex items-center gap-2">
                  <Users
                    size={22}
                    // fill="white"
                  />
                  <span className="text-base font-medium">Shared</span>
                </div>
              </SidebarMenuButton>

              <SidebarMenuButton
              // asChild
              // isActive
              >
                <div className="flex items-center gap-2">
                  <Trash2
                    size={22}
                    // fill="white"
                  />
                  <span className="text-base font-medium">Deleted files</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </div>
    </Sidebar>
  )
}
