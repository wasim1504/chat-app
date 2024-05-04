const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { connectRedis } = require("../../config/redis");
const connectredis = connectRedis();

const router = express.Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    await connectredis.set(
      user.id,
      token,
      "EX",
      process.env.TOKEN_EXPIRY_TIME,
      (err, reply) => {
        if (err) {
          console.error("Error setting key:", err);
        } else {
          console.log("Key set successfully:", reply);
        }
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/auth/:userId", async (req, res) => {
  const { userId } = req.params;
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      try {
        // Check if user data exists in Redis
        client.get(userId, async (redisErr, userData) => {
          if (redisErr) {
            console.error(redisErr);
            res.status(500).json({ error: "Internal Server Error" });
          }

          if (userData) {
            // If user data is found in Redis, delete user data from Redis and database
            const deletedUser = JSON.parse(userData);
            await User.destroy({ where: { id: userId } }); // Delete user from database
            await client.del(userId); // Delete user data from Redis
            res.status(200).json({
              message: "User deleted successfully",
              user: deletedUser,
            });
          } else {
            const user = await User.findByPk(userId);
            if (user) {
              await User.destroy({ where: { id: userId } });
              res
                .status(200)
                .json({ message: "User deleted successfully", user });
            } else {
              res.status(404).json({ error: "User not found" });
            }
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/auth/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
