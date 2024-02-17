const menuContent = document.getElementById("menuContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async () => {
  const response = await fetch("Data/Productos.json");
  const Productos = await response.json();


  //Funcion Buscar y mostrar productos - JSON
  Productos.forEach((productos) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
  <img src="${productos.img}">
  <h3 class>${productos.nombre}</h3>
  <p class="price">${productos.precio} $</p>
  <p class="descripcion">${productos.descripcion}</p>
  `;

    menuContent.appendChild(content);

    //Funcion Agregar al carrito
    let agregarAlCarrito = document.createElement("button");
    agregarAlCarrito.innerText = "Agregar al Carrito";
    agregarAlCarrito.className = "Agregar al Carrito";
    agregarAlCarrito.onclick = () => alerta();

    content.appendChild(agregarAlCarrito);

    function alerta() {
      Toastify({
        text: "Agregaste un producto al carrito",
        duration: 1500,
        style: { background: "#000", color: "#c0b897", padding: "1rem", font: "arial", },
      }).showToast();
    }

    agregarAlCarrito.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === productos.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === productos.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: productos.id,
          img: productos.img,
          nombre: productos.nombre,
          precio: productos.precio,
          cantidad: productos.cantidad,
        });
      }
      carritoCounter();
      guardarLocal();
    });
  });
};

getProductos();

//Guardar el datos en LocalStorage.
const guardarLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
