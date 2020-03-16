// Code for the Add Crop page.

function cropToStor(cName, minTemp, maxTemp,season,tolerance,lowYOff)
// Stores added crop to local storage
    {
        var existing = JSON.parse(localStorage.getItem('CropArray'));
        cropObj=new Crop(cName, minTemp, maxTemp,season,tolerance,lowYOff)
        existing.push(cropObj);
        localStorage.setItem('CropArray', JSON.stringify(existing));
    }
var click1=function(){
// This function is called when add button is called and takes the input from the html and converts it into new crop object and stores it to local storage    
    var cName=document.getElementById('cName').value;
    var minTemp=document.getElementById('minTemp').value;
    minTemp=cenToFah(minTemp)
    var maxTemp=document.getElementById('maxTemp').value;
    maxTemp=cenToFah(maxTemp)
    var season=document.getElementById('season').value;
    var tolerance=document.getElementById('tolerance').value;
    var lowYOff=document.getElementById('lowYOff').value;
    lowYOff=cenToFah(lowYOff)
    if (cName!=='' && minTemp!==''&& maxTemp!=='' && season!=='' && tolerance!=='' && lowYOff!=='')
    // Checking if the inputs are valid
        {cropToStor(cName, minTemp, maxTemp,season,tolerance,lowYOff)
        }
    else{
        document.getElementById("error").innerHTML='The crop is not valid'
    }
}
function cenToFah(cen){
// The input is converted from degree celsius to fahrenheit
    var fah=cen*9/5+32
    return fah 
}


