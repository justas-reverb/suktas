Page: /pazeidziamumai/svetaine/ (Svetainės atnaujinimai). Guide 2 of 3, phase A of `docs/VULNERABILITIES-PLAN.md`, on the scenario template.
Purpose: the owner of a small site who may not know who keeps it updated. Who updates it, what to turn on, what to ask the host, what to do with a PHP version that gets no more fixes and with a site that has been hacked. Search: *svetainės saugumas*, *wordpress atnaujinimai*, *nulaužta svetainė ką daryti*.
FACTS used: F259, F1021, F1027, F1028, F1029, F1030, F1031, F1032, F1037, F1038, F1039. `M` rests on our editorial model. §6: never how a flaw is triggered, never a way of finding unpatched sites, no fixed PHP version numbers (they go stale). Foreign sources are named as foreign.
Linked from (to wire at the build): `/pazeidziamumai/`, `/temos/irenginiai/`, the glossary entries, Turinys, Šaltiniai, Kas pasikeitė.
Review: second reader (Opus, 2026-11-09): layer 2 passes §6 with no change to the test question; findings on isolating a PHP version (said of PHP, in that incident, and the site goes dark), the hosts and the NKSC line, the order of the hacked-site steps, the people's notice, and the Mandiant figures applied. Optional: scanning your own computer refused (not in F1039). F259 not re-read at source; no native Lithuanian reader.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Svetainės saugumas: atnaujinimai ir įskiepiai – Suktas
**Aprašas (meta):** Turi svetainę ir nežinai, kas ją atnaujina? Ką paklausti prieglobos tiekėjo, ką įjungti „WordPress“, ką daryti su sena PHP versija ir nulaužta svetaine.

# Svetainės atnaujinimai

**Angliškai:** website updates, plugins, hosting · **Skaitymo laikas:** 4 min. · **Patikrinta:** 2026-11-09 ([Šaltiniai](/saltiniai/))

## Trumpai

Pasenusi ar nebepalaikoma programinė įranga, pasak NKSC, išlieka viena dažniausių sėkmingų kibernetinių atakų priežasčių. <!-- F1032 --> Jei turi svetainę, pirmiausia sužinok, kas ją atnaujina, ir, kur įmanoma, įjunk automatinius saugumo atnaujinimus. <!-- F1032 M -->

## Kaip tai atrodo

2026 m. spalio 21 d. NKSC įspėjo dėl kritinių spragų PHP programavimo kalboje ir rekomendavo nedelsiant įdiegti pataisymus. <!-- F1027 --> Pasak NKSC, PHP naudoja apie 80 % Lietuvos interneto svetainių. <!-- F1028 --> Tačiau svetainės savininkas dažnai nežino, nei kokia programinė įranga ją sudaro, nei kas turi ją atnaujinti. <!-- M -->

## Kaip atpažinti, kad svetainė jau nulaužta

„WordPress“ dokumentacijoje (angliškai) vardijami tokie ženklai: <!-- F1039 -->

1. **Paieškos sistemos ar kiti įspėja dėl tavo svetainės.** Ji įtraukta į „Google“ ar „Bing“ juoduosius sąrašus arba pažymėta kaip platinanti kenkėjišką programinę įrangą. <!-- F1039 -->
2. **Prieglobos tiekėjas išjungė svetainę.** <!-- F1039 -->
3. **Kas nors praneša, kad iš tavo svetainės puolamos kitos.** <!-- F1039 -->
4. **Matai pakeitimų, kurių niekas neleido daryti.** <!-- F1039 -->

## Tavo ėjimas

**Sužinok, kas atnaujina tavo svetainę, ir, kur įmanoma, įjunk automatinius saugumo atnaujinimus.** <!-- F1032 M -->

## Ką padaryti {#ka-padaryti}

1. **Surašyk, kas sudaro svetainę ir kas iš to pasiekiama internetu.** NKSC tai vadina inventorizacija. <!-- F1028 --> Turinio valdymo sistema, įskiepiai, šablonai, serverio programinė įranga. <!-- F1032 -->
2. **Jei svetainė veikia su „WordPress“.** Daugumoje svetainių automatiniai „WordPress“ atnaujinimai įjungti pagal nutylėjimą; patikrink, ar tavo svetainėje jie neišjungti. <!-- F1037 M --> Įskiepius ir šablonus laikyk naujausios versijos. <!-- F1038 --> Prieš įjungiant jų automatinius atnaujinimus įsitikink, kad galėsi grįžti prie ankstesnės versijos, jei kas nors suges. <!-- F1038 -->
3. **Paklausk prieglobos tiekėjo** (įmonės, kurios serveryje laikoma svetainė): kokia PHP versija veikia, ar ji dar gauna saugumo atnaujinimus ir kas ją atnaujina. <!-- F1028 F1030 M --> 2026 m. spalį NKSC rašė, kad keli didžiausi Lietuvos prieglobos tiekėjai bendros prieglobos klientams jau pritaikė bendrus technologinius sprendimus. Visiškai panaikinti riziką, pasak NKSC, galima tik įdiegus saugumo atnaujinimą. <!-- F1028 -->
4. **Apribok prisijungimą.** Administravimo sąsajos turėtų būti prieinamos tik įgaliotiems naudotojams; įjunk [antrą prisijungimo žingsnį](/zodynas/#antras-prisijungimo-zingsnis), pašalink arba išjunk numatytąsias paskyras. <!-- F1032 -->
5. **Turėk kopijų ir tikrink, ar iš jų pavyksta atkurti svetainę.** <!-- F1032 -->
6. **Svetainę prižiūri kas nors kitas?** Sutartyje numatyk, kad nustatyti saugumo pažeidžiamumai pašalinami per sutartą terminą. <!-- F1032 -->

## Kuo rizikuoji

- **Svetaine.** Ją gali išjungti prieglobos tiekėjas, o paieškos sistemos gali įspėti jos lankytojus. <!-- F1039 -->
- **Klientų duomenimis.** Asmens duomenų saugumo pažeidimą gali tekti pranešti inspekcijai per 72 valandas. <!-- F1021 -->

## Jei jau vėluoji

1. **PHP versijai saugumo atnaujinimų nebėra?** Pirmiausia paklausk prieglobos tiekėjo, ar galima pereiti prie palaikomos versijos. <!-- M --> Per 2026 m. spalio PHP spragas NKSC rašė, kad tokią versiją reikia izoliuoti nuo interneto, o JAV agentūra CISA patarė tokias sistemas atjungti, kol bus atnaujintos. <!-- F1028 F1029 --> Atjungta svetainė lankytojams neveiks. <!-- M -->
2. **Svetainė nulaužta?** „WordPress“ dokumentacijoje patariama susisiekti su prieglobos tiekėju, priverstinai pakeisti visų naudotojų, ypač administratorių, slaptažodžius ir pasidaryti kopiją, o išvalius svetainę ją atnaujinti ir slaptažodžius pakeisti dar kartą. <!-- F1039 --> Jei nežinai, kaip išvalyti, kreipkis į prieglobos tiekėją ar svetainės kūrėją. <!-- M -->
3. **Pranešk NKSC:** cert@nksc.lt. <!-- F259 -->
4. **Galėjo nutekėti asmens duomenys?** Jei pažeidimas kelia pavojų žmonių teisėms, apie jį reikia pranešti Valstybinei duomenų apsaugos inspekcijai per 72 valandas nuo sužinojimo. <!-- F1021 --> Jei pavojus didelis, nedelsiant reikia pranešti ir patiems žmonėms. <!-- F1021 -->

**Mygtukai**
- Main: **Spragos ir atnaujinimai** → /pazeidziamumai/
- Second: **Serveris** → /pazeidziamumai/serveris/

## Kaip tai daro jis

*(Šis sluoksnis jau atvertas. Jame – tik tai, ko jis nori ir kodėl jam pavyksta; nė žodžio apie tai, kaip spragomis naudojamasi. „Jis“ čia – tas, kuris naudojasi neatnaujintomis svetainėmis. Paaiškinimas yra mūsų pačių modelis, o faktai pažymėti šaltiniais.)*

### Ko jis nori

Tavo svetainės kaip įrankio: kad per ją platintų kenkėjišką programinę įrangą arba pultų kitus, ir tavo klientų duomenų. <!-- F1039 M --> Tai, kad svetainė maža, jos neapsaugo: ji jam gali būti vertinga ne dėl to, kas ji tokia, o dėl to, kad neatnaujinta. <!-- M --> **Sustabdymo vieta:** automatiniai saugumo atnaujinimai. <!-- F1032 -->

### Kodėl tai veikia

Svetainės savininkas dažnai nežino, kokia programinė įranga ją sudaro. <!-- M --> JAV agentūra CISA rašo, kad PHP dažnai yra kitos programinės įrangos dalis ir iš pažiūros to gali nesimatyti. <!-- F1029 --> O jam padeda laikas. JAV bendrovė „Mandiant“ išnagrinėjo 2023 m. paskelbtas spragas: iš 41, kuriomis imta naudotis jau po pataisos, 12 % panaudotos per vieną dieną, 56 % per mėnesį. <!-- F1031 --> Šie skaičiai nerodo, kaip greitai tai nutinka būtent mažoms svetainėms. <!-- F1031 --> **Sustabdymo vieta:** sąrašas, kas sudaro svetainę, ir žmogus, atsakingas už jos atnaujinimą. <!-- F1028 M -->

### Kur jį sustabdyti

| Jo triukas | Tavo atsakymas |
|---|---|
| Pasenęs įskiepis ar šablonas | Laikyk naujausios versijos. <!-- F1038 --> |
| PHP versija, kuri nebegauna atnaujinimų | Pereik prie palaikomos; kol negali, atjunk (svetainė tuo metu neveiks). <!-- F1028 F1029 M --> |
| Numatytoji paskyra ar vienas slaptažodis | Pašalink numatytąsias, įjunk antrą prisijungimo žingsnį. <!-- F1032 --> |
| Niekas neatsako už atnaujinimus | Susitark, kas tai daro, ir įrašyk į sutartį. <!-- F1032 M --> |

### Ko čia nerasi

Jokių spragų veikimo aprašymų, jokių nurodymų, kaip jomis pasinaudoti, ir jokių būdų surasti neatnaujintas svetaines. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Susiję

- **Vadovai:** [Spragos ir atnaujinimai](/pazeidziamumai/), [Telefonas ir kompiuteris](/pazeidziamumai/telefonas-ir-kompiuteris/), [Serveris](/pazeidziamumai/serveris/)
- **Temos:** [Įrenginiai ir tinklas](/temos/irenginiai/)
- **Žodynas:** [Pažeidžiamumas](/zodynas/#pazeidziamumas), [Pataisa](/zodynas/#pataisa), [CVE](/zodynas/#cve)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-09. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- NKSC, 2026-10-21 ir 2026-10-22: PHP įspėjimas, klausimai ir atsakymai. <!-- F1027 F1028 -->
- NKSC, „Interneto svetainių apsauga“ (be datos, skaityta 2026-11-09). <!-- F1032 -->
- NKSC, „Pranešti“ (be datos). <!-- F259 -->
- Valstybinė duomenų apsaugos inspekcija (atnaujinta 2025-05-26) ir „Your Europe“ (tikrinta 2026-08-05): 72 valandos. <!-- F1021 -->
- Europos Komisija, bendras pareiškimas dėl PHP (2026-10-21). <!-- F1030 -->
- CISA (JAV; peržiūrėta 2026-10-26): PHP įspėjimas. <!-- F1029 -->
- „Mandiant“ (JAV, „Google“ dalis), 2024-10-16, apie 2023 m. paskelbtas spragas: kaip greitai panaudojamos žinomos spragos. <!-- F1031 -->
- „WordPress“ dokumentacija (angliškai): automatiniai atnaujinimai (be datos), įskiepiai ir šablonai (be datos), nulaužta svetainė (atnaujinta 2026-07-26). <!-- F1037 F1038 F1039 -->
