import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const updateBlog = async (id, newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log(response)
  return response.data
}

export default { getAll, createBlog, updateBlog }