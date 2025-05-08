from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Basis voor ORM-modellen
Base = declarative_base()

# Definieer een tabel als een Python-klasse
class User(Base):
    __tablename__ = 'users'  # Naam van de tabel in de database

    id = Column(String, primary_key=True)  # Primaire sleutel en tevens onderdeelnaam
    vermogen = Column(Integer)  #  gVermogen in Watt
    piekvermogen = Column(Integer)  # Peikvermogen in watt
    installatiedruk = Column(Integer)  # Installatiedruk in KG CO2
    Gewicht = Column(Integer)  # Gewicht in KG
    Capaciteit = Column(Integer)  # Kolom voor Capaciteit in cijfers
    Levensduur = Column(Integer)  # Levensduur in uren


# Verbind met de database (MySQL)  
engine = create_engine('82.112.49.16')

# Maak de tabel in de database als deze nog niet bestaat
Base.metadata.create_all(engine)

# Sessie om met de database te communiceren
Session = sessionmaker(bind=engine)
session = Session()

# Voeg een nieuwe onderdeel toe
new_user = User(id='Onderdeel', vermogen=30, piekvermogen=50, installatiedruk=10, Gewicht=20, Capaciteit=100, Levensduur=2000)
session.add(new_user)
session.commit()

# Query de database
users = session.query(User).all()
for user in users:
    print(user.id, user.vermogen, user.piekvermogen, user.installatiedruk, user.Gewicht, user.Capaciteit, user.Levensduur)