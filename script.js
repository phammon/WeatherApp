$(document).ready(function() {
// call to api then store data in variable for further use
$.getJSON("http://ip-api.com/json" ,
	function (data) {
	var country = data.country;
	var city = data.city;
	var region = data.region;
	var lon = data.lon;
	var lat = data.lat;
	var zip = data.zip;
	var key = "4230d4a245e793d2e920d3dafdf9843f";
	//concats city, state and country
	var userLoc = city + ", " + region + " " + country;
	console.log(userLoc);
	console.log(lon,lat);
	console.log(zip);
	//adds users location to #weatherLocation container
	var weatherLocation = document.querySelector('#location');
	weatherLocation.textContent = userLoc;
	//get weather based on users zip code
	$.ajaxSetup({ cache: false});
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=zip=" + zip + ",us&units=imperial"+ "&APPID=" + key, 
		function (data2) {
			//get temp and store it in variabe from api
			var tempFahr = data2.main.temp;
			console.log(tempFahr);
			//update HTML with correct temp
			var WeatherTemp = document.querySelector('#temp');
			WeatherTemp.textContent = Math.floor(tempFahr);
			//get weatherDescription from JSON data
			var weatherDesc = data2.weather[0].description;
			//select HTML element and store it in variable
			var weatherInfo = document.querySelector('.weatherDescription');
			//update HTML content with JSON data
			weatherInfo.textContent = weatherDesc;
			console.log(weatherDesc);
			var isCelc = true;
			//call function to check for the keyword
			
			containsStr(weatherDesc);

			//event listener for when user click F
			$("#convertTemp").click(function() {
				if (isCelc) {
				//change icon to Celcius
				var anchor = document.querySelector("#convertTemp");
				anchor.innerHTML = "&#8451";
				//call convert temp function
				var celc = fahToCel(tempFahr);
				//update HTML content with the correct temp in celcius
				WeatherTemp.textContent = celc;
				} else { // it is celcius so we change it back to fahrenheit
					var anchor = document.querySelector("#convertTemp");
					anchor.innerHTML = "&#8457";
				
					WeatherTemp.textContent = Math.floor(tempFahr);
				} isCelc =! isCelc; //shortcut to go toggle back and forth
				//temp conversion to celcius
				function fahToCel (fahrenheit) {
					var celcius = Math.floor((fahrenheit-32)*5/9);
					return celcius;
				
				};

			});
				//check if weather description contains a specific weather related keyword. if it does it will update the background.
				function containsStr(weatherDesc) {
				if(weatherDesc.indexOf('cloud') >= 0) { //greater than zero means true
					//update cloudy weather background to container
					document.getElementById("containerId").style.backgroundImage = "url('https://vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2015/12/overcast_sky_by_zozziegirl-d50yjw1.jpg;w=630')";
					//update glyphcon
					var glyph = document.getElementById("glyphcon");
					glyph.className += "fa fa-cloud fa-5x";
				} else if(weatherDesc.indexOf('sun')>= 0) {
					//update sunny weather background to container
					document.getElementById("containerId").style.backgroundImage = "url('http://grandwallpapers.net/photo/lodka-na-beregu-morya-1920x1200.jpg')";
					//update glyphcon
					var glyph = document.getElementById("glyphcon");
					glyph.className += "fa fa-sun-o fa-5x";
					console.log('yes it contains sun');
				} else if(weatherDesc.indexOf('rain' || 'shower')>= 0) {
					//update sunny weather background to container
					document.getElementById("containerId").style.backgroundImage = "url('http://cdn.wallpapersafari.com/11/43/VX6CGm.jpg')";
					var glyph = document.getElementById("glyphcon");
					glyph.className += "fa fa-tint fa-5x";
					console.log('yes it contains rain or shower');
				} else if (weatherDesc.indexOf('snow')>= 0) {
					//update sunny weather background to container
					document.getElementById("containerId").style.backgroundImage = "url('http://www.philipbrewer.net/wpx/wp-content/uploads/2013/12/IMG_3244.jpg')";
					//update glyphcon
					var glyph = document.getElementById("glyphcon");
					glyph.className += "fa fa-snowflake-o fa-5x";
					console.log('yes it contains snow');
				} else {
					console.log('the word is not in the description');
				}
			}
	
		});

	});

});


