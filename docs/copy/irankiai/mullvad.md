Page: /irankiai/mullvad/ (Mullvad VPN: ką VPN apsaugo, o ko ne), the first tool article with a page of its own (2026-11-07).
Purpose: answer *ar verta VPN*, *mullvad vpn*, *saugus vpn*: what a VPN does and what it does not, why the site recommends a paid VPN and never a free one (the promise on `/irankiai/#kaip-renkames`), why Mullvad, and how to start without handing over a name. No attacker's side (a tool page, not a scenario), so ARCHITECTURE §6 applies only to the „Ko VPN nedaro" lines. Not stated: anything about a VPN's legality in Lithuania, and free or fake VPN apps as a Lithuanian official warning (FACTS B73, Not found); the audits' contents (not read, F956).
FACTS used: F950–F960, F979, F981, F982, F983. `M` rests on our editorial model.
Linked from: `/irankiai/` (the Mullvad card's „Plačiau"), `/irankiai/tailscale/`, `/irankiai/grapheneos/`, `/temos/irenginiai/` (Padeda), Turinys, Šaltiniai, Kas pasikeitė.
Review: second reader (Opus), 2026-11-07, read the network and phone cards and the three tool articles against F950–F982 and the saved pages. Must fix 6, all applied; optional 2, 2 applied. No tag was contradicted by its source; the fixes removed an IP-tracking overclaim, masculine forms, a mistranslated „profile“, and spelled out that the GrapheneOS wipe removes Smart-ID, bank apps and second-step codes. Not re-read at source: F955, F956, F966, F969 beyond FACTS. The „Onavo Protect“ paragraph (F983, added 2026-11-07 with reel R11) was read by the R11 script's second reader (Opus) against the ACCC page, and its fixes are in. No native Lithuanian reader yet.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Mullvad VPN: ką VPN apsaugo, o ko ne – Suktas
**Aprašas (meta):** Kada VPN tikrai padeda, ką reklamos perdeda, kodėl nesiūlome nemokamo VPN ir kaip saugiai pradėti naudotis „Mullvad“.

# Mullvad VPN: ką VPN apsaugo, o ko ne

**Skaitymo laikas:** 3 min. · **Patikrinta:** 2026-11-07 ([Šaltiniai](/saltiniai/))

## Trumpai

VPN užšifruoja tavo interneto ryšį ir nukreipia jį per kitą tinklą. <!-- F950 F982 --> Tavo interneto tiekėjas nebemato, ką veiki, o svetainės mato ne tavo, o VPN serverio IP adresą. <!-- F950 F982 M --> Bet nuo sukčių, kenkėjiškų programų ir sekimo VPN vienas neapsaugo: reklamos, kurios tai žada, perdeda. <!-- F982 --> „Mullvad“ – mokamas VPN iš Švedijos, kuriam nereikia nei tavo vardo, nei el. pašto. <!-- F958 F953 -->

## Kada VPN padeda

- **Viešas „Wi-Fi“.** NKSC pataria viešame belaidžiame tinkle nesinaudoti el. bankininkyste, nepirkti ir neįvesti asmeninių duomenų, o būtinus dalykus daryti per savo mobilųjį internetą arba VPN. <!-- F981 -->
- **Tavo interneto tiekėjas.** Su VPN jis nemato, ką veiki internete. <!-- F950 -->
- **Tavo IP adresas.** Svetainės mato VPN serverio adresą, ne tavo. <!-- F950 M --> „Mullvad“ rašo, kad tada niekas negali tavęs sekti pagal tavo IP adresą. <!-- F950 -->

## Ko VPN nedaro

- **Nuo apgaulės neapsaugo.** Jei sukčius įkalbės paspausti nuorodą ar padiktuoti kodą, VPN to nesustabdys. <!-- M --> Tam skirti [Įpročiai](/sustok/).
- **Svetainės, kuriose prisijungi, vis tiek žino, kas tu.** VPN keičia tik kelią, kuriuo eina ryšys. <!-- M F982 -->
- **Privatumui jo neužtenka.** Pats „Mullvad“ rašo, kad VPN reikia derinti su privatumą saugančia naršykle. <!-- F950 --> Kaip sumažinti sekimą naršyklėje: [Įrenginiai ir tinklas](/temos/irenginiai/#sekimas).
- **Pasitikėjimą tik perkeli.** Tai, ką anksčiau matė interneto tiekėjas, dabar gali matyti VPN tiekėjas, todėl naudok tik tą, kuriuo pasitiki. <!-- M F982 -->

## Kodėl ne nemokamas VPN {#nemokamas}

Nemokamų VPN nesiūlome. <!-- pažadas --> Nemokama paslauga irgi turi iš kažko gyventi; JAV ne pelno organizacija EFF siūlo paklausti, kaip VPN išsilaiko, jei neparduoda savo paslaugos. <!-- F982 --> „Mullvad“ rašo, kad „nemokamos“ paslaugos beveik visada turi savo kainą: reklamą, tavo duomenų rinkimą arba apribotas funkcijas. <!-- F952 --> EFF taip pat įspėja: tai, kad programėlė yra oficialioje parduotuvėje, dar nereiškia, kad ji saugi. <!-- F982 -->

Kaip tai atrodo: nemokamas „Meta“ (tada – „Facebook“) grupės VPN „Onavo Protect“ programėlių parduotuvėse žadėjo apsaugoti asmeninę informaciją, o nuasmeninti suvestiniai duomenys apie tai, kokias programėles žmonės atidarė ir kiek laiko jose praleido, buvo perduodami „Meta“ bendrovei jos komercinei naudai. 2023 m. Australijos teismas pripažino, kad tai galėjo klaidinti, nes žmonėms apie tai nebuvo tinkamai pasakyta, ir skyrė dviem „Meta“ dukterinėms įmonėms iš viso 20 mln. Australijos dolerių baudą; paslauga veikė iki 2019 m. gegužės. <!-- F983 -->

## Kodėl „Mullvad“

- **Jokių asmens duomenų.** Nei vardo, nei el. pašto, nei slaptažodžio: gauni atsitiktinį paskyros numerį. <!-- F953 --> Mokėjimas kortele, „PayPal“ ar banko pavedimu nėra anonimiškas. Grynuosius galima atsiųsti paštu, ir „Mullvad“ rašo, kad nežino, kas juos atsiuntė. <!-- F953 F952 -->
- **Veiklos žurnalų nesaugo.** Taip rašo „Mullvad“ taisyklės. <!-- F954 --> 2023 m. balandį Švedijos policija atvyko į „Mullvad“ biurą Geteborge su kratos orderiu paimti kompiuterių su klientų duomenimis; pasak „Mullvad“, tokių duomenų nebuvo, ir policija išėjo nieko nepaėmusi. <!-- F955 -->
- **Tikrina ir kiti.** Naujausią saugumo vertinimą 2026 m. vasarį atliko „Leviathan“, programėlės auditą 2024 m. lapkritį – „X41 D-Sec“; taip nurodo „Mullvad“, ataskaitų patys neskaitėme. <!-- F956 -->
- **Atviras kodas ir viena kaina.** Kodas – pagal GPL-3 licenciją; kaina – 5 € per mėnesį su PVM, ta pati nuo 2009 m. <!-- F957 F952 -->
- **Jį mini ir „GrapheneOS“.** Šios telefono sistemos kūrėjai iš VPN programėlių rekomenduoja tik oficialią „WireGuard“ ir oficialią „Mullvad“ programėlę. <!-- F979 -->

## Kaip pradėti

1. **Parsisiųsk tik iš oficialaus šaltinio:** [mullvad.net/en/download/vpn](https://mullvad.net/en/download/vpn) arba „Google Play“, „F-Droid“, „App Store“. <!-- F951 -->
2. **Susikurk paskyrą** ir išsaugok paskyros numerį [slaptažodžių tvarkyklėje](/irankiai/#slaptazodziu-tvarkykles): be jo neprisijungsi. <!-- F953 M -->
3. **Apmokėk tiek laiko, kiek nori:** už mėnesį ar už metus kaina ta pati. <!-- F952 --> Per 14 dienų pinigus gali susigrąžinti, išskyrus grynuosius. <!-- F952 -->
4. **Įdiek tuose įrenginiuose, kuriuose reikia:** viena paskyra tinka iki 5 įrenginių. <!-- F959 -->
5. **Viešame „Wi-Fi“ tinkle VPN įjunk** dar prieš atidarant banką ar parduotuvę, arba naudokis mobiliuoju internetu. <!-- F981 M -->

**Mygtukai**
- Main: **Kortelė Įrankiuose** → /irankiai/#k-mullvad
- Second: **Visi įrankiai** → /irankiai/

## Ką stebėti

- **Kalba.** Kompiuterio programoje lietuvių kalbos nėra; svetainės ir telefono programėlių kalbų netikrinome. <!-- F960 -->
- **Netikros kopijos.** VPN programėlę siųskis tik iš gamintojo puslapio ar jo nurodytų parduotuvių. <!-- pažadas F951 --> Reklama, kad VPN „apsaugo nuo visko“, – ženklas suklusti. <!-- M F982 -->

## Susiję

- **Įrankiai:** [Tailscale](/irankiai/tailscale/), [GrapheneOS](/irankiai/grapheneos/), [Slaptažodžių tvarkyklės](/irankiai/#slaptazodziu-tvarkykles)
- **Temos:** [Įrenginiai ir tinklas](/temos/irenginiai/)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-07. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- „Mullvad“ (pagrindinis puslapis, kainos, atsisiuntimas, DUK, „Apie“, žurnalų politika, atnaujinta 2026-06-17; tinklaraštis, 2023-04-20; „GitHub“ saugykla): ką daro VPN, platformos, kaina, paskyra, žurnalai, krata, auditai, licencija, įmonė, įrenginiai, kalbos. <!-- F950 F951 F952 F953 F954 F955 F956 F957 F958 F959 F960 -->
- NKSC (2020-02-12): viešas „Wi-Fi“ ir VPN. <!-- F981 -->
- EFF „Surveillance Self-Defense“ (JAV, peržiūrėta 2026-07-28): kam tinka VPN ir kaip juo pasitikėti. <!-- F982 -->
- ACCC (Australija, 2023-07-26): „Onavo Protect“ ir teismo skirta 20 mln. Australijos dolerių bauda. <!-- F983 -->
- „GrapheneOS“ DUK: rekomenduojamos VPN programėlės. <!-- F979 -->
