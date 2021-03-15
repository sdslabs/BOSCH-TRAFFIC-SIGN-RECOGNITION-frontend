import RotateIcon from '../assets/images/rotate-icon.svg'
import CropIcon from '../assets/images/crop-icon.svg'
import AdjustIcon from '../assets/images/adjust-icon.svg'
import NoiseIcon from '../assets/images/noise-icon.svg'
import EraseIcon from '../assets/images/erase-icon.svg'
export const transforms = [
  {
    title: 'Rotate',
    icon: RotateIcon,
    action: 'rotate',
  },
  {
    title: 'Crop',
    icon: CropIcon,
    action: 'crop',
  },
  {
    title: 'Adjust',
    icon: AdjustIcon,
    actions: ['blur', 'sharpen'],
  },
  {
    title: 'Noise',
    icon: NoiseIcon,
    action: 'noise',
  },
  {
    title: 'Erase',
    icon: EraseIcon,
    action: 'erase',
  },
  {
    title: 'Transform',
    actions: [
      { title: 'Histogram equation', options: [] },
      { title: 'Color Space Transformation', options: [] },
      { title: 'Wavelet Transformation', options: [] },
    ],
  },
]
