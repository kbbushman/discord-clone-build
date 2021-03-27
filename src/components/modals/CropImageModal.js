import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "utils/cropImage";

export default function CropImageModal({
  isOpen,
  onClose,
  applyCrop,
  initialImage,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(initialImage, croppedAreaPixels);
      applyCrop(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, initialImage, applyCrop]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent bg="brandGray.light">
        <ModalHeader fontWeight="bold">EDIT MEDIA</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h="400px" overflow="hidden" position="relative">
            <Cropper
              image={initialImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Slider
            aria-label="zoom"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(value) => setZoom(value)}
            my="4"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </ModalBody>

        <ModalFooter bg="brandGray.dark">
          <Button onClick={onClose} fontSize={"14px"} mr={6} variant="link">
            Cancel
          </Button>
          <Button
            background="highlight.standard"
            color="white"
            type="submit"
            fontSize={"14px"}
            _hover={{ bg: "highlight.hover" }}
            _active={{ bg: "highlight.active" }}
            _focus={{ boxShadow: "none" }}
            onClick={showCroppedImage}
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
