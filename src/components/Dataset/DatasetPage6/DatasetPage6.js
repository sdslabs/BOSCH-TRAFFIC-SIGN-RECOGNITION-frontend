import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getEmbedLink, getTensorflowExitLink } from '../../../api/datasetAPI'

<<<<<<< Updated upstream
const DatasetPage6 =()=> {
  return (
    <Container className="m-0 p-0 h-100" fluid>
      <iframe
        src={"http://localhost:6006"}
=======
const DatasetPage6 = props => {
  useEffect(()=>{
    waitFor5()
  },[])
  const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
 }
  const waitFor5 = async () =>
  {
    await sleep(3000)
    var iframe = document.getElementById('youriframe');
      var iframenew = document.createElement('iframe');
      iframenew.src = props.tensorFlowLink
      iframenew.frameBorder="0"
      iframenew.style={ position: 'relative', height: '100%', width: '100%' }
      iframenew.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframenew.allowFullScreen=false
      document.getElementById("iframecontainer").appendChild(iframenew)
  }
  return (
    <Container className="m-0 p-0 h-100" fluid id="iframecontainer">
      {/* <iframe
        src={props.tensorFlowLink}
>>>>>>> Stashed changes
        frameBorder="0"
        style={{ position: 'relative', height: '100%', width: '100%' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
      ></iframe> */}
    </Container>
  )
}

export default DatasetPage6
