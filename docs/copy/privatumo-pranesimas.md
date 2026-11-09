Page: /privatumo-pranesimas/ (Privatumo pranešimas), phase 1.
Purpose: the site's promise in plain words (no cookies, nothing stored, nothing from other servers, no outside analytics), what the shared visit counter counts (since 2026-10-26: Justas put every site on count.sudievu.lt; how it works is the Panel's `docs/VISITS.md`, the script `public/count.js`), what the server still keeps and why, how a reader checks it, what happens to a letter, who else holds the data, who answers for it, and the reader's rights. No cookie banner is needed: nothing is stored on the reader's device unless the reader asks with ?notrack, and then only that choice. No `[tikrinti]` marker. Settled 2026-10-25 by the owner: a letter and our reply are deleted at most a year after the last letter (Inbox, Sent and Trash, by hand); Telia's backups keep a deleted letter up to 14 days (F122). Settled 2026-10-25: IV and Telia act as processors (F121, F122). Settled 2026-10-25: the access log is gone after at most 9 weeks (FACTS F116, the server's own rotation); the contact is info@suktas.lt, and its mail stays at Telia.
FACTS used: F112–F115 and F436 (the Regulation and VDAI); F121, F122 and F124 (IV, Telia and Cloudflare as processors; since 2026-10-28, Justas's choice after the move to his own server: IV for the standby copy, Cloudflare for the tunnel); F116 backs the log promise and F123 the visit counter's (our own server, so both are tagged `pažadas` and are not on /saltiniai/); everything else is the site's promise (`pažadas`).

Source tags: `<!-- Fnn -->` a fact in docs/FACTS.md; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Privatumo pranešimas – Suktas
**Aprašas (meta):** Ko Suktas nedaro, ką skaičiuoja, ką serveris vis tiek laiko ir kaip gali patikrinti savarankiškai.

# Privatumo pranešimas

## Ko nedarome

- **Nenaudojame slapukų.** <!-- pažadas -->
- **Nieko nesaugome tavo naršyklėje**, nebent paprašai neskaičiuoti tavo apsilankymų (žr. „Ką skaičiuojame“). <!-- pažadas -->
- **Nieko neįkeliame iš kitų serverių:** nei šriftų, nei paveikslėlių, nei skriptų. <!-- pažadas -->
- **Jokios svetimos analitikos ir reklamos.** Apsilankymus skaičiuoja tik mūsų pačių skaitiklis. <!-- pažadas -->

## Ką skaičiuojame {#ka-skaiciuojame}

Kad žinotume, kurie puslapiai skaitomi ir iš kur į juos ateinama, apsilankymus skaičiuoja mūsų pačių skaitiklis count.sudievu.lt. <!-- pažadas --> Jis veikia tame pačiame mūsų serveryje kaip ir ši svetainė, ne pas svetimą įmonę. <!-- pažadas -->

Atidarytas puslapis skaitikliui praneša tik tai: kurį puslapį atidarei (adresą be to, kas po „?“), iš kurios svetainės atėjai (tik jos pavadinimą) ir ar puslapį skaitei bent 8 sekundes ar ką nors jame paspaudei, taip pat ar naršyklę valdo programa ir ar paprašei tavęs neskaičiuoti. <!-- pažadas --> Jei nuoroda, per kurią atėjai, turi reklamos žymių (utm_source, utm_medium ir utm_campaign: kur nuoroda paskelbta, kokiu kanalu ir kuriai kampanijai), skaitiklis gali užrašyti ir jas. <!-- pažadas -->

Kad tas pats žmogus tą pačią dieną nebūtų suskaičiuotas du kartus, iš tavo IP adreso ir naršyklės pavadinimo su slaptu, kasdien keičiamu priedu sudaromas lankytojo kodas. <!-- pažadas --> Kitą dieną priedas ištrinamas, todėl kodo nebeįmanoma susieti nei su tavimi, nei su kita diena. <!-- pažadas --> Skaitiklio įrašuose nesaugomi nei IP adresas, nei naršyklės pavadinimas (užklausą, kaip ir kiekvieną, užrašo tik serverio prieigos žurnalas, žr. toliau), o slapukų skaitiklis nenaudoja. <!-- pažadas -->

Įrašai laikomi 35 dienas, po to lieka tik kiekvienos dienos sumos. <!-- pažadas --> Ir čia remiamės teisėtu interesu: norime žinoti, kurie puslapiai skaitomi. <!-- F112 -->

Nenori, kad tavo apsilankymai būtų skaičiuojami? Išjunk naršyklėje „JavaScript“: visa svetainė veikia ir be jo, o skaitiklis tada nepaleidžiamas. <!-- pažadas --> Arba atidaryk bet kurį puslapį su ?notrack adreso gale (pavyzdžiui, suktas.lt/?notrack): naršyklė tai įsimins, o skaitiklis tavo apsilankymus pažymės ir neįskaičiuos. <!-- pažadas --> Adresas su ?track tai atšaukia. <!-- pažadas -->

## Ką serveris vis tiek laiko

Kaip ir kiekvienas serveris, mūsų serveris veda prieigos žurnalą: kada ir iš kokio IP adreso paprašyta kurio puslapio, iš kurio puslapio atėjai ir kokią naršyklę naudoji. <!-- pažadas --> Įrašai automatiškai ištrinami ne vėliau kaip po 9 savaičių. <!-- pažadas -->

Žurnalą laikome tam, kad serveris liktų saugus: kad pastebėtume atakas ir gedimus. Duomenis tvarkome remdamiesi teisėtu interesu: Bendrasis duomenų apsaugos reglamentas (BDAR) tai leidžia, kai jie tvarkomi tik tiek, kiek būtina tinklo saugumui. <!-- F112 --> Niekam kitam žurnalo nenaudojame. <!-- pažadas -->

## Kaip patikrinti savarankiškai {#kaip-patikrinti-savarankiskai}

1. Atsidaryk bet kurį puslapį. <!-- pažadas -->
2. Atsidaryk naršyklės kūrėjo įrankius ir tinklo skiltį. <!-- pažadas -->
3. Įkelk puslapį iš naujo ir pažiūrėk, iš kur viskas atėjo: viskas turi būti iš šio adreso. <!-- pažadas --> Vienintelė užklausa kitur eina į mūsų skaitiklį count.sudievu.lt: ją siunčia puslapis, o iš ten nieko neįkeliama. <!-- pažadas -->
4. Atsidaryk naršyklės saugyklos skiltį: ji turi likti tuščia, nebent atidarei puslapį su ?notrack. <!-- pažadas -->

## Jei parašai mums {#jei-parasai}

Jei rašai adresu info@suktas.lt, laiškas patenka į pašto dėžutę, kurią skaito Justas. <!-- pažadas --> Laišką ir mūsų atsakymą ištriname ne vėliau kaip po metų nuo paskutinio laiško. <!-- pažadas --> Ištrintas laiškas „Telia“ atsarginėse kopijose gali likti dar iki 14 dienų. <!-- F122 --> Tavo adresas niekur kitur neperduodamas. <!-- pažadas --> Laišką laikome tam, kad galėtume atsakyti; ir čia remiamės teisėtu interesu. <!-- F112 -->

## Jei praneši apie sukčius {#jei-pranesi}

Tai, ką atsiunti adresu sargyba@suktas.lt, skaito Justas. <!-- pažadas --> Rūšiuoti padeda kalbos modelis, veikiantis jo kompiuteryje: modelis laiško teksto niekur nesiunčia. <!-- pažadas --> Laišką, nuotraukas ir mūsų pastabas ištriname ne vėliau kaip po 90 dienų. <!-- pažadas --> Ištrintas laiškas „Telia“ atsarginėse kopijose gali likti dar iki 14 dienų. <!-- F122 --> Apie triukus rašome be vardų, numerių ir veikiančių nuorodų. <!-- pažadas --> Laišką laikome tam, kad galėtume atsakyti ir perspėti kitus; čia remiamės teisėtu interesu. <!-- F112 -->

## Savaitės laiškas {#savaites-laiskas}

Jei parašai „Noriu“ adresu sargyba@suktas.lt, tavo adresą įrašome į sąrašą, kad kartą per savaitę atsiųstume vieną laišką. <!-- pažadas --> Sąraše laikome tik adresą, datą, kada prisijungei, kaip prisijungei, kuriuos laiškus jau gavai ir ar paskutinis laiškas grįžo nepristatytas. <!-- pažadas --> Adresą sąraše laikome, kol atsisakysi. <!-- pažadas --> Sąrašas yra Justo kompiuteryje, ne svetainės serveryje, ir niekam kitam neperduodamas: laiškai išeina per „Telia“ paštą. <!-- pažadas --> Laiškai yra paprastas tekstas: be paveikslėlių ir be sekimo, todėl nežinome, ar laišką atidarei. <!-- pažadas --> Čia remiamės tavo sutikimu. <!-- F436 --> Jį gali atšaukti bet kada: atrašyk vieną žodį „Atsisakyti“, ir adresą iš sąrašo ištrinsime. <!-- F436 --> Laiškas su žodžiu „Noriu“ ar „Atsisakyti“ ištrinamas kaip ir kiti laiškai, ne vėliau kaip po 90 dienų. <!-- pažadas -->

## Kas dar mato šiuos duomenis

- **Serveris.** Svetainė ir skaitiklis veikia mūsų pačių serveryje Lietuvoje, todėl prieigos žurnalas ir skaitiklio įrašai yra pas mus, o ne pas serverio nuomotoją. <!-- pažadas -->
- **Tinklas, per kurį ateini.** Kiekviena užklausa į šią svetainę ir į skaitiklį eina per „Cloudflare“ tinklą, todėl „Cloudflare“ mato tavo IP adresą ir tai, ko prašai. <!-- pažadas --> „Cloudflare“ yra duomenų tvarkytoja: duomenis tvarko tik mūsų vardu, kaip nustato jos duomenų tvarkymo susitarimas. <!-- F124 --> Ji yra JAV įmonė, todėl duomenys gali palikti Europos ekonominę erdvę; tam ji taiko Europos Komisijos standartines sutarčių sąlygas ir ES ir JAV duomenų privatumo sistemą. <!-- F124 -->
- **Rezervinė kopija.** Rezervinę svetainės kopiją laikome serveryje, kurį nuomojame iš „Interneto vizijos“ (iv.lt), todėl ten gali būti ir prieigos žurnalo bei skaitiklio įrašų. <!-- pažadas --> „Interneto vizija“ yra duomenų tvarkytoja: duomenis tvarko tik mūsų vardu, kaip nustato jos duomenų tvarkymo susitarimas. <!-- F121 -->
- **Pašto paslaugos teikėjas.** Pašto dėžutės info@suktas.lt ir sargyba@suktas.lt yra „Telia“ serveriuose, todėl laiškai, kuriuos mums rašai, laikomi ten, o savaitės laišką siunčiame per tą patį paštą. <!-- pažadas --> „Telia“ yra duomenų tvarkytoja: duomenis tvarko tik mūsų vardu, kaip nustato jos svetainių talpinimo taisyklės, o pašto dėžutė yra tos paslaugos dalis. <!-- F122 -->

## Kas atsako už duomenis {#kas-atsako}

Už duomenis, apie kuriuos rašoma šiame puslapyje, atsako Justas Vaičekauskas: jis yra šių duomenų valdytojas. <!-- pažadas --> Susisiekti: [info@suktas.lt](mailto:info@suktas.lt). <!-- pažadas -->

## Tavo teisės {#tavo-teises}

Gali paprašyti parodyti, kokius duomenis apie tave turime, juos ištaisyti ar ištrinti, apriboti jų tvarkymą arba nesutikti, kad juos tvarkytume. <!-- F113 --> Savo įrašą sąraše gali gauti ir kompiuterio skaitomu formatu. <!-- F436 --> Parašyk mums. Žurnale nėra vardų, tik IP adresai, todėl paprašysime nurodyti IP adresą ir laiką, kad rastume tavo įrašus. <!-- pažadas -->

Jei manai, kad tavo duomenis tvarkome neteisėtai, gali skųstis [Valstybinei duomenų apsaugos inspekcijai](https://vdai.lrv.lt/lt/veiklos-sritys-1/skundu-nagrinejimas/). <!-- F114 F115 -->

**Mygtukai**
- Main: **Pažiūrėk, ką siunčia šis puslapis** → #kaip-patikrinti-savarankiskai
- Second: **Parašyk mums** → /apie/#kaip-pataisyti-mus
