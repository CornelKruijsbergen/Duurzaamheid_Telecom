import fpdf
import pandas as pd

# Pad naar het CSV-bestand 
bestand_pad = r"C:\Users\kruijsbc1820\OneDrive - ARCADIS\Bureaublad\sample.csv"

# Lees het CSV-bestand en sla het op in een DataFrame, geen maximum
data = pd.read_csv(bestand_pad)
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

# Toon data of export data
print(data)
#data.to_csv('output.csv', index=False) data exporteren naar csv bestand, alleen handig voor txt of HTML bestanden
#print(data.info()) is een samenvatting van de data


x = 5
d = 0
a = 7;
d = a + x 


print(d)
print("Test werkt Python?")