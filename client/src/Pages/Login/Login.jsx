import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { API_BASE_URL } from "../../Auth/config";
// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= EMAIL LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      navigate("/check-compensation");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
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
  

  /* ================= FACEBOOK LOGIN ================= */
  const handleFacebookLogin = () => {
    window.FB.login(
      async (response) => {
        if (!response.authResponse) return;

        window.FB.api(
          "/me",
          { fields: "name,email,picture" },
          async (user) => {
            const res = await fetch(
              "http://localhost:8080/api/v1/auth/facebook",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: user.name,
                  email: user.email,
                  photoUrl: user.picture.data.url,
                  facebookId: user.id,
                }),
              }
            );

            const data = await res.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("auth-change"));
            navigate("/check-compensation");
          }
        );
      },
      { scope: "email" }
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 mt-20">

        <h1 className="text-3xl font-extrabold text-center mb-6">
          Welcome Back
        </h1>

        {/* GOOGLE */}
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
             hover:bg-gray-50 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          <FaGoogle onSuccess={handleGoogleSuccess} onError={() => setError("Google Login Failed")} className="text-red-600 text-lg"  />
          <img class="w-6 h-6" onSuccess={handleGoogleSuccess} onError={() => setError("Google Login Failed")} src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          Login with Google
        </button> */}

        {/* FACEBOOK */}
        {/* <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full border hover:bg-gray-50"
        >
          <FaFacebook className="text-blue-600" />
          Login with Facebook
        </button> */}

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-full border"
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          No account?{" "}
          <Link to="/signup" className="text-orange-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
