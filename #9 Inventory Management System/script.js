const addBtn =
  document.getElementById("addBtn");

const productList =
  document.getElementById("productList");

const transactionList =
  document.getElementById("transactionList");

const searchInput =
  document.getElementById("searchInput");

const inventoryValue =
  document.getElementById("inventoryValue");

const topSelling =
  document.getElementById("topSelling");

const slowMoving =
  document.getElementById("slowMoving");

let products =
  JSON.parse(localStorage.getItem("products")) || [];

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

addBtn.addEventListener(
  "click",
  addProduct
);

searchInput.addEventListener(
  "input",
  displayProducts
);

function addProduct() {

  const name =
    document.getElementById("name").value;

  const category =
    document.getElementById("category").value;

  const price =
    document.getElementById("price").value;

  const stock =
    document.getElementById("stock").value;

  const reorderLevel =
    document.getElementById("reorderLevel").value;

  const supplier =
    document.getElementById("supplier").value;

  if (
    name === "" ||
    category === "" ||
    price === "" ||
    stock === ""
  ) {

    alert("Please fill all fields");

    return;
  }

  const product = {

    id: Date.now(),

    name,

    category,

    price: Number(price),

    stock: Number(stock),

    reorderLevel: Number(reorderLevel),

    supplier,

    sold: 0
  };

  products.push(product);

  saveProducts();

  displayProducts();

  clearForm();
}

function displayProducts() {

  const searchValue =
    searchInput.value.toLowerCase();

  productList.innerHTML = "";

  const filteredProducts =
    products.filter(product =>

      product.name
        .toLowerCase()
        .includes(searchValue)
    );

  filteredProducts.forEach(product => {

    const div =
      document.createElement("div");

    div.classList.add("product-card");

    div.innerHTML = `
      <h3>${product.name}</h3>

      <p>Category: ${product.category}</p>

      <p>Price: ₹${product.price}</p>

      <p>Stock: ${product.stock}</p>

      <p>Supplier: ${product.supplier}</p>

      ${
        product.stock <=
        product.reorderLevel

        ?

        `<p class="low-stock">
          Low Stock Alert
        </p>`

        :

        ""
      }

      <div class="actions">

        <button onclick="stockIn(${product.id})">
          Stock In
        </button>

        <button onclick="stockOut(${product.id})">
          Stock Out
        </button>

        <button onclick="deleteProduct(${product.id})">
          Delete
        </button>

      </div>
    `;

    productList.appendChild(div);
  });

  updateReports();
}

function stockIn(id) {

  const quantity =
    prompt("Enter stock quantity");

  if (!quantity) return;

  const product =
    products.find(item => item.id === id);

  product.stock += Number(quantity);

  addTransaction(
    product.name,
    "Stock In",
    quantity
  );

  saveProducts();

  displayProducts();
}

function stockOut(id) {

  const quantity =
    prompt("Enter sold quantity");

  if (!quantity) return;

  const product =
    products.find(item => item.id === id);

  if (
    Number(quantity) > product.stock
  ) {

    alert("Not enough stock");

    return;
  }

  product.stock -= Number(quantity);

  product.sold += Number(quantity);

  addTransaction(
    product.name,
    "Stock Out",
    quantity
  );

  saveProducts();

  displayProducts();
}

function deleteProduct(id) {

  products =
    products.filter(
      item => item.id !== id
    );

  saveProducts();

  displayProducts();
}

function addTransaction(
  productName,
  type,
  quantity
) {

  const transaction = {

    productName,

    type,

    quantity,

    date:
      new Date().toLocaleString()
  };

  transactions.push(transaction);

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

  displayTransactions();
}

function displayTransactions() {

  transactionList.innerHTML = "";

  transactions
    .slice()
    .reverse()
    .forEach(item => {

      const div =
        document.createElement("div");

      div.classList.add(
        "transaction-item"
      );

      div.innerHTML = `
        <p>
          ${item.type}
          -
          ${item.productName}
        </p>

        <p>
          Quantity:
          ${item.quantity}
        </p>

        <p>
          ${item.date}
        </p>
      `;

      transactionList.appendChild(div);
    });
}

function updateReports() {

  let totalValue = 0;

  let topProduct = "";

  let slowProduct = "";

  let highestSold = 0;

  let lowestSold = Infinity;

  products.forEach(product => {

    totalValue +=
      product.price *
      product.stock;

    if (
      product.sold > highestSold
    ) {

      highestSold =
        product.sold;

      topProduct =
        product.name;
    }

    if (
      product.sold < lowestSold
    ) {

      lowestSold =
        product.sold;

      slowProduct =
        product.name;
    }
  });

  inventoryValue.innerText =
    "Inventory Value: ₹" +
    totalValue;

  topSelling.innerText =
    "Top Selling Product: " +
    (topProduct || "No sales");

  slowMoving.innerText =
    "Slow Moving Product: " +
    (slowProduct || "No data");
}

function saveProducts() {

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );
}

function clearForm() {

  document.getElementById("name").value = "";

  document.getElementById("category").value = "";

  document.getElementById("price").value = "";

  document.getElementById("stock").value = "";

  document.getElementById("reorderLevel").value = "";

  document.getElementById("supplier").value = "";
}

displayProducts();

displayTransactions();