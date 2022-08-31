$(document).ready(() => {
    var pixabayApiKey = '29631978-3c4be564185a97a0cedae0ebb';

    $('#pixabay-search-btn').click(() => {
        $('#pixabay-image-container').html("<div class='spinner-grow text-primary' role='status'><span class='visually-hidden'>Loading...</span></div>");
        let fieldValue = $('#pixabay-search-field').val();
        let URL = "https://pixabay.com/api/?key="+pixabayApiKey+"&q="+encodeURIComponent(fieldValue);
        $.get(URL, function(data, status){
            $
            if(status === "success"){
                let images = "";
                console.log(data)
                data.hits.map((item, index) => {
                    images += `<img src='${item.previewURL}' class='border' alt='${item.tags}'>`;
                })
                $('#pixabay-image-container').html(images);
            }
        });
    })


    var myCanvas = new fabric.Canvas('MemeCanvas', {
        width: 700,
        height: 600,
        backgroundColor: "white"
    });

    console.log(myCanvas)

    $('#typography_add_btn').click(() => {
        var itext = new fabric.IText('Hello World', {
            left: 100,
            top: 150,
            fontSize: 20,
            fontFamily: "Arial"
        });
        myCanvas.add(itext);
        // console.log(itext)
    });
});

