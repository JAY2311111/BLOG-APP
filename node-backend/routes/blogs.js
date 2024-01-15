const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require('fs');

const multer = require("multer");
const Blog = require('../models/blog');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })


// Create a Signin Route
router.post('/create-blog',upload.single("blog-image"), async (req, res, next) => {
  const {title, content} = req.body;

  try {
    const blog = await Blog.create({title,content,createdBy : req.user._id,blogImage : `/uploads/${req.file.filename}` })

    return res.status(200).json({ success: true, msg: "Blog Created Successfully" , user : req.user , blogId: blog._id })
  } catch (error) {
    console.log(error)
  
    return res.status(500).json({ success: false, msg: "Server Error" })
  }


});

router.get('/all', async (req, res, next) => {
 
  try {
    const allBlogs = await Blog.find({}).populate('createdBy', 'fullName').sort({createdAt: -1});

    return res.status(200).json({ success: true,  allBlogs , user : req.user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, msg: "Server Error" })
  }


});



router.get('/all/:id', async (req, res, next) => {
 
  try {
    const allBlogs = await Blog.find({createdBy : req.params.id}).populate('createdBy', 'fullName').sort({createdAt: -1});

    return res.status(200).json({ success: true,  allBlogs})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, msg: "Server Error" })
  }


});



// Update route


router.put('/update/:id', upload.single("blog-image"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }
    let updateData = req.body;
    if (req.file) {
      if (blog.blogImage) {
        // Delete the old image
        fs.unlinkSync(path.resolve(`./public${blog.blogImage}`));
      }
      updateData.blogImage = `/uploads/${req.file.filename}`;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
     res.status(200).json({ success: true, msg: "Blog Updated Successfully" })
  } catch (error) {
     res.status(500).json({ success: false, msg: "Server Error" })
  }
});


router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('createdBy', 'fullName');

     res.status(200).json({ success: true, blog})
  } catch (error) {
     res.status(500).json({ success: false, msg: "Server Error" })
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    if (blog.blogImage) {
      // Delete the associated image
      fs.unlinkSync(path.resolve(`./public${blog.blogImage}`));
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});






module.exports = router;
