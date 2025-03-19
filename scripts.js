window.onload = async () => {
    const items = await fetch("https://omniumapi.lukasabbe.com/items");
    const itemsJson = await items.json();
    const container = document.getElementById("product-grid");
    const mc_items = await fetch("https://minecraft-api.vercel.app/api/items");
    const mc_itemsJson = await mc_items.json();
    itemsJson.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add(item.quantity == 0 ? "item_o" : "item");
        itemElement.innerHTML = `
            <img src="${mc_itemsJson.find(t => t.namespacedId == item.id).image}" alt="Product Image">
            <h3>${item.name}</h3>
            <p>${item.price} dia | 20 quid / ${item.stack_size} st</p>

            <p class="${item.quantity == 0 ? "out-of-stock" : "in-stock"}">${item.quantity == 0 ? "Out of stock" : "In stock"}</p>
        `;
        container.appendChild(itemElement);
    });
};
