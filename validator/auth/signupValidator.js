const {body}=require('express-validator')
const User=require('../../models/User')

module.exports=signupValidator=[
    body('username')
    .isLength({min: 2,max:25})
    .withMessage('username must be between 2 to 25 charatecrs')
    .custom(async username=>{
         let user= await User.findOne({username})
         if(user){
             return Promise.reject('This username already taken')
         }
    })
    .trim()
    ,

    body('email')
    .isEmail().withMessage('Provide a valid email')
    .custom(async email =>{
        let user= await User.findOne({email})
         if(user){
             return Promise.reject('This email already used')
         }
    })
    .normalizeEmail(),

    body('password')
    .isLength({min:5}).withMessage('password must be grater than 5 characters'),

    body('confirmPassword')
    .isLength({min:5}).withMessage('confirm password can not be empty')
    .custom((confirmPassword,{req})=>{
        if(confirmPassword!==req.body.password){
            throw new Error('Password does not match')
        }
        return true
    })

]