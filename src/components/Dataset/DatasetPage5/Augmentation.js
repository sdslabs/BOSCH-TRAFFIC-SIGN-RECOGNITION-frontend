import React, { useState, useEffect } from 'react'
import { generalData } from '../../../constants/Analysis'
import DatasetPage1 from '../DatasetPage1/DatasetPage1'
import { getSplitData, augAnalysis } from '../../../api/datasetAPI'
import { Row, Col } from 'react-bootstrap'
import ArrowDownIcon from '../../../assets/images/arrowdown.svg'
import ArrowUpIcon from '../../../assets/images/arrowup.svg'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
const PrettoSlider = withStyles({
  root: {
    color: '#335bc0',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider)
const Augmentation = props => {
  const [trainStructure, setTrainStructure] = useState({ empty: true })
  const [testStructure, setTestStructure] = useState({ empty: true })
  const [selectedImg, setSelectedImg] = useState('')
  const [isTestSelected, selectTest] = useState(false)
  const [isTrainSelected, selectTrain] = useState(false)
  const [totalTestImages, setTotalTestImages] = useState(0)
  const [totalTrainImages, setTotalTrainImages] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [blur, setBlur] = useState(1)
  const [sharpen, setSharpen] = useState(0)
  const [mean, setMean] = useState(0)
  const [variance, setVariance] = useState(0)
  const [analysisImages, setAnalysisImages] = useState(null)
  const [step, setStep] = useState(1)
  useEffect(() => {
    props.setGeneralData(generalData[3])
    handleGetAugmentationData()
  }, [])
  const handleGetAugmentationData = async () => {
    props.tl(true)
    const structure = await getSplitData()
    props.tl(false)
    structure.train.empty = false
    structure.valid.empty = false
    console.log(structure)
    let trainImages = 0
    let testImages = 0
    structure.valid.folders.forEach((folder, id) => {
      let selectedCount = 0
      let imageCount = 0
      folder.images.forEach(image => {
        testImages++
        imageCount++
        if (image.selected === 'true') {
          selectedCount++
        }
      })
      folder.selectedCount = selectedCount
      folder.imageCount = imageCount
      folder.id = id
    })
    structure.train.folders.forEach((folder, id) => {
      let selectedCount = 0
      let imageCount = 0
      folder.images.forEach(image => {
        trainImages++
        imageCount++
        if (image.selected === 'true') {
          selectedCount++
        }
      })
      folder.selectedCount = selectedCount
      folder.imageCount = imageCount
      folder.id = id
    })
    setTotalTrainImages(trainImages)
    setTotalTestImages(testImages)
    setTestStructure(structure.valid)
    setTrainStructure(structure.train)
  }
  const execute = async () => {
    const data = {
      img_path: selectedImg,
      rotate: {
        angle: rotation,
      },
      blur: {
        k_dim: blur,
      },
      sharpen: {
        amount: sharpen,
      },
      noise: {
        mean,
        variance,
      },
    }
    props.tl(true)
    const res = await augAnalysis(data)
    props.tl(false)
    if (res.status === 200) {
      setStep(3)
      setAnalysisImages(res.data)
    }
  }
  return (
    <div className="aug-analysis">
      <div className="aug-analysis-column">
        <div className={'select-image'}>
          <div className="heading-row">
            <div className={'analysis-heading' + (step > 1 ? ' opacity' : '')}>
              1. Select Image
            </div>
            {step === 1 && (
              <button
                className="primary-cta-sec row-last-button"
                disabled={!selectedImg}
                onClick={() => {
                  setStep(2)
                }}
              >
                Next
              </button>
            )}
            {step > 1 && (
              <button
                className="primary-cta-sec row-last-button"
                onClick={() => {
                  setStep(1)
                  setSelectedImg('')
                }}
              >
                Reset
              </button>
            )}
          </div>
          <Row className="mb-4" />

          <Row
            className={
              'ml-0 select-dataset-header' + (step > 1 ? ' opacity' : '')
            }
          >
            <Col xs={1}></Col>
            <Col> Name</Col>
            <Col> No of Images</Col>
          </Row>
          <div className={'selector' + (step > 1 ? ' opacity' : '')}>
            <Row className="ml-0 d-flex align-items-center border-bottom select-dataset-header">
              <Col
                xs={1}
                className="d-flex justify-content-center align-items-center pointer"
                onClick={() => {
                  selectTrain(!isTrainSelected)
                }}
              >
                {isTrainSelected ? (
                  <img
                    src={ArrowUpIcon}
                    className="open-close-folder d-flex justify-content-center"
                  />
                ) : (
                  <img
                    src={ArrowDownIcon}
                    className="open-close-folder d-flex justify-content-center"
                  />
                )}
              </Col>
              <Col>Train Data</Col>
              <Col className="ml-5">{totalTrainImages}</Col>
            </Row>
            {isTrainSelected && (
              <DatasetPage1
                initialDataHandler={setTestStructure}
                structure={testStructure}
                setStructure={setTestStructure}
                dontShowHeading={true}
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                isAnalysis={true}
                preview={true}
                notShowHeader={true}
                isAugmentation={true}
              />
            )}
            <Row className="ml-0 d-flex align-items-center border-bottom select-dataset-header">
              <Col
                xs={1}
                className="d-flex justify-content-center align-items-center pointer"
                onClick={() => {
                  selectTest(!isTestSelected)
                }}
              >
                {isTestSelected ? (
                  <img
                    src={ArrowUpIcon}
                    className="open-close-folder d-flex justify-content-center"
                  />
                ) : (
                  <img
                    src={ArrowDownIcon}
                    className="open-close-folder d-flex justify-content-center"
                  />
                )}
              </Col>
              <Col className="">Validation Data</Col>
              <Col className="ml-5">{totalTestImages}</Col>
            </Row>
            {isTestSelected && (
              <DatasetPage1
                initialDataHandler={setTrainStructure}
                structure={trainStructure}
                setStructure={setTrainStructure}
                dontShowHeading={true}
                setSelectedImg={setSelectedImg}
                isAnalysis={true}
                preview={true}
                notShowHeader={true}
                selectedImg={selectedImg}
                isAugmentation={true}
              />
            )}
          </div>
        </div>
        {step >= 2 && (
          <div className={'augment-select' + (step > 2 ? ' opacity' : '')}>
            <div className="heading-row">
              <div className="analysis-heading">2. Augment</div>
              <button
                className="secondary-cta row-last-button"
                onClick={() => {
                  setRotation(0)
                  setBlur(1)
                  setSharpen(0)
                  setMean(0)
                  setVariance(0)
                }}
              >
                Reset
              </button>
              <button
                className="primary-cta-sec row-button"
                onClick={execute}
                disabled={!selectedImg}
              >
                Execute
              </button>
            </div>
            <div className="aug-options">
              <div className="action-name2">Rotate</div>
              <div className="aug-rotate">
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={0}
                  min={-180}
                  max={180}
                  step={0.1}
                  value={rotation}
                  onChange={(e, val) => setRotation(val)}
                />
              </div>
              <div className="action-name2 mt-1">Blur</div>
              <div className="aug-rotate">
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={1}
                  min={1}
                  max={4}
                  step={1}
                  value={blur}
                  onChange={(e, val) => setBlur(val)}
                />
              </div>
              <div className="action-name2 mt-1">Sharpen</div>
              <div className="aug-rotate">
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={0}
                  min={0}
                  max={32}
                  step={1}
                  value={sharpen}
                  onChange={(e, val) => setSharpen(val)}
                />
              </div>
              <div className="action-name2 mt-1">Noise</div>
              <div className="noise-input">
                <div className="augmentation-input">
                  <div className="action-option">Mean</div>
                  <input
                    type="number"
                    step="0.01"
                    className="input-box"
                    placeholder="Mean"
                    name="Mean"
                    value={mean}
                    onChange={e => setMean(e.target.value)}
                  />
                </div>
                <div className="augmentation-input">
                  <div className="action-option">Standard Deviation</div>
                  <input
                    type="number"
                    step="0.01"
                    className="input-box"
                    placeholder="Standard Deviation"
                    name="Standard Deviation"
                    value={variance}
                    onChange={e => setVariance(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="aug-analysis-column">
        <div className="heading-row">
          {step >= 3 && <div className="analysis-heading">3. Analysis</div>}
        </div>
        {step >= 3 && analysisImages && (
          <div>
            <div className="analysis-img-container">
              <div className="analysis-img">
                <img src={`http://localhost:5000/${analysisImages.original}`} />
                <span>Original</span>
              </div>
              <div className="analysis-img">
                <img src={`http://localhost:5000/${analysisImages.modified}`} />
                <span>Modified</span>
              </div>
            </div>
            <div className="analysis-img-container">
              <div className="analysis-img">
                <img src={`http://localhost:5000/${analysisImages.stn}`} />
                <span>STN</span>
              </div>
              <div className="analysis-img">
                <img src={`http://localhost:5000/${analysisImages.gradcam}`} />
                <span>GRAD CAM</span>
              </div>
              <div className="analysis-img">
                <img
                  src={`http://localhost:5000/${analysisImages.gradcam_noise}`}
                />
                <span>GCAM Noise</span>
              </div>
            </div>
            <div className="analysis-heading">Uncertainity Scores</div>
            <div className="action-name mbt-1">
              Epistemic -{'>'} {analysisImages.uc_scores.epistemic}
            </div>
            <div className="action-name mbt-1">
              Aleatoric -{'>'} {analysisImages.uc_scores.aleatoric}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Augmentation
