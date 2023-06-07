var OrderService = {
    confirmPurchase: function() {
        var order = {};
        order.user_name = $('#name').val();
        order.email = $('#email').val();
        order.phone_number = $('#phone_number').val();
        order.country = $('#country').val();
        order.city = $('#city').val();
        order.address = $('#address').val();
        order.postal_code = $('#postal_code').val();
        var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        order.date = currentDate;
        var getCart = JSON.parse(localStorage.getItem("cartItems"));
        var itemIds = [];
        for (let i = 0; i < getCart.length; i++)
             {

                const item = getCart[i].id;
                itemIds[i] = item;
             }
        order.item_id = JSON.stringify(itemIds);
        order.status = "active";

        var totalPrice = 0;

        console.log("Ovo je cart: ", getCart);

        for (let i = 0; i < getCart.length; i++) {
            const item = getCart[i].item;
            console.log("ime " ,item.common_name);
            console.log(getCart.length)
            totalPrice += parseFloat(item.price);
          }

        order.total_price = totalPrice;
    
        $.ajax({
            url: 'rest/order',
            type: 'POST',
            data: JSON.stringify(order),
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                toastr.success('Item ordered successfully');
                $('#name').val('');
                $('#email').val('');
                $('#phone_number').val('');
                $('#country').val('');
                $('#city').val('');
                $('#address').val('');
                $('#postal_code').val('');
                localStorage.removeItem("cartItems"); 
                SnakeService.getCartItems(); 
                SnakeService.getTotalPrice();
             },
            error: function(jqXHR, textStatus, errorThrown) {
                toastr.error(jqXHR.responseJSON.message);
            }
        });
    },


    listOrders:function(){
        $.ajax({
            url: `rest/order`,
            type: "GET",
            
            success: function(data) {
            $("#new-order-list").html("");
            console.log(data);
            var html = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].status === "active") {
                    html += `
                      <tr>
                          <td>${data[i].user_name}</td>
                          <td>${data[i].country}</td>
                          <td>${data[i].item_id}</td>
                          <td>${data[i].total_price}</td>
                          <td>${data[i].status}</td>
          
                          <td>
                          <button class="btn btn-primary btn-sm" onclick="OrderService.readMessage(${data[i].id})">Read</button>
                          <button class="btn btn-success btn-sm" onclick="OrderService.completeOrder(${data[i].id})">Complete Order</button>
                          </td>
                      </tr>
                      `;
                  }
                }
            $("#new-order-list").html(html);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest.responseJSON.message);
            loginService.logout();
            }
        });
        },



        readMessage:function(id){
            $.ajax({
                url: `rest/order/` + id,
                type: `GET`,
                success: function(data) {
                    $("#readOrderModalInfo").html("");
                    var html = "";
                    html = `
                    <h2 class="text-uppercase">${data.user_name}</h2>
                    <p class="item-intro text-muted">Email: <br>${data.email}</p>

                    <ul class="list-inline">
                        <li><strong>Country: </strong>${data.country}</li>
                        <li><strong>City: </strong>${data.city}</li>
                        <li><strong>Phone Nubmer: </strong>${data.phone_number}</li>
                        <li><strong>Address: </strong>${data.address}</li>
                        <li><strong>Postal Code: </strong>${data.postal_code}</li>
                        <li><strong>Date of order: </strong>${data.date}</li>
                        <li><strong>Items ID: </strong>${data.item_id}</li>
                        <li><strong>Status: </strong>${data.status}</li>
                        <li><strong>Total Price: </strong>${data.total_price}$</li>
                    </ul>                  
                    <button class="btn-primary-modal btn-l text-uppercase me-4" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-xmark me-1"></i>
                        Close Project
                    </button>
                    <button class="btn-success-modal btn-l text-uppercase save-edit-button" type="button" onclick="OrderService.completeOrder('${data.id}')">Complete Order</button>
                    `;
                    $("#readOrderModalInfo").html(html);
                    $("#readOrderModal").modal("show");
                    toastr.success("Poziva se read item");
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error(XMLHttpRequest.responseJSON.message);
                  }
            });
        },

        completeOrder: function(id){
            var order = {};
            if (order.status = 'active'){
                order.status = 'finished';
            
            console.log(id);
            $.ajax({
                url: `rest/order/` + id,
                type: `PUT`,
                data: JSON.stringify(order),
                contentType: "application/json",
                dataType: "json",
                success: function(result) {
                    
                    console.log("Status: ",order.status);
                    OrderService.listOrders();
                    console.log(result);
                    toastr.success("Called Complete order");
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error(XMLHttpRequest.responseJSON.message);
                  }
            });
        }
        else{
            toastr.error("Status cannot be changed!");
        }
        },



        listFinishedOrders: function(){
            $.ajax({
                url: `rest/order`,
                type: "GET",
                
                success: function(data) {
                $("#finished-order-list").html("");
                console.log(data);
                var html = "";
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status === "finished") {
                        html += `
                          <tr>
                              <td>${data[i].user_name}</td>
                              <td>${data[i].country}</td>
                              <td>${data[i].item_id}</td>
                              <td>${data[i].total_price}</td>
                              <td>${data[i].status}</td>
              
                              <td>
                              <button class="btn btn-primary btn-sm" onclick="OrderService.readFinishedOrderMessage(${data[i].id})">Read</button>
                              <button class="btn btn-danger btn-sm" onclick="OrderService.deleteOrder(${data[i].id})">Delete Order</button>
                              </td>
                          </tr>
                          `;
                      }
                    }
                $("#finished-order-list").html(html);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(XMLHttpRequest.responseJSON.message);
                loginService.logout();
                }
            });
        },



        readFinishedOrderMessage:function(id){
            $.ajax({
                url: `rest/order/` + id,
                type: `GET`,
                success: function(data) {
                    $("#readOrderModalInfo").html("");
                    var html = "";
                    html = `
                    <h2 class="text-uppercase">${data.user_name}</h2>
                    <p class="item-intro text-muted">Email: <br>${data.email}</p>

                    <ul class="list-inline">
                        <li><strong>Country: </strong>${data.country}</li>
                        <li><strong>City: </strong>${data.city}</li>
                        <li><strong>Phone Nubmer: </strong>${data.phone_number}</li>
                        <li><strong>Address: </strong>${data.address}</li>
                        <li><strong>Postal Code: </strong>${data.postal_code}</li>
                        <li><strong>Date of order: </strong>${data.date}</li>
                        <li><strong>Items ID: </strong>${data.item_id}</li>
                        <li><strong>Status: </strong>${data.status}</li>
                        <li><strong>Total Price: </strong>${data.total_price}$</li>
                    </ul>                  
                    <button class="btn-primary-modal btn-l text-uppercase me-4" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-xmark me-1"></i>
                        Close Project
                    </button>
                    <button class="btn-success-modal btn-l text-uppercase save-edit-button" type="button" onclick="OrderService.deleteOrder('${data.id}')">Delete Order</button>
                    `;
                    $("#readOrderModalInfo").html(html);
                    $("#readOrderModal").modal("show");
                    toastr.success("Poziva se read item");
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error(XMLHttpRequest.responseJSON.message);
                  }
            });
        },


        deleteOrder: function(id){
            $.ajax({
                url: `rest/order/` + id,
                type: `DELETE`,
                success: function(result) {
                    OrderService.listFinishedOrders();
                    console.log(result);
                    toastr.success("You deleted successfully");
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error(XMLHttpRequest.responseJSON.message);
                  }
            });
        },



    }