var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
var _ = require('lodash');
var autoIncrement = require('../../config/mongoose').autoIncrement;

var PostSchema = new Schema({
  displayedId:{
    type:Number,
    required:true
  },
  author:{
    type:ObjectId,
    ref:'User'
  },
  revealAuthor:{
    type:Boolean,
    required:true
  },
  category:{
    type:ObjectId,
    required:true,
    ref:'Category'
  },
  tags:{
     type:[{type:ObjectId,ref:'Tag'}],
    default:[]
  },
  stars:{
    type:[{type:ObjectId,ref:'User'}],
    default:[]
  },

text:{
  type:String,
  required:true
},
likes:{
  type:[{type:ObjectId,ref:'User'}],
  default:[]
},
dislikes:{
  type:[{type:ObjectId,ref:'User'}],
  default:[]
},

assets:{
type:[{type:Object}],
required:false
},
postedOn:{
  type:Date,
  default:Date.now(),
  required:true
},
updatedAt:{
  type:Date
}
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
})


//PostSchema.pre('find',autoPopulateCategory);

PostSchema.plugin(autoIncrement.plugin,{ model: 'Post', field: 'displayedId' })

module.exports = mongoose.model('Post', PostSchema);

// function autoPopulateCategory(next){
//   this.populate('category','title _id');
//   next();
// }