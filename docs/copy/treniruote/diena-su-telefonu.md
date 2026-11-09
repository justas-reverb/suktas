Page: /treniruote/diena-su-telefonu/ (Žaidimas, the third game of Treniruotė, phase 3). Live 2026-11-09.
Purpose: one day on the reader's phone, four scams the site already covers, one step each: morning, a missed call from an unknown foreign number (B17); midday, a friend's hijacked account asking to borrow money (B14); afternoon, an SMS about unpaid parking with a link (B27); evening, a QR sticker on a parking meter (B22). Each step has exactly one safe choice (`data-safe`: „Neperskambinu", „Skambinu Rūtai telefonu", „Pasitikrinu parkavimo programėlėje", „Moku parkavimo programėle…") and one or two the scammer hopes for; „Klausiu čia pat…" and „…tik pažiūrėti" are risky but not lost, and their popups say so in a short honest line instead of „Pagavau!". Everything is invented: the number (+000…), the friend („Rūta Pavyzdienė"), the parking service and sender („PAVYZDYS-PARK"), its address pavyzdys-parkavimas.com (NXDOMAIN at 1.1.1.1 on 2026-11-06), the meter's zone; Unipark, JUDU, the police and Facebook appear only in words, and no mock copies a real app's look. The QR on the sticker mock must scan to nothing (a painted pattern, not a working code). Every mock keeps its stamp; nothing can be typed (button fields, no form). Works with JavaScript off (native popovers), like its siblings. Four rounds for the Rezultatas box.
FACTS used: F2, F4, F6, F7, F13, F18, F42, F101, F123, F156, F157, F159, F160, F173, F175, F177, F178, F183, F235, F236, F292, F293, F297, F299, F300, F301, all already on the four scenario pages (`/scenarijai/praleistas-skambutis/`, `/scenarijai/draugas-praso-pinigu/`, `/scenarijai/sms-apie-bauda/`, `/scenarijai/netikras-qr-kodas/`), whose words this page reuses; no new facts. F123 is the counter, in the siblings' promise line. `M` rests on our editorial model. The levers are the scenarios' own: smalsumas and mandagumas (the missed call, outside the five), Autoritetas and Skuba (the friend, the SMS, the sticker), Baimė (the SMS) (`/temos/kaip-veikia-atakos/`).
Linked from (to wire at the build): `/treniruote/` (the hub's list), the four scenarios (a line under „Tavo ėjimas"), Turinys, Kas pasikeitė.
Review: the §6.10 second reader (Opus) read the game on 2026-11-06 and found nothing against the test question; 3 must-fix applied (Rūta „neskolino“ reversed F156, now „neprašė paskolinti“; „Atsiliepsiu“ scored as a loss against F175/F177, replaced by „Perskambinu, jei šalis netoli“; the final move's „jo“ and the phone that does not ask in the sticker step) and 10 of 12 optional (grammar, tense, F160's „jei gali“, F175's „paprastai“, tags, the shorter app button, the intro, the SMS move's reporting line). Not applied: the hub's score wording (shared by every game, a change of its own) and the scenario page's „kol jis pats nepatvirtino“ (a live page). At the build: re-check pavyzdys-parkavimas.com is NXDOMAIN and keep it plain text. The frame's words (the block near the end of this file) had their own second read by Opus on 2026-11-09, with its 3 must-fix applied; the hidden „(atsidaro naujame lange)" on its new-tab links came after that read. No native Lithuanian reader has read any of it.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Viena diena su telefonu: kur laukia sukčius? Treniruotė – Suktas
**Aprašas (meta):** Saugi treniruotė: viena diena ir keturi sukčių triukai – praleistas skambutis, draugės žinutė, SMS apie stovėjimą ir QR lipdukas. Rinkis, ką darytum iš tikrųjų.

# Viena diena su telefonu: kur laukia sukčius?

Rytas, pietūs, popietė ir vakaras: keturi kartai, kai tavęs ko nors prašo skambutis, žinutė ar lipdukas. Rinkis, ką darytum iš tikrųjų: iššoks paaiškinimas, ką tuo metu daro sukčius ir kaip jį sustabdyti. <!-- M -->

**Tai mokomasis pavyzdys.** Numeriai, vardai, paslaugos ir adresai išgalvoti, o mygtukai nieko nepriima: tai, kurį atsakymą renkiesi, niekur neišsiunčiama ir neišsaugoma. Skaitiklis sužino tik tiek, kad puslapis atidarytas ir jame kas nors paspausta ([ką skaičiuojame](/privatumo-pranesimas/#ka-skaiciuojame)). <!-- pažadas F123 -->

Skaičiuojamas pirmas pasirinkimas kiekviename žingsnyje. Visur rinkis saugų kelią – ir laimėsi. <!-- shown with JavaScript only, like the Rezultatas box (docs/copy/treniruote/index.md) -->

## Rytas: praleistas skambutis {#rytas}

8:12. Telefonas suskambo vieną kartą ir nutilo. Numeris prasideda ne +370, o šalies kodo nepažįsti. Ką darai? <!-- F175 F177 M -->

**Telefono maketas**
- **MOKOMASIS PAVYZDYS** · Tai ne tikras telefonas
- Praleistas skambutis · +000 0000 0000 · Nežinoma šalis · 8:12
- **Perskambinu: gal kam nors reikia pagalbos**
- **Perskambinu, jei šalis netoli**
- **Neperskambinu**

<!-- popup: perskambinu -->

**Pagavau!** – taip dabar pagalvotų sukčius. Taip nutinka bet kam: smalsu, kas ieškojo, o neperskambinti atrodo nemandagu. <!-- M --> Skambino programa: ji renka atsitiktinius numerius ir padeda ragelį po vieno ar dviejų signalų, kad perskambintum. <!-- F175 --> Dabar moki tu: vien sujungimo mokestis gali siekti nuo kelių iki kelių dešimčių eurų, o dalį šio mokesčio paprastai gauna jis. <!-- F175 --> Kas atsilieps, stengsis tave išlaikyti ryšyje kuo ilgiau, nes pokalbis skaičiuojamas už minutę. <!-- F177 F178 -->

**Tavo ėjimas:** padėk ragelį ir nežinomam užsienio numeriui daugiau neperskambink. <!-- F178 F173 --> Vėliau pasitikrink sąskaitą: jei atsirado mokestis ir su juo nesutinki, argumentuotai kreipkis į savo ryšio operatorių. <!-- M F183 -->

<!-- popup: šalis netoli -->

**Pagavau!** – taip dabar pagalvotų sukčius. Tokie skambučiai ateina ne tik iš tolimų šalių: 2020 m. pavasarį Lietuvą pasiekė ir iš Moldovos. <!-- F177 --> Mokestis priklauso nuo šalies, bet moki bet kuriuo atveju. <!-- F175 -->

**Tavo ėjimas:** nežinomam užsienio numeriui neperskambink, kad ir iš kur jis būtų. <!-- F173 -->

<!-- popup: neperskambinu -->

**Taip ir daryk.** Neperskambinti nežinomam užsienio numeriui pataria ir RRT, ir „Telia“. <!-- F173 F175 --> Be tavo skambučio jis nieko neuždirba. <!-- F175 M --> Jei tas pats numeris skambins vėl, užblokuok jį telefone. <!-- F175 F177 --> Jei laukei skambučio iš užsienio, parašyk tam žmogui ten, kur jau bendraujate. <!-- M -->

**Toliau: pietūs** → #pietus

## Pietūs: draugės žinutė {#pietus}

12:40. „Facebook“ rašo draugė Rūta: jos vardas, jos nuotrauka. Ji niekada neprašė paskolinti, o dabar skubiai prašo pinigų. Ką darai? <!-- F156 F159 M -->

**Pokalbio maketas**
- **MOKOMASIS PAVYZDYS** · Tai ne tikras pokalbis
- Rūta Pavyzdienė · 12:40
- „Labas, gal gali truputį pagelbėt?“
- „Atsitiko nepaprasta situacija. Gal gali paskolinti 1000 €? Vakare grąžinsiu.“
- **Pervedu: Rūta juk draugė**
- **Klausiu čia pat: „Ar tikrai tu?“**
- **Skambinu Rūtai telefonu**

<!-- popup: pervedu -->

**Pagavau!** – taip dabar pagalvotų sukčius. Rašė ne Rūta: jos paskyrą perėmė sukčiai ir iš jos rašo draugams. <!-- F156 F157 --> Taip nutinka bet kam: pasitikėjimas, kurį jauti draugei, atitenka jam. <!-- M F157 --> Prašymas skubus, neįprastas ir miglotas – „nepaprasta situacija“, bet nesakoma kokia. Tai ženklai, kuriuos įvardija policija. <!-- F156 -->

**Tavo ėjimas:** paskambink Rūtai arba parašyk jai SMS žinutę, ne tame pačiame pokalbyje. Kol Rūta pati nepatvirtins, nesiųsk nei pinigų, nei kodų. <!-- F156 F157 M --> Jei pinigus jau išsiuntei, pirmiausia skambink bankui, išsaugok susirašinėjimą ir pranešk policijai: [ką daryti pirmiausia](/jei-apgavo/#pinigai). <!-- F4 F2 M -->

<!-- popup: klausiu čia pat -->

**Gerai, kad suabejojai.** <!-- M --> Bet atsakys tas pats, kas rašo: jis mato jūsų ankstesnius pokalbius ir gali atsakyti įtikinamai. <!-- M --> Rūtos telefonu jis greičiausiai neatsilieps. <!-- M -->

**Tavo ėjimas:** paskambink Rūtai arba parašyk jai SMS žinutę. Jei Rūta neatsiliepia, pinigų nesiųsk, kol ji pati nepaskambins. <!-- F156 M -->

<!-- popup: skambinu -->

**Taip ir daryk.** Paskambinti ar parašyti SMS žinutę – būtent taip pataria policija, kai draugas staiga prašo pinigų. <!-- F156 --> Jei paaiškės, kad rašė ne Rūta, pasakyk jai, kad jos paskyrą perėmė sukčiai: tegul atsidaro facebook.com/hacked, jei gali, iš įrenginio, kuriuo jau jungėsi. <!-- F160 --> O savo telefono numerio ir kodų, kurie tau ateina SMS žinute, per socialinius tinklus niekam nesiųsk, net draugui. <!-- F157 F42 -->

**Toliau: popietė** → #popiete

## Popietė: SMS apie stovėjimą {#popiete}

15:05. Ateina SMS apie nesumokėtą stovėjimą, su nuoroda sumokėti. Vakar tikrai statei automobilį mieste. Ką darai? <!-- F292 M -->

**Žinutės maketas**
- **MOKOMASIS PAVYZDYS** · Tai ne tikra žinutė
- PAVYZDYS-PARK · 15:05
- „Galutinis pranešimas apie nesumokėtus parkavimo mokesčius. Nesumokėjus prasidės administracinis patikrinimas. Mokėti: pavyzdys-parkavimas.com“
- **Spaudžiu nuorodą ir sumoku**
- **Spaudžiu nuorodą, tik pažiūrėti**
- **Pasitikrinu parkavimo programėlėje**

<!-- popup: sumoku -->

**Pagavau!** – taip dabar pagalvotų sukčius. Nuoroda veda į jo puslapį, kuris prašo kortelės ar banko prisijungimo duomenų, ir jie atitenka jam. <!-- F299 F300 --> „Bauda“ tėra priedanga, kad mokėjimas atrodytų privalomas ir skubus. <!-- M --> Taip nutinka bet kam: skola už stovėjimą yra tikras dalykas, todėl žinutė atrodo tikėtina. <!-- M --> „Unipark“ sako, kad nesiunčia SMS su aktyviomis mokėjimo nuorodomis, o policija – kad nesiunčia SMS su nuorodomis prisijungti prie banko dėl baudos. <!-- F292 F299 -->

**Tavo ėjimas:** įvedei kortelės duomenis? Iškart užblokuok kortelę banko programėlėje ar paskambink bankui numeriu iš oficialios banko svetainės. <!-- F7 F13 --> Įvedei banko prisijungimo duomenis? Skambink bankui ir paprašyk užblokuoti prieigą prie interneto banko: [ką daryti pirmiausia](/jei-apgavo/#kortele). <!-- F6 F13 F7 --> Pasakyk ir apie mokėjimus, kurių nedarei: blokavimas jau atliktų mokėjimų neatšaukia. Dingo pinigai – pranešk policijai per epolicija.lt. <!-- F6 F7 F2 -->

<!-- popup: tik pažiūrėti -->

**Čia ir sustok.** <!-- M --> Tas puslapis sukurtas vienam tikslui: kad įvestum kortelės ar banko prisijungimo duomenis. <!-- F299 F300 M --> Uždaryk jį ir nieko jame neįvesk. Apie žinutę pranešk NKSC formoje „Pranešti apie žinutę / skambutį“. <!-- F18 M -->

**Tavo ėjimas:** ar tikrai turi ką nors sumokėti, tikrink oficialioje programėlėje ar svetainėje, kurią atsidarai tu. <!-- F292 F301 -->

<!-- popup: programėlė -->

**Taip ir daryk.** Skolą tikrink oficialioje programėlėje ar svetainėje, kurią atsidarai tu, o ne per nuorodą žinutėje. <!-- F292 F301 --> „Unipark“ sako, kad besikreipiantys klientai programėlėje dažniausiai jokios skolos nemato. <!-- F293 --> Sukčius nežino, kad vakar statei automobilį: jam užtenka, kad kuris nors gavėjas neseniai statė. <!-- M --> Patikrinti užtrunka kelias minutes, o tikra skola per tą laiką niekur nedings. <!-- M F297 -->

**Toliau: vakaras** → #vakaras

## Vakaras: QR lipdukas {#vakaras}

18:30. Pastatai automobilį prie kino teatro. Ant parkomato užklijuotas QR kodas siūlo sumokėti telefonu. Ką darai? <!-- F235 F101 -->

**Parkomato maketas**
- **MOKOMASIS PAVYZDYS** · Tai ne tikras parkomatas
- Pavyzdžio miesto rinkliavos zona · Mokėk programėle arba SMS žinute
- Lipdukas: **Greitas mokėjimas – nuskenuok QR**
- **Nuskenuoju lipduką ir sumoku**
- **Moku parkavimo programėle savo telefone**

<!-- popup: nuskenuoju -->

**Pagavau!** – taip dabar pagalvotų sukčius. Lipduką užklijavo jis: kodas veda į suklastotą mokėjimo puslapį, o suvedus kortelės duomenis pinigai atitenka sukčiams. <!-- F235 F236 --> Taip nutinka bet kam: lipdukas ant tikro parkomato atrodo kaip įrenginio dalis. <!-- F235 M --> Vilniaus „JUDU“ sako, kad niekada neprašo per QR kodą suvesti duomenų ar sumokėti. <!-- F101 -->

**Tavo ėjimas:** užklijuoto QR kodo neskenuok, mokėk oficialioje programėlėje. <!-- F235 F101 --> Jei jau įvedei kortelės duomenis, užblokuok kortelę banko programėlėje ar interneto banke ir pasakyk bankui apie mokėjimus, kurių nedarei: blokavimas jau atliktų mokėjimų neatšaukia. [Ką daryti pirmiausia](/jei-apgavo/#kortele). <!-- F7 F6 -->

<!-- popup: programėlė savo telefone -->

**Taip ir daryk.** Už stovėjimą mokėk oficialioje programėlėje, kurią atsidarai tu; Vilniuje – ir SMS žinute konkrečiu numeriu. <!-- F101 F235 --> Lipdukas laukia bet ko, kas skubės sumokėti, o tavęs nesulaukė. <!-- M --> Jei matai, kaip kas nors klijuoja lipdukus, ir tai saugu, nufotografuok ar nufilmuok ir skambink 112. <!-- F235 F236 --> Apie patį lipduką pranešk: Vilniuje – „JUDU“. <!-- F101 M -->

<!-- The Rezultatas box (components/TrainScore.astro) stands here, with four rounds; its words are in docs/copy/treniruote/index.md. -->

## Tavo ėjimas

**Kai skambutis, žinutė ar lipdukas tavęs ko nors prašo, o pradėjai ne tu, neik siūlomu keliu: neperskambink, nespausk nuorodos, neskenuok lipduko. Pasitikrink savo keliu: paskambink žmogui, atsidaryk programėlę.** <!-- F173 F156 F292 F301 F235 F101 M -->

**Mygtukai**
- Main: **Atidaryk kortelę** → /sustok/desimt-sekundziu/
- Second: **Kitos kortelės** → /sustok/

### Ko čia nerasi

Šis puslapis – ne šablonas: numeriai, vardai ir paslaugos išgalvoti, mygtukai nieko nepriima, todėl įvesti čia nieko neįmanoma. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Šaltiniai ir patikrinta

Patikrinta: 2026-10-30–2026-11-01. Faktai – iš keturių scenarijų, visi su datomis [Šaltiniuose](/saltiniai/):
- [Praleistas skambutis iš užsienio](/scenarijai/praleistas-skambutis/)
- [„Draugas“ prašo pinigų](/scenarijai/draugas-praso-pinigu/)
- [SMS apie baudą](/scenarijai/sms-apie-bauda/)
- [Netikras QR kodas](/scenarijai/netikras-qr-kodas/)

<!-- The full-screen frame (components/GameShell.astro) and its score, with JavaScript only; these words stand in its closed dialog. All M. The account and the sums are invented and marked so. The sums (data-cost on each choice): rytas 30 € (inside F175's range) and 15 € for the nearby country; pietūs 1000 € (what the mock-up asks) and 100 € for asking in the same chat; popietė 600 € and 100 € for just looking; vakaras 400 €; every safe move 0 €. Start 2 400 €. Time never scores. -->

- Žaisk per visą ekraną
- Sąskaita ir sumos išgalvotos. Pradedi su 2 400 €, o sukčius kiekviename žingsnyje bando dalį pasiimti.
- Išgalvotoje sąskaitoje
- Žingsnis
- Uždaryk
- Ką tuo metu daro jis
- Rinkis, ką darytum iš tikrųjų, ir čia pamatysi, ką tuo metu daro sukčius.
- Sąskaita nepaliesta.
- Jis dar nieko negavo, bet už riziką žaidimas atima 100 €.
- Šis pasirinkimas jau nieko nekeičia: skaičiuojamas pirmas.
- Žiūrėk, kiek liko
- Toliau
- Vakare sąskaitoje liko
- Laimėjai! Sukčius liko tuščiomis: visur pasirinkai saugų kelią.
- Sukčiui pavyko ne viskas. Pažiūrėk, kur dingo pinigai: ten jis lauks ir kitą kartą.
- Šiandien sukčiui sekėsi. Taip nutinka bet kam, todėl ir treniruojamės čia, kur pinigai išgalvoti.
- Kur dingo pinigai
- Visas scenarijus
- Žaisk dar kartą
- Kitas žaidimas: Ar atskirsi netikrą banko reklamą?
- (atsidaro naujame lange)
