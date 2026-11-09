Page: /treniruote/smart-id/ (Žaidimas, the second game of Treniruotė, phase 3). Drafted 2026-11-01.
Purpose: the "confirm it in Smart-ID" scam as a game. Scene 1: a call from the „bank's security team" asks the reader to confirm a request „to cancel a suspicious payment", and the phone shows a payment request; three choices (PIN2, „Atšaukti", end the call). Scene 2: three requests, each with the moment it arrived (a login the reader started on a typed address, a payment while logging in through a search link, a „buyer's" link „to receive the money"); „Įvesti PIN" opens each one's popup, „Atšaukti" one shared popup. The confirmation app is invented („Pavyzdžio ID"), standing in for Smart-ID, whose name appears only in words; the bank, names and amounts are invented; every mock is stamped and nothing can be typed (button fields, no form). Works with JavaScript off (native popovers; a browser without them shows the answers in place). Search: none planned; readers come from the scenario and the hub.
FACTS used: F13, F123, F164, F165, F166, F169, F170, F171, all already on `/scenarijai/smart-id-patvirtinimas/`, whose words this page reuses; no new facts. `M` rests on our editorial model. The levers are Autoritetas, Baimė and Nauda (`/temos/kaip-veikia-atakos/`).
Linked from: `/treniruote/` (the hub's list), the scenario `smart-id-patvirtinimas` (a line under „Tavo ėjimas"), Turinys, Kas pasikeitė.
Review: the §6.10 second reader (Opus) passed the game on 2026-11-01, after 9 fixes, none to the test question: the title says „per „Smart-ID““; the reader is no longer „pats/pačiam“ (5 places); „jo programėlės“ became „banko“ (3 places); card 2 now has the PIN1 login F169 describes; the card-2 and card-3 popups gained a route for a reader it already happened to (F170 F13); the shared „Atšaukti“ popup no longer sends a card-2 reader back to restart a login, its „visada saugu“ became „nieko nepakenks“, and it carries his side and the call to the bank; „pataria bankai“ names Lietuvos bankas and Luminor; „tikrojoje“. Re-read at source: F164–F166, F169–F171; not re-read: F13, F123 (the siblings' wording). The mock passes if „Pavyzdžio ID“ copies nothing of Smart-ID's look (no PIN pad, not its colours), every mock keeps its stamp, the fields are buttons with no form. No native Lithuanian reader has read it.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Ką iš tikrųjų tvirtini per „Smart-ID“? Treniruotė – Suktas
**Aprašas (meta):** Saugi treniruotė: skambutis iš „banko“ ir trys patvirtinimo užklausos. Spausk, ką spaustum iš tikrųjų, ir pamatyk, ką tuo metu daro sukčius.

# Ką iš tikrųjų tvirtini per „Smart-ID“?

Skambutis iš „banko“ ir trys užklausos telefone. Spausk, ką spaustum iš tikrųjų: iššoks paaiškinimas, ką tuo metu daro sukčius ir kaip jį sustabdyti. <!-- M --> Tikrąją „Smart-ID“ programėlę čia pakeičia išgalvota „Pavyzdžio ID“, bet kaip ir tikrojoje, užklausos lange parašyta, ką tvirtini. <!-- F166 F169 -->

**Tai mokomasis pavyzdys.** Bankas, programėlė, vardai ir sumos išgalvoti, o mygtukai nieko nepriima: tai, kurį atsakymą renkiesi, niekur neišsiunčiama ir neišsaugoma. Skaitiklis sužino tik tiek, kad puslapis atidarytas ir jame kas nors paspausta ([ką skaičiuojame](/privatumo-pranesimas/#ka-skaiciuojame)). <!-- pažadas F123 -->

Skaičiuojamas pirmas pasirinkimas kiekviename žingsnyje. Visur rinkis saugų kelią – ir laimėsi. <!-- shown with JavaScript only, like the Rezultatas box (docs/copy/treniruote/index.md) -->

## Situacija

Skambina „Pavyzdžio banko saugos tarnyba“: iš tavo sąskaitos esą bandoma pervesti pinigus, ir kad mokėjimą atšauktų, reikia patvirtinti užklausą. Telefone ji jau pasirodė. Ką darai? <!-- F171 M -->

**Skambučio ir užklausos maketas**
- Vyksta pokalbis · „Pavyzdžio banko saugos tarnyba“
- „Matome įtartiną mokėjimą. Kad jį atšauktume, patvirtinkite užklausą.“
- Pavyzdžio ID · Pavyzdžio bankas · **Mokėjimas** · 1 480,00 € · Gavėjas: J. Pavyzdys
- **Įvesti PIN2** · **Atšaukti**
- **Baigiu pokalbį ir skambinu bankui**

<!-- popup: PIN2 per skambutį -->

**Pagavau!** – taip dabar pagalvotų sukčius. Patvirtinai ne atšaukimą, o pervedimą: užklausoje buvo parašyta „Mokėjimas“, suma ir gavėjas. <!-- F169 F171 --> Taip nutinka bet kam: skambinantis gąsdina ir skubina, kad lango neperskaitytum. <!-- F171 M --> Įtartinas mokėjimas buvo tik pasakojimas: pervedimą pradėjo jis pats, o tavo PIN2 jam buvo paskutinis trūkstamas žingsnis. <!-- F171 F169 M -->

**Tavo ėjimas:** jei skambinantis prašo ką nors patvirtinti, baik pokalbį ir paskambink bankui numeriu iš banko programėlės. <!-- F171 F13 --> Jei tai jau nutiko iš tikrųjų: [ką daryti pirmiausia](/jei-apgavo/#kodai). <!-- F164 F13 -->

<!-- popup: Atšaukti per skambutį -->

**Gerai, kad perskaitei.** Užklausa sako „Mokėjimas“, o tu nieko nepradėjai, todėl „Atšaukti“ – teisingas mygtukas. <!-- F166 F171 --> Bet sukčius vis dar kalba ir gali bandyti dar kartą. Jei užklausos vis kartojasi, tai aiškus ženklas, kad gali vykti apgaulė. <!-- F170 M -->

**Tavo ėjimas:** baik pokalbį ir susisiek su banku numeriu iš banko programėlės. <!-- F171 F13 -->

<!-- popup: baigiu pokalbį -->

**Taip ir daryk.** Baigti pokalbį ir savarankiškai susisiekti su banku – būtent taip pataria Lietuvos bankas ir „Luminor“ specialistas, kai skambinantis prašo ką nors patvirtinti. <!-- F171 F13 --> Užklausą telefone atšauk arba palik: po kelių minučių ji baigsis pati. <!-- F166 --> Be pokalbio sukčius nebeturi kuo tavęs skubinti. <!-- M -->

**Kurią užklausą tvirtintum?** → #uzklausos

## Kurią užklausą tvirtintum? {#uzklausos}

Trys užklausos, kiekviena atėjusi kitu metu. Prie kiekvienos parašyta, ką tuo metu darei. <!-- M -->

**Užklausų maketas**
- **Jungiesi prie banko.** Adresą įvedei ranka, o banko puslapyje rodomas saugos kodas 4821. · Pavyzdžio ID · Pavyzdžio bankas · **Prisijungimas** · Saugos kodas 4821 · **Įvesti PIN1** · **Atšaukti**
- **Banką radai paieškoje.** Įvedei prisijungimo duomenis ir patvirtinai prisijungimą PIN1, o puslapis vis kraunasi. · Pavyzdžio ID · Pavyzdžio bankas · **Mokėjimas** · 2 350,00 € · Gavėjas: J. Pavyzdys · **Įvesti PIN2** · **Atšaukti**
- **Parduodi dviratį skelbimų portale.** „Pirkėjas“ atsiuntė nuorodą: pinigams gauti reikia patvirtinti. · Pavyzdžio ID · Pavyzdžio bankas · **Mokėjimas** · 1 150,00 € · Gavėjas: J. Pavyzdys · **Įvesti PIN2** · **Atšaukti**

<!-- popup: PIN1, prisijungimas -->

**Šią gali patvirtinti.** Prisijungimą pradėjai tu, užklausa sako „Prisijungimas“, o saugos kodas sutampa su rodomu banko puslapyje. <!-- F166 F165 --> Taip verta tikrinti kiekvieną užklausą: kas ją pradėjo, koks veiksmas ir koks kodas. <!-- F166 M --> Sukčiaus čia nėra: kelią į banką pasirinkai tu. <!-- F164 M -->

<!-- popup: PIN2, paieška -->

**Pagavau!** – taip dabar pagalvotų sukčius. Tu jungiesi, o užklausa rodo mokėjimą ir prašo PIN2: tvirtintum pinigų pervedimą. Prisijungiant reikia tik PIN1. <!-- F169 F165 --> Kol puslapis „kraunasi“, sukčius su tavo PIN1 patvirtinimu jau prisijungė prie tikro banko ir pradėjo pervedimą. <!-- F169 -->

**Tavo ėjimas:** spausk „Atšaukti“, uždaryk puslapį ir skambink bankui numeriu iš banko programėlės: kartais dalį pervedimų dar pavyksta sustabdyti. [Ką daryti pirmiausia](/jei-apgavo/#kodai). <!-- F166 F170 F13 -->

<!-- popup: PIN2, pirkėjas -->

**Pagavau!** – taip dabar pagalvotų sukčius. Pinigams gauti PIN2 nereikia: juo tvirtinami pervedimai ir parašai, todėl šia užklausa pinigus siųstum tu. <!-- F165 F170 --> Lietuvos bankas viename ginče nusprendė, kad bankas neprivalo grąžinti 4 720 eurų žmogui, kuris „pinigams gauti“ PIN2 kodu patvirtino mokėjimus. <!-- F170 -->

**Tavo ėjimas:** pinigams gauti nieko netvirtink ir pirkėjo nuorodos nespausk. <!-- F165 F170 M --> Jei per tą nuorodą jau įvedei banko duomenis, iškart skambink bankui numeriu iš banko programėlės: kartais dalį pervedimų dar pavyksta sustabdyti. [Ką daryti pirmiausia](/jei-apgavo/#kodai). <!-- F170 F13 -->

<!-- popup: bet kuris „Atšaukti“ -->

**Atšaukti nieko nepakenks.** <!-- M --> Užklausą, kurios nepradėjai, atšauk mygtuku „Atšaukti“ arba palik: po kelių minučių ji baigsis pati. <!-- F166 --> Bet jei užklausa atėjo po to, kai duomenis įvedei per paieškos ar kieno nors atsiųstą nuorodą, sukčius gali būti jau prisijungęs ir bandys dar kartą: uždaryk tą puslapį ir skambink bankui numeriu iš banko programėlės. <!-- F169 F170 F13 --> Jei prisijungimą pradėjai tu, ranka įvestu adresu ar banko programėle, pradėk iš naujo ten pat. <!-- M F164 --> Jei tokių užklausų vis gauni, nors nieko nepradedi, kreipkis į „Smart-ID“. <!-- F164 -->

<!-- The Rezultatas box (components/TrainScore.astro) stands here; its words are in docs/copy/treniruote/index.md. -->

## Tavo ėjimas

**Prieš įvedant PIN, perskaityk, ką tvirtini: koks veiksmas, kokia suma, koks gavėjas. Jei to nepradėjai tu, spausk „Atšaukti“.** <!-- F166 F167 F169 -->

**Mygtukai**
- Main: **Atidaryk kortelę** → /sustok/kodai-ir-pin/
- Second: **Visas scenarijus** → /scenarijai/smart-id-patvirtinimas/

### Ko čia nerasi

Šis puslapis – ne šablonas: bankas ir programėlė išgalvoti, mygtukai nieko nepriima, todėl įvesti čia nieko neįmanoma. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Šaltiniai ir patikrinta

Patikrinta: 2026-10-31. Faktai – iš scenarijaus [„Patvirtink per „Smart-ID““](/scenarijai/smart-id-patvirtinimas/), visi su datomis [Šaltiniuose](/saltiniai/).
