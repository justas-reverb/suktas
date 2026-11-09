Page: /irankiai/ (Įrankiai): password managers since phase 1; the network and phone group (Mullvad VPN, Tailscale, GrapheneOS) since 2026-11-07, each with its own article under /irankiai/.
Purpose: say how the site chooses tools and list three password managers as cards. The Bitwarden and KeePassXC cards were read at the makers' own pages and repositories on 2026-10-24 (F84–F95); the Google card was read at Google's own pages on 2026-10-25 (F72, F120); Google states no price and nothing about open source, so the card has neither field.
FACTS used: F59, F71, F72, F84–F95, F120; the network and phone cards F950–F980 (read 2026-11-07). `M` marks our own judgement (difficulty, "the free plan is enough to start", backing up the database). Not stated: the Google card's price and code licence; Lithuanian in Bitwarden's phone apps; the phone apps KeePassXC recommends (other makers, unread).

Review: second reader (Opus), 2026-11-07, read the network and phone cards and the three tool articles against F950–F982 and the saved pages. Must fix 6, all applied; optional 4, 2 applied; refused: new labels for the Tailscale card (every card shares one set of labels) and „telefono sistema“ in the title (past 65 characters). No tag was contradicted by its source; the fixes removed an IP-tracking overclaim, masculine forms, a mistranslated „profile“, and spelled out that the GrapheneOS wipe removes Smart-ID, bank apps and second-step codes. Not re-read at source: F955, F956, F966, F969 beyond FACTS. No native Lithuanian reader yet.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Įrankiai: slaptažodžių tvarkyklės, VPN ir telefonas – Suktas
**Aprašas (meta):** Slaptažodžių tvarkyklės, VPN, privatus tinklas ir telefono sistema: kaip renkamės ir ką siūlome. Be reklamos, be partnerių nuorodų.

# Įrankiai

## Kaip renkamės {#kaip-renkames}

- **Pirmiausia nemokami ir teisėti, o atviras kodas – pranašumas.** Jei geriausias pasirinkimas kainuoja, kortelė tai pasako ir paaiškina kodėl. <!-- pažadas -->
- **Jokių „nemokamų“ VPN, nulaužtų programų ar parsisiuntimų ne iš oficialaus šaltinio.** <!-- pažadas -->
- **Jokios reklamos, partnerių nuorodų ar mokamos vietos sąraše.** <!-- pažadas -->
- **Kiekviena kortelė rodo, kada paskutinį kartą tikrinta.** <!-- pažadas -->
- **Ko nepatikrinome, to kortelėje nerašome.** <!-- pažadas -->

## Slaptažodžių tvarkyklės {#slaptazodziu-tvarkykles}

Tvarkyklė įsimena ilgus, skirtingus slaptažodžius už tave. <!-- pažadas --> NIST reikalauja, kad paslaugos leistų naudoti tvarkykles ir automatinį užpildymą, o NKSC pataria naudoti patikimus slaptažodžių valdymo įrankius. <!-- F59 F71 --> Kodėl ir kaip nustatyti: [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/).

### Bitwarden

- **Ką daro:** saugo slaptažodžius ir prieigos raktus užšifruotoje saugykloje ir leidžia juos pasiekti visuose tavo įrenginiuose. <!-- F84 F87 F88 -->
- **Kur veikia:** naršyklės („Chrome“, „Firefox“, „Edge“, „Safari“ ir kitos), „Windows“, „macOS“, „Linux“, „iOS“ ir „Android“ telefonai, taip pat žiniatinklio saugykla. <!-- F86 -->
- **Kaina:** nemokama, be slaptažodžių ir įrenginių skaičiaus ribos. <!-- F87 --> Mokama „Premium“ versija kainuoja 19,80 USD per metus ir prideda antro žingsnio kodų generatorių, failų priedus, skubią prieigą ir saugumo ataskaitas. <!-- F87 --> Pradžiai pakanka nemokamos. <!-- M -->
- **Atviras kodas:** taip, programėlių kodas daugiausia pagal GPL v3.0 licenciją; atskiras katalogas – pagal „Bitwarden“ licenciją. <!-- F85 -->
- **Lietuviškai:** naršyklės plėtinys ir kompiuterio programa išversti į lietuvių kalbą; telefonų programėlių nepatikrinome. <!-- F90 -->
- **Kas kuria:** „Bitwarden, Inc.“, JAV (Santa Barbara, Kalifornija), nuo 2016 m. <!-- F84 -->
- **Kur laikomi duomenys:** „Bitwarden“ debesyje, JAV arba ES regione; regionas pasirenkamas kuriant paskyrą. <!-- F88 -->
- **Sunkumas:** lengviausia pradėti: užtenka vienos paskyros, kad slaptažodžiai būtų pasiekiami visuose įrenginiuose. <!-- M -->
- **Parsisiųsk tik iš:** [bitwarden.com/download](https://bitwarden.com/download/) arba iš ten nurodytų programėlių parduotuvių. <!-- F86 -->
- **Ką stebėti:** pagrindinio slaptažodžio „Bitwarden“ negali nei atkurti, nei pakeisti už tave. <!-- F89 --> Rinkis ilgą frazę, kurią tikrai atsiminsi, ir įjunk antrą prisijungimo žingsnį ir pačiai „Bitwarden“ paskyrai. <!-- M F87 -->

Patikrinta: 2026-10-24, gamintojo puslapiuose ir jo „GitHub“ saugykloje. <!-- F84 F85 F86 F87 F88 F89 F90 -->

### KeePassXC

- **Ką daro:** saugo slaptažodžius užšifruotame faile, kurį laikai, kur nori: be debesies, be reklamos, be prenumeratos. <!-- F91 -->
- **Kur veikia:** „Windows“ 10 ir 11, „macOS“ 12 ir naujesnė, „Linux“, su naršyklės plėtiniu. <!-- F92 --> Savo telefono programėlės neturi; gamintojas nurodo kitų kūrėjų programėles („Android“ – KeePassDX, KeePass2Android; „iOS“ – Strongbox, KeePassium), kurių mes netikrinome. <!-- F92 -->
- **Kaina:** nemokama. <!-- F91 -->
- **Atviras kodas:** taip, GPL licencija (svetainėje nurodyta GPLv3, kodo saugykloje – GPL-2 arba GPL-3). <!-- F91 -->
- **Lietuviškai:** išversta apie 81 % sąsajos, likusi dalis – angliškai. <!-- F95 -->
- **Kas kuria:** tarptautinė KeePassXC komanda; teisinis kontaktas – Veimare, Vokietijoje. <!-- F93 -->
- **Kur laikomi duomenys:** tik tavo faile; serverio nėra, todėl failą tarp įrenginių perkeli tu. <!-- F91 F95 -->
- **Sunkumas:** sunkiau – failą ir jo kopijas tvarkai tu, o telefonui reikia kitos programėlės. <!-- M -->
- **Parsisiųsk tik iš:** [keepassxc.org/download](https://keepassxc.org/download/). Prie kiekvieno failo yra parašas ir SHA-256 kontrolinė suma, kad galėtum patikrinti, ar failas tikras. <!-- F94 -->
- **Ką stebėti:** daryk duomenų bazės failo atsargines kopijas kitoje vietoje. <!-- M --> Jei naudoji rakto failą, saugok ir jo kopiją: be rakto failo duomenų bazės neatidarysi. <!-- F95 -->

Patikrinta: 2026-10-24, gamintojo puslapiuose ir jo „GitHub“ saugykloje. <!-- F91 F92 F93 F94 F95 -->

### „Google“ slaptažodžių tvarkyklė

- **Ką daro:** saugo slaptažodžius ir prieigos raktus; lietuviškai ji vadinasi „Google“ slaptažodžių tvarkyklė. <!-- F72 -->
- **Kur veikia:** įtaisyta į „Chrome“ naršyklę visose platformose ir į „Android“; „iPhone“ ir „iPad“ įrenginiuose ji geriausiai veikia su „Chrome“. <!-- F120 -->
- **Kas kuria:** „Google“; Europos ekonominėje erdvėje paslaugas teikia „Google Ireland Limited“, Airija. <!-- F120 -->
- **Sunkumas:** jei jau naudoji „Chrome“ ar „Android“ telefoną, nieko diegti nereikia. <!-- M F120 -->
- **Ką stebėti:** įjunk patvirtinimą dviem veiksmais (taip „Google“ vadina antrą prisijungimo žingsnį) ir pridėk atkūrimo informaciją. <!-- F120 --> Jei įjungsi šifravimą įrenginyje ir pamirši „Google“ slaptažodį, gali prarasti prieigą prie išsaugotų slaptažodžių. <!-- F120 -->

Patikrinta: 2026-10-25, gamintojo puslapiuose. <!-- F72 F120 -->

**Mygtukai**
- Main: **Pasirink tvarkyklę** → #slaptazodziu-tvarkykles
- Second: **Kaip renkamės** → #kaip-renkames

## Tinklas ir telefonas {#tinklas-ir-telefonas}

Šie trys saugo ne slaptažodžius, o ryšį ir telefoną. Nuo apgaulės nesaugo nė vienas: tam skirti [Įpročiai](/sustok/). <!-- M --> Kiekvienas turi savo puslapį su visomis detalėmis. <!-- pažadas -->

### Mullvad VPN {#k-mullvad}

- **Ką daro:** užšifruoja interneto ryšį: interneto tiekėjas nemato, ką veiki, o svetainės mato ne tavo, o VPN serverio IP adresą. <!-- F950 F982 M -->
- **Kur veikia:** „Windows“ 10 ir naujesnė (64 bitų), „macOS“, „Linux“, „Android“ 9 ir naujesnė, „iOS“. <!-- F951 -->
- **Kaina:** 5 € per mėnesį su PVM, iki 5 įrenginių; nemokamos versijos nėra. <!-- F952 F959 --> Siūlome mokamą, nes nemokama paslauga irgi turi iš kažko gyventi; „Mullvad“ rašo, kad beveik visada – iš reklamos, tavo duomenų ar apribotų funkcijų. <!-- F952 F982 -->
- **Atviras kodas:** taip, GPL-3 licencija. <!-- F957 -->
- **Lietuviškai:** ne, kompiuterio programoje lietuvių kalbos nėra. <!-- F960 -->
- **Kas kuria:** „Mullvad VPN AB“, Geteborgas, Švedija, nuo 2009 m. <!-- F958 -->
- **Paskyra:** tik atsitiktinis paskyros numeris, be vardo ir el. pašto; veiklos žurnalų, pasak taisyklių, nesaugo. <!-- F953 F954 -->
- **Sunkumas:** lengva: įdiegi programėlę ir įjungi. <!-- M -->
- **Parsisiųsk tik iš:** [mullvad.net/en/download/vpn](https://mullvad.net/en/download/vpn) arba „Google Play“, „F-Droid“, „App Store“. <!-- F951 -->
- **Ką stebėti:** VPN nesaugo nuo apgaulės, o svetainės, kuriose prisijungi, vis tiek žino, kas tu. <!-- M F982 -->
- **Plačiau:** [Mullvad VPN: ką VPN apsaugo, o ko ne](/irankiai/mullvad/)

Patikrinta: 2026-11-07, gamintojo puslapiuose ir jo „GitHub“ saugykloje. <!-- F950 F951 F952 F953 F954 F957 F958 F959 F960 -->

### Tailscale {#k-tailscale}

- **Ką daro:** sujungia tavo įrenginius į privatų, užšifruotą tinklą, kad jie vienas kitą pasiektų iš bet kur. <!-- F961 M --> Tavo naršymo internete pagal nutylėjimą neliečia. <!-- F962 -->
- **Kur veikia:** „Windows“, „macOS“, „Linux“, „Android“, „iOS“. <!-- F963 -->
- **Kaina:** nemokama asmeniniam, nekomerciniam naudojimui: iki 6 žmonių, įrenginių – neribotai. <!-- F964 --> Tai ne „nemokamas VPN“: per savo serverius „Tailscale“ tavo naršymo į internetą neišveda; tai daro tik tavo pasirinktas išėjimo mazgas – tavo įrenginys arba mokamas „Mullvad“ priedas. <!-- F962 F967 F969 M -->
- **Atviras kodas:** iš dalies – programėlių kodas daugiausia atviras (BSD-3), ryšius koordinuojantis serveris – uždaras. <!-- F965 -->
- **Kas kuria:** „Tailscale US Inc.“ (JAV) paskyroms nuo 2024-09-03, senesnėms – „Tailscale Inc.“ (Kanada). <!-- F966 -->
- **Kur laikomi duomenys:** srauto turinys užšifruotas nuo galo iki galo, ir „Tailscale“ jo pasiekti negali; bendrovė renka metaduomenis: įrenginių pavadinimus, IP adresus, prisijungimo laikus. <!-- F967 -->
- **Sunkumas:** vidutinis: reikia žinoti, kuriuos įrenginius jungi ir kada įjungti išėjimo mazgą. <!-- M -->
- **Parsisiųsk tik iš:** [tailscale.com/download](https://tailscale.com/download). <!-- F963 -->
- **Ką stebėti:** prisijungiama per „Google“, „Microsoft“, „Apple“ ar „GitHub“ paskyrą, todėl tą paskyrą apsaugok antru žingsniu. <!-- F968 -->
- **Plačiau:** [Tailscale: privatus tinklas tavo įrenginiams](/irankiai/tailscale/)

Patikrinta: 2026-11-07, gamintojo puslapiuose. <!-- F961 F962 F963 F964 F965 F966 F967 F968 F969 -->

### GrapheneOS {#k-grapheneos}

- **Ką daro:** privatumui ir saugumui skirta telefono sistema, kurioje veikia „Android“ programėlės; „Google“ paslaugų joje nėra. <!-- F970 -->
- **Kur veikia:** tik „Google Pixel“ telefonuose; kūrėjai rekomenduoja pirkti „Pixel 8“ ar naujesnį. <!-- F971 -->
- **Kaina:** sistema nemokama, bet reikia „Google Pixel“ telefono; paramą priima ne pelno siekiantis „GrapheneOS“ fondas. <!-- F971 F978 -->
- **Atviras kodas:** taip, savo projektams – MIT licencija. <!-- F970 F978 -->
- **Kas kuria:** ne pelno siekiantis atviro kodo projektas, įkurtas 2014 m. <!-- F970 -->
- **Sunkumas:** sunkiausia: diegiant telefonas ištrinamas, reikia kompiuterio ir USB laido. <!-- F973 M -->
- **Parsisiųsk tik iš:** [grapheneos.org/install/web](https://grapheneos.org/install/web), oficialaus diegimo įrankio. <!-- F973 -->
- **Ką stebėti:** diegiant ištrinami visi duomenys, todėl „Smart-ID“ ir banko programėles teks įsidiegti ir užregistruoti iš naujo. <!-- F973 M --> Kai kurios banko programėlės gali neveikti, o ar veiks „Smart-ID“, jo puslapiai nesako; prieš diegiant žinok, kaip prie banko prisijungsi kitaip. <!-- F976 F980 M -->
- **Plačiau:** [GrapheneOS: kas tai ir ar verta ją diegti](/irankiai/grapheneos/)

Patikrinta: 2026-11-07, gamintojo puslapiuose. <!-- F970 F971 F973 F976 F978 F980 -->

## Kitos grupės

Antras prisijungimo žingsnis, naršyklė ir paieška, žinutės: netrukus. <!-- pažadas -->
