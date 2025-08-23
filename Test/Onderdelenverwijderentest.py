from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:TeamTelecom2025!@localhost:3306/onderdelendb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Onderdeel(db.Model):
    __tablename__ = 'catdatabase_data'
    OnderdeelID = db.Column(db.String(255), primary_key=True)
    Nominaal_Vermogen = db.Column(db.Float, nullable=False)
    Piek_Vermogen = db.Column(db.Integer, nullable=False)
    Gewicht = db.Column(db.Float, nullable=False)
    Levensduur = db.Column(db.Integer, nullable=False)
    Capaciteit = db.Column(db.Integer, nullable=False)
    Categorie = db.Column(db.String(30), nullable=False)

@app.route('/onderdeel_verwijderen', methods=['POST'])
def onderdeel_verwijderen():
    data = request.get_json()
    onderdeel_id = data.get('OnderdeelID')  # <-- haal uit de POST
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

if __name__ == '__main__':
    app.run(debug=True)