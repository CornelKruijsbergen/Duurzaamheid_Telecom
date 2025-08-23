from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:TeamTelecom2025!@localhost:3306/onderdelendb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Inlogscherm(db.Model):
    __tablename__ = 'inlogscherm'
    username = db.Column(db.String(255), primary_key=True)  
    Password = db.Column(db.String(255), nullable=False)
    FailedAttempts = db.Column(db.Integer, default=0)
    LastLogin = db.Column(db.DateTime)

with app.app_context():
    username = "Adminn"
    password = "TeamTelecom2025"

    user = Inlogscherm.query.filter_by(username=username).first()
    now = datetime.now()

    if user and user.Password == password:
        user.FailedAttempts = 0  # Reset bij succesvol inloggen
        user.LastLogin = now
        db.session.commit()
        print("Inloggen gelukt")
    else:
        if user:
            user.FailedAttempts = (user.FailedAttempts or 0) + 1  # Verhoog bij fout wachtwoord
            user.LastLogin = now  # Log altijd de poging
            db.session.commit()
            print("Inlogpoging mislukt")
        else:
            print("Gebruiker niet gevonden")
