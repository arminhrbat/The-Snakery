
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
                    <h2 class="text-uppercase">` + data.common_name + `</h2>
                    <p class="item-intro text-muted">Rarity: <br> The pied ball python color morph is extremely rare in the wild</p>
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
                        <button class="btn-primary-modal btn-l text-uppercase me-4" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-xmark me-1"></i>
                        Close Project
                    </button>
                    <button class="btn-success-modal btn-l text-uppercase" type="button">Save</button>
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
            snakes.image = $('#image').val();
            snakes.description = $('#description').val();
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
                    $('#price').val("");
                    $('#image').val("");
                    $('#description').val("");
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    toastr.error(jqXHR.responseJSON.message);
                  }
                });
            },
    
    }
