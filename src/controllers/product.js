//import models 
const {product, user, category, categoryProduct} = require('../../models')

exports.getProducts = async (req, res) => {
  try {
    const data = await product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser']
      }
    })

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.addProduct = async (req, res) => {
  try {
    const { category: categoryName, ...data } = req.body;

    // code here
    const newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id
    })

    const categoryData = await category.findOne({
      where: {
        name: categoryName,
      },
    });

    if (categoryData) {
      await categoryProduct.create({
        idCategory: categoryData.id,
        idProduct: newProduct.id,
      });
    } else {
      const newCategory = await category.create({ name: categoryName });
      await categoryProduct.create({
        idCategory: newCategory.id,
        idProduct: newProduct.id,
      });
    }
    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: categoryProduct,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    // code here
    productData = JSON.parse(JSON.stringify(productData))
    res.send({
      status: 'success',
      data: {
        ...productData,
        image: 'http://localhost:5000/uploads/' + productData.image
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
    try {
  
      const { id } = req.params;
  
      const data = await product.findOne({
        include: {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'idUser']
        },
        where: {
          id,
        },
      })
  
      res.send({
        status: 'success...',
        data
      })
    } catch (error) {
      console.log(error)
      res.send({
        status: 'failed',
        message: 'Server Error'
      })
    }
}

exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await product.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Update product id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      await product.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        data:{
            id
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
}