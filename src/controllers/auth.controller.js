import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const { username, email, password, roles, fistname, lastname, fullname, photo } = req.body;
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      fistname,
      lastname,
      fullname,
      photo,
      password: await User.encryptPassword(password),
    });

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });
    

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });
    const isaccesos = {
      tokens: token,
      photo: userFound.photo,
      fullname: userFound.fullname,
      email: userFound.email,
  }
    res.json({ isaccesos });
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------VUE OUTH GOOGLE API--------------------------
export const googleAuthApi = async (req, res) => {
  try {
      // EL CUERPO DE CORREO O EL CUERPO DE USERNAME
      const userFound = await User.findOne({
          email: req.body.email
      }).populate(
          "roles"
      );
      //VERIFICAR sI EL USUARIO EXISTE EN BASE DE DATOS
      if (!userFound) return res.status(400).json({
          message: "User Not Found 1"
      });
     
      //OPTENERMOS EL ROL
      var toles = null
      const roles = await Role.find({
          _id: {
              $in: userFound.roles
          }
      });
      for (let i = 0; i < roles.length; i++) {
          toles = roles[0].name
      }

      const token = jwt.sign({
          id: userFound._id,
          role: toles,
      }, config.SECRET, {
          expiresIn: '5d', // 24 hours
      });

      if(!userFound.modalidad){
          userFound.modalidad= 'none';
      }

      //REGISTRO INICIO DE SECCION
      const isaccesos = {
        tokens: token,
        photo: userFound.photo,
        fullname: userFound.fullname,
        email: userFound.email,
      }
      res.status(200).json({
          isaccesos
      });


  } catch (error) {
      console.log(error);
  }
};


