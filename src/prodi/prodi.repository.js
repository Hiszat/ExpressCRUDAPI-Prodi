const prisma = require("../db");


const findAllProdi = async () => {
    const prodi = await prisma.prodi.findMany();

    return prodi;
}


const findProdiByID = async (id) => {
    const prodi = await prisma.prodi.findUnique({
        where: {
            prodi_id: id
        }
    })

    return prodi;
}

const createPrody = async (id, jurusan) => {
    const prodi = await prisma.prodi.create({
        data: {
            prodi_id: id,
            jurusan
        }
    })

    return prodi
}

const delProdi = async (id) => {
    const prodi = await prisma.prodi.delete({
        where: {
            prodi_id: id
        }
    })

    return prodi
}

const updateProdi = async (id, jurusan) => {
    const prodi = await prisma.prodi.update({
        where: {
            prodi_id: id,
        },
        data: {
            jurusan
        }
    })

    return prodi
}

module.exports = {
    findAllProdi,
    findProdiByID,
    createPrody,
    updateProdi,
    delProdi
}