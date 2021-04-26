import React from "react";
import Ingredients from "./Ingredients";
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,useDisclosure} from "@chakra-ui/react";

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
                    <ModalBody mx="4" mb="2">
                        <Ingredients info={ingredients} />
                    </ModalBody>
        
                    <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme="orange" variant="outline">Copy</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
            </>
        );
};
export default IngredientModal;
