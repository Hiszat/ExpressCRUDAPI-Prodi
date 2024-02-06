const { findProdiByID, findAllProdi, delProdi, updateProdi, createPrody } = require("./prodi.repository");

const getAllProdi = async () => {
    const prodi = await findAllProdi();
    if (prodi.length === 0) {
        throw new Error("Tidak ada data prodi yang ditemukan");
    }
    return prodi;

}

const getProdiByID = async (id) => {
    const prodi = await findProdiByID(id);
    if(!prodi){
        throw Error("Data not found");
    }
    return prodi;
}

const createdProdi = async (dataProdi) => {
    const {id, jurusan} = dataProdi;
    if (isNaN(id)) {
        return res.status(400).send("ID harus berupa angka");
    }
    if (jurusan === null) {
        return res.status(400).send("Ada data yang kosong, harap isi terlebih dahulu!");
    }
    const prodi = await createPrody(+id, jurusan);
    return prodi;
}

const deleteProdibyID = async (id) => {
    const prodiID = Number(id);
    await getProdiByID(prodiID);
    await delProdi(prodiID);
}

const editProdiByID = async (id, prodiData) => {
    await getProdiByID(id);
    const {jurusan} = prodiData;

    const prodi = await updateProdi(id, jurusan);
    return prodi;

}

module.exports = {
    getAllProdi,
    getProdiByID,
    createdProdi,
    deleteProdibyID,
    editProdiByID
}