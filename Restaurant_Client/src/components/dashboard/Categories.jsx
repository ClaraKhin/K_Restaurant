import { useState } from "react";
import { motion } from "framer-motion";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, addCategory } from "../../https";
import { enqueueSnackbar } from "notistack";

const Categories = ({ setCategoryModalOpen }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const queryClient = useQueryClient();

  const {
    data: resData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  const categories = Array.isArray(resData?.data?.data)
    ? resData.data.data
    : [];

  const mutation = useMutation({
    mutationFn: (payload) => addCategory(payload),
    onSuccess: (res) => {
      const message = res?.data?.message || "Category added!";
      enqueueSnackbar(message, { variant: "success" });
      setCategoryModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to add category";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.name.trim()) {
      enqueueSnackbar("Category name is required", { variant: "error" });
      return;
    }
    mutation.mutate(form);
  };

  const handleClose = () => setCategoryModalOpen(false);

  return (
    <div
      className="flex items-center justify-center z-50"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.72)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="w-full max-w-md rounded-lg bg-[#3A322E]"
        style={{ padding: "1.5rem", marginLeft: "1rem", marginRight: "1rem" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "1rem" }}
        >
          <h2
            className="text-[#f5f5f5]"
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              lineHeight: "1.75rem",
            }}
          >
            Categories
          </h2>
          <button
            onClick={handleClose}
            style={{ cursor: "pointer", color: "#f5f5f5" }}
          >
            <CloseCircleOutlined style={{ fontSize: "1.5rem" }} />
          </button>
        </div>

        {/* <div
          style={{
            marginBottom: "1rem",
            maxHeight: "160px",
            overflowY: "auto",
          }}
        >
          {isLoading ? (
            <div className="text-[#ababab]">Loading categories...</div>
          ) : isError ? (
            <div className="text-[#ababab]">Failed to load categories.</div>
          ) : categories.length === 0 ? (
            <div className="text-[#ababab]">No categories found.</div>
          ) : (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {categories.map((c) => (
                <li
                  key={c._id}
                  style={{
                    padding: "0.35rem 0",
                    color: "#f5f5f5",
                    fontWeight: 600,
                  }}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div> */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{ marginTop: "0.5rem" }}
        >
          <div>
            <label
              className="block text-[#ababab]"
              style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}
            >
              Name
            </label>
            <div
              className="flex items-center rounded-lg bg-[#1D1716]"
              style={{ padding: "0.75rem 1rem" }}
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="focus:outline-none"
                style={{ flex: 1, color: "#ffffff" }}
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-[#ababab]"
              style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}
            >
              Description (optional)
            </label>
            <div
              className="flex items-center rounded-lg bg-[#1D1716]"
              style={{ padding: "0.75rem 1rem" }}
            >
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="focus:outline-none"
                style={{ flex: 1, color: "#ffffff" }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#FACC15",
              width: "100%",
              marginTop: "0.5rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              fontSize: "1.125rem",
              color: "#111827",
              fontWeight: 700,
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Add Category
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Categories;
