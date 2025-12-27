import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        backgroundColor: "#025cca",
        padding: "0.5rem",
        width: "3rem",
        fontSize: "1.25rem",
        fontWeight: 700,
        borderRadius: "9999px",
        cursor: "pointer",
        color: "#FFFFFF",
      }}
    >
      <ArrowLeftOutlined />
    </button>
  );
};
export default BackButton;
