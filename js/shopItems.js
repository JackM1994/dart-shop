// Create an array to hold shop items
const items = [
    {
        "id": 1,
        "name": "Michael Van Gerwan Darts",
        "price" : "110.00",
        "image_url": "./images/mvg-darts.png"
    },
    
    {
        "id": 2,
        "name": "Phil Taylor Darts",
        "price" : "100.00",
        "image_url": "./images/phil-taylor.png"
    },
    
    {
        "id": 3,
        "name": "Raymond Van Barneveld",
        "price" : "70.00",
        "image_url": "./images/rvb.png"
    },
    
    {
        "id": 4,
        "name": "Gary Anderson Darts",
        "price" : "65.00",
        "image_url": "./images/gary.png"
    }
]

// Place items in index file
const mainDiv = document.querySelector('.shop');
const list = items.map(x => {
// create a div to store item data 
    const newDiv = document.createElement('div')
    newDiv.className = "card";
    newDiv.innerHTML =  `
                    <div class="card-item">
                        <img src='${x.image_url}' class="card-image">
                    </div>
                    <div class="card-info">
                        <h5>${x.name}</h5>
                        <h6>€${x.price}</h6>
                        <button class='buy-btn add-cart' data-name="${x.name}" data-price="${x.price}">Add to Cart</button>
                    </div>
                
    `
    mainDiv.append(newDiv);
})
console.log(list);

// Shopping cart section
let shoppingCart = (function(){
    cart = [];

    // Constructor
    function Item(name, price, count){
        this.name = name;
        this.price = price;
        this.count = count;
    }
    // Save items to the cart
    function saveCart(){
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    // Load cart
    function loadCart(){
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if(sessionStorage.getItem('shoppingCart') != null){
        loadCart();
    }

    // add to cart
    let darts = {};
    darts.addItemToCart = function(name, price, count){
        for(let item in cart){
            if(cart[item].name === name){
                cart[item].count ++;
                saveCart();
                return;
            }
        }
        let item = new Item(name,price,count);
        cart.push(item);
        saveCart();
    }

    // record item count
    darts.setCountForItem = function(name, count){
        for(let i in cart){
            if(cart[i].name === name){
                cart[i].count = count;
                break;
            }
        }
    };

    // remove item from cart
    darts.removeItemFromCart = function(name){
        for(let item in cart){
            if(cart[item].name === name){
                cart[item].count --;
                if(cart[item].count === 0){
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }
    // Remove all items from cart
    darts.removeItemFromCartAll = function(name){
        for( let item in cart){
            if(cart[item].name === name){
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // clear cart
    darts.clearCart = function(){
        cart = [];
        saveCart();
    }
    // count cart
    darts.totalCount = function(){
        let totalCount = 0;
        for(let item in cart){
            totalCount += cart[item].count;
        }
        return totalCount;
    }
    // total cart
    darts.totalCart = function(){
        let totalCart = 0;
        for(let item in cart){
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // list cart
    darts.listCart = function(){
        let cartCopy = [];
        for(i in cart){
            item = cart[i];
            itemCopy = {};
            for(p in item){
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return darts;
})();

// Event listeners

$('.add-cart').click(function(event) {
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  // Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    let cartArray = shoppingCart.listCart();
    let output = "";
    for(let i in cartArray) {
      output += `
                        <tr>
                            <td class="purchase-name"> ${cartArray[i].name}</td>
                            <td class="purchase-cost"> €${cartArray[i].price}</td>
                            <td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name="${cartArray[i].name}">-</button>
                            <input type='number' class='item-count form-control' data-name= '${cartArray[i].name}' value="${cartArray[i].count}">
                            <button class='plus-item btn btn-primary input-group-addon' data-name="${cartArray[i].name}">+</button></div></td>
                            <td><button class='delete-item btn btn-danger deleted-btn' id="del-btn" data-name="${cartArray[i].name}">X</button></td>
                            = 
                            <td>${cartArray[i].total}</td>
                        </tr>
                  
            `
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     let name = $(this).data('name');
     let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  // Open and close cart modal 
  const modalDialog = document.getElementById('cart');
  const cartBtn = document.getElementById('cart-btn');
  const closeBtn = document.querySelectorAll('.closed');

  // Event Listeners
  cartBtn.addEventListener("click", function(){
    modalDialog.style.display = 'block';
  })
  for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", function() {
      modalDialog.style.display = 'none';
    });
}
  
  displayCart();
