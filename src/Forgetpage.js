import React ,{useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgetpass() {
  const navigate = useNavigate();
  const [result, setResult] = useState({ msg: "" });
  const [data, setdata] = useState({ email: "" });
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:7070/users/forgetpassword",
        {...data},
      );
      console.log(response.data.msg);
      setResult(response.data);
      setTimeout(() => {
        navigate("/reset");
      }, 4000);
    }
    catch (error) {
      console.log(error);
      setResult(error.response.data);
    }
  };


  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          height: "100vh",
        }}
      >
        <div className="row">
          <div
            class="card text-center"
            style={{
              width: "300px",
              backgroundColor: "#FFFFFF",
              textAlign: "center",
              height: "350px",
              borderRadius: "5px 5px",
            }}
          >
            <div
              class="card-header h5 text-white bg-primary"
              style={{
                fontSize: "22px",
                fontFamily: "sans-serif",
                fontWeight: "bolder",
                backgroundColor: "#3B71CA",
                padding: "12px 24px",
                borderRadius:'5px 5px 0 0'
              }}
            >
              Password Reset
            </div>
            <div class="card-body px-5" style={{ padding: "20px 40px" }}>
              <p class="card-text py-2" style={{ padding: "8px" }}>
                Enter your email address and we'll send you an email with
                instructions to reset your password.
              </p>
              <div class="form-outline">
                <input
                  type="email"
                  id="typeEmail"
                  value={data.email}
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                  class="form-control my-3"
                  placeholder="Email Input"
                  style={{
                    padding: "8px",
                    marginBottom: "18px",
                    width: "190px",
                  }}
                />
              </div>
              <button
                type="button"
                class="btn btn-primary"
                style={{
                  padding: "10px 24px 8px 24px",
                  width: "200px",
                  backgroundColor: "#386BC0",
                  color: "whitesmoke",
                  outline: "none",
                  boxShadow: "none",
                  borderRadius:'5px'
                }}
                onClick={handleSubmit}
              >
                Reset password
              </button>
              <p style={{ color: "red", fontWeight: "bold" }}>{result.msg}</p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Forgetpass;
