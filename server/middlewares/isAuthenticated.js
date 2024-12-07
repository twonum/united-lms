import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated. Token is missing.",
        success: false,
      });
    }

    // Verify the token with proper error handling
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.id = decode.userId; // Attach userId to the request object
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({
      message: "Internal Server Error during authentication.",
      success: false,
    });
  }
};

export default isAuthenticated;
