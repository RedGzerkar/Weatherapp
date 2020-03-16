// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var locationIndex = localStorage.getItem('LocArray' + "-selectedLocation"); 
if (locationIndex !== null)
// THe below code is called when the location index isnt null
{   
    var locArra=JSON.parse(localStorage.getItem('LocArray'))
    var cropTab=JSON.parse(localStorage.getItem('CropArray'))
    var locObjectInd=locArra[locationIndex]
    var lat=locObjectInd._lat
    var long=locObjectInd._long
    // Gets the current date
    var today=new Date()
    var todaySimple=today.simpleDateString()
    document.getElementById("currentDate").innerHTML=todaySimple
    var dateEntered
    myMap(lat,long)
    var locationName = locObjectInd._sName+','+locObjectInd._citName+','+locObjectInd._conName
    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent = locationName;
    jsonpRequest("https://api.darksky.net/forecast/407b9cc637acf002c36c11536cc67857/",lat,long)
    tableCreate(cropTab,today)
    
}
document.getElementById("dateInput").addEventListener("change", function() {
// If the date is selected then creates a new date and stores it into dateentered
    var input = this.value;
    dateEntered = new Date(input);
})
function checkSeason(date){
// Checks what the season is
    var mon=date.getMonth()+1
    var season
    // It uses months to find the correct season
    if (mon===9||mon===10||mon===11){
        season='Spring'
    }
    else if(mon===12||mon===1||mon===2){
        season='Summer'
    }
    else if(mon===3||mon===4||mon===5){
        season='Autumn'
    }
    else{
        season='Winter'
    }
    return season
}

function checkSurvival(cObject,cTemp){
// Checks if a crop will survive in the current temperature and if it does not how many days it will survive
    var maxTemp=cObject._maxsafetem
    var minTemp=cObject._minsafetem
    var CurrentTemp= cTemp
    var offset=cObject._lowYieldOffset
    var tolerance=cObject._tolerance
    // The if else structure is used to store info into check
    if (CurrentTemp>maxTemp+offset ) {
            var  degreesPast = abs(CurrentTemp - (maxTemp + offset))
            survivalDays=tolerance/(degreesPast+1)
            var check='Survival: '+survivalDays
    }
    else if (CurrentTemp<minTemp- offset){

            var  degreesPast = abs(CurrentTemp - (maxTemp - offset))
            survivalDays=tolerance/(degreesPast+1)
            var check='Survival: '+survivalDays
    }
    else if(CurrentTemp>maxTemp && CurrentTemp<=maxTemp+offset){
            var check='Low yield'
    }
    else if(CurrentTemp>=minTemp- offset && CurrentTemp<minTemp){
        var check='Low yield'
    }
    else{
        var check='High yield'
    }
    return check
}
var getWea = function(dateEntered){
    // This function gets info from the website and updates the table to reflect the new weather
    dates=dateEntered.simpleDateString()
    getSpecWeather('https://api.darksky.net/forecast/407b9cc637acf002c36c11536cc67857/',lat,long,dates)
    clearBox('table')
    document.getElementById("currentDate").innerHTML=dates
    tableCreate(cropTab,dateEntered)
    
}
function tableCreate(tabObj,date) {
// This function takes the input object and the date and then it aorts it into an array to show how it would 
// react to the weather for that day
    var tabNames=tabObj
    var season=checkSeason(date)
    var body = document.getElementById('table');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '0');
    tbl.setAttribute('cellspacing','0')
    tbl.setAttribute('cellpadding','0')
    var tbdy = document.createElement('tbody');
    var header=['Name','Min safe temp(F)','Max safe temp(F)','Season','Tolerance (Days)','Low Yield Off(F)']
    var tr = document.createElement('tr');
    // The below loop inserts headers into the table 
        for (var j = 0; j < Object.keys(tabNames[0]).length; j++) {
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(header[j]))
                tr.appendChild(th)    
        }
        var th = document.createElement('th');
        th.appendChild(document.createTextNode('Yield'))
        tr.appendChild(th)
        var th = document.createElement('th');
        th.appendChild(document.createTextNode('In Season'))
        tr.appendChild(th)
        tr.appendChild(th)
        tbdy.appendChild(tr);
        // The below loop inserts corp and survival info into the table
        for (var i = 0; i < tabNames.length; i++) {
            var props=Object.values(tabNames[i])
            var chSeason=tabNames[i]._season
            var tr = document.createElement('tr');
            for (var j = 0; j < Object.keys(tabNames[i]).length; j++) {
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(props[j]))
                    tr.appendChild(td)

            }
        var td = document.createElement('td');
        var Surv= checkSurvival(tabNames[i],document.getElementById("temp").value)
        td.appendChild(document.createTextNode(Surv))
        tr.appendChild(td)
        var td = document.createElement('td');
        // Checks if the crop is in season
        if (season===chSeason){
            res='Yes'
        }
        else{
            res='No'
        }
        td.appendChild(document.createTextNode(res))
        tr.appendChild(td)
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}
function clearBox(elementID)
// Clears table when called
{
    document.getElementById(elementID).innerHTML = "";
}


    
function getSpecWeather(url, data,data2,data3)
// The function gets the info for a certain day in the last year
        {
        var script = document.createElement('script');
        script.src = url + data+','+data2+','+data3+'T12:00:00?callback='+"getWeather";
        document.body.appendChild(script);
    }

function getWeather(weaInfo){
// The function inputs weather info into table at html
        document.getElementById("sum").innerHTML =weaInfo.currently.summary
        document.getElementById("temp").innerHTML=weaInfo.currently.temperature
        document.getElementById("lowTemp").innerHTML= weaInfo.daily.data[0].temperatureLow
        document.getElementById("highTemp").innerHTML=weaInfo.daily.data[0].temperatureHigh
        document.getElementById("vis").innerHTML=weaInfo.currently.visibility
    }  
    
function deleteLocation(n){
// This function removes a location from the local storage and returns to main page
    var locList=JSON.parse(localStorage.getItem('LocArray'))
    locList.splice(n,1);
    localStorage.setItem('LocArray', JSON.stringify(locList))
    location.href = 'index.html'
}
    
    
    
