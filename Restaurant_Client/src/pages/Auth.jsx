import { useState } from "react";
import golden from "../assets/images/Golden.png";
import logo from "../assets/images/Golden_Dynasty.png";
import Register from "../components/auth/Register";

const Auth = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex w-full min-h-screen">
      {/* left Section */}
      <div
        className="flex items-center justify-center bg-cover"
        style={{
          width: "50%",
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
        className="min-h-screen"
        style={{ width: "50%", backgroundColor: "#1a1a1a", padding: "2.5rem" }}
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
            fontSize: "2.25rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          Employee Registeration
        </h2>

        {/* Components */}
        {/* Register */}
        <Register />

        <div className="flex justify-center" style={{ marginTop: "4rem" }}>
          <p
            className="text-[#ababab]"
            style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
          >
            Already have an account?
            <a
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
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
