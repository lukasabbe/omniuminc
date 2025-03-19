
const readline = require('readline');
require("dotenv").config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let id;
let amount;

(async () => {
    id = await askFor("Enter the item ID: ", id);
    amount = await askFor("Enter the new amount: ", amount);
    rl.close();

    const items = await fetch("https://omniumapi.lukasabbe.com/items");
    const itemsJson = await items.json();
    const item = itemsJson.find(i => i.id == id);
    if (!item) {
        console.log("Item not found");
        return;
    }

    await fetch("https://omniumapi.lukasabbe.com/item/"+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
        id: id, name: item.name, price:item.price, quantity:amount, stack_size:item.stack_size, token: process.env.TOKEN
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