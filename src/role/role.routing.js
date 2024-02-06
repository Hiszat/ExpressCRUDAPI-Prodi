const express = require("express");
const { getAllRole, getRoleByID } = require("./role.controller");
const router  = express.Router();

router.get("/", async (req, res) => {
    try {
        const role = await getAllRole();
        res.send(role);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const role = await getRoleByID(id);
        res.send(role);
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

module.exports = router;