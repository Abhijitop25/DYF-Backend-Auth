const { User, Role } = require('../models/index');


const createUser = async (data) => {
    try{
        const user = await User.create(data);
        return user;
    } catch(error){
        console.log('Repository layer error');
        throw error;
    }
}
const getUserByEmail = async (userEmail) => {
    try{
        const user = await User.findOne({where: {
            email: userEmail
        }})
        return user;
    } catch(error){
        console.log('Repository layer error');
        throw error;
    }
}
const isAdmin = async (userId) => {
    try{
        const user = await User.findByPk(userId);
        const adminRole = await Role.findOne({
            where:{
                name: 'ADMIN'
            }
        });
        return user.hasRole(adminRole);

    } catch(error){
        console.log('error is repository layer');
        throw error;
    }
}
module.exports = {
    createUser,
    getUserByEmail,
    isAdmin
}