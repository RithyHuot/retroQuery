export const callAjax = (lat, long, callback) => {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.responseText);
        }
    };

<<<<<<< HEAD
<<<<<<< HEAD
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=bb94bab4df5a7cab30cfe69cc504cdb1`;
=======
    const url = `https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=bb94bab4df5a7cab30cfe69cc504cdb1`;
>>>>>>> ed53d82ae1c5cda9088c29a6e54b8462b0941068
=======
    const url = `https://crossorigin.me/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=bb94bab4df5a7cab30cfe69cc504cdb1`;
>>>>>>> 75b0a6fa00820b8474ec7b17a8a25d420719934d
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

export const ktof = (kelvin) => {
    let temp = (1.8 * (kelvin - 273) + 32);
    return Math.round( temp * 100 ) / 100;
};
