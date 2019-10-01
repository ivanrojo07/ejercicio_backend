var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NaveSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        
    },
    velocidad: {
        type: String,
        
    }    
}, {
    usePushEach: true
});
module.exports = mongoose.model('Nave', NaveSchema);
