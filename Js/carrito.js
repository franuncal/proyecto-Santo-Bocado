// Funcion mostrar cantidad agregada al carrito
const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h1 class="modal-header-title">Carrito</h1>
  `;
  modalContainer.appendChild(modalHeader);

  //Funcion cerrar vista del carrito
  const modalButton = document.createElement("h4");
  modalButton.innerText = "Cerrar";
  modalButton.className = "modal-header-button";

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.appendChild(modalButton);

  // Funcion mostrar Productos del Carrito
  carrito.forEach((productos) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${productos.img}">
    <h3>${productos.nombre}</h3>
    <p>${productos.precio} $</p>
    <button class="restar"> - </button>
    <p>Cantidad: ${productos.cantidad}</p>
    <button class="sumar"> + </button>
    <p>Total: ${productos.cantidad * productos.precio}</p>
    <span class="eliminar-productos"> X </span>
  `;
    modalContainer.appendChild(carritoContent);

    //Boton RESTAR producto del carrito
    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (productos.cantidad !== 1) {
        productos.cantidad--;
        Toastify({
          text: "Eliminaste un producto",
          duration: 1500,
          style: { background: "#000", color: "#c0b897", padding: "1rem" },
        }).showToast();
      }
      pintarCarrito();
      guardarLocal();
    });

    //Boton SUMAR producto del carrito
    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      productos.cantidad++;
      Toastify({
        text: "Agregaste un producto a tu carrito",
        duration: 1500,
        style: { background: "#000", color: "#c0b897", padding: "1rem" },
      }).showToast();
      pintarCarrito();
      guardarLocal();
    });

    //Boton ELIMINAR ITEM del carrito
    let eliminar = carritoContent.querySelector(".eliminar-productos");
    eliminar.addEventListener("click", () => {
      eliminarProductos(productos.id);
      Toastify({
        text: "Eliminaste un Item del carrito",
        duration: 1500,
        style: { background: "#000", color: "#c0b897", padding: "1rem" },
      }).showToast();
    });
  });

  // Funcion TOTAL $ Carrito
  const carritoTotal = carrito.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );

  // Funcion TOTAL $ Compra
  const totalCompra = document.createElement("div");
  totalCompra.className = "total-carrito";
  totalCompra.innerHTML = `Total a Pagar: ${carritoTotal} $`;

  modalContainer.appendChild(totalCompra);

  //Funcion COMPRAR $ carrito
  const comprarCarrito = document.createElement("buttonComprar");
  comprarCarrito.className = "comprar-carrito";
  comprarCarrito.innerHTML = `Comprar Carrito `;

  comprarCarrito.addEventListener("click", () => {
    comprarCarrito.style.display = "flex";
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Compra realizada con exito!",
      showConfirmButton: false,
      color: "#fff",
      background: "#000",
      timer: 2000
    });
  });

  modalContainer.appendChild(comprarCarrito);
};

verCarrito.addEventListener("click", pintarCarrito);

//Funcion Eliminar productos del carrito
const eliminarProductos = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter();
  guardarLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();
