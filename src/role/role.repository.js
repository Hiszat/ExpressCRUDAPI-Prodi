const prisma = require("../db");


const findAllRole = async () => {
    const role = await prisma.role.findMany();
    return role;
}


const findRoleByID = async (id) => {
    const role = await prisma.role.findUnique({
        where: {
            role_id: id
        }
    })

    return role;
}

module.exports = {
    findAllRole,
    findRoleByID,
}