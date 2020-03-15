import axios from "axios"
const apiUrl = "https://covid19.mathdro.id/api"

export const get = (path = "") =>
  axios.get(`${apiUrl}/${path}`).then(res => res.data)

export default {
  get,
}
