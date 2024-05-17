// routes/index.js
import { Router } from "https://deno.land/x/opine@2.3.4/mod.ts";
import { createUser, home } from "../controllers/userController.js";

const router = Router();

router.post("/", createUser);
router.get("/", home)

export default router;
