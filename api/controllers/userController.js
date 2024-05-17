// controllers/userController.js

import getAllUsers from "../models/denoKV.js"; // Adjusted import syntax

const kv = await Deno.openKv("https://api.deno.com/databases/f9dd4231-d182-4f9b-89a2-db53b4765526/connect");

async function createUser(req, res) {
  try {
    console.log("Received request body:", req.body); // Debug log
    const { name, gender, experience } = req.body;

    if (!name || !gender || !experience) {
      res.setStatus(400).json({ error: "Missing fields" });
      return;
    }

    const user = { name, gender, experience: Number(experience) };
    await kv.set(["users", name], user);
    const users = await getAllUsers();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(users));
  } catch (error) {
    console.error("Error:", error);
    res.setStatus(500).json({ error: "Internal Server Error" });
  }
}


const home = async (req, res, next) => {
  const fetchedUsers = [];
  for await (const entry of kv.list({ prefix: ["users"] })) {
    fetchedUsers.push(entry.value);
  }
  return res.send(fetchedUsers);

}

export { createUser, getAllUsers, home };
