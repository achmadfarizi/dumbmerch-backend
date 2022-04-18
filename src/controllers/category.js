const { category } = require('../../models')

exports.addCategory = async (req, res) => {
    try {
      const data = req.body
  
      await category.create(data)
  
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

exports.getCategorys = async (req, res) => {
    try {
      const categories = await category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
  
      res.send({
        status: 'success...',
        data: { categories },
  
      })
    } catch (error) {
      console.log(error)
      res.send({
        status: 'failed',
        message: 'Server Error'
      })
    }
}

exports.getCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await category.findOne({
  
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

exports.updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      await category.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: `Update category id: ${id} finished`,
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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete category id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};