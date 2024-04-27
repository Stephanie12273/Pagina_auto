from firebase import firebase
import pandas as pd
import time

firebase = firebase.FirebaseApplication("https://proyecto-48aa4-default-rtdb.firebaseio.com/", None)

df = pd.read_csv(r"C:\Users\Camilo Garcia\OneDrive - unimilitar.edu.co\Desktop\Universidad\Mantenimiento Preventido en la nube\Pagina_Bateria\Backend\TripA01.csv", encoding='latin1', sep=';')
velocidades = df["Velocity [km/h]"].tolist()
EstadoCarga = df["SoC [%]"].tolist()
Corriente = df["Battery Current [A]"].tolist()
Elevacion = df["Elevation [m]"].tolist()

# Enviar todos los datos a Firebase cada 5 segundos
for i in range(0, len(velocidades), 2):
    data = {
        'velocidad': velocidades[i],
        'SoC': EstadoCarga[i],
        'Corriente': Corriente[i],
        'Elevacion': Elevacion[i]
    }
    firebase.post('/DatosCarro', data)
    time.sleep(5) 
