Page: /pazeidziamumai/ (Spragos ir atnaujinimai), the hub of the three update guides. Phase A of `docs/VULNERABILITIES-PLAN.md`.
Purpose: someone heard about a software flaw, or wonders what they should update. The page says what a vulnerability and a patch are in two lines, sends each reader to the one guide that fits (phone and computer, website, server), and says plainly that there is no live list here and where the official warnings are. Search: *pažeidžiamumas*, *saugumo spraga*, *ką atnaujinti*, *automatiniai atnaujinimai*.
FACTS used: F1022, F1023, F1026, F1027, F1032, F1041, F1042. `M` rests on our editorial model.
Linked from (to wire at the build): `/temos/irenginiai/` (the updates bullet), Turinys, Šaltiniai, Kas pasikeitė, the four glossary entries.
Review: second reader (Opus, 2026-11-09): one finding, „usually enough" narrowed to the phone and the computer, applied. „Jis" kept for the scammer only.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Ką atnaujinti: telefonas, svetainė, serveris – Suktas
**Aprašas (meta):** Programose randama spragų, o gamintojai jas taiso. Ką atnaujinti telefone, svetainėje ir serveryje, kaip tai įjungti automatiškai ir kur skaityti oficialius įspėjimus.

# Spragos ir atnaujinimai

Programose pasitaiko silpnų vietų, kuriomis kas nors gali pasinaudoti. Tokia silpna vieta vadinama pažeidžiamumu arba spraga. <!-- F1022 --> Gamintojas išleidžia pataisą, bet ji saugo tik tada, kai yra įdiegta. <!-- F1023 M --> Telefone ir kompiuteryje dažniausiai užtenka vieną kartą įjungti automatinius atnaujinimus. <!-- F1032 F1041 M -->

## Kas tau aktualu {#vadovai}

- [Telefonas ir kompiuteris](/pazeidziamumai/telefonas-ir-kompiuteris/): kur įjungti automatinius atnaujinimus ir ką daryti su senu telefonu. <!-- M -->
- [Svetainė](/pazeidziamumai/svetaine/): jei turi svetainę, net ir mažą, ir nežinai, kas ją atnaujina. <!-- M -->
- [Serveris](/pazeidziamumai/serveris/): jei serverį prižiūri tu. <!-- M -->

## Kas pavojinga dabar {#dabar}

Nuolat atnaujinamo pavojingų spragų sąrašo čia nelaikome: jei toks sąrašas pasentų ir savo programos jame nerastum, galėtum be reikalo nurimti. <!-- M --> Oficialūs įspėjimai skelbiami šiose vietose:

- **Nacionalinis kibernetinio saugumo centras (NKSC).** Svetainėje [nksc.lt](https://www.nksc.lt/) yra skiltis „Naujienos ir saugumo pranešimai“. <!-- F1042 --> Ten 2026 m. spalio 21 d. buvo paskelbtas įspėjimas dėl PHP programavimo kalbos. <!-- F1027 --> Nuolat pildomo spragų sąrašo NKSC svetainėje neradome. <!-- F1042 -->
- **Tavo programos gamintojas.** Gamintojas geriausiai žino, kurioje versijoje spraga pataisyta. <!-- M -->
- **JAV agentūros CISA [sąrašas](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)** spragų, kuriomis tikrai naudojamasi. <!-- F1026 --> Sąrašas angliškas, skirtas organizacijoms ir nepasako, ką naudoji tu. <!-- F1026 -->

## Žodžiai {#zodziai}

- [Pažeidžiamumas](/zodynas/#pazeidziamumas)
- [Pataisa](/zodynas/#pataisa)
- [Nulinės dienos spraga](/zodynas/#nulines-dienos-spraga)
- [CVE](/zodynas/#cve)

## Ko čia nerasi {#ko-nerasi}

Jokių spragų veikimo aprašymų, jokių nurodymų, kaip jomis pasinaudoti, ir jokių būdų surasti neatnaujintus įrenginius ar svetaines. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Šaltiniai ir patikrinta {#saltiniai}

Patikrinta: 2026-11-09. Oficialaus lietuviško šių žodžių apibrėžimo neradome. <!-- F1022 --> Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- NKSC, 2026-10-21 ir svetainės pradžios puslapis (skaityta 2026-11-09): PHP įspėjimas, „Naujienos ir saugumo pranešimai“. <!-- F1027 F1042 -->
- NKSC, „Interneto svetainių apsauga“ (be datos, skaityta 2026-11-09): automatiniai saugumo atnaujinimai. <!-- F1032 -->
- NIST (JAV) žodynas (be datos, skaityta 2026-11-09): pažeidžiamumas, pataisa. <!-- F1022 F1023 -->
- CISA (JAV; be datos, skaityta 2026-11-09): sąrašas, automatiniai atnaujinimai. <!-- F1026 F1041 -->
