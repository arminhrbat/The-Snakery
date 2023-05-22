var addItemsAdmin = {
    addItems: function(snakes){
    var snakes = {};
    snakes.scientific_name = $('#scientific_name').val();
    snakes.common_name = $('#common_name').val();
    snakes.scientific_name = $('#scientific_name').val();
    snakes.appearance = $('#appearance').val();
    snakes.feeding = $('#feeding').val();
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
      success: function(response) {
        // Handle success response
        console.log('Data added successfully:', response);
        // You can perform additional actions here, such as displaying a success message or refreshing the page
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle error response
        console.error('Error adding data:', errorThrown);
        // You can display an error message or perform other error handling actions here
      }
    })
    },
}