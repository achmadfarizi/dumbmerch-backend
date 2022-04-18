//instantiate express module
const express = require('express')

//init express router 
const router = express.Router()

//get addUser controller user
const {addUser, getUsers, getUser, updateUser, deleteUser, getUserProduct} = require('../controllers/user')
const {getProducts, addProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/product')
const {getTransactions, addTransaction} = require('../controllers/Transaction')
const {addProfile} = require('../controllers/profile')
const {addCategory, getCategorys, getCategory, updateCategory, deleteCategory} = require('../controllers/category')
const {register, login} =require('../controllers/auth')

//middleware authentication middleware
const {auth} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadFile')

//create route for add user here
router.post('/user', addUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get('/user-product', getUserProduct)

//create route for product
router.post('/product', auth, uploadFile('image'), addProduct)
router.get('/products', auth, getProducts)
router.get('/product/:id', auth, getProduct)
router.patch('/product/:id', auth, updateProduct)
router.delete('/product/:id', auth, deleteProduct)

//create route for transcation
router.get('/transactions', auth, getTransactions)
router.post('/transaction', auth, addTransaction)

//create route for profile
router.post('/profile', addProfile)

//create route for category
router.post('/category', auth, addCategory)
router.get('/categorys', auth, getCategorys)
router.get('/category/:id', auth, getCategory)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)

//router register
router.post('/register', register)
router.post('/login', login)

//export module router
module.exports = router
