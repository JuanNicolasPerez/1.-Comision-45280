const contentProdc = document.getElementById("contenedor-produc");
const vercarrito = document.getElementById("vercarrito");
const modalcontainer = document.getElementById("modal-content");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

JSON.parse(localStorage.getItem("carrito"));

const savelocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

productos.forEach(producto => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${producto.img}">
    <h3>${producto.nombre}</h3>
    <p>$ ${producto.precio}</p>
    <p>Cantidad: ${producto.cantidad}</p>
    `

    contentProdc.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id);
        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === prod.id) {
                    prod.cantidad++
                }
            });
        }
        else {
            carrito.push({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                    precio: producto.precio,
                cantidad: producto.cantidad,
            });
            console.log(carrito);
            savelocal();
        }

    });
});

const pintarCarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalheader = document.createElement("div");
    modalheader.className = "modal-header";
    modalheader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalcontainer.append(modalheader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "Salir";
    modalbutton.className = "modal-header-title";

    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";

    });

    modalheader.append(modalbutton);

        carrito.forEach((producto) => {
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content";
        carritocontent.innerHTML = `
        <img src = "${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <span class="restar"> - </span>
        <p>Cantidad: ${producto.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${producto.cantidad * producto.precio}</p>
        <span class= "delete-product"> 🗑 </span>
        `;

        modalcontainer.append(carritocontent);

        let restar = carritocontent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--;
            }
            pintarCarrito();
        });

        let sumar = carritocontent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            producto.cantidad++;
            pintarCarrito();
        });

        let eliminar = carritocontent.querySelector(".delete-product");
        
        eliminar.addEventListener("click", () => {
            eliminarproducto(producto.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $ ${total}`
    modalcontainer.append(totalBuying);
};

vercarrito.addEventListener("click", pintarCarrito);

const eliminarproducto = (id) => {
    const foundId = carrito.find((element) => element.id === id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    savelocal();
    pintarCarrito();
}