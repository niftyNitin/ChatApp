import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/register.css";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confrimPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confrimPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confrimPassword) {
      toast({
        title: "Passwords Do Not Match",
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
        "/api/user",
        { name, email, password },
        config
      );
      toast({
        title: "Registration is Successful",
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
    <div className="register">
      <Card className="registerform">
        <Card.Body>
          <Card.Title>
            <b>Sign Up</b>
          </Card.Title>
          <hr></hr>
          <Card.Text>
            <div className="row mb-3 mt-3">
              <div className="col-md-2 mb-2">
                <img src="./person.svg" alt="name" height={42} width={50} />
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="InputName"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
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
            <div className="row mb-3">
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
            <div className="row">
              <div className="col-md-2 mb-2">
                <img
                  src="./danger.svg"
                  alt="confirmpass"
                  height={42}
                  width={50}
                />
              </div>
              <div className="col-md-10">
                <input
                  type="password"
                  className="form-control"
                  id="InputConfirmPass"
                  placeholder="Confirm your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </Card.Text>
          <Button
            style={{
              background: "linear-gradient(#fffcff, #d5fefd)",
              color: "black",
            }}
            className="mt-3 mb-3"
            onClick={submitHandler}
            isLoading={loading}
          >
            <b>Sign Up</b>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
