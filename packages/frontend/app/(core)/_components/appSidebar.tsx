'use client'

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
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menuItens = [
  {
    name: 'All your files',
    icon: (
      <LayoutGrid
        size={22}
        fill="black"
      />
    ),
    path: '/home',
  },
  {
    name: 'Pictures',
    icon: <ImgIcon size={22} />,
    path: '#',
  },
  {
    name: 'Shared',
    icon: <Users size={22} />,
    path: '#',
  },
  {
    name: 'Deleted files',
    icon: <Trash2 size={22} />,
    path: '#',
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

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
              {menuItens.map((item, i) => (
                <SidebarMenuButton
                  asChild
                  isActive={pathname == item.path}
                  className="p-0 px-2"
                  key={i}
                >
                  <Link href={item.path}>
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-base font-medium">{item.name}</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </div>
    </Sidebar>
  )
}
