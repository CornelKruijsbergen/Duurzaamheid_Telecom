
import os
from flask import Flask, request, redirect, url_for, render_template, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import csv
import json
from datetime import datetime
from flask_cors import CORS


# =====================================Flask Setup========================================



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:TeamTelecom2025!@localhost:3306/onderdelendb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Sta CORS toe voor Angular frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)

# Globale lijsten voor berekeningen
berekeningen = []
# CO2 berekeningen
CO2_berekend = []

# PV berekeningen
PV_berekend = []




    #=============================CSV Verwerken========================================


@app.route('/catdata', methods=['GET'])
def get_catdata():
    # Initialiseer optel-variabelen
    piek_vermogen = 0
    nominaal_vermogen = 0
    gewicht = 0
    capaciteit = 0
    levensduur = 0

    with open('catdatabase.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if not row:
                continue
        onderdeel_naam = row[0]
        kwantiteit = int(row[1]) if len(row) > 1 and row[1].isdigit() else 1
        # Ondedeel opzoeken in de database
        onderdeel = Onderdeel.query.filter_by(OnderdeelID=onderdeel_naam).first()
        if onderdeel:
            # Debug: print per onderdeel
            print(f"DEBUG onderdeel: {onderdeel_naam}, kwantiteit: {kwantiteit}, "
                f"Piek_Vermogen: {onderdeel.Piek_Vermogen}, "
                f"Nominaal_Vermogen: {onderdeel.Nominaal_Vermogen}, "
                f"Gewicht: {onderdeel.Gewicht}, "
                f"Capaciteit: {onderdeel.Capaciteit}, "
                f"Levensduur: {onderdeel.Levensduur}")
            piek_vermogen += onderdeel.Piek_Vermogen * kwantiteit
            nominaal_vermogen += onderdeel.Nominaal_Vermogen * kwantiteit
            gewicht += onderdeel.Gewicht * kwantiteit
            capaciteit += onderdeel.Capaciteit * kwantiteit
            levensduur += onderdeel.Levensduur * kwantiteit

    # debug
    print("DEBUG /catdata resultaat:", piek_vermogen, nominaal_vermogen, gewicht, capaciteit, levensduur)
    return jsonify({
    "piek_vermogen": piek_vermogen,
    "nominaal_vermogen": nominaal_vermogen,
    "gewicht": gewicht,
    "capaciteit": capaciteit,
    "levensduur": levensduur
})


#=================================Input verwerken ==============================


@app.route('/verwerk_onderdelen_lijst', methods=['POST'])
def verwerk_onderdelen_lijst():
    onderdelen_lijst = request.get_json()
    piek_vermogen = 0
    nominaal_vermogen = 0
    gewicht = 0
    capaciteit = 0
    levensduur = 0
    if not isinstance(onderdelen_lijst, list):
        return jsonify({'error': 'Lijst verwacht'}), 400
    for item in onderdelen_lijst:
        onderdeel_naam = item.get('OnderdeelID') or item.get('onderdeelID') or item.get('onderdeel_naam')
        kwantiteit = int(item.get('kwantiteit', 1))
        onderdeel = Onderdeel.query.filter_by(OnderdeelID=onderdeel_naam).first()
        if onderdeel:
            print(f"DEBUG onderdeel: {onderdeel_naam}, kwantiteit: {kwantiteit}, "
                  f"Piek_Vermogen: {onderdeel.Piek_Vermogen}, "
                  f"Nominaal_Vermogen: {onderdeel.Nominaal_Vermogen}, "
                  f"Gewicht: {onderdeel.Gewicht}, "
                  f"Capaciteit: {onderdeel.Capaciteit}, "
                  f"Levensduur: {onderdeel.Levensduur}")
            piek_vermogen += onderdeel.Piek_Vermogen * kwantiteit
            nominaal_vermogen += onderdeel.Nominaal_Vermogen * kwantiteit
            gewicht += onderdeel.Gewicht * kwantiteit
            capaciteit += onderdeel.Capaciteit * kwantiteit
            levensduur += onderdeel.Levensduur * kwantiteit
    print("DEBUG /verwerk_onderdelen_lijst resultaat:", piek_vermogen, nominaal_vermogen, gewicht, capaciteit, levensduur)
    return jsonify({
        "piek_vermogen": piek_vermogen,
        "nominaal_vermogen": nominaal_vermogen,
        "gewicht": gewicht,
        "capaciteit": capaciteit,
        "levensduur": levensduur
    })


#====================================Onderdelen_toevoegen========================================

class Onderdeel(db.Model):
    __tablename__ = 'catdatabase_data'
    OnderdeelID = db.Column(db.String(255), primary_key=True)
    Nominaal_Vermogen = db.Column(db.Float, nullable=False)
    Piek_Vermogen = db.Column(db.Integer, nullable=False)
    Gewicht = db.Column(db.Float, nullable=False)
    Levensduur = db.Column(db.Integer, nullable=False)
    Capaciteit = db.Column(db.Integer, nullable=False)
    Categorie = db.Column(db.String(30), nullable=False)

@app.route('/onderdeel_toevoegen', methods=['POST'])
def onderdeel_toevoegen():
    data = request.get_json()
    print("DEBUG: Ontvangen data:", data)

    try:
        nieuw_onderdeel = Onderdeel(
            OnderdeelID=data.get('OnderdeelID'),
            Nominaal_Vermogen=data.get('Nominaal_Vermogen'),
            Piek_Vermogen=data.get('Piek_Vermogen'),
            Gewicht=data.get('Gewicht'),
            Levensduur=data.get('Levensduur'),
            Capaciteit=data.get('Capaciteit'),
            Categorie=data.get('Categorie')
        )
        print("DEBUG: Nieuw onderdeel object aangemaakt:")
        print(f"  OnderdeelID: {nieuw_onderdeel.OnderdeelID}")
        print(f"  Nominaal_Vermogen: {nieuw_onderdeel.Nominaal_Vermogen}")
        print(f"  Piek_Vermogen: {nieuw_onderdeel.Piek_Vermogen}")
        print(f"  Gewicht: {nieuw_onderdeel.Gewicht}")
        print(f"  Levensduur: {nieuw_onderdeel.Levensduur}")
        print(f"  Capaciteit: {nieuw_onderdeel.Capaciteit}")
        print(f"  Categorie: {nieuw_onderdeel.Categorie}")

        db.session.add(nieuw_onderdeel)
        db.session.commit()
        print('Onderdeel succesvol toegevoegd!')
        response = {"success": True, "message": "Onderdeel succesvol toegevoegd!"}
        print("RESPONSE:", response)
        return jsonify(response), 201
    except Exception as e:
        db.session.rollback()
        print(f'Fout bij toevoegen onderdeel: {e}')
        response = {"success": False, "message": f"Fout bij toevoegen onderdeel: {e}"}
        print("RESPONSE:", response)
        return jsonify(response), 500
    
    #unieke categorieën ophalen
@app.route('/categorieen', methods=['GET'])
def get_categorieen():
    try:
        categorieen = db.session.query(Onderdeel.Categorie).distinct().all()
        
        unieke_categorieen = sorted({cat[0] for cat in categorieen if cat[0]})
        return jsonify({'categorieen': unieke_categorieen})
    except Exception as e:
        print(f'Fout bij ophalen categorieën: {e}')
        return jsonify({'categorieen': [], 'error': str(e)}), 500




#====================================Inlog========================================



class Inlogscherm(db.Model):
    __tablename__ = 'inloggen'
    username = db.Column(db.String(255), primary_key=True)  
    Password = db.Column(db.String(255), nullable=False)
    FailedAttempts = db.Column(db.Integer, default=0)
    LastLogin = db.Column(db.DateTime)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = Inlogscherm.query.filter_by(username=username).first()
    now = datetime.now()

    if user and user.Password == password:
        user.FailedAttempts = 0
        user.LastLogin = now
        db.session.commit()
        return jsonify({'success': True, 'message': 'Inloggen gelukt'})
    else:
        if user:
            user.FailedAttempts = (user.FailedAttempts or 0) + 1
            user.LastLogin = now
            db.session.commit()
            return jsonify({'success': False, 'message': 'Inlogpoging mislukt'}), 401
        else:
            return jsonify({'success': False, 'message': 'Gebruiker niet gevonden'}), 401


#====================================Berekeningen CO2=========================================
CO2_berekend = []

@app.route('/bereken_formule', methods=['POST'])
def bereken_formule():
    data = request.get_json()
    PV = data.get('piek_vermogen', 0)
    NV = data.get('nominaal_vermogen', 0)
    gewicht = data.get('gewicht', 0)
    GW = data.get('GW', 0)
    CP = data.get('capaciteit', 0)
    LDO = data.get('levensduur', 0)
    LDP = data.get('levensduur_project')
    # Als niet meegegeven, pak de laatst opgeslagen waarde uit slider_waarde_opslaan
    if LDP is None or LDP == 0:
        if slider_waarde_opslaan:
            laatste_slider = slider_waarde_opslaan[-1]
            if isinstance(laatste_slider, dict) and 'levensduur_project' in laatste_slider:
                LDP = laatste_slider['levensduur_project']
            elif isinstance(laatste_slider, (int, float)):
                # fallback: als alleen een getal is opgeslagen
                LDP = laatste_slider
        if LDP is None:
            LDP = 0

    PPL = 0.018
    CKE = 4.18

    if berekeningen:
        laatste = berekeningen[-1]
        opbrengstPV = laatste.get('opbrengstPV', 0)
    else:
        opbrengstPV = 0
    OpwekPV = opbrengstPV * 880/1000

    USP = gewicht * 0.396 * 0.369 + GW * 0.302 * 3 + gewicht * 0.302 * 4.9

    if CP == 0 or LDO == 0:
        return jsonify({'error': 'CP (capaciteit) en LDO (levensduur) mogen niet nul zijn.'}), 400

    try:
        uitkomst = (
            (PV * LDP * PPL * CKE) + (NV * LDP * (1 - PPL) * CKE) + ((USP / CP) * (LDP / LDO)) - ((opbrengstPV * 880)*CKE)
        )
        huisequivalent = uitkomst/8000
        uitstoot_stroom = (PV * LDP * PPL * CKE) + (NV * LDP * (1 - PPL) * CKE)
        OpwekPV = opbrengstPV * 880

        CO2_berekend.append({
            'resultaat': f"{uitkomst} totaal CO2 uitstoot project",
            'huisequivalent': f"{huisequivalent} huishoudens per jaar aan energie",
            'uitstoot_stroom': f"{uitstoot_stroom} kg CO2 per jaar",
            'OpwekPV': f"{OpwekPV} kWh per jaar"
        })

        return jsonify({
            'resultaat': f"{uitkomst} totaal CO2 uitstoot project",
            'huisequivalent': f"{huisequivalent} huishoudens per jaar aan energie",
            'uitstoot_stroom': f"{uitstoot_stroom} kg CO2 per jaar",
            'OpwekPV': f"{OpwekPV} kWh per jaar"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    print("DEBUG: Alle berekeningen gewist.")
    return jsonify({'message': 'Alle berekeningen gewist!'})



#================================Onderdelen verwijderen================================


@app.route('/onderdeel_verwijderen', methods=['POST'])
def onderdeel_verwijderen():
    data = request.get_json()
    onderdeel_id = data.get('OnderdeelID') 
    print(f"DEBUG: Verzoek om onderdeel te verwijderen met OnderdeelID: {onderdeel_id}")

    try:
        onderdeel = Onderdeel.query.get(onderdeel_id)
        if onderdeel:
            db.session.delete(onderdeel)
            db.session.commit()
            print(f"Onderdeel met OnderdeelID '{onderdeel_id}' succesvol verwijderd!")
            response = {"success": True, "message": f"Onderdeel '{onderdeel_id}' succesvol verwijderd!"}
            print("RESPONSE:", response)
            return jsonify(response), 200
        else:
            print(f"Onderdeel met OnderdeelID '{onderdeel_id}' niet gevonden.")
            response = {"success": False, "message": f"Onderdeel '{onderdeel_id}' niet gevonden."}
            print("RESPONSE:", response)
            return jsonify(response), 404
    except Exception as e:
        db.session.rollback()
        print(f'Fout bij verwijderen onderdeel: {e}')
        response = {"success": False, "message": f"Fout bij verwijderen onderdeel: {e}"}
        print("RESPONSE:", response)
        return jsonify(response), 500



#==================================Onderdelen_wijzigen====================================


@app.route('/onderdeel_wijzigen', methods=['POST'])
def onderdeel_wijzigen():
    data = request.get_json()
    onderdeel_id = data.get('OnderdeelID')
    print("DEBUG: Ontvangen data:", data)

    try:
        onderdeel = Onderdeel.query.get(onderdeel_id)
        if not onderdeel:
            response = {"success": False, "message": f"Onderdeel '{onderdeel_id}' niet gevonden."}
            print("RESPONSE:", response)
            return jsonify(response), 200  # Altijd 200, met success False

        # Pas de velden aan als ze in de data zitten
        if 'Nominaal_Vermogen' in data:
            onderdeel.Nominaal_Vermogen = data['Nominaal_Vermogen']
        if 'Piek_Vermogen' in data:
            onderdeel.Piek_Vermogen = data['Piek_Vermogen']
        if 'Gewicht' in data:
            onderdeel.Gewicht = data['Gewicht']
        if 'Levensduur' in data:
            onderdeel.Levensduur = data['Levensduur']
        if 'Capaciteit' in data:
            onderdeel.Capaciteit = data['Capaciteit']
        if 'Categorie' in data:
            onderdeel.Categorie = data['Categorie']

        db.session.commit()
        print(f"Onderdeel '{onderdeel_id}' succesvol gewijzigd!")
        response = {"success": True, "message": f"Onderdeel '{onderdeel_id}' succesvol gewijzigd!"}
        print("RESPONSE:", response)
        return jsonify(response), 200
    except Exception as e:
        db.session.rollback()
        print(f'Fout bij wijzigen onderdeel: {e}')
        response = {"success": False, "message": f"Fout bij wijzigen onderdeel: {e}"}
        print("RESPONSE:", response)
        return jsonify(response), 200  # Altijd 200, met success False
    
    # alle onderdelen ophalen
@app.route('/onderdelen_van_categorie', methods=['GET'])
def onderdelen_van_categorie():
    categorie = request.args.get('categorie')
    if not categorie:
        return jsonify({'error': 'Geen categorie opgegeven'}), 400
    onderdelen = Onderdeel.query.filter_by(Categorie=categorie).all()
    result = [
        {
            'OnderdeelID': o.OnderdeelID,
            'Nominaal_Vermogen': o.Nominaal_Vermogen,
            'Piek_Vermogen': o.Piek_Vermogen,
            'Gewicht': o.Gewicht,
            'Levensduur': o.Levensduur,
            'Capaciteit': o.Capaciteit,
            'Categorie': o.Categorie
        }
        for o in onderdelen
    ]
    return jsonify({'onderdelen': result})

    #====================================PV_Berekenen=========================================

@app.route('/PV_Berekenen', methods=['POST'])
def PV_Berekenen():
    data = request.get_json()
    PV = data.get('piek_vermogen', 0)
    NV = data.get('nominaal_vermogen', 0)
    gewicht = data.get('gewicht', 0)
    GW = data.get('GW', 0)
    CP = data.get('capaciteit', 0)
    LDO = data.get('levensduur', 0)
    LDP = data.get('levensduur_project')
    # Als niet meegegeven, pak de laatst opgeslagen waarde uit slider_waarde_opslaan
    if LDP is None or LDP == 0:
        if 'slider_waarde_opslaan' in globals() and slider_waarde_opslaan:
            laatste_slider = slider_waarde_opslaan[-1]
            if isinstance(laatste_slider, dict) and 'levensduur_project' in laatste_slider:
                LDP = laatste_slider['levensduur_project']
            elif isinstance(laatste_slider, (int, float)):
                LDP = laatste_slider
        if LDP is None:
            LDP = 0

    PPL = 0.018
    CKE = 4.18

    # Simpele berekening, pas aan naar wens
    try:
        uitkomst = (
            (PV * LDP * PPL * CKE) + (NV * LDP * (1 - PPL) * CKE) + ((gewicht * 0.396 * 0.369 + GW * 0.302 * 3 + gewicht * 0.302 * 4.9))
        )
        return jsonify({
            'resultaat': f"{uitkomst} totaal CO2 uitstoot project"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# GET endpoint moet na de try/except komen, zodat POST altijd een return heeft
@app.route('/bereken_formule', methods=['GET'])
def get_bereken_formule():
    if CO2_berekend:
        return jsonify(CO2_berekend)
    else:
        return jsonify([])
    

#================================Inbedrijfslider=======================================

slider_waarde_opslaan = []

@app.route('/slider_waarde', methods=['POST'])
def slider_waarde():
    data = request.get_json()
    waarde = data.get('waarde')
    print(f"DEBUG: Ontvangen slider waarde: {waarde}")
    slider_waarde_opslaan.append(waarde)
    return jsonify({'success': True, 'waarde': waarde})


    data = request.get_json()
    levensduur_project = data.get('levensduur_project')
    slider_waarde_opslaan.append({'waarde': waarde, 'levensduur_project': levensduur_project})

    
#==============================Dashboard=============================
laatste_onderdelenlijst = []

@app.route('/opslaan_onderdelenlijst', methods=['POST'])
def opslaan_onderdelenlijst():
    global laatste_onderdelenlijst
    data = request.get_json()
    if isinstance(data, list):
        laatste_onderdelenlijst = data
        print(f"DEBUG: Onderdelenlijst opgeslagen: {laatste_onderdelenlijst}")
        return jsonify({'success': True})
    return jsonify({'success': False, 'error': 'Geen lijst ontvangen'}), 400

@app.route('/laatste_onderdelenlijst', methods=['GET'])
def get_laatste_onderdelenlijst():
    return jsonify({'onderdelenlijst': laatste_onderdelenlijst})
    

#==================================Reset alles=========================================
@app.route('/reset_all', methods=['POST'])
def reset_all():
    berekeningen.clear()
    CO2_berekend.clear()
    print("DEBUG: Alle waardes gereset.")
    return jsonify({'message': 'Alle waardes gereset!'})


#====================================Oude gepriegel========================================
if __name__ == '__main__':
    app.run(debug=True)




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