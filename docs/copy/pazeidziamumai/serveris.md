Page: /pazeidziamumai/serveris/ (Serverio atnaujinimai). Guide 3 of 3, phase A of `docs/VULNERABILITIES-PLAN.md`, on the scenario template.
Purpose: someone who runs a server, often a small one nobody watches. What to turn on so security updates install by themselves, what automatic updates do not cover, what to check, and what to do when something cannot be updated. Search: *serverio atnaujinimai*, *automatic updates ubuntu*, *unattended upgrades*.
FACTS used: F259, F1021, F1027, F1028, F1029, F1030, F1031, F1032, F1040. `M` rests on our editorial model. §6: only defensive settings; no scanning, no way of finding what others run, no fixed versions, no detection rules. Ubuntu is the one system read; nothing is said of the others.
Linked from (to wire at the build): `/pazeidziamumai/`, `/pazeidziamumai/svetaine/`, the glossary entries, Turinys, Šaltiniai, Kas pasikeitė.
Review: second reader (Opus, 2026-11-09): layer 2 passes §6 with no change to the test question; findings on isolating a PHP version, the reboot default, the reversed table row, the 72 hours and the Mandiant date applied. F259 not re-read at source; no native Lithuanian reader.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Serverio atnaujinimai: ką įjungti ir patikrinti – Suktas
**Aprašas (meta):** Prižiūri serverį? Ką įjungti, kad saugumo atnaujinimai būtų diegiami automatiškai, ką jie aplenkia ir ką daryti, jei kurios nors programos atnaujinti negali.

# Serverio atnaujinimai

**Angliškai:** server updates, unattended upgrades · **Skaitymo laikas:** 3 min. · **Patikrinta:** 2026-11-09 ([Šaltiniai](/saltiniai/))

## Trumpai

Pasenusi ar nebepalaikoma programinė įranga, pasak NKSC, išlieka viena dažniausių sėkmingų kibernetinių atakų priežasčių. <!-- F1032 --> Įjunk automatinius saugumo atnaujinimus, surašyk, kas serveryje pasiekiama internetu, ir išjunk tai, ko nereikia. <!-- F1032 F1028 -->

## Kaip tai atrodo

Automatiniai atnaujinimai apima ne viską. <!-- M --> Per 2026 m. spalio PHP įspėjimą NKSC atskirai priminė, kad kitų gamintojų programas reikia atnaujinti pagal gamintojo rekomendacijas. <!-- F1027 --> JAV agentūra CISA rašė, kad PHP dažnai yra kitos programinės įrangos dalis ir iš pažiūros to gali nesimatyti. <!-- F1029 -->

## Kaip atpažinti, kad vėluoji

1. **Nėra sąrašo, kas pasiekiama internetu.** NKSC tokią inventorizaciją pataria padaryti pirmiausia. <!-- F1028 -->
2. **Programa įdiegta iš papildomos saugyklos.** „Ubuntu“ dokumentacija įspėja: vien pridėjus saugyklą automatiniai atnaujinimai į ją neatsižvelgs. <!-- F1040 -->
3. **Veikia versija, kuri nebegauna saugumo atnaujinimų.** <!-- F1028 M -->
4. **Atsarginė kopija niekada nebuvo atkurta.** NKSC pataria periodiškai tikrinti, ar kopijos gali būti sėkmingai atkurtos. <!-- F1032 -->

## Tavo ėjimas

**Įjunk automatinius saugumo atnaujinimus ir surašyk, kas serveryje pasiekiama internetu.** <!-- F1032 F1028 -->

## Ką padaryti {#ka-padaryti}

1. **„Ubuntu“ serveryje** saugumo atnaujinimai diegiami automatiškai, be naudotojo veiksmų, per paketą „unattended-upgrades“, kuris įdiegtas pagal nutylėjimą; patikrink [pagal „Ubuntu“ dokumentaciją](https://documentation.ubuntu.com/server/how-to/software/automatic-updates/), ar paketas neišjungtas. <!-- F1040 M --> Paketas gali paleisti sistemą iš naujo, bet pagal nutylėjimą to nedaro: toks atnaujinimas iki galo veiks tik paleidus serverį iš naujo. <!-- F1040 --> Kitoms sistemoms skaityk jų gamintojo dokumentaciją. <!-- M -->
2. **Kitų gamintojų programos.** Atnaujink jas pagal gamintojo rekomendacijas. <!-- F1027 -->
3. **Inventorizacija.** Surašyk valdomus išteklius ir programinę įrangą, prieinamą internetu. <!-- F1028 -->
4. **Mažink tai, kas matoma.** Uždaryk nenaudojamus tinklo prievadus, išjunk nereikalingas paslaugas, neviešink vidinių sistemų internete be poreikio. <!-- F1032 -->
5. **Apribok prisijungimą.** Įjunk [antrą prisijungimo žingsnį](/zodynas/#antras-prisijungimo-zingsnis), pašalink arba išjunk numatytąsias paskyras. <!-- F1032 -->
6. **Registruok ir tikrink.** Registruok svarbiausius sistemos įvykius, prisijungimus ir administravimo veiksmus, o atsargines kopijas periodiškai bandyk atkurti. <!-- F1032 -->

## Kuo rizikuoji

- **Viskuo, kas tame serveryje.** Svetainėmis, duomenimis, paštu. <!-- M -->
- **Žmonių duomenimis.** Jei nutekės asmens duomenys, gali tekti pranešti Valstybinei duomenų apsaugos inspekcijai per 72 valandas. <!-- F1021 -->

## Jei jau vėluoji

1. **Negali atnaujinti iš karto?** ES institucijų ir agentūrų pareiškime dėl PHP spragų patariama svarstyti galimybę izoliuoti paveiktas programas nuo viešųjų tinklų, kol pataisymus bus galima pritaikyti. <!-- F1030 -->
2. **PHP versijai saugumo atnaujinimų nebėra?** Pereik prie palaikomos versijos. <!-- M --> Per 2026 m. spalio PHP spragas NKSC rašė, kad tokią versiją reikia izoliuoti nuo interneto, o JAV agentūra CISA patarė tokias sistemas atjungti, kol bus atnaujintos. <!-- F1028 F1029 --> Atjungtos programos lankytojams neveiks. <!-- M -->
3. **Įtari įsilaužimą?** Pranešk NKSC: cert@nksc.lt. <!-- F259 -->
4. **Galėjo nutekėti asmens duomenys?** Jei pažeidimas kelia pavojų žmonių teisėms, apie jį reikia pranešti Valstybinei duomenų apsaugos inspekcijai per 72 valandas nuo sužinojimo. <!-- F1021 --> Jei pavojus didelis, nedelsiant reikia pranešti ir patiems žmonėms. <!-- F1021 -->

**Mygtukai**
- Main: **Spragos ir atnaujinimai** → /pazeidziamumai/
- Second: **Svetainė** → /pazeidziamumai/svetaine/

## Kaip tai daro jis

*(Šis sluoksnis jau atvertas. Jame – tik tai, ko jis nori ir kodėl jam pavyksta; nė žodžio apie tai, kaip spragomis naudojamasi. „Jis“ čia – tas, kuris naudojasi neatnaujintais serveriais. Paaiškinimas yra mūsų pačių modelis, o faktai pažymėti šaltiniais.)*

### Ko jis nori

Serverio, kuriame spraga žinoma, o pataisa neįdiegta: duomenų, prieigos prie to, kas ten veikia, ir vietos, iš kurios galima pulti kitus. <!-- M --> **Sustabdymo vieta:** automatiniai saugumo atnaujinimai. <!-- F1032 -->

### Kodėl tai veikia

Serveris, kurio niekas nežiūri, neatnaujintas gali veikti metus. <!-- M --> O laiko nedaug. JAV bendrovė „Mandiant“ išnagrinėjo 2023 m. paskelbtas spragas: iš 41, kuriomis imta naudotis jau po pataisos, 12 % panaudotos per vieną dieną, 56 % per mėnesį. <!-- F1031 --> **Sustabdymo vieta:** sąrašas, kas veikia, ir atnaujinimai, kurie diegiami be tavo įsikišimo. <!-- F1028 F1032 M -->

### Kur jį sustabdyti

| Jo triukas | Tavo atsakymas |
|---|---|
| Naudojasi tuo, kad pataisa dar neįdiegta | Automatiniai saugumo atnaujinimai. <!-- F1032 --> |
| Pamiršta paslauga, atvira internetui | Uždaryk nenaudojamus prievadus, išjunk nereikalingas paslaugas. <!-- F1032 --> |
| PHP versija, kuri nebetaisoma | Pereik prie palaikomos; kol negali, atjunk nuo interneto. <!-- F1028 F1029 M --> |
| Numatytoji paskyra | Pašalink arba išjunk. <!-- F1032 --> |

### Ko čia nerasi

Jokių spragų veikimo aprašymų, jokių nurodymų, kaip jomis pasinaudoti, ir jokių būdų surasti neatnaujintus serverius. Tai mūsų [riba](/misija/#riba). <!-- pažadas -->

## Susiję

- **Vadovai:** [Spragos ir atnaujinimai](/pazeidziamumai/), [Svetainė](/pazeidziamumai/svetaine/), [Telefonas ir kompiuteris](/pazeidziamumai/telefonas-ir-kompiuteris/)
- **Žodynas:** [Pažeidžiamumas](/zodynas/#pazeidziamumas), [Pataisa](/zodynas/#pataisa), [Nulinės dienos spraga](/zodynas/#nulines-dienos-spraga), [CVE](/zodynas/#cve)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-09. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- NKSC, 2026-10-21 ir 2026-10-22: PHP įspėjimas, klausimai ir atsakymai. <!-- F1027 F1028 -->
- NKSC, „Interneto svetainių apsauga“ (be datos, skaityta 2026-11-09). <!-- F1032 -->
- NKSC, „Pranešti“ (be datos). <!-- F259 -->
- Valstybinė duomenų apsaugos inspekcija (atnaujinta 2025-05-26) ir „Your Europe“ (tikrinta 2026-08-05): 72 valandos. <!-- F1021 -->
- Europos Komisija, bendras pareiškimas dėl PHP (2026-10-21). <!-- F1030 -->
- CISA (JAV; peržiūrėta 2026-10-26): PHP įspėjimas. <!-- F1029 -->
- „Mandiant“ (JAV, „Google“ dalis), 2024-10-16, apie 2023 m. paskelbtas spragas: kaip greitai panaudojamos žinomos spragos. <!-- F1031 -->
- „Ubuntu Server“ dokumentacija (angliškai; be datos, skaityta 2026-11-09). <!-- F1040 -->
