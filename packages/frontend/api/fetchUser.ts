import axios from 'axios'

type User = {
  id: string
  name: string
  email: string
}

const fetchUserApi = async (): Promise<User> => {
  const { data } = await axios.get<User>('http://localhost:3333/api/user', {
    withCredentials: true,
  })

  return data
}

export default fetchUserApi
