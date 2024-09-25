const { createUserService, signInService, verifyToken, isAdminService } = require('../services/user-service.js');


const create = async (req, res) => {
    try{
        const user = await createUserService(req.body);
        return res.status(201).json({
            data: user,
            success: true,
            message: "successfully fetched the flights",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            messaage: "Not able to fetch the flights",
            err: error
        })
    }
}
const signIn = async (req, res) => {
    try{
        const jwtToken = await signInService(req.body.email, req.body.password);
        return res.status(201).json({
            data: jwtToken,
            success: true,
            message: "successfully fetched the flights",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            messaage: "Not able to SignIn",
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try{
        const token = req.headders['x-access-token'];
        const isVerified = verifyToken(token);
    } catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            messaage: "Not able to Authenticate",
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try{
        const response = await isAdminService(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Fetched authorization details',
            error: {}
        })
    } catch(error){
        return res.status(500).json({
            data: {},
            success: false,
            messaage: "Not able to Authorize",
            err: error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}