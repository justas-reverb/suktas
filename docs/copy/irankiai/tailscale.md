Page: /irankiai/tailscale/ (Tailscale: privatus tinklas tavo įrenginiams), a tool article (2026-11-07).
Purpose: answer *kas yra tailscale*, *tailscale vpn*: what it connects, how it differs from a VPN service bought for privacy, when an exit node helps (public Wi-Fi, a home-only service abroad), what Tailscale sees, and that it is not anonymous even with the Mullvad add-on. It is free for personal use, and the page says why that is not the „free VPN" the site refuses (it does not carry your browsing through someone else's network; F962). Not stated: Tailscale's founding year, a Lithuanian interface (FACTS B72, Not found).
FACTS used: F961–F969. `M` rests on our editorial model.
Linked from: `/irankiai/` (the Tailscale card's „Plačiau"), `/irankiai/mullvad/`, `/irankiai/grapheneos/`, `/temos/irenginiai/` (Padeda), Turinys, Šaltiniai, Kas pasikeitė.
Review: second reader (Opus), 2026-11-07, read the network and phone cards and the three tool articles against F950–F982 and the saved pages. Must fix 5, all applied; optional 2, 1 applied; refused: how Tailscale earns (the pricing page was not re-read this pass). No tag was contradicted by its source; the fixes removed an IP-tracking overclaim, masculine forms, a mistranslated „profile“, and spelled out that the GrapheneOS wipe removes Smart-ID, bank apps and second-step codes. Not re-read at source: F955, F956, F966, F969 beyond FACTS. No native Lithuanian reader yet.

Source tags: `<!-- Fnn -->` FACTS entry; `<!-- M -->` our model; `<!-- pažadas -->` the site's promise. The build strips every comment.

---

**Puslapio pavadinimas:** Tailscale: privatus tinklas tavo įrenginiams – Suktas
**Aprašas (meta):** Kas yra „Tailscale“, kuo jis skiriasi nuo VPN paslaugos, kada pravers ir ką saugoti, kad tavo įrenginių tinklas liktų tik tavo.

# Tailscale: privatus tinklas tavo įrenginiams

**Skaitymo laikas:** 3 min. · **Patikrinta:** 2026-11-07 ([Šaltiniai](/saltiniai/))

## Trumpai

„Tailscale“ sujungia tavo įrenginius – telefoną, nešiojamąjį ir namų kompiuterį – į privatų tinklą, kuriame jie vienas kitą pasiekia iš bet kur. <!-- F961 M --> Ryšys tarp jų užšifruotas „WireGuard“ protokolu. <!-- F961 --> Tai ne VPN paslauga privatumui: pagal nutylėjimą tavo naršymo internete jis neliečia. <!-- F962 --> Asmeniniam naudojimui jis nemokamas. <!-- F964 -->

## Kam jis pravers

- **Pasiekti savo įrenginius iš bet kur.** Per šį tinklą juos pasiekti gali tik prie jo prijungti įrenginiai. <!-- F961 -->
- **Viešas „Wi-Fi“.** Vieną savo įrenginį namuose gali paversti išėjimo mazgu (angl. *exit node*): tada visas telefono ar kompiuterio srautas eina per jį, kaip per įprastą VPN. <!-- F962 --> „Tailscale“ pateikia pavyzdį – kavinė su nepatikimu „Wi-Fi“. <!-- F962 -->
- **Paslauga, veikianti tik tavo šalyje.** Kitas „Tailscale“ pavyzdys – keliaujant užsienyje pasiekti paslaugą, kuri veikia tik tavo šalyje, pavyzdžiui, banko. <!-- F962 -->

## Ko jis nedaro

- **Neslepia tavęs nuo interneto.** Su išėjimo mazgu namuose svetainės mato tavo namų interneto adresą. <!-- M F962 -->
- **Nėra anonimiškas.** Kiekviena „Tailscale“ paskyra susieta su el. pašto ar „GitHub“ paskyra. <!-- F969 --> Net per „Tailscale“ jungiant „Mullvad“ priedą, „Tailscale“ žino, kuri „Mullvad“ paskyra kuriam naudotojui priklauso. <!-- F969 --> Jei nori [„Mullvad“](/irankiai/mullvad/) be vardo, naudok jo paties programėlę. <!-- M -->
- **Nuo apgaulės neapsaugo.** Jis saugo ryšį tarp įrenginių, o ne tavo sprendimus. <!-- M -->

## Ką mato „Tailscale“

Tavo srauto turinys užšifruotas nuo galo iki galo, ir „Tailscale“ jo pasiekti negali; tarpiniai serveriai jo irgi neiššifruoja. <!-- F967 --> Bet bendrovė renka metaduomenis: įrenginio pavadinimą, IP adresą, prisijungimo laikus ir ryšių žurnalus. <!-- F967 --> Programėlių kodas daugiausia atviras (BSD-3), o serveris, kuris koordinuoja ryšius, – uždaras. <!-- F965 -->

## Kaip pradėti

1. **Parsisiųsk tik iš** [tailscale.com/download](https://tailscale.com/download): yra „Windows“, „macOS“, „Linux“, „Android“ ir „iOS“ versijos. <!-- F963 -->
2. **Prisijunk esama paskyra.** „Tailscale“ slaptažodžių neturi: jungiamasi per „Google“, „Microsoft“, „Apple“ ar „GitHub“ paskyrą. <!-- F968 -->
3. **Tą paskyrą apsaugok antru žingsniu.** Įjungtas ten, antras žingsnis galios ir jungiantis prie „Tailscale“. <!-- F968 --> Kaip tai padaryti: [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/).
4. **Junk tik savo įrenginius.** Viskas, ką prijungsi prie savo tinklo, galės pasiekti tavo įrenginius. <!-- M F961 -->
5. **Išėjimo mazgą įjunk tada, kai reikia**, pavyzdžiui, viešame „Wi-Fi“ tinkle. <!-- F962 M -->

**Mygtukai**
- Main: **Kortelė Įrankiuose** → /irankiai/#k-tailscale
- Second: **Visi įrankiai** → /irankiai/

## Ką stebėti

- **Nemokamas tik asmeniniam naudojimui.** Planas „Personal“ tinka tik nekomerciniam naudojimui: iki 6 žmonių, įrenginių – neribotai. <!-- F964 -->
- **Kas yra bendrovė.** Senesnės paskyros sudarytos su „Tailscale Inc.“ (Kanada), naujos nuo 2024-09-03 – su „Tailscale US Inc.“ (JAV). <!-- F966 -->
- **„Mullvad“ priedas** dar bandomasis ir kainuoja 5 USD per mėnesį už 5 įrenginius. <!-- F969 F964 -->

## Susiję

- **Įrankiai:** [Mullvad VPN](/irankiai/mullvad/), [GrapheneOS](/irankiai/grapheneos/)
- **Temos:** [Įrenginiai ir tinklas](/temos/irenginiai/), [Slaptažodžiai ir prieigos raktai](/temos/slaptazodziai/)

## Šaltiniai ir patikrinta

Patikrinta: 2026-11-07. Šiame puslapyje naudoti faktai (visi su datomis [Šaltiniuose](/saltiniai/)):
- „Tailscale“ dokumentacija („What is Tailscale?“, 2025-09-30; „Exit nodes“, 2025-12-15; „Mullvad exit nodes“, 2026-01-09; prisijungimo paslaugos, 2026-01-05): ką daro, išėjimo mazgai, „Mullvad“ priedas, prisijungimas. <!-- F961 F962 F968 F969 -->
- „Tailscale“ (atsisiuntimas, kainos, atviras kodas, „How Tailscale works“; naudojimo sąlygos ir privatumo politika, 2026-08-25): platformos, kaina, licencija, bendrovė, ką mato. <!-- F963 F964 F965 F966 F967 -->
