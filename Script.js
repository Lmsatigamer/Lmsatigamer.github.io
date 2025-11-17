fetch("products.json")
    .then(response => response.json())
    .then(products => {
        let container = document.getElementById("products");
        products.forEach(p => {
            container.innerHTML += `
                <div class="product">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>${p.price}</p>
                    <button onclick="order('${p.name}', '${p.price}')">Order</button>
                </div>
            `;
        });
    });

function order(name, price) {
    let phone = "YOUR_PHONE_NUMBER_HERE"; // example: 212600000000
    let msg = encodeURIComponent(`Hello, I want to order: ${name} - ${price}`);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}