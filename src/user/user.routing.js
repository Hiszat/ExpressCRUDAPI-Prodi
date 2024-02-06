const express = require("express");
const router  = express.Router();
const { getAllUser, getUserByID, registerUser, loginUser} = require("./user.controller");

router.get("/", async (req, res) => {
    try {
        const user = await getAllUser();
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await getUserByID(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

router.post("/login", async (req, res) => {
    try {
        const dataUser = req.body;
        const user = await loginUser(dataUser);
        res.status(201).send({
            data: user,
            msg: "Data berhasil dimasukkan"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/register", async (req, res) => {
    try {
        const dataUser = req.body;
        const user = await registerUser(dataUser);
        res.status(201).send({
            data: user,
            msg: "Data berhasil dimasukkan"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// router.delete("/:id", async (req,res) => {
//     try {
//         const prodiID = req.params.id
//         await deleteProdibyID(prodiID);
//         res.send({msg: "Data berhasil dihapus"});
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
    
// })

// router.patch("/:id", async (req,res) => {
//     try {
//         const prodiID = parseInt(req.params.id);
//         const prodiData = req.body;

//         if(prodiData.jurusan !== null){
//             const prodi = await editProdiByID(prodiID, prodiData);
//             res.send({
//                 data: prodi, 
//                 msg: "Data berhasil diubah"
//             });
//         }else{
//             res.status(400).send("Kesalahan: Jurusan tidak boleh kosong (lu mau ngisi apa jir kalau jurusan nya kosong)");
//         }
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
    
// })


module.exports = router;