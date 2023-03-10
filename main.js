class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio; 
        this.img = img;
        this.cantidad = 1;
    }
}

const kit = new Producto (1, "Super kit armador", 1500, "../Imagenes/producto-1.jpg")
const papelillos = new Producto (2, "Papelillos par armar", 180, "../Imagenes/producto-4.jpg")
const filtros = new Producto (3, "Filtros M", 230, "../Imagenes/producto-5.jpg")
const mate = new Producto (4, "Mate grabado duki", 3500, "../Imagenes/producto-6.jpeg")
const almohada = new Producto (5, "Almohada Duketo", 800, "../Imagenes/producto-7.jpg")
const funda = new Producto (6, "Funda blanca", 750, "../Imagenes/producto-8.jpg")
const remera = new Producto (7, "Remera duki", 1000, "../Imagenes/producto-2.png")
const remera2 = new Producto (8, "Remera duki", 1000, "../Imagenes/producto-12.jpeg")
const remera3 = new Producto (9, "Remera duki", 1000, "../Imagenes/producto-13.jpeg")
const remera4 = new Producto (10, "Remera duki", 1000, "../Imagenes/producto-14.webp")
const taza = new Producto (11, "Taza fondo negro", 500, "../Imagenes/producto-10.jpg")
const taza2 = new Producto (12, "Taza fondo blanco", 550, "../Imagenes/producto-11.jpg")
const buzo = new Producto (13, "Buzo de duki", 2000, "../Imagenes/producto-9.jpg")
const figurita = new Producto(14, "Figurita edicion limitada", 700, "../Imagenes/producto-3.jpg")
const productos = [kit, papelillos,filtros, mate, almohada, funda, remera, remera2, remera3, remera4, taza, taza2,buzo, figurita];

let carrito = [];

if (localStorage.getItem("carrito")) carrito = JSON.parse(localStorage.getItem("carrito"));
const contenedorProductos = document.getElementById("contProductos");


const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom Productos">    
                    <div class = "card-body colorCard" >
                        <h2 class = "nombreProducto" > ${producto.nombre} </h2>
                        <p class = "Precio" > ${producto.precio} </p>
                        <button class = "btn Boton colorBCard" id = "boton${producto.id}" >Agregar Producto</button>
                        <button class = "btn Boton colorBCard" id = "boton${producto.id}"> Ver detalles </button>
                    </div>
                </div>`

        contenedorProductos.appendChild(card);
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })


    })
}
mostrarProductos();

/*                        <input type="button" id="btnSumar" value="+1">
                        <p id="msgContador">0</p>
                        <input type="button" id="btnRestar" value="-1"> */

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    console.log(carrito);
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const contCompras = document.getElementById("contCompras");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contCompras.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom Productos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar</button>
                    </div>
                </div>`
        contCompras.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}





const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}





const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})
const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear();
}




const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach( producto => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total $${totalCompra}`;
}