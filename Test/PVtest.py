# Geen Flask meer nodig

# Gefixeerde waardes
hoek = 90
vermogen_PV = 360
aantal_panelen = 10
gewicht_PV = 27
opwekfactor = 0.85

USP_paneel = gewicht_PV * aantal_panelen * 0.396 * 0.369 \
    + gewicht_PV * aantal_panelen * 0.302 * 3 \
    + gewicht_PV * aantal_panelen * 0.302 * 4.9

opbrengstPV = vermogen_PV * aantal_panelen * opwekfactor * (hoek / 100)
kWh_per_jaar = (opbrengstPV * 880) / 1000
Totaal_vermogen = aantal_panelen * vermogen_PV

resultaat = {
    'hoek': hoek,
    'vermogen_PV': vermogen_PV,
    'aantal_panelen': aantal_panelen,
    'gewicht_PV': gewicht_PV,
    'opbrengstPV': opbrengstPV,
    'USP_paneel': USP_paneel,
    'kWh_per_jaar': kWh_per_jaar,
    'Totaal_vermogen': Totaal_vermogen
}

print("DEBUG: USP_paneel:", USP_paneel)
print("DEBUG: Opbrengst PV:", opbrengstPV, "kWh")
print("DEBUG: kWh per jaar:", kWh_per_jaar)
print("DEBUG: Totaal vermogen:", Totaal_vermogen)
print("DEBUG: Resultaat:", resultaat)