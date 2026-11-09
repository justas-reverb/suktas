Page: /pazeidziamumai/telefonas-ir-kompiuteris/ (Telefono ir kompiuterio atnaujinimai). Guide 1 of 3, phase A of `docs/VULNERABILITIES-PLAN.md`, on the scenario template.
Purpose: an ordinary person's phone, computer and browser. Where automatic updates are turned on, how to see they work, what to do with an old phone, and never to press "update" in a message or a web page. Search: *automatiniai atnaujinimai*, *kaip atnaujinti telefoną*, *android atnaujinimas*.
FACTS used: F7, F13, F74, F76, F220, F225, F1023, F1031, F1033–F1036, F1041. `M` rests on our editorial model. §6: the attacker's layer is motive and time only; nothing on how a flaw is used. The Mandiant figures are marked foreign, on flaws disclosed in 2023, and give nothing on phones in particular. Levers: none claimed.
Linked from (to wire at the build): `/pazeidziamumai/`, `/temos/irenginiai/`, `/scenarijai/programele-is-nuorodos/` (Susiję), the glossary entries, Turinys, Šaltiniai, Kas pasikeitė.
Review: second reader (Opus, 2026-11-09): layer 2 passes §6 with no change to the test question; findings on the Mandiant figures (not „business products", the 2023 date), the missing iPhone switch, „only settings" against a real Android notification, and the bank step applied. Optional: Windows 10 refused (inferred, not read). F74, F76 not re-read at source; no native Lithuanian reader.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Kaip įjungti automatinius atnaujinimus telefone – Suktas
**Aprašas (meta):** Kur telefone, „Windows“ kompiuteryje ir „Chrome“ naršyklėje įjungti automatinius atnaujinimus, kaip patikrinti, ar jie veikia, ir ką daryti su senu telefonu.

# Telefono ir kompiuterio atnaujinimai

**Angliškai:** security updates, automatic updates · **Skaitymo laikas:** 3 min. · **Patikrinta:** 2026-11-09 ([Šaltiniai](/saltiniai/))

## Trumpai

Daugelis atnaujinimų sukurti saugumo spragoms taisyti. <!-- F1041 --> Įjunk automatinius atnaujinimus telefone, kompiuteryje, naršyklėje ir programėlėse. <!-- F1041 M --> Atnaujinimą leisk tik iš įrenginio ar naršyklės nustatymų, ne iš žinutės ar interneto puslapio. <!-- M -->

## Kur tai įjungti ir patikrinti {#kur-ijungti}

- **„Android“ telefonas.** Dauguma sistemos naujinių ir saugos pataisų įdiegiama automatiškai. <!-- F1033 --> Patikrinti galima taip: Nustatymai → Sistema → Programinės įrangos naujiniai. <!-- F1033 --> Kai kuriuose telefonuose meniu gali vadintis kitaip. <!-- M -->
- **„iPhone“.** Nuostatos → „General“ → „Software Update“ → „Automatic Updates“, tada įjunk „Automatically Install“. <!-- F1034 --> Telefonas atnaujinimą atsisiųs ir įdiegs naktį, kai kraunasi ir yra prijungtas prie „Wi-Fi“. <!-- F1034 -->
- **„Windows“ kompiuteris.** „Windows 11“ naujinimus atsisiunčia ir įdiegia automatiškai. <!-- F1035 --> Patikrinti galima taip: Pradžia → Parametrai → „Windows Update“. <!-- F1035 -->
- **„Chrome“ naršyklė.** Atnaujinimai paprastai pritaikomi, kai uždarai ir vėl atidarai naršyklę. <!-- F1036 --> Jei ilgai jos neuždarei, gali būti rodomas laukiantis atnaujinimas: spausk „Paleisti iš naujo“, ir atidaryti skirtukai bei langai išliks, neatsidarys tik inkognito langai. <!-- F1036 --> Jei tokios parinkties nėra, naudoji naujausią versiją. <!-- F1036 -->
- **Programėlės.** Įjunk automatinius atnaujinimus ir jose, kur tokia parinktis yra. <!-- F1041 M -->
- **Namų maršrutizatorius.** Patikrink, ar yra naujos jo programinės įrangos; taip pataria JAV agentūra CISA. <!-- F74 --> Lietuviško šaltinio apie tai neradome. <!-- F76 -->

## Kaip atpažinti, kad vėluoji {#kaip-atpazinti}

1. **Nustatymuose laukia atnaujinimas.** Įrenginio nustatymuose matyti, koks atnaujinimas įdiegtas ir ar yra naujesnis. <!-- F1033 F1034 -->
2. **Naršyklė ilgai nebuvo uždaryta.** Tada atnaujinimas gali laukti, kol ją paleisi iš naujo. <!-- F1036 -->
3. **Telefonas labai senas.** Senesniuose įrenginiuose ne visada veikia naujesnės „Android“ versijos. <!-- F1033 -->

**Atnaujinti ragina žinutė ar interneto puslapis?** Tai ne vėlavimo ženklas, o galima apgaulė. Uždaryk ir patikrink nustatymuose. <!-- M --> Plačiau: [Programėlė iš nuorodos](/scenarijai/programele-is-nuorodos/).

## Tavo ėjimas

**Šiandien vieną kartą įjunk arba patikrink automatinius atnaujinimus, o atnaujinimą leisk tik iš įrenginio ar naršyklės nustatymų, ne iš žinutės ar interneto puslapio.** <!-- F1041 M -->

Patikra: [Patikra per 15 minučių](/patikra/15-minuciu/).

## Kuo rizikuoji

- **Atvira spraga.** Pataisa, kuri neįdiegta, neapsaugo. <!-- F1023 M -->
- **Netikras atnaujinimas.** Programa iš nuorodos gali būti visai ne ta, kuo apsimeta. <!-- M -->

## Jei jau vėluoji

1. **Įdiek dabar ir paleisk įrenginį iš naujo.** „Pixel“ telefonuose įdiegti atnaujinimai tampa aktyvūs kitą kartą paleidus įrenginį iš naujo. <!-- F1033 M -->
2. **Atnaujinimų nebėra?** Pirmiausia įsitikink, kad telefone yra naujausia jam pasiekiama „Android“ versija. <!-- F1033 --> Jei naujesnių nebėra, banką ir kitus svarbius reikalus tvarkyk įrenginyje, kuris atnaujinimus dar gauna. <!-- M -->
3. **Įdiegei „atnaujinimą“ iš žinutės ar puslapio?** Iškart skambink savo bankui numeriu iš oficialios banko svetainės ir pasakyk, ką įdiegei: bankas gali užblokuoti kortelę ir interneto banką. <!-- F225 F7 F13 F220 --> Toliau: [Jei tave apgavo: įdiegiau programą ar leidau valdyti telefoną](/jei-apgavo/#nuotolinis).

**Mygtukai**
- Main: **Patikra per 15 minučių** → /patikra/15-minuciu/
- Second: **Jei tave apgavo** → /jei-apgavo/

## Kaip tai daro jis

*(Šis sluoksnis jau atvertas. Jame – tik tai, ko jis nori ir kodėl jam pavyksta; nė žodžio apie tai, kaip spragomis naudojamasi. „Jis“ čia – tas, kuris naudojasi neįdiegtomis pataisomis. Paaiškinimas yra mūsų pačių modelis, o faktai pažymėti šaltiniais.)*

### Ko jis nori

Įrenginio, kuriame spraga jau žinoma, o pataisa dar neįdiegta: paskyrų, duomenų ir pinigų. <!-- M --> **Sustabdymo vieta:** automatiniai atnaujinimai. <!-- F1041 -->

### Kodėl tai veikia

Jam padeda laikas. <!-- M --> JAV bendrovė „Mandiant“ išnagrinėjo 2023 m. paskelbtas spragas: iš 41, kuriomis imta naudotis jau po to, kai buvo išleista pataisa, 12 % panaudotos per vieną dieną, 29 % per savaitę, 56 % per mėnesį. <!-- F1031 --> Šie skaičiai nerodo, kaip greitai tai nutinka būtent telefonams. <!-- F1031 --> Mūsų išvada: atnaujinimą atidėti brangiau, negu atrodo. <!-- M --> **Sustabdymo vieta:** kai atnaujinimai diegiami automatiškai, nieko atidėti nereikia. <!-- M -->

### Kur jį sustabdyti

| Jo triukas | Tavo atsakymas |
|---|---|
| Laukia, kol atidėsi atnaujinimą | Automatiniai atnaujinimai. <!-- F1041 --> |
| „Atnaujink“ žinutėje ar interneto puslapyje | Uždaryk. Atnaujinimą paleisk iš nustatymų. <!-- M --> |
| Senas telefonas, kurio niekas nebetaiso | Svarbius reikalus tvarkyk įrenginyje, kuris atnaujinimus dar gauna. <!-- M --> |

### Ko čia nerasi

Jokių spragų veikimo aprašymų, jokių nurodymų, kaip jomis pasinaudoti, ir jokių būdų surasti neatnaujintus įrenginius. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Susiję

- **Vadovai:** [Spragos ir atnaujinimai](/pazeidziamumai/), [Svetainė](/pazeidziamumai/svetaine/), [Serveris](/pazeidziamumai/serveris/)
- **Temos:** [Įrenginiai ir tinklas](/temos/irenginiai/)
- **Scenarijai:** [Programėlė iš nuorodos](/scenarijai/programele-is-nuorodos/)
- **Žodynas:** [Pažeidžiamumas](/zodynas/#pazeidziamumas), [Pataisa](/zodynas/#pataisa), [Nulinės dienos spraga](/zodynas/#nulines-dienos-spraga)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-09. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- „Google“, „Android“ pagalba (be datos, skaityta 2026-11-09): sistemos naujiniai, kelias nustatymuose, senesni įrenginiai. <!-- F1033 -->
- „Apple“ pagalba (be datos, skaityta 2026-11-09): „iPhone“ automatiniai naujinimai. <!-- F1034 -->
- „Microsoft“, „Windows Update“ DUK (be datos, skaityta 2026-11-09). <!-- F1035 -->
- „Google“, „Chrome“ pagalba (be datos, skaityta 2026-11-09). <!-- F1036 -->
- CISA (JAV; be datos): automatiniai atnaujinimai; namų maršrutizatorius. <!-- F1041 F74 -->
- „Mandiant“ (JAV, „Google“ dalis), 2024-10-16, apie 2023 m. paskelbtas spragas: kaip greitai panaudojamos žinomos spragos. <!-- F1031 -->
- NIST (JAV) žodynas: pataisa. <!-- F1023 -->
- „Luminor“, SEB, „Citadele“ ir Lietuvos bankas: ką daryti įdiegus svetimą programą. <!-- F225 F7 F220 F13 -->
