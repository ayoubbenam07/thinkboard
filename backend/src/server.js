import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from "./middleware/rateLimter.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({origin: "http://localhost:5173"}))
app.use(rateLimiter)
app.use(express.json())

app.use("/api/notes", notesRoutes)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
}
)
