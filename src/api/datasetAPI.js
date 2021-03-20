import { axiosInstance } from './AxiosInstance.js'

export const getInitialData = () => {
  const timeString = Date.now().toString()
  return axiosInstance
    .get(`/InitialData/${timeString}`)
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const getSplitData = () => {
  const timeString = Date.now().toString()
  return axiosInstance
    .get(`/SendSplit/${timeString}`)
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const getOriginalImages = () => {
  const timeString = Date.now().toString()
  return axiosInstance
    .get(`/GetOrg16/${timeString}`)
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const getModifiedImages = () => {
  const timeString = Date.now().toString()
  return axiosInstance
    .get(`/GetMod16/${timeString}`)
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

export const applyAugmentation = async data => {
  return await axiosInstance({
    method: 'post',
    url: `/SendTransform16`,
    data: data,
  })
}

export const undoAugmentationAPI = async () => {
  return await axiosInstance({
    method: 'post',
    url: `/Undo`,
    data: {},
  })
}

export const copyAndSaveAPI = async () => {
  return await axiosInstance({
    method: 'post',
    url: `/SendTransformBatch`,
    data: {},
  })
}

export const sendHP = async data => {
  return axiosInstance
    .post('/SendHP', { data })
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export const getEmbedLink = () => {
  const timeString = Date.now().toString()
  return axiosInstance
    .get(`/GetLink/${timeString}`)
    .then(response => {
      const res = JSON.parse(response.request.response)
      return res
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
