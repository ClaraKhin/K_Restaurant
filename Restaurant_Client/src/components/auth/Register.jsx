import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-[#ababab]"
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
            }}
          >
            Employee Name
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
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
            Employee Phone
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
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
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
            Choose Your Role
          </label>

          <div
            className="flex items-center gap-3 "
            style={{ marginTop: "1rem" }}
          >
            {["Waiter", "Cashier", "Admin"].map((role) => {
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelection(role)}
                  className="cursor-pointer"
                  style={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                    backgroundColor: ` ${
                      formData.role === role ? "#3730A3" : "#1f1f1f"
                    }`,
                    width: "100%",
                    borderRadius: "0.5rem",
                    color: `${formData.role === role ? "#ffffff" : "#ababab"}`,
                  }}
                >
                  {role}
                </button>
              );
            })}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
