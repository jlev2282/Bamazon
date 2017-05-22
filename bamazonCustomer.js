var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password:"localhost",
	database: "Bamazon_db"
})

connection.connect(function(err){
	console.log("Connected as Id:"+connection.threadId);
	Inventory();
})

var Inventory = function(){
	connection.query("SELECT * FROM products", function(err,res){
		console.log(res);
	inquirer.prompt({
		name:"id",
		type: "input",
		message: "What is the ID of the item you'd like to buy?",
		validate: function(value){
			if(isNaN(value)==false){
				return true;
			} else {
				return false;
				}
			}
		}).then(function(answer){
			for (var i=0;i<res.length;i++){
				if(res[i].id==answer.id){
					var chosenItem = res[i];
					inquirer.prompt({
						name:"howMany",
						type:"input",
						message:"How many of the item "+chosenItem.product_name+" would you like to buy?",
						validate: function(value){
							if(isNaN(value)==false){
								return true;
							} else {
								return false;
							}
						}
					})
				}
			}
		})
	})
}
	// 	,{
	// 	name:"startingBid",
	// 	type: "input",
	// 	// message: "How many units of "+answer.id+" would you like to buy?"
	// 	message: "How many units would you like to buy?",
	// 	validate: function(value){
	// 		if(isNaN(value)==false){
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	}
	// }])
