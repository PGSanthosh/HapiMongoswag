const Hapi = require('hapi');
const Server = new Hapi.Server();
const db = require('./mongo');
const customer = require('./modal');
//const payloadValidator = require('./validator')


Server.connection({
    port: 5001,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['lan']
        }
    }
});

Server.route({
    path: '/test',
    method: 'POST',
    handler: (request, reply) => {
        console.log('level:1');
        customer.postACustomer(request)
            .then((resulllt) => {
                return reply({
                    message: 'Success',
                    data: resulllt
                }).code(200);
            })
    },
    
});


Server.route({
    method: 'GET',
    path: '/test',
    handler: async (request, reply) => {
        console.log('level : 1');
        customer.getAllCustomer()
            .then((ressult) => {
                return reply({
                    message: 'Success',
                    data: ressult
                }).code(200);
            })

        console.log('level : 2');
        //reply('route working');
    }
});


Server.route({
    method: 'GET',
    path: '/test1',
    handler: async (request, reply) => {
        console.log('level : 1');

        customer.getACustomer()
            .then((ressult) => {
                return reply({
                    message: 'Success',
                    data: ressult
                }).code(200);
            })

        console.log('level : 2');
        //reply('route working');
    }
});

Server.route({
    method:'PATCH',
    path:'/test/{_id}',
    handler: async (request, reply) => {
        console.log('level :1');
        customer.updateACustomer(request)
        .then((ressulta) =>{
            return reply({
                message:'Success',
                data:ressulta,
            }).code(200)
        })
        console.log('level : 2');
    }
})

Server.route({
    method:'DELETE',
    path:'/delete/{FirstName}',
    handler:async (request, reply) =>{
        console.log('level:1');
        customer.DeleteACustomer(request)
        .then((resssult) => {
            return reply({
                message:'Sucess',
                data:resssult,
            }).code(200)
        })
        console.log('level : 2');
    }
})

Server.route({
    method:'GET',
    path:'/test2/{_id}',
    handler:async (request, reply) =>{
        //console.log(request.params._id);
        customer.getDeatailsById(request)  
        .then((ressssult)=>{
            return reply({
                message:"sucess",
                data:ressssult,
            }).code(200)
        })
        console.log('level:2');
    }
})

// request through params and Query , when you want to pass through url with Query
//request.params._id , path should be specified with {_id} and through Query
//request.query._id

Server.start(() => {
    console.log(`Server is listening on port ${Server.info.uri}`)
    db.connect(() => {
        console.log('db is connected');
    }); //create a connection to mongodb

});

