const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongo');
    }

    console.log('connected to Mongodb');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do', 
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('unable to insert', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Users').insertOne({
        name: 'Scott',
        age: 41,
        location: 'Oakland'
    }, (err, result) => {
        if (err) {
            return console.log(err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close();
});
