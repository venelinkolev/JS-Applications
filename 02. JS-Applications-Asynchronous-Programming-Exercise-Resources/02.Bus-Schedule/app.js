function solve() {
  const stopInfo = document.querySelector('.info');

  const departBtn = document.querySelector('#depart');
  //departBtn.addEventListener('click', depart);

  const arriveBtn = document.querySelector('#arrive');
  //arriveBtn.addEventListener('click', arrive);

  //console.log(departBtn, arriveBtn);
  let stopId = 'depot';
  let stopName = '';
  async function depart() {
    const res = await fetch(
      `http://localhost:3030/jsonstore/bus/schedule/${stopId}`
    );

    if (!res.ok) {
      let error = new Error();
      error.status = res.status;
      error.statusText = res.statusText;
      throw error;
    }

    const data = await res.json();
    departBtn.setAttribute('disabled', 'true');
    arriveBtn.disabled = false;
    stopInfo.textContent = `Next stop ${data.name}`;

    stopId = data.next;
    stopName = data.name;
    console.log(stopId);
    //debugger;
    //console.log('Depart TODO...');
  }

  function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;

    stopInfo.textContent = `Arriving at ${stopName}`;
    console.log('Arrive TODO...');
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
