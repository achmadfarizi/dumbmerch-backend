//create db variabel and get database connection 
//get querytypes from sequelize
const {user, profile, product} = require('../../models')


//create controller adduser 
exports.addUser = async(req, res) =>{
    try {
        const data = req.body

       const createData = await user.create(data)

        res.send({
            status:'success',
            data: createData
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'server error'
        }) 
    }
}

//create controller get user
exports.getUsers = async(req, res) =>{
    try {
        const users = await user.findAll()

        res.send({
            status:'success',
            data: {
                users
            },
        })
    } catch (error) {
        res.send({
            status: 'failed',
            message: 'server error',
        }) 
    }
}

exports.getUser = async(req, res) =>{
    try {
        const {id} = req.params

        const data = await user.findOne({
            where: {
                id: id
            },
            include:{
                model: profile,
                as:'profile',
                attributes:{
                    exclude: ['idUser','createdAt','updatedAt']
                }
            },
            attributes:{
                exclude: ['password','createdAt','updatedAt']
            }
        })
        res.send({
            status: 'success',
            data,
        })
    } catch (error) {
        res.send({
            status: 'failed',
            message: 'server error',
        }) 
    }
}

exports.updateUser = async(req, res) =>{
    try {
        const {id} = req.params
        const newData = req.body

        await user.update(newData, {
            where:{
                id
            }
        })

        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: {
                newData
            }
        })

    } catch (error) {
        res.send({
            status: 'failed',
            message: 'server error',
        }) 
    }
}

exports.deleteUser = async(req, res) =>{
    try {
        const {id} = req.params

        await user.destroy({
            where:{
                id
            }
        })

        res.send({
            status: 'success',
            message: `DELETE user id: ${id} finished`
        })
    } catch (error) {
        res.send({
            status: 'failed',
            message: 'server error',
        }) 
    }
}

exports.getUserProduct = async(req, res)=>{
    try {
        const data = await user.findAll({
            include:{
                model: product,
                as: 'product'
            },
            attributes:{
                exclude: ['password','createdAt','updatedAt']
            }
        })

        res.send({
            status:'success',
            data
        })
    } catch (error) {
        res.send({
            status: 'failed',
            message: 'server error',
        }) 
    }
}