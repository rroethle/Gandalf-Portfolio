/*
This file contains all of the code running in the background that makes resumeBuilder.js possible. 
We call these helper functions because they support your code in this course.

Helper HTML strings. As part of the course, you'll be using JavaScript functions
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span>';

var HTMLcontactStart = '<div class ="flex-box"></div>'
var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

//added alt tag to image by adding %content% and replacing content using resumeBuilder.js
var HTMLbioPic = '<img src="%data%" class="biopic" alt="%content%">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

//added HTMLcollision for caption and collision could be added to header.
var HTMLcollision = '<div class = "caption"><p>%data%</p><div id="collision" class="flex-box"></div></div><hr/>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';
//added workSkills div and list items so I could highlight key events at work
var HTMLworkSkillsStart = '<div class = "work-skills-entry"><ul class="skillsForWork"></ul></div>'
var HTMLworkSkillsItem = '<li class="singleSkill"><p>%data%</p></li>'

var HTMLprojectStart = '<div class="project-entry"></div>';
//added data-toggle and data-target. Data Target uses %content% for placeholder to be updated using resumeBuilder.js
var HTMLprojectTitle = '<a href="#" data-toggle="modal" data-target="%content%">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
//added alt tag to image by adding %content% and replacing content using resumeBuilder.js
var HTMLprojectImage = '<img src="%data%" alt="%content%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
//added target=_blank so when user clicks on school, it takes them to site but opens a seperate tab.
var HTMLschoolName = '<a href="#" target="_blank">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';

//Added target="_blank" so on clicking the link, a new tab is opened.
var HTMLonlineTitle = '<a href="#" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
//Replaced href = "#" with "%data%" so the link would take you to online school link.
//Added target="_blank" so on clicking the link, a new tab is opened.
var HTMLonlineURL = '<br><a href="%data%" target="_blank">%data%</a>';

//added bootstrap primary button class because I liked the look of the style.
var internationalizeButton = '<button type="button" class="btn btn-primary">Internationalize</button>';
var googleMap = '<div id="map"></div>';
//added var so a description could be added to the top of the map explaining what the user can do with the markers.
var googleMapDescription = '<h4 class="mapHeading">Add additional markers or right click and remove markers you add!</h4>'

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName(bio.name) || function(){};
    $('#name').html(iName);  
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc){
	var x = loc.pageX;
	var y = loc.pageY;
	logClicks(x,y);
})

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
I added the following items to the Google Map function:
  
*/
var map;    // declares a global map variable
/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };
  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);
  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {
    // initializes an empty array
    var locations = [];
	
    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });
	
    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }
  
    google.maps.event.addListener(map, 'click', function(event) {
      /*
	    After user clicks on map, the latitude and longitude of the place is recorded
	    and a new info window is generated. Using geocoder, the name of the place is looked up
		and a marker is placed on the map. The title for the info window is generated by user input
		from a JavaScript prompt.
		Also, the user is given the ability to right click on a location to delete it after placing
		the marker.
	  */
      var location = new google.maps.LatLng(event.latLng.lat(),event.latLng.lng())
	  var infowindow = new google.maps.InfoWindow();
      geocoder = new google.maps.Geocoder();
	  geocoder.geocode({'latLng': location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        marker = new google.maps.Marker({
            position: location,
            map: map,
			title: prompt("Enter location title")
        });
        //event listener which waits for the user to click on the map.
		google.maps.event.addListener(marker, 'click', function(event) {
			infowindow.setContent(results[1].formatted_address);
			infowindow.open(map, marker);
		})
		/*event listener which waits for the user to rightclick on the map, which will delete a marker created
		  by the user. It will not delete markers placed from the resume builder*/ 
		google.maps.event.addListener(marker, 'rightclick', function(event) {
			marker.setMap(null)
		})
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
	});
    });
  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }
  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
	map.fitBounds(mapBounds);
});