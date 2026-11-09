Page: /scenarijai/slaptazodis-nutekejo/ (Scenarijus, channel Paskyra), phase 1; the one technical scenario.
Purpose: show a leaked, reused password from his side as a chain of motives, each link ending on a defender's move; never how a leak is exploited or how passwords are tried (ARCHITECTURE §6.1).
FACTS used: F55–F59, F60–F62, F64–F67, F69, F71, F72, F83. Deviation: this scenario has no Sustok card at launch (the six launch cards are not about passwords), so "Tavo ėjimas" links to the Slaptažodžiai pillar and to the audit, and the main button is **Pradėk patikrą**.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

# Tavo slaptažodis nutekėjo

**Kanalas:** paskyra · **Ko jis nori:** prieigos · **Skaitymo laikas:** 3 min. · **Patikrinta:** 2026-10-24 ([Šaltiniai](/saltiniai/))

## Trumpai

### Kaip tai atrodo

Čia gali neskambėti joks telefonas. Apie nutekėjimą gali pranešti pati paslauga, o gali būti, kad jį pamatai tada, kai patikrini savo el. pašto adresą svetainėje haveibeenpwned.com. <!-- F69 --> Ekrane – tavo adresas tarp nutekėjusių. Ir kyla klausimas: ar tą patį slaptažodį naudoji dar kur nors?

### Trys ženklai

1. **Tavo adresas rastas nutekėjimuose.** Tai galima patikrinti nemokamai. <!-- F69 F71 -->
2. **Tą patį slaptažodį naudoji daugiau nei vienoje paskyroje.** Jei jis nutekėjo, pirmiausia keisk jį svarbiausiose paskyrose. <!-- F71 -->
3. **Slaptažodis trumpas ar labai paplitęs.** NIST reikalauja, kad paslaugos tikrintų naujus slaptažodžius pagal dažnų ir nutekėjusių sąrašą, o slaptažodis, kuris vienas saugo paskyrą, būtų bent 15 ženklų. <!-- F55 F58 -->

### Tavo ėjimas

**Kiekvienai paskyrai – ilgas, skirtingas slaptažodis, o visus juos įsimena slaptažodžių tvarkyklė.** <!-- F55 F71 F72 --> Nutekėjusį slaptažodį pakeisk ten, kur jį naudojai, pirmiausia svarbiausiose paskyrose. <!-- F71 --> Keisti reikia tada, kai yra požymių, kad slaptažodis nutekėjo; kas kelis mėnesius keisti nereikia. <!-- F57 --> Daugiau: [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/), [Patikra per 15 minučių](/patikra/15-minuciu/).

### Jei jau prisigavai

Jei paskyrą jau perėmė kažkas kitas, žiūrėk [Jei tave apgavo: kažkas perėmė mano paskyrą](/jei-apgavo/#paskyra).

**Mygtukai**
- Main: **Pradėk patikrą** → /patikra/15-minuciu/

## Kaip tai daro jis

*(Šis sluoksnis jau atvertas. Jame – grandinė ir jo tikslas kiekvienoje grandyje, bet ne jo techniniai žingsniai. Paaiškinimas yra mūsų pačių modelis, o faktai pažymėti šaltiniais.)*

### Ko jis nori

Prieigos. Jam svarbu ne tu, o tai, ką paskyra atveria: pinigus, kontaktus, kitas paskyras. <!-- M --> **Sustabdymo vieta:** kuo mažiau vienoje paskyroje, tuo mažiau jam atsiveria.

### Ką jis apie tave žino

Tik tai, kas nutekėjo: pavyzdžiui, el. pašto adresą ar paskyrą, kuri pateko tarp nutekėjusių duomenų. <!-- F69 --> Tavęs jis nepažįsta ir nežino, ką naudoji kitur. <!-- M --> **Sustabdymo vieta:** tikrink savo adresą anksčiau, nei jis tuo pasinaudos. <!-- F71 -->

### Kodėl tai veikia

Veikia viena grandinė ir jai užtenka vienos silpnos grandies. <!-- M -->

1. **Nutekėjimas.** Tai nutinka paslaugai, ne tau; svetainė parodo, ar tavo adresas buvo tarp nutekėjusių. <!-- F69 --> Jo tikslas čia – gauti sąrašą. <!-- M --> **Sustabdymo vieta:** nutekėjimo tu sustabdyti negali, bet gali padaryti taip, kad nutekėjęs slaptažodis niekur kitur neatidarytų durų. <!-- F71 -->
2. **Pakartotinis naudojimas.** Jo tikslas – rasti žmogų, kuris tą patį slaptažodį naudoja ir kitur. <!-- M --> Vienas raktas, daug durų. <!-- M --> **Sustabdymo vieta:** skirtingas slaptažodis kiekvienai paskyrai; NKSC pataria naudoti patikimus slaptažodžių valdymo įrankius. <!-- F71 -->
3. **Perėmimas.** Jo tikslas – paskyra, kuri atveria daugiausia: ypač el. paštas, nes per jį galima atkurti kitų paskyrų slaptažodžius. <!-- F83 --> **Sustabdymo vieta:** antras prisijungimo žingsnis, geriausia ne SMS, nes SMS kodas nėra atsparus apgaulei, o SIM kortelės pakeitimas yra vienas iš būdų jį apeiti. <!-- F64 F65 F66 F67 -->
4. **Kita paskyra.** Jo tikslas – pereiti nuo vienos paskyros prie kitos. <!-- M --> **Sustabdymo vieta:** prieigos raktas – jis susietas su tikra svetaine, todėl netikra svetainė jo neišvilios. <!-- F60 F61 F62 -->

### Kur jį sustabdyti

| Ko jis ieško | Tavo atsakymas |
|---|---|
| Tas pats slaptažodis visur | Skirtingas kiekvienai paskyrai, ilgas; bent 15 ženklų, jei slaptažodis vienas saugo paskyrą. <!-- F55 F71 --> |
| Nuspėjamas slaptažodis | NIST nebereikalauja simbolių mišinio; svarbu ilgis ir kad slaptažodis nebūtų dažnai naudojamas ar nutekėjęs. <!-- F55 F56 F58 --> |
| Senas, po nutekėjimo nepakeistas slaptažodis | Keisk, kai yra požymių, kad jis nutekėjo; kitaip kas kelis mėnesius keisti nereikia. <!-- F57 --> |
| Silpnas antras žingsnis (SMS) | Prieigos raktas ar fizinis raktas; jei jų nėra – programėlė. Programėlės kodą irgi galima išvilioti, todėl jo niekam nesakyk. <!-- F60 F64 F66 --> |
| Slaptažodis, kurį reikia atsiminti | Slaptažodžių tvarkyklė; NIST reikalauja, kad paslaugos jas leistų. <!-- F59 F72 --> |

### Ko čia nerasi

Jokių įrankių, paruošto teksto ar žingsnių, kaip tai padaryti. Taip pat nerasi, kaip nutekėjimas išnaudojamas ar kaip slaptažodžiai išbandomi. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Susiję

- **Tema:** [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/), [Kaip veikia atakos](/temos/kaip-veikia-atakos/) (grandinės dalis)
- **Patikra:** [Patikra per 15 minučių](/patikra/15-minuciu/)
- **Kiti scenarijai:** [Žinutė su kodu](/scenarijai/zinute-su-kodu/), [Skambutis iš „banko“](/scenarijai/skambutis-is-banko/), [Paskola tavo vardu, kurios neėmei](/scenarijai/paskola-tavo-vardu/), [Netikras DI įrankis](/scenarijai/netikras-di-irankis/)

## Šaltiniai ir patikrinta

Patikrinta: 2026-10-24. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- Have I Been Pwned: nemokama svetainė, rodanti, ar adresas buvo tarp nutekėjusių duomenų. <!-- F69 -->
- NKSC, 2025-06-20: patikra, pakartotinai naudoto slaptažodžio keitimas pirmiausia svarbiose paskyrose, slaptažodžių valdymo įrankiai. <!-- F71 -->
- NIST SP 800-63B-4: ilgis, jokių sudėties taisyklių, jokių periodinių keitimų. <!-- F55 F56 F57 F58 F59 -->
- CISA: SMS nėra atsparus apgaulei, SIM keitimas; atsparus tik FIDO. <!-- F64 F65 F66 -->
- „Google“ ir „Microsoft“ lietuviški puslapiai: „prieigos raktas“ ir „slaptažodžių tvarkyklė“. <!-- F61 F62 F72 -->
