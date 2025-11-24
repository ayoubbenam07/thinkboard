import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from "./middleware/rateLimter.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production")
    app.use(cors({origin: "http://localhost:5173"}))

app.use(rateLimiter)
app.use(express.json())

app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.use("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
}
)
