import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/login.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  });

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Card className="loginform">
        <Card.Body>
          <Card.Title>
            <b>Sign In</b>
          </Card.Title>
          <hr></hr>
          <Card.Text>
            <div className="row mb-3 mt-3">
              <div className="col-md-2 mb-2">
                <img src="./email.svg" alt="email" height={42} width={50} />
              </div>
              <div className="col-md-10">
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  placeholder="Your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 mb-2">
                <img src="./lock.svg" alt="lock" height={35} width={50} />
              </div>
              <div className="col-md-10">
                <input
                  type="password"
                  className="form-control"
                  id="InputPass"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </Card.Text>
          <Button
            style={{
              background: "linear-gradient(#fffcff, #d5fefd)",
              color: "black",
            }}
            className="mb-3 mt-3"
            onClick={submitHandler}
            isLoading={loading}
          >
            <b>Sign In</b>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
