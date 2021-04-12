$(document).ready(function(){
    let temas = ["Spider-Man", "Thor", "Loki", "Hulk", "Iron Man", "Capitan America", "Black Widow", "Vision"];
    let APIKEY = "EMBUyUqmcQ2r1TlUWcIc6xvoDsCutUEv"; 
    let giphyContent = null; 

    temas.forEach(function(item) {
        $('#giphy-buttons').append(`<button id="${item}" class="select"> ${item} </button>`);
    });
    
    $("#add-giphy").click(function(event){
        event.preventDefault();
        var inputValue = $("#giphy-input").val();
        temas.push(inputValue);
        $('#giphy-input').val("");
        $('#giphy-buttons').append(`<button id="${inputValue}" class="select"> ${inputValue} </button>`);
    })
    
    $('#giphy-buttons').on('click', '.select', function(event) {   
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        url = url + $.trim(this.id);
        $("#giphys").html("");

        fetch(url)
            .then(response => response.json())
            .then(content => {
                giphyContent = content.data;
                content.data.forEach(function(item){
                    $('#giphys').append(`<div class="giphy-item">
                            <p>Rating: ${item.rating}</p>
                            <img class="gif" id="${item.id}" src="${item.images.downsized_still.url}" alt="${item.title}" height="150">
                        </div>`);
                })
            })
            .catch(err => {
                console.error(err);
                alert("Hubo un error. Favor de intentar más tarde.");
            });
    })

    $('#giphys').on('click', '.gif', function() {   
        let id = this.id; 
        let currSrc = this.src; 
        let srcURL ="";
        giphyContent.forEach(function(item) {
            if(id == item.id){
                if(currSrc == item.images.downsized.url){
                    srcURL = item.images.downsized_still.url;
                } else {
                    srcURL = item.images.downsized.url; 
                }
            }
        });
        $(this).attr('src', srcURL);
    })
      
});