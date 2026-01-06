import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ CREATE JWT TOKEN (STANDARDIZED)
    const token = jwt.sign(
      {
        id: user._id,       // ✅ use ONE key consistently
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }
  };


  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  export const googleAuth = async (req, res) => {
    try {
      const { token } = req.body;
  
      if (!token) {
        return res.status(400).json({ message: "Google token missing" });
      }
  
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
  
      const {
        email,
        name,
        picture,
        sub: googleId,
      } = payload;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          name,
          email,
          photoUrl: picture,
          password: googleId, // dummy password
        });
      }
  
      const jwtToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.json({
        token: jwtToken,
        user,
      });
    } catch (err) {
      console.error("GOOGLE AUTH ERROR:", err);
      res.status(401).json({ message: "Google authentication failed" });
    }
  };
  
  export const facebookAuth = async (req, res) => {
    try {
      const { accessToken } = req.body;
  
      const fbRes = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
      );
  
      const { id, name, email } = fbRes.data;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          name,
          email,
          provider: "facebook",
          providerId: id,
        });
      }
  
      const jwtToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.json({ token: jwtToken, user });
    } catch (err) {
      res.status(401).json({ message: "Facebook authentication failed" });
    }
  };
  