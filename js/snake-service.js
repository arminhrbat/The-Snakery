var SnakeService = {
    list:function(){
        $.ajax({
            url: "rest/snakes",
            type: "GET",
            success: function(data) {
                console.log(data);
                $("#portfolioItems").html("");
                var html = "";
                for(let i = 0; i < data.length; i++){
                    html += `
                    <div class="col-lg-4 col-sm-6 mb-4">
                    <div class="portfolio-item">
                            <a class="portfolio-link" data-bs-toggle="modal" onclick="event.preventDefault(); SnakeService.list_by_id(` + data[i].id + `)">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="assets/img/portfolio/pied-ball-python1.jpeg" alt="pied ball python error1"/>
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">`+data[i].common_name+ ` </div>
                                <div class="portfolio-caption-subheading text-muted">`+data[i].price+ `</div>
                            </div>
                        </div>

            </div>
                    `;
                }
                $("#portofioItems").html(html);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $("#portofioItems").html("<p>There was an error loading the data. Please try again later.</p>");
            }
        });
    },

    list_by_id:function(id){
        $('#porfolioModalInfo').html('loading...');

        $.ajax({
            url: "rest/snakes/" + id,
            type: "GET",
            success: function(data) {
                $("#porfolioModalInfo").html("");
                var html = "";
                    html += `
                    <h2 class="text-uppercase">` + data.common_name + `</h2>
                    <p class="item-intro text-muted">Rarity: <br> `+ data.rarity +` </p>
                    <img class="img-fluid" src="assets/img/portfolio/${data.image}" alt="${data.common_name}"/>
                    <p>` + data.description + `</p>
                    <ul class="list-inline">
                        <li><strong>Scientific Name:</strong> ` + data.scientific_name + `</li>
                        <li><strong>Common Name:</strong> ` + data.common_name + `</li>
                        <li><strong>Appearance:</strong> ` + data.appearance + `</li>
                        <li><strong>Temperament:</strong> ` + data.temperament + `</li>
                        <li><strong>Feeding:</strong> ` + data.feeding + `</li>
                        <li><strong>Habitat:</strong> ` + data.habitat + `</li>
                        <li><strong>Lifespan:</strong> ` + data.lifespan + `</li>
                        <li><strong>Price:</strong> ` + data.price + `</li>
                    </ul>
                    <button class="btn btn-primary btn-l text-uppercase me-4" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-xmark me-1"></i>
                        Close Project
                    </button>
                    <button class="btn btn-success btn-l text-uppercase" type="button" onclick="SnakeService.addToCart(${data.id})">Add to cart</button>
                    `;
                $("#porfolioModalInfo").html(html);
                $("#portfolioModal").modal("show");

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $("#porfolioModalInfo").html("<p>There was an error loading the data. Please try again later.</p>");
            }
        });
    },

    best_seller: function() {
        console.log("poziva se");
        $.ajax({
            url: "rest/snakes/best_seller",
            type: "GET",
            success: function(data) {
                console.log("BEST SELLER", data);
                var html = "";
                console.log(data);
                if (data.length>0) {
                    console.log(data.length);
                    for (let i = 0; i < data.length; i++) {
                        html += `
                            <div class="col-lg-12 col-sm-6 mb-4">
                                <div class="portfolio-item">
                                    <a class="portfolio-link" data-bs-toggle="modal" onclick="event.preventDefault(); SnakeService.list_by_id(${data[i].id})">
                                        <div class="portfolio-hover">
                                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                        </div>
                                        <img class="img-fluid" src="assets/img/portfolio/${data[i].image}" alt="${data[i].common_name}"/>
                                    </a>
                                    <div class="portfolio-caption">
                                        <div class="portfolio-caption-heading">${data[i].common_name}</div>
                                        <div class="portfolio-caption-subheading text-muted">${data[i].price}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    html = "<p>No best-selling items found.</p>";
                }
                console.log("EVO I OVO RADI");
                $("#bestSellerItem").html(html);
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $("#bestSellerItem").html("<p>There was an error loading the data. Please try again later.</p>");
            }
        });
    },

    addToCart: function(id){
        console.log("RADI ADD TO CART");
        
    
        console.log("ajdi je id: ", id);
        $.ajax({
            url: "rest/snakes/" + id,
            type: "GET",
            success: function(data) {
                toastr.success("Item is added to cart");
                var cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Retrieve existing items or create an empty array
                var cartItem = { id: data.id, item: data }; // Create an object that includes the id and the item
                cartItems.push(cartItem); // Add the new item object to the array
                localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Store the updated array
                console.log("Stored items in localStorage: ", cartItems);
  },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $("#portofioItems").html("<p>There was an error loading the data. Please try again later.</p>");
            }
        });
    },


    getCartItems: function() {
        console.log("radi");
        
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        
        var summary = document.getElementById("summary");
        summary.innerHTML = ""; // Clear the summary element
        
        if (cartItems.length === 0) {
          var noItemsMessage = document.createElement("p");
          noItemsMessage.textContent = "There are no items in your cart.";
          summary.appendChild(noItemsMessage); // Display the no items message
        } else {
          cartItems.forEach(function(cartItem) {
            var commonName = cartItem.item.common_name; // Get the common name of the item
            
            var itemSummary = document.createElement("div");
            itemSummary.className = "cart-item-summary";
            
            var itemName = document.createElement("span");
            itemName.textContent = commonName;
            
            var quantityDropdown = document.createElement("select");
            quantityDropdown.className = "quantity-dropdown";
            for (var i = 1; i <= 10; i++) {
              var option = document.createElement("option");
              option.value = i;
              option.text = i;
              quantityDropdown.appendChild(option);
            }
            
            var removeButton = document.createElement("button");
            removeButton.className = "remove-button";
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function() {
              var itemId = cartItem.id; // Get the ID of the item to be removed
              SnakeService.removeCartItem(itemId); // Call the removeCartItem function with the item ID
            });
            
            itemSummary.appendChild(itemName);
            itemSummary.appendChild(quantityDropdown);
            itemSummary.appendChild(removeButton);
            summary.appendChild(itemSummary); // Append the item summary to the summary element
          });
          
          // Update the total price
          var totalPriceElement = document.getElementById("total-price");
          var totalPrice = calculateTotalPrice(cartItems); // You'll need to implement this function
          totalPriceElement.textContent = "TOTAL PRICE IS: $" + totalPrice;
        }
      },
      
      removeCartItem: function(itemId) {
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        
        // Find the index of the item with the matching ID
        var itemIndex = cartItems.findIndex(function(cartItem) {
          return cartItem.id === itemId;
        });
        
        if (itemIndex !== -1) {
          // Remove the item from the cartItems array
          cartItems.splice(itemIndex, 1);
          
          // Update the cart items in local storage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          
          console.log("Item removed from cart: ", itemId);
          
          // Refresh the cart items display
          SnakeService.getCartItems();
        }
      },
      
      
      
    };


