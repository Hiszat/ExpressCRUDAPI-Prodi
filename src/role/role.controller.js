const { findRoleByID, findAllRole} = require("./role.repository");

const getAllRole = async () => {
    const role = await findAllRole();
    if (role.length === 0) {
        throw new Error("Tidak ada data role yang ditemukan");
    }
    return role;

}

const getRoleByID = async (id) => {
    const role = await findRoleByID(id);
    if(!role){
        throw Error("Data not found");
    }
    return role;
}

module.exports = {
    getAllRole,
    getRoleByID
}