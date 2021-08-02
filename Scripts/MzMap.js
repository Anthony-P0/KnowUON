// Maze docs: https://api.mazemap.com/js/v2.0.0/docs/#intro 
// MazeMap load
$(document).ready(function () {

        var myMap = new Mazemap.Map({
            container: 'map',
            campuses: 117,
            center: {lng: 151.704143, lat: -32.892697},
            zoom: 15.1,
            zLevel: 1,
            zLevelControl: false,
            scrollZoom: true,
            doubleClickZoom: true,
            touchZoomRotate: true
        });
    
        myMap.on('load', function(){
            var customZLevelBar1 = new Mazemap.ZLevelBarControl( {
                className: 'custom-zlevel-bar',
                autoUpdate: true,
                maxHeight: 300
            } );
            myMap.addControl( customZLevelBar1, 'bottom-right' );

            // Controls on click highlighting
            myMap.on('click', onMapClick);

            // Initialize a Highlighter for POIs
            // Storing the object on the map just makes it easy to access for other things
            myMap.highlighter = new Mazemap.Highlighter( myMap, {
                showOutline: true, // optional
                showFill: true, // optional
                outlineColor: Mazemap.Util.Colors.MazeColors.MazeBlue, // optional
                fillColor: Mazemap.Util.Colors.MazeColors.MazeBlue  // optional
            } );

            // Trigger a manual 'click' on this lngLat just to highlight something initially
            // onMapClick({lngLat: {lng: 151.77132658935858, lat: -32.927328449531224}});

        });


    // define a global
    var mazeMarker;
    myMap.on('click', onMapClick);
    
    function onMapClick(e){

        // un-highlight any already highlighted rooms
        myMap.highlighter.clear();

        var lngLat = e.lngLat;        
        var zLevel = myMap.zLevel;
       // setRoute(start1, dest1);

        // Fetching via Data API
        // NB: Adding optional campusId parameter, makes lookup much faster, but can be omitted
        Mazemap.Data.getPoiAt(lngLat, zLevel).then( poi => {
            // Run custom highlight function
            highlightRoom(poi);

        }).catch( function(){ return false; } );

        // display the route on click

        //getLocation();
        if (navigator.geolocation){
            var position;
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        function showPosition(position) { // users location
            try{
                var long = position.coords.longitude;
                var lati = position.coords.latitude;
                var start1 = { lngLat: {lng: long, lat: lati}, zLevel: 0};//start    
                var dest1 = { lngLat, zLevel};// destination
                var lngLat1 =  {lng: long, lat: lati};//setting location for dot on map
                //showing user location on map:
                var blueDot = new Mazemap.BlueDot( {
                    zLevel: 1,
                    accuracyCircle: true
                } ).setLngLat( lngLat1).setAccuracy(10).addTo(myMap);
                /*
                var lngLat = {lng: long, lat: lati};
                var zLevel = 0;
                blueDot.setLngLat(e.lngLat);
                blueDot.setZLevel(zLevel);*/

                Mazemap.Route.getAndDisplayRoute(myMap, start1, dest1);  // display route on map
            }    
            catch(err)
            {
                alert("An error ocurred: " + err.message)
            }
        }        
    }

    function showError(error) { // check for errors from geolocation
        var check = true;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            check = false;
            alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            check = false;
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            check = false;
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            check = false;
            alert("An unknown error occurred.")
            break;
        }
        return check;
      }


    function highlightRoom(poi){
        var lngLat = Mazemap.Util.getPoiLngLat(poi);

        // If the POI has a polygon, use the default 'highlight' function to draw a marked outline around the POI.
        if(poi.geometry.type === "Polygon"){
            myMap.highlighter.highlight(poi);
        }
        myMap.flyTo({center: lngLat, speed: 0.5});
    }

    // global lastColor;
    var lastColor = "#FF7B00";

    function randomColor( excludeColor ){
        var colors = ["#FF7B00", "#FF37A9", "#219CC4", "#66DC7A", "#B953FC", "#1FAFFC", "#CC14DE"];
        var random = Math.round( Math.random() * 6 );
        if(colors[random] === excludeColor){
            return randomColor( excludeColor );
        }

        return colors[random];
    }

    function changeColor(){
        //myMap.setLayer('mm-feature-highlight', filter);
        lastColor = randomColor( lastColor );
        myMap.highlighter.setFillStyle({'fill-color': lastColor});
        myMap.highlighter.setOutlineStyle({'line-color': lastColor});
    }

    function toggleFill(){
        var layer = myMap.highlighter.getFillLayer();
        var visible = layer.getLayoutProperty('visibility') == "none";
        if( visible ){
            myMap.highlighter.showFill();
        }else{
            myMap.highlighter.hideFill();
        }
    }
    function toggleOutline(){
        var layer = myMap.highlighter.getOutlineLayer();
        var visible = layer.getLayoutProperty('visibility') == "none";
        if( visible ){
            myMap.highlighter.showOutline();
        }else{
            myMap.highlighter.hideOutline();
        }
    }
    //on click highlight end


        //search
        var mySearch = new Mazemap.Search.SearchController({
            campusid: 117,
    
            rows: 10,
    
            withpois: true,
            withbuilding: false,
            withtype: false,
            withcampus: false,
    
            resultsFormat: 'geojson'
        });
    
        var mySearchInput = new Mazemap.Search.SearchInput({
            container: document.getElementById('search-input-container'),
            input: document.getElementById('searchInput'),
            suggestions: document.getElementById('suggestions'),
            searchController: mySearch
        }).on('itemclick', function(e){
    
            var poiFeature = e.item;
            placePoiMarker( poiFeature );
        });
    
        var resultMarker = new Mazemap.MazeMarker({
            color: 'rgb(253, 117, 38)',
            innerCircle: true,
            innerCircleColor: '#FFF',
            size: 34,
            innerCircleScale: 0.5,
            zLevel: 1
        })
    
        function placePoiMarker(poi){
            // Get a center point for the POI, because the data can return a polygon instead of just a point sometimes
            var lngLat = Mazemap.Util.getPoiLngLat(poi);
            var zLevel = poi.properties.zValue;
    
            resultMarker
            .setLngLat(lngLat)
            .setZLevel(poi.properties.zValue)
            .addTo(myMap);
    
            myMap.zLevel = zLevel;
    
            myMap.flyTo({center: lngLat, zoom: 19, duration: 2000});
        }
    
        myMap.getCanvas().addEventListener('focus', function(){
            mySearchInput.hideSuggestions();
        });

        //Zoom controls
        myMap.addControl(new Mazemap.mapboxgl.NavigationControl());

});
    
    