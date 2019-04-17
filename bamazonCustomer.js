var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err, res) {
    if (err) {
        throw err;
    }
    else {
    }
})

connection.query('SELECT * FROM product', function (err, result) {
    if (err) {
        throw err;
    }
    // console.log(result);
    console.table(result);

    inquirer.prompt([
        {
            type: 'input',
            message: 'Which item would you like to purchase? Please enter the item id.',
            name: 'item_id'
        },
        {
            type: 'input',
            message: 'How many would you like?',
            name: 'quantity'
        }
    ])
        .then(function (answers) {
            connection.query('SELECT * FROM product WHERE item_id = ?', [answers.item_id], function (err, result) {
                if (err) {
                    throw err;
                }
                var quantity = result[0].stock_quantity;
                var price = result[0].price;
                var product_sales = result[0].product_sales;
                if (answers.quantity > quantity) {
                    console.log("You're out of luck! Insufficient quantity!")
                }
                else {
                    connection.query('UPDATE product SET ? WHERE item_id = ?', [{ stock_quantity: quantity - answers.quantity, product_sales: product_sales + (price * answers.quantity) }, answers.item_id], function (err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log('Your total cost is $' + (price * answers.quantity) + '. Thank you for your purchase!');
                    })
                }
            })
        });
});






