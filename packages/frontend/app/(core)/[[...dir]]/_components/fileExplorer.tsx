'use client'

import { usePathname } from 'next/navigation'
import useSWR from 'swr'

import getUserFilesApi from '@/api/getUserFiles'

import { useSession } from '@/providers/sessionProvider'
import { Folder } from 'lucide-react'
import Link from 'next/link'

const FileExplorer: React.FC = () => {
  const { user } = useSession()
  const pathname = usePathname()

  // Extrai o caminho atual sem `/home`
  const currentPath = pathname.replace('/home', '').slice(1)

  const { data } = useSWR(['files', { userId: user?.id, currentPath }], () =>
    getUserFilesApi({ path: currentPath })
  )

  const folders = data?.filter((f) => f.type == 'FOLDER')
  const files = data?.filter((f) => f.type == 'FILE')

  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <ul className="flex flex-wrap gap-4 p-4">
        {data?.map((f) => (
          <Link
            href={`${pathname}/${f.name}`}
            key={f.id}
          >
            <li className="border rounded-lg p-4 flex gap-4 w-fit bg-primary cursor-pointer hover:bg-primary/80 active:bg-primary">
              <Folder className="stroke-primary-foreground" />
              <span className="font-semibold text-primary-foreground">
                {f.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default FileExplorer
