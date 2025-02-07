// ModalPopup.tsx
import React from "react";
import {
  
  useDisclosure
} from "@chakra-ui/react";

const ModalPopup: React.FC = () => {
  const {  onOpen } = useDisclosure();

  React.useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
   <div></div>
  );
};

export default ModalPopup;
