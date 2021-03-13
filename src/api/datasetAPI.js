import { axiosInstance } from './AxiosInstance.js'

function getInitialData() {
  return axiosInstance
    .get(`/InitialData`)
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export default getInitialData
