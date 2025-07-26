const express = require('express');
const router = express.Router();

//Multer is used for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()});

const uploadFile = require('../service/storageService.js');

const songModel = require("../models/songModel.js");

//"upload.single("audio")" is used to specify that we are expecting a single file upload with the field name "audio".
router.post('/songs',upload.single("audio"),async (req,res)=>{
    console.log(req.body);
    console.log(req.file)
    const fileData  = await uploadFile(req.file);

    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })
    
    res.status(201).json({
        message: 'Song created successfully',
        song: song
    });
    
})

router.get('/songs',async(req,res)=>{
    const {mood} = req.query; /* mood = sad */

    const songs = await songModel.find({
        mood: mood
    })

    res.status(200).json({
        message:"Songs fetched successfully",
        songs
    })
    
})



module.exports = router;
