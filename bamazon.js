let mysql = require('mysql');
let inquirer = require('inquirer');
var table = require('cli-table');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'bamazon'
  });
let startMessage = "";
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    connection.query('SELECT * FROM `products`', function (error, results) {
        if (error) console.log(error);
        var showTable = new table({ 
            head: ['Id', 'Name', 'Department', 'Price', 'Stock'],
            colWidths: [5, 30, 30, 10, 10]
        });
        for (var i = 0; i < results.length; i++) {
            showTable.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
            );
        }
        console.log(showTable.toString());
        inquirer.prompt([
            {
                type: 'input',
                name: 'productId',
                message: 'Please enter the ID of the product you would like to buy:\r\n'
            },
            {
                type: 'input',
                name: 'productQty',
                message: 'Please enter the quantity of selected product:'
            }
        ]).then(answers => {
            if (err) {
                console.error('error connecting: ' + err);
                return;
            }
            connection.query('SELECT * FROM products WHERE `item_id` = ?',
                [answers.productId]
            , (err, results) => {
                if (err) throw console.log(err);
                let stockQty = results[0].stock_quantity;
                let productSale = results[0].product_sales;
                let productPrice = results[0].price;
                let productName = results[0].product_name;
                let itemId = parseInt(answers.productId);
                let ItemQty = parseInt(answers.productQty);
                stockQty = parseInt(stockQty);
                productSale = parseFloat(productSale);
                productPrice = parseFloat(productPrice);
                    

                if (isNaN(itemId) || isNaN(ItemQty) || isNaN(stockQty)) {
                    console.log('Please enter a number! ...');
                    connection.end();
                }else{
                    // check stok
                    if ((stockQty - ItemQty) >= 0) {
                        stockQty = stockQty - ItemQty;
                        productSale +=  ItemQty * productPrice; 
                        // update the database
                        connection.query('UPDATE products SET stock_quantity = ?, product_sales = ?  WHERE item_id = ?', [stockQty, productSale, itemId], function (e) {
                            if (e){
                                console.log("Error during updating stock qty and product sale" + e);
                            }else{
                                var orderTable = new table({ 
                                    head: ['Id', 'Name', 'Department', 'Price', 'Order Qty', 'Total Price'],
                                    colWidths: [5, 30, 30, 10, 15, 15]
                                });
                                let totalPrice = ItemQty * productPrice;
                                orderTable.push(
                                    [results[0].item_id, results[0].product_name, results[0].department_name, results[0].price, ItemQty, totalPrice]
                                );
                                console.log("\r\nYour order info:");
                                console.log(orderTable.toString());
                                console.log("Thanks for shopping!");
                            }
                        });
                        
                    } else if ((initCount - pCount) < 0)  {
                        console.log('Insufficient quantity!');
                    }
                }
                
            });
        }); 
    });
});



