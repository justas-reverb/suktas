Page: /treniruote/banko-paieska/ (Žaidimas, the first page of Treniruotė, phase 3). Drafted 2026-11-01.
Purpose: the fake bank ad as a game the reader plays. A mock search shows three ways to reach the bank: a „Remiama" ad, the bank's own result, and opening the app. Each choice opens a popup in place: „Pagavau!" for the ad, with what the scammer is doing at that moment and the one move. The ad's popup leads to a mock of the page behind the ad, where every field and button opens the second „Pagavau!" (the spinner, the requests on the phone, PIN2). Everything in the mock is invented (the bank, the search, the addresses), stamped as a training example, and nothing can be typed: the fields are buttons, there is no form, nothing is sent or stored. It works with JavaScript off (native popovers; a browser without them shows the answers in place). Search: none planned; readers come from the scenario and Patikra.
FACTS used: F13, F123, F138, F165, F166, F213, F214, F215, F216, F218, F219, F220, F221 (B20 and the Smart-ID FAQ), all already on `/scenarijai/netikra-banko-reklama/`, whose words this page reuses; no new facts. `M` rests on our editorial model. The levers are Autoritetas and Skuba (`/temos/kaip-veikia-atakos/`).
Linked from: `/treniruote/` (new hub), the scenario `netikra-banko-reklama` (a line under „Tavo ėjimas"), `/patikra/`, Turinys, Kas pasikeitė.
Review: the §6.10 second reader (Opus) passed the game and its hub on 2026-11-01, after 16 fixes, none to the test question: „trys paieškos rezultatai" and the meta now say three ways in; the promise says which answer you choose is not sent and points to the counter's press ping (F123), on both pages; the ad popup gained its move and „taip nutinka bet kam"; „Remiama" means only an ad (F218); the bank-result popup gained his side; „nepakeis" became „reklamos nėra" and „Jis apsaugo" „Toks kelias"; even PIN1 on the fake page logs the scammer in (F214, F165); „tikroje klastotėje" became „sukčių svetainėje" and „jo programėlės" „banko"; „Pagavau!" is said to be the scammer's thought; „laukeliai – tik mygtukai"; „pavadinimais" for „vardais"; „Kai paspaudi"; F138 joined the move. The mock passes if it copies no real bank's or Google's look, keeps the stamp inside its frame, uses button fields with no form and shows the addresses as plain text (pavyzdziobankas.lt and pavyzdziobankas-prisijungimas.com answered NXDOMAIN on 2026-11-01). Not re-read at source by that reader: F13, F165, F166. No native Lithuanian reader has read it.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Ar atskirsi netikrą banko reklamą? Treniruotė – Suktas
**Aprašas (meta):** Saugi treniruotė: trys keliai į banką, vienas jų – sukčiaus reklama paieškoje. Spausk, kur spaustum iš tikrųjų, ir pamatyk, ką tuo metu daro sukčius.

# Ar atskirsi netikrą banko reklamą?

Trys keliai į banką ir vienas puslapis už reklamos. Spausk, kur spaustum iš tikrųjų: iššoks paaiškinimas, ką tuo metu daro sukčius ir kaip jį sustabdyti. <!-- M -->

**Tai mokomasis pavyzdys.** Bankas, paieška ir adresai išgalvoti, o laukeliai nieko nepriima: tai, kurį atsakymą renkiesi, niekur neišsiunčiama ir neišsaugoma. Skaitiklis sužino tik tiek, kad puslapis atidarytas ir jame kas nors paspausta ([ką skaičiuojame](/privatumo-pranesimas/#ka-skaiciuojame)). <!-- pažadas F123 -->

Skaičiuojamas pirmas pasirinkimas kiekviename žingsnyje. Visur rinkis saugų kelią – ir laimėsi. <!-- shown with JavaScript only, like the Rezultatas box (docs/copy/treniruote/index.md) -->

## Situacija

Reikia sumokėti sąskaitą, todėl paieškoje surenki „pavyzdžio bankas prisijungti“. Kurį kelią rinktumeisi? <!-- M -->

**Paieškos maketas**
- pavyzdžio bankas prisijungti
- **Remiama** · pavyzdziobankas-prisijungimas.com · **Pavyzdžio bankas – prisijunk prie sąskaitos** · Greitas ir saugus prisijungimas.
- pavyzdziobankas.lt · **Pavyzdžio bankas** · Kasdienės paslaugos, paskolos ir taupymas.
- **Neieškau: atsidarau banko programėlę**

<!-- popup: reklama -->

**Pagavau!** – taip dabar pagalvotų sukčius. Spaudei reklamą. Taip nutinka bet kam: reklama – pačiame viršuje. <!-- M F213 --> Žymė „Remiama“ reiškia tik tiek, kad tai reklama: ji neįrodo, kad svetainė oficiali. <!-- F218 --> Sukčiai perka bankų pavadinimus kaip reklaminius raktažodžius, kad jų klastotė iškiltų paieškos viršuje, ir laukia, kas ieškos banko. <!-- F213 F216 -->

**Tavo ėjimas:** banko paieškoje neieškok – atsidaryk banko programėlę ar išsaugotą nuorodą. <!-- F213 F219 -->

**Pažiūrėk, kur ji veda** → #klastote

<!-- popup: banko rezultatas -->

**Šįkart pataikei.** Tai tikras banko adresas. Bet atskirti tikrą nuo klastotės sunku: sukčiai daro kone tobulas kopijas, o adresas gali skirtis viena raide. <!-- F221 F216 --> Sukčius tikėjosi, kad spausi pirmą nuorodą: savo reklamą jis pastatė virš šios. <!-- F213 F219 M --> Saugiausia banko paieškoje visai neieškoti. <!-- F213 F216 M -->

<!-- popup: programėlė -->

**Taip ir daryk.** Programėlė, išsaugota nuoroda ar adresas, kurį įvedi ranka, – kelias, kuriame reklamos nėra. <!-- F213 F219 M --> Toks kelias apsaugo ir tada, kai klastotės neatskiri. <!-- F221 M -->

## Kur veda reklama {#klastote}

Taip galėtų atrodyti puslapis už reklamos: kone tobula banko kopija su spynele prie adreso. <!-- F221 F213 --> Ką darytum? Spausk laukelį ar mygtuką arba rinkis kelią po maketu.

**Puslapio maketas**
- pavyzdziobankas-prisijungimas.com
- **MOKOMASIS PAVYZDYS** · Tai ne tikras bankas
- Pavyzdžio bankas · Prisijungimas prie interneto banko
- Smart-ID
- Naudotojo ID
- Asmens kodas
- Prisijungti

- **Nieko nespaudžiu: uždarau šį puslapį**

<!-- popup: uždarau -->

**Taip ir daryk.** Kad ir kaip tikrai atrodytų, puslapis, į kurį atvedė reklama, nėra tavo kelias į banką. Uždaryk jį ir atsidaryk banko programėlę ar išsaugotą nuorodą. <!-- M F219 -->

<!-- popup: bet kuris laukelis ar mygtukas -->

**Pagavau!** – taip dabar pagalvotų sukčius. Čia įvestum prisijungimo duomenis, o jie atitektų sukčiui. <!-- F213 --> Kol puslapis rodo, kad vis kraunasi, sukčius tavo duomenimis jungiasi prie tikro banko, o tavo telefone pasirodo patvirtinimo užklausos. <!-- F214 F215 --> Spynelė ir „https://“ nieko neįrodo. <!-- F213 --> Net PIN1 čia patvirtintų ne tavo, o sukčiaus prisijungimą. Jei telefonas prašo PIN2, spausk „Atšaukti“: prisijungiant reikia tik PIN1. <!-- F214 F165 F216 F166 -->

Jei duomenis jau įvedei tikroje sukčių svetainėje, nieko netvirtink ir iškart skambink bankui numeriu iš banko programėlės: [ką daryti pirmiausia](/jei-apgavo/#kodai). <!-- F214 F220 F13 -->

<!-- The Rezultatas box (components/TrainScore.astro) stands here; its words are in docs/copy/treniruote/index.md. -->

## Tavo ėjimas

**Prie banko junkis tik savo keliu: per jo programėlę, išsaugotą nuorodą naršyklėje ar adresą, kurį įvedi ranka. Niekada – per paieškos ar socialinio tinklo reklamą.** <!-- F213 F219 F216 F218 F138 -->

**Mygtukai**
- Main: **Atidaryk kortelę** → /sustok/nuoroda-ne-is-zinutes/
- Second: **Visas scenarijus** → /scenarijai/netikra-banko-reklama/

### Ko čia nerasi

Šis puslapis – ne šablonas: bankas išgalvotas, laukeliai – tik mygtukai, todėl įvesti čia nieko neįmanoma. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Šaltiniai ir patikrinta

Patikrinta: 2026-10-31. Faktai – iš scenarijaus [Netikra banko reklama paieškoje](/scenarijai/netikra-banko-reklama/), visi su datomis [Šaltiniuose](/saltiniai/).

<!-- The full-screen frame (components/GameShell.astro) and its score, with JavaScript only; these words stand in its closed dialog, as on diena-su-telefonu. All M. The account and the sums are invented and marked so. Start 2 400 €; the ad 200 € and the bank's own result 100 € (both risky: nothing is taken yet); anything pressed on the fake login page 2 000 €; the safe ways 0. The risk line shows the sum of the choice pressed; 100 € is only its text before script. The first step's title in the frame is „Banko paieška" (data-title on the section); the second keeps its heading. -->

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
- Sąskaitoje liko
- Laimėjai! Sukčius liko tuščiomis: visur pasirinkai saugų kelią.
- Sukčiui pavyko ne viskas. Pažiūrėk, kur dingo pinigai: ten jis lauks ir kitą kartą.
- Šiandien sukčiui sekėsi. Taip nutinka bet kam, todėl ir treniruojamės čia, kur pinigai išgalvoti.
- Kur dingo pinigai
- Visas scenarijus
- Žaisk dar kartą
- Kitas žaidimas: Ką iš tikrųjų tvirtini per „Smart-ID“?
- (atsidaro naujame lange)
