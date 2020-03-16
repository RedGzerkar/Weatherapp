// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

// Below code gets the location and crop list from the local storage
var locationList=JSON.parse(localStorage.getItem('LocArray'))
var cropList=JSON.parse(localStorage.getItem('CropArray'))
genLocList(locationList,'loc')
genCropList(cropList,'cro')
function viewLocation(locationName)
// This function moves to the view location page for the target location
{
    // Save the desired location to local storage
    localStorage.setItem('LocArray' + "-selectedLocation", locationName);
    // And load the view location page.
    location.href = 'viewLocation.html';
}

function genLocList(locArray,dive){
// This function takes the location list from local storage and shows it as a list in the html and also adds the function viewlocation on click
    for(i=0;i<locArray.length;i++){
        var location = document.createElement("div");
        location.setAttribute("id", "locDiv"+i)
        location.setAttribute("onclick", "viewLocation("+i+")")
        var name=locArray[i]
        if (name._name!=='')
            {location.innerHTML = name._name;}
        else
            {location.innerHTML=name._sName+','+name._citName+','+name._conName}
        document.getElementById(dive).appendChild(location);
    }
}
function genCropList(cropArray,dive){
// This function takes the crop list from local storage and shows it as a list in the html and also adds the function deleteCrop on click
    for(i=0;i<cropArray.length;i++){
        var crop = document.createElement("div");
        crop.setAttribute("id", "cropDiv"+i)
        crop.setAttribute("onclick", "deleteCrop("+i+")")
        var name=cropArray[i]
        crop.innerHTML=name._name
        document.getElementById(dive).appendChild(crop);
    }
    }    
function deleteCrop(n){
// This function removes the crop at index n from the html list and the local storage
    id='cropDiv'+n
    var cropList=JSON.parse(localStorage.getItem('CropArray'))
    cropList.splice(n,1);
    localStorage.setItem('CropArray', JSON.stringify(cropList))
    document.getElementById(id).innerHTML = ""
}
    