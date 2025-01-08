import { AppSidebar } from '../_components/appSidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { FolderPlus, Plus, Share, Upload } from 'lucide-react'

export default function HomePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex gap-4">
            <Button className="h-20 w-40 flex flex-col items-start">
              <Upload />
              <span className="font-semibold">Send or Drop a file</span>
            </Button>
            <Button
              className="h-20 w-40 flex flex-col items-start"
              variant={'secondary'}
            >
              <Plus />
              <span className="font-semibold">Create</span>
            </Button>
            <Button
              className="h-20 w-40 flex flex-col items-start"
              variant={'secondary'}
            >
              <FolderPlus />
              <span className="font-semibold">Create a folder</span>
            </Button>
            <Button
              className="h-20 w-40 flex flex-col items-start"
              variant={'secondary'}
            >
              <Share />
              <span className="font-semibold">Share</span>
            </Button>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
