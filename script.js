const monedaElUno = document.getElementById('monedaUno');
const monedaElDos = document.getElementById('monedaDos');
const cantidadUno = document.getElementById('cantidadUno');
const cantidadDos = document.getElementById('cantidadDos');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calcular() {
    const monedaUno = monedaElUno.value;
    const monedaDos = monedaElDos.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${monedaUno}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[monedaDos];
            rateEl.innerText = `1 ${monedaUno} = ${rate} ${monedaDos}`;
            cantidadDos.value = (cantidadUno.value * rate).toFixed(2);
        })
}

monedaElUno.addEventListener('change', calcular);
cantidadUno.addEventListener('input', calcular);

monedaElDos.addEventListener('change', calcular);
cantidadDos.addEventListener('input', calcular);

swap.addEventListener('click', () => {
    const temp = monedaElUno.value;
    monedaElUno.value = monedaElDos.value;
    monedaElDos.value = temp;
    calcular();
});

calcular();