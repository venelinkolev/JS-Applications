function getInfo() {
  const result = document.getElementById('result');
  const stopName = document.getElementById('stopName');
  const busesElement = document.getElementById('buses');

  const stopID = document.getElementById('stopId');

  const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`;

  fetch(url)
    .then((res) => {
      //debugger;
      if (res.status != 200) throw new Error();
      else return res.json();
    })
    .then((data) => {
      //debugger;
      stopName.textContent = data.name;
      let buses = data.buses;

      busesElement.textContent = '';
      for (let key in buses) {
        let li = document.createElement('li');
        li.textContent = `Bus ${key} arrives in ${buses[key]} minutes`;
        busesElement.appendChild(li);
      }

      console.log(buses);
    })
    .catch((error) => {
      busesElement.textContent = '';
      stopName.textContent = error;
    });
  console.log(stopID.value);
}
