$(function(){

    //Invoked when the submit button is clicked
    function makeGrid() {
        // Stores the users design canvas desired size input
        let canvasHeight = $('#input-height').val();
        let canvasWidth = $('#input-width').val();

        //Selector for design canvas
        let designCanvasDraw = $('#pixel-canvas');

        //Clears pre existing design canvas grid, before drawing a new one
        designCanvasDraw.children().remove();

        //Loop through required row and columns to create the design canvas
        for (let row = 1; row <= canvasHeight; row++){
            let tr = $('<tr></tr>');
            designCanvasDraw.append(tr);
            for (let col = 1; col <= canvasWidth; col++) {
                tr.append('<td></td>');
            }
        }
    }

    //Changes the cursor to cell style, when the mouse hovers above the table grid
    $('#pixel-canvas').hover(function(){
        $(this).css('cursor','cell')
    }, function(){
        $(this).css('cursor', 'auto')
    });

    /* 
        Design Canvas Controls
        Ctrl + mouse hover on Design Canvas to Draw
        Shift + mouse hover on Design Canvas to Erase
    */ 
    $('#pixel-canvas').on('mouseover', 'td', function(evt){
        let colorPicked = $('#col').text();
        let activeTD = evt.target;
        if (evt.ctrlKey){
            $(activeTD).css('background-color', colorPicked);
        } else if (evt.shiftKey){
            $(activeTD).css('background-color', 'transparent');
        }    
    });

    //Resets the backgroundColor of the entire table grid when reset canvas button is  clciked
    $('#reset-canvas').click(function(evt){
        evt.preventDefault();
        $('td').css('backgroundColor', 'transparent');
    });    

    /*
        Creates and initialises a download of the design canvas in png image format
        With the aid of html2canvas library.
        I decided to use barebone javascript, since html2canvas library was written in vanilla js
    */
    document.getElementById('download-canvas').addEventListener('click', function(evt) {
        evt.preventDefault();
        html2canvas(document.getElementById('pixel-canvas')).then(function(canvas) {
        const base64image = canvas.toDataURL('image/png');
        document.getElementById('start-download').href = base64image;
        document.getElementById('start-download').click()
        });
    });

    /*
        Creates a download preview of the design canvas in png format
        With the aid of html2canvas library
    */
    document.getElementById('preview-canvas').addEventListener('click', function(evt) {
        evt.preventDefault();
        html2canvas(document.getElementById('pixel-canvas')).then(function(canvas) {
        const base64image = canvas.toDataURL('image/png');
        document.getElementById('download-preview').style.visibility = 'visible';
        document.getElementById('download-preview').src = base64image;
        });
    });

    // When size is submitted by the user, collect input height & width, then call makeGrid()
    $('#create-table').click(function(evt){
        evt.preventDefault();
        //Alerts if the user clicks submit without picking a color
        if($('#col').text() === ''){
            alert('Please pick a color'); 
        } else{
            makeGrid();
            $('.canvas-control').css('visibility', 'visible');
        } 
    });
    
});