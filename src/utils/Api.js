import axios from "axios"
const apiUrl = process.env.GATSBY_API_URL

export const get = (path = '') => axios.get(`${apiUrl}/${path}`).then(res => res.data)

export default {
  get
}
