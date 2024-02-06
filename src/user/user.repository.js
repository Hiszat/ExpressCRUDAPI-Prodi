const prisma = require("../db");
const moment = require('moment-timezone');
const currentUtcTimestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" });
const currentLocalTimestamp = moment(currentUtcTimestamp).tz("Asia/Jakarta").format();

console.log(currentLocalTimestamp);


const findAllUser = async () => {
    const users = await prisma.users.findMany();
    return users;
}


const findUserByID = async (id) => {
    const user = await prisma.users.findUnique({
        where: {
            user_id: id
        }
    })

    return user;
}

const findUserByUsernameEmail = async (username,email) => {
    const user = await prisma.users.findFirst({
        where: {
            OR:[
                {
                    username: username
                },
                {
                    email: email
                }
            ]
            
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            password: true,
            salt: true
        }
    });

    return user;
};


const createUser = async (userData) => {
    const {username, passwordGen, salt, email} = userData;
    const users = await prisma.users.create({
        data: {
            username,
            password: passwordGen,
            salt,
            email,
            role_id: 11
        }
    })

    return users
}

const delUser = async (id) => {
    const users = await prisma.users.delete({
        where: {
            user_id: id
        }
    })

    return users
}

const updateUser = async (id, user) => {
    const {last_login} = user;
    const latestUpdate = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    const users = await prisma.users.update({
        where: {
            user_id: id,
        },
        data: {
            last_login,
            update_at: latestUpdate
        }
    })

    return users
}

module.exports = {
    findAllUser,
    findUserByID,
    createUser,
    updateUser,
    delUser,
    findUserByUsernameEmail
}