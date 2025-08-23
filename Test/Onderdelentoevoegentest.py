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

@app.route('/onderdeel_toevoegen', methods=['POST'])
def onderdeel_toevoegen():
    data = request.get_json()
    print("DEBUG: Ontvangen data:", data)

    try:
        nieuw_onderdeel = Onderdeel(
            OnderdeelID="Test_klok3",
            Nominaal_Vermogen=100,
            Piek_Vermogen=120,
            Gewicht=40,
            Levensduur=200000,
            Capaciteit=1,
            Categorie="Clocks"
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

if __name__ == '__main__':
    app.run(debug=True)