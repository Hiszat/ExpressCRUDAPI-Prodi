const express = require("express");
const router  = express.Router();
const { getAllProdi, getProdiByID, createdProdi, deleteProdibyID, editProdiByID } = require("./prodi.controller");

router.get("/", async (req, res) => {
    try {
        const prodi = await getAllProdi();
        res.send(prodi);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const prodi = await getProdiByID(id);
        res.send(prodi);
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

router.post("/", async (req, res) => {
    try {
        const dataProdi = req.body;
        const prodi = await createdProdi(dataProdi);
        res.status(201).send({
            data: prodi,
            msg: "Data berhasil dimasukkan"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const prodiID = req.params.id
        await deleteProdibyID(prodiID);
        res.send({msg: "Data berhasil dihapus"});
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

router.patch("/:id", async (req,res) => {
    try {
        const prodiID = parseInt(req.params.id);
        const prodiData = req.body;

        if(prodiData.jurusan !== null){
            const prodi = await editProdiByID(prodiID, prodiData);
            res.send({
                data: prodi, 
                msg: "Data berhasil diubah"
            });
        }else{
            res.status(400).send("Kesalahan: Jurusan tidak boleh kosong (lu mau ngisi apa jir kalau jurusan nya kosong)");
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})


module.exports = router;