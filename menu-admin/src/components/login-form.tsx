import { useState, type SubmitEvent } from "react";
import { login } from "@/api";

interface LoginFormProps {
  restaurantId: number;
  onLoginSuccess: () => void;
}

const LoginForm = ({ restaurantId, onLoginSuccess }: LoginFormProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(restaurantId, password);
      alert("Login successful!");
      onLoginSuccess();
    } catch (error) {
      setError("Failed to login");
    }
  };

  return (
    <form
      className="flex w-full max-w-96 flex-col gap-3 rounded-lg border border-gray-300 p-4 shadow-sm"
      onSubmit={handleLogin}
    >
      <h2 className="!mb-5">Restaurant login</h2>

      <div className="mb-6">
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          autoComplete="current-password"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-purple-200"
          id="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
          type="password"
          value={password}
        />
      </div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <button
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700 focus:ring-2 focus:ring-purple-200"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
