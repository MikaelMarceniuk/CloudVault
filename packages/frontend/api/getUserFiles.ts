import File from '@/@types/File'
import axios from 'axios'

type GetUserFilesApiParams = {
  path: string
}

type ApiResponse = {
  isSuccess: true
  data: {
    files: File[]
  }
}

const getUserFilesApi = async ({
  path,
}: GetUserFilesApiParams): Promise<File[]> => {
  const { data } = await axios.get<ApiResponse>(
    'http://localhost:3333/api/file',
    {
      params: {
        path,
      },
      withCredentials: true,
    }
  )

  return data.data.files
}

export default getUserFilesApi
