type File = {
  name: string
  id: string
  type: 'FOLDER' | 'FILE'
  path: string
  createdAt: Date
  updatedAt: Date
  parentId: string | null
  userId: string
}

export default File
