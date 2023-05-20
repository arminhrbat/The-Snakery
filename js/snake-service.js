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
                console.log(data);
                $("#porfolioModalInfo").html("");
                var html = "";
                    html += `
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
                    </ul>
                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                        <i class="fas fa-xmark me-1"></i>
                        Close Project
                    </button>
                    <button class="btn btn-success btn-xl text-uppercase" type="button">Purchase Now</button>
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
}    