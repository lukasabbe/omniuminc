window.onload = async () => {
    const items = await fetch("https://omniumapi.lukasabbe.com/items");
    const itemsJson = await items.json();
    const container = document.getElementById("product-grid");
    const mc_items = await fetch("https://minecraft-api.vercel.app/api/items");
    const mc_itemsJson = await mc_items.json();
    itemsJson.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${mc_itemsJson.find(t => t.namespacedId == item.id).image}" alt="Product Image">
            <h3>${item.name}</h3>
            <p>${item.price} dia<br>${item.price*10} quid</p>
            <p>${item.stack_size} stack size</p>

            <p class="in-stock">In Stock</p>
        `;
        container.appendChild(itemElement);
    });
};
