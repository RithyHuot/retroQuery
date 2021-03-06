import { callAjax, ktof } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
  $r('.addListItem').on('click', () => {
    let list = $r('ol');
    let input = $r('#listItem').elements[0].value;
    if ( input.length > 0 ) {
      list.append(
        `<li>`+
        input +
        "<button class='removeButton'>X</button>" +
        '</li>');

        $r('#listItem').elements[0].value = '';

        $r(".removeButton").on('click', (e) => {
          $r(e.currentTarget).parent().remove();
        });

        $r('li').on('click', (e) => {
          $r(e.currentTarget).toggleClass('strike');
        });
    }

    $r('.removeListItem').on('click', () => {
      $r('li').remove();
    });
  });

  const getWeather = (string) => {
    const weather = JSON.parse(string);
    const kelvin = weather.main.temp;
    const temp = ktof(kelvin);

    $r('.current-city').append(`<div> ${weather.name} </div>`);
    $r('.temp').append(`<div>${temp} F </div>`);
    $r('.min-temp').append(`<div>${ktof(weather.main.temp_min)} F </div>`);
    $r('.max-temp').append(` <div>${ktof(weather.main.temp_max)}  F </div>`);
    $r('.humidity').append(`<div>${weather.main.humidity}%</div>`);
    $r('.current-weather').append(` <div>${weather.weather[0].description}</div>`);
  };

  const getLocation = () => {
    let currentPos = navigator.geolocation;
    currentPos.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      callAjax(lat, long, getWeather);
    });
  };

  const $weatherButton = $r('.get-weather');
  $weatherButton.on('click', () => {
    getLocation();
  });

  $r('.get-gify').on('click', () => {
    addGrid();
  });

  let counter = 0;

  const addGrid = () => {
    $r.ajax({
      method: 'GET',
      url: 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg',
      success: data => addGifToGrid(data)
    });
  };

  const addGifToGrid = data => {
    const giphy = JSON.parse(data).data;
    let gif = $r('.gif');
    if (counter < 10) {
      gif.append(`<img src=${giphy.fixed_width_small_url}>`);
      counter += 1;
    }

    $r('.clear-gify').on('click', () => {
      $r('img').remove();
      counter = 0;
      // $r('.get-gify').on('click', () => {
      //   addGrid();
      // });
    });
  };

});
