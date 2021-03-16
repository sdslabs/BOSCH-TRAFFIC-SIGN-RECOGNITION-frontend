import { axiosInstance } from './AxiosInstance.js'

export const getInitialData = () => {
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

export const getSplitData = () => {
  return axiosInstance
    .get(`/SendSplit`)
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const generateDataset = async dataset => {
  return await axiosInstance({
    method: 'post',
    url: `/GenerateDataset`,
    data: dataset,
  })
}

export const splitDataset = async trainPercentageData => {
  return await axiosInstance({
    method: 'post',
    url: `/SplitData`,
    data: trainPercentageData,
  })
}

export const selectAugmentationRandom = async percentageData => {
  return await axiosInstance({
    method: 'post',
    url: `/RandomType`,
    data: percentageData,
  })
}

export const selectAugmentationManual = async manualData => {
  return await axiosInstance({
    method: 'post',
    url: `/ManualType`,
    data: manualData,
  })
}
