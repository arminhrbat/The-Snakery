
var adminItemsManage = {
    
        listItems: function(){
        $.ajax({
            url: `rest/admin/snakes`,
            type: "GET",
            
            success: function(data) {
            $("#admin-items-list").html("");
            console.log(data);
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += `
            <tr>
                <td>${data[i].scientific_name}</td>
                <td>${data[i].price} $</td>
                <td>
                <button class="btn btn-primary btn-sm" onclick="adminItemsManage.editItem(${data[i].id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="adminItemsManage.deleteItem(${data[i].id})">Delete</button>
                </td>
            </tr>
            `
            }
            $("#admin-items-list").html(html);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            toastr.error(XMLHttpRequest.responseJSON.message);
            loginService.logout();
            }
        });
        },


        deleteItem: function(id){
            $.ajax({
                url: `rest/admin/snakes/` + id,
                type: `DELETE`,
                success: function(result) {
                    adminItemsManage.listItems();
                    console.log(result);
                    toastr.success("You deleted successfully");
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error(XMLHttpRequest.responseJSON.message);
                  }
            });
        },


        editItem: function(id){
            $('#editItemModalInfo').html('loading...');

            $.ajax({
                url: `rest/admin/snakes/` + id,
                type: `GET`,
                success: function(data) {
                    $("#editItemModalInfo").html("");
                    var html = "";
                    html = `
                    <h2 class="text-uppercase"><input id="common_name" type="text" value="${data.common_name}"></h2>
                    <p class="item-intro text-muted">Rarity: <br> <input id="rarity" type="text" value="${data.rarity}"></p>
                    <p><textarea id="description">${data.description}</textarea></p>

                    <ul class="list-inline">
                        <li><strong>Scientific Name:</strong> <input id="scientific_name" type="text" value="${data.scientific_name}"></li>
                        <li><strong>Common Name:</strong> <input id="common_name" type="text" value="${data.common_name}"></li>
                        <li><strong>Appearance:</strong> <input id="appearance" type="text" value="${data.appearance}"></li>
                        <li><strong>Temperament:</strong> <input id="temperament" type="text" value="${data.temperament}"></li>
                        <li><strong>Feeding:</strong> <input id="feeding" type="text" value="${data.feeding}"></li>
                        <li><strong>Habitat:</strong> <input id="habitat" type="text" value="${data.habitat}"></li>
                        <li><strong>Lifespan:</strong> <input id="lifespan" type="text" value="${data.lifespan}"></li>
                        <li><strong>Image:</strong> <input id="image" type="file" value="${data.image}"></li>
                        <li><strong>Price:</strong> <input id="price" type="text" value="${data.price}"></li>
                        <li>
                        <strong>Best seller:</strong>
                        <select id="best_seller">
                            <option value="jeste" ${data.best_seller === "jeste" ? "selected" : ""}>jeste</option>
                            <option value="nije" ${data.best_seller === "nije" ? "selected" : ""}>nije</option>
                        </select>
                    </li>                    <button class="btn-primary-modal btn-l text-uppercase me-4" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-xmark me-1"></i>
                        Close Project
                    </button>
                    <button class="btn-success-modal btn-l text-uppercase save-edit-button" type="button" onclick="adminItemsManage.update('${data.id}')">Save</button>
                    `;
                    $("#editItemModalInfo").html(html);
                    $("#editItemModal").modal("show");
                    toastr.success("Poziva se edit item");
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error(XMLHttpRequest.responseJSON.message);
                  }
            });
        },

        addItems: function(){
            var snakes = {};
            snakes.scientific_name = $('#scientific_name').val();
            snakes.common_name = $('#common_name').val();
            snakes.appearance = $('#appearance').val();
            snakes.feeding = $('#feeding').val();
            snakes.temperament = $('#temperament').val();
            snakes.habitat = $('#habitat').val();
            snakes.lifespan = $('#lifespan').val();
            snakes.price = $('#price').val();
            snakes.rarity = $('#rarity').val();
            snakes.image = $('#image').val();
            snakes.description = $('#description').val();
            snakes.best_seller = $('#best_seller').val();
            $.ajax({
                url: 'rest/admin/snakes',
                type: 'POST',
                data: JSON.stringify(snakes),
                contentType: "application/json",
                dataType: "json",
                success: function(result) {
                    toastr.success('Item added successfully');
                    $('#scientific_name').val("");
                    $('#common_name').val("");
                    $('#appearance').val("");
                    $('#feeding').val("");
                    $('#habitat').val("");
                    $('#temperament').val("");
                    $('#lifespan').val("");
                    $('#rarity').val("");
                    $('#price').val("");
                    $('#image').val("");
                    $('#description').val("");
                    $('#best_seller').val("");
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    toastr.error(jqXHR.responseJSON.message);
                  }
                });
            },

            update: function(id){
                console.log(id);
                var snakes = {};
                snakes.scientific_name = $('#scientific_name').val();
                snakes.common_name = $('#common_name').val();
                snakes.appearance = $('#appearance').val();
                snakes.feeding = $('#feeding').val();
                snakes.temperament = $('#temperament').val();
                snakes.habitat = $('#habitat').val();
                snakes.lifespan = $('#lifespan').val();
                snakes.price = $('#price').val();
                snakes.rarity = $('#rarity').val();
                snakes.image = $('#image').val();
                snakes.description = $('#description').val();
                snakes.best_seller = $('#best_seller').val();
            
                $.ajax({
                  url: 'rest/admin/snakes/'+ id,
                  type: 'PUT',
                  data: JSON.stringify(snakes),
                  contentType: "application/json",
                  dataType: "json",
                  success: function(result) {
                    console.log(snakes.best_seller);
                    console.log("RADI");
                    toastr.success('Item updated successfully');
                    $("#editItemModal").modal("hide");
                    adminItemsManage.listItems(); // perf optimization
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    toastr.error(jqXHR.responseJSON.message);
                  },
                });
              },


              
    
    }
