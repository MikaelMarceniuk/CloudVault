import axios from 'axios'

const logoutApi = async (): Promise<void> => {
  await axios.get('http://localhost:3333/api/logout', {
    withCredentials: true,
  })
}

export default logoutApi
