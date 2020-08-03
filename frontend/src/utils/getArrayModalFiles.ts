import imageModal from '../assets/image-modal.png';
import imageModal2 from '../assets/image-modal-2.png';
import imageModal3 from '../assets/image-modal-3.png';
import imageModal4 from '../assets/image-modal-4.png';
import imageModal5 from '../assets/image-modal-5.png';
import imageModal6 from '../assets/image-modal-6.png';
import imageModal7 from '../assets/image-modal-7.png';
import imageModal8 from '../assets/image-modal-8.png';

import iconModal from '../assets/icon-modal.png';
import iconModal2 from '../assets/icon-modal-2.png';
import iconModal3 from '../assets/icon-modal-3.png';
import iconModal4 from '../assets/icon-modal-4.png';
import iconModal5 from '../assets/icon-modal-5.png';
import iconModal6 from '../assets/icon-modal-6.png';
import iconModal7 from '../assets/icon-modal-7.png';
import iconModal8 from '../assets/icon-modal-8.png';

export interface ModalImageState {
  url: string;
  isSelected: boolean;
}

export interface ModalIconState {
  url: string;
  count: number;
  name: string;
  color: string;
  equalImageUrl: string;
}

export function getArrayModalImages(): ModalImageState[] {
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

export function getArrayModalIcons(): ModalIconState[] {
  return [
    {
      url: iconModal,
      count: 0,
      name: 'Carro',
      color: '#1ae1a1',
      equalImageUrl: imageModal,
    },
    {
      url: iconModal2,
      count: 0,
      name: 'Ônibus',
      color: '#003f3a',
      equalImageUrl: imageModal2,
    },
    {
      url: iconModal3,
      count: 0,
      name: 'Avião',
      color: '#6ae8e5',
      equalImageUrl: imageModal3,
    },
    {
      url: iconModal4,
      count: 0,
      name: 'Barco',
      color: '#8800ff',
      equalImageUrl: imageModal4,
    },
    {
      url: iconModal5,
      count: 0,
      name: 'Taxi Aéreo',
      color: '#292eec',
      equalImageUrl: imageModal5,
    },
    {
      url: iconModal6,
      count: 0,
      name: 'Voadeira',
      color: '#8f8f8f',
      equalImageUrl: imageModal6,
    },
    {
      url: iconModal7,
      count: 0,
      name: 'Rabeta',
      color: '#017e7b',
      equalImageUrl: imageModal7,
    },
    {
      url: iconModal8,
      count: 0,
      name: 'Lancha a jato',
      color: '#00003a',
      equalImageUrl: imageModal8,
    },
  ];
}
