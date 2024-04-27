import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyDeawQZj21YKtQGdataynvtYObmw0PqYM0",
    authDomain: "auto-3e78d.firebaseapp.com",
    databaseURL: "https://auto-3e78d-default-rtdb.firebaseio.com",
    projectId: "auto-3e78d",
    storageBucket: "auto-3e78d.appspot.com",
    messagingSenderId: "708377410131",
    appId: "1:708377410131:web:b274e64bf304e3db8764a6"
  };

// Iniciamos Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userRef = ref(database, '/DatosCarro');

// Configuramos el gráfico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Velocidad',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }, {
            label: 'SoC',
            data: [],
            borderColor: 'rgb(192, 75, 192)',
            tension: 0.1
        }, {
            label: 'Corriente',
            data: [],
            borderColor: 'rgb(192, 192, 75)',
            tension: 0.1
        }, {
            label: 'Elevacion',
            data: [],
            borderColor: 'rgb(75, 75, 192)',
            tension: 0.1
        }]
    }
});

// Escuchamos los cambios en los datos de Firebase y actualizamos el gráfico
onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        Object.values(data).forEach(item => {
            // Extraemos los datos de cada item
            const velocidad = item.velocidad;
            const SoC = item.SoC;
            const Corriente = item.Corriente;
            const Elevacion = item.Elevacion;
            const tiempo = new Date().toLocaleTimeString();

            // Guardamos el dato de velocidad en el almacenamiento local
            localStorage.setItem('velocidad', velocidad);
            localStorage.setItem('SoC',SoC)
            localStorage.setItem('Elevacion', Elevacion);
            localStorage.setItem('Corriente',Corriente)

            // Recuperamos el dato de velocidad del almacenamiento local y lo mostramos en el HTML
            const savedVelocity = localStorage.getItem('velocidad');
            document.getElementById('velocityValue').textContent = savedVelocity;
            const savedSoC = localStorage.getItem('SoC');
            document.getElementById('SoCValue').textContent = savedSoC;
            const savedElevation = localStorage.getItem('Elevacion');
            document.getElementById('EleValue').textContent = savedElevation;
            const savedCurrent = localStorage.getItem('Corriente');
            document.getElementById('CurrentValue').textContent = savedCurrent;

            // Agregamos los datos al gráfico y limitamos la cantidad de puntos a mostrar
            myChart.data.labels.push(tiempo);
            myChart.data.datasets[0].data.push(velocidad);
            myChart.data.datasets[1].data.push(SoC);
            myChart.data.datasets[2].data.push(Corriente);
            myChart.data.datasets[3].data.push(Elevacion);
            const maxLength = 10;
            if (myChart.data.labels.length > maxLength) {
                myChart.data.labels.shift();
                myChart.data.datasets.forEach(dataset => {
                    dataset.data.shift();
                });
            }
            
            // Actualizamos el gráfico
            myChart.update();
        });
    }
});