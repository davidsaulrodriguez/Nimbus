$(function() {
    const lastUpdated = formatAMPM(new Date);
    const APIKey = '79a22b5b4b01535dd2b4487e901b8735';
    let stateAbbr = '';
    let state = '';
    let SaveData = [];
    
    // Event Listeners

    $('#search').click(matchPattern);


    init()

    // App Functions

    function init() {
        var loadedData = JSON.parse(localStorage.getItem("SaveData"));
        if (SaveData !== null) {
            loadedData = SaveData;
        }
        LoadData();
    }

    function checkIfZip(value) {
        const regexp = (/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        const isValid = regexp.test(value);
        if (isValid === true) {
            const zipCode = value;
            let queryZipURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${APIKey}&units=imperial`;
            parseSearch(queryZipURL);
        } else if (isValid === false) {
            parseSearch(value.trim());
        };
    };

    function parseSearch(param) {
        if (param.length === 114) {
            lookUpByZip(param);
        } else if (param.length < 114) {
            lookUpByCityState(param);
        }
    };
    try {
        if (state.length == 2) {
            let stateTrim = abbrToFull(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateTrim},us&appid=${APIKey}&units=imperial`;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                let iconcode = response.weather[0].icon;
                let iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
                $('.todaysWeather').text(`Today's Weather in ${response.name}`);
                $('.todaysTemp').html(`${response.main.temp.toFixed(1)} &#176;F`);
                $('.todaysDate').text(`Today at ${lastUpdated}`);
                $('#ws_val').text(`${response.wind.speed.toFixed(1)} MPH`);
                $('#humid_val').text(`${response.main.humidity}%`);
                $('#fl_val').html(`${response.main.feels_like.toFixed(1)} &#176;F`);
                let todaysImg = $('<img>');
                todaysImg.attr('src', `${iconurl}`);
                $('#todaysImg').html(todaysImg);

                let lati = response.coord.lat;
                let long = response.coord.lon;
                return getForecast(lati, long);
            });
        } else if (state.length > 2 && state.length <=14) {
            let stateAbbr = fullToAbbr(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateAbbr},us&appid=${APIKey}&units=imperial`;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                let iconcode = response.weather[0].icon;
                let iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
                let unixTimeStamp = response.dt * 1000;
                let dateContent = new Date(unixTimeStamp);
                let theDateContent = `${dateContent.getMonth() +1}/${dateContent.getDate()}/${dateContent.getFullYear()}`
                $('.todaysWeather').text(`Today's Weather in ${response.name}, `);
                $('.todaysTemp').html(`${response.main.temp.toFixed(1)} &#176;F`);
                $('.todaysDate').text(`${theDateContent} at ${lastUpdated}`);
                $('#ws_val').text(`${response.wind.speed.toFixed(1)} MPH`);
                $('#humid_val').text(`${response.main.humidity}%`);
                $('#fl_val').html(`${response.main.feels_like.toFixed(1)} &#176;F`);
                let todaysImg = $('<img>');
                todaysImg.attr('src', `${iconurl}`);
                $('#todaysImg').html(todaysImg);

                let lati = response.coord.lat;
                let long = response.coord.lon;
                return getForecast(lati, long);
            });
        }    
    } catch (error) {
        $('#errorModal').modal();
    }

    function lookUpByCityState(param) {
        const searchString = param.split(',');
        let city = searchString[0];
        let state = searchString[1].toLowerCase().trim();
        if (state.length == 2) {
            let stateTrim = abbrToFull(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${APIKey}&units=imperial`;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                let iconcode = response.weather[0].icon;
                let iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
                let unixTimeStamp = response.dt * 1000;
                let dateContent = new Date(unixTimeStamp);
                let theDateContent = `${dateContent.getMonth() +1}/${dateContent.getDate()}/${dateContent.getFullYear()}`
                $('.todaysWeather').text(`Today's Weather in ${response.name}, ${state.toUpperCase()}`);
                $('.todaysTemp').html(`${response.main.temp.toFixed(1)} &#176;F`);
                $('.todaysDate').text(`${theDateContent} at ${lastUpdated}`);
                $('#ws_val').text(`${response.wind.speed.toFixed(1)} MPH`);
                $('#humid_val').text(`${response.main.humidity}%`);
                $('#fl_val').html(`${response.main.feels_like.toFixed(1)} &#176;F`);
                let todaysImg = $('<img>');
                todaysImg.attrevent, ('src', `${iconurl}`);
                $('#todaysImg').html(todaysImg);

                let lati = response.coord.lat;
                let long = response.coord.lon;
                return getForecast(lati, long);
            });
        } else if (state.length > 2 && state.length <=14) {
            let stateAbbr = fullToAbbr(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateAbbr},us&appid=${APIKey}&units=imperial`;
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                let iconcode = response.weather[0].icon;
                let iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
                let unixTimeStamp = response.dt * 1000;
                let dateContent = new Date(unixTimeStamp);
                let theDateContent = `${dateContent.getMonth() +1}/${dateContent.getDate()}/${dateContent.getFullYear()}`
                $('.todaysWeather').text(`Today's Weather in ${response.name}, ${stateAbbr.toUpperCase()}`);
                $('.todaysTemp').html(`${response.main.temp.toFixed(1)} &#176;F`);
                $('.todaysDate').text(`${theDateContent} at ${lastUpdated}`);
                $('#ws_val').text(`${response.wind.speed.toFixed(1)} MPH`);
                $('#humid_val').text(`${response.main.humidity}%`);
                $('#fl_val').html(`${response.main.feels_like.toFixed(1)} &#176;F`);
                let todaysImg = $('<img>');
                todaysImg.attr('src', `${iconurl}`);
                $('#todaysImg').html(todaysImg);

                let lati = response.coord.lat;
                let long = response.coord.lon;
                return getForecast(lati, long);
            });
        }
    };

    function lookUpByZip(param) {
        $.ajax({
            url: param,
            method: 'GET'
        }).then(function(response) {
            let iconcode = response.weather[0].icon;
            let iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
            let unixTimeStamp = response.dt * 1000;
            let dateContent = new Date(unixTimeStamp);
            let theDateContent = `${dateContent.getMonth() +1}/${dateContent.getDate()}/${dateContent.getFullYear()}`
            $('.todaysWeather').text(`Today's Weather in ${response.name}`);
            $('.todaysTemp').html(`${response.main.temp.toFixed(1)} &#176;F`);
            $('.todaysDate').text(`${theDateContent} at ${lastUpdated}`);
            $('#ws_val').text(`${response.wind.speed.toFixed(1)} MPH`);
            $('#humid_val').text(`${response.main.humidity}%`);
            $('#fl_val').html(`${response.main.feels_like.toFixed(1)} &#176;F`);
            let todaysImg = $('<img>');
            todaysImg.attr('src', `${iconurl}`);
            $('#todaysImg').html(todaysImg);


            let lati = response.coord.lat;
            let long = response.coord.lon;
            return getForecast(lati, long);
        });
    };

    function matchPattern(event, value) {
        event.preventDefault();
        let searchInput = $('#searchBar').val().trim();
        $('todaysImg').remove()
        save(searchInput);
        LoadData()
        checkIfZip(searchInput);
    };

    function getForecast (lati, long) {
        let lat = lati;
        let lon = long;
        let query = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
        $.ajax({
            url: query,
            method: 'GET'
        }).then(function(response) {
            $('#5-days').html('<h3 style="center">5 Day Forecast</h3>')

            for (let i = 1; i < 6; i++) {
                let iconcode = response.daily[i].weather[0].icon;
                let iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;
                let displayForecast = $('#5-days');
                let outter = $('<div>');
                outter.addClass('col s12 m6 l2')
                let createCard = $('<div>');
                createCard.addClass('card z-depth-3');
                let cardImgDiv = $('<div>');
                cardImgDiv.addClass('card-image');
                let cardImg = $('<img>');
                cardImg.attr('src', `${iconurl}`);
                let theDate = $('<span>');
                theDate.addClass('card-title black-text');
                let unixTimeStamp = response.daily[i].dt * 1000;
                let dateContent = new Date(unixTimeStamp);
                let theDateContent = `${dateContent.getMonth() +1}/${dateContent.getDate()}/${dateContent.getFullYear()}`
                let cardContent = $('<div>');
                cardContent.addClass('card-content');
                let theCardContent = `
                <p class="collection-item"><i class="material-icons tiny">wb_sunny</i> Temp<span class="right" id="humid_val">${response.daily[i].temp.day} &#176;F</span></p>
                <p class="collection-item"><i class="material-icons tiny">opacity</i> Humidity<span class="right" id="humid_val">${response.daily[i].humidity}%</span></p>`

                outter.append(createCard);
                createCard.append(cardImgDiv);
                cardImgDiv.append(cardImg);
                cardImgDiv.append(theDate);
                theDate.append(theDateContent);
                createCard.append(cardContent);
                cardContent.append(theCardContent)

                displayForecast.append(outter);
            }

            let uvi = $('#uvi_val');
            uvi = 5;
            if (uvi <= 2) {
                $('.uvi_val').addClass('green');
                $('.uvi_val').addClass('white-text');
            } else if (uvi <= 5) {               
                $('.uvi_val').addClass('lime');
                $('.uvi_val').addClass('white-text');
            } else if (uvi <= 7) {
                $('.uvi_val').addClass('amber');
                $('.uvi_val').addClass('white-text');
            } else if (uvi <= 10) {
                $('.uvi_val').addClass('orange');
                $('.uvi_val').addClass('white-text');
            } else if (uvi >= 11) {
                $('.uvi_val').addClass('red darken-4');
                $('.uvi_val').addClass('white-text');
            }
            $('.uvi_val').text(response.current.uvi);

            // $().appendTo('body')
            $('#5-days :nth-child(2)').addClass('offset-l1');
            $('#5-days :last-child').addClass('offset-m3');
        });
    }

    function abbrToFull (stateAbbr) {
        return states[stateAbbr];
    }

    function fullToAbbr (stateFull) {
        return stateList[stateFull];
    }

    function save(data) {
        let searchData = data.trim();
        console.log(searchData)
        SaveData.push(searchData)
        localStorage.setItem('SaveData', JSON.stringify(SaveData));
        const thedata = `<a href="javascript:void(0);" onClick="matchPattern(${data})" class="collection-item">${data}</a>`;
        $('#historyContent').append(thedata);
    }

    function LoadData() {
        let loadedData = JSON.parse(localStorage.getItem('SaveData'));
        if (loadedData) return SaveData = loadedData;
        
    }
    
    SaveData.forEach(item => {
        let newItem = item.trim();
        const thedata = `<a href="" onlick="matchPattern(\"${newItem}\")" class="collection-item">${item}</a>`;
        $('#historyContent').append(thedata);
    });

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    $('.sidenav').sidenav();
    $('#hist').modal();
    $('#about').modal();
    $('#login').modal();
    $('#errorModal').modal();

});