import React from "react";
import Ingredients from "./Ingredients";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,Button,useDisclosure} from "@chakra-ui/react";

function IngredientModal({ ingredients }){
    const { isOpen, onOpen, onClose } = useDisclosure()  
        return (
            <>
                <Button onClick={onOpen}>Ingredients</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ingredients</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mx="6" mb="2">
                        <Ingredients info={ingredients} />
                    </ModalBody>
                </ModalContent>
                </Modal>
            </>
        );
};
export default IngredientModal;
