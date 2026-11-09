Page: /temos/slaptazodziai/ (Slaptažodžiai ir prieigos raktai), phase 1; the pillar for the doors he tries to open.
Purpose: say once what a good password is now (length, no symbol rules, no periodic changes), the order of second steps (passkey or security key, then an app, SMS only if nothing else), why the email account comes first, and where the password manager fits; the product choice lives on /irankiai/. Layer 2 is motive only.
FACTS used: F54, F55, F56, F57, F58, F59, F60, F61, F62, F64, F41, F42, F65, F66, F67, F68, F69, F71, F72, F83, F111. `M` rests on our editorial model. Not stated: any Apple or Bitwarden Lithuanian term (F63, F73 GAP); no claim that passkeys are „unphishable“.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Slaptažodžiai ir prieigos raktai – Suktas
**Aprašas (meta):** Kaip uždaryti duris, kurias bando atidaryti sukčius: ilgas slaptažodis, tvarkyklė ir antras prisijungimo žingsnis tinkama tvarka.

# Slaptažodžiai ir prieigos raktai

## Ką čia sužinosi

Kaip atrodo geras slaptažodis šiandien, kodėl pirmiausia reikia saugoti el. paštą ir kokį antrą prisijungimo žingsnį rinktis. <!-- pažadas -->

## Vienas dalykas šiandien

**Savo el. pašto paskyrai nustatyk ilgą slaptažodį, kurio nenaudoji niekur kitur.** <!-- F55 F71 F83 --> Kas patenka į tavo el. paštą, gali atkurti ir kitų paskyrų slaptažodžius. <!-- F83 --> Žingsniai: [Patikra per 15 minučių](/patikra/15-minuciu/).

## Kas dabar laikoma gera praktika

- **Ilgis svarbiau už mišinį.** Slaptažodis, kuris vienas saugo paskyrą, turi būti bent 15 ženklų ilgio. Jei jis tik viena iš kelių prisijungimo dalių, užtenka 8. <!-- F55 -->
- **Simbolių mišinio nereikia.** NIST draudžia paslaugoms reikalauti skirtingų ženklų rūšių. <!-- F56 -->
- **Kas kelis mėnesius keisti nereikia.** Keisk, kai yra požymių, kad slaptažodis nutekėjo. <!-- F57 -->
- **Slaptažodis neturi būti dažnai naudojamas ar nutekėjęs.** Paslaugos turi tikrinti naujus slaptažodžius pagal tokių sąrašą. <!-- F58 -->
- **Slaptažodžiai tvarkyklėje.** NIST reikalauja, kad paslaugos leistų naudoti slaptažodžių tvarkykles ir automatinį užpildymą. <!-- F59 --> Lietuviškai „Google“ tai vadina slaptažodžių tvarkykle, o NKSC – slaptažodžių valdymo įrankiais. <!-- F72 F71 --> Pasirinkimas: [Įrankiai](/irankiai/).

## Antras žingsnis: kuris geriausias

Pirmas – **prieigos raktas ar fizinis raktas**. Antras – **programėlė**. **SMS** – tik jei nieko kito nėra. <!-- F60 F64 F66 F111 -->

1. **Prieigos raktas ar fizinis raktas.** Naršyklė ir operacinė sistema susieja raktą su tikra paslauga, todėl tau nereikia spręsti, ar svetainė tikra. <!-- F60 -->

   „Google“ ir „Microsoft“ lietuviškai rašo, kad prieigos raktai yra labiau apsaugoti nuo duomenų išviliojimo ir atsparūs sukčiavimo apsimetant atakoms. <!-- F61 F62 --> CISA nurodo, kad vienintelis plačiai prieinamas apgaulei atsparus būdas yra FIDO, o prieigos raktai ir fiziniai raktai jį naudoja. <!-- F64 F60 --> Jungtinės Karalystės Nacionalinis kibernetinio saugumo centras (NCSC) 2026 m. balandžio 23 d. paskelbė, kad prieigos raktai dabar turėtų būti pirmasis naudotojų pasirinkimas visose skaitmeninėse paslaugose; jei paslauga jų nesiūlo, jis pataria naudoti slaptažodžių tvarkyklę ir antrą prisijungimo žingsnį. <!-- F111 -->
2. **Programėlė.** Jos kodas geresnis nei SMS, bet jį vis tiek galima išvilioti, todėl niekam jo nesakyk. <!-- F66 -->
3. **SMS.** CISA sako, kad SMS nėra atsparus apgaulei, o SIM kortelės pakeitimas – kai sukčiai įtikina operatorių perkelti tavo numerį – yra vienas iš būdų jį apeiti. <!-- F65 F66 --> NIST tokį kodą laiko ribotu būdu: paslauga, kuri jį siūlo, turi siūlyti ir kitą. <!-- F67 --> Jei paslauga siūlo tik SMS, įjunk ir jį: NKSC pataria naudoti daugiaveiksnį autentifikavimą, o kad SMS geriau nei nieko – jau mūsų išvada. <!-- F68 M -->

**Mygtukai**
- Main: **Pradėk nuo el. pašto** → /patikra/15-minuciu/#pirmas-zingsnis
- Second: **Pasirink tvarkyklę** → /irankiai/

## Triukai, kuriuos čia matome

- [Tavo slaptažodis nutekėjo](/scenarijai/slaptazodis-nutekejo/) – nutekėjimas, pakartotinis naudojimas, perėmimas. <!-- F69 F71 -->
- [Žinutė su kodu](/scenarijai/zinute-su-kodu/) – kodas, kurį jis išvilioja, kad įeitų į tavo paskyrą. <!-- F41 -->

## Kaip tai daro jis

*(Šis sluoksnis uždarytas ir atsidaro paspaudus. Jame – tik tai, ko jis nori ir kodėl jam pavyksta. Kaip jis tai daro, čia nerašome. Paaiškinimas yra mūsų pačių modelis, o faktai pažymėti šaltiniais.)*

### Ko jis nori

Jam reikia ne tavęs, o tos paskyros, kuri atveria daugiausia. <!-- M --> El. paštas jam geriausias pasirinkimas, nes per jį galima atkurti kitų paskyrų slaptažodžius. <!-- F83 --> **Sustabdymo vieta:** el. paštui – ilgas, niekur kitur nenaudotas slaptažodis ir prieigos raktas ar kitas antras žingsnis. <!-- F55 F83 -->

### Ką jis apie tave žino

Pradžiai – tai, kas nutekėjo iš kurios nors paslaugos: tavo el. pašto adresą, o kartais ir slaptažodį. <!-- M --> Ar tavo adresas nutekėjo, gali patikrinti ir tu. <!-- F69 --> Jis nežino, ar tą patį slaptažodį naudoji kitur. <!-- M --> **Sustabdymo vieta:** patikrink, ar tavo adresas nenutekėjo, ir kiekvienai paskyrai turėk skirtingą slaptažodį. <!-- F71 -->

### Kodėl tai veikia

Veikia jo silpnų vietų sąrašas: pakartotas slaptažodis, antras žingsnis, kurį galima išvilioti, ir kodas, kurį išduodi tu. <!-- M --> Kiekviena jų sutrumpina kelią iki tavo paskyros; svarbiausia grandinė aprašyta [čia](/temos/kaip-veikia-atakos/). <!-- M --> **Sustabdymo vieta:** kiekvienai silpnai vietai – savo atsakymas lentelėje žemiau.

### Kur jį sustabdyti

| Jo sąrašas | Tavo atsakymas |
|---|---|
| Tas pats slaptažodis daugelyje paskyrų | Skirtingas kiekvienai; tvarkyklė juos įsimena. <!-- F71 F72 --> |
| Trumpas, nuspėjamas ar nutekėjęs slaptažodis | Ilgas; bent 15 ženklų, jei jis vienas saugo paskyrą. <!-- F55 F58 --> |
| Silpnas antras žingsnis (SMS) | Prieigos raktas ar fizinis raktas; jei jų nėra – programėlė. <!-- F60 F64 F66 --> |
| Kodas, kurį pasakai tu | Niekam nesakyk ir neįvesk ten, kur paprašė svetimas; NKSC pataria niekada neatskleisti SMS kodų ir PIN. <!-- F42 --> |
| El. paštas kaip raktas į kitas paskyras | Pirmiausia saugok jį. <!-- F83 --> |

## Susiję

- **Kitos temos:** [Kaip veikia atakos](/temos/kaip-veikia-atakos/), [Apgaulė ir sukčiavimas](/temos/apgaule/)
- **Patikra:** [Patikra per 15 minučių](/patikra/15-minuciu/)
- **Įrankiai:** [Slaptažodžių tvarkyklės](/irankiai/)
- **Žodynas:** [Slaptažodžių tvarkyklė](/zodynas/#slaptazodziu-tvarkykle), [Antras prisijungimo žingsnis](/zodynas/#antras-prisijungimo-zingsnis), [SIM kortelės pakeitimas](/zodynas/#sim-korteles-pakeitimas)

## Šaltiniai ir patikrinta

Patikrinta: 2026-10-25. Faktai surašyti [Šaltiniuose](/saltiniai/):
- NIST SP 800-63B-4: ilgis, jokių sudėties taisyklių, jokių periodinių keitimų, tikrinimas pagal sąrašą, tvarkyklės. <!-- F54 F55 F56 F57 F58 F59 -->
- „Google“ ir „Microsoft“ lietuviški puslapiai: prieigos raktas, duomenų išviliojimas, slaptažodžių tvarkyklė. <!-- F61 F62 F72 -->
- FIDO bendruomenė (passkeys.dev) ir CISA: kodėl prieigos raktai atsparūs apgaulei; SMS ir SIM kortelės pakeitimas. <!-- F60 F64 F65 F66 -->
- NIST 800-63B-4: telefono tinklas kaip ribotas būdas. <!-- F67 -->
- NKSC: daugiaveiksnis autentifikavimas; patikra; slaptažodžių valdymo įrankiai. <!-- F42 F68 F71 -->
- Have I Been Pwned: nemokama nutekėjimų patikra. <!-- F69 -->
- NCSC (JK): el. paštas kaip raktas į kitas paskyras; 2026-04-23: prieigos raktai – pirmasis pasirinkimas. <!-- F83 F111 -->
