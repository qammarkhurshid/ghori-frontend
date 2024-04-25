async function getProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    const productsArr = [];

    data.forEach((product) => {
      const processedProduct = {
        name: product.name,
        id: product.productId,
        monthlyStock: product.totalStock,
        dateOrdered: product.dateOrdered.slice(0, 10),
        stockLeft: product.stockLeft,
        image: product.images,
      };
      productsArr.push(processedProduct);
    });

    updateTable(productsArr);
  } catch (error) {
    console.error(error);
  }
}

function updateTable(productsArr) {
  const table = document.getElementById("productTable");
  const tableBody = table.getElementsByTagName("tbody")[0];

  tableBody.innerHTML = "";

  productsArr.forEach((product) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const idCell = document.createElement("td");
    const monthlyStockCell = document.createElement("td");
    const dateOrderedCell = document.createElement("td");
    const stockLeftCell = document.createElement("td");
    // const imageCell = document.createElement("td");
    // const image = document.createElement('img');

    nameCell.textContent = product.name;
    idCell.textContent = product.id;
    monthlyStockCell.textContent = product.monthlyStock;
    dateOrderedCell.textContent = product.dateOrdered;
    stockLeftCell.textContent = product.stockLeft;
    // image.src = product.image;
    // image.style.width = "100px"

    row.appendChild(nameCell);
    row.appendChild(idCell);
    row.appendChild(monthlyStockCell);
    row.appendChild(dateOrderedCell);
    row.appendChild(stockLeftCell);
    // imageCell.appendChild(image);
    // row.appendChild(imageCell);

    tableBody.appendChild(row);
  });
}

getProducts();

function handleImageUpload(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("product-preview");
  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    preview.src = imageUrl;
  };
  reader.readAsDataURL(file);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("http://localhost:3000/products/add-product", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Product Successfully Added!");
      document.getElementById("product-modal").style.display = "none";
    })
    .catch((error) => {
      console.error(error);
    });
}
