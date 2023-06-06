var ContactUsService = {

    sendMessage: function(){

        if (!fname || !email || !phone || !message) {
            toastr.error('Please fill in all fields.');
            return;
          }
        var contact_us = {};
        contact_us.name = $('#fname').val();
        contact_us.email = $('#email').val();
        contact_us.phone = $('#phone').val();
        contact_us.message = $('#message').val();
       
        $.ajax({
            url: 'rest/contact_us',
            type: 'POST',
            data: JSON.stringify(contact_us),
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                toastr.success('Message sent successfully');
                $('#fname').val("");
                $('#email').val("");
                $('#phone').val("");
                $('#message').val("");
              },
              error: function(jqXHR, textStatus, errorThrown) {
                toastr.error(jqXHR.responseJSON.message);
              }
            });
        },


        list: function(){
            $.ajax({
                url: `rest/admin/contact_us`,
                type: "GET",
                
                success: function(data) {
                $("#message-list").html("");
                console.log(data);
                var html = "";
                for (let i = 0; i < data.length; i++) {
                    html += `
                <tr>
                    <td>${data[i].name}</td>
                    <td>
                    <button class="btn btn-primary btn-sm" onclick="ContactUsService.readMessage(${data[i].id})">Read</button>
                    <button class="btn btn-danger btn-sm" onclick="ContactUsService.deleteMessage(${data[i].id})">Delete</button>
                    </td>
                </tr>
                `
                }
                $("#message-list").html(html);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                toastr.error(XMLHttpRequest.responseJSON.message);
                loginService.logout();
                }
            });
            },


            deleteMessage: function(id){
                $.ajax({
                    url: `rest/admin/contact_us/` + id,
                    type: `DELETE`,
                    success: function(result) {
                        ContactUsService.list();
                        console.log(result);
                        toastr.success("You deleted successfully");
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                        toastr.error(XMLHttpRequest.responseJSON.message);
                      }
                });
            },

            readMessage: function(id){
                
                $.ajax({
                    url: `rest/admin/contact_us/` + id,
                    type: `GET`,
                    success: function(data) {
                        $("#readMessageModalInfo").html("");
                        var html = "";
                        html = `
                        <h2 class="text-uppercase">${data.name}</h2>
                        <p class="item-intro text-muted">Email: <br> ${data.email}</p>
                        <p>Message: <br>${data.message}</p>
                        `;
                        $("#readMessageModalInfo").html(html);
                        $("#readMessageModal").modal("show");
                        toastr.success("Poziva se read item");
                        
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        toastr.error(XMLHttpRequest.responseJSON.message);
                      }
                });
            },

}