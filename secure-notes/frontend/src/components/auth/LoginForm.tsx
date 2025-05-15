import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getThemeClasses } from "../../theme/themeConfig";
import { useAuth } from "../../context/AuthContext";

interface Props {
  theme: "dark" | "light";
}

const LoginForm: React.FC<Props> = ({ theme }) => {
  const classes = getThemeClasses(theme);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/notes");
    } catch (err: any) {
      const apiMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.response?.data?.error;
      setError(apiMsg || err.message || "Login failed");
    }
  };

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-lg ${classes.background} ${classes.borderGreen} ${classes.shadow}`}
    >
      <h2
        className={`${classes.textSizes.heading} ${classes.typography.fontSemibold} mb-4 text-center`}
      >
        Log In
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full ${classes.spacing.padding.small} ${classes.spacing.rounded.medium} ${classes.background} ${classes.text} focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full ${classes.spacing.padding.small} ${classes.borderGreen} ${classes.spacing.rounded.medium} bg-green-500 text-white ${classes.hover}`}
        >
          Log In
        </button>

        <p className="mt-2 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold underline hover:text-indigo-400"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
