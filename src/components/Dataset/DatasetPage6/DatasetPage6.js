import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getEmbedLink, getTensorflowExitLink } from '../../../api/datasetAPI'

const DatasetPage6 = props => {
  const [tensorFlowLink, setTensorFlowLink] = useState()
  useEffect(() => {
    console.log('TensorFlow link updated: ', tensorFlowLink)
    if (tensorFlowLink) {
      checkIfExit()
    }
  }, [tensorFlowLink])

  useEffect(() => {
    handleGetLink()
  }, [])

  const handleGetLink = async () => {
    const embedLink = await getEmbedLink()
    setTensorFlowLink(embedLink.link)
  }

  const checkIfExit = async () => {
    console.log('Checking if exit!')
    setInterval(() => {
      const res = getTensorflowExitLink()
      if (res) {
        res.then(resp => {
          console.log('Tensorflow completed: ', resp.completed)
          if (!(resp.completed === 'false')) {
            props.setDatasetStep(5)
          }
        })
      }
    }, 5000)
  }

  return (
    <Container className="m-0 p-0">
      <iframe
        src={tensorFlowLink}
        frameBorder="0"
        style={{ position: 'relative', height: '100%', width: '100' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
      ></iframe>
    </Container>
  )
}

export default DatasetPage6
