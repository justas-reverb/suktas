Page: /scenarijai/netikras-brokeris/ (Scenarijus, channel Skambutis), a phase-2 scenario. Drafted and built 2026-11-04 (`src/pages/scenarijai/netikras-brokeris/index.astro`).
Purpose: an ordinary investment offer online, the form that hands over your number, and the „broker" who then phones, from his side. It starts where `reklama-su-zinomu-veidu` (a famous face) and `padesime-atsiimti-pensija` (the II-pillar payout) do not, and links to them rather than repeating them. Searches it answers: investiciniai sukčiai, brokeris skambina, investavimo platforma sukčiai.
FACTS used: F2, F13, F14, F15, F104, F118, F190, F194, F305, F348, F350, F351, F353, F458–F475 (B39), F694 (B49, added 2026-11-07). The page never says a call after a form is always a scam: a real firm may ring back someone who asked, so the form explains the call and proves nothing, and the move is to hang up and check the firm yourself (F468's „atsitiktinių" is not stretched to it; `M`). A firm missing from the register is not called a fraud either, since a licence may come from another member state (F469): the move is not to pay and to ask the bank or the police. It never says a Lithuanian-speaking caller is safe (F460), that the scam is growing or falling (F467, so 852 tūkst. stays off the page), or that the money comes back (F194, F352). No description of how they coach people for the bank (F471).
Title: „Investiciniai sukčiai: skambina „brokeris“ – Suktas".
Linked from (wired at the build): the catalogue (`src/lib/catalogue.js`) under „Skambutis", after `padesime-atsiimti-pensija`; the card `padek-ragely` („Kur jis tai bando"); `reklama-su-zinomu-veidu` and `padesime-atsiimti-pensija` (Kiti scenarijai); `/temos/apgaule/`; Turinys; F458–F475 in Šaltiniai; Kas pasikeitė; the count in `docs/copy/pradzia.md`. No native Lithuanian reader yet.
Review: the §6.10 second reader (Opus) read the draft on 2026-11-04; layer 2 and every table row pass the first half of the test question, and five lines or rows had no move for the reader (now added). All 17 must-fix applied: the app step that had the reader call the bank on the controlled phone, now F305's order (cut the connection, call from another device) and ahead of the bank step; the 2 % out of the bank step, told as a total and not as a chance; „jis" for Lietuvos bankas; „Pačiam"; a branch for a firm not on the register (F469); F462's week as an example; „leido atsiimti" against F471 (the association's line now in F465); a stop point that undercut sign 2; 4 mln. and 852 tūkst. side by side; the police's „užpildžius skelbimą" given as a form; Telegram in F470 (F461's line now there); „Netrukus"; the deadline row; three rows without a move; Šaltiniai dates; „ar gali"; sign 3's wording. Adapted one: „svetainės adresą įvesk ranka" is left out, since an address he dictated would pass it. Of 12 optional, 11 applied (steps 1 and 3 merged, so six steps; „kita įstaiga" in the bank step; tell the bank everything; Kielienė's rule for a reader with no form; the number travelling as our inference; „šešis kartus" moved to the paid-rescue step; „dar viena apgaulė"; „Forma" reworded; sunk cost for the repaying alone; „skambinantysis"; the Lietuvos bankas link) and F472 got the association's own line; refused: SEB's big-tech line, which nothing on the page uses. Outside this page: `/jei-apgavo/#nuotolinis` opened with „Pasakyk bankui"; at the build it got F305's cut and second device as its first step. The F694 addition of 2026-11-07 was read by the second reader the same day: „jo" for the victim replaced by „vyro". The eighth pass (built 2026-11-07) added a link to `investicijos-telegram` in the Telegram row and in Kiti scenarijai (F740).

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Investiciniai sukčiai: skambina „brokeris“ – Suktas
**Aprašas (meta):** Užpildei formą apie investavimą, o dabar skambina „brokeris“ ir siūlo pradėti nuo 100 eurų? Trys ženklai ir vienas ėjimas.

# Užpildei formą, o skambina „brokeris“

**Kanalas:** forma internete, skambutis, „Telegram“ · **Ko jis nori:** kad „investuotum“ vis daugiau · **Skaitymo laikas:** 4 min. · **Patikrinta:** 2026-11-07 ([Šaltiniai](/saltiniai/))

## Trumpai

### Kaip tai atrodo

Internete pamatai kvietimą sužinoti, kaip pelningai investuoti, ir užpildai formą. <!-- F458 F459 --> Paskui skambina nepažįstamas žmogus, „brokeris“ ar „konsultantas“. <!-- F458 F459 F467 --> Būna, kad skambutis ateina ir be jokios formos. <!-- F460 -->

Jis siūlo pradėti nuo nedidelės sumos, 100 ar 250 eurų. <!-- F461 --> Profesionaliai atrodančioje platformoje ima augti „pelnas“, o jis nuolat skambina ir ragina pervesti daugiau. <!-- F461 --> Kai nori pinigus atsiimti, atsiranda „mokesčiai“: sumokėk dar šiek tiek, ir atsiimsi viską. <!-- F465 -->

### Trys ženklai

1. **Investuoti siūlo žmogus, kuris pats skambina ar rašo.** Bankų asociacija sako, kad finansų įstaigos atsitiktinių pasiūlymų investuoti telefonu neteikia. <!-- F468 --> Forma paaiškina, iš kur jis turi tavo numerį, bet neįrodo, kas jis. <!-- M --> Dažnai kalbama rusiškai, tačiau tai, kad skambinantysis kalba lietuviškai, irgi nieko neįrodo. <!-- F460 F470 -->
2. **Mažas „bandymas“ ir greitas pelnas.** Lietuvos bankas rašo, kad po gan trumpo laiko, pavyzdžiui, po savaitės, paskyroje rodomi labai pelningi rezultatai, ir priduria: „Jie netikri“. <!-- F462 --> Net pervesta „grąža“ nieko neįrodo: SEB rašo, kad sukčiai ją kartais perveda. <!-- F471 -->
3. **Liepia įsidiegti programą, o atsiimti pinigus leidžia tik susimokėjus.** Prašymą įsidiegti „AnyDesk“ Pinigų plovimo prevencijos kompetencijų centro atstovė vadina ypač pavojingu signalu. <!-- F464 --> 2025 m. policija pranešė apie 70 metų vilnietį: sukčiai nuotoline programa prisijungė prie vyro kompiuterio ir „padėjo“ investuoti netikroje platformoje; per pusmetį vyras neteko 235 tūkst. eurų. <!-- F694 --> Jei atsiimti neleidžia, o spaudžia investuoti daugiau, tu jau sukčių spąstuose, sako Lietuvos bankas. <!-- F465 F348 -->

### Tavo ėjimas

**Padėk ragelį ir patikrink įmonę.** <!-- F466 M --> Kortelė: [Padėk ragelį ir skambink oficialiu numeriu](/sustok/padek-ragely/).

Jei niekur nesikreipei, o nepažįstamas žmogus skambina, siūlo investuoti ir žada didelę grąžą, centro atstovė sako aiškiai: tai sukčiai. <!-- F466 -->

Ar įmonė turi leidimą teikti investicines paslaugas, patikrink [Lietuvos banko finansų rinkos dalyvių sąraše](https://www.lb.lt/lt/finansu-rinku-dalyviai), o ne per jo atsiųstas nuorodas. <!-- F118 F466 --> Sukčiai gali prisistatyti ir žinomų bendrovių atstovais, todėl pavadinimas sąraše dar neįrodo, kad skambino būtent ši įmonė. <!-- F467 M --> Jei sąraše jos nėra, nepervesk, net jei jis sako, kad leidimą turi iš kitos ES šalies: pasitark su savo banku ar policija. <!-- F469 F466 M --> Jei įmonė sąraše yra, susisiek su ja oficialiais kontaktais, ne jo duotu numeriu ar nuoroda. <!-- M -->

**Jei tik užpildei formą,** pinigai dar tavo. <!-- M --> SEB rašo, kad šie sukčiai neretai dalijasi savo aukų duomenimis, tad tavo numeris gali keliauti toliau. <!-- F475 M --> Paskambins dar kartą – vėl padėk ragelį. <!-- M --> Į formą įvedei kortelės ar banko duomenis? Iškart skambink bankui numeriu iš oficialios programėlės ar svetainės. <!-- F13 M -->

### Jei jau pervedei pinigus

Tai gali nutikti bet kam. <!-- M --> Veik iškart:

1. **Daugiau nė cento ir jokių pokalbių su juo,** kad ir ką žadėtų: neatsakyk į jo skambučius ir žinutes. <!-- F466 F351 F190 --> Mokestis už atsiėmimą yra ta pati apgaulė: net jį sumokėjus pinigų atgauti nepavyks. <!-- F353 -->
2. **Įdiegei jo programą ir leidai valdyti įrenginį?** Pirma išjunk „Wi-Fi“ ir mobiliuosius duomenis, o bankui skambink iš kito, saugaus įrenginio (jei kito neturi, iš artimojo telefono) ir pasakyk, kokią prieigą suteikei. <!-- F305 M --> Žingsniai: [Įdiegiau programą](/jei-apgavo/#nuotolinis), [„Parodyk ekraną“](/scenarijai/parodyk-ekrana/).
3. **Skambink bankui** (ar kitai įstaigai, per kurią mokėjai) numeriu iš oficialios programėlės ar svetainės ir prašyk sustabdyti pavedimus. <!-- F13 F474 --> Lietuvos bankas sako, kad kai kuriais atvejais tai dar įmanoma. <!-- F474 --> Kuo anksčiau, tuo geriau, ir skambink, net jei pervedei seniau. <!-- M --> Papasakok viską, ir ką jis liepė sakyti. Jungeisi prie banko kartu su juo ar davei prisijungimo duomenis? Pasakyk ir tai. <!-- F464 F466 M -->
4. **Pranešk policijai** per epolicija.lt ir išsaugok, ką turi: susirašinėjimą, platformos adresą, jo numerį. <!-- F2 M --> Apie tą svetainę [pranešk ir Lietuvos bankui](https://www.lb.lt/lt/pakliuvau-sukciams-ka-daryti): Lietuvos bankas gali blokuoti neteisėtas investavimo svetaines. <!-- F474 F190 -->
5. **Pasakyk artimam žmogui.** Iš vidaus viską objektyviai įvertinti sunku, ypač kai tai trunka ilgai. <!-- F466 -->
6. **Nemokėk tiems, kas siūlo pinigus susigrąžinti.** Lietuvos bankas sako, kad tai dar viena apgaulė. <!-- F14 F15 --> SEB rašo apie klientą, į sukčių pinkles patekusį šešis kartus: bent pusė atvejų buvo pažadai padėti susigrąžinti pinigus. <!-- F475 --> Plačiau: [„Padėsime susigrąžinti pinigus“](/scenarijai/susigrazinti-pinigus/).

Pažadėti negalime: „Swedbank“ paskelbtais Pinigų plovimo prevencijos kompetencijų centro duomenimis, 2025 m. pirmąjį pusmetį iš visos investavimo apgaulių žalos susigrąžinta apie 2 %. Tai bendras skaičius, ne tavo šansas, ir bankui skambinti vis tiek verta. <!-- F194 M -->

Žingsniai: [Jei tave apgavo: išsiunčiau pinigus](/jei-apgavo/#pinigai).

**Mygtukai**
- Main: **Atidaryk kortelę** → /sustok/padek-ragely/

## Kaip tai daro jis

*(Šis sluoksnis jau atvertas. Jame – tik tai, ko jis nori ir kodėl jam pavyksta. Paaiškinimas yra mūsų pačių modelis, o faktai pažymėti šaltiniais.)*

### Ko jis nori

Kad pinigus pervestum tu, ir ne vieną kartą. <!-- F461 M --> Maža pradinė suma, sako centro atstovė Živilė Kielienė, yra būdas įgyti pasitikėjimą ir tik tada išvilioti gerokai daugiau; 100 ar 250 eurų „pabandymas“ gali virsti dešimčių ar net šimtų tūkstančių eurų nuostoliais. <!-- F461 --> 2026 m. policija pranešė apie tokius atvejus: žmogui internete „užpildžius skelbimą“ apie investicines paslaugas (suprantame, kad tai forma), su juo susisiekė nepažįstamieji. 1942 m. gimusi moteris neteko apie 20 tūkst. eurų, kita gyventoja 35,6 tūkst., 1969 m. gimęs vyras 100 tūkst. <!-- F459 F458 M --> Centro duomenimis, 2025 m. dėl investicinio sukčiavimo gyventojai prarado daugiau kaip 4 mln. eurų; rūšys gali persidengti, pavyzdžiui, telefoninis sukčiavimas gali būti tokios schemos dalis. <!-- F467 M --> **Sustabdymo vieta:** kiekvienas pavedimas. Sustoti galima ir po dešimto. <!-- F466 M -->

### Ką jis apie tave žino

Iš formos – tai, ką įrašei, ir tai, kad domiesi investavimu. <!-- F458 M --> Kitką sužino kalbėdamas: klausia apie santaupas ir pajamas, vertina, ar tu gali pasiimti paskolą, ar turi ką parduoti, ar gali iš ko pasiskolinti. <!-- F463 --> **Sustabdymo vieta:** nepažįstamam žmogui telefonu nesakyk, kiek turi ir kiek uždirbi. <!-- M -->

### Kodėl tai veikia

Forma padeda jam labiausiai: skambutis nebeatrodo netikėtas. <!-- M --> Be to, jis naudoja keturis iš penkių kabliukų, kuriuos aprašome [vienoje vietoje](/temos/kaip-veikia-atakos/): <!-- M -->
- **Nauda.** Pelnas ekrane priverčia skaičiuoti, o ne abejoti. <!-- F461 F462 M -->
- **Autoritetas.** Žodis „brokeris“, profesionali platforma, vaizdo skambučiai atrodo kaip įrodymas. <!-- F461 F467 F471 M -->
- **Skuba.** Pasiūlymas esą galioja tik iki rytojaus. <!-- F472 M -->
- **Gėda.** Po nuostolio norisi tylėti. Norą viską atgauti dar vienu mokėjimu Lietuvos bankas vadina sunkiai prarastų sąnaudų klaida. <!-- F348 F350 M -->

**Sustabdymo vieta:** skaičius platformoje nėra pinigai. Net tai, kas grįžo į tavo sąskaitą, neįrodo, kad likusieji yra tikri. <!-- F462 F471 M -->

### Kur jį sustabdyti

| Jo triukas | Tavo atsakymas |
|---|---|
| Skambina, nes palikai numerį formoje | Forma neįrodo, kas jis. Padėk ragelį ir įmonę patikrink Lietuvos banko sąraše. <!-- F118 M --> |
| „Pabandyk nuo 100 eurų“ | Maža suma ir yra kabliukas. Nepervesk nė jos. <!-- F461 M --> |
| Didelis pelnas be rizikos | Lietuvos bankas: „Didelės grąžos be rizikos nebūna.“ Normalus uždarbis, rašo bankas, dažnai yra 5–10 % per metus, ir tai ne pažadas. Kas žada daugiau be rizikos, tam nepervesk. <!-- F104 F473 M --> |
| Pelnas auga platformoje | Lietuvos bankas sako, kad tokie rezultatai netikri. Skaičius ekrane nėra pinigai: daugiau nepervesk. <!-- F462 M --> |
| Pervedė dalį pinigų atgal | Tai dar neįrodo, kad platforma tikra: taip kuriamas pasitikėjimas. Daugiau nepervesk ir patikrink įmonę. <!-- F465 F471 M --> Plačiau: [Kas yra finansinė piramidė](/zodynas/piramide/). |
| Pasiūlymas galioja tik šiandien | Skubinimas yra ženklas, ne priežastis. Padėk ragelį ir patikrink įmonę. Lietuvos banko atstovas sako, kad rimtos bendrovės niekada nesiūlo didelio pelno be rizikos. <!-- F472 M --> |
| Viskas tik žodžiu, per „Telegram“, „WhatsApp“ ar „Viber“ | SEB: dokumentai turi būti raštu ir valstybine kalba. Centro atstovė: tikros investicijos per „WhatsApp“ ar „Viber“ nevyksta, o skambutis per tokias programėles turi kelti įtarimą. Padėk ragelį. <!-- F471 F470 M --> Kaip tai vyksta „Telegram“ grupėse: [Reklama kviečia į „Telegram“, o ten auga „pelnas“](/scenarijai/investicijos-telegram/). <!-- F740 --> |
| Prašo įsidiegti programą ar kartu prisijungti prie banko | Neįsidiek ir nesijunk: Bankų asociacija sako, kad taip jis pats atlieka pavedimus. <!-- F464 --> |
| Ragina pasiskolinti | Lietuvos bankas: „Jokiu būdu neinvestuokite skolintų lėšų!“ <!-- F473 --> |
| Moko, ką sakyti bankui | SEB: joks finansų brokeris nemokys, kaip kalbėti su banko specialistais. Papasakok bankui viską. <!-- F471 M --> |
| Prašo niekam nesakyti | Tai gali būti ženklas, kad jis sukčius, sako SEB. Pasitark su artimu žmogumi. <!-- F471 F466 --> |
| Kad atsiimtum, reikia sumokėti mokestį | Nemokėk. Net sumokėjus pinigų atgauti nepavyks. <!-- F351 F353 --> |
| Skambina „teisininkas“ ir siūlo susigrąžinti pinigus | Kas geriau žino tavo nuostolį, jei ne patys sukčiai ar su jais susiję žmonės? Nemokėk. <!-- F466 F14 F15 --> |

### Ko čia nerasi

Jokių įrankių, paruošto teksto ar žingsnių, kaip tai padaryti. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Susiję

- **Kortelės:** [Padėk ragelį ir skambink oficialiu numeriu](/sustok/padek-ragely/), [Nespausk nuorodos – atsidaryk programėlę ar svetainę](/sustok/nuoroda-ne-is-zinutes/)
- **Tema:** [Apgaulė ir sukčiavimas](/temos/apgaule/)
- **Žodynas:** [Kas yra finansinė piramidė](/zodynas/piramide/)
- **Kiti scenarijai:** [Reklama su žinomu veidu](/scenarijai/reklama-su-zinomu-veidu/), [„Padėsime atsiimti pensiją“](/scenarijai/padesime-atsiimti-pensija/), [„Parodyk ekraną“](/scenarijai/parodyk-ekrana/), [„Padėsime susigrąžinti pinigus“](/scenarijai/susigrazinti-pinigus/), [Prekybos kursai ir signalai už pinigus](/scenarijai/prekybos-kursai-ir-signalai/), [Reklama kviečia į „Telegram“, o ten auga „pelnas“](/scenarijai/investicijos-telegram/)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-07. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- SEB (2024-10-07, 2023-10-23): formos ir skambučiai, sukčiai, apsimetantys brokeriais, pervedama „grąža“, dokumentai, aukų duomenys. <!-- F458 F471 F475 -->
- Policija (tv3.lt, 2026-10-31; LRT, 2026-09-25 ir 2026-10-23; Kauno diena, 2026-07-01; tv3.lt, 2025-08-30): atvejai. <!-- F459 F460 F694 -->
- Živilė Kielienė, Pinigų plovimo prevencijos kompetencijų centras (15min, 2026-09-10; LRT, 2025-08-29): kaip schema auga, ko klausia, ką daryti, sumos. <!-- F461 F463 F464 F465 F466 F467 F470 -->
- Lietuvos bankas (2017-07-28, 2020-02-12, 2020-06-03, 2023-07-03, 2024-10-28, 2025-12-15, 2026-03-27, 2026-04-14, 2026-04-16, 2026-07-30): netikri rezultatai, kas gali teikti paslaugas, finansų rinkos dalyvių sąrašas, mokesčiai, skolintos lėšos, ką daryti, antras apgavimas. <!-- F14 F15 F104 F118 F190 F348 F350 F351 F462 F465 F467 F469 F473 F474 -->
- Lietuvos bankų asociacija (2022-10-27, 2023-12-15, 2024-10-11): programos, grąžinama dalis pinigų, skolinimasis, pasiūlymai telefonu. <!-- F464 F465 F467 F468 F472 -->
- „Swedbank“: mokesčiai pinigų negrąžina (be datos); apie 2 % atgauta (aina.lt, 2025-08-28). <!-- F353 F194 -->
- „Luminor“ (alkas.lt, 2026-10-28): programa ir ryšio išjungimas. <!-- F305 -->
- Lietuvos bankas (2021-07-09): su banku susisiek oficialiais kanalais; policija (2026-02-05, atnaujinta 2026-04-23): epolicija.lt. <!-- F13 F2 -->
