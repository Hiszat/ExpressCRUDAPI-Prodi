const express = require("express");
const dotenv = require("dotenv");
const app = express();
const jwt = require("jsonwebtoken");

dotenv.config();

const PORT = process.env.PORT;

const accessValidation = (req, res, next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            message: "Token diperlukan"
        })
    }
    const token = authorization.split(' ')[1];
    const secret = process.env.RAHASIA;
    try {
        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;
        console.log(jwtDecode);
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorize"
        })
    }
    next();
}



app.use(express.json());
app.get("/api", (req, res) => {
    res.send("SUDAH JADI HAHAHAHA");
})
const prodi = require("./prodi/prodi.routing");
app.use("/prodi", prodi);
const role = require("./role/role.routing");
app.use("/role", accessValidation, role);
const user = require("./user/user.routing");
app.use("/user", user);


app.listen(PORT, () =>{
    console.log("API sudah berjalan di PORT " + PORT);  
})