const {Schema,model}=require('mongoose')


const profileSchema= new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
           type:String,
           required:true,
           trim:true,
           maxlength:50
    },
    title:{
        type:String,
        trim:true,
        maxlength:150
    },
    bio:{
        type:String,
        trim:true,
        maxlength:600
    },
    profilePic:String,
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]

},{timestamps:true})


const Profile=model('Profile',profileSchema)
module.exports=Profile