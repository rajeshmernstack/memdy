$(document).ready(() => {
    var myCanvas = new fabric.Canvas('MemeCanvas', {
        width: 1000,
        height: 690,
        backgroundColor: "red"
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