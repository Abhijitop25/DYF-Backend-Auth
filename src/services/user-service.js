const { createUser, getUserByEmail, isAdmin } = require('../repository/user-repository.js');
const { JWT_KEY } = require('../config/serverConfig.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUserService = async (data) => {
    try{
        const user = await createUser(data);
        return user;
    } catch(error) {
        console.log('service layer error');
        throw error;
    }
}

const createToken = (user) => {
    try{
        const token = jwt.sign(user, JWT_KEY, { expiresIn: '1d' })
        return token;
    } catch(error){
        console.log('somthing went wrong while creating token');
        throw error;
    }
}
const verifyToken = (token) => {
    try{
        const response = jwt.verify(token, JWT_KEY);
        return response;
    } catch(error){
        console.log('Somthing went wrong while verifying token')
    }
}
const checkPassword = (userInputPlainPassword, encryptedPassword) => {
    try{
        return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error){
        console.log('Error in password matching');
        throw error;
    }
}
const signInService = async (email, plainPassword) => {
    try{
        const user = await getUserByEmail(email);

        const passwordMatch = checkPassword(plainPassword, user.password);

        if(!passwordMatch){
            console.log('Password does not match');
            throw { error: 'Incorrect Password'};
        }

        const jwtToken = createToken({ email: user.email, password: user.password });

        return jwtToken;
    } catch(error){
        console.log('somthing went wrong in singin process');
        throw error;
    }
}

const isAdminService = async (userId) => {
    try{
        return await isAdmin(userId);
    } catch(error){
        console.log('error in service layer');
        throw error;
    }
}
module.exports = {
    createUserService,
    createToken,
    verifyToken,
    checkPassword,
    signInService,
    isAdminService
}