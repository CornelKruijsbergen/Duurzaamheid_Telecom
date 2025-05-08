from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Basis voor ORM-modellen
Base = declarative_base()

# Definieer een tabel als een Python-klasse
class User(Base):
    __tablename__ = 'users'  # Naam van de tabel in de database

    id = Column(Integer, primary_key=True)  # Primaire sleutel
    name = Column(String)  # Kolom voor gebruikersnaam
    age = Column(Integer)  # Kolom voor leeftijd

# Verbind met de database (bijvoorbeeld MySQL)
engine = create_engine('82.112.49.16')

# Maak de tabel in de database als deze nog niet bestaat
Base.metadata.create_all(engine)

# Maak een sessie om met de database te communiceren
Session = sessionmaker(bind=engine)
session = Session()

# Voeg een nieuwe gebruiker toe
new_user = User(name='John Doe', age=30)
session.add(new_user)
session.commit()

# Query de database
users = session.query(User).all()
for user in users:
    print(user.name, user.age)