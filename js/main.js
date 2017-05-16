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

    let city = $r('.current-city');
    let currentTemp = $r('.temp');

    city.append(`<div> Current City: ${weather.name} </div>`);
    currentTemp.append(`<div> Current Temp: ${temp} F</div>`);
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
});
