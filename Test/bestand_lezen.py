import fpdf
import pandas as pd

# Pad naar het CSV-bestand 
bestand_pad = r"Local upload; CSV"

# Lees het CSV-bestand en sla het op in een DataFrame, geen maximum
data = pd.read_csv(bestand_pad)
pd.set_option('display.max_columns', None) #Kijken of we via deze manier alleen de primary kunnen gebruiken
pd.set_option('display.max_rows', None)

# Toon data of export data
print(data)
Send(data) to function(Get_Data) 




#data.to_csv('output.csv', index=False) data exporteren naar csv bestand, alleen handig voor txt of HTML bestanden
#print(data.info()) is een samenvatting van de data


x = 5
d = 0
a = 7
d = a + x 


print(d)
print("Test werkt Python?")