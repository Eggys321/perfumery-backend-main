const mongoose = require('mongoose');
require('dotenv/config');


const mongoDB_Url = process.env.DBURL
function connect (){
mongoose.connect(mongoDB_Url)
.then(()=>console.log('DB connected successfully'))
.catch((e)=>console.log(e))
}

module.exports = connect