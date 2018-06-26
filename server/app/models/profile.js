const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var ProfileSchema = new Schema({
  userId:{
    type:ObjectId,
    ref:'User'
  },
  bio:{
    type:String,
  },
  location:{
    type:String
  },
    gender:{
    type:String,
  },
  age:{
    type:Number,
    required:true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  
  starredPosts:{
    type:[{type:ObjectId,ref:'Post'}],
    default:[]
  },
  likedPosts:{
    type:[{type:ObjectId,ref:'Post'}],
    default:[]
  },
  dislikedPosts:{
    type:[{type:ObjectId,ref:'Post'}],
    default:[]
  },
  comments:{
    type:[{type:ObjectId,ref:'Comment'}],
    default:[]
  },
  profileStrength:{
    steps:[
    {
      bio:{
        type:Boolean,
        default:false        
      }
    },
    {
      gender:{
        type:Boolean,
        default:false        
     }
    },
        {
      age:{
        type:Boolean,
        default:false        
      }
    },
        {
      email:{
        type:Boolean,
        default:false
      }
    },
        {
      location:{
        type:Boolean,
        default:false
      }
    },
        {
      confirmedEmail:{
        type:Boolean,
        default:false
      }
    }
    ]
  }
},{
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
});


ProfileSchema.virtual("userPosts",{
  ref: 'Post',
  localField: 'userId',
  foreignField: 'author'
});

module.exports = mongoose.model('Profile', ProfileSchema);


