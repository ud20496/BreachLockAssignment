var express = require('express');
var app = express();
const fs = require("fs");
const bodyParser = require('body-parser')
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const Json2csvParser = require("json2csv").Parser;
const upload = require('express-fileupload');
const dbConfig = require('./config/db.config');
const category = require('./controller/controller.js');
const connection = require('./models/db.js');

const hostname = '127.0.0.1';
const port = 1337;

app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    if (req.files) {
        var file = req.files.file
        var filename = file.name
        var bufferToString = Buffer.from(file.data.toString('utf-8'));

         //Move uploaded file into uploads folder  
        file.mv('./Uploads/' + filename, (err) => {
            if (err) {
                res.send(err)
            } else {
                res.setHeader('content-type', 'text/plain');
                res.send(bufferToString);
            }
            let stream = fs.createReadStream('./Uploads/' + filename);
            let csvData = [];
            let csvStream = fastcsv
                .parse()
                .on("data", function (data) {
                    csvData.push(data);
                })
                .on("end", function () {
                    // remove the first line: header
                    csvData.shift();

                    // create a new connection to the database
                    connection.connect(err => {
                        if (err) {
                            console.log('error', err)
                        } else {
                            let query =
                                "INSERT INTO category (id, level, cvss, title, vulnerability, solution, reference) VALUES ?";
                            connection.query(query, [csvData], (error, response) => {
                                if (error) {
                                    console.log("error", error)
                                } else {
                                      console.log(response);
                                }
                            });
                          
                        }
                    });
                });
            stream.pipe(csvStream);

        });


    }
})

// Export data from database into CSV
app.get('/exportToCSV', (req, res) => {
    connection.connect(error => {
        if (error) throw error;

          // query data from MySQL to get all data
        connection.query("SELECT * FROM category", (error, data, fields) => {
            if (error) throw error;

            const jsonData = JSON.parse(JSON.stringify(data));

            const json2csvParser = new Json2csvParser({ header: true });
            const csv = json2csvParser.parse(jsonData);

            fs.writeFile("./updated.csv", csv, function (error) {
                if (error) throw error;
                console.log("Write  successfully!");
            });
        });

    });
})

// Calling routes
require("./routes/routes.js")(app);

app.listen(port, hostname, () => {
    console.log('Server running at :' + `${hostname}/${port}`);
});



