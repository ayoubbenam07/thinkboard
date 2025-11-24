import express from "express"
import {getAllNotes, getNoteById, postNotes, putNotes, deleteNotes} from "../controllers/notesControllers.js"

const router = express.Router()

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", postNotes)
router.put("/:id", putNotes)
router.delete("/:id", deleteNotes)

export default router