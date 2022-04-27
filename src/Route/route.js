const express = require('express');
const router = express.Router();

const AuthorController= require("../Controllers/newAuthorController")
const BlogController= require("../Controllers/newBlogController")

router.post("/authors", AuthorController.createAuthor)
router.post("/blog", BlogController.createBlog)
 router.get("/blogs", BlogController.getBlog)
router.put("/blogs/:blogId", BlogController.updateDetails)
router.delete("/blogs/:blogId", BlogController.deleteBlogById)
router.delete("/blogss", BlogController.deleteBlogByQuery)







module.exports= router;