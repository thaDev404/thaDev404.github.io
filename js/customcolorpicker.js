/*
  Color Picker Pure CSS - By Shankar Cabus
  Inspired in Color Picker by Sanadas Young:
http://dribbble.com/shots/1177884-Color-Picker
*/

/*
  Not so pure anymore… ;-)
  Custom modified by me with jQuery
*/

//Writes values of R, G, & B to the DOM
function writeColors (r, g, b) {
  $(".value--r").text(r);
  $(".value--g").text(g);
  $(".value--b").text(b);
  
};

//Main color whell click function
$(".wheel").click(function(e) {
  var parentOffset = $(this).offset();
  var offX = e.pageX - parentOffset.left - 76;
  var offY = e.pageY - parentOffset.top - 76;

  // calculate degree of rotation to click position
  var calcDeg = (Math.atan2(offY, offX)) * (180 / Math.PI);

  // max and min rgb value
  var rgbHigh = 134;
  var rgbLow = 37;

  // difference between highest rgb value and lowest
  var rgbDiff = rgbHigh - rgbLow;

    /**
    *
    *  Rotate the Pin
    *
    */

  if (calcDeg < -89) {
    var actualDeg = 270 + (180 + calcDeg);
  }
  else {
    var actualDeg = 90 + calcDeg;
  }

    var rotateCss = "rotate("+actualDeg+"deg)";

    $(".wrapper__pin").css("transform", rotateCss);

    /**
    *
    *  Calculate Colors
    *
    */

  // check which half I'm in
  if (calcDeg >= 0) {

    // in what part of the half did the click happen?
    var percent = calcDeg / 180;

    if ( percent >= 0 && percent < 0.33) {
      // what position in the part did the click happen in
      var currentPos = percent / 0.33;
      // how much value must be deducted/added to the rgb value
      var rgbChange = rgbDiff * currentPos;
      // deduct value
      var rgbNew = Math.round(rgbHigh - rgbChange);
      // put value in css
      var cssValue = "rgb("+rgbLow+","+rgbHigh+","+rgbNew+")";
      $("h1").css("color", cssValue);
      $("#col").text(cssValue);
      writeColors (rgbLow, rgbHigh, rgbNew);
    }
    else if ( percent >= 0.33 && percent < 0.66) {
      // what position in the part did the click happen in
      var currentPos = (percent - 0.33) / 0.33;
      // how much value must be deducted/added to the rgb value
      var rgbChange = rgbDiff * currentPos;
      // deduct value
      var rgbNew = Math.round(rgbHigh + rgbChange);
      // put value in css
      var cssValue = "rgb("+rgbNew+","+rgbHigh+","+rgbLow+")";
      $("h1").css("color", cssValue);
      $("#col").text(cssValue);
      writeColors (rgbNew, rgbHigh, rgbLow);
    }
    else {
      // what position in the part did the click happen in
      var currentPos = (percent - 0.66) / 0.33;
      // how much value must be deducted/added to the rgb value
      var rgbChange = rgbDiff * currentPos;
      // deduct value
      var rgbNew = Math.round(rgbHigh - rgbChange);
      // put value in css
      var cssValue = "rgb("+rgbHigh+","+rgbNew+","+rgbLow+")";
      $("h1").css("color", cssValue);
      $("#col").text(cssValue);
      writeColors (rgbHigh, rgbNew, rgbLow);
    }
  }


  else {

    var percent = -(calcDeg / 180);

    if ( percent >= 0 && percent < 0.33) {
      // what position in the part did the click happen in
      var currentPos = percent / 0.33;
      // how much value must be deducted/added to the rgb value
      var rgbChange = rgbDiff * currentPos;
      // deduct value
      var rgbNew = Math.round(rgbHigh - rgbChange);
      // put value in css
      var cssValue = "rgb("+rgbLow+","+rgbNew+","+rgbHigh+")";
      $("h1").css("color", cssValue);
      $("#col").text(cssValue);
      writeColors (rgbNew, rgbLow, rgbHigh);
    }
    else if ( percent >= 0.33 && percent < 0.66) {
      // what position in the part did the click happen in
      var currentPos = (percent - 0.33) / 0.33;
      // how much value must be deducted/added to the rgb value
      var rgbChange = rgbDiff * currentPos;
      // deduct value
      var rgbNew = Math.round(rgbHigh + rgbChange);
      // put value in css
      var cssValue = "rgb("+rgbNew+","+rgbLow+","+rgbHigh+")";
      $("h1").css("color", cssValue);
      $("#col").text(cssValue);
      writeColors (rgbNew, rgbLow, rgbHigh);
    }
    else {
      // what position in the part did the click happen in
      var currentPos = (percent - 0.66) / 0.33;
      // how much value must be deducted/added to the rgb value
      var rgbChange = rgbDiff * currentPos;
      // deduct value
      var rgbNew = Math.round(rgbHigh - rgbChange);
      // put value in css
      var cssValue = "rgb("+rgbHigh+","+rgbLow+","+rgbNew+")";
      $("h1").css("color", cssValue);
      $("#col").text(cssValue);
      writeColors (rgbHigh, rgbLow, rgbNew);
    }
  }

 });
