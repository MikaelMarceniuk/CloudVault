'use client'

import {
  Download,
  File as FileIcon,
  MoreVertical,
  PencilLine,
  Trash2,
} from 'lucide-react'
import File from '@/@types/File'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FileItemProps = {
  file: File
}

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  return (
    <li className="border rounded-lg p-4 flex gap-2 items-center w-fit bg-primary cursor-pointer hover:bg-primary/80 active:bg-primary">
      <FileIcon className="stroke-primary-foreground" />
      <span className="font-semibold text-primary-foreground flex-1">
        {file.name}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="stroke-secondary ml-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <PencilLine />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  )
}

export default FileItem
