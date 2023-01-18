

const express = require("express")

const {NoteModel} = require("../models/Note.model")

const usersRouter = express.Router();


usersRouter.get("/", async (req, res) => {
    const users = await NoteModel.find()
    res.send(users)
})

usersRouter.post("/create", async (req, res) => {
    const payload = req.body
    //get token from header
    //verify token using jwt
    try{
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send({"msg" : "Note created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})

usersRouter.patch("/update/:noteID", async (req, res) => {
        const noteID = req.params.noteID
        const userID = req.body.userID
        const note = await NoteModel.findOne({_id:noteID})
        if(userID !== note.userID){
            res.send("Not authorised")
        }
        else{
            await NoteModel.findByIdAndUpdate({_id : noteID},payload)
            res.send({"msg" : "Note updated successfully"})
        }
})

usersRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    await NoteModel.findByIdAndDelete({_id : noteID})
    res.send({"msg" : "Note deleted successfully"})
})


module.exports = {usersRouter}


