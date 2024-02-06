const { findAllUser, findUserByID, createUser, delUser, updateUser, findUserByUsernameEmail } = require("./user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getAllUser = async () => {
    const users = await findAllUser();
    if (users.length === 0) {
        throw new Error("Tidak ada data user yang ditemukan");
    }
    return users;

}

const getUserByID = async (id) => {
    const user = await findUserByID(id);
    if(!user){
        throw Error("Data not found");
    }
    return user;
}

const registerUser = async (dataUser) => {
    const {username, email, password} = dataUser;
    const saltRounds = 10;
    const bcryptsalt = bcrypt.genSaltSync(saltRounds);
    const salt = genRandonString(4);
    const addedpassword = salt + password + salt;
    const passwordGen = bcrypt.hashSync(addedpassword, bcryptsalt);
    const userData = {
        username,
        salt,
        email,
        passwordGen
    }
    const users = await createUser(userData);
    return users;
}

const loginUser = async (dataUser) => {
    const {username, email, password} = dataUser;
    const dataUser2 = await findUserByUsernameEmail(username,email);
    const {user_id: id, salt, password: hash, email: email2, username: username2} = dataUser2;
    const addedpassword = salt + password + salt;
    const isValidPassword = await bcrypt.compare(addedpassword, hash);
    if(isValidPassword){
        const userData = {
            last_login: new Date().toISOString(),
        }
        await updateUser(id, userData);
        const payLoad = {
            id: id,
            username: username2,
            email: email2,
        }
        const secret = process.env.RAHASIA;
        const expiresIn = 60*60*24;
        const token = jwt.sign(payLoad, secret, {expiresIn : expiresIn});
        const respond = {
            data_user: {
                payLoad
            },
            token:token
        }
        return respond;
    }

}


const deleteUserbyID = async (id) => {
    const userID = Number(id);
    await getUserByID(userID);
    await delUser(userID);
}

const editUserByID = async (id, userData) => {
    await getUserByID(id);
    const {jurusan} = userData;

    const user = await updateUser(id, jurusan);
    return user;

}
function genRandonString(length) {
    if (length < 4) {
        throw new Error('Length should be greater than 4');
    }

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const randomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));

    const hasRequiredChars = {
        lowercase: false,
        uppercase: false,
        digit: false,
        symbol: false,
    };

    let result = '';

    while (result.length < length) {
        const char = randomChar();

        if (!hasRequiredChars.lowercase && /[a-z]/.test(char)) {
            hasRequiredChars.lowercase = true;
        } else if (!hasRequiredChars.uppercase && /[A-Z]/.test(char)) {
            hasRequiredChars.uppercase = true;
        } else if (!hasRequiredChars.digit && /\d/.test(char)) {
            hasRequiredChars.digit = true;
        } else if (!hasRequiredChars.symbol && /[!@$]/.test(char)) {
            hasRequiredChars.symbol = true;
        }

        result += char;
    }

    // Ensure that all character types are present
    if (!(hasRequiredChars.lowercase && hasRequiredChars.uppercase && hasRequiredChars.digit && hasRequiredChars.symbol)) {
        // If any type is missing, generate a new string
        return genRandonString(length);
    }

    return result;
}




module.exports = {
    getAllUser,
    getUserByID,
    registerUser,
    deleteUserbyID,
    editUserByID,
    loginUser
}