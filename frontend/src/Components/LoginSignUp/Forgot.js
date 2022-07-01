import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Forgot() {
  return (
    <div className="login">
      <Card className="loginform">
        <Card.Body>
          <Card.Title>
            <b>Forgot Password</b>
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
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </Card.Text>
          <Button
            style={{
              background: "linear-gradient(#fffcff, #d5fefd)",
              color: "black",
            }}
            className="mb-3"
          >
            <b>Send Email</b>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Forgot;
