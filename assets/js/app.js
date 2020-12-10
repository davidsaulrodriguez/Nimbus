$(function() {
    const lastUpdated = formatAMPM(new Date);
    const APIKey = '79a22b5b4b01535dd2b4487e901b8735';
    let stateAbbr = '';
    let state = '';

    // Event Listeners

    $('#search').click(matchPattern);

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
                console.log(response)
                $('.todaysTemp').text(`${response.name}, ${stateTrim}`);
                $('.todaysDate').html(`${lastUpdated}`);
            });
        } else if (state.length > 2 && state.length <=14) {
            let stateAbbr = fullToAbbr(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateAbbr},us&appid=${APIKey}&units=imperial`;  
            console.log(stateAbbr)
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                $('.locationName').html(`<h2>${response.name}, ${stateAbbr}</h2>`);
                $('.lastUpdated').html(`<p>Last Updated: ${lastUpdated}</p>`);
            });
        }    
    } catch (error) {
        console.log(error);
    }

    function lookUpByCityState(param) {
        const searchString = param.split(',');
        let city = searchString[0];
        let state = searchString[1].toLowerCase().trim();
        console.log(state)
        if (state.length == 2) {
            let stateTrim = abbrToFull(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateTrim},us&appid=${APIKey}&units=imperial`;  
            console.log(searchString)
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                $('.locationName').html(`<h2>${response.name}, ${stateTrim}</h2>`);
                $('.lastUpdated').html(`<p>Last Updated: ${lastUpdated}</p>`);
            });
        } else if (state.length > 2 && state.length <=14) {
            let stateAbbr = fullToAbbr(state);
            let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${stateAbbr},us&appid=${APIKey}&units=imperial`;  
            console.log(stateAbbr)
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                $('.locationName').html(`<h2>${response.name}, ${stateAbbr}</h2>`);
                $('.lastUpdated').html(`<p>Last Updated: ${lastUpdated}</p>`);
            });
        }
    };

    function lookUpByZip(param) {
        $.ajax({
            url: param,
            method: 'GET'
        }).then(function(response) {
            console.log(response)
            $('.todaysWeather').text(`Today's Weather in ${response.name}`);
            $('.todaysTemp').html(`${response.main.temp.toFixed(1)} &#176;F`);
            $('.todaysDate').text(`Today at ${lastUpdated}`);
            $('#ws_val').text(`${response.wind.speed.toFixed(1)} MPH`);
            $('#humid_val').text(`${response.main.humidity}%`);
            $('#fl_val').html(`${response.main.feels_like.toFixed(1)} &#176;F`);

            // $('#vis_val').text(`${response.}%`);
        });
    };

    function matchPattern(event, value) {
        event.preventDefault();
        const searchInput = $('#searchBar').val();
        console.log(searchInput)
        checkIfZip(searchInput);
    };

    function abbrToFull (stateAbbr) {
        return states[stateAbbr];
    }

    function fullToAbbr (stateFull) {
        return stateList[stateFull];
    }

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
    $('#about').modal();
    $('#login').modal();
    $('#errorModal').modal();

});