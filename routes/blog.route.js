import express from "express";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  updateBlog,

} from "../controllers/blog.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/blogs",authorization, getBlogs);
router.post("/blogs", authorization, addBlog);
router.patch("/blogs/:id", authorization, updateBlog);
router.delete("/blogs/:id", authorization, deleteBlog);

export default router;
