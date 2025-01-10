import { Button } from '@/components/ui/button'
import { FolderPlus, Plus, Share } from 'lucide-react'
import SendOrDropFileBtn from './_components/sendOrDropFileBtn'
import FileExplorer from './_components/fileExplorer'

const CoreAllFilesPage: React.FC = () => {
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
      <FileExplorer />
    </div>
  )
}

export default CoreAllFilesPage
