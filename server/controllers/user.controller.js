import User from './../models/User.model';
import { extend } from 'lodash';
import errorHandler from './../helpers/dbErrorHandler.js';
import deleteImportantInfo from './../helpers/deleteImportantInfo.js';

const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        });
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

// find user by id(if looking for update/delete)
const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if(!user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    } catch(err) {
        return res.status(400).json({
            error: "Could not retreive user"
        });
    }
}

const read = (req, res) => {
    let user = deleteImportantInfo(req.profile);
    return res.status(200).json(user);
}

const update = async (req, res) => {
    try {
        let user = deleteImportantInfo(req.profile);
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        return res.status(200).json(user); 
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser = deleteImportantInfo(deletedUser);
        return res.status(200).json(deletedUser);
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export {
    create,
    userById,
    read,
    update,
    remove
}