import imageModal from '../assets/image-modal.png';
import imageModal2 from '../assets/image-modal-2.png';
import imageModal3 from '../assets/image-modal-3.png';
import imageModal4 from '../assets/image-modal-4.png';
import imageModal5 from '../assets/image-modal-5.png';
import imageModal6 from '../assets/image-modal-6.png';
import imageModal7 from '../assets/image-modal-7.png';
import imageModal8 from '../assets/image-modal-8.png';

export interface ModalImageState {
  url: string;
  isSelected: boolean;
}

export default function getArrayModalImages(): ModalImageState[] {
  return [
    {
      url: imageModal,
      isSelected: false,
    },
    {
      url: imageModal2,
      isSelected: false,
    },
    {
      url: imageModal3,
      isSelected: false,
    },
    {
      url: imageModal4,
      isSelected: false,
    },
    {
      url: imageModal5,
      isSelected: false,
    },
    {
      url: imageModal6,
      isSelected: false,
    },
    {
      url: imageModal7,
      isSelected: false,
    },
    {
      url: imageModal8,
      isSelected: false,
    },
  ];
}
