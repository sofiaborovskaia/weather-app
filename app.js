window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=b07ce01cf98a75428f9f86fbce911aa4&units=metric`;
            const apiGeolocation = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=b07ce01cf98a75428f9f86fbce911aa4&units=metric`;

            // Geo Location API
            fetch(apiGeolocation)
            .then(response => {
                return response.json();
            })
                .then(data => {
                    locationTimezone.textContent = data[0].name;
            })

            // OprnWeatherMap API

            fetch(api)
                .then(response => {
                    return response.json();
                })
                
                .then(data => {
                    const { temp } = data.current;
                    const { description, icon } = data.current.weather[0];

                    
                    
                    // ICONS
                    
                    let descName = description.replace(/\s+/g, '-');
                  
                    switch (descName) {
                        case 'clear-sky':
                            $('.clear-sky').css('display', 'block');
                            break;
                        
                        // CLOUDS
                        case 'few-clouds':
                            $('.few-clouds').css('display', 'block');
                            break;
                        case 'overcast-clouds':
                            $('.overcast-clouds').css('display', 'block');
                            break;
                        case 'scattered-clouds':
                            $('.scattered-clouds').css('display', 'block');
                            break;
                        case 'broken-clouds':
                            $('.broken-clouds').css('display', 'block');
                            break;
                        
                        // DRIZZLE
                        case 'light-intensity-drizzle': case 'drizzle': case 'heavy-intensity-drizzle': case 'light-intensity-drizzle-rain': 
                            $('.drizzle').css('display', 'block');
                            break;
        
                        
                        // RAIN
                        case 'rain': case 'light-rain': case 'moderate-rain': case 'drizzle-rain': case 'heavy-intensity-drizzle-rain': case 'shower-rain-and-drizzle': case 'heavy-shower-rain-and-drizzle': case 'shower-drizzle':
                            $('.rain').css('display', 'block');
                            break;
                        case 'shower-rain': case 'heavy-intensity-rain': case 'very-heavy-rain': 
                            $('.shower-rain').css('display', 'block');
                            break;
                        case 'extreme-rain': case 'freezing-rain': case 'light-intensity-shower-rain': case 'heavy-intensity-shower-rain': case 'ragged-shower-rain':
                            $('.heavy-rain').css('display', 'block');
                            break;
                       
                        
                        // THUNDERSTORM
                        case 'thunderstorm': case 'thunderstorm-with-light-rain': case 'thunderstorm-with-rain': case 'thunderstorm-with-heavy-rain': case 'light-thunderstorm': case 'heavy-thunderstorm': case 'ragged-thunderstorm': case 'thunderstorm-with-light-drizzle': case 'thunderstorm-with-drizzle': case 'thunderstorm-with-heavy-drizzle':
                            $('.thunderstorm').css('display', 'block');
                            break;
                        
                        // SNOW
                        case 'snow': case 'light-snow': case 'heavy-snow': case 'sleet': case 'light-shower-sleet': case 'shower-sleet': case 'light-rain-and-snow': case 'rain-and-snow': case 'light-shower-snow': case 'shower-snow': case 'heavy-shower-snow':
                            $('.snow').css('display', 'block');
                            break;
                        case 'sleet': case 'light-shower-sleet': case 'shower-sleet': case 'light-rain-and-snow': case 'rain-and-snow': case 'light-shower-snow': case 'shower-snow': case 'heavy-shower-snow':
                            $('.light-snow').css('display', 'block');
                            break;
                        
                        // ATMOSPHERE
                        case 'mist': case 'haze': case 'fog':  
                            $('.mist').css('display', 'block');
                            break;
                        case 'smoke': 
                            $('.smoke').css('display', 'block');
                            break;
                        case 'sand/-dust-whirls': case 'dust': case 'volcanic-ash': case 'squalls':
                            $('.sand').css('display', 'block');
                            break;
                        case 'tornado':
                            $('.tornado').css('display', 'block');
                            break;
                        
                        
                        default:
                            $('.icon').css('display', 'none');
                    }


                    // Formula for temperature
                    let farenheit = (temp * 9 / 5) + 32; 

                
                    // Set DOM elements from API

                    temperatureDegree.textContent = Math.floor(temp);
                    temperatureDescription.textContent = description;

                    // Change temperature to Celcius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°C") {
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = farenheit;
                        } else {
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(temp);
                        }
                    });

                });
        });
    }
});

    $(".trigger").click(function() {
        $(".overlay").toggle();
    });

// SEARCH FORM - CHANGE CITY



$(".search__wrapper form").submit(function (event) {
    
    event.preventDefault();
    $('.icon').css('display', 'none');


    $('.icon').css('display', 'none');


  
        
    var city = $('#city-search').val();
    const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b07ce01cf98a75428f9f86fbce911aa4&units=metric`;
 
    const msg = document.querySelector('.msg');

    fetch(apiCity)
        .then(response => {
            return response.json();
        })

        .then(data => {

            const { description, icon } = data.weather[0];
            const { temp } = data.main;
            const cityName = data.name;
            let temperatureDescription = document.querySelector('.temperature-description');
            let temperatureDegree = document.querySelector('.temperature-degree');
            let locationTimezone = document.querySelector('.location-timezone');
            let temperatureSection = document.querySelector('.temperature');
            let temperatureSpan = document.querySelector('.temperature span');

            locationTimezone.innerText = cityName;
            temperatureDescription.innerText = description;

            // Formula for temperature
            let farenheit = (temp * 9 / 5) + 32; 

            
            // Set DOM elements from API
            temperatureDegree.innerText = Math.floor(temp);

            // Change temperature to Celcius/Farenheit
            temperatureSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === "°C") {
                
                temperatureSpan.textContent = "°F";
                temperatureDegree.textContent = farenheit;
            } else {
                temperatureSpan.textContent = "°C";
                temperatureDegree.textContent = Math.floor(temp);
            }
            });
                   
            // ICONS
            let descName = description.replace(/\s+/g, '-');
        
            switch (descName) {
                case 'clear-sky':
                    $('.clear-sky').css('display', 'block');
                    break;
                
                // CLOUDS
                case 'few-clouds':
                    $('.few-clouds').css('display', 'block');
                    break;
                case 'overcast-clouds':
                    $('.overcast-clouds').css('display', 'block');
                    break;
                case 'scattered-clouds':
                    $('.scattered-clouds').css('display', 'block');
                    break;
                case 'broken-clouds':
                    $('.broken-clouds').css('display', 'block');
                    break;
                
                // DRIZZLE
                case 'light-intensity-drizzle': case 'drizzle': case 'heavy-intensity-drizzle': case 'light-intensity-drizzle-rain': 
                    $('.drizzle').css('display', 'block');
                    break;

                
                // RAIN
                case 'rain': case 'light-rain': case 'moderate-rain': case 'drizzle-rain': case 'heavy-intensity-drizzle-rain': case 'shower-rain-and-drizzle': case 'heavy-shower-rain-and-drizzle': case 'shower-drizzle':
                    $('.rain').css('display', 'block');
                    break;
                case 'shower-rain': case 'heavy-intensity-rain': case 'very-heavy-rain': 
                    $('.shower-rain').css('display', 'block');
                    break;
                case 'extreme-rain': case 'freezing-rain': case 'light-intensity-shower-rain': case 'heavy-intensity-shower-rain': case 'ragged-shower-rain':
                    $('.heavy-rain').css('display', 'block');
                    break;
               
                
                // THUNDERSTORM
                case 'thunderstorm': case 'thunderstorm-with-light-rain': case 'thunderstorm-with-rain': case 'thunderstorm-with-heavy-rain': case 'light-thunderstorm': case 'heavy-thunderstorm': case 'ragged-thunderstorm': case 'thunderstorm-with-light-drizzle': case 'thunderstorm-with-drizzle': case 'thunderstorm-with-heavy-drizzle':
                    $('.thunderstorm').css('display', 'block');
                    break;
                
                // SNOW
                case 'snow': case 'light-snow': case 'heavy-snow': case 'sleet': case 'light-shower-sleet': case 'shower-sleet': case 'light-rain-and-snow': case 'rain-and-snow': case 'light-shower-snow': case 'shower-snow': case 'heavy-shower-snow':
                    $('.snow').css('display', 'block');
                    break;
                case 'sleet': case 'light-shower-sleet': case 'shower-sleet': case 'light-rain-and-snow': case 'rain-and-snow': case 'light-shower-snow': case 'shower-snow': case 'heavy-shower-snow':
                    $('.light-snow').css('display', 'block');
                    break;
                
                // ATMOSPHERE
                case 'mist': case 'haze': case 'fog':  
                    $('.mist').css('display', 'block');
                    break;
                case 'smoke': 
                    $('.smoke').css('display', 'block');
                    break;
                case 'sand/-dust-whirls': case 'dust': case 'volcanic-ash': case 'squalls':
                    $('.sand').css('display', 'block');
                    break;
                case 'tornado':
                    $('.tornado').css('display', 'block');
                    break;
                
                
                default:
                    $('.icon').css('display', 'none');

            }
            msg.textContent = ""
        })
       
        .catch(() => {
            msg.textContent = "something went wrong. try again!";
        });
          	
});


