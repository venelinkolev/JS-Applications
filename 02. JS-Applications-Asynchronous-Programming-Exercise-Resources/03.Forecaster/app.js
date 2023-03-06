function attachEvents() {
  const location = document.getElementById('location');
  const getBtn = document.getElementById('submit');
  getBtn.addEventListener('click', submit);

  const forecast = document.getElementById('forecast');
  const current = document.getElementById('current');
  const upcoming = document.getElementById('upcoming');

  const symbol = {
    Sunny: '&#x2600', // ☀
    'Partly sunny': '&#x26C5', // ⛅
    Overcast: '&#x2601', // ☁
    Rain: '&#x2614', // ☂
    Degrees: '&#176', // °
  };

  async function submit(event) {
    //debugger;
    try {
      const res = await fetch(
        `http://localhost:3030/jsonstore/forecaster/locations/`
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const data = await res.json();

      let currnetLocation = data.find((city) => city.name == location.value);
      //debugger;

      if (!currnetLocation) throw new Error('Error');

      const cityCode = currnetLocation.code;
      console.log(data);
      debugger;
      forecast.style.display = 'block';

      const currentForecast = await conditions(cityCode);

      if (
        event.target.parentElement.parentElement.querySelector('.forecasts') ||
        event.target.parentElement.parentElement.querySelector('.forecast-info')
      ) {
        event.target.parentElement.parentElement
          .querySelector('.forecasts')
          .remove();
        event.target.parentElement.parentElement
          .querySelector('.forecast-info')
          .remove();
      }

      let divForecast = document.createElement('div');
      divForecast.classList.add('forecasts');

      let spanSymbol = document.createElement('span');
      spanSymbol.classList.add('condition');
      spanSymbol.classList.add('symbol');
      spanSymbol.innerHTML = symbol[currentForecast.forecast.condition];

      let spanCondition = document.createElement('span');
      spanCondition.classList.add('condition');

      let spanCity = document.createElement('span');
      spanCity.classList.add('forecast-data');
      spanCity.textContent = currentForecast.name;
      let spanTemp = document.createElement('span');
      spanTemp.classList.add('forecast-data');
      spanTemp.innerHTML = `${currentForecast.forecast.low}${symbol.Degrees}/${currentForecast.forecast.high}${symbol.Degrees}`;
      let spanWeather = document.createElement('span');
      spanWeather.classList.add('forecast-data');
      spanWeather.innerHTML = currentForecast.forecast.condition;

      spanCondition.appendChild(spanCity);
      spanCondition.appendChild(spanTemp);
      spanCondition.appendChild(spanWeather);

      divForecast.appendChild(spanSymbol);
      divForecast.appendChild(spanCondition);

      current.appendChild(divForecast);

      const threeDaysInfo = await threeDays(cityCode);
      const forecastArray = threeDaysInfo.forecast;

      let divForecastInfo = document.createElement('div');
      divForecastInfo.classList.add('forecast-info');

      for (let day of forecastArray) {
        let spanUpcoming = document.createElement('span');
        spanUpcoming.classList.add('upcoming');

        let spanSymbol = document.createElement('span');
        spanSymbol.classList.add('symbol');
        spanSymbol.innerHTML = symbol[day.condition];
        let spanTemp = document.createElement('span');
        spanTemp.classList.add('forecast-data');
        spanTemp.innerHTML = `${day.low}${symbol.Degrees}/${day.high}${symbol.Degrees}`;
        let spanWeather = document.createElement('span');
        spanWeather.classList.add('forecast-data');
        spanWeather.innerHTML = day.condition;

        spanUpcoming.appendChild(spanSymbol);
        spanUpcoming.appendChild(spanTemp);
        spanUpcoming.appendChild(spanWeather);

        divForecastInfo.appendChild(spanUpcoming);
      }

      upcoming.appendChild(divForecastInfo);
    } catch (err) {
      debugger;
      forecast.style.display = 'block';
      //forecast.innerHTML = '';
      forecast.textContent = err;
    }
    //return cityCode;
  }

  async function conditions(code) {
    let url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

    const res = await fetch(url);

    const data = await res.json();
    //debugger;
    console.log(data);
    return data;
  }

  async function threeDays(code) {
    let url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    const res = await fetch(url);

    const data = await res.json();
    //debugger;
    console.log(data);

    return data;
  }

  console.log();
}

attachEvents();
