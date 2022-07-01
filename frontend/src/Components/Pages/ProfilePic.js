import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const ProfilePic = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [picData, setPicData] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const uploadPicHandler = (pic) => {
    console.log(pic);
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (
      pic.type == "image/jpeg" ||
      pic.type == "image/png" ||
      pic.type == "image/jpg"
    ) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "manishatcloud");
      fetch("https://api.cloudinary.com/v1_1/manishatcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicData(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const updatePicHandler = async () => {
    setLoading(true);
    if (picData === undefined) {
      toast({
        title: "Select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/user",
        {
          pic: picData,
          userId: user._id,
        },
        config
      );
      console.log(data);
      // const user = JSON.parse(localStorage.getItem("userInfo"));
      user.picture=picData;
      localStorage.setItem("userInfo",JSON.stringify(user));
      toast({
        title: "Image Upload successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      onClose();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };
  const refreshHandler = ()=>{
   
     
      
      
    }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal size="sm" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Select Profile Picture
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => uploadPicHandler(e.target.files[0])}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ color: "green", marginRight: "10px" }}
              onClick={updatePicHandler}
              isLoading={loading}
            >
              Update
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePic;
