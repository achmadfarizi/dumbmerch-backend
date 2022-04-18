const { profile, user } = require('../../models')

exports.addProfile = async (req, res) => {
    try {
        const data = req.body

        await profile.create(data)

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