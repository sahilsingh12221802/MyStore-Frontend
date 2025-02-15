// src/pages/SigninSignup.jsx
import  { useState } from "react";
import AuthForm from "../components/AuthForm";
import authApi from "../api/auth";

const SigninSignup = ({ onSignIn }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isSignup) {
        await authApi.register(formData);
        alert("Signup successful! Please sign in.");
        setIsSignup(false);
      } else {
        await authApi.login(formData.email, formData.password);
        alert("Signin successful!");
        onSignIn();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </h1>
        <AuthForm
          isSignup={isSignup}
          toggleForm={toggleForm}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SigninSignup;