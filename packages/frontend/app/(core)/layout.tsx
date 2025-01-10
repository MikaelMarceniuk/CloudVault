import { NextPage } from 'next'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/appSidebar'
import Header from './_components/header'

type CoreLayoutProps = {
  children: React.ReactNode
}

const CoreLayout: NextPage<CoreLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CoreLayout
