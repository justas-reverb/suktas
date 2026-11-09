Page: /apie/ (Apie), phase 1.
Purpose: say who writes the site, what it is not, how to correct it, and how the site is built to keep its own promise. The GrapheneOS line stays (the author confirmed it, 2026-10-25). The contact address is info@suktas.lt (settled 2026-10-25). Since 2026-11-06 „Parašyk mums“ and the address open a popup that writes the letter and hands it to the reader's own mail app, Gmail or the clipboard (the owner asked for a popup form with less friction); the site still sends and keeps nothing, and a server-side send waits on mail being set up for suktas.lt on our server.
FACTS used: none; every statement about the site is its promise (`pažadas`).

Source tags: `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Apie – Suktas
**Aprašas (meta):** Kas rašo Suktą, ko mes nesame, kaip mus pataisyti ir kaip padaryta svetainė.

# Apie

## Kas čia

Suktą rašo Justas Vaičekauskas. Kitus jo darbus rasi svetainėje [sudievu.lt](https://sudievu.lt). <!-- pažadas --> Savo telefone jis naudoja „GrapheneOS“. <!-- pažadas -->

Suktas – balsas tavo galvoje, kuris pirmas paklausia: „O jei čia apgaulė?“ Daugiau – [Misijoje](/misija/). <!-- pažadas -->

## Ko mes nesame

Mes nesame įsilaužimo mokykla. Kaip to mokytis teisėtai, pasakoja kiti, ne mes. <!-- pažadas -->

## Kaip mus pataisyti {#kaip-pataisyti-mus}

Jei radai klaidą, pasenusį faktą ar sakinį, kuris klaidina, parašyk: [info@suktas.lt](mailto:info@suktas.lt). <!-- pažadas --> Kiekvieną pataisymą užrašome puslapyje [Kas pasikeitė](/kas-pasikeite/). <!-- pažadas -->

## Kaip padaryta svetainė

- Nieko nesaugome tavo naršyklėje. <!-- pažadas -->
- Nieko neįkeliame iš kitų serverių. <!-- pažadas -->
- Jokio sekimo ir svetimos analitikos: apsilankymus be slapukų skaičiuoja tik mūsų pačių skaitiklis ([kaip](/privatumo-pranesimas/#ka-skaiciuojame)). <!-- pažadas -->
- Puslapiai veikia ir be „JavaScript“. <!-- pažadas -->
- Kaip patikrinti savarankiškai: [Privatumo pranešimas](/privatumo-pranesimas/). <!-- pažadas -->
- Svetainės kodas, kiekvienas faktas su šaltiniu ir puslapių tekstai vieši: [„GitHub“](https://github.com/justas-reverb/suktas). <!-- pažadas -->

**Mygtukai**
- Main: **Parašyk mums** → #kaip-pataisyti-mus
- Second: **Mūsų pažadas** → /privatumo-pranesimas/

## Parašyk mums <!-- components/Contact.astro, the popup; opens from both buttons above and the address -->

Parašyk čia, o laišką mums atidarysime tavo pašte jau parašytą: liks paspausti „Siųsti“. <!-- pažadas --> Svetainė pati nieko neišsiunčia ir nieko nesaugo. <!-- pažadas -->

Apie ką?

- Radau klaidą ar pasenusį faktą
- Turiu pasiūlymą
- Kita

Ką nori pasakyti?

Kuris puslapis? (nebūtina)

**Nerašyk slaptažodžių, kodų, PIN ir kortelės numerio.** Jų mums nereikia. <!-- pažadas -->

- Main: **Atidaryk laišką pašte**
- Second: **Rašyk per „Gmail“** · **Kopijuok laišką**

Adresas: **info@suktas.lt**. Atsakome per kelias dienas. <!-- pažadas -->

<!-- Shown by the script only: „Parašyk bent kelis žodžius.“ (empty message); „Jei pašto programa neatsidarė, rinkis „Gmail“ arba nukopijuok laišką.“; „Laiškas per ilgas pašto programai. Rinkis „Gmail“ arba nukopijuok laišką.“; „Nukopijuota. Įklijuok laišką savo pašte ir siųsk adresu info@suktas.lt.“; „Nepavyko nukopijuoti. Rašyk adresu info@suktas.lt.“ Subject: „Suktas: <topic>“; the page line is added as „Puslapis: …“. -->
