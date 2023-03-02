import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./resetpage.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


function Reset() {
  const [data, setData] = useState({
    password: "",
    confirmpassword: "",
    id: "",
  });
  const navigate = useNavigate();
  const [demo, setCode] = useState({ code: "" });
  const [step, setStep] = useState("verify");
  const [result, setResult] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:7070/users/resetpassword",
      { ...data }
    );
    if (response.status === 200) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
      const notify = () =>
        toast("Password Changed", {
          position: "top-right",
          autoClose: 4000,
        });
      notify();
    }
    console.log(response);
  };
  const handleVerify = async () => {
    if (!demo.code.trim()) {
      alert("Please enter a valid code.");
      return;
    }
    const matched = await axios.post("http://localhost:7070/users/matchcode", {
      ...demo,
    });
    console.log(matched.data);
    if (matched.data.msg === "code matched") {
      setStep("reset");
      setData({ ...data, id: matched.data.id });
    } else {
      setStep("verify");
      setResult(matched.data.msg);
    }
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          {step === "verify" && (
            <>
              <TextField
                label="Code"
                fullWidth
                value={demo.code}
                onChange={(e) => setCode({ ...demo, code: e.target.value })}
                className="code"
                required
              />
              <Button
                variant="contained"
                onClick={handleVerify}
                className="button-space"
              >
                Verify
              </Button>
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontWeight: "300",
                }}
              >
                {result}
              </p>
            </>
          )}
          {step === "reset" && (
            <>
              <TextField
                label="New Password"
                fullWidth
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="passwords"
              />
              <TextField
                label="Confirm Password"
                fullWidth
                value={data.confirmpassword}
                onChange={(e) =>
                  setData({ ...data, confirmpassword: e.target.value })
                }
                className="passwords"
              />
              <Button
                variant="contained"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Reset Password
              </Button>
              <ToastContainer />
            </>
          )}
        </form>
      </div>
    </>
  );
}
export default Reset;
