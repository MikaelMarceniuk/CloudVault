'use client'

import { useRef } from 'react'
import { FileUp, FolderUp, Upload } from 'lucide-react'
import axios from 'axios'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const SendOrDropFileBtn: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleOnUploadClick = (type: 'file' | 'dir') => () => {
    const input = fileInputRef.current
    if (!input) return

    if (type == 'file') input.removeAttribute('webkitdirectory')
    else input.setAttribute('webkitdirectory', '')

    input.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target

    if (input.files && input.files.length > 0) {
      const body = new FormData()

      for (const f of input.files) {
        body.append('files', f)

        if (f.webkitRelativePath) {
          const parentfolder = f.webkitRelativePath.split('/')
          parentfolder.pop()

          body.append('parentfolder', parentfolder.join('/'))
        } else body.append('parentfolder', '/')
      }

      await axios.post('http://localhost:3333/api/file', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
    }

    input.value = ''
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-20 w-40 flex flex-col items-start">
            <Upload />
            <span className="font-semibold">Send or Drop a file</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={handleOnUploadClick('file')}>
            <FileUp />
            File
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnUploadClick('dir')}>
            <FolderUp />
            Folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default SendOrDropFileBtn
