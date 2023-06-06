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
                    <button class="btn btn-success btn-l text-uppercase" type="button" onclick="SnakeService.addToCart(${data.id}); window.location.href = '#shopping_cart'">Add to cart</button>
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
                $("#portfolioModal").modal("hide");
                location.reload();
                
  },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $("#portofioItems").html("<p>There was an error loading the data. Please try again later.</p>");
            }
        });
    },


    getCartItems: function(id) {
        console.log("radi");
        console.log(localStorage.getItem("cartItems"));

        $.ajax({
            url: "rest/snakes/" + id,
            type: "GET",
            success: function(data) {
                console.log("OVO JE :" , data);
                var getCart =  JSON.parse(localStorage.getItem("cartItems"));

                var html="";

                for (let i = 0; i < getCart.length; i++)
                 {

                    const item = getCart[i].item;
                    console.log("Proba:::: ", data[i]);
                    html+=`<hr class="my-4">

                  <div class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <h6 class="text-muted">${item.common_name}</h6>
                    </div>
        
                    <div class="col-md-4 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 class="mb-1">${item.price}$</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a class="text-muted"><i class="fas fa-times" onclick="SnakeService.deleteFromCart(${item.id})"></i></a>
                    </div>
                  </div>`;
                     console.log(getCart[i]);
                 }
                 $("#summary").html(html);
                 SnakeService.getTotalPrice();

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    },

    getTotalPrice:function(){
        $.ajax({
          url: `rest/snakes`,
          type: "GET",
          success: function(data) {
            console.log(data);
            var getCart = JSON.parse(localStorage.getItem("cartItems"));
            
            var totalPrice = 0;

            console.log("Ovo je cart: ", getCart);

            for (let i = 0; i < getCart.length; i++) {
                const item = getCart[i].item;
                console.log("ime " ,item.common_name);
                console.log(getCart.length)
                totalPrice += parseFloat(item.price);
              }

            var html=`
            <p>TOTAL PRICE IS: ${totalPrice}$</p>
            `;
            console.log(totalPrice);
            $("#total-price").html(html);
    
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest.responseJSON.message);
            loginService.logout();
          }
        });
      },


      deleteFromCart:function(id){
        $.ajax({
            url: `rest/snakes`,
            type: "GET",
            success: function(data) {
                console.log("Data je u dlt: ", data);
                console.log(":----", id);
                var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      
                // Find the index of the item with the specified ID in the cartItems array
                var index = cartItems.findIndex(function(item) {
                    return item.id === id;
                });

                // If the item is found, remove it from the cartItems array
                if (index !== -1) {
                    cartItems.splice(index, 1);

                    // Store the updated cartItems back to local storage
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));

                    // Call the getCartItems function to update the displayed cart
                    SnakeService.getCartItems();
                }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(XMLHttpRequest.responseJSON.message);
                loginService.logout();
              }
            });
          },


         
        
}
