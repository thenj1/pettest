const {  NotFoundError, BadRequestError, ConflictError, UnauthorizedError} = require('../utils/error')
const userRepo = require('./userrepo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const FindAllUsers = async () => {
    const users = await userRepo.findAll();

    if( !users || users.length === 0 ){
        throw new NotFoundError("Nenhum usuário cadastrado");
    
    }

    return users;
}

const FindUserById = async (id) => {
    const user = await userRepo.findById(id);

    if( !user ){
        throw new NotFoundError("Usuário não existe");
    }
    
    return user;
}

const FindUserByData = async (filter) => {
    const user = await userRepo.findOne(filter);

    if( !user ){
        throw new NotFoundError("Usuário não existe");
    }

    return user;
}

const CreateNewUser = async (data) => {
    const { email, name, password, type } = data;
    const userDuplicated = await userRepo.findOne({email});

    if (userDuplicated){
        throw new ConflictError("Usuário já existe");
    }
    const passwordCrypted = await bcrypt.hash( password, 10 )
    const user = await userRepo.createUser({
        email,
        name,
        password : passwordCrypted,
        type
    });

    const userResponse = {...user};
    delete userResponse.password;

    return userResponse;

}

const UpdateOneUser = async (id, data) =>{
    const { email , name , password} = data;
    const user = await userRepo.findById(id);
    if( !user ){
        throw new NotFoundError("Usuário não existe");
    }

    let passwordNew = user.password;
    if (password) {
        passwordNew = await bcrypt.hash(password, 10);
    }
    
    const userUpdated = await userRepo.updateUser(id,
        {
            email : email || user.email,
            name : name || user.name,
            password : passwordNew
        }
    );
    return userUpdated;
}

const login = async (data) => {
    const { email, password} = data;
    if (!email || !password ){
        throw new BadRequestError("E-mail e senhas são necessários");
    }

    const userFound = await userRepo.findOne({email});
    if ( !userFound ){
        throw new NotFoundError("E-mail não cadastrado");
    }

    const passwordCorrect = await bcrypt.compare(password, userFound.password);
    if( !passwordCorrect ){
        throw new UnauthorizedError("E-mail ou senha incorreto")
    }

    const token = jwt.sign(
        {
        id : userFound.id,
        name : userFound.name,
        type : userFound.type
        },
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
    )

    const userReturn = {...userFound}
    delete userFound.password;
    return {token, user : userReturn};
}

module.exports = {
    FindAllUsers,
    FindUserById,
    FindUserByData,
    CreateNewUser,
    UpdateOneUser,
    login
}