import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getEmbedLink, getTensorflowExitLink } from '../../../api/datasetAPI'

const DatasetPage6 =()=> {
  return (
    <Container className="m-0 p-0 h-100" fluid>
      <iframe
        src={"http://localhost:6006"}
        frameBorder="0"
        style={{ position: 'relative', height: '100%', width: '100%' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
      ></iframe>
    </Container>
  )
}

export default DatasetPage6
