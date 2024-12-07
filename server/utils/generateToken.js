import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    // Ensure the user object has the necessary properties
    if (!user || !user._id) {
      return res.status(400).json({
        message: "User data is incomplete, cannot generate token.",
        success: false,
      });
    }

    // Generate the token with an expiration time
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d", // Token expires in 7 days
    });

    // Send the token as a secure, HttpOnly cookie
    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,  // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === "production",  // Cookie is sent only over HTTPS in production
        sameSite: "Strict",  // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message,
        user,
      });
  } catch (error) {
    console.error("Token Generation Error:", error);
    return res.status(500).json({
      message: "Internal Server Error during token generation.",
      success: false,
    });
  }
};
