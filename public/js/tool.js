$(document).ready(() => {
    var MemeCanvas = new fabric.Canvas('MemeCanvas', {
        width: 500,
        height: 700,
        backgroundColor: "white"
    });

    console.log(MemeCanvas)




    var pixabayApiKey = '29631978-3c4be564185a97a0cedae0ebb';

    $('#pixabay-search-btn').click(() => {
        $('#pixabay-loading-spinner').removeClass('d-none')
        let fieldValue = $('#pixabay-search-field').val();
        let URL = "https://pixabay.com/api/?key=" + pixabayApiKey + "&q=" + encodeURIComponent(fieldValue);
        $.get(URL, function (data, status) {
            if (status === "success") {
                let images = "";
                data.hits.map((item, index) => {
                    images += `<img src='${item.previewURL}' class='border net-image' data-originalurl='${item.largeImageURL}' alt='${item.tags}'>`;
                })
                $('#pixabay-image-container').html(images);
            }
            $('#pixabay-loading-spinner').addClass('d-none')
        });
    });
    $('#pixabay-search-btn').click();

    function loadAllEmojis() {
        $.get('https://api.github.com/emojis', (data, status) => {
            if (status === "success") {
                let images = "";
                for (const key in data) {
                    images += `<img src='${data[key]}' class="border net-image" data-originalurl='${data[key]}' alt='${key}' />`
                }
                $('#emojis-container').html(images);
            }
        })
    }

    loadAllEmojis();

    function loadMemeTemplates() {
        $.get('https://api.imgflip.com/get_memes', (data, status) => {
            if (data.success) {
                let images = "";
                console.log(data);
                data.data.memes.map((item, index) => {
                    images += `<img class="border net-image" src='${item.url}' data-originalurl='${item.url}' alt='${item.name}' />`;
                });
                $('#templates-image-container').html(images);

            }
        })

    }
    loadMemeTemplates()




    $('#shapes-cirlce-card').click(() => {
        let myCircle = new fabric.Circle({
            radius: 50,
            fill: 'red',
            left: 100,
            top: 100,
            stroke: 'black',
            strokeWidth: 5,
            fill: 'rgba(0,0,0,0)'
        });
        MemeCanvas.add(myCircle)
    });
    $('#shapes-rectangular-card').click(() => {
        let myRectangular = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 5,
            fill: 'rgba(0,0,0,0)',
            height: 80,
            width: 200
        });
        MemeCanvas.add(myRectangular)
    });

    $('#shapes-polygon-card').click(() => {
        let polygonPoints = [
            { x: 850, y: 75 },
            { x: 958, y: 137.5 },
            { x: 958, y: 262.5 },
            { x: 850, y: 325 },
            { x: 742, y: 262.5 },
            { x: 742, y: 137.5 }];

        let myPolygon = new fabric.Polygon(polygonPoints, {
            top: 100,
            left: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'black',
            strokeWidth: 5
        });
        MemeCanvas.add(myPolygon)
    });

    $('#shapes-square-card').click(() => {
        let mySquare = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 5,
            fill: 'rgba(0,0,0,0)',
            height: 100,
            width: 100
        });
        MemeCanvas.add(mySquare)

    });

    $('#shapes-star-card').click(() => {
        let starPoints = [
            { x: 350, y: 75 },
            { x: 380, y: 160 },
            { x: 470, y: 160 },
            { x: 400, y: 215 },
            { x: 423, y: 301 },
            { x: 350, y: 250 },
            { x: 277, y: 301 },
            { x: 303, y: 215 },
            { x: 231, y: 161 },
            { x: 321, y: 161 }
        ];
        let myStar = new fabric.Polygon(starPoints, {
            top: 100,
            left: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'black',
            strokeWidth: 5
        });
        MemeCanvas.add(myStar)


    });

    $('#shapes-triangle-card').click(() => {
        let myTriangle = new fabric.Triangle({
            top: 100,
            left: 100,
            width: 140,
            height: 100,
            fill: 'rgba(0,0,0,0)',
            stroke: 'black',
            strokeWidth: 5
        });
        MemeCanvas.add(myTriangle);
    });

    $('#upload-custom-image').change(function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var img = new fabric.Image(image);
                img.set({
                    left: 100,
                    top: 100
                });
                img.scaleToWidth(200);
                MemeCanvas.add(img).setActiveObject(img).renderAll();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    });
    $('.local-image').click(function (e) {
        var image = new Image();
        image.src = e.target.src;
        image.onload = function () {
            var img = new fabric.Image(image);
            img.set({
                left: 100,
                top: 100
            });
            img.scaleToWidth(200);
            MemeCanvas.add(img).setActiveObject(img).renderAll();
        }
    });

    $(document).on("click", ".net-image", function (e) {
        let imageSrc = $(this).data('originalurl');
        fabric.Image.fromURL(imageSrc, function (oImg) {

            oImg.set({
                left: 100,
                top: 100
            });
            oImg.scale(0.3);
            MemeCanvas.add(oImg).setActiveObject(oImg).renderAll();;
        }, {
            crossOrigin: "Anonymous",
        });
    });
    MemeCanvas.on('object:moving', function (e) {
        var obj = e.target;
        // if object is too big ignore
        if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
        }
    });
    MemeCanvas.on('object:selected', function (e) {

    })
    MemeCanvas.on('object:added', function (e) {
        selectedObject = e.target;
    })
    MemeCanvas.on('selection:updated', function (e) {
        console.log(e)
        //...
    });

    MemeCanvas.on('selection:created', function (e) {
        selectedObject = e.selected[0];
        //...
    });
    MemeCanvas.on('selection:cleared', function (e) {
        selectedObject = null;
        //...
    });

    $('#meme-export-btn').click(function () {
        $(this).attr('href', MemeCanvas.toDataURL({ format: "png", quality: '1' }));
        $(this).attr('download', "meme.png");
    });
    // $('#export_jpeg').click(function () {
    //     $(this).attr('href', myCanvas.toDataURL({ format: "jpeg", quality: '1' }));
    //     $(this).attr('download', "meme.jpeg");
    // });

    $('#typography-add-text-btn').click(() => {
        myText = new fabric.IText('Hello World', {
            left: 100,
            top: 100,
            fontSize: 20,
            fontFamily: "Arial"
        });
        MemeCanvas.add(myText);
    })

    $('#delete-object-btn').click(() => {
        MemeCanvas.getActiveObjects().forEach((obj) => {
            MemeCanvas.remove(obj)
        });
        MemeCanvas.discardActiveObject().renderAll()
    })
    $('#send-to-back-btn').click(() => {
        let selectedObject = MemeCanvas.getActiveObject();
        MemeCanvas.sendToBack(selectedObject)
        MemeCanvas.discardActiveObject().renderAll()
    })
    $('#bring-to-front-btn').click(() => {
        
        let selectedObject = MemeCanvas.getActiveObject();
        MemeCanvas.bringToFront(selectedObject)
        MemeCanvas.discardActiveObject().renderAll()
    })

    $('#typography_add_btn').click(() => {
        var itext = new fabric.IText('Hello World', {
            left: 100,
            top: 150,
            fontSize: 20,
            fontFamily: "Arial"
        });
        MemeCanvas.add(itext);
    });
});

