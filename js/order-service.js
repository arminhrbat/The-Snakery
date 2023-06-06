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
                html += `
            <tr>
                <td>${data[i].user_name}</td>
                <td>${data[i].country}</td>
                <td>${data[i].item_id}</td>
                <td>${data[i].total_price}</td>
                <td>${data[i].status}</td>

                <td>
                <button class="btn btn-primary btn-sm" onclick="ContactUsService.readMessage(${data[i].id})">Read</button>
                <button class="btn btn-danger btn-sm" onclick="ContactUsService.deleteMessage(${data[i].id})">Delete</button>
                </td>
            </tr>
            `
            }
            $("#new-order-list").html(html);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest.responseJSON.message);
            loginService.logout();
            }
        });
        },
    }