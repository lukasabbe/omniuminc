
const readline = require('readline');
require("dotenv").config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let id;
let name;
let price;
let quantity;
let stack_size;

(async () => {
    id = await askFor("Enter the item ID: ", id);
    name = await askFor("Enter the item name: ", name);
    price = await askFor("Enter the item price: ", price);
    quantity = await askFor("Enter the item quantity: ", quantity);
    stack_size = await askFor("Enter the item stack size: ", stack_size);
    rl.close();

    await fetch("https://omniumapi.lukasabbe.com/item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
        id, name, price, quantity, stack_size, token: process.env.TOKEN
        })
    }).then(res => res.json()).then(data => console.log(data));

})();

async function askFor(string) {
    return new Promise((resolve, reject) => {
        rl.question(string, (answer) => {
            resolve(answer);
        });
    });
}