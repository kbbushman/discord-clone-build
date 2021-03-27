import {
  Icon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { sendMessage } from "api/handler/messages";
import StyledTooltip from "components/sections/StyledTooltip";
import React, { useRef, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FileSchema } from "validation/message.schema";

export default function FileUploadButton() {
  const { channelId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputFile = useRef(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    setErrors({});
    setProgress(0);
    onClose();
  };

  const handleSubmit = async (file) => {
    if (!file) return;
    setSubmitting(true);

    try {
      await FileSchema.validate({ file });
    } catch (err) {
      setErrors(err.errors);
      onOpen();
      return;
    }

    const data = new FormData();
    data.append("file", file);
    await sendMessage(channelId, data, (event) => {
      const loaded = Math.round((100 * event.loaded) / event.total);
      setProgress(loaded);
      if (loaded >= 100) setProgress(0);
    });
  };

  return (
    <InputLeftElement
      color={"iconColor"}
      _hover={{ cursor: "pointer", color: "#fcfcfc" }}
      onClick={() => inputFile.current.click()}
    >
      <Icon as={MdAddCircle} boxSize={"20px"} />
      <input
        type="file"
        ref={inputFile}
        hidden
        disabled={isSubmitting}
        onChange={async (e) => {
          if (!e.currentTarget.files) return;
          handleSubmit(e.currentTarget.files[0]).then(() => {
            setSubmitting(false);
            e.target.value = "";
          });
        }}
      />
      {errors && (
        <Modal size="sm" isOpen={isOpen} onClose={closeModal} isCentered>
          <ModalOverlay />
          <ModalContent bg="brandGray.light" textAlign="center">
            <ModalHeader pb="0">Error Uploading File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="2">Reason: {errors}</Text>
              <Text>Max file size is 5.00 MB</Text>
              <Text>Only Images and mp3 allowed</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {progress > 0 && (
        <Modal
          size="sm"
          isOpen={progress > 0}
          closeOnOverlayClick={false}
          onClose={closeModal}
          isCentered
        >
          <ModalContent bg="brandGray.darker" textAlign="center">
            <ModalHeader pb="0">Upload Progress</ModalHeader>
            <ModalBody>
              <Progress hasStripe isAnimated value={progress} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </InputLeftElement>
  );
}
