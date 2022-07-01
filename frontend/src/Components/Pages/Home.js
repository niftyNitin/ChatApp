import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Forgot from "../LoginSignUp/Forgot";
import Login from "../LoginSignUp/Login";
import Register from "../LoginSignUp/Register";
import "../Css/home.css";

const Home = () => {
  return (
    <Container centerContent>
      <Box
        className="home"
        w="100%"
        p={4}
        mt={{ base: "2", md: "40" }}
        mb={{ base: "2", md: "none" }}
      >
        <Tabs isFitted variant="soft-rounded" size="md">
          <TabList mb="1em">
            <Tab
              mr={2}
              className="tabcolor"
              _selected={{
                color: "linear-gradient(#e61d8c, #c7e9fb)",
                background: "linear-gradient(#d5d0e5, #f3e6e8)",
              }}
            >
              <b>Login</b>
            </Tab>
            <Tab
              mr={2}
              className="tabcolor"
              _selected={{
                color: "linear-gradient(#e61d8c, #c7e9fb)",
                background: "linear-gradient(#d5d0e5, #f3e6e8)",
              }}
            >
              <b>Sign Up</b>
            </Tab>
            <Tab
              className="tabcolor"
              _selected={{
                color: "linear-gradient(#e61d8c, #c7e9fb)",
                background: "linear-gradient(#d5d0e5, #f3e6e8)",
              }}
            >
              <b>Forgot Password</b>
            </Tab>
          </TabList>
          <hr></hr>
          <TabPanels>
            <TabPanel height={{ base: "400px", md: "310px" }}>
              <Login />
            </TabPanel>
            <TabPanel height={{ base: "620px", md: "450px" }}>
              <Register />
            </TabPanel>
            <TabPanel height={{ base: "290px", md: "250px" }}>
              <Forgot />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
