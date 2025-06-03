import os
from flask import Flask, request, redirect, url_for, render_template, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy

# Variabelen voor de PV-module
PV = 0
pvvermogen = 0
pvhoek = 0
pvaantal = 0





# Zet het pad naar de public map
static_dir = os.path.join(os.path.dirname(__file__), 'public') 
app = Flask(__name__, static_folder=static_dir, static_url_path='')

# Stel een map in waar bestanden lokaal worden opgeslagen
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Zorg ervoor dat de uploadmap bestaat
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    # Controleer of er een bestand is geüpload
    if 'file' not in request.files:
        return 'Geen bestand geselecteerd', 400

    file = request.files['file']

    # Controleer of het bestand een naam heeft
    if file.filename == '':
        return 'Bestand heeft geen naam', 400

    # Controleer of het een CSV-bestand is
    if not file.filename.endswith('.csv'):
        return 'Alleen CSV-bestanden zijn toegestaan', 400

    # Sla het bestand lokaal op
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    return f'Bestand opgeslagen als: {filepath}', 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_angular(path):
    if path != "" and os.path.exists(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
    else:
        # Fallback naar index.html voor Angular routing
        return send_from_directory(static_dir, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)


#====================================PV-systemen========================================
@app.route('/set_pv', methods=['POST'])
def set_pv():
    global PV, pvvermogen, pvhoek, pvaantal
    data = request.get_json()
    PV = data.get('PV', 0)
    pvvermogen = data.get('pvvermogen', 0)
    pvhoek = data.get('pvhoek', 0)
    pvaantal = data.get('pvaantal', 0)
    return jsonify({'message': 'Waarden succesvol opgeslagen!'})

@app.route('/get_pv', methods=['GET'])
def get_pv():
    return jsonify({
        'PV': PV,
        'pvvermogen': pvvermogen,
        'pvhoek': pvhoek,
        'pvaantal': pvaantal
    })


#====================================Inlog========================================
from flask_sqlalchemy import SQLAlchemy

# Voeg deze regels toe na je Flask app-instantie:
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:TeamTelecom2025!@localhost:3306/onderdelendb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Definieer het model voor de inlogscherm-tabel:
class Inlogscherm(db.Model):
    __tablename__ = 'inlogscherm'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = Inlogscherm.query.filter_by(username=username, password=password).first()
    if user:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 401


#====================================Oude gepriegel========================================




#from sqlalchemy import Column, Integer, String, create_engine
#from sqlalchemy.ext.declarative import declarative_base
#from sqlalchemy.orm import sessionmaker

# Basis voor ORM-modellen
#Base = declarative_base()

# Definieer een tabel als een Python-klasse
#class User(Base):
   # __tablename__ = 'onderdelendb'  # Naam van de tabel in de database

  # id = Column(String, primary_key=True)  # Primaire sleutel en tevens onderdeelnaam
   # vermogen = Column(Integer)  #  gVermogen in Watt
   # piekvermogen = Column(Integer)  # Peikvermogen in watt
   # installatiedruk = Column(Integer)  # Installatiedruk in KG CO2
   # Gewicht = Column(Integer)  # Gewicht in KG
   # Capaciteit = Column(Integer)  # Kolom voor Capaciteit in cijfers
  #  Levensduur = Column(Integer)  # Levensduur in uren


# Verbind met de database (MySQL)  
#engine = create_engine('82.112.49.16')

# Maak de tabel in de database als deze nog niet bestaat
#Base.metadata.create_all(engine)

# Sessie om met de database te communiceren
#Session = sessionmaker(bind=engine)
#session = Session()

# Voeg een nieuwe onderdeel toe
#new_user = User(id='Onderdeel', vermogen=30, piekvermogen=50, installatiedruk=10, Gewicht=20, Capaciteit=100, Levensduur=2000)
#session.add(new_user)
#session.commit()

# Query de database
#users = session.query(User).all()
#for user in users:
#    print(user.id, user.vermogen, user.piekvermogen, user.installatiedruk, user.Gewicht, user.Capaciteit, user.Levensduur)