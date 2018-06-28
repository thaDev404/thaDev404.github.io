$(function(){
    //Invoked when the submit button is clicked
    function makeGrid() {
        
        // Select size input
        let canvasHeight = $('#inputHeight').val();
        let canvasWidth = $('#inputWidth').val();

        //Selector for table
        let designCanvasDraw = $('#pixelCanvas');

        //Clear pre existing table grid
        designCanvasDraw.children().remove();

        //Loop through required row and columns to creat a table grid
        for (let row = 0; row <= canvasHeight; row++){
            let tr = $('<tr></tr>');
            designCanvasDraw.append(tr);
            for (let col = 0; col <= canvasWidth; col++) {
                tr.append('<td></td>');
            }
        }
    }

    //Changes the cursor to cell style, when the mouse hovers above the table grid
    $('#pixelCanvas').hover(function(){
        $(this).css('cursor','cell')
    }, function(){
        $(this).css('cursor', 'auto')
    });

    //Resets the backgroundColor of the entire table grid when reset canvas button is  clciked
    $('#resetCanvas').click(function(event){
        event.preventDefault();
        $('td').css('backgroundColor', 'transparent');
    });

    // When size is submitted by the user, collect input height & widht, then call makeGrid()
    $('#createTable').click(function(event){
        event.preventDefault();
        //Alerts if the user clicks submit without picking a color
        if($('#col').text() === ''){
            alert('Please pick a color'); 
        } else{
            makeGrid();
            $('.canvasControl').css('visibility', 'visible');
        } 
    });

    /* 
    Design Canvas controls
    Ctrl + mouse hover on Design Canvas to Draw
    Shift + mouse hover on Design Canvas to Erase
    */ 
    $('#pixelCanvas').on('mouseover', 'td', function(evt){
        evt.preventDefault();
        let colorPicked = $('#col').text();
        let activeTD = evt.target;
        if (evt.ctrlKey){
            $(activeTD).css('background-color', colorPicked);
        } else if (evt.shiftKey){
            $(activeTD).css('background-color', 'transparent');
        }    
    });

    //Creates a downloadable image of the design canvas in png format
    document.getElementById('downloadCanvas').addEventListener('click', function() {
        html2canvas(document.getElementById('pixelCanvas')).then(function(canvas) {
        const base64image = canvas.toDataURL('image/png');
        document.getElementById('startDownload').href = base64image;
        document.getElementById('startDownload').click()
        });
    });

    //Creates a download preview of the design canvas in png format
    document.getElementById('previewCanvas').addEventListener('click', function() {
        html2canvas(document.getElementById('pixelCanvas')).then(function(canvas) {
        const base64image = canvas.toDataURL('image/png');
        document.getElementById('downloadPreview').style.visibility = 'visible';
        document.getElementById('downloadPreview').src = base64image;
        });
    });
});