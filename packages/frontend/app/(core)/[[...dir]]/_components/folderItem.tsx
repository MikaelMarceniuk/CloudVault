import File from '@/@types/File'
import {
  Download,
  Folder,
  MoreVertical,
  PencilLine,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FolderItemProps = {
  file: File
}

const FolderItem: React.FC<FolderItemProps> = ({ file }) => {
  const pathname = usePathname()

  return (
    <Link
      href={`${pathname}/${file.name}`}
      key={file.id}
    >
      <li className="border rounded-lg p-4 flex gap-4 w-fit bg-primary cursor-pointer hover:bg-primary/80 active:bg-primary">
        <Folder className="stroke-primary-foreground" />
        <span className="font-semibold text-primary-foreground">
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
    </Link>
  )
}

export default FolderItem
