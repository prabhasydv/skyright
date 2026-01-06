import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { API_BASE_URL } from "../../Auth/config";



const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // ✅ Redirect to login after success
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: credentialResponse.credential, // ✅ SEND RAW ID TOKEN
          }),
        }
      );
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || "Google login failed");
        return;
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      navigate("/check-compensation");
    } catch {
      setError("Google authentication failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 mt-20 pt-10 mb-10">

        {/* HEADER */}
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">
            Start your flight compensation claim
          </p>
        </div>

        {/* SOCIAL SIGNUP */}
        {/* <div className="grid grid-cols-2 gap-4 mb-6"> */}
        {/* <div className="mb-4 flex justify-center">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google Login Failed")} />
                </div> */}

          {/* GOOGLE LOGIN */}
<div className="mb-4">
  <div className="relative">
    {/* Hidden Google Button */}
    <div className="absolute inset-0 opacity-0">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setError("Google Login Failed")}
      />
    </div>

    {/* Custom UI Button */}
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-gray-300 bg-white
                 hover:bg-gray-50 hover:shadow-md transition-all duration-200
                 active:scale-[0.98]"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-sm font-semibold text-gray-700">
        Continue with Google
      </span>
    </button>
  </div>
</div>


                {/* <button
          onSuccess={handleGoogleSuccess} onError={() => setError("Google Login Failed")}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-gray-200 bg-white 
             hover:bg-gray-50 hover:shadow-md transition-all duration-200 active:scale-[0.98] mb-6"
        >

          <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          Login with Google
        </button> */}
          {/* <FaGoogle className="text-red-600 text-lg" /> */}


{/* <FacebookLogin
  appId="YOUR_FACEBOOK_APP_ID"
  fields="name,email"
  callback={async (res) => {
    const apiRes = await fetch(
      "http://localhost:8080/api/v1/auth/facebook",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: res.accessToken }),
      }
    );

    const data = await apiRes.json();
    localStorage.setItem("token", data.token);
    navigate("/");
  }}
/> */}
        {/* </div> */}

        {/* DIVIDER */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-sm text-gray-400">or sign up with email</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-2">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-2">
              <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* TERMS */}
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms & Privacy Policy.
          </p>

          {/* SIGNUP BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg hover:scale-105 transition shadow-lg disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
