import { Button } from '@/components/ui/button'
import { FolderPlus, Plus, Share } from 'lucide-react'
import SendOrDropFileBtn from './_components/sendOrDropFileBtn'

const CoreHomePage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex gap-4">
        <SendOrDropFileBtn />
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
  )
}

export default CoreHomePage
