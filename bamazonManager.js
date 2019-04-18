var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});

connection.connect(function (err, res) {
    if (err) {
        throw err;
    }
    else {
        // console.log('you are connected to the database')
    }
})



inquirer
    .prompt([
        {
            type: 'list',
            message: 'Which action would you like to take?',
            name: 'selection',
            choices: ['View products for sale', 'View low inventory - Quantity less than 20', 'Add to inventory', 'Add new product']
        }

    ])
    .then(function (answers) {
        var selection = answers.selection;
        if (selection === 'View products for sale') {
            connection.query('SELECT * FROM product', function (err, result) {
                if (err) {
                    throw err;
                }
                console.table(result);
            })
        }
        else if (selection === 'View low inventory - Quantity less than 20') {
            connection.query('SELECT * FROM product WHERE stock_quantity < 20', function (err, result) {
                if (err) {
                    throw err;
                }
                console.table(result);
            })
        }
        else if (selection === 'Add to inventory') {
            connection.query('SELECT * FROM product', function (err, result) {
                if (err) {
                    throw err;
                }

                var choices = [];
                for (var i = 0; i < result.length; i++) {
                    choices.push(result[i].product_name + '');
                }

                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Increase stock quantity for which item?',
                        name: 'product_name',
                        choices: choices
                    },
                    {
                        type: 'input',
                        message: 'How many would you like to add?',
                        name: 'quantity'
                    }
                ])
                    .then(function (answers) {
                        connection.query('SELECT * FROM product WHERE product_name = ?', [answers.product_name], function (err, result) {
                            if (err) {
                                throw err;
                            }
                            var quantity = result[0].stock_quantity;

                            connection.query('UPDATE product SET ? WHERE product_name = ?', [{ stock_quantity: parseInt(quantity) + parseInt(answers.quantity) }, answers.product_name], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                console.log('Your stock quantity has been updated');

                            })
                        });
                    });
            });
        }
        else if (selection === 'Add new product') {
            connection.query('SELECT * FROM department', function (err, result) {
                if (err) {
                    throw err;
                }

                var choices = [];
                for (var i = 0; i < result.length; i++) {
                    choices.push(result[i].department_name + '');
                }

                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the product being added?',
                        name: 'product_name'
                    },
                    {
                        type: 'input',
                        message: 'What is the cost of the product?',
                        name: 'price'
                    },
                    {
                        type: 'input',
                        message: 'How many will be added?',
                        name: 'stock_quantity'
                    },
                    // Initially used deparment id, but that would require the user to know the number and corresponding name. Opted to use name instead
                    {
                        type: 'list',
                        message: 'Which department will this item be added to?',
                        name: 'department_name',
                        choices: choices
                    },
                    // This section was throwing the deparment name instead of the department id after introducing department name. Decided to leave it out.
                    // {
                    //     type: 'list',
                    //     message: 'Select the department id.',
                    //     name: 'department_id',
                    //     choices: choices
                    // },

                ])
                    .then(function (answers) {
                        console.log(answers)
                        connection.query('INSERT INTO product SET ?',[{
                                product_name: answers.product_name,
                                price: parseFloat(answers.price),
                                stock_quantity: parseInt(answers.stock_quantity),
                                department_name: answers.department_name,
                                // Exclusion corresponding with department id exclusion above.
                                // department_id: parseInt(answers.department_id),
                                product_sales: 0
                            }], function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                console.log('You have added ' + (answers.product_name) + ' as a new product')
                            });
                    });
            });

        }

    });