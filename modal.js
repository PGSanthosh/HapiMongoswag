const db = require('./mongo');
//const ObjectId = require('./mongo');
const ObjectId = require('mongodb').ObjectID


const getAllCustomer = () => {
    console.log('please get some data');
    return new Promise((resolve, reject) => {
        db.get().collection('customers')
            .find().toArray((err, result) => {
                console.log(result);
                err ? reject(err) : resolve(result);
            });
    });
}

const postACustomer = (request) => {
    console.log('Please Enter some data');
    let datatoinsert = {
        FirstName: request.payload.FirstName,
        Lastname: request.payload.Lastname,
        Email: request.payload.Email,
        Occupation: request.payload.Occupation,
        City: request.payload.City,
    }
    return new Promise((resolve, reject) => {
        db.get().collection('customers')
            .insertOne(datatoinsert, (err, result) => {
                console.log(datatoinsert);
                err ? reject(err) : resolve(datatoinsert);
            });

    })
}

const getACustomer = () => {
    console.log('please get data with occuption');
    return new Promise((resolve, reject) => {
        db.get().collection('customers')
            .findOne({},{projection:{_id:0}},(err, result) => {
                console.log(result);
                err ? reject(err) : resolve(result);
            });
    });
}

const updateACustomer = (request) => {
    console.log('Update data of a customer');
    return new Promise((resolve, reject)=>{
        // var myquery = {City:"Hyderbad"};
        // var newvalues = {FirstName:"john", City:"Dawn" }
        var updateObject = request.modal;
        var id = request.payload.id;
        db.get().collection('customers')
            .updateOne({City : ObjectId(id)}, {$set:updateObject} ,(err, result)=>{
                console.log(result);
                err ? reject(err) : resolve(request);
            });
    });
}

//Below is a Modle for hard Quoted Data for delete function

// const DeleteACustomer = (request) => {
//     console.log('DeleteACustomer');
//     return new Promise((resolve, reject)=>{
//         var myquery = {FirstName : 'VijayCyu' };
//         db.get().collection('customers')
//         .remove(myquery ,(err, result)=>{
//             console.log(myquery)
//             err ? reject(err) : resolve(myquery);
//         });
//     });
// }


const DeleteACustomer = (request) => {
    console.log('DeleteACustomer');
    return new Promise((resolve, reject)=>{
        var myquery = {FirstName : request.params.FirstName};
        db.get().collection('customers')
        .remove(myquery ,(err, result)=>{
            console.log(myquery)
            err ? reject(err) : resolve(myquery);
        });
    });
}


const getDeatailsById = (request) =>{
    console.log('get details of a customer by ID');
    return new Promise((resolve, reject)=>{
      //var _id=request.params._id
      let condition = {
          _id: ObjectId(request.params._id)
      }
      console.log(condition);
        db.get().collection('customers')
        .findOne(condition, (err, result)=>{
            console.log(result);
            err ? reject(err) : resolve(result);
        });
    });
}


module.exports = {
    getAllCustomer,
    postACustomer,
    getACustomer,
    updateACustomer,
    getDeatailsById,
    DeleteACustomer
}

