"use client";

import { useEffect, useMemo, useState } from "react";

export function useGallery(images: string[]) {
  const validImages = useMemo(
    () => images.filter(Boolean),
    [images]
  );

  const [selectedImage, setSelectedImage] = useState("");

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (validImages.length > 0) {
      setSelectedImage(validImages[0]);
    }
  }, [validImages]);

  const currentIndex = validImages.indexOf(selectedImage);

  function nextImage() {
    if (currentIndex < validImages.length - 1) {
      setSelectedImage(validImages[currentIndex + 1]);
    }
  }

  function previousImage() {
    if (currentIndex > 0) {
      setSelectedImage(validImages[currentIndex - 1]);
    }
  }

  function selectImage(image: string) {
    setSelectedImage(image);
  }

  function onTouchStart(x: number) {
    setTouchStart(x);
  }

  function onTouchMove(x: number) {
    setTouchEnd(x);
  }

  function onTouchEnd() {
    const distance = touchStart - touchEnd;

    if (distance > 75) {
      nextImage();
    }

    if (distance < -75) {
      previousImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  }

  return {
    images: validImages,

    selectedImage,

    currentIndex,

    canGoNext: currentIndex < validImages.length - 1,

    canGoPrevious: currentIndex > 0,

    nextImage,

    previousImage,

    selectImage,

    onTouchStart,

    onTouchMove,

    onTouchEnd,
  };
}