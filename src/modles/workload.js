const mongoose = require('mongoose')
 
const workSchema = new mongoose.Schema({subject :{
    type : String,
    required : true,
    trim : true
},
number : {
    type : Number
},
owner : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
}
},{
    timestamps : true
})

const workload = mongoose.model('workload', workSchema) 

module.exports = workload
