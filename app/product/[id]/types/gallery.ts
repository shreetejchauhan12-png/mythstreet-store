export interface GalleryModel {
  images: string[];

  selectedImage: string;

  currentIndex: number;

  canGoNext: boolean;

  canGoPrevious: boolean;

  nextImage: () => void;

  previousImage: () => void;

  selectImage: (image: string) => void;

  onTouchStart: (x: number) => void;

  onTouchMove: (x: number) => void;

  onTouchEnd: () => void;
}