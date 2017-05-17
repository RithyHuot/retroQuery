export const callAjax = (lat, long, callback) => {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.responseText);
        }
    };

    const url = `https://crossorigin.me/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=bb94bab4df5a7cab30cfe69cc504cdb1`;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

export const ktof = (kelvin) => {
    let temp = (1.8 * (kelvin - 273) + 32);
    return Math.round( temp * 100 ) / 100;
};
