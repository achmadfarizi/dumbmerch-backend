const {user} = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    // const data = req.body
    // our validation schema here
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
    });
  
    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);
  
    // if error exist send validation error message
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  
    if (userExist) {
      return res.status(400).send({
        status: 'failed',
        message: 'email has already taken'
      });
    }
  
    try {
      // code here
      // hashedPassword = req.body.password + salt 
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
  
      const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });

      const dataToken ={
        id: newUser.id
      }

      const secret_key = process.env.TOKEN_KEY

      const token = jwt.sign(dataToken, secret_key)
  
      res.status(200).send({
        status: "success...",
        data: {
          name: newUser.name,
          email: newUser.email,
          token
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Server Error",
      });
    }
};

exports.login = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(3).required(),
    });
  
    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);
  
    // if error exist send validation error message
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {
      const userExist = await user.findOne({
        where: {
          email: req.body.email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // code here
      const isValid = await bcrypt.compare(req.body.password, userExist.password)
  
      if (!isValid) {
        return res.status(400).send({
          status: "failed",
          message: "email or password doesnt match"
        });
      }

      const dataToken ={
        id: userExist.id
      }

      const secret_key = process.env.TOKEN_KEY

      const token = jwt.sign(dataToken, secret_key)
  
      res.status(200).send({
        status: "success...",
        data: {
          name: userExist.name,
          email: userExist.email,
          status: userExist.status,
          token
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Server Error",
      });
    }
};
  