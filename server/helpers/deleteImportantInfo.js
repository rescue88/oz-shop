const deleteImportantInfo = (user) => {
    delete user.hashed_password;
    delete user.salt;
    return user;
}

export default deleteImportantInfo;