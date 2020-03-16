
var locClick = function(){  
// This function is called when the view button is clicked and centers the map to show the given location it also creates a new location object.
    var subName = document.getElementById("sub").value;
    var conName = document.getElementById("coun").value;
    var citName = document.getElementById("cit").value;
    var data = {
        location: subName+','+conName+','+citName,
        callback: "getLatLong"
    }
    geoQuestObjJs=jsonpRequest("http://www.mapquestapi.com/geocoding/v1/address?key=Uj6gjJPDoomghd3ZeIiNY0GKqpbXE4zp&location=",data)
}
var addClick = function(){ 
    locToStor(locationObj)
}

function locToStor(locationObj)
// This function stores the new location object to localstorage
    {
        var existing = JSON.parse(localStorage.getItem('LocArray'));
        existing.push(locationObj);
        localStorage.setItem('LocArray', JSON.stringify(existing));
        location.href = 'index.html'
    }
function jsonpRequest(url, data)
// This function processes the url and given data to an url that retrieves the requested data
    {
        // Build URL parameters from data object.
        var params = "";
        // For each key in data object...
        for (var key in data)
        {
            if (data.hasOwnProperty(key))
            {
                if (params.length == 0)
                {
                    // First parameter starts with '?'
                    params += "?";
                }
                else
                {
                    // Subsequent parameter separated by '&'
                    params += "&";
                }

                var encodedKey = encodeURIComponent(key);
                var encodedValue = encodeURIComponent(data[key]);

                params += encodedKey + "=" + encodedValue;
             }
        }
        var script = document.createElement('script');
        script.src = url + params;
        document.body.appendChild(script);
    }
function getLatLong(mapQuest){
// Using the recieved data from the website and creates a new location object and centers it at the location
    var subName = document.getElementById("sub").value;
    var conName = document.getElementById("coun").value;
    var citName = document.getElementById("cit").value;
    var nickName = document.getElementById("nick").value;
    var addressObj=mapQuest.results
    var addressObj=addressObj[0].locations
    var latLonObj=addressObj[0].latLng
    if (subName!=='' && conName!==''&& latLonObj.lat!=='' && latLonObj.long!=='')
    // This checks if all the input data is valid and creates the object
        { locationObj=new locations1(subName,conName,citName,latLonObj.lat, latLonObj.lng, nickName)
// The below function centers the map to the submitted location
    myMap(latLonObj.lat,latLonObj.lng)
    return locationObj}
}


