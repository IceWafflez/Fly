from flask import Flask,request
import requests
from flask_cors import CORS
db_path = "./users.db"
app = Flask(__name__)
CORS(app)
headers = {'Authorization': 'Bearer 0JF6Q0M8K1M2VCGEVHG167XMFV9E'}
url = 'https://beta3.api.climatiq.io/travel/flights'
#imports og api nøkkel


@app.route('/api', methods=['POST', 'GET'])
async def test():
  
  data = request.get_json()
  print(data)
  #henter ut data fra nettsiden og lager et json obj
  fra = data["fra"]
  to = data["to"]
  passengers = data["passengers"]
  klasse = data["klasse"]
  myobj = {
        "legs": [
            {
                "from": fra,
                "to": to,
                "passengers": int(passengers),
                "class": klasse
            }
        ]
    }

  #sender requesten
  x = requests.post(url, json = myobj, headers=headers)   
  print(myobj)
  print(x)
  res = x.json()
  print(res)
  
  #prøver å sende tilbake co2, hvis det ikke finnes blir en feilmelding sendt tilbake
  try:
    return {'co2': 'Ditt forbruk er ' + str(res["co2e"]) + " " + res["co2e_unit"]}
  except:
    return {"co2":"En feil har oppstått, sjekk at flyplasskodene er riktig og at passasjerer er et tall"}


#kjører api på port 3001
if __name__ == "__main__":
  app.run(port=3001,debug=True)