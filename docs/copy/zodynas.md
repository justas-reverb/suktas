Page: /zodynas/ (Žodynas), phase 1; the index and its entries (six at launch; Pažeidžiamumas, Pataisa, Nulinės dienos spraga and CVE added 2026-11-09).
Purpose: define only the terms the launch pages use, in plain Lithuanian, each with the page where the reader meets it and the move. The index sorts in Lithuanian order; the entries linked to a /zodynas/ address in the list below are pages of their own, and Socialinė inžinerija links its topic, `/temos/socialine-inzinerija/` (a word page from the morning of 2026-11-06, a topic since that afternoon); Phishing's entry here, Sukčiavimas apsimetant, points to it. Entries sit on one page at launch, each with an anchor; separate entry pages come when there are enough terms.
FACTS used: F1022–F1025, F1029, F1041, F51, F59, F60, F61, F62, F64, F65, F66, F67, F68, F71, F72, F79 (a gap, stated as "we found none"). `M` rests on our editorial model. Not stated: any Apple or Bitwarden Lithuanian term (F63, F73 GAP).
Review: second reader (Opus, 2026-11-09) on the four entries added that day: a live CVE number removed (§6), wording fixes applied.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Sukčiavimo terminai paprastais žodžiais – Suktas
**Aprašas (meta):** Terminai, kuriuos naudoja svetainė: kas tai paprastais žodžiais ir ką daryti.

# Žodynas

Tik tie terminai, kuriuos naudoja svetainė. <!-- pažadas -->

- [Antras prisijungimo žingsnis](#antras-prisijungimo-zingsnis)
- [CVE](#cve)
- [DI programėlės prenumerata](/zodynas/di-prenumerata/)
- [Finansinė piramidė](/zodynas/piramide/)
- [Greito uždarbio kursai](/zodynas/greito-uzdarbio-kursai/)
- [Lažybų prognozės](/zodynas/lazybu-prognozes/)
- [Nelegalus kazino](/zodynas/nelegalus-kazino/)
- [Nulinės dienos spraga](#nulines-dienos-spraga)
- [Nuotolinis prisijungimas](#nuotolinis-prisijungimas)
- [Pataisa](#pataisa)
- [Pažeidžiamumas](#pazeidziamumas)
- [Phishing](/zodynas/phishing/)
- [Pinigų mulas](/zodynas/pinigu-mulas/)
- [Prieigos raktas](#prieigos-raktas)
- [Programėlė iš mažo pardavėjo](/zodynas/programele-su-di/)
- [SIM kortelės pakeitimas](#sim-korteles-pakeitimas)
- [Slaptažodžių tvarkyklė](#slaptazodziu-tvarkykle)
- [Socialinė inžinerija](/temos/socialine-inzinerija/)
- [Sukčiavimas apsimetant](#sukciavimas-apsimetant)

**Mygtukai**
- Main: **Atversk žodyną** → #antras-prisijungimo-zingsnis
- Second: **Į scenarijus** → /scenarijai/

---

## Antras prisijungimo žingsnis {#antras-prisijungimo-zingsnis}

**Terminas:** antras prisijungimo žingsnis (angl. second factor, 2FA, MFA; NKSC rašo „daugiaveiksnis autentifikavimas“). <!-- F68 F42 -->

**Paprastai tariant:** tai dar vienas dalykas po slaptažodžio: prieigos raktas, fizinis raktas, programėlės kodas ar SMS kodas. <!-- F60 F64 F66 -->

**Kur susidursi:** [Tavo slaptažodis nutekėjo](/scenarijai/slaptazodis-nutekejo/), [Žinutė su kodu](/scenarijai/zinute-su-kodu/).

**Tavo ėjimas:** rinkis prieigos raktą ar fizinį raktą, o jei jų nėra – programėlę; SMS tik jei nieko kito nėra. <!-- F60 F64 F66 --> [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/).

*Kodėl tai veikia ir kur neapsaugo.* CISA sako, kad vienintelis plačiai prieinamas apgaulei atsparus būdas yra FIDO, o SMS nėra atsparus apgaulei. <!-- F64 F66 --> Programėlės kodas geresnis už SMS, bet jį vis tiek galima išvilioti. <!-- F66 --> **Sustabdymo vieta:** jokio kodo niekam nesakyk. <!-- F42 -->

**Šaltinis ir patikrinta:** CISA, NKSC; 2026-10-24. <!-- F64 F66 F68 -->

---

## CVE {#cve}

**Terminas:** CVE (angl. Common Vulnerabilities and Exposures). <!-- F1025 -->

**Paprastai tariant:** viešai žinomų spragų sąrašas: kiekviena turi numerį, aprašymą ir bent vieną nuorodą į šaltinį. <!-- F1025 --> Numeris atrodo taip: CVE, metai ir eilės numeris. <!-- F1025 -->

**Kur susidursi:** gamintojų ir NKSC įspėjimuose. <!-- F1027 M --> [Spragos ir atnaujinimai](/pazeidziamumai/).

**Tavo ėjimas:** numerio suprasti nereikia: patikrink, ar tavo programa atnaujinta. <!-- M -->

**Šaltinis ir patikrinta:** NIST (JAV), 2026-11-09. <!-- F1025 -->

---

## Nulinės dienos spraga {#nulines-dienos-spraga}

**Terminas:** nulinės dienos spraga (angl. zero-day). <!-- F1024 -->

**Paprastai tariant:** spraga, kuria imama naudotis anksčiau, nei gamintojas išleidžia pataisą. <!-- F1024 -->

**Kur susidursi:** gamintojų įspėjimuose, dažnai angliškai („zero-day“). <!-- M --> [Spragos ir atnaujinimai](/pazeidziamumai/).

**Tavo ėjimas:** kol pataisos nėra, laikykis gamintojo nurodymų, o kai ji pasirodo, įdiek iš karto. <!-- M --> Automatiniai atnaujinimai dažnai tai padarys už tave. <!-- F1041 M -->

**Šaltinis ir patikrinta:** NIST (JAV), „Mandiant“ (JAV); 2026-11-09. <!-- F1024 -->

---

## Nuotolinis prisijungimas {#nuotolinis-prisijungimas}

**Terminas:** nuotolinis prisijungimas (prie kito kompiuterio; angl. remote access). <!-- F51 -->

**Paprastai tariant:** kai kitas žmogus per programą prisijungia prie tavo kompiuterio. Bankų asociacija sako, kad sukčių prašomos įdiegti programos dažnai yra būtent tokios. <!-- F51 -->

**Kur susidursi:** [Skambutis iš „banko“](/scenarijai/skambutis-is-banko/), [Skambutis iš „policijos“](/scenarijai/skambutis-is-policijos/).

**Tavo ėjimas:** neįdiek programos, kurios prašo skambinantis, ir neprisijunk prie bankininkystės „kartu“. <!-- F51 F27 --> [Padėk ragelį ir skambink oficialiu numeriu](/sustok/padek-ragely/).

**Šaltinis ir patikrinta:** Bankų asociacija, 2022-10-27; 2026-10-24. <!-- F51 -->

---

## Pataisa {#pataisa}

**Terminas:** pataisa (angl. patch); NKSC rašo „pataisymai“, „Google“ – „saugos pataisos“. <!-- F1023 -->

**Paprastai tariant:** gamintojo išleistas sprendimas nustatytai problemai, dažniausiai atkeliaujantis su programos atnaujinimu. <!-- F1023 M --> Saugo tik tada, kai yra įdiegta. <!-- M -->

**Kur susidursi:** [Telefono ir kompiuterio atnaujinimai](/pazeidziamumai/telefonas-ir-kompiuteris/), [Svetainės atnaujinimai](/pazeidziamumai/svetaine/).

**Tavo ėjimas:** įjunk automatinius atnaujinimus. <!-- F1041 -->

**Šaltinis ir patikrinta:** NIST (JAV), NKSC, „Google“; 2026-11-09. <!-- F1023 -->

---

## Pažeidžiamumas {#pazeidziamumas}

**Terminas:** pažeidžiamumas, dar vadinamas spraga (angl. vulnerability). <!-- F1022 -->

**Paprastai tariant:** silpna programos ar sistemos vieta, kuria kas nors gali pasinaudoti. <!-- F1022 --> NKSC vartoja abu žodžius; oficialaus lietuviško apibrėžimo neradome. <!-- F1022 -->

**Kur susidursi:** [Spragos ir atnaujinimai](/pazeidziamumai/), [Svetainės atnaujinimai](/pazeidziamumai/svetaine/), [Serverio atnaujinimai](/pazeidziamumai/serveris/).

**Tavo ėjimas:** įjunk automatinius atnaujinimus. <!-- F1041 --> [Telefono ir kompiuterio atnaujinimai](/pazeidziamumai/telefonas-ir-kompiuteris/).

**Šaltinis ir patikrinta:** NIST (JAV), NKSC; 2026-11-09. <!-- F1022 -->

---

## Prieigos raktas {#prieigos-raktas}

**Terminas:** prieigos raktas (angl. passkey). Lietuviškai taip jį vadina „Google“ ir „Microsoft“. <!-- F61 F62 -->

**Paprastai tariant:** prisijungimo būdas vietoj slaptažodžio. „Google“ rašo, kad prieigos raktų negalima bendrinti, kopijuoti, užrašyti ar netyčia perduoti kitam, todėl jie yra labiau apsaugoti nuo duomenų išviliojimo. <!-- F61 -->

**Kur susidursi:** [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/), [Tavo slaptažodis nutekėjo](/scenarijai/slaptazodis-nutekejo/).

**Tavo ėjimas:** kur paslauga siūlo prieigos raktą, rinkis jį. <!-- F60 F64 --> [Patikra per 15 minučių](/patikra/15-minuciu/).

*Kodėl tai veikia ir kur neapsaugo.* Naršyklė ir operacinė sistema susieja raktą su tikra paslauga, todėl tau nereikia spręsti, ar svetainė tikra. <!-- F60 --> „Microsoft“ sako, kad prieigos raktai atsparūs sukčiavimo apsimetant atakoms, nes remiasi fiziniu įrenginiu. <!-- F62 --> Jie atsparūs, o ne neįveikiami, todėl rašome „atsparūs“. <!-- M --> **Sustabdymo vieta:** kur paslauga prieigos rakto nesiūlo, lieka ilgas slaptažodis ir antras žingsnis. <!-- F55 F66 -->

**Šaltinis ir patikrinta:** FIDO bendruomenė (passkeys.dev), „Google“ ir „Microsoft“ lietuviški puslapiai, CISA; 2026-10-24. <!-- F60 F61 F62 F64 -->

---

## SIM kortelės pakeitimas {#sim-korteles-pakeitimas}

**Terminas:** SIM kortelės pakeitimas (angl. SIM swap). <!-- F65 -->

**Paprastai tariant:** sukčiai įtikina operatorių perkelti tavo numerį į savo SIM kortelę. <!-- F65 --> Tada SMS kodai ateina jiems. <!-- M -->

**Kur susidursi:** [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/).

**Tavo ėjimas:** SMS kodą naudok tik jei kito antro žingsnio nėra. <!-- F66 F67 --> Ar Lietuvos operatoriai siūlo apsaugą nuo šio triuko, šaltiniuose neradome. <!-- F79 -->

**Šaltinis ir patikrinta:** CISA; NIST SP 800-63B-4; 2026-10-24. <!-- F65 F66 F67 -->

---

## Slaptažodžių tvarkyklė {#slaptazodziu-tvarkykle}

**Terminas:** slaptažodžių tvarkyklė (angl. password manager). „Google“ lietuviškai taip ją vadina; NKSC rašo „slaptažodžių valdymo įrankis“. <!-- F72 F71 -->

**Paprastai tariant:** programa, kuri įsimena slaptažodžius už tave; „Google“ tvarkyklė saugo ir prieigos raktus. <!-- F72 -->

**Kur susidursi:** [Tavo slaptažodis nutekėjo](/scenarijai/slaptazodis-nutekejo/), [Įrankiai](/irankiai/).

**Tavo ėjimas:** kiekvienai paskyrai – skirtingas ilgas slaptažodis, kurį įsimena tvarkyklė. <!-- F55 F71 --> NIST reikalauja, kad paslaugos leistų naudoti tvarkykles ir automatinį užpildymą. <!-- F59 --> [Įrankiai](/irankiai/).

**Šaltinis ir patikrinta:** „Google“ lietuviškas puslapis, NKSC, NIST; 2026-10-24. <!-- F59 F71 F72 -->

---

## Sukčiavimas apsimetant {#sukciavimas-apsimetant}

**Terminas:** sukčiavimas apsimetant (angl. phishing). „Google“ lietuviškai rašo „duomenų išviliojimas“, o „Microsoft“ – „sukčiavimo apsimetant atakos“. <!-- F61 F62 --> Plačiau: [Kas yra phishing](/zodynas/phishing/).

**Paprastai tariant:** kai kas nors apsimeta banku, pareigūnu ar paslauga, kad išviliotų kodą ar slaptažodį arba priverstų tave ką nors padaryti. <!-- M -->

**Kur susidursi:** [Skambutis iš „banko“](/scenarijai/skambutis-is-banko/), [Žinutė su nuoroda](/scenarijai/zinute-su-nuoroda/), [Žinutė su kodu](/scenarijai/zinute-su-kodu/).

**Tavo ėjimas:** daryk tik tai, ką pradėjai tu, oficialioje programėlėje. <!-- F26 --> [Nespausk nuorodos – atsidaryk programėlę ar svetainę](/sustok/nuoroda-ne-is-zinutes/).

*Kaip tai daro jis.* Jis siekia, kad veiksmą atliktum tu: pasakytum kodą, paspaustum nuorodą ar įsileistum jį į savo įrenginį. <!-- F25 F26 F51 --> **Sustabdymo vieta:** jei veiksmą pradėjai ne tu, nutrauk. <!-- F26 -->

**Šaltinis ir patikrinta:** „Google“ ir „Microsoft“ lietuviški puslapiai, Lietuvos bankas; 2026-10-24. <!-- F26 F61 F62 -->
