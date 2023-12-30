const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("SUDAH JADI HAHAHAHA");
})

const prodi = require("./prodi/prodi.controller");
app.use("/prodi", prodi);


// app.get("/prodi", async (req, res) => {
//     const prodi = await prisma.prodi.findMany();
//     res.send(prodi);
// })


app.listen(PORT, () =>{
    console.log("API sudah berjalan di PORT " + PORT);  
})