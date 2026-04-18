import { useState } from "react";
import golden from "../assets/images/Golden.png";
import logo from "../assets/images/Golden_Dynasty.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  const [hover, setHover] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* left Section */}
      <div
        className="hidden items-center justify-center bg-cover lg:flex lg:w-1/2"
        style={{
          position: "relative",
        }}
      >
        <img
          src={golden}
          alt="Restaurant Image"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />

        {/* Black Overlay */}
        <div
          className="bg-black"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        ></div>

        {/* Quote at bottom */}
        <blockquote
          className="text-2xl italic text-[#ffffff]"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          "Provide Great food, friendly service, and a welcoming experience that
          brings customers back."
          <br />
          <span
            className="text-yellow-400"
            style={{ display: "block", marginTop: "1rem" }}
          >
            - Founder of Golden Dynasty
          </span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div
        className="min-h-screen w-full px-4 py-8 sm:px-8 lg:w-1/2"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Restaurant_logo"
            className="rounded-full"
            style={{
              height: "3.5rem",
              width: "3.5rem",
              borderWidth: "2px",
              padding: "0.25rem",
            }}
          />
          <h1
            className="text-[#f5f5f5] tracking-wide"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Golden Dynasty
          </h1>
        </div>

        <h2
          className="text-center text-yellow-400"
          style={{
            fontSize: "2rem",
            fontWeight: 600,
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          {isRegister ? "Employee Registeration" : "Employee Sign In"}
        </h2>

        <div className="mx-auto w-full max-w-lg">
          {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}
        </div>

        <div className="flex justify-center" style={{ marginTop: "2.5rem" }}>
          <p
            className="text-[#ababab]"
            style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
          >
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}
            <a
              onClick={() => setIsRegister(!isRegister)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              href="#"
              style={{
                color: "#FACC15",
                fontWeight: 600,
                textDecoration: hover ? "underline" : "none",
                cursor: "pointer",
              }}
            >
              {isRegister ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
