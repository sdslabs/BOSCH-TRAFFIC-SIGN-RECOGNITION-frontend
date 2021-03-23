import { Container, Row, Col } from 'react-bootstrap'
import Step1 from './SidebarStep1'
import Step2 from './SidebarStep2'
import Step3 from './SidebarStep3'
import Step4 from './SidebarStep4'
import Step5 from './SidebarStep5'

const LeftSidebar = props => {
  return (
    <Container
      className="sidebar border-right border-dark p-0"
      style={{
        backgroundColor:
          props.isUpload || props.isNewFolder
            ? 'rgba(196, 196, 196, 0.2)'
            : 'white',
      }}
    >
      <Col className="p-0">
        <Row className="border-bottom heading">Heading for model</Row>
        {props.datasetStep >= 1 && (
          <Step1
            done={props.datasetStep > 1}
            initialData={props.structure}
            setDatasetStep={props.setDatasetStep}
            isUpload={props.isUpload}
            isNewFolder={props.isNewFolder}
          />
        )}
        {props.datasetStep >= 2 && (
          <Step2
            done={props.datasetStep > 2}
            setDatasetStep={props.setDatasetStep}
            splitDataTraining={props.splitDataTraining}
          />
        )}
        {props.datasetStep >= 3 && (
          <Step3
            done={props.datasetStep > 3}
            setDatasetStep={props.setDatasetStep}
          />
        )}
        {props.datasetStep >= 4 && (
          <Step4
            done={props.datasetStep > 4}
            setDatasetStep={props.setDatasetStep}
          />
        )}
        {props.datasetStep >= 5 && (
          <Step5
            done={props.datasetStep > 5}
            setDatasetStep={props.setDatasetStep}
          />
        )}
      </Col>
    </Container>
  )
}

export default LeftSidebar
