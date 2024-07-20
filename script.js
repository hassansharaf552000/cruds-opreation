var productInp = document.getElementById("productNameInp");
var priceInp = document.getElementById("productpriceInp");
var categoryInp = document.getElementById("productcatgeroyInp");
var descInp = document.getElementById("productdescInp");
var btnAdd = document.getElementById("addProductButton");
var btnUpdate = document.getElementById("btnUpdate");
var productsContainer = [];
var indexUpdate = 0;

if (localStorage.getItem('products') != null) {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts();
}
function addProduct() {
    if (validation_name()) {
        var product = {
            name: productInp.value,
            price: priceInp.value,
            category: categoryInp.value,
            description: descInp.value
        }
        console.log(product);
        productsContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        displayProducts();
        clearForm();
    }
    else {
        alert("please enter valid name")
    }
}

function displayProducts() {
    var cartona = '';
    for (var i = 0; i < productsContainer.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="setUpdateInp(${i})" class="btn btn-outline-warning btn-sm">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">delete</button></td>
      </tr> `

    }
    document.getElementById("t-body").innerHTML = cartona
}
function clearForm() {
    document.getElementById("productNameInp").value = '';
    document.getElementById("productpriceInp").value = '';
    document.getElementById("productcatgeroyInp").value = '';
    document.getElementById("productdescInp").value = '';
}
function deleteProduct(index) {
    productsContainer.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts();
}
function search(term) {
    var cartona = '';
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.includes(term)) {
            console.log(productsContainer[i])
            cartona += `<tr>
        <td>${i + 1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].description}</td>
        <td><button onclick="setUpdateInp(${i})" class="btn btn-outline-warning btn-sm">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">delete</button></td>
      </tr> `

        }
        document.getElementById("t-body").innerHTML = cartona

    }

}
function validation_name() {
    var regex = /[a-zA-Z]{3,6}$/
    if (regex.test(productInp.value)) {
        return true;
    }
    else {
        return false;
    }

}
function setUpdateInp(index) {
    indexUpdate = index;
    productInp.value = productsContainer.at(index).name;
    priceInp.value = productsContainer.at(index).price;
    categoryInp.value = productsContainer.at(index).category;
    descInp.value = productsContainer.at(index).description;
    btnAdd.classList.add('d-none');
    btnUpdate.classList.remove('d-none');
}
function update() {
    if (validation_name()) {
        var product = {
            name: productInp.value,
            price: priceInp.value,
            category: categoryInp.value,
            description: descInp.value
        }
        productsContainer.splice(indexUpdate, 1, product)
        displayProducts();
        localStorage.setItem("products", JSON.stringify(productsContainer));
        clearForm();
        btnAdd.classList.remove('d-none');
        btnUpdate.classList.add('d-none');




    }
}