import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-[#ababab]"
            style={{
              marginBottom: "0.5rem",
              marginTop: "1rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
            }}
          >
            Employee Email
          </label>
          <div
            className="flex items-center rounded-lg bg-[#1f1f1f]"
            style={{
              paddingTop: "1.25rem",
              paddingBottom: "1.25rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="focus:outline-none"
              style={{ flex: 1, color: "#ffffff" }}
              required
            />
          </div>
        </div>

        <div>
          <label
            className="block text-[#ababab]"
            style={{
              marginBottom: "0.5rem",
              marginTop: "1rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
            }}
          >
            Employee Password
          </label>
          <div
            className="flex items-center rounded-lg bg-[#1f1f1f]"
            style={{
              paddingTop: "1.25rem",
              paddingBottom: "1.25rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="focus:outline-none"
              style={{ flex: 1, color: "#ffffff" }}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#FACC15",
            width: "100%",
            marginTop: "1.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            fontSize: "1.125rem",
            color: "#111827",
            fontWeight: 700,
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
