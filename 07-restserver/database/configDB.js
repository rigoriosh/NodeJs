const mongoose = require('mongoose');

const dbConnection = async() => {    
    try {
        console.log('conecting with DB, wait please...')
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Db is on line');
    } catch (error) {
        //console.log({error});
        throw new Error('Error a la hora de inciar la base de datos');
    }
}





module.exports = {
    dbConnection
}