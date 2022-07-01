import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../Config/ChatLogics";
import GroupChatPopup from "./GroupChatPopup";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load Chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      style={{
        background: "linear-gradient(#f5f7fa , #b8c6db)",
        color: "black",
      }}
    >
      <Box
        pb={3}
        px={3}
        mb={2}
        borderRadius="xl"
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        style={{
          background: "linear-gradient(#d5d0e5 , #f3e6e8)",
          color: "black",
        }}
      >
        My Chats
        <GroupChatPopup>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            ml={1}
            mt={2}
          >
            New Group Chat
          </Button>
        </GroupChatPopup>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        style={{
          background: "linear-gradient(#d5d0e5 , #f3e6e8)",
          color: "black",
        }}
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? selectedChat.isGroupChat
                      ? "linear-gradient(to right,#ffcc2f , #ef5734)"
                      : "linear-gradient(to right,#e5bdf6 , #d8dede)"
                    : "#E8E8E8"
                }
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
