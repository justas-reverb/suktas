Page: /irankiai/grapheneos/ (GrapheneOS: kas tai ir ar verta ją diegti), a tool article (2026-11-07).
Purpose: answer *grapheneos*, *grapheneos kaip įdiegti*, *grapheneos bankų programėlės*, *grapheneos smart-id*: what it is, who it suits, what to know before installing (bank apps and Smart-ID, the wipe, carrier-locked phones), and the steps through the official installer only. Bank apps and Smart-ID are said as the sources say them: GrapheneOS calls bank apps a problem class and says many work with sandboxed Google Play (F976); Smart-ID says it refuses rooted devices and supports Android and iOS, and names no custom OS (F980). So the page promises neither that they work nor that they fail. The author's own use comes from `/apie/` (pažadas, confirmed by the author 2026-10-25). Not stated: Lithuanian as a system language, the foundation's country, any Lithuanian bank's position (FACTS B73, Not found).
FACTS used: F970–F980. `M` rests on our editorial model.
Linked from: `/irankiai/` (the GrapheneOS card's „Plačiau"), `/irankiai/mullvad/`, `/irankiai/tailscale/`, `/temos/irenginiai/` (Padeda), Turinys, Šaltiniai, Kas pasikeitė.
Review: second reader (Opus), 2026-11-07, read the network and phone cards and the three tool articles against F950–F982 and the saved pages. Must fix 4, all applied; optional 1, 1 applied. No tag was contradicted by its source; the fixes removed an IP-tracking overclaim, masculine forms, a mistranslated „profile“, and spelled out that the GrapheneOS wipe removes Smart-ID, bank apps and second-step codes. Not re-read at source: F955, F956, F966, F969 beyond FACTS. No native Lithuanian reader yet.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** GrapheneOS: kas tai ir ar verta ją diegti – Suktas
**Aprašas (meta):** „GrapheneOS“ – privatumui ir saugumui skirta „Pixel“ telefonų sistema. Kam ji tinka, ką žinoti apie banko programėles ir „Smart-ID“ ir kaip ją įdiegti.

# GrapheneOS: kas tai ir ar verta ją diegti

**Skaitymo laikas:** 4 min. · **Patikrinta:** 2026-11-07 ([Šaltiniai](/saltiniai/))

## Trumpai

„GrapheneOS“ – privatumui ir saugumui skirta telefono operacinė sistema, kurioje veikia „Android“ programėlės. <!-- F970 --> Ją kuria ne pelno siekiantis atviro kodo projektas, įkurtas 2014 m. <!-- F970 --> Joje nėra „Google“ paslaugų, o „Google Play“ gali įsidiegti kaip paprastą programėlę, be jokių ypatingų teisių. <!-- F970 F975 --> Ji veikia tik „Google Pixel“ telefonuose ir atsisiunčiama nemokamai. <!-- F971 F978 --> Šios svetainės autorius ją naudoja savo telefone. <!-- pažadas -->

## Kam verta

- **Jei nori, kad „Google“ gautų mažiau.** „Google“ paslaugų sistemoje nėra, o įdiegta „Google Play“ yra paprasta programėlė be ypatingos prieigos. <!-- F970 F975 -->
- **Jei nori ilgai gauti atnaujinimus.** „Pixel“ telefonai nuo 8-osios kartos turi bent 7 metų palaikymo garantiją nuo jų pasirodymo, o atnaujinimai atsisiunčiami patys, fone. <!-- F971 F977 -->
- **Jei jau turi „Pixel“ arba vis tiek jį pirksi.** Kitų telefonų sistema nepalaiko. <!-- F971 -->

## Prieš diegiant

- **Banko programėlės ir „Smart-ID“.** Pati „GrapheneOS“ rašo, kad banko programėlės – ypač problemiškos, bet daugeliui jų pakanka tame pačiame telefono profilyje įdiegti „Google Play“. <!-- F976 --> „Google“ šios sistemos nesertifikuoja, o „GrapheneOS“ tikrinimų neapeina. <!-- F976 --> „Smart-ID“ rašo, kad neveikia telefonuose su „root“ teisėmis ir palaiko „Android“ ir „iOS“; apie „GrapheneOS“ jos puslapiai nieko nesako. <!-- F980 --> Ar veiks tavo banko programėlė ir „Smart-ID“, iš anksto pasakyti negalime. <!-- M -->
- **Diegiant telefonas ištrinamas.** Dingsta visi duomenys, todėl pirma pasidaryk atsarginę kopiją. <!-- F973 M -->
- **Operatoriaus užrakintas telefonas.** Į tokį sistemos gali nepavykti įdiegti; tai daugiausia JAV operatorių bėda. <!-- F972 -->

## Kaip pradėti

1. **Telefonas.** Kūrėjai rekomenduoja pirkti tik „Pixel 8“ ar naujesnį (iki „Pixel 10a“) ir ne operatoriaus versiją. <!-- F971 F972 -->
2. **Atsarginė kopija.** Išsaugok nuotraukas ir kontaktus, o antro žingsnio kodus (autentifikavimo programėlę) perkelk į kitą įrenginį – kitaip gali nebeprisijungti prie savo paskyrų. <!-- M --> Diegiant „Smart-ID“ ir banko programėlės ištrinamos, todėl jas teks užregistruoti iš naujo, net jei veiks. <!-- F973 M --> Prieš diegiant žinok, kaip prisijungsi prie banko be šio telefono. <!-- M F980 -->
3. **Tik oficialus diegimo įrankis:** [grapheneos.org/install/web](https://grapheneos.org/install/web). <!-- F973 --> Trečiųjų šalių instrukcijos dažnai pasenusios. <!-- F973 --> Reikės kompiuterio su „Chrome“, „Edge“ ar kita „Chromium“ naršykle ir USB laido. <!-- F973 -->
4. **Pabaigoje užrakink įkrovos tvarkyklę** (angl. *bootloader*): tik tada veikia visas patikrintas paleidimas. <!-- F973 -->
5. **Palik automatinius atnaujinimus įjungtus.** <!-- F977 -->
6. **Jei reikia „Google“ programėlių,** „Google Play“ įsidiek iš „GrapheneOS“ programėlių parduotuvės. <!-- F975 -->

**Mygtukai**
- Main: **Kortelė Įrankiuose** → /irankiai/#k-grapheneos
- Second: **Visi įrankiai** → /irankiai/

## Ką stebėti

- **Ar sistema tikra.** Turint antrą „Android“ telefoną, programėle „Auditor“ galima patikrinti, ar telefono įranga ir sistema tikros. <!-- F974 -->
- **VPN.** Kūrėjai iš VPN programėlių rekomenduoja tik oficialią „WireGuard“ arba [„Mullvad“](/irankiai/mullvad/) programėlę. <!-- F979 -->
- **Naršyklė.** Numatytoji naršyklė – sustiprinta „Vanadium“. <!-- F977 -->

## Susiję

- **Įrankiai:** [Mullvad VPN](/irankiai/mullvad/), [Tailscale](/irankiai/tailscale/)
- **Temos:** [Įrenginiai ir tinklas](/temos/irenginiai/)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-07. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- „GrapheneOS“ (pagrindinis puslapis, DUK, funkcijos, naudojimas, diegimas, parama): kas tai, telefonai, atnaujinimai, „Google Play“, banko programėlės, diegimas, „Auditor“, VPN, licencija. <!-- F970 F971 F972 F973 F974 F975 F976 F977 F978 F979 -->
- „Smart-ID“ pagalba (SK ID Solutions): „root“ teisės, palaikomos sistemos, saugumo patikros klaida. <!-- F980 -->
