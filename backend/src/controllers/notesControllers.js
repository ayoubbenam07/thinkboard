import Note from "../models/Note.js"

export async function getAllNotes(_,res) {
    try{
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    }
    catch(e){
        console.error("Error in getAllNotes controller", e)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id)
        if(!note)
            return res.status(200).json(note)
        res.status(200).json(note)
    } catch (e) {
        console.error("Error in getNotes controller", e)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function postNotes(req,res) {
    try {
        const {title, content} = req.body
        const newNote = new Note({title, content})
        await newNote.save()
        res.status(201).json({message: "Note created successfully"})
    } catch (e) {
        console.error("Error in postNotes controller", e)
        res.status(500).json({message: "Internal server error"})
    }
} 

export async function putNotes(req,res) {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content})
        if(!updatedNote)
            return res.status(404).json({message: "Note not found"})
        return res.status(200).json({message: "Note updated successfully"})
    } catch (e) {
        console.error("Error in putNotes controller", e)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteNotes(req,res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote)
            return res.status(404).json({message: "Note not found"})
        return res.status(200).json({message: "Note deleted successfully"})
    } catch (e) {
        console.error("Error in deleteNotes controller", e)
        res.status(500).json({message: "Internal server error"})
    }
    
}