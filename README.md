# BreachLock Assignment

This project was generated with node version v12.14.1

## Dependencies

XAMPP MYSQL used for database managemnent.
Express.js framework for creating Node.js application.
Postman used for API's call.

## Running The Application

1. Run `npm i` to install the dependencies
2. Install XAMPP .
3. Start the XAMPP Apache server and start the XAMPP Mysql.
4. Run ` node app.js` to run the program.
5. If data file size is heavy kindly go to this directory `C:\xampp\mysql\bin` and increase this variable size  `max_allowed_packet=4M ` in my.ini file
6. For accessing and creating your database: http://localhost/phpmyadmin/
7. For uploading the file you can use http://127.0.0.1:1337/

## Making API Calls In Postman
1. To update the data:
Hit `http://127.0.0.1:1337/category/categoryId` with put request.
2. To export data to csv
Hit `http://127.0.0.1:1337/exportToCSV` with get request.
