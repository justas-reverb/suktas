# Facts for Suktas (defensive-cybersecurity pages)

Every factual claim on a Suktas page comes from this file (CLAUDE.md rule 4). A new claim is
checked at its source and written here first, with the date. Facts for the old privacy steps
stay in `docs/LANDING.md` until they are re-checked for `/patikra/privatumas/` (phase 2).

Read on 2026-10-24 by a research agent (Sonnet). **Primary** means the institution's or
vendor's own page. **Secondary** means anything else. Most pages were read through a fetch tool
that summarises. Where a page could not be fetched, only a search-engine excerpt of it was seen,
and the entry says so. Quotes are as the tool gave them, not re-checked against the live page.
No phone numbers are listed. Pages that rest on search excerpts are re-read before they go onto
a public site. Spot-checks by Opus are under *Opus check* at the end. F96 to F111 were found by a second
research agent and then read at the source by Opus on 2026-10-25; each says so.

## Summary

1. **Confirmed primary:**
   - police reporting (e-policija for non-urgent reports and for victims, 112 for urgent help);
   - NKSC's report forms and its messenger note of 2026-07-13;
   - the Smart-ID rules;
   - NIST 800-63B-4 (final);
   - CISA's router and MFA pages;
   - the FBI's code-word warnings.
2. **Banks:** SEB and Swedbank publish a 24/7 route, and Citadele's contacts page lists card
   blocking as 24/7. Luminor, Artea and Revolut were seen only in search excerpts or as an
   automated phone line (A2).
3. **Not found:**
   - any official Lithuanian use of the phrase „saugi sąskaita";
   - Mobile-ID scam guidance;
   - SIM-swap or port-out protection at Lithuanian operators;
   - any Lithuanian body recommending a family code word.
4. **Fewer incidents:** NKSC counted 1,172 incidents from January to September 2026, against
   2,451 a year earlier. Fraud cases fell from 1,223 to 354. NKSC says the threat has not gone.
5. **Outdated advice: forced periodic password changes and "must include a symbol" rules.** NIST
   800-63B-4 says verifiers SHALL NOT impose either. A password that is the only factor needs at
   least 15 characters.
6. **Also outdated: "SMS is fine as the second factor".** CISA says SMS MFA is not
   phishing-resistant and lists SIM swap as an attack on it. NIST restricts codes sent over the
   phone network.
7. **Smart-ID is moving to Smart-ID+**: no more comparing the verification code; a QR code or
   app-to-app instead, and no personal code to type. The roll-out goes service by service, so
   both flows exist now.
8. **Spoofed calls:** operators block calls from abroad that show Lithuanian fixed-line numbers
   (the obligation started on 1 November, the year inferred as 2023). By 2026 scammers call from
   random foreign numbers and use messenger apps, which operators cannot block (RRT,
   2026-08-10).
9. **Lithuanian terms:** a passkey is „prieigos raktas" in Google's and Microsoft's Lithuanian
   pages; Apple's lt-lt page read was in English. A password manager is „slaptažodžių
   tvarkyklė" in Google's Lithuanian help.
10. **Router cipher:** CISA's older home-network page (2021, archived) pairs WPA3 with TKIP. Use
    CISA's Module 5 (WPA3 Personal or WPA2 AES) instead.
11. **Money lost is not falling the way incidents are** (F107 to F110). Lithuanian payment
    providers' fraud losses were €41.7m in the first half of 2026, against €41.0m a year earlier,
    and residents lost about €20.5m in 2025, about €0.5m more than in 2024. SMS or email phishing
    is about 41% of cases (Q2 2026).
12. **New since late 2025:** callers speak flawless Lithuanian and clone a voice from a
    recording of ten-odd seconds (F97); the payee-name check since 2025-10-09 (F98); fake parking QR stickers (F101); calls
    about a "Sodra letter" (F102); a fake Banks Association investment group (F103); a leak of
    Registrų centras records (F105). The UK NCSC now puts passkeys first (F111).

---
## A. When you have been scammed in Lithuania

**A1. Reporting to the police**
- F1. Online reports (epolicija.lt) are for non-urgent matters, including theft and fraud. For urgent police help, call 112. Anonymous reports are possible, but the police may want your identity if the report is incomplete. Photos or video can be attached. „Elektroniniu būdu pranešti galima apie visus skubios pagalbos nereikalaujančius pažeidimus." Source: https://klaipeda.policija.lrv.lt/lt/naujienos/klaipedos-apskrities-pareigunai-pranesimus-policijai-ragina-teikti-elektroniniu-budu/ Primary (police, 2021; old, but consistent with F2).
- F2. People who have already been defrauded report it to the police through epolicija.lt. An attempt that cost nothing goes to NKSC instead (form or email). „Jeigu jau nukentėjote nuo sukčiavimų – praneškite policijai per portalą epolicija.lt". The page does not mention 112; the campaign does (F96). Source: https://policija.lrv.lt/lt/naujienos/pranesk-apie-sukciavima/ (published 2026-02-05, updated 2026-04-23). Primary.
- F3. The police site is now policija.lrv.lt; policija.lt redirects there (302). Read 2026-10-24. Primary.
- F4. „Padėk ragelį" tells people who suspect a fake officer to call 112. After a scam: stop contact, save the correspondence, contact law enforcement, and tell the bank if you gave bank data. Source: https://padekrageli.lrt.lt Primary (a campaign by LRT, the police, the Banks Association and Lietuvos paštas).
- F5. What to prepare for the police: **GAP.** No official police checklist was found. F4 (save the messages) and SEB's list (A2) come nearest. A search excerpt only (page not fetched) has the police saying „Išsaugokite įrodymus (sukčių kontaktus, ekrano kopijas)". Present it as a suggestion, not an official list.
- F96. The "Padėk ragelį" campaign launch (Lietuvos bankas with LRT, the police and the Banks Association, 2025-12-15): anyone who suspects fraud or has been defrauded should report it at once by calling 112. Police officers do not call people asking for personal data or login passwords. If a call or message brings shock, pressure or haste, end the conversation. Source: https://www.lb.lt/lt/naujienos/pradedama-kampanija-padek-rageli-raginama-nesuteikti-sukciams-progos Primary. Read by Opus 2026-10-25. With F2: 112 while it is happening or urgent, epolicija.lt for the report after (M).

**A2. What the banks say to do first**
- F6. Every bank page read gives the same first steps: block the card, and block online-banking access if you gave login data; then tell the bank, then the police. Blocking does not undo payments already made.
- F7. **SEB:** contact the bank as soon as you can; report transactions you did not make; note what data you gave and whether you installed a program the fraudsters asked for; report to the police too. Block in the app (Cards, Card, Blocking), in the internet bank, or by phone, which SEB says is 24/7. Sources: https://www.seb.lt/en/infohub/financial-scam-traps-how-protect-yourself (no date) and https://www.seb.lt/en/private/payment-cards ("by calling SEB Bank at ... (24/7)"). Primary. SEB's scam page itself lists only weekday hours, so cite the cards page for 24/7.
- F8. **Swedbank:** „Susisiekite su mumis visą parą telefonu" if you see suspicious operations or someone else has access. „Užblokuokite kortelę – tai atliksite „Swedbank" programėlėje arba interneto banke." Source: https://www.swedbank.lt/private/d2d/ebanking/secureBanking?language=LIT Primary.
- F9. **Citadele:** a footnote on the contacts page marks password reset and blocking for the internet bank, and card blocking (as the tool read it), as 24/7. The app's button is „Užblokuoti kortelę". Source: https://www.citadele.lt/lt/contacts/ Primary, partly read. A search excerpt suggested the footnote may sit under the Riga head office, so check it before writing "Citadele LT 24/7".
- F10. **Luminor:** block in the mobile bank (Cards, Card status, switch Active off), in the internet bank, or by phone. The Mobile Bank FAQ lists card blocking as 24/7/365. Seen only in a search excerpt of https://www.luminor.lt/en/private/mobile-bank-frequently-asked-questions (the fetch failed). Luminor also warns that fraudsters have usually moved the money before a card is blocked (https://www.luminor.lt/lt/naujienos/jei-sukciams-perdavete-prisijungimo-duomenis-ir-patvirtinote-operacijas, search excerpt).
- F11. **Artea:** block in the app, in the internet bank, at a branch or by phone. Excerpts say the phone route works around the clock, with written confirmation within 7 working days. Source: https://www.artea.lt/lt/apie/naudinga/korteles-blokavimas (fetch blocked, 403; excerpt only). An older page still shows the former Šiaulių bankas short number, so do not use it.
- F12. **Revolut:** freeze the card in the app, report the transaction in the app (Get help), and contact support in the app's chat. The Lithuanian contact page names an automated card-blocking line that never reaches an operator. Whether the chat is 24/7 is unconfirmed. Sources: help.revolut.com, "my card has been used fraudulently", and https://www.revolut.com/lt-LT/contact-us/ (both 403 on fetch; search excerpts only).
- F13. The Bank of Lithuania: contact your bank through its official app or site, never through details the caller gave you; never give login codes. Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-padaugejus-sukciavimu-gyventojai-raginami-su-niekuo-nesidalinti-savo-el-bankininkystes-duomenimis (2021-07-09). Primary.

**A3. Recovery scams**
- F14. Lietuvos bankas: scammers who already have a victim's details often pose as staff of a law firm and ask a fee of 10 to 50% to "recover" the money. „Nesusiviliokite tokiais pasiūlymais, nes būsite apgauti dar kartą." Mastercard and Visa chargebacks do not cover investment losses. Source: https://www.lb.lt/lt/investavimas-kaip-atpazinti-sukcius (updated 2024-10-28). Primary.
- F15. Lietuvos bankas, 2020-02-12: "rescuers" who offer to get money back for a fee are another fraud. „Jokiu būdu jais negalima pasitikėti ir juo labiau mokėti jiems pinigus" (Audrius Šilgalis, head of its investment-services supervision). They usually know the person's investment history and the sums lost, and ask a fee, most often a percentage of the sum invested; „sumokėjęs sukčiui, žmogus ne tik neatgaus prarastų lėšų, bet bus apgautas dar kartą ir dar labiau padidins savo nuostolius." The article does not say how they make contact or whom they pose as. Re-read by Opus 2026-10-31 for B18. Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-saugokites-gelbetoju-ir-venkite-netikru-el-parduotuviu Primary.
- F16. Lietuvos bankų asociacija (2022-10-27): weeks later, callers pose as "institutions" investigating the scam network and offer to recover the money for a fee. „Nukentėjusieji gali būti apgauti antrą kartą". Source: https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/investiciniai-sukciai-apgauna-zadedami-garantuota-pelna-be-rizikos Primary (an industry body). atpazinksukciu.lt says the same (undated).

**A4. Where to report phishing**
- F17. **A scam website** (a fake bank, a fake institution): NKSC's form „Pranešti apie svetainę". It asks for the URL (required), your email, the phone number that sent it, and free text. Source: https://www.nksc.lt/pranesti-svetaine.html Primary.
- F18. **A fake or threatening call or SMS:** NKSC's form „Pranešti apie žinutę / skambutį". NKSC passes it to RRT and does not assess it itself. Fields: the calling number (required), date and time (required), who they pretended to be, a short description, optional files. Source: https://www.nksc.lt/pranesti-zinute.html Primary.
- F19. Fraud victims go to the police, not to NKSC: „Asmenys nukentėję nuo sukčiavimo veiklos turėtų kreiptis į Lietuvos policiją". Faulty or undelivered goods go to the police or to the consumer-rights authority (VVTAT, vvtat.lrv.lt). Source: https://www.nksc.lt/pranesti.html Primary.
- F20. RRT (2026-08-10): report suspicious messages and links to NKSC. If you shared data, confirmed a payment or sent money, go to your bank and the police („kreiptis į savo banką ir policiją"). Source: https://rrt.lt/naujienos/rrt-apgaulingu-skambuciu-ir-sms-mazeja-taciau-sukciai-aktyviai-naudojasi-bendravimo-programelemis Primary.
- F21. NKSC runs a free „DNS užkarda" that blocks known harmful sites. Faster reports put a fraud site on the blocklist sooner (2023-11-08). Source: https://www.nksc.lt/naujienos/nksc_nuo_internetiniu_sukciu_kasdien_apsaugo_mazda.html Primary.
- F22. Banks also take reports (Luminor, Artea; Revolut's help centre has a page on reporting a suspicious call, email, link or text). Not verified in full, so leave it off the pages for now.

---
## B. Scams in Lithuania now

**B5. Fake bank employee, fake police, "safe account"**
- F23. „Padėk ragelį" describes five schemes: romance; investment promises; fake officers (police, bank, mobile operator, other institutions); the "call from the bank" (suspicious operations on your account); and the fake parcel. Source: https://padekrageli.lrt.lt with its pages /netikri-pareigunai and /skambutis-is-banko. Primary.
- F24. Phrases the campaign quotes. From the bank: „paskyra bus užblokuota", „būtina patvirtinti", „įtartinos operacijos iš tavo sąskaitos". From the marketplace: „atvažiuos kurjeris ir sumokės už prekę, reikia tik užpildyti anketą". Same source. Primary.
- F25. Rules of thumb from the campaign: officers do not ask for your personal code, banking passwords or card data by phone, so ask for their service ID; bank staff do not send links or hurry you, so end the call and open the official app. Same source. Primary. Good Lithuanian is no longer a tell: callers now speak it without an accent (F97).
- F26. The Bank of Lithuania (2021-07-09): payment providers never ask for login credentials. Ignore urgent calls, SMS or emails asking you to „atsisiųsti ataskaitą" or „paspausti ant siunčiamos nuorodos". Do only operations you started yourself, in the official app. Setting lower daily limits in advance is suggested. Source: the F13 URL. Primary.
- F27. atpazinksukciu.lt (the Banks Association, undated) lists „sukčiai, apsimetantys banku" and „apsimetantys teisėsauga" among its types: never give login data or allow screen sharing. Source: https://atpazinksukciu.lt Primary (an industry body).
- F28. „Saugi sąskaita" ("safe account"): **GAP.** No official Lithuanian page read uses the phrase, and „Padėk ragelį" has no such scheme. Only press reports of July 2026 police cases turned up (secondary, not fetched). Do not present it as an official term.
- F97. The Banks Association (2026-03-16): scammers now speak correct Lithuanian with no accent, use live translation, clone a voice from a clear recording of only some ten-odd seconds, and appear on video as avatar "officers". It says neither picture nor sound is proof of reality any more. At the least suspicion, end the call and check through official channels. Banks stopped over €38m of suspicious payments in 2025, and the share of attempted money protected rose from 33% to 68%. Source: https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/sukciai-vis-dazniau-kalba-taisyklinga-lietuviu-kalba-paaiskino-kas-pasikeite Primary (an industry body). Read by Opus 2026-10-25.
- F106. A call in a relative's voice (LRT, 2026-07-29): a Vilnius man got a call that showed his sister's photo, name and number, in what seemed her voice; he called her back and she had not called. No money was lost. The article does not say the voice was AI-made. The police: at the least doubt about who is speaking, end the call and reach the relative another way. Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2985209/vilnieti-nustebino-artimojo-skambutis-paaiskejo-kad-balsa-pavoge-sukciai Secondary (press). Read by Opus 2026-10-25.
- F29. Police videos „Netikri pareigūnai – padėk ragelį" (updated 2025-12-15), „Skambutis iš banko" and „Investiciniai pažadai". Only the titles were read. Source: https://policija.lrv.lt/lt/video-galerija/netikri-pareigunai-padek-rageli-df3X Primary, thin.

**B6. Smart-ID and Mobile-ID**
- F30. Smart-ID says it never asks for PIN codes. Scammers may say "we only need the last 2 digits", or ask for them backwards. Never confirm a transaction you did not start, "not even to 'test'". Source: https://www.smart-id.com/security/scams/ (no date). Primary.
- F31. PIN1 logs you in; PIN2 confirms transactions and signatures. "Never, ever enter your PIN-codes anywhere but the app." Source: https://www.smart-id.com/security/smart-id-and-pin-codes/ Primary.
- F32. A PIN prompt you did not start: do not enter the PIN, press Cancel. Before entering a PIN, check that the security code and the text of the action match what you started. Some providers use a three-code check. Source: https://www.smart-id.com/help/faq/pin-codes/smart-id-asks-for-a-pin-code-without-you-initiating-the-authorisation/ Primary.
- F33. SK ID Solutions does not make robocalls and does not use WhatsApp, and renewal happens only in the app. Source: the F30 URL. Primary.
- F34. **Smart-ID+** (LRT, 2026-02-25, about 1.8 million users in Lithuania): at login the app no longer asks for the personal code or for comparing control codes. You scan a moving QR code on the computer, or the app opens by itself on the same phone, then confirm with PIN1. The roll-out is staged because each service must be ready, so the old method still works for now. „Naujausioje jos versijoje nebelieka asmens kodo naudojimo ir kontrolinių kodų lyginimo." Source: https://www.lrt.lt/naujienos/verslas/4/2850312/1-8-mln-vartotoju-lietuvoje-turinti-smart-id-pristato-nauja-programeles-versija Secondary (press). Primary pages: https://www.smart-id.com/smart-id-plus/ (the anti-phishing claims, no launch date) and https://www.smart-id.com/help/faq/smart-id-new-features/how-does-the-new-smart-id-protect-me-from-fraud/
- F35. Smart-ID on QR codes: "your confirmation is the key security step". Scan only codes from services you trust, and check that the service name and action shown in the app match. Source: https://www.smart-id.com/help/faq/smart-id-new-features/can-someone-scam-me-using-a-qr-code-2/ Primary. Lithuanian version, read 2026-11-01 (`q-smartid-qr-lt`, undated): „jūsų patvirtinimas yra pagrindinis saugumo žingsnis"; „Skenuokite QR kodus tik patikimuose tinklalapiuose ar paslaugose"; „Visada patikrinkite paslaugos pavadinimą ir veiksmų aprašymą, rodomą Smart-ID programėlėje"; „Jei kažkas atrodo neįprasta arba nesuprantama, atšaukite užklausą". https://www.smart-id.com/lt/help/faq/smart-id-naujos-funkcijos/ar-kas-nors-gali-sukciauti-naudodamas-qr-koda/
- F36. Mobile-ID: **GAP.** No Lithuanian official scam warning was found.
- F37. No Smart-ID feature that detects or warns during a call was found in 2026.

**B7. Caller-ID spoofing**
- F38. RRT (2023-10-20): from 1 November, operators must block calls from abroad that use Lithuanian fixed-line numbers, and calls from unallocated numbers. The year is not on the page; 2023 is inferred from the article's date. Source: https://rrt.lt/naujienos/rrt-apzvelge-kaip-sekasi-kurti-kibernetini-skyda-nuo-telefoniniu-sukciu Primary.
- F39. RRT (2026-08-10): in the second quarter of 2026, operators blocked 2.78 million calls (down about 80% from the first quarter) and 1.22 million scam SMS (down 42.1%). Scammers now call from random foreign numbers that operators cannot identify, and use RCS, Viber, WhatsApp and Messenger, which operators cannot block. Advice: do not answer; block and report in the app. Source: the F20 URL. Primary.
- F40. Whether spoofed Lithuanian *mobile* numbers from abroad are also blocked: not confirmed. The RRT article speaks only of fixed-line numbers.

**B8. Messenger takeover**
- F41. NKSC, 2026-07-13, with AOTD and VSD: takeover attempts are rising against Signal, WhatsApp and Telegram. Phishing is the most common method: the attacker poses as support or an acquaintance and presses for SMS codes, the app's PIN or login data. Signal „niekada nesikreipia į naudotojus žinutėmis ir neprašo pateikti autentifikavimo kodų ar PIN kodo". NKSC found no technical flaw in Signal that allows takeover. Source: https://nksc.lrv.lt/lt/naujienos/daugeja-bandymu-perimti-susirasinejimo-programeliu-paskyras-ekspertai-pataria-kaip-apsisaugoti-cRO/ Primary.
- F42. NKSC's advice there: never reveal „SMS patvirtinimo kodų, programėlės PIN kodo, paskyros atkūrimo raktų"; be careful with QR codes; check linked devices regularly; turn on Signal's Registration Lock; install updates; use „daugiaveiksnis autentifikavimas". Same source. Primary. The fuller PDF linked from the page was not read.
- F43. **WhatsApp, someone else has your account** (WhatsApp Help Center, „How to recover a compromised account", undated): tap Log back in and enter the 6-digit code that comes by SMS or call; "all devices logged into your WhatsApp account are automatically logged out" when you re-register with it. "Changing your password won't remove someone else from your account." If a two-step PIN you do not know is asked for, wait 7 days and try again. "you should notify family and friends as this person could impersonate you in chats and groups." Then turn on the security features and review linked devices. "We recommend trying to recover your account before reporting it" (a reported account may be banned). Source: https://faq.whatsapp.com/1131652977717250 Primary. Read whole by Opus 2026-10-25 in a browser (the plain fetch returns HTTP 400).

**B9. One line each**
- F44. **Courier SMS** (Lietuvos paštas, 2022-06-14): fake LP EXPRESS emails or SMS ask for a "fee" of 2 to nearly 10 euros through a link to a card form. Real messages never carry a direct payment link or ask for card data. Source: https://www.post.lt/lt/apie-mus/naujienos/lietuvos-pastas-ispeja-prisidenge-lp-express-vardu-sukciai-isvilioja-pinigus-ir Primary.
- F45. **Omniva:** fake emails and SMS ask for a customs fee, or offer a link to get a "parcel PIN". Omniva never asks for card data. Its official domains are omniva.ee, omniva.lv and omniva.lt. Sources: https://www.omniva.lt/naujienos/bukite-atidus-prisidengdami-omniva-vardu-sukciai-siuncia-apgaulingus-laiskus/ (2025-08-30, read whole by Opus 2026-10-31: „Omniva" niekada neprašo klientų kredito kortelių duomenų!"; report a suspicious campaign to its customer service centre; its banner warns that callers in its name ask for the personal code) and https://www.omniva.lt/pagalba/as-susiduriau-su-sukciais (undated). Primary.
- F46. **DPD Lietuva:** report a link you received to DPD and to the police information line. Source: https://www.dpd.com/lt/lt/faq/ka-daryti-jeigu-su-manimi-susisieke-sukciai-ir-atsiunte-kenkejiskos-svetaines-nuoroda/ (undated). Primary.
- F47. **Sodra** (2025-11-07) sends no email or SMS that asks you to press a link, enter bank or e-signature data, give card details or confirm something urgently. Its web address ends in .lt and its mail in @sodra.lt, and every real message also appears in your Sodra account. Staff never ask for your personal code by phone. Source: https://sodra.lt/naujienos/sukciai-gali-taikytis-laiskais-ir-sms-zinutemis-sodros-vardu-ka-daryti Primary.
- F48. **VMI** sends no SMS with extra links, and the sender name "VMI" can be faked. Real refunds go through „Mano VMI" (form FR0781), and an overpaid income tax is paid automatically to the bank account in the declaration. Source: https://www.vmi.lt/evmi/gavau-itartina-pranesima-is-vmi (fetch 403; wording from a search excerpt; undated). Primary, partly read.
- F49. **The marketplace "buyer":** „Padėk ragelį" shows the "the courier will pay, just fill in a form" script. A real buyer needs only your account number and name, never card data. Source: the F23 URL. Primary.
- F50. **Investment scams with famous faces:** Lietuvos bankas warns of fake ads that use „garsius pramogų pasaulio veidus, žinomus valstybės institucijų vadovus" and imitate news portals. The page does not say "deepfake" or „dirbtinis intelektas". Source: the F14 URL (2024-10-28). Primary. The Banks Association (F97) names cloned voices and avatar video in calls, but not in ads. An official source naming deepfake ads: **GAP**. F748 (Debunk.org, an NGO, via Swedbank, 2026-01-22) names AI-made videos with famous Lithuanian faces; it is not an official source.
- F118. **Checking an investment firm at Lietuvos bankas.** Its register „Finansų rinkos dalyviai" lists each licensed participant with its type (for example „LR licencijuota finansų maklerio įmonė"), at https://www.lb.lt/lt/finansu-rinku-dalyviai. Its page „Perspėjimai ir naudinga informacija vartotojams" (updated 2026-03-27) carries the warnings to investors about investment and crypto-asset services and the list of blocked websites that offer illegal financial services. Sources: those two pages, https://www.lb.lt/lt/naudinga-informacija-vartotojams Primary. Read by Opus 2026-10-25. A blocked-site list is not a list of every scam, so a firm missing from it proves nothing; only the register shows a licence.
- F51. **Remote access:** the Banks Association says the programs scammers ask you to install are often for remote access („nuotolinio prisijungimo prie kito kompiuterio"), and that scammers may ask to log in to e-banking "together". Source: the F16 URL (2022-10-27). Primary (an industry body). No program is named.
- F117. **After installing software on someone's instructions** (NCSC UK, „Phishing scams: If you've shared sensitive information", published 2021-11-26, reviewed 2022-09-05): "Open your antivirus (AV) software if you have it, and run a full scan." For banking details: "Contact your bank and let them know." For a password given out: change it on every account that uses it. Source: https://www.ncsc.gov.uk/collection/phishing-scams/what-to-do Primary. Read by Opus 2026-10-25. It says nothing about disconnecting or uninstalling; F305 does.
- F52. **Practice elsewhere:** kam.lt/nespausiu, a Lithuanian simulator run by the Ministry of National Defence with NKSC (https://kam.lt/nespausiu). The free course „Atsparumas finansiniam sukčiavimui" (NKSC, Lietuvos bankas and the AML centre, five modules) is at mokymai.nksc.lt (the F108 URL, 2026-07-07). Primary. Read by Opus 2026-10-25.
- F53. **Context:** NKSC counted 1,172 incidents from January to September 2026, against 2,451 a year earlier; fraud 354, against 1,223. „Mažesnis užregistruotų kibernetinių incidentų skaičius nereiškia, kad grėsmės išnyko." Source: https://www.nksc.lt/naujienos/nksc_ivardijo_dazniausias_kibernetines_gr_0507db5d.html (2026-10-14). Primary. Fewer incidents is not less money lost: F107 to F110.
- F100. **DPD parcel SMS** (LRT, 2026-07-02): mass SMS say a parcel is held at a terminal. DPD: tracking or delivering a parcel never needs card data, and do not press the link by reflex. Report to DPD, to the police (epolicija.lt or 112) and to cert@nksc.lt. RRT counted 5.73 million scam SMS blocked in 2025, a quarter more than in 2024. Re-read by Opus 2026-10-31: check DPD's parcel-tracking app first (no parcel there means „ko gero, susidūrėte su sukčiais"); official DPD pages always end in „dpd.lt", „dpd.com" or „dpdgroup.com"; DPD does not collect payments for goods private people sell; report to kas@dpd.lt. Source: https://www.lrt.lt/naujienos/verslas/4/2978226/ispeja-gyventojus-sukciai-masiskai-siuncia-zinutes-apie-tariamai-sulaikytas-siuntas Secondary (press quoting DPD and RRT). Read by Opus 2026-10-25.
- F101. **Fake QR stickers on Vilnius parking meters** (LRT, 2026-07-10): they lead to a fake payment page. JUDU says its QR codes are only inside public transport; parking is paid in the official app or by SMS. Report stickers to JUDU. Source: https://www.lrt.lt/naujienos/eismas/7/2986164/judu-ispeja-apie-sukcius-nusitaike-i-vairuotojus Secondary (press quoting JUDU). Read by Opus 2026-10-25. Re-read 2026-11-01 (`q-judu`): JUDU's Jurgita Gaidienė, „JUDU niekada neprašo per QR kodą arba per SMS žinutes suvesti savo duomenis ar atlikti mokėjimą"; the codes are „įprastai" stuck „ant parkomatų"; in Vilnius parking is paid „tik oficialioje mobiliojoje programėlėje ar SMS žinute konkrečiu numeriu".
- F102. **A "Sodra letter" by courier** (LRT, 2026-10-20): Russian-speaking callers pose as Omniva couriers with a letter from Sodra and ask for the personal code. Sodra sends documents only through Lietuvos paštas or Samus, as registered letters. End the call, contact Sodra, report to the police. Source: https://www.lrt.lt/naujienos/verslas/4/3088195/sukciai-imituoja-ir-kurjerius-praso-asmens-duomenu-tariamai-sodros-siuntai-pristatyti Secondary (press quoting Sodra). Read by Opus 2026-10-25. See also F47.
- F103. **A fake Banks Association investment group** (LBA, 2026-10-08): a fake LBA Facebook profile invites people to a "free" WhatsApp group about stocks and ETFs. LBA runs no such groups and has reported it to Meta, the police and NKSC. Source: https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/ispejame-sukciai-prisidengia-asociacijos-vardu-ir-kviecia-jungtis-prie-investavimo-grupes Primary (an industry body). Read by Opus 2026-10-25.
- F104. **Pension money** (Lietuvos bankas, 2026-04-14): people now receiving second-pillar pension money are targets of investment fraud and of fake lawyers. „Didelės grąžos be rizikos nebūna." The page does **not** mention fake messages in the name of Sodra, pension funds or banks (the research agent said it did). Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-pensiju-lesos-gali-tapti-sukciu-taikiniu Primary. Read by Opus 2026-10-25.
- F105. **The Registrų centras leak** (LRT, 2026-05-23): over 600,000 records of the Real Estate and Legal Entities registers may have been copied; a pre-trial investigation is open, with damage of at least €111,000. VDAI warned that scammers may pose as Registrų centras, banks, the police, VMI or Sodra. Check only through official sources; do not press links in SMS or email. Source: https://www.lrt.lt/naujienos/verslas/4/2937073/nutekejus-registru-centro-duomenims-perspejama-apie-galimus-sukciavimo-atvejus Secondary (press). Read by Opus 2026-10-25.

**B10. Payments: the payee check and refunds**
- F98. **The payee-name check** (Lietuvos bankas): in force across the EU since 2025-10-09. Before a transfer the bank compares the name with the account number and shows one of four results: a full match, a near match, no match, or that the name cannot be checked. The payer decides whether to pay. If the check said full or near match and the money still went to someone else, the provider refunds. Providers send no SMS or email about the service. Source: https://www.lb.lt/lt/gavejo-tikrinimo-paslauga Primary. Read by Opus 2026-10-25. A scammer can give the real name of an account they control, so the check stops wrong and impostor names, not every fraud (M).
- F99. **EU refunds for impersonation scams, pending** (European Parliament, 2025-11-27): a provisional deal on the payment-services rules makes the provider refund a customer tricked by someone posing as bank staff, if the customer reported it to the police and told the provider. Platforms become liable to providers when they do not remove reported fraud content. It still needs formal adoption, so it is not law yet. Source: https://www.europarl.europa.eu/news/en/press-room/20251121IPR31540/payment-services-deal-more-protection-from-online-fraud-and-hidden-fees Primary. Read by Opus 2026-10-25.

**B11. Numbers**
- F107. **Lietuvos bankas's payment-fraud table** (thousand EUR; Lithuanian payment providers, non-residents included; unauthorised payments plus payers manipulated into paying; stopped payments excluded): 2024 H1 45,491; 2024 H2 42,019; 2025 H1 41,006; 2025 H2 35,273; 2026 H1 41,724. Source: https://www.lb.lt/lt/is-viso-sukciavimu-atliekant-mokejimus-negrynaisiais-pinigais Primary. Read by Opus 2026-10-25. The page shows two update dates (2026-09-11 and 2025-09-11); the 2026 H1 row is there either way.
- F108. **The AML centre, Q1 2026** (Lietuvos bankas, 2026-07-07): almost €11m attempted, almost €7m saved, about €4m lost; phishing over 40% of cases. Examples: €150,000 lost to a fake police officer and bank, €65,000 to an investment platform. Source: https://www.lb.lt/lt/naujienos/kaip-neatsidurti-sukciu-akivaruose-visuomenei-atveriamas-kursas-atsparumas-finansiniam-sukciavimui Primary. Read by Opus 2026-10-25.
- F109. **The AML centre, Q2 2026** (LRT/ELTA, 2026-08-01): over €13.1m attempted, €7.6m stopped, €5.4m transferred, nearly €5m real losses; 3,718 cases (14% more than Q1), of which 1,514 (about 41%) were SMS or email phishing. Businesses were about 5% of cases but over €3m of the losses. First half of 2026: 6,979 cases, 10.2% fewer than a year earlier. Source: https://www.lrt.lt/naujienos/lietuvoje/2/3008085/per-tris-menesius-sukciai-is-gyventoju-ir-imoniu-bande-isvilioti-13-1-mln-euru Secondary (press quoting the AML centre). Read by Opus 2026-10-25.
- F110. **NKSC's 2025 report** (LRT, 2026-05-26): threat level medium; residents lost about €20.5m to fraud, about €0.5m more than in 2024; €58.8m was attempted against financial-market participants and over half stopped. Its growth figures for blocked calls and SMS do not match RRT's (F100), so the scopes differ: quote no growth rate for blocked SMS. Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2941099/nksc-kibernetiniu-gresmiu-lygis-pernai-buvo-vidutinis-dauguma-sistemu-pazeidziamos Secondary (press on the NKSC report; the report itself not read). Read by Opus 2026-10-25.

**B12. Scams in VMI's name** (read by Opus on 2026-10-30, from the raw HTML of each page, after a
Sonnet research agent found them; vmi.lt itself answered a Cloudflare bot challenge, so every VMI
statement here is from a press reprint of a VMI release)
- F140. **VMI, 2026-08: scams in its name are up** (VMI release, reprinted by atviraklaipeda.lt on
  2026-08-27 and tv3.lt on 2026-08-28): residents now mostly receive a false notice of a supposed
  fine („tariamą baudą") that urges them to check it on a scam site. The head of VMI, Martynas
  Endrijaitis: „VMI niekada nesiunčia SMS žinučių, kuriose yra papildomos nuorodos ir nurodomos
  konkrečios mokesčių, permokų ar baudų sumos. Šią informaciją klientai gali rasti tik prisijungus
  prie Mano VMI sistemos". Check declarations, overpayments and amounts due yourself through the VMI
  website by logging in to Mano VMI or EDS; do not press links or enter personal data; when in doubt,
  write to VMI or phone it. Source: https://www.atviraklaipeda.lt/2026/08/27/vmi-sukciai-vel-suaktyvejo/
  Secondary (a portal reprinting VMI's release). Phoning is not mentioned.
- F141. **VMI, 2023-04: messages about overpayments and debts** (LRT, 2023-04-18, VMI's press
  release): scammers in VMI's name send false messages about tax overpayments and debts to obtain
  e-banking login data; some carry the person's name and personal code, or a fragment of it, taken
  „iš galimai nelegalių duomenų bazių". Inesa Gineitienė (VMI internal security): „VMI nesiunčia
  gyventojams pranešimų el. paštu ar SMS žinute su jų asmenine informacija, asmens kodu, mokėtinomis
  sumomis, raginimu susigrąžinti permoką". Check tax information yourself in Mano VMI through
  www.vmi.lt. Source: https://www.lrt.lt/naujienos/verslas/4/1964792/ispeja-gyventojus-prisidengdami-vmi-sukciai-siuncia-apgaulingas-nuorodas-neskubekite-ju-atidaryti
  Secondary (press reprinting VMI).
- F142. **VMI, 2025-04: fake VMI sites advertised in search** (alkas.lt, 2025-04-03, „Parengta pagal
  VMI pranešimą"): during the declaration period scammers build sites imitating VMI's systems and
  advertise them to appear among the first search results. Every VMI system's address ends in
  „.vmi.lt" (www.vmi.lt, deklaravimas.vmi.lt); VMI runs no advertising campaigns in search engines or
  social networks, so its sites are never marked „Remiamas" or „Skelbimas". Source:
  https://alkas.lt/2025/04/03/vmi-ispeja-sukciai-kuria-netikras-inspekcijos-svetaines Secondary.
- F143. **A phone call in VMI's name** (ELTA via respublika.lt, 2026-05-14, from the Vilnius county
  police): a man (born 1941) was phoned at home in Vilnius by strangers who spoke Russian and
  „prisistatė policijos pareigūnais bei VMI darbuotojais"; they obtained €50,000 and his bank card,
  then took €2,000 more from his account (€52,000 in all). Source:
  https://www.respublika.lt/lt/naujienos/lietuva/nusikaltimai_ir_nelaimes/sukciai-is-triju-zmoniu-isviliojo-1224-tukst-euru/
  Secondary (news agency reporting a police statement). No official count of VMI calls was found.
- F144. **An SMS in VMI's name** (diena.lt, 2026-09-15, from the Alytus police): a man (born 1962)
  received an SMS supposedly from VMI, opened its link and entered his bank details; €1,844 was taken
  from his account. Source:
  https://vilniaus.diena.lt/naujienos/vilnius/nusikaltimai-ir-nelaimes/sukciai-apsimeta-policininkais-ir-vmi-pasisavino-tukstancius-euru-1774876
  Secondary.
- F145. **A familiar number proves nothing** (NKSC, 2024-10-07): with number spoofing the caller's
  number is shown as another; calling it back reaches its real owner, who has nothing to do with the
  call; scammers can appear as a number from your contacts. „Jei kyla abejonių, nutraukite pokalbį ir
  paskambinkite atgal naudodami patikimą kontaktą." Source:
  https://www.nksc.lt/naujienos/kibernetinio_saugumo_spalis_kaip_atpazinti_program.html Primary.
- F146. **The declaration season** (LRT, 2026-05-06, citing VMI): over 1.5 million residents declared
  their 2025 income; almost 850,000 declared an income-tax overpayment; overpayments are returned by
  31 July. Source: https://www.lrt.lt/naujienos/verslas/4/2920147/pajamu-deklaravimas-baigesi-kai-kam-teko-susimoketi-ir-5-2-mln-euru-mokesciu
  Secondary (press citing VMI).
- **Not found** (2026-10-30): any VMI statement on whether it phones people or what it never asks
  for by phone; VMI's official account numbers. The pages must not say „VMI neskambina". vmi.lt's own
  „Gavau įtartiną pranešimą iš VMI" page (F48) is still unread behind the bot challenge; the VMI scenario was
  built without it on 2026-10-30 (the author's yes). Read it in a real browser when that page is next touched.

**B13. The marketplace "buyer" and the fake courier link** (read by Opus on 2026-10-30, from the raw HTML
of each page; found by a research agent the same day)
- F147. **The scheme, from the Bank of Lithuania** („Duomenų viliojimas", last updated 2024-10-25):
  messages in a courier company's name say a payment has arrived at a parcel locker for an item a
  supposed buyer wants; the seller's contact comes from a classifieds portal or a trading or swap
  platform; „Tam, kad lėšos patektų į vartotojo sąskaitą", the seller is asked to press a link in an SMS
  or a chat-app message and enter personal and card details on a fake courier site. Most also enter
  their Smart-ID PIN when requests arrive in the app. Source: https://www.lb.lt/lt/duomenu-viliojimas
  Primary.
- F148. **Card details are never used to pay money in** (Bank of Lithuania, „Kaip atpažinti
  sukčius", last updated 2025-12-11): „lėšų įskaitymui į sąskaitą niekada nėra naudojami jūsų mokėjimo
  kortelės duomenys". The same page lists buyers and sellers among the people scammers pose as.
  Source: https://www.lb.lt/lt/kaip-atpazinti-sukcius Primary.
- F149. **Vinted's own warning** (help article 628, undated): „Tau nereikia palikti Vinted, kad
  patvirtintum mokėjimą arba gautum užsakymą." Do not give your details in messages; Vinted's emails
  come from an address ending in @vinted.lt. If you were scammed or your details were taken, report it to
  Vinted („Susisiek su mumis"). Source: https://www.vinted.lt/help/628 Primary (the
  platform).
- F150. **Keep it on the platform** (Vinted help article 82, undated): „Neperkelk pokalbio už Vinted
  sistemos ribų" and be careful when another member tries to; pay by the secure method with the
  „Pirkti" button, which protects the purchase if the parcel is not delivered or is damaged. Source:
  https://www.vinted.lt/help/82 Primary (the platform).
- F151. **Skelbiu.lt, a fake "support" message** (TV3, 2025-07-05): a seller got a chat message from
  „skelbiu-supp0rt": „Su džiaugsmu pranešame, kad pirkėjas sėkmingai atliko mokėjimą už jūsų prekę per
  skelbiu platformą". The portal's head, Dovydas Mačiulis: Skelbiu.lt support never contacts customers
  through the chat and does not handle payment; „Dėl apmokėjimo visada tariasi tik pirkėjas ir
  pardavėjas." Source:
  https://www.tv3.lt/naujiena/naujienos/masiskai-plinta-nauja-sukciavimo-schema-populiariame-skelbimu-portale-butinai-pasidalinkite-su-artimaisiais-n1431143
  Secondary (press quoting the portal).
- F152. **DPD collects no money for private sellers** (TV3, 2026-07-02, DPD's release; the same wave
  as F100): DPD asks for no card details to track or deliver a parcel and „nerenka mokėjimų už
  privačių asmenų parduodamas prekes"; a message saying card details are needed „pinigams už parduotą
  prekę gauti" should raise suspicion; scam messages often create a sense of urgency. Official DPD addresses end in dpd.lt, dpd.com or dpdgroup.com.
  Source: https://www.tv3.lt/naujiena/verslas/dpd-perspeja-gave-tokia-zinute-nepadarykite-klaidos-n1533058
  Secondary (press release).
- F153. **The police's "Schema Nr. 1"** (Vilnius county police, 2022-06-14): a link tied to „Vinted",
  „DPD", „Skelbiu.lt", „LP Express" and others asks for the card number, expiry date and CVV; the
  scammers then pay for goods online with the card. Source:
  https://policija.lrv.lt/lt/naujienos/kriminalistai-ispeja-sukciavimu-nemazeja/ Primary.
- F154. **A seller in Klaipėda, €8,132** (TV3, 2024-03-19, from the police): a woman (born 1989)
  selling an item, „tariamo pirkėjo nurodymu neva kurjeriui užsakyti", pressed the link she was sent
  and entered the details asked for; €8,132 was taken from her bank account. Source:
  https://www.tv3.lt/naujiena/lietuva/paspaudus-sukciu-atsiusta-nuoroda-is-klaipediskes-saskaitos-dingo-8-1-tukst-euru-n1325552
  Secondary.
- F155. **A seller in Klaipėda, €290** (ve.lt, 2026-03-25, from the police): a woman selling an item
  she no longer needed got a message from an interested "buyer", „neva prekės pardavimui patvirtinti";
  she pressed the link and entered personal details and her online-banking login; €290 was taken.
  Source: https://ve.lt/kriminalai/paspaude-nuoroda-ir-suvede-prasomus-duomenis-pagalvoti-priverte-tik-dinge-eurai
  Secondary.
- **Not found** (2026-10-30): safety pages of Skelbiu.lt or Autoplius themselves; a Vinted line that
  it never asks for card details (only a 15min quote of 2022); Omniva or LP Express warnings aimed at
  sellers; a Lithuanian source for the "insurance fee" variant; any count of this scam. The research
  agent's Ukmergė case (a Vinted buyer, TV3 2026-10-09) and Venipak (a police paraphrase, 2024-11-27)
  were not re-read and are not used.

**B14. A friend's hijacked Facebook account asks for money or a code** (read by Opus on 2026-10-30:
the press pages from their raw HTML, Facebook's help pages rendered in a headless browser; found by a
research agent the same day)
- F156. **The police's signs** (Policijos virtualusis patrulis, via tv3.lt, 2024-01-20; the same text
  in Mūsų Laikas, 2024-01-15): „iš pavogtų anketų sukčiai rašo draugams ir prašo paskolinti pinigų". The
  signs it lists: the request is urgent and unusual (its example: a friend who never borrowed suddenly
  asks for 1000 euros), vague („nepaprastai situacijai"), in unusually poor language, and from an unusual
  place (the friend is suddenly in Thailand). „Jeigu gavai tokį prašymą, visada pasitikrink ar tikrai rašo
  tavo draugas, paskambink jam ar parašyk trumpąją žinutę". Source:
  https://www.tv3.lt/naujiena/lietuva/siukstu-to-nedarykite-jei-gavote-nuo-draugo-sias-zinutes-policija-ispeja-kas-uz-to-slepiasi-n1283669
  Secondary (press relaying the police).
- F157. **Number, code, then a "prize"** (Policijos virtualus patrulis, via rinkosaikste.lt, 2025-06-17):
  a message from an acquaintance asks „Ar gali atsiųsti savo telefono numerį?", then for an SMS code, then
  promises a prize („Sveikiname, laimėjote 1200 €! Atsiųsiu nuorodą, kad atsiimtum."). „Sukčiai perima
  žmonių „Facebook“ paskyras, prisistato kaip draugai ar šeimos nariai", after the phone number, the SMS
  code and finally bank logins. Advice: „Nesidalinkite savo telefono numeriu ir jokiais kodais per
  socialinius tinklus"; never enter bank logins in unclear links; call the person to check; report the
  account to Facebook; warn older relatives. Source:
  https://rinkosaikste.lt/sukciu-pinkles-facebook-paskyrose-ispeja-apie-pavoju/ Secondary.
- F158. **The code is the last link of the chain** (RRT, via tv3.lt, 2024-10-15): „Pastebėjome, kad daug
  žmonių dalijasi panašaus pobūdžio žinutėmis, kurias gavo iš savo draugų." Facebook really does let you
  ask friends for help, „Tačiau paskutinė šios sukčiavimo grandinėlės žinutė – perduoti savo prisijungimo
  kodą." Contact friends directly to check; use strong passwords and two-factor authentication. Source:
  https://www.tv3.lt/naujiena/naujienos/masiskai-plinta-klastinga-sukciu-afera-lietuvoje-gyventojai-raginami-buti-atsargus-n1371008
  Secondary (press relaying RRT).
- F159. **A case** (LRT, 2023-07-14): a woman's account sent friends „Labas, gal gali truputį pagelbėt?",
  asking to name them for help because the code „neatsiunčia"; her password and phone number had been
  changed; several friends „žinute gautą kodą nusiuntė sukčiams", and their own accounts were then
  targeted. The expert Marius Pareščius: „Man žinomi atvejai, kai yra nulaužiamos paskyros ir rašoma
  draugams prašant pinigų". No amount is given. The woman is unnamed and spoke to LRT RADIJAS; the
  page cites it under §6.7 as her own account to the national broadcaster, not as a police case. Source:
  https://www.lrt.lt/naujienos/mokslas-ir-it/11/2030981/pasipelnyti-norintys-sukciai-vis-dazniau-greziasi-i-socialinius-tinklus-is-nulauztu-paskyru-siuntineja-zinutes-su-prasymais-padeti
  Secondary.
- F160. **Facebook: what to do if your account was hacked** (Facebook help, Lithuanian, undated):
  „Jei į jūsų „Facebook“ paskyrą buvo įsilaužta, rekomenduojame apsilankyti adresu www.facebook.com/hacked.
  Jeigu galite, pasinaudokite įrenginiu, kurį anksčiau naudojote jungdamiesi prie „Facebook“." Signs: a
  changed profile picture; posts, comments or messages you did not write; an email saying your email
  address or phone number was added or removed or your password changed. A changed email address can be
  undone with the link sent to the old address. In „Kur esate prisijungę", log out a device you do not
  know. Source: https://lt-lt.facebook.com/help/203305893040179 Primary (the platform).
- F161. **Facebook's two-step login** (Facebook help, Lithuanian, undated): with two-factor
  authentication on, a special login code or a confirmation is asked for whenever someone tries to log in
  from an unrecognised browser or device; the methods are a security key, an authenticator app's codes, or
  SMS codes; you can also get alerts about unrecognised logins. It is turned on in Paskyrų centras →
  Slaptažodis ir sauga → Dviejų veiksnių autentifikavimas. Source: https://lt-lt.facebook.com/help/148233965247823
  Primary (the platform).
- **Not found** (2026-10-30): a policija.lrv.lt, NKSC or LBA page on this scam (only the police's
  Virtualus patrulis as relayed by the press); a Lithuanian police report of a case with a town, date and
  amount; any count; what exactly the SMS code unlocks in the "prize" variant (no source says carrier
  billing or Smart-ID); a „balsuok už mane" link variant. Not used: tv3.lt 2023-08-24 (a Facebook group
  post, not an official warning), FM99 2023-11-11 (an expert on radio, read only as a summary), the NKSC
  Facebook bulletin of 2018 (not fetched), and Meta's English policy pages (client-rendered; the
  Lithuanian help pages say the same).

**B15. The couriers' own words** (read by Opus on 2026-10-31, from the raw HTML of each page; found by
a Sonnet research agent the same night; extends F44, F45 and F100 for `/scenarijai/zinute-su-nuoroda/`)

- F162. **Lietuvos paštas, the newest warning** (post.lt, 2025-10-28): scam SMS say a parcel is held or
  the address is wrong and threaten its return; the links lead to fake pages asking for card data, the
  personal code or other details; they come from „atsitiktinai sugeneruotais telefono numeriais".
  „tikruose Lietuvos pašto arba LP EXPRESS vardu siunčiamuose pranešimuose gavėjai nemato siuntimo
  numerio. Vietoje numerio gavėju nurodomas LPASTAS arba LP_EXPRESS." „Lietuvos paštas SMS žinutėse
  niekada neprašo klientų suvesti ar patikslinti banko kortelių ar asmens duomenų. Taip pat SMS žinutėse
  nebūna nuorodų į tiesioginius mokėjimus. Už Lietuvos pašto paslaugas galima atsiskaityti tik prisijungus
  prie oficialios savitarnos svetainės ir naudojantis elektronine bankininkyste." Report a suspicious
  message to prevencija@post.lt. The same page carries post.lt's customs-declaration form, where a real
  2 € parcel administration fee and import taxes are paid „užsiregistravus savitarnoje (www.lpexpress.lt)":
  real fees exist, and they are paid in the self-service. Source:
  https://www.post.lt/lt/apie-mus/naujienos/bukite-atsargus-lietuvos-pastu-apsimetantys-sukciai-gviesiasi-pinigu-ir-duomenu
  Primary.
- F163. **DPD: how to recognise the scam** (DPD Lietuva FAQ, undated): the signs it lists are contact
  through chat apps (Viber, WhatsApp, Messenger) about an item you sell; a link to a forged page asking
  for the card number „kad tariamai pervestų pardavėjui lėšas"; an address without „dpd.lt", „dpd.com"
  or „dpdgroup.com"; „Daug gramatinių ir stilistikos klaidų"; „iškraipytas arba senasis DPD logotipas".
  Source: https://www.dpd.com/lt/lt/faq/kaip-atpazinti-sukciavima/ Primary.
- **Not used** (2026-10-31): SmartPosti (2026-07-07) and Venipak (2024-05-02, Estonian site), read by the
  agent only; Omniva's duty-payment page of 2026-06-30 (Estonia's rules, minu.omniva.ee); DHL (its pages
  timed out). **Not found:** Omniva's SMS sender name in Lithuania; a Lithuanian Omniva or DPD sentence
  saying it never sends a payment link; any 2026 fraud notice from Lietuvos paštas.

**B16. „Confirm it in Smart-ID"** (read by Opus on 2026-10-31, from the raw HTML of each page; found by
Opus and a Sonnet research agent the same day; extends F30–F35 with Smart-ID's own Lithuanian pages, for
`/scenarijai/smart-id-patvirtinimas/`)

- F164. **Smart-ID's Lithuanian scam guide** (smart-id.com/lt, published 2020-12-07): „„Smart-ID" ir kiti
  patikimi paslaugų teikėjai NIEKADA neprašo jūsų įvesti PIN kodų. Dėl jokių priežasčių." Scammers may
  even say „PIN kodai niekada neturėtų būti atskleisti telefonu", „mums reikia TIK 2 paskutinių
  skaitmenų", or ask for the PINs backwards. „Niekada netvirtinkite PIN kodo užklausų, kurių nepateikėte,
  kad „išbandytumėte" ar „pamatytumėte, kas bus", kai banko sąskaita bus tuščia. Atminkite, kad esate
  teisiškai atsakingi už visus veiksmus, atliktus naudojant jūsų PIN kodus!" With access, fraudsters take
  „SMS paskolas jūsų vardu" and empty bank accounts. When in doubt, click no link: „atidarykite oficialią
  įmonės svetainę rankiniu būdu savo naršyklėje"; „internete labai lengva apsimesti kuo nors kitu". If someone may have access to your Smart-ID: contact
  the bank and the police; „Kreipkitės į „Smart-ID", jei jūsų programos PIN kodai pateko į kitų rankas
  arba vis sulaukiate PIN užklausų, kurių nepateikėte." The Lithuanian twin of F30. Source:
  https://www.smart-id.com/lt/sauga/sukciavimas-ir-virusai/ Primary.
- F165. **PIN1 and PIN2 in Smart-ID's words** (smart-id.com/lt, modified 2022-07-06): „PIN1 leidžia
  prisijungti prie elektroninių paslaugų ir internetinės bankininkystės"; „PIN2 reikalingas norint
  patvirtinti operacijas – banko pavedimus, pakeisti paslaugas, pasirašyti dokumentus ir pan." „Jei
  kažkas bandys prisijungti naudodamas jūsų naudotojo vardą, o jūs įvesite savo PIN kodą, jis gaus
  prieigą prie jūsų paskyros!" „Jūsų bankas, paslaugų teikėjai ar net valstybinės įstaigos NIEKADA jų
  neprašo", even if the caller knows your personal data or asks to test the PIN „saugumo sumetimais".
  Let no one, family included, start a transfer remotely; start it yourself on your own device. PINs
  cannot be changed: to get new ones, delete the Smart-ID account and create a new one. Source:
  https://www.smart-id.com/lt/sauga/pin-kodai/ Primary.
- F166. **A PIN request you did not start** (Smart-ID's Lithuanian FAQ, modified 2024-08-07): „Neveskite
  PIN kodo, jei nepateikėte užklausos!" Press „Atšaukti" (bottom left); every request also expires by
  itself after a few minutes. Before entering a PIN, check „ar saugos kodas ir veiklos aprašymas atitinka
  norimą atlikti veiksmą". Most such requests are someone's mistake, not an attack. The Lithuanian twin of
  F32. Source:
  https://www.smart-id.com/lt/pagalba/duk/pin-kodai/smart-id-praso-ivesti-pin-koda-neinicijavus-patvirtinimo-proceso/
  Primary.
- F167. **Smart-ID's standing notice** (shown on every smart-id.com/lt page read on 2026-10-31, undated):
  scammers pose as Smart-ID in SMS and emails with links to forged sites, to get personal data or have
  users „atnaujinti" their account; „paskyrą galima atnaujinti tik pačioje programėlėje"; „netvirtinkite
  operacijos, kurios patys neinicijavote!"; SK ID Solutions never uses robocalls, so hang up on one. The
  Lithuanian twin of F33. Source: the F164 URL (and every page above). Primary.
- F168. **Smart-ID+ in Lithuanian** (Smart-ID FAQ, modified 2026-01-14): Smart-ID+ no longer asks for the
  personal code on the website; the login is tied to the app by scanning a QR code or by the app opening
  on the same phone. „Tai gerokai apsunkina sukčių bandymus jus apgauti ir priversti patvirtinti kažką, ko
  patys nepradėjote." Each service adopts it on its own (F34), so the old flow still appears. Source:
  https://www.smart-id.com/lt/help/faq/smart-id-naujos-funkcijos/kaip-naujasis-smart-id-apsaugo-nuo-sukciavimo/
  Primary.
- F169. **The fake bank site, step by step** (15min from Vakarų ekspresas, 2026-04-24, quoting Klaipėda
  police and SEB): on 21 April 2026 a Klaipėda company's employee searched for the bank online, followed
  a link and entered his Smart-ID login details and codes; €39,000 left the company's account, and police
  opened a pre-trial investigation. SEB's prevention head Daiva Uosytė: fake bank sites copy the real
  content and are advertised among the first search results, but their address „visuomet skirsis".
  How it works: the scammer types the stolen details into the real bank site; the victim gets a real
  Smart-ID request saying he is logging in to the bank and so logs the scammer in, while the fake page
  shows a spinner; then the scammer starts a payment and the app shows the amount and the recipient and
  asks for PIN2. „jungiantis prie interneto banko reikia tik PIN1 kodo. Jei patvirtinimo lange matote
  pranešimą apie mokėjimo operaciją, tai reiškia, kad tvirtinate pinigų pervedimą." Source:
  https://www.15min.lt/verslas/naujiena/finansai/uz-neatsarguma-sumokejo-labai-brangiai-prisijunge-prie-suklastotos-internetines-banko-svetaines-662-2669470
  Secondary (press, quoting the police and SEB).
- F170. **A Lietuvos bankas decision: PIN2 entered, money not returned** (tv3.lt, 2026-04-12, on a
  de-personalised Luminor dispute): a seller on skelbiu.lt got a „buyer's" link to a page that looked
  like Omniva's „to receive the money", entered his bank login code, personal code and Smart-ID PIN1,
  and later „pats suvedė ir „Smart-ID" PIN2 kodą, taip patvirtindamas operacijas, nes manė, kad tai
  reikalinga pinigams gauti". Three payments, €6,920; the bank stopped €2,200, €4,720 was lost. Lietuvos
  bankas found the payments „iš esmės" unauthorised but „Toks elgesys buvo pripažintas dideliu
  neatsargumu", so the bank need not refund, and it rejected the claim. In the same article Luminor's Mindaugas
  Kutkaitis: „Jei nepavyksta įprasta seka prisijungti prie interneto banko, įtartinai dažnai reikia tvirtinti
  prisijungimą ar prašoma patvirtinti mokėjimo operaciją jungiantis – tai aiškus signalas, kad gali būti vykdoma
  neteisėta veikla". Source:
  https://www.tv3.lt/naujiena/verslas/paspaudes-sia-nuoroda-neteko-beveik-7-tukst-euru-ispeja-apie-dazna-klaida-n1510660
  Secondary (press, on a Lietuvos bankas decision; the decision itself not read).
- F171. **The call that asks you to confirm** (alkas.lt, 2026-10-28, with Luminor's fraud-prevention head
  Mindaugas Kutkaitis): it usually starts with a phone call from a „bank employee", investment adviser or
  tech support; the caller „gali aiškinti, kad patvirtinimas reikalingas sąskaitai apsaugoti arba
  įtartinam mokėjimui atšaukti", while the person is being talked into confirming a transfer to the
  criminal. „Svarbiausia taisyklė – niekada netvirtinti prisijungimų ar mokėjimų, kurių patys
  nepradėjote." If the caller asks to show the screen, log in to the bank or confirm an unclear action,
  end the call and contact the bank yourself. Source:
  https://alkas.lt/2026/10/28/sukciai-gali-isvilioti-pinigus-net-ir-nezinodami-jusu-slaptazodzio
  Secondary (press, quoting the bank).
- **Not used** (2026-10-31): Smart-ID's registration change of 1 October 2026 (smart-id.com/lt, 2026-09-11:
  no more registering with an ID card and card reader; it is about registration, not fraud); LRT/ELTA
  2020-06-23 („renew Smart-ID" SMS) and paninfo 2021-02-02 (Luminor), both old; LRT 2025-04-10 (a Vilnius
  man handed an acquaintance his phone and Smart-ID codes, €22,650: a handover, not this scam); 15min
  2020-01-30 (an older Lietuvos bankas view in the victim's favour, which F170 does not repeat); loss totals
  that do not single out Smart-ID. Read by the agent only. **Not found:** a policija.lrv.lt, LB, LBA or NKSC
  page naming PIN2; any count of Smart-ID cases; a Lithuanian case of a new Smart-ID account registered
  in a victim's name; a general Lietuvos bankas statement on refunds after PIN2 (only single decisions,
  PDFs the agent could not read).

---
## C. Passwords and accounts

**C10. NIST SP 800-63B-4**
- F54. It is final. CSRC lists "07/31/25: SP 800-63B-4 (Final)"; it supersedes SP 800-63B of 2020-03-02. Source: https://csrc.nist.gov/pubs/sp/800/63/b/4/final Primary. Press reports said August 2025, when the web edition is timestamped 26 Aug 2025; cite the CSRC date.
- F55. Length: a password used alone must be at least 15 characters; one used only as part of multi-factor login must be at least 8. Verifiers should allow at least 64. Source: https://pages.nist.gov/800-63-4/sp800-63b.html Primary.
- F56. "SHALL NOT impose other composition rules (e.g., requiring mixtures of different character types)". Same page. Primary.
- F57. "SHALL NOT require subscribers to change passwords periodically." A change is still required on evidence of compromise. Same page. Primary.
- F58. A new password is checked against a blocklist of "commonly used, expected, or compromised passwords". Same page. Primary.
- F59. Verifiers must allow password managers and autofill, and should allow pasting. Same page. Primary.

**C11. Passkeys**
- F60. **Why they resist phishing:** the browser and operating system tie a passkey to the right service, so the user does not have to judge whether the site is real. Source: https://passkeys.dev/docs/intro/what-are-passkeys/ Primary (the FIDO community's site). CISA: when a user is tricked onto a fake site, "the FIDO protocol will block the attempt" (https://www.cisa.gov/MFA, primary).
- F61. **Google's Lithuanian help:** „prieigos raktas". „Skirtingai nei slaptažodžių, prieigų raktų negalima bendrinti, kopijuoti, užrašyti ar netyčia perduoti kitam asmeniui... Todėl jie yra labiau apsaugoti nuo duomenų išviliojimo." Google's Lithuanian word for phishing is „duomenų išviliojimas". Source: https://support.google.com/accounts/answer/13548313?hl=lt Primary.
- F62. **Microsoft lt-lt:** „prieigos raktas". „Prieigos raktai yra atsparūs sukčiavimo apsimetant atakoms, nes jie priklauso nuo fizinio įrenginio turėjimo." Source: https://www.microsoft.com/lt-lt/security/business/security-101/what-is-passkey Primary.
- F63. **Apple:** the lt-lt page read had English body text, so no Lithuanian term is confirmed (**GAP**). Its English says passkeys are "highly phishing-resistant". Source: https://support.apple.com/lt-lt/102195 Primary.
- F111. **NCSC (UK), 2026-04-23:** "Passkeys should now be consumers' first choice of login across all digital services." Where a service has none: a password manager and two-step verification. Source: https://www.ncsc.gov.uk/news/ncsc-leave-passwords-in-the-past-passkeys-are-the-future Primary (UK national body). Read by Opus 2026-10-25.

**C12. SMS against an app or a key**
- F64. CISA: "The only widely available phishing-resistant authentication is FIDO/WebAuthn authentication." Source: https://www.cisa.gov/MFA Primary.
- F65. CISA's fact sheet "Implementing Phishing-Resistant MFA" defines a SIM swap as social engineering in which attackers persuade a carrier to move your number to their SIM. It lists SIM swap with phishing, push bombing and SS7 exploitation as attacks on weaker MFA. Source: https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf (search excerpt only). Primary, partly read.
- F66. CISA's mobile-communications guidance (v2.0, November 2025; written for highly targeted people): "SMS MFA is not phishing-resistant". Authenticator-app codes are better than SMS but can still be phished; only FIDO resists phishing. Some services fall back to SMS for recovery. Source: https://www.cisa.gov/sites/default/files/2025-12/guidance-mobile-communications-best-practices_508c.pdf (search excerpt). Primary, partly read.
- F67. NIST 800-63B-4 treats the phone network (SMS or voice) as a "restricted" authenticator: a service that offers it must offer an unrestricted alternative too. Before sending a code, verifiers should consider "device swap, SIM change, number porting". Source: the F55 URL. Primary.
- F68. NKSC says only "use multi-factor authentication" (2026-07-13) and "2FA/MFA on all accounts" (2025-06-20); it does not rank SMS against apps. Sources: the F41 URL and https://kam.lt/masinis-slaptazodziu-nutekejimas-nksc-pataria-kaip-apsaugoti-save-ir-savo-paskyras/ Primary.

**C13. Have I Been Pwned**
- F69. HIBP is a free site that shows whether an email address or account appeared in a data breach. Troy Hunt created it and has run it since 2013. Source: https://haveibeenpwned.com/About Primary.
- F70. Pwned Passwords uses k-anonymity: only the first 5 characters of the password's SHA-1 hash are sent. The service returns every hash with that prefix, and your side looks for its own. Source: https://haveibeenpwned.com/API/v3#PwnedPasswords Primary.
- F71. NKSC points people to it (2025-06-20): „patikrinti, ar jūsų el. pašto adresas buvo nutekintas, pavyzdžiui, naudojantis svetaine haveibeenpwned.com". Where a password was reused, change it on the key accounts first. Use unique passwords kept in „patikimuose slaptažodžių valdymo įrankiuose", with 2FA/MFA. Source: the kam.lt URL in F68. Primary.

**C14. The term for a password manager**
- F72. Google's Lithuanian help: „„Google" slaptažodžių tvarkyklė", which stores passwords and passkeys. Source: https://support.google.com/accounts/answer/6208650?hl=lt Primary.
- F73. NKSC says „slaptažodžių valdymo įrankiai" (F71). Bitwarden's own Lithuanian files: F90 (its word for the product itself was not looked up).

**C15. Why the email account comes first**
- F83. NCSC (UK), "Use a strong and separate password for your email" (published 2018-12-17, reviewed 2021-12-21): a criminal who gets into your email could "reset all your other account passwords (and get access to all your other online accounts)". Source: https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/use-a-strong-and-separate-password-for-email Primary (UK national body). Read by Opus 2026-10-24.
- F84. **Bitwarden, what it is:** a password manager from Bitwarden, Inc., "headquartered in Santa Barbara, California", "Founded in 2016", which describes "a transparent, open source approach to password management". Source: https://bitwarden.com/about/ Primary (maker). Read by Opus 2026-10-24.
- F85. **Bitwarden, licence:** the apps' repository says its code is under "the GNU General Public License (GPL) v3.0" by default, and "Bitwarden Licensed code is found only in the /bitwarden_license directory". Source: https://github.com/bitwarden/clients/blob/main/LICENSE.txt Primary (maker's repository). Read by Opus 2026-10-24.
- F86. **Bitwarden, platforms:** browser extensions (Edge, Chrome, Safari, Firefox, Opera, DuckDuckGo, Vivaldi, Brave, Tor), desktop apps for Windows, macOS and Linux, mobile apps on the App Store, Google Play and F-Droid, a web vault and a command line. Download: https://bitwarden.com/download/ Source: the same page. Primary (maker). Read by Opus 2026-10-24.
- F87. **Bitwarden, price:** "Always free" for basic use; the free plan lists unlimited passwords and devices, "Zero-knowledge encryption", passkey management, a password generator and autofill, two-step login and sharing with one other user. Premium is "$1.65 per month", "Billed annually at $19.80", and adds an integrated authenticator, file attachments, emergency access and security reports. Sources: https://bitwarden.com/pricing/ and https://bitwarden.com/products/personal/ Primary (maker). Read by Opus 2026-10-24. Prices change: re-read before each dated pass.
- F88. **Bitwarden, where data lives:** "The Bitwarden cloud is available globally with data storage in both United States and European Union regions", chosen at sign-up under "Logging in on:". Source: https://bitwarden.com/help/server-geographies/ Primary (maker). Read by Opus 2026-10-24.
- F89. **Bitwarden, the master password:** "Bitwarden employees and systems have no knowledge of, way to retrieve, or way to reset your master password." Source: https://bitwarden.com/help/master-password/ Primary (maker). Read by Opus 2026-10-24.
- F90. **Bitwarden in Lithuanian:** the help page's language table has no Lithuanian (https://bitwarden.com/help/localization/, which adds "not all languages are available for all client applications"), but the apps' repository ships Lithuanian files for the browser extension and the desktop app: measured by Opus 2026-10-24, 96% and 86% of their strings differ from the English (`apps/browser/src/_locales/lt/messages.json`, `apps/desktop/src/locales/lt/messages.json` in https://github.com/bitwarden/clients). Master password is „Pagrindinis slaptažodis", the vault „Saugykla". The phone apps were not checked. Primary (maker's repository).
- F91. **KeePassXC, what it is:** "a modern, secure, and open-source password manager" that keeps passwords "in an offline, encrypted file that can be stored in any location"; "Free and open source", "No cloud, no ads, no subscriptions", "released under the GPLv3" (the repository README says "GPL-2 or GPL-3"). Source: https://keepassxc.org/ Primary (maker). Read by Opus 2026-10-24.
- F92. **KeePassXC, platforms:** Windows 10 and 11, macOS 12 and later, Linux, with a browser extension. "We don't have our own mobile app"; for Android it recommends KeePassDX and KeePass2Android, for iOS Strongbox and KeePassium (other projects, not checked here). Sources: https://keepassxc.org/download/ and https://keepassxc.org/docs/ (FAQ) Primary (maker). Read by Opus 2026-10-24.
- F93. **KeePassXC, who makes it:** "an international team" of five members; the legal contact in its Impressum is in Weimar, Germany. Source: https://keepassxc.org/team/ Primary (maker). Read by Opus 2026-10-24.
- F94. **KeePassXC, download:** https://keepassxc.org/download/ (version 2.8.0 on 2026-10-24), each file with a PGP signature and a SHA-256 digest and a guide to verifying them. Primary (maker). Read by Opus 2026-10-24.
- F95. **KeePassXC, what to watch:** "If you lose your key file, you lose your database" and "keep a backup in a safe location"; syncing the file between devices is the user's own job (it has no server, F91). Lithuanian: the repository's `share/translations/keepassxc_lt.ts` has 2,501 strings, 468 unfinished, so about 81% is translated (measured by Opus 2026-10-24, https://github.com/keepassxreboot/keepassxc). Source: https://keepassxc.org/docs/ Primary (maker). Read by Opus 2026-10-24.
- F120. **Google Password Manager.** "Google Password Manager is built in to Chrome (on all platforms) and every Android app"; on iOS it "works best when you use it with Chrome"; managed at passwords.google.com (https://passwords.google/). Google's Lithuanian help advises adding recovery information and turning on 2-Step Verification (https://support.google.com/accounts/answer/6208650?hl=lt). With on-device encryption, "If you lose your Google password, you risk loss of access to your saved passwords" (https://support.google.com/accounts/answer/11350823). In the EEA, Google services are provided by Google Ireland Limited, Dublin (Terms of Service, Lithuania version, effective 2026-07-30, https://policies.google.com/terms). Primary (maker). Read by Opus 2026-10-25. Not stated by Google anywhere read: the price and whether the code is open, so the card leaves both out.

---
## D. Devices and network

**D15. The home router**
- F74. CISA Module 5 (undated): change the router's login and password; check its firmware for updates; use "WPA3 Personal or WPA2 AES"; "Disable Wi-Fi Protected Setup (WPS)". Older options (WEP, WPA, TKIP) should be upgraded or replaced. Source: https://www.cisa.gov/audiences/high-risk-communities/projectupskill/module5 Primary.
- F75. CISA's older "Home Network Security" page (2021-02-01) says the same and adds turning off remote management. It is archived ("may not reflect current policy") and names TKIP next to WPA3, so do not copy its cipher line. Source: https://www.cisa.gov/news-events/news/home-network-security Primary.
- F76. Neither NCSC (UK) nor NKSC has a router page; NKSC lists a UPnP flaw and a UPnP checker (https://www.nksc.lt/rekomendacijos.html). **GAP** for a Lithuanian router source.

**D16. The phone**
- F77. CISA: turn on automatic updates, since "many software updates are created to fix security risks", and install critical ones "as soon as possible". Source: https://www.cisa.gov/secure-our-world/update-software Primary. NKSC (2026-07-13) also says to install system and app updates promptly (the F41 URL).
- F78. **Screen lock.** Google's Lithuanian Android help: „Galite nustatyti ekrano užraktą, kad apsaugotumėte „Android" telefoną ar planšetinį kompiuterį nuo neteisėtos prieigos"; usually a PIN, a pattern or a password (Nustatymai → Sauga → Ekrano užraktas). Apple: "Set a passcode on your device to help protect your data." Sources: https://support.google.com/android/answer/9079129?hl=lt and https://support.apple.com/lt-lt/119586 Primary (the makers). Read by Opus 2026-10-25. The SIM PIN is still a **GAP**, and no NKSC or NCSC page on the screen lock was found; FTC's phone page ("at least a 6-digit passcode") answers a script with 403, so it is not used.
- F79. SIM-swap or port-out protection at Telia, Bitė or Tele2: **GAP**. Do not claim it exists.

**D17. The browser: ads, trackers, links and files** (for `/temos/irenginiai/`, drafted 2026-10-30). Gathered on
2026-10-30 by a research agent (Sonnet); entries marked "Opus" were read at the source by Opus the same day.
- F125. **The FBI recommends an ad blocker for searches.** FBI IC3 PSA I-122122-PSA, 2022-12-21, "Cyber Criminals Impersonating Brands Using Search Engine Advertisement Services to Defraud Users": criminals buy search ads that impersonate businesses and lead to look-alike sites; "it is important to practice caution when accessing a web page through an advertised link." Advice: "type the business's URL into an internet browser's address bar"; "Use an ad blocking extension when performing internet searches"; blockers "can be turned on and off" per site. Source: https://www.ic3.gov/PSA/2022/PSA221221 Primary. Opus. No later IC3 PSA repeating it was found.
- F126. **Chrome no longer runs the full uBlock Origin.** Chrome's MV2 timeline (last updated 2026-09-09): "With Chrome 138 all users on all channels of Chrome have now Manifest V2 extensions disabled" (2025-07-24); on 2026-08-31 "All remaining Manifest V2 extensions have been removed from the Chrome Web Store." uBO Lite's README calls it "based on the MV3 API", the successor format. Source: https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline and https://github.com/uBlockOrigin/uBOL-home Primary. The page does not name uBlock Origin; that uBO itself was removed on 2026-08-31 is press only (CyberInsider, excerpt), so the page says only that Chrome turned the old extensions off.
- F127. **uBlock Origin on Firefox.** The addons.mozilla.org listing carries the „Recommended" badge ("Firefox only recommends add-ons that meet our standards for security and performance") and is available for Firefox on Android. Source: https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/ Primary. Read 2026-10-30 (agent); the same facts were read on 2026-10-02 (`docs/LANDING.md`).
- F128. **uBO Lite.** Its FAQ: "I consider uBO Lite to be too different from uBO to be an automatic replacement." Its README lists Safari; the App Store has „uBlock Origin Lite" by Raymond Hill, free, for iOS 18.5 or later. Source: https://github.com/uBlockOrigin/uBOL-home/wiki/Frequently-asked-questions-(FAQ) (Opus), https://apps.apple.com/app/ublock-origin-lite/id6745342698 (agent). Primary.
- F129. **Brave Shields.** "Third-party ad & tracker blocking, on every page you visit"; "By default, Brave Shields are on for every site you visit." Source: https://brave.com/shields/ Primary. Opus. Brave's Lithuanian default search engine is Google (`docs/LANDING.md`, 2026-10-02, secondary).
- F130. **Firefox's tracking protection and its Lithuanian words.** Firefox's Lithuanian interface (Mozilla's localisation, `lt/browser/browser/protections.ftl`): „Išplėsta apsauga nuo stebėjimo: visada įjungta"; „Socialinių tinklų stebėjimo elementai", „Tarp svetainių veikiantys stebėjimo slapukai", „Skaitmeninių atspaudų stebėjimas", „Kriptovaliutų kasėjai", „Stebėjimui naudojamas turinys". firefox.com: "Blocks trackers automatically. No setup." Mozilla (2019-01-29): "Trackers collect data on where you've been and what you've done." Sources: https://github.com/mozilla-l10n/firefox-l10n (Opus), https://www.firefox.com/en-US/ and https://blog.mozilla.org/firefox/control-trackers-with-firefox/ (agent). Primary. Mozilla's support page on what Standard mode blocks answered with a bot challenge: **GAP**, so the page does not list what is on by default beyond "blocks trackers automatically".
- F131. **Safari.** Apple: "Intelligent Tracking Prevention is on by default." Source: https://www.apple.com/privacy/features/ Primary (agent). The Lithuanian label of the iPhone setting: **GAP**; do not print one.
- F132. **Files and hidden links** (Lietuvos bankas, 2021-02-26): „Kenkėjišką kodą galima įterpti į įvairaus formato dokumentus"; „Po įprastai atrodančia nuoroda dažnai slepiasi visiškai kita nuoroda". Advice: stop contact with the sender and reach the bank through its official contacts. Source: https://www.lb.lt/lt/naujienos/demesio-saugokites-sukciu-siunciamu-pranesimu Primary. Opus.
- F133. **A fake app that hands over the phone** (LRT, 2026-07-09, quoting Mindaugas Kutkaitis of Luminor): a fake „TikTok" app „dažniausiai platinama per neoficialias programėlių parduotuves arba reklamuojama socialiniuose tinkluose"; once installed, „Sukčiai gali nuotoliniu būdu stebėti aukos veiksmus ir matyti viską, kas vyksta telefone realiuoju laiku", make payments, and obtain bank logins and Smart-ID PINs. Advice: install only from official stores such as Google Play; never grant excess permissions, above all accessibility, SMS or device administrator. Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2984076/neapsigaukite-netikra-tiktok-programele-gali-atverti-prieiga-prie-jusu-banko-saskaitos Secondary (press quoting a bank). Opus.
- F134. **Android and unknown sources.** Google's Lithuanian Android help: „jei atsisiųsite programas iš nežinomų šaltinių, gali kilti pavojus jūsų įrenginiui ir asmens informacijai." Google Play Protect „tikrina programas ir įrenginius, ar nėra žalingos elgsenos" and „įspėja apie potencialiai žalingas programas". Sources: https://support.google.com/android/answer/7391672?hl=lt (Opus) and https://support.google.com/googleplay/answer/2812853?hl=lt (agent). Primary. That installing from outside the store needs a per-app permission: **GAP** (press only).
- F135. **Office macros.** Microsoft changed "the default behavior of Office applications to block macros in files from the internet" (rollout from April 2022; Windows only, not Mac, mobile or web). Source: https://learn.microsoft.com/en-us/microsoft-365-apps/security/internet-macros-blocked (ms.date 2026-07-17) Primary (agent).
- F136. **File name extensions.** Microsoft's Lithuanian page „Dažniausi failų vardų plėtiniai sistemoje „Windows"" explains extensions and how to show them when „nematote failų vardų plėtinių" (View > Show > File name extensions in the English page). It does not say they are hidden by default, and no primary source on double extensions was found: **GAP**. Source: https://support.microsoft.com/lt-lt/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01 Primary (agent). The Lithuanian menu labels were not read; do not print them.
- F137. **Check by another route.** NCSC UK („Spot scams", published 2021-11-26, reviewed 2022-09-05): to check a message, contact the organisation and "use the details from their official website." NKSC: „Būkite atsargūs su nuorodomis, kurias gaunate el. paštu ar trumposiomis teksto žinutėmis" (undated, https://www.nksc.lt/mobiliuju-irenginiu-apsauga.html). Sources: https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams Primary (agent). CISA's phishing page says the same but carries an archive notice, so it is not used.
- F138. **Fake bank ads on Facebook** (Šiaulių bankas, now Artea, 2025-01-14, via alkas.lt): fake bank ads spread mostly on Facebook in recent months; a link that asks you to log in „beveik neabejotinai yra apgaulė, todėl jų spausti nereikėtų". Source: https://alkas.lt/2025/01/14/socialiniuose-tinkluose-plinta-suklastotos-banku-reklamos Secondary (a portal reprinting the bank). The bank's own page answered 403.
- F139. **Not every blocker blocks everything.** Cyberscoop (2021-01-14), on CISA's ad-blocking advice to agencies: "Some browser extensions are known to accept payment from advertisers to ensure their ads are allowlisted from blocking." Source: https://www.cyberscoop.com/ad-blockers-security-nsa-dhs-wyden/ Secondary. NSA's 2018 sheet „Blocking Unnecessary Advertising Web Content" and CISA's 2023 „Securing Web Browsers and Defending Against Malvertising" were not readable by the tools (403, undecodable PDF): **GAP**, so neither is cited.
- A Lithuanian state body (NKSC, RRT, police, Lietuvos bankas) or ENISA recommending an ad blocker: **GAP** (searched 2026-10-30).

---
## E. Family
- F80. FBI IC3, 2024-12-03, "Criminals Use Generative Artificial Intelligence to Facilitate Financial Fraud": "Create a secret word or phrase with your family to verify their identity." Source: https://www.ic3.gov/PSA/2024/PSA241203 Primary.
- F81. FBI IC3, 2025-12-05, on virtual kidnapping with faked proof-of-life media: agree a code word only you and your loved ones know, and always try to reach the loved one before paying. Source: https://www.ic3.gov/PSA/2025/PSA251205 Primary.
- F82. A Lithuanian body recommending a family code word: **GAP**. Press reports quote experts (KTU, Telia, TV3) recommending one; not re-read, and none is a state body. The police advice in F106 (reach the relative another way) is the nearest official line.
- F119. **„Labas, mama" by a new number** (LRT, 2023-11-17, quoting Darius Povilaitis, a Telia cybersecurity expert): an SMS says the child's number has changed and presses the parent to save it in the address book; asks for money come later, for example to „paskolinti" for rent or a phone bill, or for card details. Advice: first call the child on the old number, and block the sender. Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2127030/labas-mama-atakos-grizo-nauju-formatu-sukciai-praso-issisaugoti-nauja-vaiko-telefono-numeri Secondary in kind (a news article quoting an operator's expert). Read by Opus 2026-10-25. No police or Lietuvos bankas page on this exact message was found.

---
## F. The site's own privacy notice
Used only by `/privatumo-pranesimas/`. The Regulation is the EU General Data Protection Regulation
(BDAR, 2016/679). F112 to F114 were first read at gdpr-info.eu, an unofficial copy, and re-read by Opus
on 2026-10-25 in the official Lithuanian text (OJ L 119/1, 2016-05-04), fetched from the EU Publications Office
(`https://publications.europa.eu/resource/celex/32016R0679`, Accept-Language lit), because EUR-Lex answers a
script with an empty 202. Each matches; the pages link EUR-Lex, which a reader's browser opens.
- F112. **Legitimate interest.** Art. 6(1)(f) allows processing "necessary for the purposes of the legitimate interests pursued by the controller", unless the person's rights override them. Recital 49 names processing "strictly necessary and proportionate" for network and information security (blocking unauthorised access, malware, denial of service) as such an interest. Lithuanian text: Art. 6(1)(f) „tvarkyti duomenis būtina siekiant teisėtų duomenų valdytojo arba trečiosios šalies interesų“; recital 49 „tik tiek, kiek tai yra būtina ir proporcinga siekiant užtikrinti tinklo ir informacijos saugumą“. Source: https://eur-lex.europa.eu/legal-content/LT/TXT/?uri=CELEX:32016R0679 Primary. Read by Opus 2026-10-25.
- F113. **The reader's rights.** Art. 15 access, 16 rectification, 17 erasure, 18 restriction, 21 objection; Art. 21(1) applies to processing based on Art. 6(1)(e) or (f), so to everything the site keeps. Art. 20 (portability) does not apply to (f) and is left out. Source: https://eur-lex.europa.eu/legal-content/LT/TXT/?uri=CELEX:32016R0679 (Art. 15–18, 21) Primary. Read by Opus 2026-10-25.
- F114. **Complaint.** Art. 77(1): every data subject has the right to lodge a complaint with a supervisory authority, in the state where they live, work or where the infringement happened. Source: https://eur-lex.europa.eu/legal-content/LT/TXT/?uri=CELEX:32016R0679 (Art. 77) Primary. Read by Opus 2026-10-25.
- F115. **VDAI.** Lithuania's supervisory authority is the Valstybinė duomenų apsaugos inspekcija; its complaints page is „Skundų nagrinėjimas", https://vdai.lrv.lt/lt/veiklos-sritys-1/skundu-nagrinejimas/ (opened 2026-10-25: it asks to try the controller first, then the complaint form or epaslaugos.lt). Source: https://vdai.lrv.lt/lt/veiklos-sritys-1/skundu-nagrinejimas/ Primary. Read by Opus 2026-10-25.
- F116. **The server's access log and how long it is kept.** Apache writes each site's access log in the combined format (time, IP address, the request, status, the referring page, the User-Agent) to a file of its own; logrotate rotates it weekly and keeps 8 rotations, so a line is gone after at most 9 weeks (the same promise normaliai.lt makes). Source: the server's own configuration. Read over ssh by Opus on our own server, where the site runs since 2026-10-27, on 2026-10-28: the suktas.lt vhost's `CustomLog` line (combined format), and the logrotate rule for the vhost logs. Primary. First read 2026-10-25 on the VPS at IV (with ModSecurity's audit log keeping client addresses 4 weeks there; not re-read on our own server).
- F121. **IV as processor.** UAB „Interneto vizija" publishes an Art. 28 agreement, „Asmens duomenų tvarkymo susitarimas", whose main contract is its website hosting and server rental terms (1.1.4) and under which it processes personal data only as far as the services need and on the controller's lawful instructions (2.3). Source: https://sutartys.iv.lt/preview/duomenu_tvarkymas.php Primary. Read by Opus 2026-10-25. Since 2026-10-27 the site no longer runs at IV; IV is named for the copy it keeps, the fallback and then the planned standby (the server notes; the notice of 2026-10-28).
- F122. **Telia as processor, mail included.** The „Telia Hosting" terms: when Telia provides website hosting it acts as the processor of the customer's personal data, under the „Duomenų tvarkymo sąlygos" published on telia.lt. The mailboxes are part of that hosting service: the customer creates and manages them in the hosting control panel, and the same terms delete mail kept in the „Šiukšlinė" folder after 30 days and keep backups up to 14 days. Source: https://hosting.telia.lt/zinynas/teikimo-taisykles-ir-salygos Primary. Read by Opus 2026-10-25. How long Telia keeps its own mail or server logs: not found.
- F123. **The shared visit counter.** count.sudievu.lt runs on the same server as suktas.lt: our own server, both names reached through its Cloudflare tunnel (both have `hostname:` rules in the tunnel's configuration, and both resolve to Cloudflare's 188.114.96.11 and 188.114.97.11; read 2026-10-28; until 2026-10-27 both were on the VPS at IV). The page script (`public/count.js`, a copy of the Panel's `count/public/c.js` at Panel commit 7a4f60a) sends only on https://suktas.lt itself: one page view when the page is shown, one "engaged" after 8 seconds of visible time or one real press, key, wheel or touch, each carrying the site, the path without query or fragment, the referring site's host name, and a hint (`automation` for a driven browser, `owner` after a visit with `?notrack`, whose one localStorage key `sudievu-count-off` `?track` removes). It sets no cookie. The counter hashes the day's secret, the site, the address (an IPv6 address by its /64) and the browser's name into a visitor code; the secret is deleted the next day; the address and the browser name are not stored; events are kept 35 days, then only each day's totals. A `?notrack` visit is still sent and stored, tagged and not counted. The script does not send link tags (utm_*) yet; the notice says the counter may record them because the campaigns work in the Panel adds them (2026-10-26), and the copy must be renewed when `c.js` changes. Source: the Panel's `docs/VISITS.md` (*How it counts*) and `count/public/c.js`, read by Opus 2026-10-26; the script's behaviour on this site checked in Chrome with suktas.lt and the counter routed locally (page views on /, /jei-apgavo/ and the notice, the query dropped, no CSP refusal). Our own server, so the page tags it `pažadas` and /saltiniai/ does not list it.
- F124. **Cloudflare as processor.** Cloudflare's Customer Data Processing Addendum (version 6.4, effective 2026-04-03): "Cloudflare is a Processor (or sub-Processor, as applicable)" (2.3); transfers out of the EU use the EU Standard Contractual Clauses (6.2(a)), and "Cloudflare complies with the Data Privacy Framework" (6.4). The Self-Serve Subscription Agreement (last updated 2025-09-12) incorporates the DPA by reference when the customer content holds European personal data (6.1), and it is accepted by using the service. Every request to suktas.lt and count.sudievu.lt passes through Cloudflare since 2026-10-27 (F123). Source: https://www.cloudflare.com/cloudflare-customer-dpa/ and https://www.cloudflare.com/terms/ Primary. Read by Opus 2026-10-28.

**B17. The missed call from abroad (wangiri)** (read by Opus on 2026-10-31, from the raw HTML of each page;
found by a Sonnet research agent the same day; extends F38–F39, for the wangiri scenario)

- F172. **RRT on missed calls** (rrt.lt, consumer rights in electronic communications, no date on the page):
  „Būkite budrūs ir atsakingai įvertinkite radę praleistą skambutį iš nelietuviško ryšio numerio, nes
  pasitaiko atvejų, kai piktavaliai iš užsienio valstybių laukia, kad jiems būtų perskambinta, taip siekdami
  išgauti pinigus iš patiklių žmonių." Source:
  https://rrt.lt/veiklos-sritys/vartotoju-teisiu-apsauga/vartotoju-teises-ir-pareigos/el-rysiu-vartotoju-teises-ir-pareigos
  Primary.
- F173. **RRT's answer: do not call back** (rrt.lt FAQ on scam prevention, no date on the page). „Ar saugu
  atsiliepti į nežinomą užsienio numerį?" – „Jeigu nelaukiate skambučio iš užsienio, geriau neatsiliepti.
  Vien atsiliepimas paprastai dar nereiškia, kad prarasite pinigus, tačiau sukčiai gali bandyti Jus įtraukti
  į pokalbį, išgauti asmens duomenis arba įtikinti atlikti veiksmus. Neatskambinkite į nežinomą užsienio
  numerį. Sukčiai kartais specialiai paskambina labai trumpai, tikėdamiesi, kad žmogus perskambins.
  Perskambinus gali būti taikomas padidintas skambučio tarifas arba galite būti įtraukti į sukčiavimo
  pokalbį." The same FAQ names the phone's own filter (on iPhone „Silence Unknown Callers") and warns it
  can also silence legitimate calls (a courier, a clinic). Source:
  https://rrt.lt/daugiau/pagalba-ir-d-u-k/sukciavimo-prevencijos-elektronineje-erdveje-klausimai Primary.
- F174. **Where to report, per the same FAQ**: suspicious links, SMS or calls to NKSC
  (https://www.nksc.lt/pranesti.html, whose form is titled „Gavau melagingą žinutę / skambutį"); if money
  was lost, login details given away or a transfer made, „nedelsdami kreipkitės į banką ir policiją per
  ePolicija.lt"; 112 if it is happening now. Source: the F173 URL. Primary.
- F175. **How it works and what a callback costs, per Telia** (tv3.lt 2023-11-14 and LRT 2023-07-12, both
  relaying a Telia press release; Telia's Andrius Šemeškevičius). An autodialler rings random numbers in
  many countries and hangs up after one or two rings, before the owner can answer, sometimes several times.
  The aim is a callback: „tokiu atveju jau skambinantysis moka tarptautinio skambučio sujungimo mokestį,
  kurio dalį įprastai gauna ir pats sukčius. Šių mokesčių dydis gali būti labai įvairus ir svyruoti nuo
  kelių iki kelių dešimčių eurų, priklausomai nuo šalies." „Jei Lietuvoje atsiliepiate į skambutį iš
  užsienio, tai jums už jį mokėti nereikės. Svarbiausia, tik jokiu būdu jiems neperskambinti", above all to
  numbers starting +2, +5, +9 or +6 (Africa, South America, Asia). Sources:
  https://www.tv3.lt/naujiena/lietuva/gavote-skambuti-is-uzsienio-ispeja-siukstu-to-nedaryti-baigsis-liudnai-n1270828
  and https://www.lrt.lt/naujienos/mokslas-ir-it/11/2027110/lietuvoje-vel-pasipyle-wangiri-atakos-ispeja-niekada-neperskambinti-uzsienietiskiems-telefono-numeriams
  Secondary (press, quoting the operator).
- F176. **A dated wave** (same Telia release): in the first half of 2023 Telia blocked 148,000 such calls,
  17.4% more than a year before; the countries used most were the United Arab Emirates, Haiti, Madagascar
  and the DR Congo; the filter „nėra šimtaprocentinė", so some calls get through. Sources: the F175 URLs.
  Secondary.
- F177. **Bitė's account** (bite.lt press release, 2020-05-15): a callback „peradresuojamas į aukščiausios
  kainos paslaugų (angl. premium rate service, PRS) tinklą užsienyje", and „Sukčiai perskambinusius asmenis
  tinkle bando užlaikyti kiek įmanoma ilgiau". Answering a call that then dropped did no harm: „Problema
  nutinka tik tada, kai perskambinate ir po sujungimo ilgai nepadedate ragelio." Tell it by the country
  code: not „+370" means abroad, and if you know nobody there and expect no call, „didelė tikimybė, kad tai
  gali būti sukčių ataka"; the number can be put on the phone's block list. That spring's attacks came
  from Algeria, Tunisia and Jamaica, smaller ones from Moldova, Namibia, Saudi Arabia and Kenya. Source:
  https://www.bite.lt/apie/ziniasklaidai/nauja-wangiri-telefoniniu-sukciu-atakos-banga-lietuvoje Primary
  (the operator's own page).
- F178. **Tele2's account** (tele2.lt news, 2021-09-02): „Tokių pokalbių kaina yra skaičiuojama už pokalbio
  minutę, kuri gali siekti ir porą eurų." „Nuo tokių pinklių apsisaugosite, jei neatsiliepsite ir
  neperskambinsite į neaiškius numerius. Ypatingai, jei tai yra kokia nors tolima, egzotinė valstybė." The
  country can be checked by typing the number into a search engine; report unwanted calls to your operator.
  Source: https://tele2.lt/naujienos/viskas-ka-reikia-zinoti-apie-telefonines-apgaules Primary.
- F179. **January 2026** (laikas.lt, 2026-02-02, in an article on Telia's blocking figures): about 550,000
  „wangiri" calls were blocked in January, counted before the month ended (650,000 forecast by its end); „Perskambinus į tokį numerį, vartotojui pradedami skaičiuoti itin
  dideli tarptautinio ryšio tarifai, kurie ir tampa sukčių pelno šaltiniu." Source:
  https://www.laikas.lt/skambutis-po-kurio-saskaita-lieka-tuscia-gyventojai-vel-ikliuva-i-sukciu-pinkles-154130/
  Secondary (press).
- F180. **Few Lithuanians call back** (santaka.info, 2026-05-25, Telia's Vytautas Bučinskas): Lithuanians
  who see an unknown foreign code „paprasčiausiai nekelia ragelio"; scammers favour wangiri in Scandinavia;
  most such calls are blocked by the operator. So the page does not call wangiri a mass wave now. Source:
  https://www.santaka.info/index.php/2026/05/25/lietuva-telefoniniams-sukciams-per-kietas-riesutelis-skambuciu-skaicius-krito-beveik-25-kartus/
  Secondary (press, quoting the operator).
- F181. **An older case** (tv3.lt, 2015-07-02): readers reported missed calls from +88213555259, a satellite
  operator's number; calling back cost about €7 a minute; the same pattern ran in 2010 from +88213860033.
  Source: https://www.tv3.lt/naujiena/lietuva/vel-siaucia-sukciai-perskambinus-i-praleista-skambuti-teks-brangiai-susimoketi-n839074
  Secondary (press).
- F182. **The reverse: people call back about a call you never made** (RRT's scam-prevention page, no date):
  „Jeigu žmonės jums perskambina ir sako, kad matė jūsų numerį, nors jūs jiems neskambinote, jūsų telefono
  numeris galėjo būti suklastotas ir panaudotas sukčiavimui. Tokiu atveju informuokite savo ryšio paslaugų
  teikėją (operatorių)." Spoofing, not wangiri; it answers the query *praleistas skambutis nors neskambinau*.
  Source: https://rrt.lt/veiklos-sritys/elektroniniai-rysiai/paslaugu-vartotojams/scam-prevencija Primary.
- F183. **Disputing a phone bill** (the F172 page): „Nemokėjimas nereiškia ginčijimo. Ginčijant sąskaitas,
  turite argumentuotai kreiptis į paslaugų teikėją, nepavykus išspręsti situacijos taikiai - ir į kitas
  institucijas". Source: the F172 URL. Primary.
- **Not used** (2026-10-31): RRT's 2025 and Q1 2026 blocking totals and the 2023 duty as quoted by
  D. Kuliešius (tv3 2023-11-14; F38 covers it); 15min 2026-03-19 (+371 calls: vishing); lrvalstybe
  2025-10-24 and Tele2 2024-11-08 (spoofing); Telia's slides to BEREC (2025-05, „Wangiri SCAM is very rear in
  Lithuania"; a PDF read by the agent only). **Not found:** any Lithuanian count of victims or money lost to
  wangiri; an operator's or RRT's rule on refunding a callback's charges (RRT's general rule on disputing a bill is
  F183); an official list of country
  codes; a wangiri page from NKSC, the police or Lietuvos bankas; Bitė's business page on missed calls (403;
  the „3%" and „17 euro" figures seen in a search snippet are unverified).

**B18. The "rescuers" who promise to get the money back (recovery scams)** (read by Opus on 2026-10-31,
from the raw HTML of each page; found by a Sonnet research agent the same day; extends F14–F16 and F104, for
the recovery-scam scenario). F14 was re-read from the raw page the same day: still „Paskutinė atnaujinimo
data: 2024-10-28", the 10–50 % sentence and the card-chargeback sentence as quoted there. The foreign ones
(F195–F199) are about other countries, so a page names whose they are.

- F184. **Interpol never charges to recover money** (15min.lt, 2025-12-31, with Meta's fact-checking
  programme). Ramūnas Matonis, spokesman of the Lithuanian police and its Interpol bureau: the organisation
  „niekada nereikalauja pinigų už galimybę atgauti prarastas lėšas"; „Tai yra apgavystė vienareikšmiškai";
  „Kreiptis į Interpolą žmonėms tiesiogiai galimybės nėra". The Criminal Police Bureau, as 15min reports it:
  „Interpolas nepriima fizinių asmenų skundų, o bet kas, teigiantis priešingai, juo labiau, tvirtinantis, kad
  gali tarpininkauti kreipiantis į šią organizaciją, tiesiog meluoja." Source:
  https://www.15min.lt/naujiena/aktualu/pasaulis/interpolas-pades-susigrazinti-sukciu-pavogtus-pinigus-ar-tikrai-57-2593022
  Primary for the police statements, in the press.
- F185. **The case in the same article**: a reader (name changed) „investavo" several thousand euros on the
  word of a new Facebook acquaintance, then saw Russian-language ads saying Interpol had caught a gang of
  financial criminals and „už nedidelį tarpininkavimo mokestį galėtų grąžinti pinigus atgal nukentėjusiai";
  after she filled in a form, „neva Interpolo atstovas" contacted her through a chat app. Debunk.eu's Viktoras
  Daukšas: the first such ads were seen „maždaug 2023 metų rugpjūtį", mostly in Russian, some in English;
  „Tai yra schema išvilioti lėšas antrą kartą iš tų žmonių, kurie jau buvo apgauti". The article gives no
  amount paid. Source: the F184 URL. Secondary (press; the victim is anonymous).
- F186. **Luminor on the repeat scam** (paninfo.lt, 2026-05-12, a Luminor release; Mindaugas Kutkaitis):
  „apsimetėliai teisininkai ar finansų ekspertai siūlo padėti atgauti pinigus už, žinoma, papildomą
  mokestį"; they „kalba apie „patikimas galimybes", „neišnaudotą šansą", kartu primena patirtą nuostolį",
  creating the sense of a last chance while the person is „emociškai pažeidžiamas". Contacting the scammers
  oneself or searching online for a fix only gives them time and „sukelia riziką pakliūti į dar vieną
  apgaulę". What to do: the bank at once (block cards and internet-bank logins, stop payments), then the
  police; „kuo greičiau imamasi veiksmų, tuo didesnė tikimybė bent dalį lėšų sustabdyti arba atsekti."
  Source: https://paninfo.lt/patekote-i-sukciu-pinkles-papasakojo-ko-imtis-nedelsiant/ Primary (a bank),
  through the press.
- F187. **The banks' association names the line** (atpazinksukciu.lt, the Lietuvos bankų asociacija's site,
  no date on the page): after a scam, messages or calls may come from people offering to recover the money;
  „„Matome, kad buvote nukentėję, jūsų lėšos rastos", - tariamų teisininkų ar pareigūnų pamėgta dainelė."
  The same section, on fake brokers: they may ask for a program („dažniausiai „AnyDesk"") and to log in to the
  internet bank; „Neskubėkite suteikti atstovavimo teisių „agentui"." Source: https://atpazinksukciu.lt/
  Primary (an industry body).
- F188. **A bank's page with two victims' accounts** (tfbank.lt, „Pinigų susigrąžinimo sukčiavimas", no date;
  footer 2026): the criminals target people already deceived, pose as lawyers or staff of financial
  institutions, and usually ask for personal data or a supposed fee. Signs: calls from a „finansų skyrius" or
  „teisininkai"; „Prašymas atsisiųsti nuotolinio valdymo programą"; „Reikalavimas sumokėti „mokestį" už pinigų
  grąžinimą". Two anonymous accounts: a man of 57 talked into opening a new bank account, installing a
  remote-control app and talking on Telegram, who moved his savings and several loans there, about €23,500,
  into cryptocurrency, and was told the money was „grąžinti"; a man of 58, called in August 2025, who scanned
  his ID and took a selfie for „identifikacija", after which credit agreements were made in his name. Source:
  https://tfbank.lt/apsauga-nuo-sukciavimo Primary (a bank; the accounts are anonymous and unverified).
- F189. **Klaipėda police: the second payment** (LRT, 2025-04-29; Zigmas Turskis, Klaipėda county police): a
  man over 80 lost about €200,000 in an investment scam; realising it, he „dar susirado ir virtualius
  advokatus, kuriems paklojo dar 40 tūkst. eurų". „Mes esame turėję net tokių atvejų, kai žmonės yra
  policijoje, yra įspėjami ir pakartotinai užkimba ant tų pačių dalykų." „Į šią bėdą patekę žmonės labai
  stengiasi susigrąžinti pinigus ir nusikaltėliai tuo naudojasi." The advice: tell the police, your bank and,
  if known, the receiving bank at once; sometimes the money can still be stopped. Source:
  https://www.lrt.lt/naujienos/lietuvoje/2/2540618/atidave-200-tukst-euru-o-virtualiems-advokatams-dar-40-tukst-kaip-veikia-sukciai
  Secondary (press, quoting the police).
- F190. **Lietuvos bankas: what to do once it has happened** (the F14 page): „Nedelskite ir daugiau
  „neinvestuokite" – neperveskite nė cento"; cut contact and ignore their calls, messages and emails, since
  they may try to make you invest more or pay transfer commissions; go to your payment institution, which can
  help stop transfers; inform the police, FNTT or the prosecutor's office. Lietuvos bankas cannot investigate
  crimes but can block illegal investment websites. Source: https://www.lb.lt/lt/investavimas-kaip-atpazinti-sukcius
  Primary.
- F191. **A fee in euros, and "investigators"** (LRT, 2019-08-31, relaying the Lietuvos bankų asociacija):
  weeks after a scam, victims may be called by people who „prisistato tyrėjais" and promise recovery for a
  fee: „Įprastai prašoma nuo kelių šimtų iki 1000 ar daugiau eurų. Kai kurie nukentėjusieji šitaip apgaunami
  antrą kartą." Source:
  https://www.lrt.lt/naujienos/verslas/4/1093046/kaip-apsaugoti-pinigine-sukciai-gali-dali-pinigu-grazinti-kad-vel-galetu-apgauti
  Secondary (press). Old; it shows the fee is a flat sum in some cases, a share in others (F14, F15).
- F192. **A website she found herself, and a bank account lent** (tv3.lt, 2022-09-23, from the police): of
  three women who lost money to crypto „investments", one „susirado rusišką interneto svetainę", which offered
  help recovering it, and „pervedusi jiems beveik 5 tūkst. eurų, jokios pagalbos ji taip ir nesulaukė";
  another, wanting her money back, was offered to let people use her bank account and became an accomplice to
  a crime. Source:
  https://www.tv3.lt/naujiena/lietuva/patikejusios-investicijomis-i-kriptovaliutas-moterys-sukciams-atidave-90-tukst-euru-n1190987
  Secondary (press, from the police).
- F193. **Real recovery goes through the bank and the police** (Lietuvos bankų asociacija, 2023-01-25):
  financial scammers took about €12 million in 2022; „Šitaip bankų ir teisėsaugos pastangomis per 2022 metus
  sustabdyta arba į sąskaitas grąžinta iš viso apie 5 mln. eurų." Source:
  https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/finansiniai-sukciai-pernai-isviliojo-12-mln-euru-savininkams-grazinti-5-mln-euru
  Primary (an industry body). All fraud, not investment fraud alone.
- F194. **Investment losses rarely come back** (aina.lt, 2025-08-28, a Swedbank release): per the Pinigų
  plovimo prevencijos kompetencijų centras, investment fraud cost residents over €2 million in the first half
  of 2025, „o iš visos šios sumos susigrąžinti pavyko tik 47 tūkst. eurų, t. y. apie 2 proc."; Swedbank's
  Žygeda Augonė puts it at about 1–3 %. Source:
  https://aina.lt/investiciniu-sukciu-pinkles-vis-dar-veikia-gyventojai-siemet-jau-neteko-2-mln-euru/
  Secondary (the centre's figure not read at its source).
- F195. **The FBI's red flags** (IC3 PSA I-081325-PSA, 2025-08-13, updating those of 2023-08-11 and
  2024-06-24): fake firms claim to be partners of government or regulatory bodies or name ones that do not
  exist („International Financial Trading Commission"); say the victim is „on a government-affiliated list of
  scam victims"; know „the exact amounts and dates of previous wire transfers"; ask payment in cryptocurrency,
  gift cards or to a third-party company; say the funds sit in a foreign bank and have the victim open an
  account there; use WhatsApp group chats; will not show a licence or appear on camera. „The US Government does
  not request payment for law enforcement services provided." Source: https://www.ic3.gov/PSA/2025/PSA250813
  Primary (US).
- F196. **The FBI, 2024 and 2023** (IC3 PSAs 2024-06-24 and 2023-08-11): fake lawyers reach victims by social
  media or messaging, and some victims find them through legitimate-looking websites; from February 2023 to
  February 2024 victims reported losses of over $9.9 million to them; „Law enforcement does not charge victims
  a fee for investigating crimes." Recovery firms take an up-front fee and then go silent, or „produce an
  incomplete or inaccurate tracing report and request additional fees". Sources:
  https://www.ic3.gov/PSA/2024/PSA240624 and https://www.ic3.gov/PSA/2023/PSA230811 Primary (US).
- F197. **Belgium's regulator** (FSMA, 2024-10-03, „recovery room" fraud): the fee is said to cover
  administrative or legal costs or taxes, „purely fictitious costs"; some offer a „free" service and ask only
  for remote access (Anydesk), through which they can install spyware or reach the victim's internet bank, or for a new crypto wallet; victims „are often targeted twice by the same
  fraudsters", who „may also sell their victims' contact information on to other fraudsters". „Be sure to ask
  how that person found out that you have lost money. Reports of fraud are shared only with the judicial
  authorities and not with private companies." Source:
  https://www.fsma.be/en/warnings/fsma-warns-against-certain-companies-suspected-recovery-room-fraud Primary
  (Belgium).
- F198. **Switzerland's cyber centre** (NCSC, week 51, 2025-12-23): „While the NCSC received 91 reports of
  fake recovery scams last year, this year there have already been 462 reports"; „the names of international
  law enforcement agencies such as Europol or Interpol are misused"; „Never make advance payments to get
  supposedly lost funds back"; „Never give callers remote access to your computer." Source:
  https://www.bacs.admin.ch/en/25w51-en Primary (Switzerland).
- F199. **The same gang, twice** (European Commission news, 2026-07-27, on an Eurojust and Europol case with
  an action day on 2026-04-17): a network based in Albania „re-contacted victims who had already lost money
  through fraudulent platforms, offering services to recover their funds"; they were told to open accounts on
  cryptocurrency platforms and „make an initial deposit of EUR 500". The UK government's Stop! Think Fraud
  (no date): the recovery „agency" „might know a lot of details, which makes them sound credible, but they
  demand an upfront fee"; „Genuine agencies never ask for fees to recover money lost to fraudsters." Sources:
  https://home-affairs.ec.europa.eu/news/international-investigation-supported-europol-and-eurojust-dismantles-online-fraud-criminal-network-2026-07-27_en
  and https://stopthinkfraud.campaign.gov.uk/recovery-from-fraud/be-on-your-guard-against-further-fraud
  Primary (EU, UK).
- **Not used** (2026-10-31): the FTC's refund-scam page (read only through a summarising fetch; it answers a
  script with 403); 15min's „retro sukčiavimas" case from Ukmergė (403; a search excerpt only);
  gerosnaujienos.lt 2026-05-05 (unclear author); suvalkietis.lt 2018 (lost deposits, not investments); the
  Dutch police case of 2026-07 (Help Net Security only); the Finance Ministry's 2026-05-08 proposal to let
  payment providers hold suspect money (not law). **Not found:** a Lithuanian count of victims or money lost to
  recovery scams; a policija.lt page on them; a warning or list from the Lietuvos advokatūra; a named
  Lithuanian fake firm; whether a card chargeback covers a recovery fee paid by card.

**B19. The fake online shop, and paying one** (read by Opus on 2026-10-31, from the raw HTML of each page;
found by a Sonnet research agent the same day; for the fake-shop scenario). lb.lt, nksc.lt, vvtat.lrv.lt,
policija.lrv.lt and ecc.lt answered the agent with a bot challenge, so NKSC's and ECC Lietuva's advice is read
through republications that name them (alkas.lt, LRT); the page says whose each is. Raw pages:
`%TEMP%\kurj\p-*.html.txt`.

- F200. **The lure, in NKSC's words** (NKSC's advice, republished by alkas.lt, 2018-12-14): the shop's
  „adresas ar pavadinimas gali būti panašūs į žinomų elektroninių parduotuvių adresus, o pirkėjai viliojami
  didelėmis nuolaidomis. Reklamos apie naujas el. parduotuves su „fantastiškomis kainomis“ plinta socialiniais
  tinklais bei elektroniniais laiškais. Tokiose parduotuvėse pirkimo procesas gali atrodyti sklandus, tačiau
  prekių ar paslaugų asmenys taip ir nesulaukia." „Nuolaidų dydis tokiose parduotuvėse siekia net 80–90 proc.
  Tai vienas akivaizdžiausių suklastotos parduotuvės požymių". NKSC repeated the 80–90 % sign in its
  2024-11-20 release (F204). Source: https://alkas.lt/2018/12/14/nacionalinio-kibernetinio-saugumo-centro-patarimai-apsiperkantiems-el-parduotuvese/
  (`p-alkasnksc`). Primary (NKSC's text), through a republication.
- F201. **NKSC's other signs, and what proves nothing** (same page, 2018-12-14): suspect a shop whose
  „interneto vardas (domenas) buvo registruotas visai neseniai" (checkable, for example, at whois.com, „Registered
  On"), whose domain is „labai panašus į prekinio ženklo tikrąjį domeną (pvz. tikrasis adresas „prekiniszenklas.com“,
  o jo klastotė „prekiniszenklas-batai.com“)", or that shows no information about the company or its details,
  „kontaktams pateikiant tik nemokamą el. pašto paslaugų adresą (pvz. @yahoo.com ar @gmail.com)"; also
  „akivaizdžių pasikartojančių rašybos ar gramatikos klaidų". Read reviews on other sites; for a foreign shop,
  search „scam parduotuvesadresas.com". But „vien teigiami atsiliepimai patikimumo negarantuoja, nes jie taip
  pat gali būti suklastoti", and „sertifikato buvimas negarantuoja, kad el. parduotuvė tikra". No single sign
  decides: „Vienas ar kitas požymis nebūtinai patvirtins klastotę, kaip ir visų požymių nebuvimas negarantuos
  saugaus apsipirkimo". It does not say how to check a company code. Same source. Primary, through a
  republication.
- F202. **The padlock, and card data used months later** (Swedbank, press release on its blog, 2021-02-01):
  fake shops may use certificates „kurie interneto naršyklėje rodys saugų interneto ryšį žyminčią spynelę".
  Some steal the card details and charge nothing at first; „praėjus keliems mėnesiais, o kartais ir po metų
  [...] sukčiai nuskaito tam tikrą sumą nuo kortelės, nes turi išsaugoję jos duomenis." Swedbank's requests
  to investigate disputed online payments grow „kasmet [...] vidutiniškai po 20 proc." and peak in January and
  February. Old (2021) bank data: no current count. Source:
  https://blog.swedbank.lt/pranesimai-spaudai-saugumas/interneto-prekybos-suolis-traukia-sukciu-demesi-kaip-netapti-ju-taikiniu
  (`p-swedsuolis`). Primary (a bank).
- F203. **How the scheme runs, from a bank's fraud desk** (LRT, 2025-11-02, from a Luminor press release;
  Mindaugas Kutkaitis, head of Luminor's fraud prevention): „Iš pradžių socialiniuose tinkluose pasirodo
  reklama, siūlanti brangias prekes už itin mažą kainą. Skelbimas veda į tikroviškai atrodančią svetainę, o
  joje pateikiami vogti produktų atvaizdai, netikri klientų atsiliepimai ir tariami „patikimumo“ ženklai."
  „Pirkėjui įvedus kortelės duomenis ir atlikus apmokėjimą, prekės dažniausiai nesulaukiama. Kai kuriais
  atvejais atsiunčiamos nekokybiškos kopijos, o netrukus ir pati parduotuvė dingsta iš interneto platybių.
  Sukčiai tuo metu jau būna pasisavinę pirkėjo mokėjimo duomenis, kuriuos gali panaudoti neteisėtiems pirkimams
  arba parduoti" (on the dark web). Signs: huge discounts, „vienodi ar dirbtini klientų atsiliepimai bei riboti
  atsiskaitymo būdai". Before buying, check „ar pardavėjo įmonė yra registruota ir ar turi tikrus kontaktus".
  „Reikėtų vengti tiesioginių pavedimų, kriptovaliutų ar dovanų kortelių, kadangi tokius būdus sukčiai mėgsta
  labiausiai". After: „nedelsdami susisiekite su savo banku, sustabdykite mokėjimą ir praneškite apie incidentą
  policijai. Kuo greičiau pranešite apie nusikaltimą, tuo didesnė tikimybė atgauti prarastas lėšas". It also
  cites foreign vendor data (Avast: over 80,000 such sellers worldwide in 2024 Q4, more before Black Friday and
  Christmas; Gen: 23 % of social-network fraud cases are fake shops, most on Facebook and Instagram): FOREIGN,
  vendor figures, not used as Lithuanian numbers. Source:
  https://www.lrt.lt/naujienos/verslas/4/2724044/socialiniuose-tinkluose-sukciai-vilioja-netikrais-ispardavimais-ka-butina-zinoti
  (`p-lrtsoc`; the same release on paninfo.lt, 2025-10-24, `p-paninfo`). Secondary (press quoting a bank).
- F204. **What to do after paying, in NKSC's words** (LRT, 2024-11-20, from NKSC's press release before Black
  Friday): „Įtarus, jog apsipirkote netikroje el. parduotuvėje, nedelsiant reikėtų kreiptis į savo banką ir
  prašyti stabdyti pavedimą. Jei mokant už prekes netikroje el. parduotuvėje reikėjo nurodyti ir mokėjimo
  kortelės duomenis ar patvirtinti dviejų faktorių autentifikaciją, reiktų blokuoti mokėjimo kortelę bei
  pavedimus iš susijusių sąskaitų. Įtarus, kad pinigai buvo neteisėtai pasisavinti, praneškite apie tai
  Lietuvos policijai, o apie suklastotas svetaines – NKSC." The same release: „Akcijos tokiose parduotuvėse
  siekia net 80–90%" and „Sukčiai mainais į netikras nukainotas prekes išvilioja jautrius pirkėjų duomenis:
  banko kortelių ir asmeninę informaciją ar slaptažodžius." The 2018 text (F200) gives the same steps. Source:
  https://www.lrt.lt/naujienos/verslas/4/2418408/juodasis-penktadienis-sukciu-internete-darbymetis-kaip-neuzkibti-ant-kabliuko
  (`p-lrtbf`). Primary (NKSC's release), through the press.
- F205. **Reporting the site to NKSC** (the F200 page, 2018-12-14): report it to „cert@nksc.lt arba užpildę
  pranešimo formą NKSC interneto svetainėje", and „NKSC informuos svetainės prieglobos paslaugos teikėjus apie
  jų infrastruktūroje vykdomą neteisėtą veiklą." The form is F17. Primary, through a republication.
- F206. **Disputing a card payment, one bank's terms** (Swedbank, credit-card page, read 2026-10-31, no date on
  the passage): Swedbank „rekomenduoja kortelių savininkams užginčyti kortelėmis atliktus mokėjimus, jei prekės ar
  paslaugos nebuvo pristatytos arba buvo pristatytos su pažeidimais", by a message in the internet bank's
  „Kontaktai" with the topic „Pretenzija dėl kortelės operacijos"; if the seller refuses, „per 90 dienų nuo
  pirkimo datos arba nuo prekybininko nurodytos pristatymo datos"; „Bankui turi būti pateikta korespondencija su
  paslaugų teikėju / pardavėju." These are Swedbank's terms on its credit-card page; other banks' terms were not
  read, so a page says „your bank's deadline" and gives 90 days only as Swedbank's. Its purchase insurance is a
  Swedbank product, not used. Source: https://www.swedbank.lt/private/cards/cards/credit (`p-swedkred`). Primary.
- F207. **Chargeback, in ECC Lietuva's advice** (alkas.lt, 2023-03-19, tips from the Europos vartotojų centras
  in Lithuania): paying by credit card „iškilus problemoms dėl nepristatytų prekių ar sukčiavimo, daugeliu atvejų
  mokėjimas gali būti atšauktas. Susisiekite su banku dėl pinigų susigrąžinimo (angl. chargeback) procedūros.
  Tiesa, kreipdamiesi į banką turėsite pateikti įrodymą, kad jau bandėte išsiaiškinti situaciją su pardavėju."
  It says credit card; whether a debit card is covered the same way is not said. Source:
  https://alkas.lt/2023/03/19/kas-gali-sleptis-po-pardaveju-pasiulymais/ (`p-alkas573165`). Primary (ECC's
  text), through a republication.
- F208. **A credited transfer comes back only with the payee's consent** (LRT, 2025-03-23, SEB): „Jei lėšos jau
  įskaitytos į lėšų gavėjo sąskaitą (įvyko momentinis mokėjimas), pinigai gali būti grąžinti tik gavus lėšų
  gavėjo sutikimą." Swedbank says the same for a transfer to another bank. The article is about a transfer
  sent to the wrong person by mistake, not about fraud: a page uses it only for how a transfer works, never as
  a fraud victim's right. Source:
  https://www.lrt.lt/naujienos/verslas/4/2488820/klausiate-atsakome-ka-daryti-jei-pinigus-pervedete-ne-tam-asmeniui
  (`p-lrtpervedete`). Secondary (press quoting banks).
- F209. **VVTAT: money is not always recovered** (LRT, 2021-11-04): „Valstybinės vartotojų teisių apsaugos
  tarnybos (VVTAT) duomenimis, tokių apgavysčių pasitaiko kasmet, tiesa, susigrąžinti pinigus pavyksta ne visada
  – dažnai tokios parduotuvės registruojamos ne Lietuvoje, tad surasti kaltininką nebūna lengva." Its remote-trade
  head, Aida Gasiūnaitė-Stavginskienė: in some complaints „nei bankas, nei kito mokėjimo operatoriai negali
  nurodyti, kam buvo atliktas mokėjimas". The case in the article, the shop „Telemaxi": „Nukentėjusiaisiais
  pripažinta daugiau nei 240 asmenų ir įmonių", damage „daugiau kaip 70 tūkst. eurų", one suspect; a victim had
  heard nothing of the investigation in three years. Source:
  https://www.lrt.lt/naujienos/verslas/4/1534184/internetinei-parduotuvei-apgavus-per-240-asmenu-vienas-nukentejusiuju-zinios-del-tyrimo-nesulaukia-trejus-metus
  (`p-lrt240`). Secondary (press quoting VVTAT and the prosecutor).
- F210. **A fake copy of a known chain** (LRT, 2023-12-01): a Vilnius resident found a page copying Lidl's site
  with electronics up to 90 % off; „Lidl“ atstovai patvirtino, kad ši parduotuvė neturi nieko bendro" with it,
  and victims should go to the police. No loss is reported. Source:
  https://www.lrt.lt/naujienos/verslas/4/2137256/vilnietis-pastebejo-internete-plitusia-netikra-lidl-parduotuve-siule-net-90-proc-siekusias-nuolaidas
  (`p-lrtlidl`). Secondary.
- F211. **A separate card for online shopping** (atpazinksukciu.lt, the Banks Association's site, page
  „Netikros internetinės parduotuvės", undated): „turėkite atskirą kortelę apsipirkti internetu. Jos sąskaitą
  papildykite tik prieš atlikdami mokėjimą ir tik tiek lėšų, kiek reikia konkrečiai prekei ar paslaugai
  įsigyti." The page opens: „Brangią prekę atradote už neįtikėtiną kainą? Tikėtina, kad tai dar viena
  sukčiavimo forma." Source: https://atpazinksukciu.lt/netikrosinternetinesparduotuves (`p-atpazink`). Primary
  (an industry body).
- F212. **Too good to be true** (Swedbank blog, 2024-11-26): „Jei pasiūlymas atrodo per geras, kad būtų tiesa,
  greičiausiai tai sukčiai. Žymūs prekių ženklai nesiūlo neįtikėtinų nuolaidų." Source:
  https://blog.swedbank.lt/saugumas/saugus-apsipirkimas-internetu-ka-daryti-ar-nedaryti-kad-neliktumete-apgauti
  (`p-swedsaugus`). Primary (a bank).
- **Not used** (2026-10-31): Lietuvos bankas 2020-02-12 (the F15 page): its fake e-shops sell goods tied to
  famous Lithuanians and redirect to Forex investment within seconds, an investment lure rather than a shop that
  never delivers. A court case of 2023 (LRT, `p-lrt250`: 256 victims, over €88,000, one week of August 2018) whose
  article does not name Telemaxi, so it is not said to be the F209 case. CERT-LT's 2013 signs (`p-tv3pagaus`,
  old; its „no SSL" sign contradicts F201). The EU Commission's page (freeze the card or ask for a chargeback;
  the 14-day withdrawal right, which does not help against a shop that never ships). Revolut's single-use
  virtual cards and an ECB figure through Revolut (commercial, no year). Swedbank's purchase insurance (one
  bank's product). **Not found:** a Lithuanian count of fake-shop victims or losses (only single cases and
  Swedbank's 2021 growth rate); VVTAT's, NKSC's, ECC Lietuva's or the police's own pages (bot challenge); other
  banks' chargeback deadlines; whether a debit card is covered as a credit card is; a Lithuanian source saying a
  payment by crypto or gift card cannot be recovered.

**B20. The fake bank ad in search or on Facebook** (read by Opus on 2026-10-31, from the raw HTML of each page;
found by a Sonnet research agent the same day; for the fake-bank-ad scenario). lb.lt, nksc.lt, artea.lt and
sb.lt answered the agent with a bot challenge, so the banks' and the police's words are read through
republications that name them; the page says whose each is. Raw pages: `%TEMP%\kurj\a-*.html.txt`.

- F213. **Luminor: bank names bought as ad keywords** (Luminor's release, alkas.lt, 2026-08-15; the same
  text on santaka.info 2026-09-03; Mindaugas Kutkaitis, head of fraud prevention): „Įsigiję populiarių įstaigų
  pavadinimus kaip reklaminius raktažodžius, jie paieškos rezultatuose iškelia suklastotas svetaines, kuriose
  suvesti prisijungimo duomenys gali akimirksniu patekti į sukčių rankas." „Pastaruoju metu pastebimos
  suaktyvėjusios sukčių pastangos „Google" platformoje – jie vis dažniau reklamuoja netikras nuorodas, vedančias
  į suklastotus interneto banko puslapius." What follows: „Sukčiai gali bandyti išgautus duomenis panaudoti
  realiu laiku ir paskatinti žmogų patvirtinti papildomą veiksmą telefone"; „Jei tuo metu nesijungiate prie
  banko ar neatliekate mokėjimo, netikėtai gauta užklausa turėtų būti aiškus signalas sustoti". The padlock:
  „Vien „https://" adreso pradžia ar naršyklėje matomas užrakto simbolis taip pat nėra įrodymas, kad svetainė
  tikra." A fake address is often longer, with extra symbols or odd endings. Advice: „Banko ar kitos svarbios
  svetainės adresą geriausia įvesti ranka į naršyklę arba naudoti iš anksto išsisaugotas nuorodas. Venkite
  jungtis per „Google" paieškos rezultatus, ypač jei spaudžiate pirmą pasitaikiusią nuorodą." Source:
  https://alkas.lt/2026/08/15/pirma-paieska-google-nebutinai-tikra-kaip-sukciai-klastoja-banku-svetaines/
  (`a-alkasgoogle`; `a-santaka`). Primary (the bank's text), through a republication.
- F214. **SEB: the ad, the relay, the spinner** (SEB's press release, reprinted by kmintys.lt, 2026-03-02;
  Daiva Uosytė): „viena dažniausių šios schemos formų – manipuliavimas internetinių paieškos sistemų
  rezultatais, kai netikros svetainės papildomai reklamuojamos ir rodomos tarp pirmųjų paieškos pasirinkimų";
  the address „visuomet skirsis". While the person types, the scammer enters the stolen details on the real
  bank site, Smart-ID requests reach the person, and the fake page shows „besisukančią iliustraciją tarsi
  puslapis dar kraunasi". „jungiantis prie interneto banko reikia tik PIN1 kodo." After: „Jei sukčius
  inicijuoja mokėjimą ir mokėjimas dar nėra išsiųstas iš banko, jį galima sustabdyti arba atšaukti. Tačiau
  momentiniai mokėjimai euro zonoje įvykdomi akimirksniu, todėl pinigus susigrąžinti gali būti itin sudėtinga."
  Contact the bank at once and report to NKSC: „Šis centras rūpinasi svetainių blokavimu." SEB's official site
  is www.seb.lt. This is the release F169's 15min article (2026-04-24) drew on. Source:
  https://kmintys.lt/2026/03/02/sukciai-kuria-netikras-svetaines-ispeja-saugotis-paieskos-sistemose-rodomu-nuorodu/
  (`a-kmintys`). Primary (the bank's release), through a republication.
- F215. **A near miss, told by the customer** (Vakaro žinios / respublika.lt, 2025-08-13): a woman logging in
  to a housing association's account at Artea (then just renamed from Šiaulių bankas): „Galvojau, kad nuėjau
  per paiešką tiesiai į „Artea" puslapį." The page said a customer check was under way; then PIN2 requests came,
  „Jų atėjo gal 20 į mano telefoną", one of them for „4110 eurų pavedimą". She refused, phoned the bank: „Man
  pavyko prisiskambinti ir užblokuoti visas sąskaitas". No money is reported lost. The headline says the
  scammers paid for a Google ad. Source:
  https://www.respublika.lt/lt/naujienos/lietuva/kitos-lietuvos-zinios/sukciai-susimokejo-uz-google-reklama---ypac-budrus-turi-buti-artea-klientai/
  (`a-respublikaartea`). Secondary (press, first-person account).
- F216. **Artea: first Google positions bought, 100+ links blocked** (same article, 2025-08-13, the bank's
  spokeswoman): the scheme now works also by „išsiperkant pirmas „Google" paieškos pozicijas", with the names of
  banks, insurers, power suppliers and others; „nuo metų pradžios jau esame užblokavę daugiau nei 100 tokių
  nuorodų"; better reach the bank „tik įvedant pilną adresą www.artea.lt"; „Prisijungimo metu niekada nėra
  prašomas „PIN2" kodas – jis reikalingas tik mokėjimui patvirtinti"; „sukčių kuriamos nuorodos dažnai skiriasi
  tik viena raide ar simboliu". Source: the F215 URL. Primary (the bank, quoted).
- F217. **Seven investigations in one day** (rinkosaikste.lt, 2026-10-29, police data, BNS photo): „Vien per
  spalio 27 dieną policija pradėjo net septynis ikiteisminius tyrimus dėl galimų sukčiavimo atvejų." People lost
  money after entering bank login details on fake sites imitating „Regitra", E. sveikata, „Sodra" and Artea.
  „Nereikėtų aklai pasitikėti pirmuoju paieškos rezultatu ar rodoma reklama, nes ji gali nukreipti į sukčių
  sukurtą svetainę." It does not say how each victim reached the site. Source:
  https://rinkosaikste.lt/policija-ispeja-apie-fiktyvias-svetaines-neskubekite-suvesti-prisijungimo-duomenu/
  (`a-rinkosaikste`). Secondary (regional press, police data).
- F218. **„Remiama" is not „official"** (tv3.lt, 2026-10-12, relaying the police's virtual patrol): one changed
  symbol in an address can be a trap, and „reklaminis žymėjimas „Remiama" nereiškia, kad puslapis yra
  oficialus"; „oficialią svetainę susiraskite patys". Source:
  https://www.tv3.lt/naujiena/gyvenimas/policija-ispeja-apie-masine-sukciu-afera-lietuvoje-plinta-zaibiskai-n1558708
  (`a-tv3masine`). Secondary (press, quoting the police).
- F219. **€447.78 after the first search link** (silutesnaujienos.lt, 2026-08-12, Tauragė police): „Vyras,
  interneto paieškoje pasirinkęs pirmą pasitaikiusią nuorodą prisijungti prie savo banko, pateko į sukčių
  sukurtą svetainę. Netrukus iš jo banko sąskaitos buvo pasisavinta 447,78 eurai." Advice: „Prie elektroninės
  bankininkystės junkitės tik įvesdami oficialų banko interneto adresą arba naudodamiesi banko programėle."
  The bank is not named, and it is not said the link was an ad. Source:
  https://www.silutesnaujienos.lt/lt/policija-ispeja-nepasitikekite-sukciais-nuomotojais/ (`a-silutes`).
  Secondary (press, a police release).
- F220. **Citadele's security page** (no date; read 2026-10-31): a scammer may place a link „kuri gali atrodyti
  kaip reklama interneto paieškos sistemoje" so that it shows as the first result; „nepatikrinus nepatariama
  atidaryti pirmosios svetainės, pažymėtos kaip reklama". If you suspect fraud, phone the bank at once and tell
  the police: „Mes užblokuosime tavo mokėjimo kortelę ir interneto banką". Its site is www.citadele.lt. Source:
  https://www.citadele.lt/lt/useful/security/ (`a-citadele`). Primary (a bank).
- F221. **Near-perfect copies** (Lietuvos bankų asociacija, atpazinksukciu.lt, no date, © 2026): „Dabar sukčiai
  sukuria kone tobulus svetainių dublikatus, todėl akivaizdžių skirtumų galite ir nepastebėti." Source:
  https://atpazinksukciu.lt/ (`a-atpazink`). Primary.
- F222. **Reporting a Google ad** (Google's Lithuanian help „Pranešimas apie skelbimą", no date, machine-
  translated in part): on the ad choose „Daugiau" or „Informacija", then „Pranešti apie skelbimą", choose a
  reason, fill in the form, „Pateikti". For phishing „galite pateikti svetainės, kuria skelbime apsimetama,
  pavadinimą"; without a Google account you give an email address. „Pranešus apie skelbimą jis
  neužblokuojamas." Source: https://support.google.com/My-Ad-Center-Help/answer/13861201?hl=lt
  (`a-gadreportlt`). Primary.
- F223. **Swedbank, after a fake link** (ELTA via sekunde.lt, 2026-10-27, on an email lure): „Jau paspaudę
  nuorodą ir suvedę savo duomenis žmonės raginami susisiekti su „Swedbank" oficialiais kontaktais"; to log in,
  type the address yourself or use the official app. Source: https://sekunde.lt/sukciai-siaucia-swedbank-banko-vardu/
  (`a-sekunde`). Secondary (press, the bank's statement).
- **Not used** (2026-10-31): Luminor's relay of an NKSC figure (about 59,000 DNS-firewall hits a day in March;
  every kind of blocked site, not bank fakes); Google's EU-wide financial-advertiser verification (blog,
  2026-06-23: a rollout, which proves nothing about fakes today), Google's 2025 Ads Safety Report and Meta's 2025
  scam-ad removals (global numbers); a Hungarian competition-authority case against Google over fake MBH Bank
  ads (2025-11-17, a suspicion, foreign); Febelfin 2023 (foreign); Artea via LRT 2026-08-04 (an email/SMS lure).
  **Not found:** Meta's own steps for reporting an ad (its help pages gave no text); a 2025–2026 Lithuanian case
  of money lost through a bank ad on Facebook or Instagram (only F138, 2025-01); the official login addresses of
  Swedbank, Luminor and Revolut on a page that could be read; an NKSC count of fake bank domains; Artea's and
  Šiaulių bankas's own notices (bot challenge).

**B21. The fake app from a link or an ad** (read by Opus on 2026-11-01, from the raw HTML of each page; found by
a Sonnet research agent the same day; for the fake-app scenario). lb.lt, nksc.lt, 15min.lt and revolut.com answered
the agent with 403 or a bot challenge. Google's Lithuanian help pages carry no date; they are dated by when they were
read. Raw pages: `%TEMP%\kurj\g-*.html.txt`.

- F224. **Luminor: the fake „TikTok 18+" and what it does** (Luminor's release, alkas.lt, 2026-07-11, „Parengta
  pagal „Luminor" pranešimą"; Mindaugas Kutkaitis, head of fraud prevention; the same story is F133 on LRT,
  2026-07-09): „atsisiuntus neoficialias programėles, pristatomas kaip „TikTok 18+" versijas suaugusiesiems, į
  įrenginį gali būti įdiegta kenkėjiška programinė įranga, leidžianti sukčiams perimti telefono kontrolę, stebėti
  veiksmus ir pasisavinti prisijungimo prie banko duomenis"; it is „dažniausiai platinama per neoficialias
  programėlių parduotuves arba reklamuojama socialiniuose tinkluose"; „Tokia kenkėjiška programinė įranga gali
  registruoti klavišų paspaudimus, fiksuoti ekrano vaizdą, skaityti SMS žinutes, perimti pranešimus bei naudotis
  specialiomis „Android" prieinamumo funkcijomis"; „ši schema išsiskiria tuo, kad žmogus pats į savo telefoną
  įsileidžia kenkėjišką programą"; some versions are shown „kaip „Google Play Services" komponentai, todėl gali
  atrodyti, kad telefone vyksta įprasti sistemos procesai". It is about Android only and gives no count of cases.
  Source: https://alkas.lt/2026/07/11/programele-galinti-atverti-kelia-prie-jusu-banko-saskaitos/ (`g-alkasapp`).
  Secondary (press, the bank's release).
- F225. **Luminor: the advice** (the same release): „programėles atsisiųsti tik iš oficialių parduotuvių, tokių kaip
  „Google Play""; „Jei programėlė siūloma per socialinių tinklų reklamą, žinučių nuorodas ar neoficialias svetaines,
  reikėtų būti itin atsargiems"; „verta kritiškai vertinti pažadus apie išskirtinį ar ribojamą turinį, nes būtent
  smalsumas dažnai tampa pagrindiniu sukčių ginklu"; never grant excess permissions, „ypač susijusių su prieinamumo
  (angl. „Accessibility") funkcijomis, SMS žinutėmis ar įrenginio administratoriaus teisėmis, jei jų veikimui to
  nereikia"; „Pastebėjus neįprastą telefono veikimą, netikėtai atsiradusias programas, nepažįstamus pranešimus ar
  įtartinas banko sąskaitos operacijas, reikėtų nedelsiant kreiptis į savo banką ir atlikti įrenginio patikrą." It
  does not say how to check the device. Source: as F224. Secondary.
- F226. **Google: who asks you to install** (Google's Lithuanian Android help, „Leisti diegti programas iš
  nepatvirtintų kūrėjų", no date, read 2026-11-01): „Aferistai dažnai prisistato kaip banko apsaugos nuo sukčiavimo
  specialistai, techninio palaikymo ar pristatymo tarnybų atstovai ir prašo atsisiųsti netikras programas. Jei kyla
  abejonių, susisiekite su organizacija naudodami patvirtintą pagalbos liniją arba oficialią svetainę." (English:
  "Scammers often pose as bank fraud agents, technical support, or delivery services and ask you to download
  inauthentic apps.") The page does not say whether developer verification applies in Lithuania. Source:
  https://support.google.com/android/answer/17588095?hl=lt (`g-gunverif_lt`, `g-gunverif_en`). Primary.
- F227. **Google: restricted settings and accessibility** (Google's Lithuanian Android help, „Informacija apie
  apribotus nustatymus", no date, read 2026-11-01; the page notes its Lithuanian is machine-translated): „Žalingos
  programos gali prašyti pakeisti nustatymus, dėl kurių gali kilti pavojus įrenginiui ar duomenims"; „Naudodama
  pritaikomumo nustatymus, programa gali skaityti ekrane rodomą turinį ir sąveikauti su programomis jūsų vardu";
  „Nerekomenduojame leisti apribotų nustatymų, nebent pasitikite programos kūrėju." Its signs of a scam: „Su jumis
  susisiekta be priežasties" (they may claim „kad praleidote pristatymą ar balso pašto pranešimą"); „Programose
  paprastai paaiškinama, kodėl leidimas ar nustatymas turi būti pakeistas, prieš prašant jį pakeisti"; „Per gerai,
  kad būtų tiesa". The switch is named „Leisti apribotus nustatymus". Google writes „pritaikomumo", Luminor
  „prieinamumo" (F224, F225); the Suktas page names both, Google's names only „pritaikomumo". Source: https://support.google.com/android/answer/12623953?hl=lt
  (`g-grestr_lt`). Primary.
- F228. **Google Play Protect** (Google's Lithuanian help, no date, read 2026-11-01): „Ją naudojant gali būti
  neleidžiama įdiegti programos, kuri nėra patvirtinta ir kurioje naudojami svarbūs įrenginio leidimai, dažnai
  naudojami aferistų, siekiant vykdyti finansinę apgaulę"; „Ji tikrina, ar įrenginyje nėra žalingų programų iš kitų
  šaltinių"; „Ji gali išaktyvinti arba pašalinti žalingas programas iš įrenginio"; and „galite ją išjungti". „Gali",
  not „will": it is no promise, and no page says the fraud blocking is on in Lithuania. Source:
  https://support.google.com/googleplay/answer/2812853?hl=lt (`g-gpp`). Primary.
- F229. **The Android switch that lets a link install an app** (Google's Lithuanian Pixel help, no date, read
  2026-11-01): to install from outside the store, „Atidarytame pranešime palieskite Nustatymai. Įjunkite Leisti iš
  šio šaltinio"; the list of apps allowed to do so is under „Nežinomų programų diegimas". Other makers' menus may
  name it differently. F134's warning about unknown sources is on `g-gunk`. Source:
  https://support.google.com/pixelphone/answer/7391672?hl=lt (`g-gpixel7391672_lt`). Primary.
- F230. **Google: removing a harmful app** (Google Account help, Lithuanian, no date, read 2026-11-01): turn on Play
  Protect, install updates, „Pašalinkite visas programas, kurių nereikia, kuriomis nepasitikite arba kurias gavote ne
  iš „Google Play" parduotuvės", run the Security Checkup; „Jei randate kenkėjiškų programų ženklų, gali reikėti iš
  naujo nustatyti „Android" įrenginį arba paprašyti įrenginio gamintojo pagalbos." It says nothing of the bank,
  disconnecting, safe mode or administrator rights. Source:
  https://support.google.com/accounts/answer/9924802?hl=lt&co=GENIE.Platform%3DAndroid (`g-gmal9924802_lt`). Primary.
- F231. **Samsung: change passwords from another device** (Samsung Lithuania support, last updated 2025.09.16, for
  Galaxy phones): „jei telefone radote kenkėjišką programėlę arba jame buvo virusas, turite pakeisti savo slaptažodžius
  ir PIN kodus kuo greičiau. Nepamirškite jų pakeisti kitame įrenginyje". Source:
  https://www.samsung.com/lt/support/mobile-devices/kaip-apsaugoti-samsung-galaxy-telefona-nuo-sms-sukciavimo-apgaulingo-nukreipimo-ir-snipinejimo-programeliu/
  (`g-samsung`). Primary for Samsung; the advice is general.
- F232. **Apple: profiles that control the iPhone** (Apple's Lithuanian support, „Atpažinkite ir venkite socialinės
  inžinerijos schemų", published 2026 m. birželio 21 d.): „Tai taikoma ir programoms, kurios prašo įdiegti
  konfigūracijos profilius, kurie gali valdyti jūsų įrenginį"; „diekite programinę įrangą iš „App Store" arba
  atsisiųskite ją tiesiogiai iš kūrėjo svetainės." No Apple page says iPhones are a target of this scam. Source:
  https://support.apple.com/lt-lt/102568 (`g-apple102568lt`). Primary.
- F233. **Šiauliai, 2026: an app installed on a caller's word** (LRT, 2026-06-26, relaying the police): a man born in
  1949 said that on 16 June callers who spoke Russian, „prisistatę banko darbuotojais, įtikino jį telefone įdiegti
  nuotolinio prisijungimo programėlę ir atiduoti banko korteles", and 131,8 tūkst. eurų were taken from his
  account. A call, not a link or an ad; the remote-access route of F51. Source:
  https://www.lrt.lt/naujienos/lietuvoje/2/2972029/rusiskai-kalbeje-sukciai-is-siauliecio-isviliojo-131-8-tukst-euru
  (`g-lrt2972029`). Secondary (press, the police's report).
- F234. **An administrator app must lose its rights before it can be removed** (Android Developers, English, page
  updated 2026-10-28): "To uninstall an existing device admin app, users need to first unregister the app as an
  administrator." Written for developers, not victims; no Lithuanian menu path was found. Source:
  https://developer.android.com/work/device-admin (`g-androiddevadmin`). Primary, foreign.
- **Not used** (2026-11-01): Google's 2025 Play report (Play Protect's fraud blocking "in 185 markets", 266 million
  blocked installs; no list of markets); McAfee's Xloader via tv3.lt (2024-02-28, foreign malware); Samsung's safe mode
  (Galaxy only) and its line that malware is rare; SEB's English infohub (overlaps F7); Apple's alternative
  marketplaces in the EU (`g-apple118110lt`, no scam warning); a DPD SMS (LRT 2026-07-02: a fake page, not an app);
  RRT's 5.73 million blocked SMS of 2025 (all links, not apps); an LRT piece of 2023-01-19 on AnyDesk by phone (old,
  the bank not named in the saved text); Luminor's repeat in Mūsų žodis (2026-10-13, the same as F133).
  **Not found:** a Lithuanian case of money lost through an app installed from a link, an SMS or an ad; a count of
  such cases; a Lithuanian bank naming a fake app of its own; which phone to call the bank from, and whether to turn
  the phone off first; the Lithuanian menu path for taking away administrator rights; NKSC's advice via 15min (403;
  seen only as a search snippet, so not a fact).

---
**B22. The fake QR code** (read by Opus on 2026-11-01, from the raw text of each page; found by a Sonnet research
agent the same day; for the QR-code scenario). nksc.lt, luminor.lt, vmi.lt, policija.lrv.lt, lb.lt, 15min.lt and
support.signal.org answered the agent with 403. WhatsApp's help renders only in a browser, and its Lithuanian locale
gave English. Raw pages: `%TEMP%\kurj\q-*.html.txt` (WhatsApp: `q-wa-*.rendered.txt`). F101 and F35 were re-read for
it (their entries above).

- F235. **Vilnius, August 2026: the stickers again** (the Šnipiškių seniūnija's Facebook post, quoted by
  kauno.diena.lt, 2026-08-06, and tv3.lt, 2026-08-05): „Dėmesio – sukčiai ant parkomatų klijuoja netikrus QR kodų
  lipdukus! Juos nuskenavus patenkama į suklastotą mokėjimo puslapį. Suvedus banko kortelės duomenis, pinigai
  atitenka sukčiams. Neskenuokite papildomai ant parkomatų užklijuotų QR kodų. Pastebėję lipdukus klijuojančius
  asmenis, jei saugu, juos fotografuokite ar filmuokite ir skambinkite policijai numeriu 112. Už automobilio
  stovėjimą rekomenduojame atsiskaityti saugiai – naudojantis oficialia JUDU programėle". No count of victims, no
  amount. Sources: https://kauno.diena.lt/naujienos/kriminalai/jokiais-budais-neskenuokite-siu-qr-kodu-1769024
  (`q-diena-qr`) and https://www.tv3.lt/naujiena/gyvenimas/vairuotojams-skubus-ispejimas-pamate-toki-koda-jokiu-budu-neskenuokite-n1541504
  (`q-tv3-vairuotojams`). Secondary (press quoting the seniūnija).
- F236. **Kretinga, August 2026: the police warn** (ve.lt, 2026-08-16): „Dėmesio – sukčiai ant parkomatų klijuoja
  netikrus QR kodų lipdukus. Nuskenavus tokį QR kodą, atveriamas suklastotas mokėjimo puslapis. Jame suvedus banko
  kortelės duomenis, pinigai gali būti pavogti", say the Kretinga district police's community officers; anyone seeing
  stickers being put on should, if safe, photograph or film it „ir nedelsdami praneškite policijai telefonu 112". It is
  a warning, not a reported case with victims. Source: https://ve.lt/kriminalai/policija-ispeja-vairuotojus-sukciai-jau-naudoja-ir-parkomatus
  (`q-ve-parkomatai`). Secondary (press quoting the police).
- F237. **Luminor: codes on posters and at ATMs** (Luminor's press release, tv3.lt, 2025-09-26): „sukčiai klijuoja
  netikrus kodus viešose vietose, ant afišų, skelbimų lentose ar net prie bankomatų"; the code leads to „suklastotą
  interneto svetainę, kuri vizualiai primena banko ar kitos institucijos puslapį", which may ask for internet-bank
  login or card numbers. Its rules: „Neskanuokite jokių QR kodų, esančių banko padaliniuose ar prie bankomatų (jei banko
  darbuotojai, dirbantys skyriuje, to neprašo)"; „Bankai ar valstybinės institucijos niekada neprašys jūsų prisijungimo
  prie interneto banko ar mokėjimo kortelių duomenų, PIN kodų ar kitokios konfidencialios informacijos per įtartinas
  nuorodas ar viešus QR kodus"; „Norėdami prisijungti prie interneto banko, visada rinkitės oficialią programėlę arba
  interneto svetainę"; report a suspicious code on an ATM or poster to the bank. Source:
  https://www.tv3.lt/naujiena/gyvenimas/pribloske-nauja-sukciu-afera-lietuvoje-skubiai-ispeja-visus-n1455417
  (`q-tv3-afera`). Secondary (press, the bank's release).
- F238. **What „quishing" is** (Visuotinė lietuvių enciklopedija, „duomenų viliojimas", undated, read 2026-11-01):
  „Duomenų viliojimas naudojant QR kodus (angl. quishing) yra palyginti naujas duomenų viliojimo būdas"; the codes hide
  links that „neaptinka elektroninio pašto filtravimo programos"; „Nuskaitęs kodą vartotojas nukreipiamas į sukčių
  svetainę"; „Vartotojai dar nėra įpratę tikrinti QR kodų, siunčiamų elektroniniu paštu, skelbiamų socialiniuose
  tinkluose, skelbimuose spaudoje ar kaip lipduko užklijuoto ant tikro QR kodo"; protection: „tikrinti šaltinio,
  atsiuntusio kodą, patikimumą arba tiesiog neskenuoti kodo"; „Lietuvoje duomenų viliojimo atakos dažniausiai būna
  nukreiptos prieš bankų klientus". Source: https://www.vle.lt/straipsnis/duomenu-viliojimas/ (`q-vlephish`). Primary
  (an encyclopedia, not an authority on cases).
- F239. **The phone shows the link before it opens it** (Google's Pixel help in Lithuanian, undated, read 2026-11-01):
  „Fotoaparatas automatiškai atpažįsta kodą ir ekrane pateikia debesėlį arba nuorodą. Jei norite atidaryti, palieskite
  rodomą nuorodą." Pixel phones only; whether the whole address is shown is not said. Source:
  https://support.google.com/pixelphone/answer/16561572?hl=lt (`q-google-pixel-lt`). Primary.
- F240. **A QR code that links a WhatsApp account to his device** (Singapore Police Force, 2026-02-10; foreign): messages
  from known contacts ask the victim to vote for a friend's child and to „verify" by an OTP or „by scanning a QR code.
  Unbeknownst to the victims, by entering the OTP or scanning the QR code on their WhatsApp accounts, they were in fact
  authorising the scammers' devices with access to their WhatsApp accounts." „While no losses have been reported so
  far"; remove unknown devices in „'Settings' > 'Linked Devices'" and turn on two-step verification. No Lithuanian
  source describes this route; NKSC's general advice is F42. Source:
  https://www.police.gov.sg/Media-Hub/News/2026/02/20260210_police_advisory_involving_the_compromise_of_whatsapp_accounts
  (`q-f-sgpolice-wa`). Primary, foreign.
- F241. **WhatsApp: logging a linked device out** (WhatsApp Help Center, „How to unlink a device", undated, English
  under the Lithuanian locale, read 2026-11-01): open WhatsApp on the primary phone, tap „Linked devices", tap a device,
  „Tap Log out". Source: https://faq.whatsapp.com/834124628020911 (`q-wa-unlink.rendered`). Primary.
- **Not used** (2026-11-01): kaipkada.lt's own advice (2026-08-07; a site, not an institution; the bank and police
  steps are F7, F13 and F2); Enefit on charger stickers (paninfo.lt, 2025-11-08: „kol kas tokių atvejų Lietuvoje
  nefiksuojame"); reidasofficial.lt's foreign cases (Kraków 2023, German cities, and a Dutch court of 2026-09 holding a
  driver who paid through a fake code liable for the parking fee: foreign press); Google Threat Intelligence on Signal
  (foreign, overlaps F240); FBI IC3 and Poczta Polska (foreign); cert.lv via LSM, „Most phones allow you to see where a
  link will lead" (foreign press; F239 says it for Pixel); Smart-ID's English pages on scanning inside its own app
  (F34 and F35 cover it); the police's „virtualus patrulis" line on „apgaulingais QR kodais" (tv3.lt, 2024-12-03, no
  scene).
  **Not found:** a Lithuanian QR case with a victim or an amount; any count of QR cases; a Lithuanian source on a QR
  code linking a WhatsApp, Telegram or Signal account (NKSC's site was blocked); a QR code on a letter, a parcel notice,
  a fine or an e-mail in Lithuania; a Lithuanian source on what an iPhone shows before opening a code.

**B23. Phishing: the word, the forms, the signs and what to do** (read by Opus on 2026-11-01, from the raw text of each
page, every quote checked by script against the saved page; found by a Sonnet research agent the same day; files in
`%TEMP%\kurj\`, prefix `ph-`)
- F242. **What it is** (Visuotinė lietuvių enciklopedija, „duomenų viliojimas", undated, read 2026-11-01): „duomenų
  viliójimas, fšingas (angl. phishing)", „sukčiavimo būdas, kai apsimetant patikimu fiziniu ar juridiniu asmeniu
  siekiama išgauti neskelbtiną informaciją, pvz., vartotojų vardus ir slaptažodžius, banko sąskaitas, mokėjimo ir kredito
  kortelių numerius ir kita". „Terminas fišingas pirmą kartą pavartotas apie 1995. Jis kilo iš žodžių junginio slaptažodžių
  žvejyba (angl. password fishing)." „Duomenų viliojimas yra viena iš socialinės inžinerijos formų, kai naudojant įvairius
  manipuliavimo būdus žmogus pats atiduoda sukčiams slaptažodžius ar kitą jautrią asmeninę informaciją." The headword's
  „fšingas" is a typo on the page; its own text spells „fišingas". Source: https://www.vle.lt/straipsnis/duomenu-viliojimas/
  (`q-vlephish`). Primary (an encyclopedia).
- F243. **Its forms, by VLE** (same page): SMS, „dar vadinama smišingu (angl. smishing)"; fake sites, „sukuriama į
  oficialią panaši svetainė, kurioje prašoma įvesti slaptažodžius ar kitą vartotojų informaciją"; phone calls, where
  „sukčiai apsimeta oficialių institucijų atstovais", „toks būdas vadinamas višingu (angl. vishing)"; QR codes are F238.
  Same source. Primary.
- F244. **Why it works, and why bad grammar is no longer a reliable sign** (same page): „Suklastotuose pranešimuose
  paprastai reikalaujama nedelsiant imtis veiksmų, skatinamas skubotumo jausmas, žmogui neduodama laiko pagalvoti,
  siekiama sukelti emocijas, kad nesuveiktų asmens savisaugos mechanizmai." „Tobulėjant automatinio vertimo įrankiams ir
  dirbtinio intelekto technologijoms suklastoti elektroniniai laiškai bei žinutės tampa vis sunkiau atskiriamos nuo tikrų
  laiškų ar žinučių." Same source. Primary.
- F245. **The colloquial words are acceptable** (Valstybinė lietuvių kalbos komisija, consultation „Fišingas (phishing),
  sukčiavimas", page undated; the view was „aptarta 2024 m. lapkričio 14 d. posėdyje"): „šnekamojoje kalboje pavartojama
  adaptuota forma fišingas, kaip ir kitų sukčiavimo formų pavadinimai višingas (bandymas išgauti duomenis per tiesioginį
  pokalbį), smišingas (siekimas išgauti duomenis naudojant SMS žinutes), toleruotina laisvuosiuose stiliuose". The VLKK
  term bank itself has no „phishing" entry. Source: https://vlkk.lt/konsultacijos/8403-fisingas-phishing-sukciavimas
  (`ph-vlkk-cons`). Primary.
- F246. **NKSC's word** (NKSC, „Duomenų vagystė „phishing"", undated): a fraud against organisations or people „kai
  pasinaudojant nepageidaujamomis elektroninio pašto žinutėmis ar falsifikuotais internetiniais tinklalapiais siekiama
  išgauti prisijungimo prie informacinių sistemų slaptažodžius bei kitus konfidencialius duomenis". The same page says a
  fake site's address almost always starts with http, not https; that is not used (below). Source:
  https://www.nksc.lt/rekomendacijos/phishing.html (`ph-nksc-phish`). Primary.
- F247. **One of the most common frauds in Lithuania** (Lietuvos bankas, „Duomenų viliojimas", last updated 2024-10-25):
  „Tai vienas bene dažniausių Lietuvoje sukčiavimo būdų, kai siunčiamos suklastotos SMS, pokalbių programėlių („WhatsApp",
  „Viber" ar kt.) žinutės arba elektroniniai laiškai, primenantys finansų įstaigų, teisėsaugos institucijų ar kitų subjektų
  pranešimus." SMS in a bank's name come „dažniausiai įspėjant vartotoją apie įtartinus veiksmus jo sąskaitoje, būtinybę
  atnaujinti interneto banko paskyrą, užkirsti kelią paskyros praradimui ir pan.". On a fake bank site people enter their Smart-ID PIN, „o kartais vartotojų vardu net sukuriama nauja
  „Smart-ID" programėlės paskyra trečiųjų asmenų (t. y. sukčių) kontroliuojamame įrenginyje". Source:
  https://www.lb.lt/lt/duomenu-viliojimas (`ph-lbphish`; the courier scheme on the same page is F147). Primary.
- F248. **The signs, by Lietuvos bankas** (same page): „Sukčių siunčiamuose pranešimuose dažnai pasitaiko gramatikos,
  rašybos, logikos klaidų. Įtarimų gali kelti siuntėjų elektroninio pašto adresų ir pateikiamų nuorodų autentiškumas
  (nurodomas ne visas banko pavadinimas, įterpiama skaičių arba kitų raidžių), elektroninio laiško priedai dažnai būna
  keisto formato ar pavadinimo dokumentai." Same source. Primary. Read with F244: the grammar sign is weakening.
- F249. **What a bank does not ask, and how to check** (same page): finance staff „neprašo prisijungti prie interneto
  banko, neklausia sąskaitos ar mokėjimo kortelės duomenų"; in doubt, end the call and „paskambinti savo bankui viešai
  skelbiamu numeriu, kurį rasite banko interneto svetainėje. Jokiu būdu neatskambinkite tuo numeriu, iš kurio buvo
  skambinta"; „Visada prie finansų įstaigų svetainių prisijunkite tiesiogiai, o ne spustelėdami elektroniniame laiške
  pateiktas nuorodas"; „Tikrinkite „Smart-ID" pranešimų turinį – dažnai nurodoma, kokia operacija autorizuojama". The
  same sentence says staff „niekada neskambina savo klientams"; that part is not used (below). Same source. Primary.
- F250. **The 2021 sign list** (Lietuvos bankas, news, 2021-02-26): „Finansų įstaigos nesinaudoja tokiais bendriniais el.
  pašto adresais kaip Gmail, Yahoo, Yandex, Hotmail ar pan."; „Po įprastai atrodančia nuoroda dažnai slepiasi visiškai kita
  nuoroda"; „Atidarius užkrėstą dokumentą, gali būti užvaldytas kompiuteris"; the pressure: „Tuo siekiama sukelti streso
  būseną, kad žmogus nesvarstydamas atliktų sukčių reikalaujamus veiksmus." After the fact: „Jeigu vis dėlto įkliuvote į
  sukčių pinkles ir įtariate, kad iš jūsų buvo nutekinti duomenys ar užkrėstas jūsų įrenginys, nedelsdami susisiekite su
  savo banku. Jokiu būdu netvirtinkite Smart-ID programėle ar mobiliuoju elektroniniu parašu užklausų, kurių patys
  neinicijavote. Be to, iš karto pasikeiskite savo slaptažodį tose paskyrose (el. pašto, programėlių ir kt.), kuriose jį
  prieš tai naudojote." Source: https://www.lb.lt/lt/naujienos/demesio-saugokites-sukciu-siunciamu-pranesimu
  (`ph-lb-demesio`). Primary.
- F251. **No link asks for security data, and receiving money needs no confirmation** (Lietuvos bankas, news,
  2023-04-26): „Finansų įstaigos savo klientams niekada nesiunčia žinučių ar elektroninių laiškų su nuorodomis, kuriose
  prašo suvesti mokėjimų saugos duomenis"; to receive money one need not confirm one's identity „nei Smart ID
  programėlėje"; „Jeigu gauta žinutė pasirodė įtartina, eikite į oficialią finansų įstaigos ar institucijos interneto
  svetainę, prisijunkite prie savo paskyros ir patikrinkite, ar išties gavote pranešimą." Source:
  https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-apie-itin-suaktyvejusius-finansinius-sukcius (`ph-lbnew`). Primary.
- F252. **If it already happened** (Lietuvos bankas, „Pakliuvau sukčiams: ką daryti?", last updated 2026-07-30):
  „Nedelsdami kreipkitės į savo mokėjimo paslaugų teikėją (banką, el. pinigų ar kitą įstaigą)"; „Finansų įstaigos kai kuriais atvejais dar turi galimybę
  sustabdyti tokio pobūdžio mokėjimus ir išgelbėti Jūsų pinigus"; „Jei tai mokėjimo
  kortelės duomenų vagystė – kuo skubiau ją užblokuokite"; „Informuokite Lietuvos policiją"; „Taip gali nutikti bet kam,
  patekti į sukčių pinkles nėra ir neturėtų būti gėda". Source: https://www.lb.lt/lt/pakliuvau-sukciams-ka-daryti
  (`ph-lb-pakl`). Primary.
- F253. **An attachment already opened** (Swedbank blog, 2020-07-27): „Jeigu prisegtą failą visgi atidarėte, tikėtina, kad
  jūsų kompiuteris gali būti apkrėstas kenkėjiška programa. Iš tokio kompiuterio jokiu būdu nesijunkite prie savo el.
  bankininkystės paskyros." „Rekomenduojama kompiuterį atjungti nuo tinklo ir perduoti specialistams". Source:
  https://blog.swedbank.lt/saugumas/swedbank-perspeja-sukciai-siuntineja-fiktyvius-el-laiskus (`ph-swed-fikt`). Primary
  (a bank).
- F254. **Not by e-mail, and find the contact yourself** (Swedbank blog, 2020-07-27): „Nei bankų, nei valstybės
  institucijų darbuotojai tokių dalykų e. paštu niekada neprašo" (personal data and logins); to check, call the sender
  directly, „tačiau kontaktų ieškokite savarankiškai – laiške jie gali būti klaidingi". Source:
  https://blog.swedbank.lt/spaudos-pranesimai-asmeniniai-finansai-saugumas/swedbank-saugumo-ekspertai-5-budai-kaip-atpazinti
  (`ph-swed-5`). Primary (a bank). Its https advice is not used (below).
- F255. **The pressure, and what he already knows** (Swedbank, „Saugi bankininkystė", undated): „Bendraudami su Jumis,
  sukčiai pasitelkia įvairias manipuliavimo technikas: jie jus giria, bara, skubina, spaudžia priimti sprendimą." „Nesutrikite
  dėl to, kad sukčiai žino Jūsų vardą, pavardę, asmens kodą", „tokia informacija neretai yra viešai prieinama". Source:
  https://www.swedbank.lt/private/d2d/ebanking/secureBanking?language=LIT (`ph-swed-secure`; F8 is the same page).
  Primary (a bank).
- F256. **Fake results in search, and what the bank can still do** (SEB, „Saugumas internete", undated): „Jūsų duomenys
  gali būti perimami ir paieškos puslapiuose (tokiuose, kaip „Google") ieškant dažnai naudojamų valstybinių įstaigų (VMI,
  „Sodra", „E.sveikata")"; the move: „Patiems suvesti teisingą norimos interneto svetainės adresą arba gerai patikrinti
  paieškos sistemos pasiūlytų svetainių adresus". Told in time, SEB lists that it „galime atšaukti arba užginčyti pervedimą
  ar operaciją kortele"; but „jei patys pervedėte pinigus sukčiui ar atskleidėte jam savo duomenis, susijusius su banko
  sąskaita, bankas jūsų prarastų pinigų negalės grąžinti". SEB's rules only. Source: https://www.seb.lt/saugumas-internete
  (`ph-seb-saug`). Primary (a bank).
- F257. **Blocked scam SMS and calls, first quarter of 2026** (RRT, 2026-05-28): operators „užblokavo daugiau kaip 13,8
  mln. skambučių iš užsienio su suklastotais numeriais"; „blokuotų apgaulingų trumpųjų žinučių (SMS) skaičius išaugo beveik
  30 proc. iki 2,12 mln". Source: https://rrt.lt/naujienos/pirmaji-ketvirti-lietuvoje-uzblokuota-13-8-mln-apgaulingu-skambuciu-ir-2-12-mln-sms
  (`ph-rrt-q1`). Primary. Blocked messages, not phishing cases; F100 counts 2025.
- F258. **Second quarter of 2026, and RRT's advice** (LRT/ELTA, 2026-08-10, quoting RRT): „Lietuvos ryšio operatoriai
  antrąjį šių metų ketvirtį užblokavo 2,78 mln. apgaulingų skambučių ir 1,22 mln. apgaulingų trumpųjų SMS žinučių";
  „sukčiavimas neišnyko". Advice: „nespausti joje pateiktų nuorodų, neatidaryti įtartinų priedų, neatskleisti asmens,
  elektroninės bankininkystės ar kitų prisijungimo duomenų ir netvirtinti mokėjimo operacijų, kurių pats vartotojas
  neinicijavo"; „Taip pat reikėtų užblokuoti siuntėją ir pažymėti žinutę kaip šlamštą ar sukčiavimą pačioje
  susirašinėjimo programėlėje." Source:
  https://www.lrt.lt/naujienos/verslas/4/3017140/lietuvos-rysio-operatoriai-per-ketvirti-uzblokavo-2-78-mln-apgaulingu-skambuciu
  (`ph-lrt-q`). Secondary (press quoting RRT).
- F259. **Reporting to NKSC** (NKSC, „Pranešti", undated): when unsure which form to use, write to cert@nksc.lt (the page
  hides the address from scripts; decoded from its HTML); the site form covers „smishing, phishing, spear phishing, fraud";
  calls and messages reported go to RRT („perduodama Lietuvos Respublikos ryšių reguliavimo tarnybai"); „Asmenys
  nukentėję nuo sukčiavimo veiklos turėtų kreiptis į Lietuvos policiją". Sources: https://www.nksc.lt/pranesti.html,
  /pranesti-svetaine.html, /pranesti-zinute.html (`ph-nksc-pran`, `ph-nksc-svet`, `ph-nksc-zinute`). Primary. The forms
  themselves are F17 and F18.
- **Not used** (2026-11-01): the https and padlock advice on NKSC's phishing page and in Swedbank's 2020 post (fake
  sites can carry https too, but no source we read says so, so the page says nothing about https either way);
  Lietuvos bankas's „finansų įstaigų darbuotojai niekada neskambina savo klientams" (Swedbank writes as if it does call,
  so the page says only what a bank never asks for); OP Bank's and Citadele's English pages (the bank and police calls are
  F23–F25); ESET's ten steps (a vendor); Lietuvos bankas's 2023 survey, 39% met financial fraudsters in three years (old,
  and fraud, not phishing); NKSC's 2025 report, about 76,000 harmful domains blocked (not phishing only); SEB's 2022 line
  that callers mostly speak Russian (dated); Luminor's QR warnings (F237 covers them); the VLKK term bank's „apgaulingas
  laiškas" (a scam e-mail, not the method); each bank's own phone numbers and e-mail addresses (they change; the page
  sends the reader to the bank's official site); SEB's and Swedbank's single-bank rules (WhatsApp and Viber, @swedbank.lt).
  **Not found:** police guidance on phishing itself; a Lithuanian definition of spear phishing (NKSC only names it); a
  Lithuanian word for quishing (F238 says „duomenų viliojimas naudojant QR kodus"); a count of phishing cases beyond F109;
  an official Lithuanian source saying https or a padlock does not make a site safe.

**B24. The fake seller: a deposit or a transfer for goods that never come** (read by Opus on 2026-11-01, from the raw
text of each page; found by a Sonnet research agent the same day; for the fake-seller scenario, the buyer's side of B13).
policija.lrv.lt, policija.lt, vvtat.lrv.lt, 15min.lt, autoplius.lt, every vinted.lt page and Meta's help pages answered
with a block or a script shell, so the police's and VVTAT's words are read through republications that name them. Raw
pages: `%TEMP%\kurj\s-*.html.txt`.

- F260. **Vinted: "there is no BUY button"** (TV3, 2026-10-09, a Facebook warning by the Ukmergė district police
  station, with Vinted's comment): the "seller" „Teigia, kad prekė nepasiekiama per platformą – sako, kad nėra mygtuko
  „PIRKTI“, nes prekė yra didelė, negabaritinė, per brangi ar dėl kitų tariamų priežasčių." „Prašo pervesti pinigus
  tiesiai į savo sąskaitą – taip apeina „Vinted“ saugos sistemą". „Prekės dažnai taip ir negaunate – po pavedimo sukčiai
  dingsta, o jūsų pinigai negrįžta." Advice: „Naudokite „Vinted“ integruotą pirkimo funkciją"; „Nesiųskite pinigų
  tiesiai į pardavėjo sąskaitą, net jei jis prašo to daryti". Vinted: „norint patvirtinti mokėjimą ar gauti užsakytą
  prekę, nereikia išeiti iš platformos ar spausti jokių nuorodų". The article also prints a sample scam message, not
  used (§6.10). Source: https://www.tv3.lt/naujiena/gyvenimas/populiarioje-platformoje-daiktus-perkantiems-lietuviams-policijos-zinia-n1558170
  (`s-tv3vinted`). Secondary (press quoting the police and Vinted). What Vinted's buyer protection covers is not read
  (vinted.lt blocked).
- F261. **Klaipėda county police: the seller who vanishes, and small sums** (Banga via gargzdai.lt, 2021-01-21): one form
  of online fraud is „kai pirkėjas pinigus sumoka, tačiau prekės nesulaukia, o su pardavėju kontaktas nutrūksta iškart po
  atsiskaitymo už prekę." The "sellers" „gali pasinaudoti svetimomis, kartais apie nusikalstamą veiką nieko nežinančių
  asmenų sąskaitomis". The police say people buying or selling things worth „iki 150 eurų" are often hit, and that even a
  small loss should be reported: „Vis dėlto reikėtų pranešti – sukčiams ir tokiu atveju gresia administracinė
  atsakomybė". Source: https://gargzdai.lt/sukciai-internete-iesko-patikliu-pirkeju-ir-pardaveju/ (`s-gargzdai`).
  Secondary (press quoting the police). Old; F264–F266 show the same pattern in 2026.
- F262. **Vilnius district police: a deposit before seeing the item** (vrsa.lt, 2021-04-12, the police's text on a
  Skelbiu.lt puppy scheme): „Pardavėjas prašo atsiųsti užstatą (suma svyruoja nuo 100 – 1 000 Eur) už šuniukus. Po atlikto
  pavedimo pardavėjas tampa nepasiekiamas." Advice: „Nederėtų pervesti avanso, užstato, prieš tai nepamačius prekės, kurią
  planuojate įsigyti"; „itin žema prekės kaina gali pranašauti apie pavojus". Source:
  https://vrsa.lt/titulinio-naujienos/424/demesio-saugokites-sukciu-pirkdami-suni-internetu:838 (`s-vrsa`). Secondary (a
  municipality republishing the police). Old.
- F263. **Klaipėda police: the reservation advance, and the rush** (Klaipėdos diena, 2020-11-29): a buyer finds a car
  below market price; „pardavėjas skubina – sako, kad jau ne vienas pirkėjas laukia eilėje", so to reserve it one „reikia
  pervesti avansą". The police: „surasti siūlo galą ir atgauti pinigus įmanoma, bet tai nelengva misija". Source:
  https://klaipeda.diena.lt/naujienos/verslas/ratai/sukciu-spastai-avansas-vien-uz-grazu-skelbima-998448 (`s-klpdiena`).
  Secondary. Old.
- F264. **Šilutė, a BMW X3, a €1,000 advance** (pamarys.eu, 2026-07-21, Tauragė county police): „Birželio 30 d. Šilutėje
  vyras, gim. 1991 m., radęs skelbimą apie parduodamą automobilį BMW X3, sutarė dėl jo pirkimo ir į nurodytą banko sąskaitą
  pervedė 1000 eurų avansą. Automobilio negavo, o pinigų niekas negražino." (sic). The platform is not named. Source:
  https://www.pamarys.eu/policija-apie-sukciu-sekme-siluteje/ (`s-pamarysbmw`). Secondary (regional press, police data).
- F265. **Facebook, a PlayStation 5 for €260 and a generator for €427** (pamarys.eu, 2026-10-19, Tauragė county police):
  „Spalio 13 d. Šilutėje vaikinas, gim. 2002 m., feisbuke norėdamas įsigyti „Playstation 5“ konsolę į pardavėjo sąskaitą
  pervedė pinigus, tačiau prekės negavo. Taip prarado 260 eurų." A man of 68 from Kintai, after a Facebook ad for a portable
  generator, „į nurodytą pardavėjo banko sąskaitą pervedė 427 eurus" and got nothing (25 August; the year is the page's).
  Source: https://www.pamarys.eu/policija-apie-nukentejusius-nuo-sukciu/ (`s-pamarysfb`). Secondary.
- F266. **Facebook, €6,250** (TV3 and LRT, 2026-10-20, Tauragė county police): on 30 September in Pagrynių kaimas (Šilutė
  district) a man (born 1971), „internetinėje platformoje ,,Facebook“ norėdamas įsigyti prekę, pervedė pinigus į nurodytą
  banko sąskaitą, tačiau minėtos prekės negavo." „Patirtas nuostolis – 6 250 eurų." The item is not named. Sources:
  https://www.tv3.lt/naujiena/lietuva/sukciai-is-salies-gyventoju-isviliojo-apie-26-5-tukst-euru-n1561182 ,
  https://www.lrt.lt/naujienos/lietuvoje/2/3088123/sukciai-is-sesiu-gyventoju-isviliojo-apie-26-5-tukst-euru
  (`s-tv3265`, `s-lrt265`). Secondary.
- F267. **A "company" and a deposit contract, €8,600 from seven people** (TV3/BNS, 2026-02-26, Klaipėda county police,
  who sent the case to court: the man is „kaltinamas", accused, not convicted): a man used a small partnership he founded early in 2024, which did no business, and „internete siūlydamas įsigyti
  automobilių ar jų dalių, apgaulės būdu išviliojo ir pasisavino 8,6 tūkst. eurų"; „Iš septynių nukentėjusiųjų". He
  „pasirašydavo rankpinigių sutartis, pagal kurias į įmonei priklausančią banko sąskaitą buvo sumokami avansiniai mokėjimai
  – nuo 1 tūkst. iki 2 tūkst. eurų." Source:
  https://www.tv3.lt/naujiena/lietuva/internete-pardavinejo-automobilius-ir-ju-dalis-atskleide-sukciavimo-schema-n1498504
  (`s-tv3klp`). Secondary.
- F268. **Kaunas: over 250 victims, €88,375** (LRT, 2026-08-04, the court's release): „Skelbimų portaluose buvo skelbiama
  apie tariamai parduodamus automobilius „BMW 328 Xi“, „Audi A6“ ir „Audi Q3“. Suklaidinti pirkėjai į bendrovės sąskaitą
  pervesdavo avansus už automobilių pardavimą ir atvežimą, tačiau automobiliai jiems nebuvo pristatyti." 88,375 euros
  „iš daugiau kaip 250 fizinių ir juridinių asmenų"; three years, suspended. The total also covers a phone e-shop, „www.telemaxi.lt",
  so this is the F209 Telemaxi case; the offences were „beveik aštuoneri metai" before, when M. Š. was 19, and he „nebuvo
  nusikalstamos schemos organizatorius, veikė vadovaujamas kitų asmenų". Not used on the fake-seller page for those reasons.
  Source: https://www.lrt.lt/naujienos/lietuvoje/2/3011234/daugiau-nei-88-tukst-euru-isviliojusiam-sukciui-treju-metu-laisves-atemimo-bausme
  (`s-lrt88`). Secondary (press quoting the court).
- F269. **The Banks Association: buying or selling, the fake courier link** (atpazinksukciu.lt, undated, read
  2026-11-01): „Perkate ar parduodate naudotą daiktą ar drabužį internetu? Saugokitės Skelbiu.lt, „Vinted“ ir panašiose
  platformose veikiančių sukčių. Parduodami ar pirkdami jie pateikia neva siuntų tarnybos nuorodas, kur reikia suvesti
  mokėjimo kortelės, interneto banko duomenis, sąskaitos likutį ar kitus konfidencialius duomenis." Source:
  https://atpazinksukciu.lt/ (`s-atpazink`). Primary. The only source for a seller who sends a buyer a link; no dated case.
- F270. **Skelbiu.lt asks for no card data, and the chat apps** (BNS, 2021-01-26, Skelbiu.lt's release, its head
  S. Orkinas): „Skelbiu.lt niekuomet neprašo banko kortelės duomenų tam, kad gautumėte pinigus už prekę ar patys už prekę
  atsiskaitytumėte." „Neretai sukčiai kontaktuoja per susirašinėjimo programėles (WhatsApp, Viber ir kt.)". Source:
  https://sc.bns.lt/view/item/skelbiu-lt-ispeja-sukciai-tapo-aktyvesni-kaip-juos-atpazinti-369145 (`s-bnsskelbiu`). Primary
  (the company's release). Since 2026-09-30 Skelbiu.lt does take payments (F271), so the page dates this as 2021.
- F271. **Skelbiu.lt's „Pirkti dabar" rules** (updated 2026-09-30): „Pirkėjo sumokėtos lėšos laikomos mokėjimo platformoje
  iki Sandorio užbaigimo." Users may not „susitarti dėl atsiskaitymo už Platformos ribų po Užsakymo inicijavimo"; „Platforma
  neatsako už naudotojo nuostolius, patirtus vykdant apgaulingus trečiųjų asmenų nurodymus už Platformos ribų"; between two
  private people „vartotojų apsaugos teisės, taikomos vartotojo ir verslininko santykiams, paprastai netaikomos." Source:
  https://www.skelbiu.lt/taisykles/pirkti-dabar (`s-skelbiutaisykles`). Primary. It supersedes the 2021 line that the portal
  takes no part in payments (F151 is about its chat "support", still true).
- F272. **Autoplius: no transfer before meeting and seeing the car** (TV3, 2023-04-15, Autoplius's communications
  specialist): „Pirkėjams kategoriškai rekomenduojame nepervesti pinigų automobilio pardavėjui, nesusitikus ir neapžiūrėjus
  transporto priemonės. Jeigu kyla abejonių dėl pardavėjo – visada galite kreiptis į portalo administraciją". Source:
  https://www.tv3.lt/naujiena/verslas/ispeja-automobiliu-pirkejus-stai-taip-is-jusu-gali-isvilioti-pinigus-n1230518
  (`s-tv3auto`). Secondary (press quoting the company).
- F273. **A reservation fee for a car, then gone** (LRT, 2024-06-07, a release by carVertical, a car-history company):
  „Sukčiai sugeba įtikinti pirkėjus pervesti už automobilį rezervacijos mokestį arba avansą, o po to staigiai pradingsta."
  Source: https://www.lrt.lt/naujienos/eismas/7/2289646/kaip-perkant-masina-neuzkibti-ant-sukciu-kabliuko-paaiskino-populiarius-apgavysciu-budus
  (`s-lrtmasina`). Secondary, commercial; used only beside F263 and F272.
- F274. **Citadele: a new profile with few friends** (LRT, 2025-04-07, Citadele's release, R. Čereška): „Jei profilis
  sukurtas neseniai, turi mažai draugų, nuotraukų ar įrašų, tai gali būti ženklas, kad susiduriate su apgaviku". Source:
  https://www.lrt.lt/naujienos/mokslas-ir-it/11/2526177/kas-trecias-skelbimas-facebook-marketplace-netikras-kaip-nepakliuti-i-sukciu-pinkles
  (`s-lrtfb3`). Secondary (a bank's release). The headline's „kas trečias skelbimas" and the tactics list after it are TSB's
  UK data, not used.
- F275. **VVTAT: buying from a private person is not a consumer purchase** (teise.pro, 2021-01-19 and 2021-04-12, VVTAT's
  releases): when buying from a private person who does not trade, „tokiu atveju Jūsų teisės nėra saugomos vartotojų teisių
  apsaugą reglamentuojančių teisės normų. Kilus ginčui tarp dviejų fizinių asmenų, šis būtų sprendžiamas šalių sutarimu, o
  nesutarus – bendrosios kompetencijos teisme."; „teisė į prekės garantiją, 14 d. prekės grąžinimas, keitimas ar kitos
  vartotojų teisės šiuo atveju netaikomos". Sources:
  https://www.teise.pro/index.php/2021/01/19/vvtat-bukite-atidus-pirkdami-socialiniuose-tinkluose-ir-skelbimu-portaluose/ ,
  https://www.teise.pro/index.php/2021/04/12/vartotoju-teises-perkant-socialiniuose-tinkluose-ar-skelbimu-portaluose/
  (`s-teise1`, `s-teise2`). Primary text (VVTAT's), through a republication.
- **Not used** (2026-11-01): a Vinted-styled e-mail that cost a Vilnius woman €23,000 (TV3, 2022-10-09; not a seller); a
  lawyer's blog on Skelbiu.lt fraud (neteisk.lt, 2026-09-27; low authority); a lifestyle blog on reservation deposits; the
  Klaipėda headlight-parts cases (atviraklaipeda.lt, 2025-01-16; F264–F267 are newer); Citadele's „atsiskaityti ne
  „Facebook“ rekomenduojamais metodais", whose example is cash, which on a meeting is the safe case; the AML centre's 2024
  totals (all fraud). **Not found:** a Lithuanian count of fake-seller fraud (only single cases and F268's court case);
  Vinted's own buyer-protection text and Meta's Marketplace advice (blocked); the police's own page on this scheme; a dated
  Lithuanian case of a seller sending a buyer a phishing link; any bank's guidance on recalling a transfer to a private
  seller beyond F4 and F208.

**B25. Cloned state sites, and how the police tell them apart** (read by Opus on 2026-11-01 from the raw text of the page,
found by the SEO research of the same day; for two edits to live pages, `docs/SEO-CONTENT.md` item 6, not a page of its own).
Raw page: `%TEMP%\seo2\tv3-netikros-svetaines.html.txt`.

- F276. **Vilnius 2nd police station: clones of Regitra, Sodra, VMI and esveikata** (TV3, 2026-10-29, the station's
  Facebook warning): „Vilniaus miesto antrojo policijos komisariato atstovai įspėja"; „sukčiai sukuria klonuotas svetaines,
  apsimesdami Regitra, Sodra, VMI, esveikata"; „oficialiose svetainėse prisijungiant prašoma suvesti tik pirmąjį
  „Smart-ID“ PIN kodą (PIN1), o jungiantis prie sukčių svetainių visada prašoma suvesti ir antrąjį „Smart-ID“ kodą (PIN2),
  kuriuo patvirtinami mokėjimai." Source:
  https://www.tv3.lt/naujiena/gyvenimas/skubiai-perspeja-del-masines-sukciu-aferos-lietuvoje-jau-apsigavo-ne-vienas-n1563970
  (`seo2/tv3-netikros-svetaines`). Secondary (press quoting the police). It does not say how people reach the clones
  (ads, links or search), and gives no count. Its own „visada“ is the police's word about the clones; a real service that
  signs a document or a payment asks PIN2 too, so a page must not turn it into „a real site never asks PIN2“.

**B26. The officer, the courier and the "expert" at the door** (read by Opus on 2026-11-01 from the raw text of each page;
found by a Sonnet research agent the same day; for the scenario „Pareigūnas prie durų“, `docs/SEO-CONTENT.md` item 1).
Raw pages: `%TEMP%\kurj\d-*.html.txt`; every quote below was matched against them by script (one line break aside). Blocked
and not got around: luminor.lt, three policija.lrv.lt regional pages, lb.lt. What the police say is read through TV3, LRT,
anyksta.lt, a prosecutor's release and kaipkada.lt, all of which name the police or the bank.

- F277. **Varėna police: officers do not collect or check money at homes** (TV3, 2026-10-19 11:20, the station's Facebook
  post): „pareigūnai niekada nerenka pinigų gyventojų namuose ir netikrina jų grynųjų pinigų autentiškumo". The scheme: „Į
  namus ateina nepažįstami asmenys, prisistato policijos pareigūnais ir teigia, kad jūsų pinigai padirbti ir juos reikia
  patikrinti, arba prašo apmokėti baudą." Advice: „Neleiskite skaičiuoti grynųjų ar „tikrinti“, ar jie tikri“;
  „Neatiduokite pinigų, banko kortelės ar kitų vertybių“; „Paprašykite tarnybinio pažymėjimo“; „Tikri policijos pareigūnai
  niekada neima pinigų patikrinimui gyventojų namuose. Kilus įtarimų – skambinkite 112“. „Pasidalinkite šia informacija su artimaisiais, ypač vyresnio amžiaus žmonėmis“; „Ypač saugotis raginami vyresnio amžiaus
  žmonės, kurie dažniausiai tampa tokių sukčiavimo schemų taikiniu“ (the first is in the Varėna post, the second is the article's own sentence, not a quote of the police).
  Source: https://www.tv3.lt/naujiena/gyvenimas/jie-gali-pasibelsti-i-jusu-duris-lietuvoje-ispeja-visus-n1560846
  (`d-r-n1560846`). Secondary (press quoting the police).
- F278. **Vilnius 1st station: what police NEVER do, and what the callers use** (TV3, 2026-02-27 09:50, the station's
  post): „Policija NIEKADA: neprašo pirkti aukso ar kitų vertybių; nesiunčia kurjerių pasiimti jūsų turto; nereikalauja
  slėpti informacijos nuo artimųjų; neprašo skubiai pervesti ar išsigryninti pinigų". Ending: „nutraukite pokalbį ir
  skambinkite 112". The callers „GĄSDINA: tariamomis kratomis, „padirbtais“ pinigais, neva nesaugiomis santaupomis
  banke" and pose as „elektros tinklų atstovais; policijos pareigūnais; banko darbuotojais". The gold variant: „Įtikina pirkti
  auksą iš realios, legaliai veikiančios įmonės. Auksas perkamas teisėtai; Pervedimas atliekamas per banką. Tuomet
  atsiunčia „pareigūną“ arba kurjerį, kuriam žmogus pats atiduoda įsigytą auksą." The company is not named and no company
  statement was found. Source: https://www.tv3.lt/naujiena/gyvenimas/uzfiksavo-nauja-sukciavimo-schema-lietuvoje-skubiai-ispeja-visus-n1498722
  (`d-r-tv3-nauja-schema-2`). Secondary.
- F279. **National police: the „poliklinika“ call, the „policija“ call, the visit** (TV3, 2026-05-21 09:20, Lietuvos
  policija's Facebook post): „PIRMAS SKAMBUTIS „POLIKLINIKA““ (a polyclinic offering discounts or check-ups and asking for
  personal data); „ANTRAS SKAMBUTIS „POLICIJA““ (the caller says you are being deceived and „reikalauja deklaruoti
  pajamas, kitu atveju grasina atvykti daryti kratą“); then „Į jūsų namus atvyksta tariamas pareigūnas „patikrinti pinigų“ ir
  pasiima grynuosius ar banko kortelę." Advice: „NEPATEIKITE asmens duomenų, banko informacijos ar kodų! NEATIDUOKITE pinigų
  ar kortelių! SUABEJOJUS – SKAMBINKITE 112!" The Karoliniškių polyclinic, which shared it, says a polyclinic never asks by
  phone for bank logins, Smart-ID codes or passwords. Source:
  https://www.tv3.lt/naujiena/gyvenimas/uzfiksavo-nauja-sukciavimo-schema-lietuvoje-skubiai-ispeja-visus-n1521387
  (`d-r-tv3-naujas-pranesimas-1`). Secondary.
- F280. **Utena police: a „bank employee“ and a „courier“ after the „police“ call** (TV3, 2026-06-01 09:20, Utenos AVPK's
  post): the „bank employee“ urges the victim to install a remote-access program, give banking logins and „išgryninti ir
  perduoti pinigus atvykusiam „kurjeriui““. „Policijos pareigūnai, bankų ar gydymo įstaigų darbuotojai NIEKADA: neprašo
  perduoti grynųjų pinigų ar banko prisijungimų; neprašo įsidiegti nuotolinio prisijungimo programėlių". The callers are
  mostly Russian-speaking (the post's words). Source:
  https://www.tv3.lt/naujiena/gyvenimas/lietuvos-policija-skubiai-ispeja-visus-demesio-n1523752 (`d-r-tv3-policija-demesio`).
  Secondary.
- F281. **Utena police in 2017: the same „your money is counterfeit“ visit** (Utenos AVPK release, republished by anyksta.lt,
  2017-10-24): „sukčiai prisistatė policijos pareigūnais, butų ūkio darbuotojais ir tikino gyventojus, kad jų turimi pinigai
  yra padirbti, todėl atvažiuos jų patikrinti"; „Policija netikrina pinigų pakeistų į Eurus, nekeičia ir nevykdo jokių su
  pinigais susijusių sandorių."; „Reikalaukite, kad atvykę pareigūnai parodytų tarnybinį pažymėjimą"; „Neperduokite pinigų per tarpininkus."; „Neįsileiskite nepažįstamų žmonių į
  namus." So the pretext is at
  least nine years old. Source: https://www.anyksta.lt/daugejaq-sukciavimo-atvej/ (`d-anyksta54906`). Secondary (a
  police release). The same page counts 84 fraud cases in nine months in Utena county, all kinds; not used.
- F282. **Klaipėda prosecutor: a caller and a runner** (release republished by laikrastisplunge.lt, 2024-02-06): four men
  serving sentences phoned random seniors as „policijos pareigūnai ar senjorų artimieji“, saying they „namuose gali turėti
  padirbtų grynųjų pinigų, kuriuos privalu patikrinti", „arba kad jų giminaičiui nedelsiant reikalinga piniginė pagalba"; accomplices at liberty „atvykdavo į nukentėjusiųjų namus,
  įtikindavo juos, jog yra su jais telefonu kalbėję asmenys, ir, paėmę senolių pinigus, pabėgdavo"; more than €31,000 from 14
  pensioners, December 2022 to January 2023 („galėjo išvilioti“). Source:
  https://laikrastisplunge.lt/is-zemaitijos-senjoru-pinigus-vilioje-asmenys-pravers-teismo-duris/ (`d-plunge`).
  Secondary (a prosecutor's release). These are charges sent to court; no verdict is read.
- F283. **Four 2026 cases at the door** (LRT, from police releases). 2026-07-10, the article on two women in Vilnius and
  one in Šiauliai (together €25.4k). Vilnius, a woman born 1943: „Prisistatęs policijos pareigūnu, apgaule išviliojo 8,5 tūkst.
  eurų. Pinigus ji atidavė atvykusiam nepažįstamam vyrui." (the call came by phone); the other Vilnius woman, 6 to 9 July,
  gave €400 and a bank card to people posing as police at her home. Šiauliai, a woman born 1950, 3 July: callers posed as
  bank staff and police and „Į namus atvykusiam nepažįstamam vyrui šiaulietė atidavė banko kortelę, nuo kurios buvo
  pasisavinti pinigai“ (€14.5k). 2026-06-29, Švenčionys district: „iš 1950 m. gimusios moters apgaule išviliojo 7 tūkst. eurų ir
  banko mokėjimo korteles“ (not used on the page). 2026-05-08, Raseiniai, a woman born 1938: on „ketvirtadienį“ (Thursday
  7 May) an unknown person phoned, posed as police, said her son-in-law was in trouble and demanded €1,500; the same day at
  14.20 a stranger came and „iš senjorės rankų pagrobė 10,5 tūkst. eurų“ (the „relative in trouble“ variant, still ending with
  a man at the door). Sources:
  https://www.lrt.lt/naujienos/lietuvoje/2/2986049/sukciai-apgavo-tris-senjores-ir-is-ju-pasisavino-25-4-tukst-euru ,
  https://www.lrt.lt/naujienos/lietuvoje/2/2975055/sukciai-is-moters-svencioniu-rajone-isviliojo-7-tukst-euru-ir-banko-mokejimo-korteles ,
  https://www.lrt.lt/naujienos/lietuvoje/2/2922036/raseiniuose-sukcius-is-moters-ranku-pagrobe-10-5-tukst-euru
  (`d-lrt2986049`, `d-lrt2975055`, `d-lrt2922036`). Secondary (LRT/ELTA reprinting police releases). Each is one case; the
  releases give birth years, not names.
- F284. **Vilnius county police: how many investigations** (anyksta.lt, 2025-01-16, the police's release): „Nuo praėjusių metų
  rugsėjo mėnesio Vilniaus apskr. vyriausiajame policijos komisariate atliekama daugiau nei 100 ikiteisminių tyrimų dėl
  sukčiavimo", 8 suspects (3 minors), the largest sum „net 34 900 eurų". It counts fraud investigations of the phone-fraud
  kind in one county, not this scheme alone. Source:
  https://www.anyksta.lt/bukite-budrus-nepasiduokite-sukciu-psichologiniam-spaudimui-ir-manipuliacijoms/ (`d-anyksta205180`).
  Secondary. No count for this scheme alone exists in any source read (see Not found).
- F285. **Payment statistics do not see a hand-over** (TV3, 2026-08-04, the Pinigų plovimo prevencijos kompetencijų centras's
  figures): „oficialioje mokėjimų statistikoje neatsispindi atvejai, kai sukčių įtikintas žmogus pinigus išgrynina ir perduoda
  tiesiogiai". So the centre's phone-fraud figures understate a hand-over scheme; they are not used as this scheme's count.
  Source: https://www.tv3.lt/naujiena/verslas/banko-pranesimu-nepatikejo-ir-neteko-9-tukst-euru-jeigu-noriu-galiu-juos-ismetyti-ant-zemes-n1540894
  (`d-tv3n1540894`). Secondary.
- F286. **Swedbank: what one bank did when a customer withdrew in parts** (same TV3 article, 2026-08-04, Swedbank's head of
  information security): the woman „buvo paprašyta atvykti į banką ir paaiškinti, kam jų reikia"; staff tried to find out
  whether scammers had prompted it; she answered „Čia yra mano pinigai ir aš turiu teisę su jais daryti, ką noriu."; „Todėl
  teko kreiptis į policiją." The article says she had already withdrawn „8–9 tūkst. eurų“ in parts and wanted the rest;
  its headline says she lost €9,000, and it does not say how the cash reached the scammers (a hand-over at a door is not
  stated). It shows one bank's practice in one case, not a rule or a legal duty. Source: F285's URL (`d-tv3n1540894`). Secondary.
- F287. **Citadele: couriers and „gold experts“ at the door** (TV3, 2026-05-27 10:50, a Citadele release): „Kai kuriais atvejais
  sukčiai pasirodo net prie namų durų – prisistato kurjeriais ar tariamais aukso ekspertais, siūlo įvertinti neva pelningą
  investiciją arba atvyksta paimti investavimui skirtų pinigų." The release is about people withdrawing second-pillar pension
  money. Source: https://www.tv3.lt/naujiena/gyvenimas/sukciai-lietuvoje-atrado-nauja-auksine-gija-skubiai-ispeja-visus-n1522397
  (`d-tv3gold0609`). Secondary (a bank's release). Not a statement about the real gold company in F278.
- F288. **SEB: cards and PIN codes handed over in person or by a driver** (SEB's own news page, 2024-04-30 13:10, its head
  of prevention): callers pose as „Google“, „Meta“, SEB and other banks or the police, mostly in Russian; they persuade people
  to „keisti kortelę“ and obtain the cards with the PIN codes, handed over „gyvai arba per pavežėjus“; the cards are then
  used to cash out other victims' money. „SEB bankas niekada neprašo perduoti mokėjimo kortelių per tarpininkus ar kitus
  asmenis."; „jeigu jums paskambinęs konsultantas su jumis nekalba lietuviškai, tai turėtų sukelti įtarimą". Source:
  https://www.seb.lt/infobankas/naujienos/ispeja-apie-nauja-sukciavimo-schema-gyventoju-isviliojamos-net-banko-korteles
  (`d-seo`). Primary (the bank on itself). A card case, not a cash one.
- F289. **Luminor: couriers sent for cards with PIN codes** (Luminor's release, republished by alkas.lt, 2024-05-20 15:50): the
  callers get the home address and send „tariamus kurjerius vartotojų mokėjimo kortelių su PIN kodais surinkimui";
  „bankai, policija ar kitos institucijos neturi teisės prašyti ir neprašo atsiųsti kortelių su PIN kodais". Source:
  https://alkas.lt/2024/05/20/luminor-ispeja-sukciai-atvyksta-i-namus-pasiimti-banko-korteles/ (`d-luminoralkas`). Secondary
  (a copy of a bank's release; luminor.lt answered with a block). A card case.
- F290. **kaipkada.lt on the national police warning** (2026-05-20 16:52): „nei policija, nei poliklinika, nei bankas nesiunčia
  žmonių į namus paimti grynųjų pinigų ar banko kortelių"; „Tikri pareigūnai nedraudžia žmogui pasitarti su artimaisiais."
  Source: https://www.kaipkada.lt/idomybes/policija-ispeja-apie-nauja-sukciu-schema-is-pradziu-skambina-poliklinika-veliau-tariama-policija-206335/
  (`d-r-kaipkada-poliklinika`). Secondary, a portal explaining F279; the second sentence is the portal's own, not the
  police's, and the page must not credit it to them.
- **Not used** (2026-11-01): the Klaipėda police chief's „Niekada policijos pareigūnai neskambina gyventojams“ (LRT,
  2025-04-29; police do sometimes phone people, so it overreaches); the Lietuvos bankų asociacija page (nothing on home visits);
  a Klaipėda case of 2026-10-19 (TV3 n1561029; remote, over €100,000, not a door); Utena's 2017 county count (F281);
  PPPKC's half-year figures (F285 says why they undercount); a 2010 Swedbank page; victims' birth years beyond F283.
- **Not found:** a police, prosecutor or bank count for this scheme alone in 2025 or 2026; a statement from the gold company
  of F278, Lietuvos bankas or a prosecutor on it; a Lithuanian source that scammers tell victims to give the bank a false
  reason for a withdrawal (only secrecy from relatives, F278); a Lithuanian rule or legal basis for a bank to refuse or delay
  a cash withdrawal (only F286's practice); any official step for what to do after a hand-over beyond telling the bank by its
  official contacts and reporting to the police (112, ePolicija); recovering cards or cash; the police's own page („Padėk
  ragelį“, policija.lrv.lt and lb.lt answered with blocks); whether a real officer at a door may be checked by phoning the
  station's duty officer (a search summary said so, a police PDF was not opened; the sources read all say 112).

**B27. The fine SMS: parking, „ePolicija", Regitra** (read by Opus on 2026-11-01 from the raw text of each page; found by a
Sonnet research agent the same day; for the scenario „SMS apie baudą", `docs/SEO-CONTENT.md` fresh list item 2). Raw pages:
`%TEMP%\kurj\fs-*.html.txt`, and `%TEMP%\seo2\tv3-bauda-sms.html.txt` for F301; every quote below was matched against them
by script (one paraphrase in the agent's report re-read by hand). Blocked and not got around: regitra.lt, vmi.lt,
policija.lrv.lt, policija.lt, epaslaugos.lt, e-tar.lt, e-seimas.lrs.lt, nksc.lt, ltsa.lrv.lt, 15min.lt; epolicija.lt served
only a script shell. So what the police and Regitra say is read through TV3, which names them.

- F291. **Unipark, 2025-08: it sends no such messages** (TV3, 2025-08-22 21:50, BNS, Unipark's release): the message asked
  clients to pay „tariamas baudas" through suspicious sites; „įmonė tokio pobūdžio žinučių nesiunčia"; „visa oficiali
  informacija apie jos paslaugas pateikiama tik „Unipark“ internetiniame puslapyje ir mobiliojoje programėlėje". Source:
  https://www.tv3.lt/naujiena/naujienos/unipark-ispeja-vairuotojus-neapsigaukite-n1445878 (`fs-tv3-unipark-warn`). Secondary.
- F292. **Unipark, 2026-08: no active payment links, and what a real SMS says** (TV3, 2026-08-28 11:38, Unipark's marketing
  head Mantas Meškauskas): „„Unipark“ nesiunčia SMS žinučių su aktyviomis mokėjimo nuorodomis"; „tikrose bendrovės SMS
  žinutėse klientai gali būti raginami informaciją pasitikrinti oficialioje „Unipark“ interneto svetainėje arba
  programėlėje, tačiau nėra siunčiamos nuorodos, per kurias prašoma iš karto atlikti mokėjimą"; „Klientai kiekvieną savaitę
  praneša apie gaunamas sukčių žinutes". The scam text: „galutinis pranešimas apie nesumokėtus parkavimo mokesčius", and
  unless paid an „administracinis patikrinimas" starts; the number began with India's country code. Source:
  https://www.tv3.lt/naujiena/naujienos/nauji-spastai-vairuotojams-siuncia-apgaulingas-zinutes-apie-nesumoketas-baudas-n1547174
  (`fs-tv3-nauji-spastai`). Secondary (interview). So a real Unipark SMS may exist; it carries no link to pay.
- F293. **Unipark, 2026-10: 50 reports a day, and what the messages threaten** (TV3, 2026-10-03 09:14, Unipark's press
  release, M. Meškauskas): „oficialiuose UNIPARK pranešimuose niekada nėra jokių aktyvių nuorodų į išorinius puslapius";
  „Visa komunikacija su klientais vyksta per UNIPARK programėlę, taip pat klientų aptarnavimo specialistus ir unipark.lt
  puslapyje"; „50 ir daugiau – tiek vidutiniškai užklausų kasdien" about suspicious SMS; some messages talk „apie
  delspinigius, galimą vairuotojo pažymėjimo atėmimą ar netgi neigiamą įtaką kreditingumo istorijai"; clients „dažniausiai
  nurodo, kad jokių skolų už mokamą automobilių stovėjimą UNIPARK programėlėje nemato"; report to the NKSC; „Taip pat nuolat
  bendradarbiaujame su Nacionaliniu kibernetinio saugumo centru, kad sukčių platinamos nuorodos būtų kuo greičiau
  nustatomos ir blokuojamos." Source:
  https://www.tv3.lt/naujiena/naujienos/masiskai-plinta-sukciu-afera-isidemekite-tokios-zinutes-yra-ju-pinkles-n1556499
  (`fs-tv3-masiskai-1003`). Secondary (a company's release).
- F294. **Look-alike Unipark addresses and names** (TV3): 2025-10-15 12:46, a link `uniparklit.com/cli5`, „prašyta susimokėti
  už tariamai neapmokėtą automobilių stovėjimą ir grasinta didelėmis baudomis" (`fs-tv3-vairuotojams-grasina`,
  https://www.tv3.lt/naujiena/verslas/vairuotojams-grasina-didziulemis-baudomis-perspeja-visus-neatidarykite-siu-nuorodu-n1460705); 2025-11-12, a link
  `unipark.lt-kv-k334.com`, „tikras adresas yra unipark.lt (be papildomų brūkšnelių ar simbolių)", the text without Lithuanian
  letters, „uz masinos parkinga uzdraustoje zonoje" (`fs-tv3-nov2025`,
  https://www.tv3.lt/naujiena/gyvenimas/lietuvoje-masiskai-plinta-nauja-sukciu-afera-gave-tokia-nuoroda-siukstu-nespauskite-n1468802); 2026-01-19, Unipark's Facebook post:
  „Unip4rk, uniparik, uniparklit, unilpark, uniparki – taip prisidengdami UNIPARK vardu užsivadina sukčiai"; it works with the
  mobile operators (`fs-tv3-jan2026`,
  https://www.tv3.lt/naujiena/gyvenimas/gave-tokia-nuoroda-jokiu-budu-jos-nespauskite-skubiai-ispeja-lietuvos-gyventojus-n1486726). Secondary.
- F295. **Unipark in Vilnius's street zones is only a go-between** (unipark.lt, its Vilnius page, no date): „Mokant už
  Vilniaus miesto zonas, UNIPARK veikia tik kaip tarpininkas"; a notice about unpaid parking in a Vilnius zone: „Sumokėti
  galite JUDU interneto svetainėje." Source: https://unipark.lt/parkavimas-mieste/vilnius/ (`fs-unipark-vilnius`). Primary.
- F296. **JUDU: no SMS with payment links, and no fines** (judu.lt, its own news, 2025 11 25): SMS „apie galimai nesumokėtą
  baudą" with a link are „sukčiavimo atvejai"; „JUDU nesiunčia SMS žinučių su nuorodomis į mokėjimo puslapius"; „Mokėjimai
  atliekami tik per oficialią svetainę: https://judu.lt/mokejimai/rinkliava-uz-stovejima/"; „neatidarykite nuorodų,
  nemokėkite ir nepateikite savo duomenų"; „JUDU neišrašo baudų: nesumokėjus už parkavimą reikia apmokėti vietinę
  rinkliavą"; report at nksc.lt's „pranesti-svetaine" form. Source:
  https://judu.lt/judu-ispeja-apie-sukciu-platinamas-melagingas-sms-zinutes/ (`fs-judu-ispeja-sms`). Primary.
- F297. **JUDU: what a real parking notice asks** (judu.lt, „Mokėjimo būdai", no date): „Apmokėti parkavimo pranešimą per 168
  valandas (7 dienas)"; „Būtina nurodyti transporto priemonės valstybinio numerio ženklą ir gauto pranešimo registracijos
  numerį"; it can be paid through e. valdžios vartai, PERLO terminals, Maxima tills, JUDU's own channels. Source:
  https://judu.lt/vairuotojams/mokejimo-budai/ (`fs-judu-mokejimo-budai`). Primary. It does not say how the notice reaches
  the driver (a slip on the windscreen or post). JUDU's 2026 08 05 news (`fs-judu-ispeja-qr`): „Parkavimo mokėjimus galima
  atlikti tik oficialiais būdais: JUDU programėlėje; SMS žinute; programėle „m.Parking“"; „JUDU niekada neprašo apmokėti
  parkavimo nuskenavus QR kodą" (that list leaves out Unipark, which F295 and the payment page name as a partner; the page
  names no list).
- F298. **Regitra: informational SMS only, and never parking** (TV3, 2026-10-13 15:30, Regitra's cyber-security experts):
  SMS in its name about „neva nesumokėtą baudą ar raginimą atlikti techninę apžiūrą"; „„Regitra“ savo klientams siunčia tik
  informacinio pobūdžio žinutes ir tik Vairuotojų portale nurodytais kontaktais"; it „neprašys susimokėti už automobilio
  stovėjimą, nes tai ne šios bendrovės sritis"; services it does not do, „pavyzdžiui, techninė apžiūra ar baudos"; it uses only
  regitra.lt and eregitra.lt, „Originalūs „Regitros“ svetainių adresai visada turi baigtis „.lt“"; the sample had grammar
  errors and a .com address. Source:
  https://www.tv3.lt/naujiena/lietuva/gavote-tokia-zinute-tik-nieko-nespauskite-perspeja-del-naujos-sukciu-taktikos-n1555416
  (`fs-tv3-gavote-1555416`). Secondary; regitra.lt's own post was blocked.
- F299. **„ePolicija" SMS: two losses, and what the messages look like** (TV3, 2026-10-08 07:45, quoting the Zarasai district
  police via the municipality's Facebook, and Panevėžys county police's post): a firm lost 22 368 € after an SMS „neva
  „ePolicija“ vardu" about „tariamai paskirtą administracinę baudą", when trying to log in to its bank through the link;
  „Policija nesiunčia SMS žinučių su nuorodomis, kuriomis raginama prisijungti prie banko sąskaitos dėl administracinės
  baudos." On 3 October in Panevėžys district a person got a message „kad jam paskirta bauda už ne vietoje pastatytą
  automobilį", pressed the link, gave data and „apie 14 899 Eur" were taken; „Policija žinučių nesiunčia ir pati Jūsų lėšų
  nenuskaito!" The Zarasai post also: „Neįveskite bankininkystės prisijungimo duomenų ar kortelės informacijos, jei nesate
  tikri, kad naudojatės oficialia svetaine"; and „policija nesiunčia SMS žinučių su nuorodomis, per kurias reikėtų jungtis
  prie banko paskyros ar tikrinti informaciją apie paskirtas administracines baudas – informaciją visada tikrinkite
  oficialiose institucijų svetainėse". Samples: sender „e.p.olicija", a protocol „pagal BK-28.2 straipsni del administracinio pazeidimo" with no
  Lithuanian letters, a link with „epolicja", „vpsauga" and .com; another from „E.SAVITARNA" about a parking offence. Source:
  https://www.tv3.lt/naujiena/gyvenimas/perspeja-kiekviena-gave-tokia-zinute-jokiu-budu-nespauskite-nuorodos-n1557701
  (`fs-tv3-perspeja-1557701`). Secondary. The Panevėžys post says „Policija žinučių nesiunčia" in general; the Zarasai one is
  narrower (links to log in to a bank); the page uses the narrower.
- F300. **Klaipėda county police: over €1,000 lost to a fine SMS** (TV3, 2026-10-14 12:50, the police's Facebook post): „vyras,
  gavęs SMS žinutę dėl neva paskirtos baudos, paspaudė atsiųstą nuorodą, suvedė reikalaujamus duomenis ir akimirksniu prarado
  daugiau nei 1000 eurų"; „Niekada nespauskite nuorodų SMS žinutėse ar el. laiškuose, ypač jei pranešama apie baudas, siuntas
  ar blokuojamas sąskaitas"; „jokia oficiali tarnyba niekada neprašys jūsų Smart-ID kodų, prisijungimo duomenų ar banko
  kortelės numerio"; „Praneškite policijai telefonu 112 arba per platformą epolicija.lt." Source:
  https://www.tv3.lt/naujiena/gyvenimas/ispeja-visus-lietuvos-gyventojus-gave-tokia-nuoroda-siukstu-jos-neatidarykite-n1559412
  (`fs-tv3-klaipeda`). Secondary.
- F301. **Police Department: institutions send no SMS with links** (TV3, 2026-05-31 18:50, „speeding fine" SMS; R. Matonis,
  head of the Police Department's communications): „Žmonės turi žinoti, kad institucijos nesiunčia SMS žinučių su nuorodomis.
  Pagrindinis patarimas – nespausti siunčiamų nuorodų, o informacijos ieškoti oficialiose institucijų interneto svetainėse";
  most people report the attempt and „nukentėjusių ir praradusių pinigus nėra labai daug". The article's own lede (not a
  quote): official bodies do not send fines „per SMS su aktyviomis nuorodomis". Source:
  https://www.tv3.lt/naujiena/lietuva/gavote-zinute-apie-bauda-policija-perspeja-stai-kaip-siaucia-sukciai-n1521817 (`seo2/tv3-bauda-sms`). Secondary. It is about links, not about fines in general.
- **Not used** (2026-11-01): JUDU's zone amounts (5, 12, 35, 96 €; undated page, changes); the Reidas blog's claims on how a
  camera fine is delivered (registered post, e. valdžios vartai, ePolicija; a blog, unverified); a search-engine summary of
  the police FAQ (policija.lrv.lt blocked); VMI search snippets (F140 already covers VMI); „geltonasis lapelis" (one blog).
- **Not found:** a primary page on how a real traffic or speed-camera fine reaches a person and where to check it (every
  official page tried was blocked); a source that the police or anyone „never send fines by SMS" in those words (F299 and
  F301 are about links); how Kaunas or Klaipėda deliver a parking notice; any count of fine-SMS victims; a source that a real
  Unipark „padidinto tarifo" notice is delivered on the windscreen.

**B28. The call that asks you to share your screen or install a helper, and „Revolut" on Viber** (read by Opus on
2026-11-01 from the raw text of each page; found by a Sonnet research agent the same day; for a scenario of its own,
`docs/SEO-CONTENT.md` fresh list item 3). Raw pages: `%TEMP%\kurj\e-*.html.txt`, the EBA factsheet as `e-ebalt.pdf.txt`,
and `alkas.html.txt` (F171's page); every quote below was matched against them by script. Blocked and not got around:
revolut.com and help.revolut.com, lb.lt, luminor.lt, help.viber.com, anydesk.com, vilnius.policija.lrv.lt, 15min.lt, jp.lt.

- F302. **„Revolut" on Viber, Ukmergė police** (TV3, 2026-07-30 11:20, quoting the Ukmergė district police's Facebook post;
  Kauno diena ran it the same day, 16:20, `e-kaunodiena`): „Sukčiai prisistato „Revolut" banko saugumo darbuotojais,
  dažniausiai kalba anglų kalba, o jų telefono numeris būna paslėptas"; they say the account „buvo įsilaužta" and urge you to
  „skubiai atskleisti prisijungimo prie elektroninės bankininkystės duomenis" and „atidaryti atsiųstą nuorodą"; once it is
  open the phone „gali būti rodomas tariamas „Revolut" paskyros tikrinimas ar skenavimas", while the scammers „gauna prieigą
  prie jūsų paskyros" and can „pirkti kriptovaliutą jūsų lėšomis" or „pervesti pinigus į nežinomų asmenų banko sąskaitas".
  Advice includes „Nutraukite pokalbį ir padėkite ragelį", doubts to +370 700 60000, real danger to 112. Source:
  https://www.tv3.lt/naujiena/gyvenimas/lietuvoje-masiskai-plinta-nauja-sukciu-afera-gyventojai-sulaukia-n1540041
  (`e-tv3revolut`). Secondary. It says **nothing about screen sharing or a remote app**: the Revolut part of a page and the
  screen part rest on different sources.
- F303. **Swedbank: a bank employee never moves you to Viber or asks for AnyDesk** (Swedbank's blog, 2026-02-13): „Banko
  darbuotojas, skirtingai nuo finansinių sukčių, niekuomet nesiūlys perkelti pokalbį į „Viber" ar „WhatsApp" programėles, ar
  įsidiegti „AnyDesk", „Teamviewer" ar panašių programėlių, skirtų valdyti jūsų įrenginį per nuotolį"; „Šiandien
  technologiškai įmanoma imituoti daugumą telefono numerių"; „saugiausias būdas – nutraukti pokalbį ir pačiam perskambinti
  bankui oficialiu numeriu iš svetainės ar programėlės". Source:
  https://blog.swedbank.lt/saugumas/jums-skambina-banko-konsultantas-kaip-pasitikrinti-ar-bendraujate-su-tikru-darbuotoju
  (`e-swedkonsult`). Primary (a bank about itself). It speaks for Swedbank only.
- F304. **What a remote app lets the scammer see and do** (Swedbank, 2023-01-19): „Tokia programėlė suteikia galimybę
  sukčiams kliento įrenginio ekrane matyti sąskaitų likučius ir jų numerius, suvedamus slaptažodžius, interneto banko
  prisijungimo duomenis. Programėlė taip pat leidžia valdyti patį įrenginį, t. y. formuoti pavedimus, …"; the callers use
  „įvairios nuotolinio bendravimo programėlės, pavyzdžiui, „WhatsApp", „Viber"". Source:
  https://blog.swedbank.lt/saugumas-pranesimai-spaudai/gyventojus-atakuoja-rusakalbiai-sukciai (`e-swedrusak`). Primary,
  but three years old: use it for the mechanism, not as news. On a phone, control depends on the system and the permissions
  given (F305), so the page says „gali".
- F305. **Luminor on screen sharing, and what to do after** (alkas.lt, 2026-10-28, BNS, Luminor's Mindaugas Kutkaitis; the
  same page as F171): the stranger presents as a bank employee, an investment adviser or „techninės pagalbos specialistu";
  „Jis gali pranešti apie tariamai pastebėtą įtartiną mokėjimą, užblokuotą sąskaitą ar telefono gedimą. Tuomet pasiūlo
  padėti išspręsti problemą, tačiau pirmiausia paprašo įjungti ekrano dalijimosi funkciją"; „Įjungus ekrano dalijimąsi, pašalinis žmogus gali tiesiogiai stebėti atidaromas programėles, gaunamus
  pranešimus, banko sąskaitų likučius ir ekrane pasirodančius patvirtinimo kodus"; worse is a remote-access app such as
  „AnyDesk" or „TeamViewer": „Tai teisėtos techninės pagalbos priemonės. Tačiau, priklausomai nuo įrenginio ir suteiktų
  leidimų, jomis galima ne tik stebėti ekraną, bet ir nuotoliniu būdu valdyti tam tikras telefono ar kompiuterio …"; „Iš pradžių žmogaus prašoma tik parodyti
  ekraną. Vėliau – atidaryti banko programėlę, prisijungti prie sąskaitos, suteikti papildomus leidimus ir galiausiai
  patvirtinti tam tikrą veiksmą"; „Jeigu telefonu kalbantis asmuo prašo parodyti ekraną, prisijungti prie banko arba
  patvirtinti neaiškų veiksmą, pokalbį reikia nutraukti". After: „pirmiausia nedelsdami nutraukite pokalbį ir išjunkite
  ekrano dalijimąsi"; if a remote-access app was given permission to control the device, „išjunkite belaidį interneto ryšį
  („Wi-Fi") ir mobiliuosius duomenis"; then „iš kito, saugaus įrenginio susisiekti su banku", change the main passwords,
  „pašalinti įtartinas programas, patikrinti joms suteiktus leidimus", report to the police; „Net jeigu pinigai iš sąskaitos
  nedingo, tai dar nereiškia, kad nieko blogo neįvyko. Nusikaltėliai galėjo surinkti duomenis, kuriais pasinaudos vėliau".
  Source: https://alkas.lt/2026/10/28/sukciai-gali-isvilioti-pinigus-net-ir-nezinodami-jusu-slaptazodzio
  (`alkas`). Primary (a bank) through BNS. The order screen → bank app is Luminor's account, not a rule.
- F306. **Swedbank's security page: video calls and AnyDesk or TeamViewer** (undated): „Dažnai pokalbiai su asmenimis,
  apsimetančiais policijos pareigūnais, banko darbuotojais ir kt., vyksta vaizdo skambučiais, taip pat prašoma įdiegti
  nuotolinio valdymo programas, pavyzdžiui, „AnyDesk" ar „TeamViewer""; „Niekam nesuteikite prieigos prie savo kompiuterio
  ir nediekite į savo įrenginį jokių programų …" („nediekite" as printed). Source:
  https://www.swedbank.lt/private/d2d/ebanking/secureBanking?language=LIT (`e-swedsecure`). Primary, no date.
- F307. **The EU supervisors, in Lithuanian: banks will never ask** (the factsheet of the European Banking Authority, EIOPA
  and ESMA, „Online financial frauds and scams in an AI world", Lithuanian edition; no date on it, the URL path says
  2026-01): „Niekada neįdiekite nuotolinės prieigos programinės įrangos ir nesidalinkite savo ekranu: Bankai ir finansų
  įstaigos niekada to neprašys". Source:
  https://www.eba.europa.eu/sites/default/files/2026-01/fa63af9a-bafd-4821-baee-48c7c8fb6490/Online%20financial%20frauds%20and%20scams%20in%20an%20AI%20world_LT.pdf
  (`e-ebalt.pdf`). Primary (EU regulators). It is not the Bankų asociacija's, whatever the agent's report said.
- F308. **Utena police: the „bank" asks for AnyDesk, and what officials never ask** (aukstaitijosgidas.lt, 2026-05-28,
  the Utena county police's release): a chain of a „clinic", where the person, believing it, „dažnai atskleidžia savo asmens
  duomenis", then a „police officer", then the „bank", which urges you to
  „įsidiegti nuotolinio valdymo programėles, pvz. „AnyDesk""; „Daugeliu atvejų sukčiai kalba rusų kalba"; police, bank and
  clinic staff „NIEKADA … neprašo įsidiegti nuotolinio prisijungimo programėlių"; „Niekada nespauskite nuorodų ir neatlikite
  jokių veiksmų skambučio metu". Source: https://aukstaitijosgidas.lt/plinta-nauja-telefoniniu-sukciu-schema/ (`e-aukst`).
  Primary (police) through regional press.
- F309. **Telia: a video call that asks you to share the screen** (ve.lt, 2026-10-08, Telia's cyber-security expert Darius
  Povilaitis): invitations to „Google Meet", „Microsoft Teams", „Zoom" may be used for fraud; „Prisijungus prie skambučio,
  sukčiai dažnai prašo įjungti ekrano bendrinimą, atidaryti įvairius sistemos langus ar vykdyti nurodytus veiksmus";
  „Matydami jūsų ekraną, nusikaltėliai gali stebėti prisijungimo duomenis, vienkartinius banko kodus, asmeninę informaciją
  ar net įkalbėti įsidiegti nuotolinio valdymo programas"; names „AnyDesk", „TeamViewer", „QuickSupport"; whoever shared the
  screen „reikėtų kuo greičiau pakeisti slaptažodžius, susisiekti su savo banku ir stebėti paskyrų veiklą". Source:
  https://ve.lt/verslas/technologijos/sukciai-bando-nauja-taktika-netiketas-skambutis-gali-baigtis-istustinta (`e-ve`).
  Secondary (a company's release). The page's word is „ekrano bendrinimas".
- F310. **Šiauliai, 2026-06: 131.8 thousand euros through a remote app** (LRT, 2026-06-26 08:10, ELTA, the Police
  Department): a man born 1949 said that on 16 June callers speaking Russian, „prisistatę banko darbuotojais, įtikino jį
  telefone įdiegti nuotolinio prisijungimo programėlę ir atiduoti banko korteles"; „iš jo banko sąskaitos apgaule
  pasisavinti 131,8 tūkst. eurų". Source:
  https://www.lrt.lt/naujienos/lietuvoje/2/2972029/rusiskai-kalbeje-sukciai-is-siauliecio-isviliojo-131-8-tukst-euru
  (`e-lrt2`). Secondary. The app is not named; the cards were handed over too, so the loss is not the app's alone.
- F311. **Call the bank on the number from its site or card** (kaipkada.lt, 2026-07-07, on a Marijampolė „bank" and
  „police" case of 11 thousand euros): „Ne tuo numeriu, kurį padiktavo skambinantysis, o tuo, kuris nurodytas banko
  interneto svetainėje arba ant mokėjimo kortelės". Source:
  https://www.kaipkada.lt/naujienos/marijampolietis-patikejo-banko-darbuotoju-ir-policininku-is-vyro-sukciai-isviliojo-11-tukst-euru-212412/
  (`e-kaipkada`). Secondary. The case itself names no screen or app.
- F312. **Kaunas police: the caller moves you to Viber or WhatsApp** (rinkosaikste.lt, 2026-05-26, the Kaunas county
  police's recording of a fake mobile-operator call): „Vėliau pokalbį pasiūlyta tęsti „Viber" arba „WhatsApp"
  programėlėse"; „Mobiliojo ryšio operatoriai tokiu būdu sutarčių nepratęsia, neprašo gyventojų pereiti į susirašinėjimo
  programėles". Source: https://rinkosaikste.lt/policija-pasidalino-garso-irasu-isgirskite-kaip-veikia-telefoniniai-sukciai/
  (`e-rinkos`). Secondary. About an operator, not a bank.
- F313. **FOREIGN: WhatsApp warns before you share your screen with a stranger** (9to5Mac, 2025-10-21, quoting Meta): „On
  WhatsApp, we're launching warnings when you attempt to share your screen with an unknown contact during a video call. We
  know scammers may pressure their targets to share their screen to trick people into giving away sensitive information
  including bank details or verification codes." Source:
  https://9to5mac.com/2025/10/21/whatsapp-will-now-warn-scam-victims-against-screen-sharing-bank-details/ (`e-nine2mac`).
  Secondary, quoting Meta.
- F314. **FOREIGN: a video call where the screen is shared in a few taps** (Which?, UK, 2026-09-10): „They may try to move
  the conversation to a video call on FaceTime or WhatsApp, where you can share your screen in a few clicks"; „If
  screen-sharing is enabled, scammers can see almost everything displayed on your phone, including notifications of one-time
  passwords (OTPs) sent by banks to authorise payments." Source:
  https://www.which.co.uk/news/article/beware-whatsapp-screen-sharing-scams-ak3d32L0Zd5D (`e-which`). Secondary, foreign.
- F315. **FOREIGN: Revolut checks in the app whether a call is really Revolut** (Retail Banker International, 2026-01-14):
  the feature detects a user opening the app during a call, „including those made through third-party calling
  applications, and then checks if the call is with a legitimate Revolut agent"; „If it determines the call is not with
  Revolut, an urgent message warns the user accordingly." Source:
  https://www.retailbankerinternational.com/news/revolut-app-alert-impersonation-fraud/ (`e-retailbank`). Secondary (trade
  press). Whether it works for users in Lithuania is not stated.
- F316. **FOREIGN: TeamViewer gives no support by phone** (TeamViewer's own page, last modified 2024-10-01): „TeamViewer
  does not provide remote support services of any kind"; „A small dialog is displayed in the bottom right corner of your
  desktop after you grant access to your device." The company calls itself „a legitimate software development company"; the
  page does not say it sells the program. Source:
  https://www.teamviewer.com/en/global/support/knowledge-base/teamviewer-remote/security/teamviewer-and-scamming/
  (`e-tvscam2`). Primary (the vendor).
- **Not used** (2026-11-01): Cyprus's Viber calls with Revolut's logo (sigmalive, 2026-02-26; only shows the pattern abroad);
  the Pinigų plovimo prevencijos centras on AnyDesk (mlaikas.lt, 2024-04-30; older than F304's mechanism adds); Swedbank via
  TV3 on remote apps (2025-09-07; the sentence sits in an investment-scam section); an ESET expert via TV3 (2026-07-09; about
  „Google" calls); ESET's WhatsApp screen-sharing release (a vendor; F313 says it from Meta).
- **Not found:** Revolut's own words that it never calls on Viber or asks for the screen (every Revolut page blocked); any
  Lithuanian source where the Viber „Revolut" callers ask for screen sharing or a remote app; a Lithuanian case naming a
  shared screen; whether Viber can share a phone's screen (help.viber.com blocked); Apple's, Google's or a Lithuanian
  authority's steps to end a screen share or remove an app; a Lietuvos bankas, NKSC, RRT or policija.lt page on the topic;
  SEB, Šiaulių bankas or Citadele pages on remote access; any Lithuanian count of screen-sharing losses (only Luminor's UK
  figure, F171).

**B29. The fake e-mail from Sodra, a bank or Telia** (read by Opus on 2026-11-01 from the raw text of each page; found by
a Sonnet research agent the same day; for a scenario of its own, `docs/SEO-CONTENT.md` fresh list item 4). Raw pages:
`%TEMP%\kurj\m-*.html.txt`; every quote below was matched against them by script (`m_verify.py`). Blocked and not got
around: sb.lt (403). Dates are the page's own (`datePublished` on sodra.lt, the dateline on LRT and tv3).

- F317. **The „Sodra" refund e-mail of €412.80** (Sodra, news, 2026-10-05): „Viename iš gyventojų gautų laiškų teigiama,
  kad žmogui skirta 412,80 euro vienkartinė socialinio draudimo įmokų grąžinimo išmoka"; the letter gives a supposed decision
  number, says the payment is approved and the money „sąskaitą pasieks per kelias minutes po tapatybės patvirtinimo"; „Tam
  siūloma paspausti mygtuką „Gauti išmoką"." Source: https://sodra.lt/naujienos/naujas-sukciu-kabliukas-zada-sodros-ismokas
  (`m-sodra-412`). Primary. It reports **no loss**, and no other page read does either.
- F318. **How Sodra's real e-mail is checked** (same page): „„Sodra" nesiunčia pranešimų, kviečiančių per nuorodą atsiimti
  išmoką."; „Tikrinkite visą siuntėjo elektroninio pašto adresą, ne vien rodomą vardą. Oficialūs „Sodros" elektroninio pašto
  adresai baigiasi @sodra.lt."; „Vien „Sodros" pavadinimas nuorodoje nereiškia, kad ji veda į oficialią svetainę."; in the
  personal account „galima pasitikrinti ir elektroniniu paštu gauto „Sodros" pranešimo tikrumą – oficialūs pranešimai
  matomi ir paskyroje." Same source. Primary. So Sodra **does** send e-mail; F47's „sends no email … that asks you to press a
  link" is the accurate form, never „Sodra sends no e-mail".
- F319. **The Klaipėda police on the same letter** (TV3, 2026-10-05, quoting the Klaipėda county police's community
  officers): „Tvarkingas dizainas, „sprendimo numeris", SSL ar užrašai apie „saugią autorizaciją" nereiškia, kad svetainė
  tikra."; „Informaciją apie išmokas ir permokas tikrinkite savarankiškai prisijungę prie oficialios „Sodros" paskyros, o ne
  per gautą nuorodą." Source:
  https://www.tv3.lt/naujiena/gyvenimas/uzfiksavo-nauja-sukciavimo-sistema-lietuvoje-ispeja-visus-gyventojus-n1556868
  (`m-tv3-sodra-klaipeda`). Secondary. No police release of its own was found.
- F320. **A loss through a fake „Sodra" e-mail, PIN1 then PIN2** (Sodra, news, 2026-07-13): a woman „gavusi el. laišką su
  nuoroda į tariamą „Sodros" paskyrą. Paspaudusi nuorodą ji suvedė elektroninio parašo PIN1 kodą. Ekrane pasirodė pranešimas
  apie neva neteisingą kodą ir buvo paprašyta suvesti PIN2." Soon after, „nuo jos banko sąskaitos nurašyta didelė pinigų
  suma" (no figure). „„Sodra" niekada nesiunčia pranešimų, kuriuose prašoma:" to transfer money, confirm bank operations, give
  card data, enter PIN codes or make urgent financial decisions; „Visi oficialūs „Sodros" pranešimai, siunčiami elektroniniu
  paštu, taip pat yra matomi asmeninėje „Sodros" paskyroje." Source:
  https://sodra.lt/naujienos/sukciai-prisidengia-sodros-vardu-kaip-atpazinti-apgaule (`m-sodra-prisidengia`). Primary. It
  does not say when or where the case happened.
- F321. **The Swedbank „security system" letter** (LRT, 2026-10-27, ELTA, from Swedbank's press release): letters „kuriuose
  raginama jungtis prie neaiškios nuorodos dėl neva atnaujintos „saugumo sistemos"". „„Swedbank" patvirtina, kad tokių laiškų
  nesiunčia"; on the day: „Šiandien sulaukėme daug pranešimų apie šiuos apgaulingus laiškus."; Žygeda Augonė, its head of information security: it is written with grammar errors, „Taip pat jis išsiųstas ne iš
  oficialios banko el. pašto dėžutės"; to reach the real bank, „banko adresą naršyklėje reikėtų įvesti patiems arba naudotis
  oficialia „Swedbank" programėle"; check through contacts on the organisation's own site: „Niekada nereikėtų naudotis
  kontaktais, nurodytais gautoje žinutėje ar laiške." Source:
  https://www.lrt.lt/naujienos/verslas/4/3095353/swedbank-ispeja-nespausti-nuorodu-sukciai-banko-vardu-siuncia-laiskus-gyventojams
  (`m-lrt-swedbank`; the same text in `m-15min-swedbank`, `m-tv3-swedbank`). Secondary (a bank's own words through ELTA).
- F322. **After the click, Swedbank** (same article): „Jei jau paspaudėte nuorodą ir suvedėte savo prisijungimo duomenis,
  nedelsdami susisiekite su „Swedbank" oficialiais kontaktais" (info@swedbank.lt, +370 5 268 4444); „Jei patys nepradėjote
  prisijungimo ar mokėjimo, neveskite kodų, netvirtinkite prisijungimo ar mokėjimo". Same source. Speaks for Swedbank only.
- F323. **Fake Telia invoices** (LRT, 2026-09-01, ELTA, from Telia): „gyventojams siunčiami elektroniniai laiškai su
  suklastotomis operatoriaus sąskaitomis"; they ask to pay a supposed debt or the current bill, „tačiau nurodyti banko
  rekvizitai priklauso ne bendrovei, o sukčiams"; Odeta Baranauskienė, Telia's head of cyber security: „Oficialias sąskaitas
  „Telia" klientams siunčia iš adreso noreply@telia.lt, tačiau sukčiai dažnai naudoja panašiai atrodančius domenus, kurie
  skiriasi vos viena raide, papildomu simboliu ar kita galūne."; signs: hurry to pay, threats to limit the service, unusual
  payment instructions, „nauja ar anksčiau nematyta banko sąskaita"; „Patikimiausias būdas pasitikrinti informaciją yra
  prisijungti prie „Telia" savitarnos arba susisiekti su mumis oficialiais klientų aptarnavimo kanalais"; if already paid,
  go at once to your bank, tell the police and Telia, and keep the e-mails, invoice copies and payment details. Source:
  https://www.lrt.lt/naujienos/lietuvoje/2/3039122/telia-ispeja-sukciai-operatoriaus-vardu-siuncia-netikras-saskaitas
  (`m-lrt-telia`). Secondary. No telia.lt page of 2026 was found.
- F324. **The Telia „double payment" refund e-mail** (Telia's blog, 2024-07-25): a letter „kuriame pranešama, kad klientas
  paskutinę sąskaitą faktūrą apmokėjo du kartus ir todėl gali pateikti užklausą pinigų grąžinimui"; on the card data it
  then asks for: „Nei „Telia", nei jokia kita įmonė ar valstybinė institucija panašiais atvejais to niekada nereikalauja".
  Source: https://www.telia.lt/blog/kaip-atpazinti-naujos-kartos-interneto-sukcius (`m-telia-blog`). Primary, two years old.
- F325. **A company lost €84,936 to a fake „Paysera" e-mail** (Atvira Klaipėda, 2026-04-02, from the Police Department): on
  31 March a Klaipėda company's mailbox got a letter „iš neva banko „Paysera"" with a link „dėl privalomos patvirtinimo
  procedūros"; „Paspaudus nuorodą bei suvedus prisijungimo duomenis, iš banko sąskaitos buvo nuskaičiuoti 84 936 eurai."
  A pre-trial investigation was opened. Source: https://www.atviraklaipeda.lt/2026/04/02/sukciams-pervede-beveik-85-tukst-euru/
  (`m-klaipeda-paysera85k`). Secondary. A company, not a private person.
- F326. **Artea (Šiaulių bankas) letters** (LRT, 2026-08-04, ELTA, from the bank): e-mails and SMS in its name
  „raginantys atnaujinti reikalingą sutikimą arba patvirtinti informaciją"; advice to „patikrinti laiško siuntėjo el. pašto
  adresą ir nepasitikėti pamačius banko logotipą"; „saugiausia prie interneto banko jungtis pačiam naršyklėje suvedus pilną
  oficialios svetainės adresą". Source:
  https://www.lrt.lt/naujienos/lietuvoje/2/3011157/prisidengdami-artea-banko-vardu-sukciai-vilioja-gyventoju-duomenis
  (`m-lrt-artea`). Secondary. sb.lt answered 403.
- F327. **A fake „Ignitis" debt e-mail** (LRT, 2025-01-13, BNS, from Ignitis): the letter names a supposed debt, an account
  to pay into and a link to pay quickly; check by „prisijungus prie mano.ignitis.lt savitarnos"; „„Ignitis" neragina klientų
  skubiai atlikti su mokėjimais susijusius veiksmus." Source:
  https://www.lrt.lt/naujienos/verslas/4/2458864/ignitis-praso-klientu-buti-budriais-is-moters-sukciai-bande-isvilioti-pinigus
  (`m-lrt-ignitis`). Secondary. No victims were known.
- F328. **Entered data on a fake bank page: bank, then passwords** (TV3, 2026-09-02, a Luminor press release, Mindaugas
  Kutkaitis of its fraud prevention): „Jei manote, kad suvedėte duomenis netikroje svetainėje, kuo skubiau susisiekite su
  banku bei pakeiskite visus dabartinius slaptažodžius." Source:
  https://www.tv3.lt/naujiena/verslas/skubiai-ispeja-gyventojus-jei-jungsites-prie-banko-nespauskite-tokios-nuorodos-n1548275
  (`m-tv3-sodra-banko-nuoroda`). Secondary (a bank's own words).

Not used: Luminor's 2024-11-21 warning of e-mails with a QR code for a „VMI transfer" (`m-luminor-apsimeta`; the QR page
covers it); Sodra's 2024-10-18 „new regulations" and 2025-06-06 debt letters (older forms of F317); Sodra's 2026-10-22 SMS
and 2026-10-20 „Omniva courier" call (other channels); info@sodra.lt (LRT only); Lietuvos bankas's 2025-12-11 „bank and
police" (F252 says it) and its Smart-ID content check (F32 says it); NKSC's e-mail route (F259 says it: cert@nksc.lt, since
the „žinutė / skambutis" form is built for phone numbers and goes to RRT).
Not found: a telia.lt page of 2026; a police release or a loss in the €412.80 case; SEB, Šiaulių bankas (403) or ESO pages
on fake e-mail; any bank's address for forwarding phishing; RRT on e-mail; a count of e-mail scams in Lithuania.

**B30. The romance scam** (read by Opus on 2026-11-02 from the raw text of each page; found by a Sonnet research agent
the same day; for a scenario of its own, `docs/SEO-CONTENT.md` fresh list item 5). Raw pages: `%TEMP%\kurj\ro-*.html.txt`;
every quote below was matched against them by script (`ro_verify.py`, 73 quotes, 0 misses). Blocked or unusable and not
got around: ftc.gov (a stub), the PPPKC statistics PDF (its text layer is garbled). Dates are the page's own (the
„Paskutinė atnaujinimo data" on lb.lt, the dateline elsewhere; amlcenter.lt's date is in its HTML only).

- F329. **How it starts and how it turns to money** (Lietuvos bankas, „Romantinis sukčiavimas", updated 2024-10-25): the
  scammers meet their victims online, „(socialiniuose tinkluose, pažinčių svetainėse, programėlėse)"; unlike data theft,
  where speed matters, „romantiniai sukčiai pinigų vilioti neskuba"; „Užsimezgus romantiniams santykiams, gali pasiūlyti
  susitikimą ar net santuoką." Then: „Užsimezgus simpatijai ir atsiradus pasitikėjimui, planuojamas susitikimas, tačiau
  visada atsitinka kokia nors nelaimė, pritrūksta pinigų kelionei ar pan. Dėl to susitikti tampa neįmanoma ir sukčiui
  prireikia papildomų lėšų." Source: https://www.lb.lt/lt/romantinis-sukciavimas (`ro-lbrom`). Primary.
- F330. **Signs and checks** (same page): „Sukčiaus profilyje yra informacijos, neatitinkančios jo pasakojimų, arba apie
  asmenį pateikiama labai skurdi informacija."; check him in public sources, with a „profilio nuotraukų atvirkštinę vaizdų
  paiešką"; „paprašykite susiskambinti naudojant vaizdo pokalbio funkciją. Atkreipkite dėmesį į atvejus, kai asmuo
  teisinasi, kad „neveikia vaizdo kamera" ar pan." (`ro-lbrom`). Primary. It does not say a video call proves anything:
  F337 reports convincing fake video calls.
- F331. **What the money is for, and the rule** (same page): „Niekada neperveskite pinigų nepažįstamiems. Sukčiai gali
  prašyti pinigų įvairiems tikslams – ligai išgydyti, kelionei, verslo reikalams, susimokėti už siuntinį ar „išgelbėti"
  nuo netikėtos situacijos. Venkite santykių, jei prašoma pinigų, – tai gali būti sukčiavimo požymis." (`ro-lbrom`).
  Primary.
- F332. **The „Swiss soldier" in Syria** (same page, a case, undated): a pensioner met on social networks a man who said he
  was a Swiss soldier on a mission in Syria; „Neva kariškis pensininkei pranešė, kad yra priešų sužeistas ir gydymui reikia
  pinigų."; then a parcel of valuables „užstrigo muitinėje ir, norint ją atgauti, reikia sumokėti"; in all „moteris iš
  viso pervedė beveik 16 tūkst. eurų" (the page's „įvairiais banko sąskaitas" is its own typo); „„Šveicaras" dingo iš
  karto, kai tik sužinojo, kad pensininkė jam atidavė visas savo santaupas ir pinigų daugiau neturi. (71 metų moteris,
  Klaipėdos apskr.)." (`ro-lbrom`). Primary. No year is given for any case on the page.
- F333. **A relative ended it** (same page, a case, undated): an „officer" on the Arabian peninsula took almost €7,000
  („Iš viso tariamam karininkui ji atidavė beveik 7 tūkst. eurų."), paid into an account he named, „atidarytą ne jo
  pavarde"; „Nežinia, kiek sukčius dar būtų mulkinęs patiklią moterį, jei ji apie istoriją su užsienio karininku nebūtų
  pasipasakojusi savo giminaitei." The relative saw it at once and told her to cut all contact (almost 50, Marijampolė
  county). (`ro-lbrom`). Primary.
- F334. **The bank can stop some of it, and the victim may hide it from the bank** (same page, two cases, undated): for an
  81-year-old, „Į situaciją įsitraukus banko saugumo specialistams, pavyko išsaugoti 10 tūkst. eurų siekusią sumą: 3 tūkst.
  eurų dydžio pervedimą pavyko sustabdyti, 7 tūkst. eurų jau pervestų pinigų buvo sugrąžinti."; in another, „Kai moters
  elgsena sukėlė įtarimų banko specialistams, ji ėmėsi aiškinti, jog pastaruoju metu siųstos 3–5 tūkst. eurų siekiančios"
  sums were for other purposes (a relative in trouble in Turkey), with nothing to show for it. (`ro-lbrom`). Primary. It
  does not say how often a bank can return money.
- F335. **Anyone can be a target** (Lietuvos bankas, the „Padėk ragelį" launch, 2025-12-15): „Romantiniai sukčiai aukų
  ieško socialiniuose tinkluose ir pažinčių programėlėse, ilgainiui įgyja pasitikėjimą, o vėliau prašo pinigų ar „pagalbos"
  įvairiomis istorijomis. Kampanija primena, kad net ir didelę gyvenimišką patirtį turintys žmonės gali tapti taikiniu."
  Source: https://www.lb.lt/lt/naujienos/pradedama-kampanija-padek-rageli-raginama-nesuteikti-sukciams-progos
  (`ro-padek`). Primary.
- F336. **Rarer, but larger sums; soldiers and an astronaut** (Lietuvos bankas, news, 2023-07-14, Rosvaldas Krušna): the
  type „yra kur kas retesnis, bet išviliojamos sumos neretai būna įspūdingesnės"; „Lietuvos bankų asociacijos duomenimis,
  per 2022 m. daugiau kaip šimtu padaugėjo registruotų romantinio sukčiavimo atvejų – nuo 195 iki 322."; losses „650 tūkst.
  eurų 2022 m., 641 tūkst. eurų 2021 m."; „Sukčiai dažnai apsimeta amerikiečiais kariais. Būta ir atvejo, kai sukčius
  apsimetė astronautu."; sometimes mixed with investment fraud: people are invited „investuoti artimo žmogaus investavimo
  įmonėje". Source: https://www.lb.lt/lt/naujienos/romantiski-jausmai-baigesi-liudnai-per-praejusius-metus-sukciams-lietuviai-atidave-daugiau-kaip-0-5-mln-euru
  (`ro-lbnews`). Primary. Figures for 2021 and 2022 only.
- F337. **Moving to another app, gift cards, a fake platform** (laikas.lt, 2026-01-29, Mindaugas Kutkaitis, head of
  Luminor's fraud prevention): „Pirmas rimtesnis signalas – kai žmogus prašo pereiti į kitą programėlę."; to WhatsApp,
  „„Telegram" ar el. paštą. Sukčiams tai leidžia veikti laisviau, išvengti programėlėse įdiegtų saugumo priemonių ir
  išlaikyti visišką anonimiškumą."; „kartais prašoma dovanų kortelių. Šios kortelės dažnai sunkiai atsekamos"; in the
  investment variant „naudojamos tikros keityklos, tačiau siūloma platforma būna fiktyvi"; the tools now include „nuo
  dirbtiniu intelektu sukurtų profilių iki netikrų vaizdo skambučių, kurie atrodo labai tikroviškai". Source:
  https://www.laikas.lt/ekspertai-musa-pavojaus-varpais-naujos-kartos-romantiniai-sukciai-istustina-saskaitas-153826/
  (`ro-bilis`). Secondary (a bank's own words).
- F338. **The rule, and lying to the bank** (same page): „Svarbiausias ginklas – neperduoti pinigų niekam, su kuo
  nebuvote susitikę gyvai."; „Jei žmogus prašo meluoti bankui – tai akivaizdus pavojus." (`ro-bilis`). Secondary.
- F339. **If it happened: bank and police, no shame** (same page): „Nedelsiant kreipkitės į savo banką ir policiją. Tai
  nėra gėda – tai dažna situacija, kuri gali nutikti bet kam." (`ro-bilis`). Secondary.
- F340. **The „medic from the Philippines"** (tv3.lt, 2026-02-12, told by Žygeda Augonė, head of information security at
  Swedbank): „Po skyrybų jautęsis vienišas 62-ejų vilnietis užsiregistravo pažinčių svetainėje. Ten jis susipažino su Aika
  – 28-erių medike iš Filipinų."; money was needed for „močiutės operacijai, bet ir skoloms sumokėti"; on the day of her
  flight „Ji pareiškė, kad oro uoste buvo sulaikyta ir skubiai paprašė 3000 eurų „užstatui""; he paid; „„Pinigai buvo
  iškeliavę, po to anketa užblokuojama ir tiesiog žmogus neberanda nei kontakto, nei žinių, nei pagalbos"". Source:
  https://www.tv3.lt/naujiena/lietuva/skaudi-vilniecio-meiles-istorija-lauke-28-eriu-medikes-is-filipinu-bet-prarado-tukstancius-n1494153
  (`ro-tv3a`). Secondary. The page gives no total for his loss beyond the €3,000.
- F341. **2025 in numbers, loans, and not hiding it** (same page): „Pinigų plovimo prevencijos kompetencijų centro
  duomenimis, pernai" (2025, by the article's date) „fiksuoti 456 romantinio sukčiavimo atvejai. Vidutinė išviliota suma
  siekė apie 1700 eurų, o visų nuostolių suma – beveik 800 tūkstančių eurų."; the police's Ramūnas Matonis: „„Yra atvejų,
  kai ima paskolas iš banko, kad turėtų daugiau pinigų ir padėtų būsimam mylimajam"; „specialistai ragina patikrinti, ar
  žmogaus anketa tikra, taip pat neslėpti tokio bendravimo nuo artimųjų." (`ro-tv3a`). Secondary: the centre's figures as
  tv3 reports them; the PDF they may come from could not be read. The lead's „almost a million" is not used.
- F342. **A fast love, a soldier with no internet, men too** (tv3.lt, 2026-04-12, Živilė Kielienė, fraud prevention expert
  at the Money Laundering Prevention Competence Centre): „Prasideda labai greita meilė."; often „kariškis, kuris dirba ten,
  kur nėra interneto arba jisai yra labai ribotas. Aišku, kad negalėtum paskambinti."; „Mes esame abu vienodi – tiek
  moteriška, tiek vyriška lytis pažeidžiama. Tiesiog vyrai nepripažįsta, kad jie buvo apgauti." Source:
  https://www.tv3.lt/naujiena/lietuva/kokia-tu-nuostabi-ar-koks-tu-nuostabus-eksperte-atskleidzia-kaip-vyksta-apgavystes-meiles-vardan-n1509644
  (`ro-tv3c`). Secondary (an interview).
- F343. **The pattern, and what to do** (Pinigų plovimo prevencijos kompetencijų centras, 2025-02-14, Eglė Lukošienė):
  „„Romantiniai sukčiai greitai užmezga stiprius emocinius ryšius, perdėtai reiškia meilę, kuria melagingas istorijas, žada
  dovanas, tačiau vengia susitikti asmeniškai. Jie dažnai prašo finansinės pagalbos tariamoms problemoms spręsti –
  gydymui, kelionėms ar verslui""; anyone can be a victim, „nepriklausomai nuo lyties, amžiaus ar išsilavinimo"; it „gali
  trukti savaites ar net metus"; „būtina nedelsiant nutraukti bendravimą, užblokuoti sukčiaus kontaktus ir pranešti apie
  tai teisėsaugai". Source: https://amlcenter.lt/sukciu-meiles-pinkles-kaip-nelikti-su-tuscia-saskaita-ir-sudauzyta-sirdimi/
  (`ro-aml1`). Primary. Its count for 2024 is missing from the page text (an empty figure), so none is used.
- F344. **Card or transfer, the bank's call, shame** (same page, Romas Čereška of Citadele): „Jei mokėjimas atliktas
  kortele, lėšas susigrąžinti lengviau, nes jos iš pradžių rezervuojamos. Tačiau bankiniu pavedimu pervesti pinigai pasiekia
  gavėją iš karto, todėl juos atgauti daug sudėtingiau. Jei lėšos jau pateko į sukčių sąskaitą, bankai nebegali stabdyti
  mokėjimo – tai gali spręsti tik teisėsauga"; banks call to ask „ar mokėjimas buvo atliktas jo paties valia", and some
  victims „pyksta dėl sustabdyto mokėjimo ir neigia apgavystę"; the victim is „Dažnai ją lydi gėdos jausmas, o kartais net
  savęs kaltinimas dėl susidariusios situacijos". (`ro-aml1`). Secondary (a bank's words on the centre's page).
- F345. **Your account for his money** (Lietuvos bankas, „Pinigų mulai", updated 2024-10-28): dirty money often comes from
  fraud, among it „imituojant romantinius santykius"; „Nusikaltėliams talkinančiais pinigų mulais žmonės neretai tampa
  nesąmoningai – tapę apgaulės aukomis."; „Įtariai vertinkite bet kurį prašymą pasinaudoti asmenine sąskaita."; „Jei
  įtariate, kad tapote pinigų mulu, nedelsdami sustabdykite savo sąskaitoje bet kokias mokėjimo operacijas, kurias nurodė
  atlikti potencialūs nusikaltėliai, ir apie tai praneškite savo mokėjimo paslaugų teikėjui ir policijai." Source:
  https://www.lb.lt/lt/pinigu-mulai (`ro-lbmul`). Primary. It does not say romance victims are asked to pass money on; F346
  does.
- F346. **Passing money on, loans, flattery, shame** (the Police Department, 2020-02-14, as alkas.lt published it): the
  memo says „nepervesti pinigų už sukčių į kitą sąskaitą, nes taip galima prisidėti prie pinigų plovimo"; money is also taken as
  paid bills and „aukos vardu imami kreditai"; a sign is a new acquaintance who „giria jūsų išvaizdą, charakterį, pripažįsta
  įsimylėjęs"; „Žmonės jaučiasi pažeidžiami, gėdijasi, nenori atskleisti romantinių santykių subtilybių ir dėl jų patirtų
  finansinių nuostolių." Source: https://alkas.lt/2020/02/14/policija-ispeja-saugotis-ir-romantiniu-sukciu/ (`ro-alkas`).
  Secondary and old (2020). Its lines on intimate photos are not used.
- F347. **Luminor's 2024 numbers and the masks** (Luminor, news, 2025-03-24, L. Sadeckas): scammers pose as „Jungtinių
  Tautų gydytojais, naftos platformų mechanikais ar svarbių misijų dalyviais", then ask to „apmokėti bilietus į Lietuvą ar
  išlaidas už tariamus incidentus"; a millionaire's money is out of reach because he „yra slaptoje misijoje ir negali
  pasiekti savo turtų"; „per pastaruosius metus romantinio sukčiavimo atvejų sumažėjo 47 proc., nors vidutinė prarasta suma
  išlieka didelė – apie 7 tūkst. eurų, kaip rodo 2024 m. „Luminor" banko duomenys. Daugumą nukentėjusiųjų (93 proc.) sudaro
  moterys" (average age 57); „nukentėjusių vyrų (7 proc.) vidutinis amžius siekia 50 metų". Source:
  https://www.luminor.lt/lt/naujienos/pavojingiausios-sukciavimo-schemos-sukciai-romantikai-investuotojai-verslininkai
  (`ro-luminor`). Primary. One bank's clients only.

Not used: tv3.lt n1533828 (a video blurb, its figure's source not named); jp.lt's nine-month 2025 figures (its year is
ambiguous); the Swedbank, 15min, LRT English and diena pages (not re-read for quotes); the PPPKC 2025 statistics PDF
(garbled text); Lietuvos bankas's other cases (two more of the same shape); sextortion with intimate photos (left out on
purpose, `docs/SEO-CONTENT.md` item 5).
Not found: a romance case with a year on lb.lt; a Lithuanian page on getting money back after a romance scam; a source for
the idea that romance losses exceed phone-scam losses; a police release of 2025 or 2026 on romance scams.

**B31. Paying again to get back what you paid: the fee chain** (read by Opus on 2026-11-02 from the raw text of each page;
found by a Sonnet research agent the same day; for the warning on `/jei-apgavo/`, *Išsiunčiau pinigus* and *Ko nedaryti*).
Raw pages: `%TEMP%\kurj\ls-*.html.txt`; every quote below was matched against them by script (`ls_verify.py`, 21 quotes,
0 misses). Nothing was blocked. Most sources are about investment scams, where the chain is best documented; the one
dated case of a second payment to a fake seller is F355. No Lithuanian source was found on a chain of parcel, courier or
customs fees.

- F348. **The fee appears when you try to take the money out, in every scheme** (Lietuvos bankas, news, 2026-04-16, Lukas
  Jablonskas, expert of its investment services supervision division): „Kai žmogus bando atsiimti lėšas, atsiranda
  „mokesčiai“, „komisiniai“, „techniniai patvirtinimo mokesčiai“, „pavedimo aktyvavimo mokestis“, „priežiūros institucijos
  mokestis“ ir pan.“; „Tai yra universali taktika, pasikartojanti visose investicinėse sukčiavimo schemose, nepriklausomai
  nuo jų formos.“ Source: https://www.lb.lt/lt/naujienos/neapibreztumas-sukciams-palanki-terpe (`ls-lbneapib`). Primary.
- F349. **Presented as the last step, with a deadline** (same page): „Todėl jie pateikia papildomą mokestį kaip paskutinį
  barjerą prieš tariamą pelną. Tai sukuria įspūdį, kad viskas beveik baigta, tereikia dar kelių veiksmų.“; „Sukčiai dažnai
  sako, kad mokestį reikia sumokėti šiandien, per valandą, kol „galioja sistema“.“ (`ls-lbneapib`). Primary.
- F350. **Why people pay again: sunk cost** (same page): „Psichologijoje tai vadinama sunkiai prarastų sąnaudų klaida (angl.
  sunk cost fallacy). Kai žmogus jau įdėjo pinigų, laiko ir vilčių, jam sunku pripažinti, kad buvo apgautas. Todėl jis
  renkasi „dar pabandyti“, kad pateisintų ankstesnius sprendimus.“; „Tokia schema veikia, nes žmonės nori atgauti jau
  įdėtus pinigus, o sukčiai įgudusiai manipuliuoja emocijomis.“ (`ls-lbneapib`). Primary.
- F351. **A sign you were cheated; not a cent more** (Lietuvos bankas, „Investavimas: kaip atpažinti sukčius", updated
  2024-10-28): among the signs, „jus spaudžia investuoti dar daugiau pinigų arba mokėti papildomus mokesčius;“; then
  „Nedelskite ir daugiau „neinvestuokite“ – neperveskite nė cento.“; „Jie gali mėginti su jumis susisiekti ir įtikinti jus
  toliau investuoti arba susimokėti lėšų pervedimo komisinius mokesčius.“, so „ignoruokite jų skambučius, žinutes, el.
  laiškus.“; and „Nepasiduokite tokiems įkalbinėjimams –
  pasidavę prarasite tik dar daugiau pinigų!“ Source: https://www.lb.lt/lt/investavimas-kaip-atpazinti-sukcius
  (`ls-lbatpazinti`). Primary. The page's line on paid „recovery" offers is F14/F15's and not re-recorded.
- F352. **Easy to lose, hard or impossible to get back** (Lietuvos bankas, the „Padėk ragelį" launch, 2025-12-15): of
  investment promises, „Bandant atsiimti tariamą pelną, reikalaujama papildomų mokesčių.“; and, said by Vaida Markevičienė,
  deputy chair of its board, of scams in general: „Pinigus prarasti lengva, o atgauti sunku arba iš viso neįmanoma.“ Source:
  https://www.lb.lt/lt/naujienos/pradedama-kampanija-padek-rageli-raginama-nesuteikti-sukciams-progos (`ls-lbpadek`).
  Primary.
- F353. **Paying the fees does not bring the money back** (Swedbank, its security page, no date; it mentions withdrawals
  from the second pension pillar „Nuo 2026 m.", so 2025 or 2026): „Ši sukčiavimo schema išaiškėja, kai norite atsiimti
  investuotą sumą ir uždarbį. Už lėšų grąžinimui taikomi papildomi mokesčiai, ir, net juos sumokėję, pinigų sugrąžinti
  negalėsite.“; of prizes and inheritances, „Jei, prieš gaunant paveldėjimo ar loterijos laimėjimą, Jūsų prašoma sumokėti
  mokesčius, tai yra apgaulė.“ Source: https://www.swedbank.lt/private/d2d/ebanking/secureBanking?language=LIT
  (`ls-swed`). Primary. Its line on paid „legal" help with a complaint is F186's ground, not re-recorded.
- F354. **More fees, or silence** (santaka.info, 2026-09-17, carrying Luminor's release with Mindaugas Kutkaitis, head of its
  fraud risk management): „Tačiau panorėjus išsiimti pinigus paaiškėja, kad tam reikia sumokėti papildomus mokesčius arba
  ryšys su „konsultantais“ tiesiog nutrūksta.“ Source:
  https://www.santaka.info/index.php/2026/09/17/pazadejo-greita-pelna-paliko-be-santaupu-kaip-veikia-investiciniai-sukciai/
  (`ls-santaka`). Secondary; the sentence is the article's, not a quote of him.
- F355. **A second payment to a fake seller, „for the tax inspectorate"** (LRT, BNS, 2026-10-26; Respublika the same day):
  a woman paid for firewood advertised on social media and got none; „Vėliau E. Kaleckas iš jos pareikalavo papildomo
  mokesčio, melagingai nurodydamas, neva šis skirtas Valstybinei mokesčių inspekcijai už sąskaitos anuliavimą ir pinigų
  grąžinimą. Taip nukentėjusioji iš viso prarado beveik 850 eurų.“; Respublika: „Nukentėjusioji atliko dar vieną
  pervedimą, tačiau žadėtų pinigų neatgavo.“ On appeal, „Apeliacinės instancijos Panevėžio apygardos teismas atmetė
  [his] skundą, vyrui palikdamas galioti realią vienų metų laisvės atėmimo bausmę“; the order took effect on 13
  October (2026, by the article's date) and may still go to cassation. Sources:
  https://lrt.lt/naujienos/lietuvoje/2/3094405/teismas-850-euru-uz-malkas-ir-apgaulingas-paslaugas-isviliojusi-vyra-siuncia-i-kalejima
  (`ls-lrtmalk`) and
  https://respublika.lt/lt/naujienos/lietuva/nusikaltimai_ir_nelaimes/apgavyste-del-malku-perpilde-taure----6-kartus-teista-sukciu-pasodino-uz-grotu
  (`ls-respmalk`). Secondary (press on a court ruling). Pages name the convicted man; ours does not.

Not used: Lietuvos bankas's 2026-03-05 commentary (`ls-lbdekon`, the same point as F348); the Lithuanian Banks' Association's
2022 „Viktoras" story (`ls-lba`, a composite, old); financiallithuanians.lt (not an official body); the Klaipėda police on
prize tax (`ls-polkl`, 2023, one advance fee, not a chain); the police's 2026 „customs fee" phishing case (`ls-polmuito`,
card data, not a second payment); LB dispute decisions (their text loads by script).
Not found: a Lithuanian source on chains of parcel, courier, customs, „insurance" or „release" fees; a count of victims who
paid more than once.

**B32. The fake state site** (read by Opus on 2026-11-02 from the raw text of each page; found by a Sonnet research agent
the same day; for a scenario of its own, `docs/SEO-CONTENT.md` fresh list item 6). Raw pages: `%TEMP%\kurj\vs-*.html.txt`;
every quote below was matched against them by script (`vs_verify.py`, 35 quotes, 0 misses). Blocked and not got around:
regitra.lt and eregitra.lt (a WAF rejection), vmi.lt (a bot challenge), registrucentras.lt (a stub). Already recorded and
reused, not repeated here: F142 (VMI: every address ends in „.vmi.lt", no search ads), F217 (seven investigations on
2026-10-27), F276 (the Vilnius police on clones, PIN1 and PIN2), F298 (Regitra's two domains, regitra.lt and eregitra.lt),
F320 (Sodra's PIN1-then-PIN2 case), F164–F166 (Smart-ID).

- F356. **Sodra: the SMS, the look-alike link, the tells** (Sodra, news, 2026-10-22): the SMS says „Jūsų asmens duomenys dar
  nėra atnaujinti"; „Šalia pateikiamas kenkėjiška nuoroda, panaši į „Sodros“ svetainės adresą."; such links „nukreipia į
  sukčių sukurtus puslapius, kuriuose bandoma išvilioti prisijungimo prie asmeninių paskyrų, elektroninės bankininkystės ar
  kitus jautrius duomenis."; „jei nuoroda baigiasi .net, .com, .eu, .info, .online, interneto adrese naudojamas papildomas
  brūkšnys, kitos raidės ar žodžiai, pavyzdžiui, esodra arba sodralit, tai nėra „Sodros“ interneto svetainė;"; „„Sodra“ SMS
  žinutėmis neprašo pervesti pinigų, patvirtinti banko operacijų, pateikti banko kortelės duomenų, suvesti PIN kodų ar
  priimti skubių finansinių sprendimų." Source:
  https://sodra.lt/naujienos/sukciai-siaucia-toliau-sodros-vardu-siuncia-sms-zinutes-ir-praso-atnaujinti-duomenis
  (`vs-sodra1022`). Primary.
- F357. **Sodra: the address ends in .lt, and its services are free** (Sodra, news, 2025-11-07): „oficialus „Sodros“
  svetainės adresas baigiasi galūne .lt."; „visos „Sodros“ paslaugos yra nemokamos, o „Sodros“ darbuotojai telefonu ar
  elektroniniais laiškais niekada neprašo nurodyti asmens kodo, banko prisijungimų, kortelės ar elektroninio parašo
  duomenų." Source: https://sodra.lt/naujienos/sukciai-gali-taikytis-laiskais-ir-sms-zinutemis-sodros-vardu-ka-daryti
  (`vs-sodrapaly`). Primary. It does not speak of other institutions' fees (Regitra charges for some services: F366).
- F358. **E. sveikata: type the address yourself, not through search** (the Ministry of Health with the Registrų centras,
  updated 2025-01-08): „Rekomenduojama visą esveikata.lt adresą suvesti patiems, nesinaudojant paieškos sistema."; „įsitikinkite,
  kad adreso galūnė yra lietuviška (esveikata.lt)."; reported fakes are passed on „Nacionaliniam kibernetinio saugumo centrui
  (NKSC), kad šios svetainės būtų užblokuotos"; „praneškite policijai per www.epolicija.lt arba telefonu 112." Source:
  https://sam.lrv.lt/lt/news/bukime-saugus-i-ka-svarbu-atkreipti-demesi-jungiantis-prie-esveikatalt-portalo/ (`vs-samesv`).
  Primary. Not used: its line that the address must carry „https" (F213: the padlock proves nothing).
- F359. **The state login asks PIN1; PIN2 is mostly for payments** (TV3, 2025-01-08, quoting the police): „jungiantis prie
  paskyros per Elektroninius valdžios vartus, įprastai reikalaujama jungimąsi patvirtinti SMART-ID PIN 1 kodu. PIN 2
  dažniausiai reikalingas mokėjimų patvirtinimams, o jungiantis prie paskyrų nereikalaujamas." Source:
  https://www.tv3.lt/naujiena/lietuva/policija-ispeja-apie-gresme-jungiantis-prie-e-sveikatos-zmones-bukite-atsargus-n1389726
  (`vs-tv3esvpol`). Secondary. „įprastai" and „dažniausiai" are its words: a page says PIN2 is not needed to log in, never
  that a state site never asks PIN2 (signing does, F165).
- F360. **No institution asks for your login or codes** (the Ministry of Social Security and Labour, 2026-04-07, on
  pension-fund payouts): „nei bankai, nei valstybės institucijos neprašo atskleisti prisijungimo duomenų, slaptažodžių ar
  patvirtinimo kodų"; „jei buvo atskleisti prisijungimo duomenys – nedelsiant juos pakeisti". Source:
  https://socmin.lrv.lt/lt/naujienos/ismokant-antros-pensiju-kaupimo-lesas-gyventojams-raginimas-islikti-budriems-del-sukciu-5WF/
  (`vs-socmin2pk`). Primary. „Neprašo atskleisti" means asking you to hand them over (by phone or message); logging in to
  the state's own site with the bank is not that.
- F361. **E. sveikata clones in January 2025, and a paid search ad** (TV3, 2025-01-08): „Į esveikata.lt panašią svetainę
  sukūrę sukčiai per praėjusią dieną pavogė 3 tūkst. eurų" (its headline). Source:
  https://www.tv3.lt/naujiena/lietuva/i-esveikata-lt-panasia-svetaine-sukure-sukciai-per-praejusia-diena-pavoge-3-tukst-euru-n1389667
  (`vs-tv3esv3k`). Reidas (reidasofficial.lt, 2025-01-19): „Vien per pastarąjį mėnesį aštuoni nukentėjusieji iš Šiaulių ir
  Telšių apskričių pranešė patekę į tokių sukčių pinkles ir praradę nuo 700 iki 1200 eurų."; a picture caption: „Sukčiai
  užsakė „Google“ mokamą reklamą netikram e. Sveikatos portalui, kad jis būtų pirmoje „Google“ paieškos vietoje." Source:
  https://reidasofficial.lt/naujienos/kaip-atpazinti-sukciavimo-svetaines-kurios-pavagia-jusu-pinigus/ (`vs-reidaskaip`).
  Secondary; the caption is the outlet's own claim, not a quote of the police.
- F362. **Tauragė county: rising, €605 to €6,900 each** (the Tauragė county police's weekly review, 2026-10-26, 19–25
  October): „Pastaruoju metu daugėja sukčiavimo atvejų, kai gyventojai, prisijungę prie suklastotų „E. sveikatos“,
  „Regitros“ ar „Sodros“ interneto svetainių, praranda pinigus. Tauragės ir Šilutės rajonų gyventojai tokiu būdu neteko nuo
  605 iki 6 900 eurų." Source: https://taurage.policija.lrv.lt/lt/naujienos/savaites-ivykiu-apzvalga-spalio-19-d-spalio-25-d-CRyb/
  (`vs-tauragesav`). Primary. The review's weekly total of over €16,000 includes an online purchase and is not used.
- F363. **Registering a motorcycle: €2,940** (jp.lt, 2026-10-27, Šiauliai county police data): a man (born 1975),
  „siekdamas įregistruoti motociklą, prisijungė prie netikros bendrovės „Regitra“ interneto svetainės, suvedė elektroninės
  bankininkystės duomenis ir neteko 2 940 eurų."; another man „neteko 1,1 tūkst. eurų." Source:
  https://jp.lt/siauliu-apskrityje-sukciai-is-triju-zmoniu-isviliojo-apie-64-tukst-euru/ (`vs-jpsiauliai`). Secondary.
- F364. **More October 2026 cases** (Secondary, regional press on police data): Marijampolė, a woman „bandydama prisijungti
  prie galimai netikro „Regitros“ internetinio puslapio ir suvedusi prisijungimo duomenis, banko sąskaitoje prarado 1 490
  eurų." (respublika.lt, 2026-10-06,
  https://www.respublika.lt/lt/naujienos/lietuva/nusikaltimai_ir_nelaimes/sukciai-is-gyventoju-isviliojo-apie-634-tukst-euru/,
  `vs-respublika634`); Šakiai district, „prisijungęs prie netikros „Regitros“ svetainės vyras neteko beveik 5 tūkst. eurų"
  (suduvosgidas.lt, 2026-10-07, its headline,
  https://suduvosgidas.lt/finansiniai-sukciai-sakiu-rajone-prisijunges-prie-netikros-regitros-svetaines-vyras-neteko-beveik-5-tukst-euru/,
  `vs-sudsakiai`); Šilutė, a woman of 58 trying to reach Sodra's site entered her bank login on a fake one: „Netrukus iš
  šilutiškės banko sąskaitos dingo pinigai - 319 eurų." (ve.lt, 2026-10-30,
  https://ve.lt/kriminalai/zabangu-nepastebejo-prisijungus-prie-suklastoto-sodros-puslapio-pinigai-iskeliavo-i,
  `vs-vezabang`); Klaipėda district, on 18 October, a man reaching „eSveikata" from a phone: criminals „pasisavino 989 eurus."
  (ve.lt, 2026-10-20, https://ve.lt/kriminalai/suklastotu-internetiniu-svetainiu-spastai-neteko-simtu-euru, `vs-vesuklast`).
- F365. **The search route, as an outlet tells it** (reidasofficial.lt, 2026-10-07): a woman wanting Regitra's self-service
  „Adreso nerinko. Įvedė pavadinimą į „Google“ ir paspaudė pirmą nuorodą."; „Sukčiai savo kopijas iškelia į paieškos viršų
  mokama reklama ir optimizavimo triukais." Source:
  https://reidasofficial.lt/kriminalai/netikras-regitros-portalas-google-paieskoje-sukciai/ (`vs-rdgoogle`). Secondary, an
  outlet's illustration rather than a police case; a page may use it for the route, not as a case with a loss.
- F366. **Regitra does charge online for some services** (LRT, 2026-09-18): from October the owner's declaration code (SDK) issued online is
  charged too, „dabar teks mokėti už visas deklaravimo paslaugas internetu po 3,36 euro." Source:
  https://www.lrt.lt/naujienos/eismas/7/3055236/regitra-apmokestina-internetu-isduodama-automobilio-sdk-naujoviu-zadama-ir-daugiau
  (`vs-lrtsdk`). Secondary. So a page must not say a state site never asks for payment; the tell is how you got there and a
  login that asks PIN2.

Not used: Sodra's login guide PDF (`vs-sodralogin`, its URL not recorded); Smart-ID's English scam page (F164–F166 say it);
kaipkada.lt (it calls eregitra.lt the fake, against F298); reidasofficial.lt on foreign vignette intermediaries (not a state
service); diena.lt's „almost €60,000" (all of one day's cases); the SAM page's „https" line.
Not found: a Lithuanian source on paid „helper" sites that charge for a free state service; anything from Migracija,
epaslaugos.lt or the Registrų centras itself; a count of victims of fake state sites for a year.

**B33. The fake contest or prize in a shop's name** (read by Opus on 2026-11-02 from the raw text of each page; found by a
Sonnet research agent the same day; for a scenario of its own, `docs/SEO-CONTENT.md` fresh list item 7). Raw pages:
`%TEMP%\kurj\kp-*.html.txt`, the Iki release at `%TEMP%\seo2\tv3\tv3-n1563226.html.txt`, the Klaipėda police page at
`%TEMP%\kurj\ls-polkl.html.txt`; every quote below was matched against them by script or grep (`kp_verify.py`, 44 quotes, 0 misses, and 6 more by grep).
Nothing was blocked. Already recorded and reused, not repeated here: F157 (a hijacked friend's „laimėjote 1200 €"), F353
(Swedbank: a fee before a lottery win is a scam), F2 (reporting to the police at epolicija.lt).

- F367. **Iki: fake posts in its name, during its own prize campaign** (Iki's press release, carried by tv3.lt, 2026-10-27
  12:50): „Pastaruoju metu „Facebook“ tinkle fiksuojami apgaulingi įrašai, kuriuose neteisėtai naudojamas prekybos tinklo
  pavadinimas, vykdomos kampanijos, naudojamas logotipas bei vizualiniai elementai siekiant išvilioti gyventojų asmeninius ir,
  galimai, bankinius duomenis."; „Šį mėnesį pradėjome švęsti savo 35 gimtadienį, programėlėje pirkėjai gali laimėti nemažai
  prizų, tad ši informacija tapo ir sukčių taikiniu." Source:
  https://www.tv3.lt/naujiena/gyvenimas/nauja-sukciu-afera-lietuvoje-prigauna-net-pacius-sumaniausius-skubiai-ispeja-visus-n1563226
  (`tv3-n1563226`). Primary (the company's own release,
  credited „Pranešimas spaudai"). It gives no victims and no amounts.
- F368. **Iki: how it runs** (same release): „Dažniausiai socialiniuose tinkluose sukuriamos netikros paskyros, kurios skelbia
  tariamus konkursus, apklausas ar prizų dalybas. Norint dalyvauti ar atsiimti neva laimėtą prizą, gyventojai raginami
  paspausti pateiktą nuorodą ar užpildyti apklausą."; the sites „gali būti labai panašios į oficialius puslapius arba naudoti
  įmonės logotipą. Jose prašoma pateikti asmeninius duomenis, prisijungimo informaciją, banko kortelės duomenis arba patvirtinti
  tariamą mokėjimą už prizo pristatymą." Primary.
- F369. **Iki: where real contests are, and what it never asks** (same release; Gintarė Kitovė, head of communications):
  „Oficialūs mūsų konkursai ir žaidimai skelbiami tik mūsų interneto svetainėje www.iki.lt, „Iki“ mobiliojoje programėlėje bei
  oficialiuose socialinių tinklų kanaluose. Niekada neprašome pateikti banko kortelės duomenų ar atlikti mokėjimo tam, kad būtų
  galima atsiimti prizą"; „parduotuvių tinklas niekada neprašo banko kortelės duomenų tam, kad būtų galima atsiimti prizą ar
  sumokėti už jo pristatymą." Primary. It speaks for Iki only.
- F370. **Iki: the tells** (same release): „Įtariai vertinkite pasiūlymus, kurie žada itin vertingus prizus užpildžius apklausą
  ar skelbia, kad laimės visi dalyviai."; „Visada patikrinkite, ar konkursą skelbia oficiali paskyra, interneto svetainė arba
  mobilioji programėlė." Primary.
- F371. **Iki: after entering details** (same release): „rekomenduojama nedelsiant pakeisti naudojamus slaptažodžius. Jei buvo
  pateikta banko kortelės ar sąskaitos informacija, reikėtų kuo greičiau susisiekti su savo banku."; „Taip pat svarbu apie
  incidentą nedelsiant pranešti policijai." Primary.
- F372. **Maxima: the same scheme, in its name** (Maxima's press release, carried by 15min.lt, 2026-07-16 11:39, and
  kauno.diena.lt, 11:17; Ernesta Vareikytė, head of media relations): „Žinomų prekių ženklų vardais prisidengiantys sukčiai
  socialiniuose tinkluose dažnai skelbia netikrus konkursus, žaidimus ar apklausas, kuriose žadami pinigai, automobiliai ir kiti
  vertingi prizai."; the posts use „įmonės pavadinimas, logotipas ar į oficialią paskyrą panašus profilis. Sukčiai taip pat gali
  rašyti iš tikroviškai atrodančių asmenų paskyrų, prisistatyti tarpininkais, kviesti jungtis prie grupių ar pildyti anketas."
  Source: https://www.15min.lt/verslas/naujiena/bendroves/zada-automobilius-ir-pinigus-bet-siekia-jusu-duomenu-nauja-sukciu-taktika-663-2725268
  (`kp-15min-zada`); https://kauno.diena.lt/naujienos/verslas/imoniu-pulsas/netikri-konkursai-ir-viliojantys-prizai-maxima-primena-kaip-atpazinti-sukcius-1765943
  (`kp-kauno-maxima`). Primary (the company's release). Its warning of 2025-09-12 names the channels: „„Facebook“, „Messenger“
  ir kituose kanaluose", offering „laimėti pinigų, automobilių ar kitų vertingų prizų" (15min.lt,
  https://www.15min.lt/verslas/naujiena/bendroves/maxima-perspeja-apie-netikrus-imones-vardu-rengiamus-konkursus-663-2523692,
  `kp-15min-maxima`).
- F373. **Maxima: what it never does, and the look-alike name** (the 2026-07-16 release): „„Maxima“ niekada neprašo pateikti
  asmeninės informacijos, slaptažodžių ar prisijungimo prie bankinių paslaugų duomenų."; fake accounts have names „labai panašūs
  į tikras įmonių paskyras, pavyzdžiui, „Maxima Lietuva.fans“. Tačiau oficiali „Maximos“ „Facebook“ paskyra yra tik viena –
  pavadinimu „Maxima LT“."; „„Maxima“ neturi tarpininkų ir konkursų ar pasiūlymų nevykdo per privačias asmenų paskyras ar
  neoficialias grupes." Primary. It speaks for Maxima only.
- F374. **Maxima: the hurry and the errors** (the 2026-07-16 release): scammers urge speed, e.g. „patvirtinkite registraciją
  užpildydami apklausą ir nurodydami savo el. pašto adresą. Nepraleiskite šios ribotos galimybės"; „Įrašuose, žinutėse ir
  pranešimuose būna gramatinių klaidų". Primary.
- F375. **Maxima: after giving details** (the 2026-07-16 release): „Jei pateikėte finansinius duomenis, nedelsiant informuokite
  savo banką, jei reikia – užblokuokite sąskaitas."; „Jei jau nukentėjote – kuo greičiau apie tai praneškite policijai,
  naudojantis elektroninių paslaugų portalu." Maxima says it watches the networks and blocks fake profiles, with the police's
  virtual patrol helping. Primary.
- F376. **Maxima: a „game" in Messenger asking for e-banking codes** (alkas.lt, 2025-03-04 13:50, „Parengta pagal „Maximos“
  pranešimą"): „plinta neva „Maximos“ žaidimas, kuriame galima laimėti pinigų – prašoma paspausti nuorodą, kur esą reikia
  suvesti elektroninės bankininkystės kodus."; a tell: „laimėjote konkursą, tačiau turite atsakyti per 24 valandas ar kuo
  greičiau paspausti nuorodą ir pasidalinti jautriais duomenimis"; „įmonės konkursus skelbia viešai, o ne siunčia asmenine
  žinute."; „Įmonės organizuojamos akcijos ir konkursai visada yra skelbiami oficialioje „Maxima“ svetainėje www.maxima.lt".
  Source: https://alkas.lt/2025/03/04/maxima-perspeja-apie-netikrus-imones-vardu-teikiamus-pasiulymus
  (`kp-alkas-maxima`). Secondary (the press carrying the release).
- F377. **A fake birthday post shared thousands of times** (LRT.lt, 2023-09-29 14:03): a fake Maxima post promised „1 200
  nemokamų pirkinių paketų visiems, kurie mūsų puslapyje parašys „su gimtadieniu“" plus money and phones; „juo iš viso pasidalijo
  daugiau nei 5,3 tūkst. gyventojų". Bitė's head of communications, Jaunius Špakauskas, on the tells: „keisti rašmenys, brūkšneliai
  ar skaičiai" in the name; check „kiek sekėjų ar draugų turi profilis, kada jis sukurtas"; grammar errors and little about how
  winners are chosen. Source: https://www.lrt.lt/naujienos/verslas/4/2088522/patikejo-tukstanciai-gyventoju-maxima-nedalina-telefonu-ir-nemokamu-pirkiniu-paketu
  (`kp-lrt-maxima-telefonai`). Secondary.
- F378. **Everyone „wins", then a form** (LRT.lt, 2021-11-05, quoting Maxima): „visi dalyvaujantys laimi momentinis prizus, o
  laimėjusių prašoma užpildyti anketas su asmeniniais duomenimis". Maxima knew of no victims then. Source:
  https://www.lrt.lt/naujienos/verslas/4/1535332/didziausias-prekybos-tinklas-ispeja-maximos-vardu-internete-isplito-melagingi-konkursai-sukciai-praso-asmens-duomenu
  (`kp-lrt-maxima-konkursai`). Secondary. Five years old: it shows the scheme is long-running, nothing more.
- F379. **The police: a prize never costs a fee in advance** (Klaipėdos apskrities VPK, „Kaip apsisaugoti nuo telefoninių sukčių",
  updated 2023-12-03): among the schemes, „Atsitiktinio pirkėjo atrinkimas prekybos centre ir piniginio prizo laimėjimas";
  „Niekada iš laimėtojo nereikalaujama susimokėti pridėtinės vertės mokesčio ar kito mokesčio iš anksto"; the organiser never asks
  for money through intermediaries or a bank transfer. Source:
  https://klaipeda.policija.lrv.lt/lt/bendruomenes-pareigunu-informacija/bendruomenes-pareigunu-patarimai-gyventojams/kaip-apsisaugoti-nuo-telefoniniu-sukciu/
  (`ls-polkl`). Primary. It is about prizes announced by phone or SMS, not social networks.
- F380. **Share it in six groups, then the link** (tv3.lt, 2024-10-06, with the police spokesman Ramūnas Matonis): a fake
  Facebook giveaway of a house, on a page „sukurta tik šių metų rugsėjo 24 d.", asked people to share it „bent 6 skirtingose
  „Facebook“ grupėse", then sent a link; the police: „raginame nespausti nuorodos, perspėti savo draugus, o apie tokius skelbimus
  pranešti policijai". Source: https://www.tv3.lt/naujiena/naujienos/masiskai-plinta-klastinga-sukciu-afera-policija-ragina-butinai-ispeti-draugus-ir-artimuosius-n1367994
  (`kp-tv3-namas`). Secondary. Not in a shop's name; it shows the share-and-comment step.
- F381. **FOREIGN (Latvia): a Rimi giveaway that wanted only the delivery fee** (LSM, Re:Check, 2026-02-02): a survey, then
  „Cilvēkiem būšot jāmaksā tikai par piegādi – nepilni trīs eiro."; the page was „izveidota vien dažas dienas pirms „akcijas“
  publicēšanas"; Rimi: „šāds saldumu konkurss nav „Rimi“ rīkots"; pages called „Maxima Fans" and „Lidl Fans" ran a car giveaway;
  why: „Šādā veidā var mēģināt piesaistīt pēc iespējas vairāk sekotāju lapai." Source:
  https://www.lsm.lv/raksts/zinas/latvija/02.02.2026-ka-atpazit-krapnieku-rikotus-viltus-konkursus-platforma-facebook.a632416/
  (`kp-lsm`). Secondary, foreign: a page may say it happened next door, never that it happened here.

Not used: kaipkada.lt's rewrite of the Iki release (`kp-kaipkada-iki`; its „nedidelė prizo pristatymo išlaida" is the journalist's,
and F368 says it in Iki's words); madeinvilnius.lt (the release verbatim); reidasofficial.lt on a Škoda giveaway turning into a
subscription (a translated Polish article); LRT on fake discount pages (`kp-lrt-nuolaidos`, not contests); Meta's safety page.
Not found: any amount lost to a shop-contest scam in Lithuania; a 2025–2026 Lithuanian police warning about shop contests; any
warning from Lidl, Rimi (in Lithuania), Norfa, Senukai, Telia, Bolt, Wolt, Omniva or LP Express; NKSC, RRT or atpazinksukciu.lt
on contests.

**B34. The money mule, „pinigų mulas"** (read by Opus on 2026-11-02 from the raw text of each page; found by a Sonnet
research agent the same day; for the glossary page `/zodynas/pinigu-mulas/`, `docs/SEO-CONTENT.md` fresh list item 8). Raw
pages: `%TEMP%\kurj\mu-*.html.txt` and `ro-lbmul.html.txt`; every quote below was matched against them by script
(`mu_verify.py`, 59 quotes, 0 misses). Blocked: e-seimas.lrs.lt (403; not got around). Already recorded and reused, not
repeated here: F345 (Lietuvos bankas, „Pinigų mulai": often unwitting, suspicion of any request to use your account, stop and
tell the payment provider and the police), F346 (police, 2020: transferring money on for a scammer can contribute to money
laundering), F2 (reporting at epolicija.lt).

- F382. **FNTT: what a money mule is** (Finansinių nusikaltimų tyrimo tarnyba, „FNTT paaiškina: kas yra pinigų mulai ir kaip
  jais netapti", updated 2023-10-04): „Pinigų mulai – tai viena iš nusikaltėlių naudojamų pinigų plovimo schemų, įtraukianti ratą
  žmonių, kurie už atlygį sutinka panaudoti savo asmenines sąskaitas nelegaliai uždirbtų pinigų legalizavimui, pervedimui ar
  išgryninimui."; some do it knowingly, „Tačiau nemaža dalis žmonių pinigų mulais gali tapti net patys to neįtardami." Source:
  https://fntt.lrv.lt/lt/naujienos/fntt-paaiskina-kas-yra-pinigu-mulai-ir-kaip-jais-netapti/ (`mu-fntt`). Primary.
- F383. **FNTT: how people are drawn in** (same page): „Sukčiai, ieškodami potencialių pinigų mulų, pasitelkia darbo skelbimus,
  reklamuojasi socialiniuose tinkluose, siūlydami greitą uždarbį, galimybę užsidirbti neįdedant pastangų ir pan."; fake job ads
  „žadančiais apskaitininko, buhalterio, sistemų testuotojo darbą arba komisinį atlygį už „sąskaitų administravimą""; „Pinigų
  mulais gali tapti ir studentai ar moksleiviai, internete ar socialiniuose tinkluose susivilioję pasiūlymais greitai ir lengvai
  gauti pinigų už padarytus pervedimus ar išgrynintus pinigus". Primary.
- F384. **FNTT: online gambling accounts too** (same page): „Pinigų mulais galima tapti ne tik atveriant nusikaltėliams
  galimybę naudotis finansų įstaigose atidarytomis sąskaitomis, bet ir nuotolinių lošimų paskyromis." Primary.
- F385. **FNTT: the test and the advice** (same page): „Būkite įtarūs dėl pažadų gauti pinigų mainais už lėšų pervedimą per
  savo sąskaitą. Jokia teisėta įmonė neprašys to padaryti."; „Niekada neatidarykite banko sąskaitos kitiems asmenims, naudodami
  savo asmens duomenis. Taip pat nesutikite, kad kažkas naudotųsi Jūsų banko sąskaita neaiškioms operacijoms atlikti." Primary.
- F386. **FNTT: what it costs the mule** (same page): „Pinigų mulu tapęs asmuo rizikuoja ne tik negauti žadėto uždarbio, bet ir
  sulaukti teisinių pasekmių – baudžiamosios atsakomybės, nes toks asmuo laikomas nusikaltimo bendrininku. Be to, bus užšaldomos
  visos asmens turimos sąskaitos, sugadinta kredito istorija ir asmeninė reputacija." Primary. It is the agency's warning, not a
  court's finding: it does not say every unwitting mule is convicted, and no source we read reports such a conviction (Not
  found, below).
- F387. **FNTT: what to do** (same page): „Jei įtariate, kad Jūsų sąskaita gali būti naudojama neaiškiems pinigams pervesti, kuo
  greičiau nutraukite bet kokį bendradarbiavimą su asmenimis, kurie naudojasi Jūsų duomenimis, daugiau nevykdykite jokių
  pervedimų, susisiekite su savo banku bei informuokite atsakingas teisėsaugos institucijas." Primary.
- F388. **Lietuvos bankas, 2020: definition, channels, who** („Lietuvos bankas įspėja: būkite atsargūs – netapkite pinigų
  mulais", 2020-08-26): „Pinigų mulas (angl. money mule) – žmogus, kuris į savo banko sąskaitą gauna pinigus iš vienų asmenų, o
  šiuos pinigus perveda kitiems asmenims arba išgrynina ir perduoda nusikaltėliams dažnu atveju už tai gaudamas tam tikrą
  užmokestį ir (arba) naudą kitais būdais."; criminals use mules to stay anonymous, „atsakomybę permesdami kitam asmeniui"; „Jie
  gali bandyti susisiekti asmeniškai, el. paštu, telefonu, veikti internetinėje erdvėje – per darbo skelbimus, pažinčių svetaines,
  socialiniuose tinkluose."; „mažesnes pajamas gaunančiais asmenimis – studentais, imigrantais, bedarbiais, pensininkais"; the
  advice: „niekada neatidarykite banko sąskaitos savo vardu kito asmens prašymu, neperduokite prisijungimo prie savo banko
  sąskaitos ar kitos jautrios finansinės informacijos duomenų, atsisakykite siųsti ar gauti nežinomų asmenų arba įmonių pinigus,
  neatskleiskite savo asmens duomenų."; „Jeigu įtariate, kad Jumis siekiama pasinaudoti nusikalstamais tikslais, nedelsdami
  kreipkitės į Lietuvos teisėsaugos institucijas."; Eglė Kontautaitė, head of its AML division: „Pasiūlymas leisti pasinaudoti
  savo sąskaita ir už tai gauti kažkiek pinigų gali baigtis baudžiamąja atsakomybe ir prarastomis lėšomis." Source:
  https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-bukite-atsargus-netapkite-pinigu-mulais (`mu-lbispeja`). Primary.
  „Pažinčių svetaines" is the only official mention of dating sites as a channel; no source ties a romance scam to recruiting a
  mule in Lithuania.
- F389. **Lietuvos bankas, 2023: the request is the sign** („Perspėja: papildomo lengvo uždarbio paieškos gali baigtis
  baudžiamąja atsakomybe", 2023-09-19; Miroslava Kryštul, chief lawyer): „Toks prašymas yra aiški indikacija, kad galite tapti
  pinigų mulu, o pasiūlymas leisti pasinaudoti savo sąskaita ir už tai gauti kažkiek pinigų gali baigtis baudžiamąja atsakomybe
  ir prarastomis lėšomis"; „Pinigų mulai – tai žmonės, kurie savo mokėjimo sąskaitą už atlygį „paskolina" kitiems asmenims
  pinigams išsigryninti ar pervesti į kitą sąskaitą, savo vardu atidaro sąskaitą ir leidžia ja naudotis kitiems."; „nusikaltėlių
  taikiniu verbuojant dažniau tampa 18–34 metų vyrai"; the pitch: „stengiamasi įtikinti, kad tokia veikla visiškai nerizikinga,
  žadamas didesnis užmokestis, jei į šią veiklą auka įtrauks ir savo draugus." Source:
  https://www.lb.lt/lt/naujienos/perspeja-papildomo-lengvo-uzdarbio-paieskos-gali-baigtis-baudziamaja-atsakomybe (`mu-lbbaud`).
  Primary.
- F390. **SEB: not knowing is no defence; the consequences** („Pinigų mulų istorijos: pradžioje lengvas uždarbis, bet po to
  dideli sunkumai", 2024-03-20; Daiva Uosytė, head of SEB's prevention department): „Nusikaltėliams talkinančiais pinigų mulais
  žmonės neretai tampa nesąmoningai – tapę apgaulės aukomis."; „dažnai jie nežino tikrojo pinigų pervedimo tikslo. Tačiau
  nežinojimas neatleidžia nuo atsakomybės. Tai yra pinigų plovimas – neteisėta veikla, už kurią gresia teisinės pasekmės.";
  „Pinigų mulams Lietuvoje gresia baudžiamoji atsakomybė ir ilgalaikiai padariniai, pavyzdžiui, apribojama galimybė turėti banko
  sąskaitą, naudotis finansinėmis paslaugomis, taip pat aukos susiduria su kitomis pasekmėmis kaip šantažas, grasinimai ir kitas
  psichologinis ar net fizinis smurtas." Source:
  https://www.seb.lt/infobankas/naujienos/pinigu-mulu-istorijos-pradziu-lengvas-uzdarbis-bet-po-dideli-sunkumai (`mu-seb`).
  Primary (the bank's own page).
- F391. **SEB: the jobs, the channels, the tells** (same page): a „darbo pasiūlymą iš namų dirbti „pinigų pervedimo agentu".
  Tereikėjo tik asmeninės banko sąskaitos numerio."; a parcel-packing job with access to the account asked alongside: „nusikaltėliams
  reikėjo ne darbščių rankų, o sąskaitos"; a single mother kept a share and sent the rest on or cashed it; channels: „„Facebook",
  „Instagram" ar „TikTok", taip pat pokalbių programėlėmis, pavyzdžiui, „WhatsApp", „Viber""; „Dažnai šie skelbimai nurodo, kad
  tokiu būdu užsidirbant niekuo nerizikuojama. Kai kurie pasiūlymai netgi žada papildomą atlygį į veiklą įtraukus daugiau
  žmonių."; „kandidatams nekeliama jokių išsilavinimo ir patirties reikalavimų"; „Jei darbo pasiūlymas skamba pernelyg gerai, kad
  būtų tiesa, greičiausiai taip ir yra." Primary.
- F392. **Swedbank: the „accountant" job, and how mules are found** (Swedbank blog, 2022-08-24): a young woman found an ad on
  social networks and believed she was an accountant: „Jos buvo prašoma į savo sąskaitą priimti „įmonės" klientų mokėjimus ir
  pervesti juos į sąskaitą Maltoje. Už tokį tarpininkavimą sukčiai jai pasiūlė 10 proc. dydžio atlygį nuo gaunamų sumų.";
  „jokia patikima įmonė savo piniginėms operacijoms neieškos atsitiktinių sąskaitų tarpininkų."; the other victims „anksčiau ar
  vėliau kreipiasi į banką ir/arba policiją, ir šie pričiumpa savo sąskaita sukčiams pasinaudoti leidusį žmogų."; the lender of an
  account „rizikuoja niekuomet ar itin ilgą laiką negauti jokių paskolų, lizingo paslaugos ar tiesiog kreditinės kortelės.";
  shame may make one doubt „ar verta prisipažinti", but „laikas ir delsimas tikrai nėra sąjungininkas tokioje situacijoje."
  Source: https://blog.swedbank.lt/saugumas-finansu-laboratorija/pinigu-mulai-kaip-lengvas-uzdarbis-gali-paversti-sunkaus-nusikaltimo-bendrininkais
  (`mu-swed1`). Primary.
- F393. **Swedbank: the steps** (Swedbank press release, 2022-10-14, the same text shortened): „Jei visgi supratote, kad
  dalyvaujate sukčių schemoje, nedelsiant stabdykite pinigų pavedimus ar grynųjų išėmimą iš bankomato. Nieko nelaukdami
  susisiekite su savo banku ir informuokite jį apie tai. Taip pat kreipkitės į policiją ir bendradarbiaukite, padedant
  išsiaiškinti tikruosius nusikaltėlius." Source:
  https://blog.swedbank.lt/pranesimai-spaudai/pinigu-mulai-kaip-lengvas-uzdarbis-gali-paversti-nusikaltimo-bendrininkais
  (`mu-swed2`). Primary.
- F394. **SEB on LRT, 2020: „lend me your account", and the bank's reaction** (Audrius Šapola, then SEB's prevention head,
  opinion on lrt.lt, 2020-04-09): „Pinigų mulas – žmogus už atlygį sutikęs paskolinti savo sąskaitą sukčiams."; the stories:
  „neteisingai nuskriausti antstolių, sąskaita areštuota dėl apmaudžios klaidos ar COVID–19 pandemijos. Paslaugos jiems reikia
  greitai, todėl už operatyvią pagalbą žadamas 50, 100 ar net 200 eurų atlygis."; the bank: „iškart apribojama galimybė toliau ja
  naudotis, nutraukiami santykiai su į sukčiavimo schemą įsipainiojusiu klientu. Taip pinigų mulas nebegali naudotis kortele,
  interneto banku."; „už atlygį paskolinta sąskaita žmogų paverčia atpirkimo ožiu." Source:
  https://www.lrt.lt/naujienos/verslo-pozicija/692/1161851/audrius-sapola-i-sukciu-pinkles-patekes-zmogus-tampa-pinigu-mulu-o-po-to-ir-atpirkimo-oziu
  (`mu-lrtsapola`). Secondary (a bank's officer writing in the press). Six years old: the story shape holds, the 2020 sums are
  that year's.
- F395. **Luminor: the job that moves money** (Luminor, 2024-04-17; Linas Sadeckas, head of fraud risk; carried by alkas.lt on
  2024-04-22): „Vienas iš esminių požymių – viena iš darbo funkcijų, pristatoma skelbime arba vėlesnio pokalbio metu, susijusi su
  pinigų pervedimais."; „Šiuose pasiūlymuose prašoma naudoti asmeninę banko sąskaitą pervedimams. Gali būti teigiama, kad pinigai
  skirti labdaros organizacijoms, kviečiama tapti slaptais pirkėjais ir, surinkus lėšas, jas pervesti atitinkamam gavėjui. Taip
  pat už kiekvieną atliktą pervedimą gali būti žadami piniginiai priedai"; banks „gali atsisakyti vykdyti pinigines operacijas ar
  sandorius, nutraukti dalykinius santykius, o pakliuvusiam į nusikaltėlių pinkles asmeniui gali grėsti netgi teisinės
  pasekmės"; the advice: „tiesiog nepriimti darbo pasiūlymų, tiesiogiai susijusių su pinigų pervedimais per jūsų asmeninę banko
  sąskaitą."; „Jeigu nesate tikri dėl darbo skelbimo ar prašomų pateikti duomenų, pasitarkite su draugais ar artimaisiais".
  Source: https://www.luminor.lt/lt/naujienos/sukciavimo-schema-kai-tampate-nusikalteliu-bendrininku-kaip-atpazinti-ir-apsisaugoti
  (`mu-lumin`). Primary.
- F396. **Luminor: after the fact** (same page): „nedelsiant nutraukti bet kokį bendravimą su sukčiais, prieš tai išsisaugojus
  visą informaciją apie tariamą darbdavį – kontaktinius duomenis, susirašinėjimą ir pan."; „Taip pat kuo skubiau susisiekite su
  savo banku ir būtinai praneškite policijai apie įvykį. Tą galite padaryti portale ePolicija, paskambinę 112 ar atvykę į
  artimiausią policijos komisariatą". Primary.
- F397. **Luminor: children** (paninfo.lt, 2025-05-09, quoting Linas Sadeckas): „Jie gali sulaukti žinučių ar komentarų per
  socialinius tinklus, kur siūloma greitai ir paprastai užsidirbti – tereikia leisti pinigų pervedimui panaudoti savo sąskaitą ar
  net pasiimti grynųjų iš bankomato ir perduoti juos trečiajam asmeniui."; „kadangi vaikams net ir menka suma gali atrodyti
  didelė, jaunuoliai tampa lengvu taikiniu." Source:
  https://paninfo.lt/sukciai-internete-kesinasi-ir-i-vaikus-ekspertas-papasakojo-kaip-apsisaugoti/ (`mu-paninfo`). Secondary
  (the press quoting the bank's expert).
- F398. **Lietuvos bankas: three euros a transfer, and the lasting cost** (the „Pinigų mulai" page of F345, updated
  2024-10-28): in a dispute the bank describes, a seller of car first-aid kits had agreed with person A „kad už kiekvieną į jo
  banko sąskaitą atliktą pavedimą šis galės pasilikti po 3 eurus, o likusias sumas perves kitam asmeniui"; and „savo sąskaitą
  nežinomų asmenų finansinėms operacijoms paskolinęs asmuo rizikuoja tam tikrą laiką arba apskritai niekada negauti tam tikrų
  finansinių paslaugų (paskolos, lizingo, kredito kortelės, mokėjimo sąskaitos)." Source: https://www.lb.lt/lt/pinigu-mulai
  (`ro-lbmul`). Primary.

Not used: FNTT's 2025 annual report (`mu-fntt2025.pdf`; its text extracted without the Lithuanian letters, so no quote can be
checked; it says mules open accounts or hand over logins, are recruited by job ads and calls, and often keep up to 100 EUR);
G. Armalis, Teisės apžvalga 2023 No. 1(27) (`mu-armalis.pdf`, same extraction fault; it argues the Criminal Code's art. 216
punishes only a mule who knew the money's origin, and that civil liability is the surer route against an unwitting one, citing
2022 civil cases up to the Supreme Court; a scholar's reading, not checked at the rulings); the art. 216 text on
lrvalstybe.lt (`mu-lrvalstybe216`, a stale mirror; the official register answered 403); Swedbank via anyksta.lt, 2010 (litas
era); Lietuvos bankas's 2026-07-07 course announcement (`mu-lbkursas`; it lists mule recruitment among the schemes taught, and
its Q1 2026 figure is AML centre data the page would only repeat from F109's source).
Not found: any Lithuanian conviction of an unwitting mule, or any police, prosecutor or FNTT press release on a mule case
(2023–2026); how many mules there are in Lithuania; whether a bank must warn before closing the account; anything on selling or
renting a Smart-ID; any page from Šiaulių bankas, Revolut, the Lietuvos bankų asociacija or the prosecutor's office on mules;
the official current text of the Criminal Code's art. 216.

**B35. The II-pillar pension payout, „padėsime atsiimti"** (read by Opus on 2026-11-02 from the raw text of each page, SEB's three tag-split sentences in its HTML; found
by Sonnet agents the same day). Raw pages: `%TEMP%\kurj\pe-*.html.txt` and `pn-*.html.txt`; every quote below was matched
against them by script (`verify_quotes.py`, `pe_quotes.tsv`; two quotes the agent had trimmed were re-read and are given here
in the page's own words). Blocked: artea.lt's reform page (403; not got around). Already recorded and reused, not repeated
here: F104 (Lietuvos bankas, 2026-04-14: pension money is a target of investment fraud and fake lawyers), F47 and F357 (Sodra
sends no message asking to press a link or give bank data; its address ends in .lt), F118 (checking a firm in Lietuvos bankas's
register), F13 (reach the bank by official channels), F2 (epolicija.lt), F184–F199 (the recovery scam that follows).

- F399. **Where a real request goes** (Sodra, „Dažniausiai užduodami klausimai", updated 2026 m. birželio 23 d.): „Pensijų
  kaupimo įstatymas numato, kad prašymus pasitraukti iš antros pakopos pensijų kaupimo reikia teikti pensijų kaupimo
  bendrovei." … „todėl prašymus teikite tiesiogiai savo pensijų kaupimo bendrovei." Source:
  https://sodra.lt/pensijos/papildomai-kaupiama-pensija/dazniausiai-uzduodami-klausimai (`pe-sodraduk`). Primary. And Sodra,
  2025-11-07: „ir sukauptas lėšas žmogus atsiims iš kaupimo bendrovės, ne iš „Sodros“."
  (https://sodra.lt/naujienos/sukciai-gali-taikytis-laiskais-ir-sms-zinutemis-sodros-vardu-ka-daryti, `pe-sodralaiskai`).
- F400. **The window: two years, no conditions** (Sodra, 2025 m. lapkričio 21 d.): „2026–2027 metais kiekvienas antros
  pakopos pensijų kaupimo dalyvis galės pasitraukti iš kaupimo, nepriklausomai nuo amžiaus, stažo ar sukauptos sumos. Nėra
  jokių papildomų sąlygų." „Pakanka kreiptis į savo pensijų kaupimo bendrovę ir pateikti prašymą. Tai galima padaryti bet
  kuriuo metu nuo 2026 m. sausio 1 d. iki 2027 m. gruodžio 31 d." Source:
  https://sodra.lt/naujienos/nusprendusiems-nebekaupti-pensijai-stai-ka-butina-zinoti (`pe-sodranebek`). Primary. So no
  deadline falls before the end of 2027.
- F401. **Doing nothing is allowed** (Lietuvos bankas, „Aktuali informacija apie pensijų sistemos pertvarką nuo 2026 m.",
  updated 2025-10-21): „Jeigu šiuo metu kaupiate ir nenorite keisti sprendimo, nieko daryti nereikia – jūsų kaupimas tęsis
  kaip įprasta, tik pagal naujas taisykles." Source: https://www.lb.lt/lt/aktuali-informacija-apie-pensiju-sistemos-pertvarka-nuo-2026-m
  (`pe-lbreform`). Primary. Written before the law applied; for the current process use F399, F400 and F402.
- F402. **How and when the money is paid, and that it costs nothing** (Sodra, 2026 m. birželio 25 d.): the company „prašymus
  nagrinėja pagal ketvirčius, o sprendimus priima jiems pasibaigus. Pinigai žmogui pervedami per pirmąsias dešimt kito
  ketvirčio darbo dienų."; „Žmogaus, darbdavio sumokėtos įmokos ir investicinis rezultatas nuo visų įmokų bus pervesti į
  banko sąskaitą. Jokių papildomų mokesčių ar atskaitymų nuo šios sumos nebus". Source:
  https://sodra.lt/naujienos/nuo-prasymo-iki-gautos-sumos-ka-svarbu-prisiminti-pasitraukiantiems-is-antros-pensiju-kaupimo-pakopos
  (`pe-sodragauta`). Primary. It does not say the 3 % deduction of the early partial options is gone; the page speaks of the
  full exit only.
- F403. **Sodra: scammers wait for the payout; what Sodra never asks** (same page): „Kaip parodė praeito ketvirčio patirtis,
  prasidėjus liepai, kai pasitraukusieji iš kaupimo lauks lėšų iš pensijų kaupimo bendrovių, gali suaktyvėti finansiniai
  sukčiai."; „„Sodra“ niekada nesiunčia pranešimų, kuriuose prašoma pervesti pinigus, patvirtinti banko operacijas, pateikti
  banko kortelės ar el. parašo duomenis arba skubiai priimti finansinius sprendimus."; „visas el. paštu iš „Sodros“ gaunamas
  žinutes gyventojai ras ir savo paskyrose, todėl kilus abejonių, galima jas pasitikrinti". Primary.
- F404. **The caller and the survey; the rule nobody breaks** (LRT, „Verslo pozicija", Dalia Kolmatsui, Artea's head of
  private-client services, 2025.11.17): fake pages or surveys offering to „pasitikrinti, kiek pinigų galite atgauti", which
  collect a contact, card or e-banking details; „Kitas dažnas scenarijus – skambutis iš tariamo konsultanto, neretai kalbančio
  rusų kalba. Prisidengdamas pensijų fondų valdymo bendrovės ar banko vardu, jis informuoja, esą žmogus sukaupė didelę sumą ir
  siūlo padėti juos atsiimti."; „nei bankai, nei pensijų fondų valdymo bendrovės niekada patys nesiūlo klientams nutraukti
  kaupimo ar „padėti atsiimti“ pinigus. Tokios iniciatyvos visada turi ateiti iš paties žmogaus."; „Dar vienas svarbus
  signalas – skambutis rusų kalba." Source:
  https://www.lrt.lt/naujienos/verslo-pozicija/692/2748303/dalia-kolmatsui-sukciai-jau-naudojasi-pensiju-reforma-ka-butina-zinoti-gyventojams
  (`pn-lrt-kolmatsui`). Secondary (a bank's manager in a paid business section). It speaks for banks and fund companies, not
  for every caller.
- F405. **SEB: only to your own account, only to the company** (SEB, „Pirmoji pensijų reformos sukčių auka…", 30.01.2026):
  „Nei bankai, nei policija, nei kitos institucijos niekada neprašo gryninti pinigų, atlikti pavedimų ar „padėti tyrimui“
  perduodant / pervedant lėšas kitiems asmenims."; „Pensijų fondų lėšos išmokamos tik į asmeninę kliento sąskaitą, o visi
  prašymai teikiami tik tiesiogiai pensijų kaupimo bendrovei, ne per tarpininkus ar „konsultantus“."; „Gavus skambutį, kuriame skubinama, gąsdinama ar draudžiama padėti ragelį, pokalbį
  būtina nutraukti ir patiems susisiekti su policija, savo banku ir artimaisiais."; „Apie įtartinus atvejus visada kuo
  greičiau praneškite bankui ir policijai." Source:
  https://www.seb.lt/infobankas/naujienos/pirmoji-pensiju-reformos-sukciu-auka-seni-metodai-isviliojant-svieziai-gautus
  (`pe-sebauka`). Primary.
- F406. **SEB: the first known victim** (same page): „Pirmoji SEB bankui žinoma sukčių auka – dėl ligos lėšas iš II pakopos
  pensijų fondo atsiėmęs vyresnio amžiaus asmuo." Russian speakers posing as a telecom company, then the bank, then „teisėsaugos
  pareigūnais"; „raginama nepadėti ragelio ir „padėti vykstančiame tyrime“"; he cashed part out and handed it over, sent the
  rest to an unknown account, the cash „perdavė gyvai atvykusiems asmenims, apsimetusiems pareigūnais."; „Taip gyventojas sukčiams atidavė keliolika tūkstančių eurų". A second person was told to cash out
  money that arrived unexpectedly; SEB: „Jei į sąskaitą netikėtai pervedamos lėšos, kurių nelaukėte, jokiu būdu jų negryninti
  ir neperduoti kitiems asmenims – tai gali reikšti bandymą įtraukti į sukčiavimo schemą." Primary. No place or exact sum.
- F407. **SEB: brokers on video calls, 100–200 euros first** (SEB, „II pensijų pakopa – naujas sukčių taikinys…", 30.10.2025):
  „Sukčiai veikia itin įtikinamai – kalba lietuviškai, prisistato brokeriais, kviečia į vaizdo skambučius ir „konsultuoja“
  gyventojus, ką reikia daryti su II pensijų pakopos sutartimis."; „Sukčiai jau dabar ragina pradėti investuoti ir atlikti
  mokėjimus 100-200 eurų sumomis". Source:
  https://www.seb.lt/infobankas/naujienos/ii-pensiju-pakopa-naujas-sukciu-taikinys-kviecia-i-vaizdo-skambucius-ragina
  (`pe-sebvaizdo`). Primary.
- F408. **Lietuvos bankas: the words of urgency and safety** (Lietuvos bankas, „Neapibrėžtumas – sukčiams palanki terpė",
  2026-04-16): „siunčia žinutes su frazėmis „būtina veikti dabar“, „paskutinė galimybė atsiimti lėšas“, „galimybė atsiimti visą
  sukauptą suma“."; „Sukčiai siūlo tariamą saugumą: „apsaugokite savo santaupas“, „perkelkite lėšas į saugesnę investiciją“."
  Source: https://www.lb.lt/lt/naujienos/neapibreztumas-sukciams-palanki-terpe (`pn-lb-neapibreztumas`). Primary.
- F409. **Swedbank: „last steps", and no faster payout exists** (Swedbank blog, 2025-12-29): „Juose minimi „paskutiniai
  žingsniai“, „nebaigti patvirtinimai“ ar raginama veikti nedelsiant"; „antros pakopos lėšos turės aiškų išmokėjimo grafiką.
  Todėl bet koks pažadas dėl greitesnio ar kitokio išmokėjimo yra sukčiavimas, o ne tikras pasiūlymas"; „Saugesnis kelias –
  pačiam atsidaryti naršyklę ir prisijungti prie interneto banko ar „Sodros“ paskyros oficialiu adresu, o ne per gautą
  pranešimą." Source: https://blog.swedbank.lt/pensija-saugumas/kaip-elgtis-jei-gavote-itartina-pranesima-del-ii-pakopos-pensiju-reformos
  (`pe-swedit`). Primary.
- F410. **The AI voice, and real banks' own offers** (tv3.lt, 2026-02-14, ESET's Lukas Apynis on radio): „Tada dirbtinis
  intelektas lietuviškai pasako, kad paskambins rusų kalba, asistentas arba patarėjas ir kalbės rusų kalba."; on investment
  offers by e-mail: „Tikri bankai irgi taip daro. Aš pats gavau atskirą laišką iš mano tikro banko su pasiūlymu per juos
  investuoti tuos pinigus." Source: https://www.tv3.lt/naujiena/lietuva/atsiimantiems-pinigus-is-pensiju-fondu-sukluskite-jei-gaunate-tokius-laiskus-n1491785
  (`pn-tv3-laiskai`). Secondary. So the page never says a bank offers nothing.
- F411. **No leak needed: they dial everyone** (ve.lt, 2026-02-09, relaying LRT radio and ELTA): „vykdo masines skambučių atakas tikėdamiesi, kad tarp tūkstančių
  adresatų atsiras bent keli, kurie neseniai gavo išmokas."; „Bankų prevencijos
  specialistai pabrėžia, kad sukčiai neturi nutekintų duomenų apie tai, kas konkrečiai atsiėmė pinigus." Source:
  https://ve.lt/aktualijos/lietuva/policija-ispeja-balandi-laukiama-didziules-sukciu-atakos-pries-pensiju-fondu (`pe-ve`).
  Secondary. And LRT, 2026.02.23: a pensioner „per dvi dienas nuo pinigų išmokėjimo sulaukė kone 40 skambučių iš skirtingų
  telefonų numerių"; the data inspectorate „nėra gavusi pranešimų apie asmens duomenų nutekėjimo atvejus nei iš bankų, nei iš
  pensijų fondų" (https://www.lrt.lt/naujienos/verslas/4/2837436/antrosios-pensiju-pakopos-lesos-vilioja-sukcius-senjore-sulauke-desimciu-skambuciu,
  `pe-senjore`). Secondary; the family's account.
- F412. **Gold, police and the post office** (tv3.lt, 2026-10-15, Alytus county police's post): „Jie gali siūlyti „pelningas“
  investicijas, raginti pirkti auksą ar žadėti greitą uždarbį, o iš tiesų siekia išvilioti jūsų pinigus."
  (https://www.tv3.lt/naujiena/gyvenimas/atsiemete-pinigus-is-ii-pensiju-pakopos-jums-turi-zinia-n1559781, `pn-tv3-ii`,
  secondary). Lietuvos paštas, via 15min.lt, 2026-04-15, „Gyventojams pradėjus atsiimti lėšas iš II pakopos pensijų fondų": an
  older customer lured by a social-media ad to „invest in gold" was told „tam, jog iš prekybos auksu uždirbti pinigai būtų
  pervesti jam į sąskaitą, joje jau turi būti tam tikra pinigų suma."; the transfer was stopped
  (https://www.15min.lt/verslas/naujiena/finansai/lietuvos-paste-stabdomos-itartinos-perlaidos-sukciai-vilioja-pensiju-fondu-lesas-662-2662786,
  `pe-pastas`). Secondary (a company's release).
- F413. **How many left** (tv3.lt, 2026-10-24, citing the funds' final data): „šia teise praėjusį pusmetį jau buvo pasinaudoję
  apie 700 tūkst. dalyvių."; „trečiąjį ketvirtį iš jos pasitraukė dar per 50 tūkst. dalyvių". Source:
  https://www.tv3.lt/naujiena/verslas/pensiju-fondu-tirpimas-tesiasi-sodra-skelbia-gasdinancia-prognoze-n1560935 (`pe-tv3pas`).
  Secondary; no Sodra or Lietuvos bankas table was found for it.

Not used: Sodra's pages on the pension accounting units and on contributions after a request (`pe-sodrapasit`, `pe-sodranuo`;
true but not about scams); SEB's „apie 60–70 %" (`pe-sebreforma`, undated, an approximation); the early partial options and
their figures (`pe-lbreform`, `pe-sodragauta`; the page does not explain the reform); ManoRaseiniai, 2026-03-04
(`pe-raseiniai`, an unsourced repost); LRT's 2026-07-05 and 2026-08-18 cases (`pe-lrt24k`, `pe-lrt11k`; no pension link in
the text); ESET's undated „5 pavojingiausi metodai" (`pn-eset`); tv3's Alytus 9,999 EUR case (`pn-tv3-alytus`, a fake bank
site, not pensions); LRT's „apie 40 procentų" (`pe-lrttrauk`, ambiguous).
Not found: any count or sum of pension-related fraud from police, Lietuvos bankas or Sodra; a police press release on a
pension case with a place and an amount; a fund company other than SEB saying in its own words that it never calls to help
withdraw (Artea's page blocked; nothing from Luminor, INVL or Allianz); whether Sodra's own portal takes the request (Sodra
says to apply to the company).

**B36. Paid tasks, „užduotys už pinigus"** (read by Opus on 2026-11-02 from the raw text of each page; found by a Sonnet
agent the same day). Raw pages: `%TEMP%\kurj\uz-*.html.txt` (the Lietuvos bankas decisions as `uz-lbd*.pdf.txt`, made with
`pdftotext -enc UTF-8 -raw`); every quote below was matched against them by script (`verify_quotes.py`, `uz_quotes.tsv`,
43 of 43). Blocked: every FTC page (consumer.ftc.gov, ftc.gov) and OpenAI's task-scam report (a stub or 403; not got
around), so this block has no foreign figure. Already recorded and reused, not repeated here: F382–F398 (the money mule),
F200–F212 (the fake shop), F184–F199 (the recovery scam), F2 (epolicija.lt), F13 (reach the bank by official channels).

- F414. **How it runs: Telegram, a few euros a like, a fee for better tasks** (SEB, „Finansiniai sukčiai taiko naują
  apgavystę", 24.10.2025, Daiva Uosytė of SEB's prevention department): „sukčius „Telegram“ pokalbyje apsimeta „Instagram“
  atstovu ir kviečia gyventojus pamėgti tam tikras „Instagram“ paskyras už nedidelį atlygį."; „Šie pokalbiai dažniausiai –
  grupiniai"; „kai kurie pokalbio dalyviai drąsina kitus įsitraukti pateikdami neva gautų uždarbio mokėjimų informaciją.";
  „Dažniausiai sukčiai siūlo sumokėti 3–9 eurus už vieną atliktą veiksmą."; „Taip pat prašoma sumokėti papildomą mokestį už
  naujų, tariamai geriau apmokamų užduočių gavimą."; „Pateikdami gyventojams užduotį kažką įsigyti elektroninėje
  parduotuvėje sukčiai išties juos nukreipia į savo sukurtas interneto svetaines. Tokiu būdu auka nusikaltėliams atskleidžia savo
  asmens ir mokėjimo kortelės duomenis, juos suvesdama netikroje elektroninės parduotuvės užsakymo formoje."; „Nusikaltėliai taip pat naudoja ir
  psichologinį spaudimą, ragina veiksmus atlikti kuo greičiau."; „siunčiamos žinutės parašytos netaisyklingai, tam tikri
  žodžiai ir terminai rodo, kad jie versti iš kitų kalbų." Source:
  https://www.seb.lt/infobankas/naujienos/finansiniai-sukciai-taiko-nauja-apgavyste-kviecia-uzsidirbti-socialiniuose
  (`uz-seb`). Primary.
- F415. **The first pay is someone else's stolen money, and forwarding it makes a mule** (same SEB release): „pirmiausiai
  atsiskaito su auka jai pervesdami keliasdešimt eurų"; „Dažniausiai šios lėšos yra vogtos, priklauso kitoms sukčių aukoms.
  Tuomet sukčiai paprašo tariamą atlygį gavusio asmens dalį lėšų pasilikti sau už atliktą darbą, o kitą dalį pervesti kitiems
  asmenims. Tokiu būdu, pati to nesuprasdama, auka yra įtraukiama …"; „priimti ir pervesti lėšas nežinomiems asmenims sukčių prašymu taip pat pavojinga – tokiu būdu galite būti
  įtraukti į nusikaltimo schemą, tapti pinigų mulu ir už tai sulaukti teisinės atsakomybės." Primary.
- F416. **SEB: what to do** (same release): „Jei supratote, kad patekote į šią ar kitą sukčių schemą, nedelsiant kreipkitės į
  savo banką ir praneškite policijai."; „Jokiu būdu nepriimkite lėšų iš neaiškių asmenų ir patys neatlikite mokėjimų
  nepažįstamųjų prašymu." Primary.
- F417. **Swedbank: the SMS, the screenshots, the Telegram „manager", a membership fee of 1–5 thousand** (Swedbank,
  „Plinta naujas sukčiavimo būdas: siūlo užsidirbti žiūrint vaizdo turinį", 2024-01-11, Erika Vadapalė): „Atsitiktiniais
  numeriais žinutes siunčiantys sukčiai žada 2–5 eurų dydžio atlygį už „Youtube“ vaizdo įrašų žiūrėjimą ir patiktukų
  uždėjimą."; „smulkūs mokėjimai už peržiūras bei patiktukus sukčių aukoms paprastai atliekami iš skirtingų fizinių asmenų
  sąskaitų."; „Sukčius prisistato kaip išmokas tvarkantis vadybininkas"; „paprašoma susimokėti narystės mokestį tam, kad
  taptų prieinamos kito lygio geriau apmokamos užduotys. Tokio mokesčio suma gali siekti 1–5 tūkst. eurų."; „Jeigu
  sukčiavimo auka sumoka nurodytą mokestį, sukčiai paprasčiausiai nustoja jam atsakinėti arba jį užblokuoja", or ask for
  more, „motyvuodami, kad užduotis buvo atlikta neteisingai ar viena iš skirtų užduočių buvo neįgyvendinta"; „patikimi darbo
  pasiūlymai tokia forma nepateikiami". Source:
  https://blog.swedbank.lt/saugumas-pranesimai-spaudai/plinta-naujas-sukciavimo-budas-siulo-uzsidirbti-ziurint-vaizdo-turini
  (`uz-swedvideo`). Primary. Its „900 tyrimų … 890 tūkst. eurų" is not used: the sentence before it is about investment
  offers, so it is unclear which scheme it counts.
- F418. **Luminor: a membership or registration fee, then silence; save everything** (Luminor's Linas Sadeckas, reprinted
  by alkas.lt, 2024-04-22): „už galimybę uždirbti daugiau prašoma susimokėti narystės mokestį"; „Sumokėjus šį mokestį,
  bendravimas gali būti staigiai nutrauktas."; „norint įsidarbinti prašoma susimokėti registracijos mokestį."; advice to
  „nedelsiant nutraukti bet kokį bendravimą su sukčiais, prieš tai išsisaugojus visą informaciją apie tariamą darbdavį –
  kontaktinius duomenis, susirašinėjimą", then the bank and the police (ePolicija, 112 or a station). Source:
  https://alkas.lt/2024/04/22/sukciavimo-budas-kai-tampate-nusikalteliu-bendrininku (`uz-alkas`). Secondary (a portal
  reprinting a bank).
- F419. **A case: a „TikTok" link to extra income, 1 690 eurų** (tv3.lt, 2026-06-25, quoting the police virtual patrol's
  Facebook post): „Kreipėsi moteris, kuri pareiškė, kad naršydama programėlėje „TikTok“ aptiko nuorodą dėl papildomo
  uždarbio, bei ją aktyvavus, su ja susisiekė nepažįstami asmenys, kurie apgaulės būdu išviliojo 1 690 eurų."; a pre-trial
  investigation under BK 182 str. 2 d. The same post: „Už „papildomą darbą“ patys neturite niekam susimokėti;"; „Nevykdykite
  jokių prašomų „užduočių“."; report at www.epolicija.lt or 112. Source:
  https://www.tv3.lt/naujiena/gyvenimas/ispeja-visus-lietuvius-sioje-programeleje-siaucia-sukciai-n1530862 (`uz-tv3tg`).
  Secondary. It names no town and does not say whether the tasks were paid at first.
- F420. **A case: „neigiamas balansas", 19 594,5 Eur in twelve transfers** (Lietuvos bankas, dispute decision, 2026-03-18,
  a Revolut customer): an offer of remote work by a letter through Flexjobs.com, then WhatsApp; the „darbo modelis" was
  raising travel businesses' visibility on websites by doing tasks for a commission; „Pareiškėjo teigimu, užduotys
  sugeneruodavo neigiamą balansą, trūkumą pareiškėjas turėjo padengti iš savo asmeninių lėšų."; transfers 2025-08-06 to
  08-11 of 19 594,5 Eur, the customer's own estimate of the loss about 13 000 Eur („darbo sukčiavimo“ (angl. Job scam));
  the claim was rejected: the payments were the customer's own and a warning was shown. Source:
  https://www.lb.lt/lt/frd/view_dispute?id=12418 (`uz-lbd12418`). Primary.
- F421. **A case: Telegram tasks, 11 500 Eur in three transfers** (Lietuvos bankas, dispute decision, 2026-08-27, a Revolut
  customer): „Ginčijamus mokėjimus pareiškėja atliko vadovaudamasi trečiųjų asmenų, per susirašinėjimo platformą „Telegram“
  siūliusių už atlygį atlikti užduotis, nurodymais."; three transfers in December 2025 of 11 500 Eur; the claim was rejected.
  Source: https://www.lb.lt/lt/frd/view_dispute?id=13267 (`uz-lbd13267`). Primary. The same decision says the customer was
  drawn in over WhatsApp and „įtikintas investuoti", so it mixes tasks with investment; use only with F420.
- F422. **The job-offer SMS, and how often job offers end in fraud** (LRT, 2025-12-30 22:45): „Policijos duomenimis per
  metus fiksuojama apie kelis šimtus atvejų, kai žmonės įkliūva į sukčių pinkles per darbo skelbimus." (job ads of every
  kind, not tasks alone); „Įprastai melaginguose darbo pasiūlymuose nenurodomi konkretūs reikalavimai darbuotojams."; the SMS: „Darbas – nuotolinis, visu etatu. Nurodomas ir atlygis – nuo 50 iki 300 eurų. Tereikia
  paspausti nuorodą."; a move from Instagram to Telegram „taip bus galima užtikrinti didesnį privatumą" (Vitalijus Gurčinas,
  Skaitmeninės gynybos kompetencijų centras); „Policija ragina nebijoti ir pranešti įkliuvus į tokias pinkles."; „jeigu per
  socialinius tinklus pradeda lyti pinigais, tai turi kelti įtarimą" (Živilė Kielienė, Pinigų plovimo prevencijos
  kompetencijų centras). Source:
  https://www.lrt.lt/naujienos/verslas/4/2791350/sukciu-pinkles-internete-siunciamos-zinutes-su-apgaulingais-darbo-pasiulymais
  (`uz-lrt`). Secondary.
- F423. **Money that came by fraud goes back to its owner** (Swedbank, „Suaktyvėjo sukčiai, ieškantys sąskaitų tarpininkų",
  no date on the page): „Apgaulės būdu išviliotą ar per klaidą pervestą pinigų sumą gyventojai bet kuriuo atveju privalo
  grąžinti teisėtam tų pinigų savininkui."; asked to forward money for a reward, „nereikia atlikti jokių veiksmų, kol banko
  darbuotojai išsiaiškins situaciją." Source:
  https://blog.swedbank.lt/spaudos-pranesimai-asmeniniai-finansai-saugumas/suaktyvejo-sukciai-ieskantys-saskaitu-tarpininku
  (`uz-swedtarp`). Primary, undated.
- F424. **Stop the transfers, call the bank** (Swedbank, „Pinigų mulai", 2022-08-24): „Vos supratus, kad dalyvaujate sukčių
  schemoje, stabdykite pinigų pavedimus ar grynųjų išėmimą iš bankomato." Source:
  https://blog.swedbank.lt/saugumas-finansu-laboratorija/pinigu-mulai-kaip-lengvas-uzdarbis-gali-paversti-sunkaus-nusikaltimo-bendrininkais
  (`uz-swedmulai`). Primary.
- F425. **„Move to Telegram" is the cue to stop** (ESET, press release quoting Baltimax's manager, no date on the page):
  „Dažnai sukčiai prašo perkelti bendravimą į programėles, tokias kaip „Telegram“, todėl išgirdus tokį prašymą siūlyčiau
  pokalbio nebetęsti". Source:
  https://www.eset.com/lt/apie/naujienos/straipsniai/pranesimai-spaudai/kibernetinio-saugumo-ekspertai-kviecia-suklusti-ieskancius-darbo-sis-sukciavimo-budas-populiarus-bet-daugeliui-netiketas/
  (`uz-eset`). Secondary, undated.

Not used: Swedbank's 900 investigations and 890 thousand (`uz-swedvideo`, which scheme it counts is unclear); R. Matonis's
„sudėtinga įrodyti, kad jūs esate bendrininkas" (`uz-lrt`; about opening an account for scammers, and it could read as a
promise of no consequences); Lietuvos bankas's 2024-07-24 decision (`uz-lbd10729`, the task scheme only in an article the
applicant cited); EURES on job offers that move money (`uz-eures`, date only in the address; F382–F398 cover it); Lietuvos
bankas's 20 mln. Eur a year of all fraud (`uz-lbsektor`, not this scheme); tv3's 2024-08-29 „350–3500 eurų" SMS
(`uz-tv3pol`, a broker variant); Citadele's 13 mule cases (`uz-santaka`); the Telegram investment pieces (`uz-lrttg`,
`uz-lbatg`).
Not found: a police county release on the task scheme with a town and an amount; any count or sum of task-scheme losses in
Lithuania; a Lithuanian source on „VIP" levels, „combined tasks", a crypto top-up or a fee to withdraw the balance (the
nearest are F417's membership fee and F420's negative balance); anything from Užimtumo tarnyba, NKSC or RRT on it; any
foreign figure (the FTC pages were blocked).

**B37. The first four weekly letters, official warnings of October 2026, and consent for the list** (read by Opus on
2026-11-03 from the raw text of each page; found by a Sonnet agent the same day). Raw pages: `%TEMP%\kurj\t-*.html.txt`;
every quote below was matched against them by script (`verify_quotes.py`, 33 of 33). Used by `/triukai/` and the privacy
notice. Already recorded and reused, not repeated here: F291–F301 (the fine SMS), F260–F275 (the fake seller), F367–F381
(the fake shop contest), F317–F328 (the fake e-mail from Sodra, a bank or Telia), F2 (epolicija.lt, and NKSC for an attempt
that cost nothing), F112 and F113 (the notice's legal footing).

- F426. **Sodra: SMS about „data not updated"** (Sodra, news item, 2026 m. spalio 22 d.): „Klientai informuoja, kad į savo
  telefonus gauna SMS žinutes, kuriose pranešama apie tariamai neatnaujintus duomenis. Pavyzdžiui: „Jūsų asmens duomenys dar
  nėra atnaujinti". Šalia pateikiamas kenkėjiška nuoroda, panaši į „Sodros" svetainės adresą."; the pages try to draw out
  „prisijungimo prie asmeninių paskyrų, elektroninės bankininkystės ar kitus jautrius duomenis". Does not give a loss figure
  or a count of people. Source:
  https://sodra.lt/naujienos/sukciai-siaucia-toliau-sodros-vardu-siuncia-sms-zinutes-ir-praso-atnaujinti-duomenis
  (`t-sodra-sms1022`). Primary.
- F427. **Sodra's addresses, and how a false one looks** (same page): „oficialus „Sodros" interneto svetainės adresas yra
  www.sodra.lt"; „gyventojų paskyros adresas yra https://gyventojai.sodra.lt"; „jei nuoroda baigiasi .net, .com, .eu, .info,
  .online, interneto adrese naudojamas papildomas brūkšnys, kitos raidės ar žodžiai, pavyzdžiui, esodra arba sodralit, tai
  nėra „Sodros" interneto svetainė". Source: as F426. Primary.
- F428. **What Sodra does not do by SMS, and the move** (same page): „„Sodra" nesiunčia SMS žinučių iš užsienio telefono
  numerių"; „„Sodra" SMS žinutėmis neprašo pervesti pinigų, patvirtinti banko operacijų, pateikti banko kortelės duomenų,
  suvesti PIN kodų ar priimti skubių finansinių sprendimų."; „Interneto naršyklėje savarankiškai įveskite oficialų „Sodros"
  adresą www.sodra.lt ir iš jo prisijunkite prie savo paskyros." It does not say Sodra sends no SMS at all. Source: as F426.
  Primary.
- F429. **The fine SMS, and a man who lost over 16,000 euros** (Alytus county police, 2026-10-09): „apgaulingas SMS žinutes,
  kuriose pranešama apie neva skirtas administracines baudas, nesumokėtą automobilio stovėjimą ar tariamas skolas"; „Sukčiai
  taip pat prisidengia Valstybinės mokesčių inspekcijos (VMI) ir e. policijos vardu"; a man „gavęs SMS žinutę iš neva e.
  policijos dėl nesumokėtos baudos. Aktyvavęs žinutėje pateiktą nuorodą ir suvedęs elektroninės bankininkystės duomenis, jis
  neteko daugiau nei 16 000 eurų." One case, not a total; no date for the case beyond „neseniai". Source:
  https://alytus.policija.lrv.lt/lt/naujienos/alytaus-policija-ispeja-sukciai-siuncia-sms-zinutes-apie-neva-skirtas-baudas-ng4d
  (`t-pol-alytus-bauda`). Primary.
- F430. **The senders the police name, and the move** (same page): „numeriai su šalies kodu +52, trumpasis numeris 7788, taip
  pat pavadinimai „e-P.olicja", „Infvm", „BaudaVMI", „Verify" ir panašūs"; „Gavę pranešimą apie baudą ar skolą, informaciją
  patikrinkite savarankiškai, naudodamiesi oficialiais institucijų kanalais."; „pasidalykite šia informacija su artimaisiais"; „sukčiai dažnai naudojasi žmonių skuba, nerimu ir išgąsčiu"; the links ask to „suvesti
  banko prisijungimo ar kitus asmens duomenis".
  The list is examples („tarp galimų pavyzdžių"): a sender not on it proves nothing. Source: as F429. Primary.
- F431. **The fake seller of briquettes and pellets** (Alytus county police, 2026-10-06): „Artėjant šildymo sezonui, gyventojai
  pradeda rūpintis malkomis, medžio granulėmis ar briketais."; people „socialiniuose tinkluose ar skelbimų svetainėje randa
  pasiūlymą įsigyti medžio briketų ar granulių"; then „paprašoma pervesti visą sumą už užsakymą, neretai pabrėžiant, kad be
  išankstinio apmokėjimo užsakymas nebus vykdomas"; „Netrukus pardavėjas tampa nepasiekiamas". Source:
  https://alytus.policija.lrv.lt/lt/naujienos/policija-ispeja-del-fiktyviu-kuro-pardaveju-SmVY (`t-pol-alytus-kuras`). Primary.
- F432. **Eight counties, over 12,000 euros, one woman's 950** (same page): „Liepos–rugpjūčio mėnesiais į policiją kreipėsi
  žmonės iš Vilniaus, Marijampolės, Alytaus, Kauno, Šiaulių, Panevėžio, Tauragės ir Utenos apskričių."; „Bendrai gyventojai
  patyrė daugiau kaip 12 000 eurų nuostolį."; a woman asked to pay only a deposit, was told otherwise the order would not go
  ahead: „Pervedžiau 950 eurų, užsakymą patvirtino, bet briketų taip ir negavau". The number of people is not given. The page
  also says she had been defrauded once before; the letter leaves that out, it would only shame her. Source: as F431. Primary.
- F433. **What the police say to look at** (same page): „Visais atvejais pinigai buvo pervedami į kelias skirtingas banko
  sąskaitas, priklausančias Lietuvos piliečiams."; „pasidomėti pardavėjo veikla, paieškoti kitų pirkėjų atsiliepimų"; be
  careful „kai už prekes reikalaujama iš anksto pervesti visą sumą, o kaina yra gerokai mažesnė nei įprastai rinkoje"; „Pareigūnai
  ragina neskubėti atlikti mokėjimo vien todėl, kad pardavėjas spaudžia greitai apsispręsti".
  Source: as F431. Primary.
- F434. **The contest in Iki's name** (Iki, the chain's own warning, 2026-10-26): „Pastaruoju metu „Facebook" tinkle fiksuojami
  apgaulingi įrašai, kuriuose neteisėtai naudojamas „Iki" pavadinimas"; „Šį mėnesį pradėjome švęsti savo 35 gimtadienį", prizes can be won in the app, „tad ši informacija tapo ir sukčių taikiniu"; „Dažniausiai
  socialiniuose tinkluose sukuriamos netikros paskyros, kurios skelbia tariamus konkursus, apklausas ar prizų dalybas."; „Jose
  prašoma pateikti asmeninius duomenis, prisijungimo informaciją, banko kortelės duomenis arba patvirtinti tariamą mokėjimą už
  prizo pristatymą." No loss figure and no count of people. Source:
  https://iki.lt/naujienos/iki-perspeja-pirkejus-socialiniuose-tinkluose-sukciu-pinkles/ (`t-iki-perspeja`). Primary, a company
  about its own name.
- F435. **What Iki never asks, and what to do after** (same page, Gintarė Kitovė, the chain's head of communications): „Oficialūs
  „Iki" konkursai ir žaidimai skelbiami tik mūsų interneto svetainėje www.iki.lt, „Iki" mobiliojoje programėlėje bei oficialiuose
  socialinių tinklų kanaluose. Niekada neprašome pateikti banko kortelės duomenų ar atlikti mokėjimo tam, kad būtų galima atsiimti
  prizą"; after typing details: „rekomenduojama nedelsiant pakeisti naudojamus slaptažodžius", „reikėtų kuo greičiau susisiekti su
  savo banku", „Taip pat svarbu apie incidentą nedelsiant pranešti policijai." Source: as F434. Primary.
- F436. **Consent, for the weekly letter's list.** The Regulation (BDAR, 2016/679), official Lithuanian text, fetched from the EU
  Publications Office the way section F's note says. Art. 6(1)(a): „duomenų subjektas davė sutikimą, kad jo asmens duomenys būtų
  tvarkomi vienu ar keliais konkrečiais tikslais". Art. 7(1): „duomenų valdytojas turi galėti įrodyti, kad duomenų subjektas davė
  sutikimą". Art. 7(3): „Duomenų subjektas turi teisę bet kuriuo metu atšaukti savo sutikimą."; „Atšaukti sutikimą turi būti taip
  pat lengva kaip jį duoti." Art. 20(1)(a): portability applies where processing „yra grindžiamas sutikimu", „susistemintu, įprastai naudojamu ir kompiuterio
  skaitomu formatu" (F113 left it out because the rest rests on (f)). So the list keeps the date and the way each address joined, and leaving takes one word, as joining
  does. Whether the Lithuanian law on electronic communications (LRTK) also bears on the letter is not read here: open in
  ARCHITECTURE §8.7. Source: https://eur-lex.europa.eu/legal-content/LT/TXT/?uri=CELEX:32016R0679 (Art. 6, 7), `t-bdar`. Primary.
  Read by Opus 2026-11-03.

Not used: the figures only tv3 carries (secondary); Sodra's e-mail about 412.80 euros (`t-sodra-kabliukas`, 2026-10-05) and Swedbank's
e-mail warning (`t-swed-laiskai`, 2026-10-27), kept for later letters; Sodra's door visits; the lost-pet scheme (a commercial source);
the Ukmergė dental visit and the Zarasai Ignitis case (neither is clear enough on what was fake).
Not found: a parcel SMS warning dated August to November 2026 (post.lt blocked; not got around); a Black Friday warning; anything in the
window from NKSC, RRT or ESO (regitra.lt and vmi.lt blocked); how many people are behind any figure in this block, except the one man and
the one woman named.

**B38. A flat or a holiday that does not exist: fake rentals, „Booking" and „Airbnb"** (read by Opus on 2026-11-03 from the raw text of each page; found by a Sonnet agent the same day). Raw pages: `%TEMP%\kurj\nu-*.html.txt`; every quote below was matched against them by script (`verify_quotes.py`, `nu_quotes.tsv`, 86 of 86). Blocked, not got around: Microsoft Threat Intelligence (403), Action Fraud and NCSC UK, the BBC article (404), Booking's help centre pages behind its bot challenge, so nothing here rests on them. Already recorded and reused, not repeated here: F260–F275 (the fake seller), F200–F212 (the fake shop), F184–F199 (the recovery scam), F2 (epolicija.lt), F4 and F203 (what to do at the bank), F13 (reach the bank by official channels).

- F437. **Booking.com: what it never asks** (Booking.com's Lithuanian safety page for travellers, no date): „Niekada neprašysime jūsų pateikti mokėjimo kortelės duomenų el. paštu, telefonu, SMS žinute ar per „WhatsApp“."; „Niekada neprašysime jūsų atlikti bankinio pavedimo, kuris neatitinka mokėjimo nuostatų, nurodytų jūsų užsakymo patvirtinime."; its customer service „gali prašyti nurodyti tik užsakymo numerį ir (arba) užsakymo PIN kodą ir niekada neklaus Booking.com paskyros slaptažodžio". Source: https://www.booking.com/trust_and_safety/travellers.lt.html (`nu-bktrustlt`). Primary, about its own name; it does not say a property will never ask, see F439.
- F438. **Booking.com: the 24-hour message in its own words** (same page): „Jei sulaukėte prašymo skubiai sumokėti (pvz., pervesti pinigus į banko sąskaitą per 24 val. arba užsakymas bus atšauktas) arba apgyvendinimo įstaiga primygtinai prašo bendrauti ne per Booking.com platformą, susisiekite su Klientų aptarnavimo komanda dėl tolesnių veiksmų."; „Duomenų viliojimo žinutės taip pat paprastai pateikiamos su skubiais prašymais (pakartotinai) bendrinti mokėjimo informaciją, kad būtų išsaugotas jūsų užsakymas."; „Jei prašoma sumokėti už kažką, kas nėra numatyta nuostatuose, nemokėkite."; a newly registered property that asks to confirm or to pay for what the confirmation does not list: „primygtinai rekomenduojame neatsakyti ir nesidalinti jokiais asmeniniais ar finansiniais duomenimis." Primary.
- F439. **A real property may ask a prepayment: it is written in the confirmation** (same page, and Booking's English FAQ, no date): „Tikslią informaciją apie išankstinius mokėjimus, užstatus galimai žalai padengti ir kita rasite gautame Booking.com patvirtinimo laiške."; "Deposit or Prepayment: Some properties require a deposit or prepayment at the time of reservation. This policy is clearly highlighted during the reservation process, and you can see it in your confirmation email as well." Sources: as F437; https://secure.booking.com/faq.en-gb.html?aid=330843 (`nu-bkfaq`). Primary. So the page never says a prepayment itself is the tell; the tell is one the confirmation does not list.
- F440. **Booking.com: fake properties on the platform, the price, the messaging** (F437's page): „Netikros apgyvendinimo įstaigos – tai kelionių platformose pateikiami apgaulingi profiliai, kuriuos sukuria kibernetiniai nusikaltėliai, siekdami suklaidinti keliautojus ir paskatinti juos užsakyti arba sumokėti už neegzistuojančią apgyvendinimo įstaigą."; „Rekomenduojame visada palyginti profilio kainą su panašiomis apgyvendinimo įstaigų kainomis toje pačioje vietovėje, nes žymiai mažesnės kainos dažnai yra įspėjamieji ženklai."; „Kad visiems viskas būtų aiškiau, visada naudokitės mūsų platformoje veikiančia susirašinėjimo sistema." Primary.
- F441. **Booking.com: if you clicked or gave details** (F437's page): „Jei manote, kad spustelėjote nuorodą arba sukčiui pateikėte informaciją, kurios neturėjote atskleisti, nedelsdami susisiekite su mūsų Klientų aptarnavimo komanda"; „Pakeiskite savo Booking.com paskyros slaptažodį ir būtinai įjunkite patvirtinimą dviem veiksmais."; „Susisiekite su savo banku ir (arba) mokėjimo paslaugų teikėju, informuokite juos apie savo nuogąstavimus ir paprašykite užblokuoti esamas mokėjimo korteles bei išduoti naujas." Primary.
- F442. **Booking.com, English: after the booking, and how to check** (its articles „avoid hotel scams" and „holiday home scams", no date): "Sometimes scammers pretend to be from a hotel or booking platform and claim a payment has failed or your booking is incomplete."; "Reputable platforms never ask for double payments."; "If in doubt, you can easily check your reservation status directly on the official website or app."; "Avoid requests for bank transfers, prepaid cards, or cryptocurrency."; "Once your booking is confirmed, you shouldn’t incur any additional online payments, unless they’re made at the property itself."; "If asked to pay outside of the official website or app, treat it as a red flag."; "Contacting them quickly might help you stop or recover payments."; scammers „using photos of real properties from legitimate listings without permission, but changing the contact info and payment options."; "you should never wire money directly to an individual and always pay through the platform's secure payment portal."; a wire transfer is „difficult to trace and nearly impossible to reverse once sent." Sources: https://www.booking.com/articles/avoid-hotel-scams.html (`nu-bkavoid`), https://www.booking.com/articles/how-to-avoid-holiday-home-scams.en-gb.html (`nu-bkholiday`). Primary, foreign-language pages of the company itself. „Once your booking is confirmed …" sits beside its own statement on real prepayments (F439), so the page keeps to „what the confirmation lists".
- F443. **The leak of April 2026: what Booking.com says was taken** (LBC, 16 April 2026, quoting a Booking.com spokesperson): "unauthorised third parties being able to access some of our guests’ booking information, which may include booking details, names, email addresses, and phone numbers and anything that travelers may have shared with the accommodation."; "Financial information was not accessed from Booking.com’s systems, nor were guests' physical addresses."; "We have updated the PIN number for these reservations and informed our guests." tv3.lt the same day: „nusikaltėliai galėjo gauti prieigą prie vardų, el. pašto adresų, telefono numerių ir informacijos apie ankstesnes bei dabartines rezervacijas."; the scheme, in Norton's term „rezervacijų užgrobimai", „nes nusikaltėliai susisiekia su „Booking.com“ klientais apsimetę viešbučių atstovais ir siekia apgauti aukas ir įtikinti, kad šie jiems pervestų pinigų dėl tariamų rezervacijų problemų." Sources: https://www.lbc.co.uk/article/bookingcom-customers-warned-of-reservation-hijacking-by-fraudsters-following-hac-5HjdXnh_2/ (`nu-lbc`), foreign; https://www.tv3.lt/naujiena/naujienos/perspejimas-sios-platformos-vartotojams-fiksuojama-nauja-isilauzimu-banga-n1512158 (`nu-tv3wave`). Secondary; Booking.com's own statement was not found at its site. It does not say how many people were affected, and no source links a given Lithuanian message to this leak.
- F444. **The „hotel" that knows every detail: one traveller's account** (tv3.lt, 2026-06-13, from Reddit; the hotel was in Japan, not a Lithuanian case): „Turiu tikrą rezervaciją per Booking.com svetainę viešbutyje Japonijoje."; „kuriame į mane kreipėsi vardu ir pavarde ir tiksliai nurodė kiekvieną užsakymo detalę – užsakymo numerį, atvykimo ir išvykimo datas, viešbučio pavadinimą ir adresą, telefono numerį."; another user: „viešbučio administracija, kuri liepė per 24 valandas patvirtinti savo kelionę."; „Panašių laiškų su prašymais paskubėti susimokėti praneša gaunantys ir kiti keliautojai, įskaitant ir lietuvius", some „jog sukčių žinutes gauna net iš pačios internetinės platformos svetainės". Source: https://www.tv3.lt/naujiena/lietuva/rezervuoji-per-booking-ekspertai-ispeja-toks-laiskas-gali-istustinti-jusu-saskaita-n1525058 (`nu-tv3booking`). Secondary, retelling social media; the 24-hour demand and the Japan account are two different users. On the page only as travellers' accounts. Nothing in the source explains how messages reach the platform's own chat, so the page does not explain it either (the hijacked hotel accounts appear only in a vendor blog, `nu-bitdef`, not used).
- F445. **Airbnb: stay on the platform** (Airbnb's help article 199, no date): "Ask each other to communicate off-platform prior to booking; all communications prior to booking must be on Airbnb." is listed among what is not allowed; "If you're asked on Airbnb, via email, or through another method of communication to make a payment outside Airbnb without prior notice, it may be fraudulent."; "Signs of fraud, including requests to pay by wire or bank transfer, cashier’s check, or money order."; and its limit: "Some hosts, including select software-connected hosts, may collect mandatory fees off-platform." (disclosed in the price before booking). Source: https://www.airbnb.com/help/article/199 (`nu-airbnb199`). Primary, in English; the page says „Airbnb sako", so nothing reads as a Lithuanian rule.
- F446. **Airbnb: what paying outside costs you** (Airbnb's help article 209, no date): "If you choose to pay for your booking outside of Airbnb, you will lose the" AirCover protection; "If you pay via wire or bank transfer it may be a fraudulent reservation." Source: https://www.airbnb.com/help/article/209 (`nu-airbnb209`). Primary.
- F447. **Two Lithuanian cases, through the Bankų asociacija** (LRT, from ELTA, 2023-10-25): „Neseniai sukčiai su Lietuvos gyventoja susisiekė per „Booking“ platformą – sukūrę netikrą viešbučio skelbimą jie siekė gyventoją nukreipti į suklastotą interneto svetainę ir joje suvesti banko kortelės duomenis."; „Nusikaltėliai pirmiausiai atšaukė gyventojo atliktą būsto rezervaciją, o po to pateikė siūlymą išsinuomoti kitą objektą ir už jį apmokėti ne per pačią „Airbnb“ platformą, o atlikti mokėjimą tiesiai į nusikaltėlių banko sąskaitą."; advice „nepervedinėti pinigų gavus ,pavyzdžiui, el. laišką ar SMS žinutę, taip pat tikrinti skelbimų informaciją"; „Jei supratote tapęs sukčių auka, reikėtų kuo skubiau kreiptis į savo banką ir teisėsaugą." Source: https://www.lrt.lt/naujienos/verslas/4/2108965/bukite-labai-atsargus-finansiniai-sukciai-nusitaike-i-booking-ir-airbnb-platformas (`nu-lrt2023`). Secondary, quoting an institution. No amounts.
- F448. **Telia on fake listings** (AINA, 2025-12-07, Telia's Darius Povilaitis): the scheme „padirbtos nuotraukos, nukopijuoti tikrų būstų aprašymai ir siekis išvilioti pinigus apeinant oficialią platformą."; pictures made with AI „jų neįmanoma patikrinti per „Google“ vaizdų paiešką."; „Visada verta atsidaryti „Google Maps“ ar net „Street View“ ir įsitikinti, kad nurodytu adresu iš tiesų egzistuoja apgyvendinimo vieta"; the signs „neįprastai žema nakvynės kaina, įtariai žiūrėti į kvietimą pokalbius perkelti į „WhatsApp“."; „Lietuvoje aptikus neegzistuojantį butą Biržuose, atstovai į žinutes nesureagavo."; the article's own summary of Booking.com's advice: „Jei taisyklėse nenumatytas išankstinis apmokėjimas ar užstatas, tačiau jūsų reikalaujama sumokėti iš anksto ir taip patvirtinti rezervaciją, didelė tikimybė, kad bendraujate su apgavikais."; „Jei nenaudojate papildomų programėlių ir suvedėte savo kortelės duomenis įtartinoje svetainėje, nedelsdami susisiekite su savo banku." Source: https://aina.lt/kai-atrodo-per-gerai-kad-butu-tiesa-perspejimas-keliaujantiems-del-sukciu-booking-ir-airbnb-platformose/ (`nu-aina`). Secondary, a company's expert. The losses it gives (Prague, Italy, Czechia) are foreign and are not used.
- F449. **Tele2: Lithuanian resorts too** (alkas.lt, 2024-08-10, Tele2's Mantas Užupis): „Sukčiavimo mastai butų nuomos platformose kelia vis didesnį susirūpinimą ir jau yra aptinkami Lietuvos kurortuose."; „Užsisakę apgyvendinimą atostogoms, žmonės tik vėliau sužino, kad jų išsirinktas viešbutis ar vila iš tiesų neegzistuoja, nors pinigai jau sumokėti."; „nesiųskite pinigų tiesiogiai į nuomininko sąskaitą, nes taip platformos administratoriai negalės jums suteikti kompensacijos apgaulės atveju". Source: https://alkas.lt/2024/08/10/neegzistuojantys-bustai-atostogautojams-jau-siulomi-ir-lietuvoje/ (`nu-alkas`). Secondary, a company's expert. No Lithuanian case or amount. It does not say a platform will compensate, only that it cannot if you pay directly, so the page promises no compensation.
- F450. **A case: Klaipėda, 500 eurų, and the script** (Vakarų ekspresas, ve.lt, 2026-07-23, from the police): „Patrauklų pasiūlymą rado socialiniame tinkle paviešintame skelbime."; „Birželio 27 d. į nuomotojo nurodytą banko sąskaitą vyras pervedė avansą - 500 eurų."; „Tačiau butas jam nebuvo išnuomotas, pervesti pinigai negrąžinti."; a pre-trial investigation opened on 22 July at the Klaipėda city station; offenders „Interneto portaluose, socialiniuose tinkluose skelbimus skelbiantys" „neretai nurodo žemesnes kainas nei esančios rinkoje."; „Vėliau susidomėjusiems aiškina, kad dėl įvairių priežasčių greitai apžiūrėti butą yra neįmanoma, o juo domisi daug žmonių, todėl avansą pervesti reikėtų nedelsiant, nes kažkas kitas tai gali padaryti greičiau."; „ypač artėjant mokslo metams, kai studijuoti atvyksta daug studentų". Source: https://ve.lt/kriminalai/paskubejo-sumoketi-avansa-pinigai-dingo-kartu-su-buto-nuomotoju (`nu-velt`). Secondary.
- F451. **A case: Klaipėda, 443 eurai, and the police's signs** (kauno.diena.lt, 2026-06-05, Klaipėda police): „sukčiai taikosi į asmenis, norinčius išsinuomoti butą ar poilsio namelį."; „Nukentėjusysis neteko 443 eurų."; „Pabrėžiama, kad įtarimų turėtų sukelti neįtikėtinai žema kaina už prabangų būstą."; „tokie „nuomotojai“ vengia susitikti gyvai ar parodyti patalpas."; „patikrinkite, ar toks pastatas apskritai egzistuoja, ar nuotraukos nėra pavogtos iš kitų svetainių, pasidomėkite atsiliepimais ir niekada nemokėkite visos sumos aklai". Source: https://m.kauno.diena.lt/naujienos/klaipeda/nusikaltimai-ir-nelaimes/nepraraskite-budrumo-policija-ispeja-vasara-itin-suaktyvejo-viena-sukciu-schema-1759839 (`nu-klaippol`). Secondary.
- F452. **A case: Tauragės rajonas, 300 eurų, and the police's order** (15min, 2026-08-05): „Patikusį butą ji liepos 31 d. rado socialiniame tinkle paviešintame skelbime."; „neteko 300 eurų."; „Būtina apžiūrėti butą, įsitikinti, kad jis nuomojamas legaliai, sudaryti sutartį, ir tik tuomet mokėti už jį suderėtą sumą." Source: https://www.15min.lt/verslas/naujiena/nt-ir-interjeras/sukciai-isisuko-i-bustu-nuomos-sriti-spastai-spendziami-socialiniuose-tinkluose-971-2737744 (`nu-min15`). Secondary. The year is the page's own date.
- F453. **A case: Vilnius, they saw the flat and signed, and it still failed** (vilniaus.diena.lt, 2026-10-05, the Vilnius district police station): „Vilniuje nustatytas atvejis, kai asmenys, susidomėję buto nuomos skelbimu, susisiekė su tariama nuomotoja, apžiūrėjo butą, pasirašė nuomos sutartį ir sumokėjo avansą."; „tariama nuomotoja nebeatsiliepė telefonu, skelbimas buvo pašalintas, o pažadėtų raktų nukentėjusieji taip ir negavo"; „ypač atidūs turėtų būti studentai ir užsienio šalių piliečiai"; before paying an advance „patikrinkite, kas yra tikrasis būsto savininkas;", „įsitikinkite, kad asmuo turi teisę nuomoti būstą;", „neskubėkite pasirašyti sutarties ir pervesti pinigų;", „išsaugokite nuomos skelbimą;", „išsaugokite nuomotojo kontaktus;", „išsaugokite visą susirašinėjimą."; „Esant skubiai pagalbai – skambinkite 112". Source: https://vilniaus.diena.lt/naujienos/vilnius/nusikaltimai-ir-nelaimes/policija-ispeja-apie-pinkles-ieskote-buto-nuomai-bukite-itin-atidus-1777624 (`nu-vilnpol`). Secondary. No amount. It does not say how to check the owner, so the page does not name a register.
- F454. **Students before the school year** (tv3.lt, 2026-10-19, Klaipėda county police's Andromeda Grauslienė): „ypač prieš mokslo metus, kai jauni žmonės, studentai dažniausiai, ieško išsinuomoti būsto ir randa internete jiems tinkamą variantą ir net neapžiūrėję gyvenamosios vietos iš karto perveda avansą". Source: https://www.tv3.lt/naujiena/lietuva/78-eriu-klaipediete-sukciams-perleido-ne-tik-pinigus-bet-ir-buta-stai-kokia-taktika-jie-naudojo-n1561029 (`nu-tv3klaip`). Secondary. No amount; the large sum in the same article is another scam.
- F455. **Aruodas.lt: what a landlord usually asks, and what you may ask** (tv3.lt, 2020-09-12, Aruodas.lt's Viktorija Steponavičiūtė): „Įprastai nuomotojai neprašo pervesti pinigų dar prieš apžiūrint nuomojamą butą."; „apžiūrėjus butą ir ketinant jį nuomotis, galima prašyti parodyti nuosavybės teisę patvirtinantį dokumentą, taip pat asmens dokumentą". Source: https://www.tv3.lt/naujiena/naujienos/busto-nuoma-apkarto-sumokejo-pinigus-o-sukcius-isnuomojo-ne-savo-buta-n1058276 (`nu-tv3marij`). Secondary, six years old, and the only source saying what to ask for; the page dates it.
- F456. **Lietuvos bankas: a card payment may come back, in certain cases** (its FAQ, no date): „Jeigu už prekes ar paslaugas atsiskaitėte mokėjimo kortele, dėl galimybės susigrąžinti tokios operacijos lėšas galite kreiptis į savo mokėjimo paslaugų teikėją, išdavusį mokėjimo kortelę, nes tam tikrais atvejais tarptautinės mokėjimo kortelių asociacijos (pvz., VISA, „Mastercard“) sudaro galimybę susigrąžinti mokėjimo kortele sumokėtas lėšas." Source: https://www.lb.lt/lt/duk/ka-turiu-daryti-jei-atlikau-mokejima-prekybininkui-bet-man-nebuvo-suteikta-paslauga-ar-pristatyta-preke (`nu-lbduk`). Primary. A general answer about a seller who did not deliver, not about fraud; it says nothing about transfers.
- F457. **The European Commission is looking at it** (tv3.lt, 2026-10-21): the Commission „trečiadienį pradėjo oficialią procedūrą" under the Digital Services Act; „Netikri skelbimai, pavyzdžiui, apie neegzistuojantį nekilnojamąjį turtą, sukčiavimas apsimetant ir reikalavimų neatitinkančios apgyvendinimo vietos gali turėti neigiamą poveikį vartotojų apsaugai." Source: https://www.tv3.lt/naujiena/verslas/ek-pradejo-booking-com-tyrima-del-sukciavimo-rizikos-ir-pasleptos-reklamos-n1561718 (`nu-tv3ek`). Secondary. An investigation opened, no finding, and the page says so.

Not used: Marijampolė 640 Eur (2020) and the Palanga adverts (2018) (`nu-tv3marij`, `nu-lrtpalanga`; old, and 2026 cases exist); the Liepāja relatives (`nu-eset5`, undated, Latvia); the Australian ACCC figures in `nu-alkas` and the Prague and Italian figures in `nu-aina` (foreign, would read as local); a family whose confirmed booking did not hold, 221 Eur (`nu-tv3221`; not a scam); Bitdefender's hijacked hotel accounts and Action Fraud's 532 cases (`nu-bitdef`; a vendor's retelling, Action Fraud itself blocked); Airbnb's refund article 3218 (on-platform bookings only, and it would read as a promise for a fake listing).

Not found: any count or total of rental or booking fraud in Lithuania (the cases are single and dated; no police statistic); any page on it from NKSC, RRT, VVTAT or atpazinksukciu.lt; a Lithuanian case of the „hotel" message with a sum; how to check a flat's owner in practice at an official Lithuanian source (the Registrų centras route was not read, so the page does not name it); any platform's guarantee for a fake listing; whether a transfer to a fake landlord can be recovered, other than the general F203 and F442.

**B39. The online form, then the „broker" who phones** (read by Opus on 2026-11-04 from the raw text of each page; found by a Sonnet agent the same day). Raw pages: `%TEMP%\inv\inv-*.html.txt` and `%TEMP%\seo4\`; every quote below was matched against them by script (`b_verify_block.py`, 59 of 59). The police text never names a role; it says an unknown person. Already recorded and reused, not repeated here: F2, F4, F13, F14, F15, F16, F104, F118, F190, F194, F305, F348–F354.

- F458. **The form comes first, then the calls** (SEB, Daiva Uosytė, 2024-10-07): „Pastaruoju metu investiciniai sukčiai ypač mėgsta išnaudoti socialinius tinklus: kviečia sužinoti, kaip pelningai investuoti, kuria registracijos formas, renka vartotojų duomenis. Tada ima skambinti ir siūlyti finansines paslaugas ir įspūdingą uždarbį". Source: https://www.seb.lt/infobankas/naujienos/pasakos-apie-afrikos-princus-nebeveikia-kuo-siandien-vilioja-investavimo (`inv-seb-afrikos`). Primary, a bank's fraud desk. The one Lithuanian source that describes the step from form to call.
- F459. **Three police cases that begin with the form** (the police's standing phrase: „internete užpildžius skelbimą apie investicines paslaugas"; none describes the advert or where it ran). tv3/ELTA, 2026-10-31: on 6 September, „jai paskambino rusų kalba kalbėjęs nepažįstamas asmuo, kuris įtikino investuoti į internetinę investavimo platformą ir apgaulės būdu išviliojo apie 20 tūkst. eurų"; a woman born in 1942 in Vilnius. LRT/BNS, 2026-09-25: filled in during July, „su ja telefonu susisiekė nepažįstamas rusakalbis asmuo", 35,6 tūkst. eurų. LRT/BNS, 2026-10-23: a man born in 1969, Klaipėda county, filled in at the end of 2024, „su juo telefonu ir per „Telegram“ programėlę susisiekė rusų kalba bendravę nepažįstami asmenys", 100 tūkst. eurų. Sources: https://www.tv3.lt/naujiena/lietuva/84-metu-vilniete-patikejo-investavimo-pazadais-ir-neteko-20-tukst-euru-n1564572 (`inv_tv3_84`), https://www.lrt.lt/naujienos/lietuvoje/2/3063054/sukciai-is-penkiu-zmoniu-isviliojo-pinigu-ir-turto-uz-221-4-tukst-euru (`acc_lrt_114`; its 221,4 tūkst. covers five different cases, so it is never used here), https://www.lrt.lt/naujienos/lietuvoje/2/3091039/sukciai-itikino-investuoti-is-gyventoju-isviliota-daugiau-nei-124-tukst-euru (`inv-lrt-124k`). Secondary, carrying police reports. Police use the word „skelbimą"; that it means a form is our reading, supported by F458, and the page says „formą".
- F460. **The call may come with no form, and not only in Russian** (Kauno diena/ELTA, 2026-07-01, a man born in 1963, Marijampolė, April to 29 June): „Lietuvių ir rusų kalbomis kalbėję sukčiai įtikino jį investuoti pinigus į interneto investavimo platformą ir apgaulės būdu išviliojo 19 tūkst. 630 eurų." Živilė Kielienė (15min, F461): „Viskas gali prasidėti nuo netikėto skambučio ir pasiūlymo išbandyti investavimą vos už šimtą eurų." Source: https://kauno.diena.lt/naujienos/kriminalai/investavimas-virto-nuostoliu-vyra-sukciai-mulkino-nuo-balandzio-menesio-1763722 (`inv-kd-investavimas`). Secondary.
- F461. **How it grows, from the centre that counts it** (15min, 2026-09-10, an interview with Živilė Kielienė, Pinigų plovimo prevencijos kompetencijų centras): „Netrukus profesionaliai atrodančioje platformoje ima augti tariamas pelnas, o nuolat skambinantis „konsultantas“ ragina investuoti vis daugiau."; „sukčiai pradeda nuo nedidelių sumų – 100 ar 250 eurų."; „Taip pradinis 100 ar 250 eurų „pabandymas“ gali virsti dešimčių ar net šimtų tūkstančių eurų nuostoliais."; „Maža pradinė suma nėra atsitiktinumas – tai būdas žmogų suvilioti, įtraukti, įgyti jo pasitikėjimą ir tik tada išvilioti gerokai daugiau." Source: https://www.15min.lt/gyvenimas/naujiena/pokalbiai/pabandykite-nuo-100-euru-eksperte-paaiskina-kaip-investavimo-sukciai-itraukia-i-schema-ir-isvilioja-tukstancius-1040-2758486 (`inv-15-pabandykite`). Secondary, an interview with a named expert.
- F462. **The profit on the screen is not real** (Lietuvos bankas, 2020-06-03): „Neretai klientas iš pradžių raginamas pabandyti investuoti nedidelę sumą. Po gan trumpo laiko, pavyzdžiui, po savaitės, jo paskyroje pateikiami labai pelningi investavimo rezultatai. Jie netikri". Lietuvos bankas, 2025-12-15: „Investicinių pažadų schemose sukčiai vilioja pradėti nuo nedidelių sumų, gali sukurti „sėkmės“ iliuziją, o vėliau skatina investuoti vis daugiau, net skolintis." Sources: https://www.lb.lt/lt/naujienos/lietuvos-bankas-kaip-neprarasti-pinigu (`inv-lb-kaip-neprarasti`), `ls-lbpadek` (F352's URL). Primary.
- F463. **What he asks** (F461's interview): „Bendraujama ilgą laiką, klausiama apie turimas santaupas, pajamas, kitus finansinius išteklius". Kielienė on LRT, 2025-08-29: „Sukčiai vertina, ar žmogus gali pasiimti paskolą, ar jis turi daug pinigų, ar jis turi kažką parduoti, galbūt gali pas kažką pasiskolinti." Source: https://www.lrt.lt/naujienos/verslas/4/2656231/eksperte-apie-sukciu-isviliota-235-tukst-euru-suma-jie-yra-puikus-psichologai (`inv-lrt-235k`). Secondary. That article's first-half figure is printed ambiguously, so it is not used.
- F464. **The program and the bank „together"** (F461's interview): „Dažnai tariamas „investavimo konsultantas“ paprašo įsidiegti ir nuotolinės prieigos programą, pavyzdžiui, „AnyDesk“. Tai jau ypač pavojingas signalas." SEB, F458's page: „sukčiai siūlo įsidiegti ekrano vaizdo dalijimosi programą, kurią iš tiesų panaudoja perimdami asmens ar įmonės interneto banko prisijungimo duomenis." Lietuvos bankų asociacija, 2022-10-27 (F16's URL): „Pasitaiko atvejų, kai nusikaltėliai įkalba auką ir kartu prisijungti prie elektroninės bankininkystės paskyros, kad „drauge įvertintų finansinę padėtį“, o iš tiesų atlieka pavedimus." Primary for SEB and the association.
- F465. **The fee to take it out, and the sign** (F461's interview): „Žmogui sakoma: sumokėkite dar šiek tiek ir galėsite atsiimti viską." Lietuvos bankas, 2023-07-03: „Jei jau investavote, tačiau jums nesudaroma galimybė atsiimti investuotų lėšų ir jus spaudžia investuoti vis daugiau pinigų, jūs tikrai pakliuvote į sukčių spąstus." Source: `inv-lb-puse-nezino` (URL in F469). Lietuvos bankų asociacija, 2022-10-27 (F464's page), how it ends: „skambučiai liaujasi, o „investavimo paskyra“ tampa nebeprieinama". The same page: „Siekdami įrodyti, kad rizika - menka, o atgauti „sąskaitoje“ esančius pinigus esą nesudėtinga, net perveda dalį jau „investuotų“ lėšų atgal į asmens banko sąskaitą". That association piece tells a composite („Viktoras"), so it is only ever how the scheme runs.
- F466. **What Kielienė says to do** (F461's interview): „jeigu nelaukėte skambučio, niekur nesikreipėte, o jums skambina nepažįstamas asmuo ir siūlo investuoti bei žada didelę grąžą – tai sukčiai. Nutraukite pokalbį."; „Kilus pirmiesiems įtarimams svarbiausia yra sustoti ir nebepervesti nė vieno euro, kad ir ką žadėtų ar aiškintų tariamas konsultantas."; „Pasitarkite su savo finansų įstaiga ar policija"; „Pasikalbėkite ir su artimu žmogumi ar draugu."; „Labai svarbu nesinaudoti skambinusio asmens atsiųstomis nuorodomis."; on a paid rescue, „kas gali geriau žinoti apie jūsų tariamas investicijas, pervestas sumas ir patirtą nuostolį, jei ne tie patys sukčiai arba su jais susiję asmenys?" Her rule covers an unasked call; it does not cover someone who filled in a form, so the page says what a form does and does not prove (`M`).
- F467. **The word, and the size** (F461's interview): „Sukčiai gali prisistatyti brokeriais, investicijų konsultantais ar žinomų finansų bendrovių atstovais"; per the centre's data, „2025 m. dėl investicinio sukčiavimo gyventojai prarado daugiau kaip 4 mln. eurų, o 2026 m. pirmąjį pusmetį – daugiau kaip 852 tūkst. eurų."; and her caveat: „skirtingos sukčiavimo tipologijos praktikoje gali persidengti". Lietuvos bankas, 2017-07-28: „Brokeriais apsimetantys sukčiai siūlo investuoti internetinėse platformose, kuriose realiai jokia prekyba nevyksta". Lietuvos bankų asociacija, 2023-12-15: „netikri investicijų brokeriai gyventojams siūlo greitai praturtėti". Sources: https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-siulydami-pelningai-investuoti-sukciai-vilioja-pinigus (`inv-lb-ispeja-pelningai`), https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/investiciniai-sukciai-siauteja-telegram-programeleje (`inv-lba-telegram`). The two periods are not to be compared as a trend: the page never says it is growing or falling.
- F468. **Real firms do not cold-call** (Lietuvos bankų asociacija, Čipkutė, 2024-10-11): „finansų įstaigos neteikia atsitiktinių pasiūlymų investuoti gyventojams telefonu ir juolab konsultacijų šia tema, jei pats gyventojas dėl to nesikreipė." Source: https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/investiciniai-sukciai-siauteja-toliau-pagrindiniai-pozymiai-ir-patarimai-kaip-isvengti-spastu (`inv-lba-toliau`). Primary, an industry body. A form does not fall under „atsitiktinių", so the page does not stretch it to a call after a form.
- F469. **Who may offer it** (Lietuvos bankas, 2023-07-03): „Lietuvoje investicines paslaugas gali teikti finansų maklerio įmonės, kredito įstaigos, finansų patarėjo įmonės ir valdymo įmonės, turinčios Lietuvos banko ar kitos valstybės narės priežiūros institucijos išduotą licenciją." Source: https://www.lb.lt/lt/naujienos/beveik-puse-lietuviu-nezino-kaip-patikrinti-ar-investuoti-siulantys-asmenys-nera-sukciai (`inv-lb-puse-nezino`). Primary.
- F470. **Messengers and language** (Kielienė, F463's article): „Svarbu suprasti, kad tikros investicijos nevyksta per „WhatsApp“ ar „Viber“ programėles. Jos vyksta lietuvių kalba, o ne išskirtinai rusų kalba"; „Sukčiai nori pasiekti auditoriją, kuri yra brandesnė ir daugiau žino rusų kalbą." SEB, 2023-10-23: „Dažniausiai brokeriais prisistatę asmenys kalba ne lietuvių, o viena iš užsienio kalbų. Paprastai tai būna rusų kalba, bet kartais pasitaiko ir angliškai kalbančių sukčių." F461's interview: „Įtarimų turėtų kelti ir netikėtas skambutis iš nepažįstamo numerio, ypač kai skambinama per „Viber“, „WhatsApp“ ar kitas programėles". Telegram is named by neither, so the page cites them for these two. F460 is the case in both languages, so the page never says Lithuanian is safe. Source for SEB: F471.
- F471. **What a bank saw** (SEB, Uosytė, 2023-10-23): „sulaukia skambučių iš finansų brokeriais apsimetusių asmenų su pasiūlymais investuoti"; „demonstruojami pasiekti įspūdingi rezultatai, padedama atidaryti fiktyvi investicinė sąskaita. Naudojami ir vaizdo skambučiai, ir investicinė grąža, kuri laikas nuo laiko pervedama investuotojui"; „joks finansų brokeris jūsų nemokys, kaip kalbėti su banko specialistais"; „visi dokumentai, susiję su investicijomis, turi būti pateikti raštiškai ir valstybine kalba."; „Dažnai sukčiai siekia izoliuoti auką nuo aplinkos"; „jei sulaukiate raginimų nesidalinti informacija, nesikonsultuoti su aplinkiniais, tai gali būti požymis". Source: https://www.seb.lt/infobankas/naujienos/nauja-sukciu-taktika-moko-klientus-kaip-apeiti-banko-saugumo-reikalavimus (`inv-seb-apeiti`). Primary. How they coach is deliberately not described on the page.
- F472. **The deadline and the loan** (Lietuvos bankų asociacija, F464's page): the offer „kitą dieną šis pasiūlymas nebegaliosiąs"; „sukčiai skubina, esą pasiūlymas rytoj nebegalios"; „skatina ne tik „investuoti“ visas turimas lėšas, bet ir skolintis iš pažįstamų bei kredito įstaigų."; Audrius Šilgalis of Lietuvos bankas: „Rimtos investicines paslaugas teikiančios bendrovės niekada nesiūlys didelio pelno be jokios rizikos". Composite story, as in F465.
- F473. **Never borrow; what is normal** (Lietuvos bankas, „Investavimas: kaip atpažinti sukčius", updated 2024-10-28, F14's page): „Jokiu būdu neinvestuokite skolintų lėšų!"; „investavimas be jokios rizikos tiesiog neegzistuoja, o normalus uždarbis iš investicijų dažnai svyruoja nuo 5 iki 10 proc. per metus." Source: https://www.lb.lt/lt/investavimas-kaip-atpazinti-sukcius (`inv-lb-investavimas`). Primary. It is a yardstick, not a promise, and the page says so.
- F474. **Lietuvos bankas: once you suspect it** (its page „Pakliuvau sukčiams: ką daryti?", updated 2026-07-30): „Sukčiai taiko psichologinį spaudimą, bandydami įtikinti, kad įvyko nesusipratimas, ir jei tik pervesite jiems dar lėšų, atgausite anksčiau pervestas."; „Finansų įstaigos kai kuriais atvejais dar turi galimybę sustabdyti tokio pobūdžio mokėjimus ir išgelbėti Jūsų pinigus."; „Jei tai investicinis sukčiavimas, informuokite Lietuvos banką"; it can block websites offering illegal investment services. Source: https://www.lb.lt/lt/pakliuvau-sukciams-ka-daryti (`inv-lb-pakliuvau`). Primary.
- F475. **Victims' details travel** (SEB, F458's page): „investiciniai sukčiai tarpusavyje neretai dalijasi savo aukų duomenimis."; „vienas klientas į sukčių pinkles papuolė net šešis kartus. Bent pusė atvejų buvo pagrįsti pažadais padėti susigrąžinti prieš tai prarastas lėšas." It speaks of victims, not of everyone who filled in a form; that a form's number may travel too is our inference, tagged `M`.

Not used: the 221,4 tūkst. headline (five cases, F459); the Kaunas 47,7 tūkst. case and the cases of 31 450 and 15 145 Eur (`inv_lrt_314`, `inv_15_15k`; they name no form); Bosaitė's line on pressure (LRT's paid „verslo pozicija", `inv-lrt-bosaite`); the 235 tūkst. case and the „VEXX"/„CySEC" case (`inv-lrt-235k`, `inv-tv3-12mln`; better kept off, one names a brand); „Viktoras" as a real victim (a composite); the 2020 Šiauliai „brokerė-analitikė" (`inv-15-siauliai`; undated page); „Lietuvos policija, bankai … rusiškai nekalba" (`inv-lrt-paulauskas`, 2025-07-17; said of institutions, not of investment firms); how scammers coach people for the bank (F471; the editorial rule).

Not found: any Lithuanian description of the advert itself or the platform's look beyond „profesionaliai atrodančioje"; a victim's own words; crypto accounts as a confirmed step in Lithuanian sources; „vadybininkas" as a title these callers use; any figure for the form route alone.

## Not confirmed, so the pages do not state it
- „Saugi sąskaita" as an official Lithuanian term (F28).
- Mobile-ID scam guidance (F36); a Smart-ID warning during calls (F37).
- That spoofed Lithuanian mobile numbers from abroad are blocked (F40).
- An official list of what to bring to the police (F5).
- An official Lithuanian warning that names deepfake ads (F50; F748 is an NGO's).
- Found by the 2026-10-25 research agent but not re-read by Opus, so not used yet: the police chief's
  figures to 15min and BNS (about €20m lost in both years, €15m to €40m protected, 285 convicted, a
  national fraud investigation centre being set up); the Raseiniai (€10,500) and Šiauliai
  (€131,800) cases; fake "Google assistant" calls (the Smart-ID change of 2026-10-01 and a Lietuvos
  bankas decision on PIN2 were read on 2026-10-31: F170, B16 *Not used*); a Lithuanian draft law on refunds (2026-02-25, not known
  to be adopted); FBI IC3's 2025 report ($20.877bn); Europol IOCTA 2026; ENISA's threat landscapes;
  the EBA/ECB €4.2bn for 2024.
- Searched for on 2026-10-25 and not found: police figures per scheme; the AML centre's own pages;
  the full NKSC 2025 report; crypto ATMs; job and task scams in Lithuania;
  a 2026 Lithuanian case of money lost to a cloned voice.
- Apple's Lithuanian word (F63); a source for the SIM PIN
  (F78); SIM-swap protection at Lithuanian operators (F79); a Lithuanian source for the family
  code word (F82).

## Opus check (2026-10-24)

These were re-read at the source by Opus and match the entries above:
- F41 and F42 (NKSC, 2026-07-13). The Signal sentence and the list of things never to reveal
  are as quoted. The page names Signal, WhatsApp and Telegram, and recommends Linked Devices
  and Registration Lock.
- F2 (police, 2026-02-05, updated 2026-04-23). The page says victims report through
  epolicija.lt, and fraud *attempts* can be reported by email to NKSC. It does not literally say
  "no loss".
- F55 to F57 (NIST SP 800-63B-4, §3.1.1.2, items 1, 5 and 6): 15 characters for a password
  used alone, 8 inside multi-factor login, no composition rules, and no periodic changes unless
  there is evidence of compromise.

## Opus check (2026-10-25)

F96 to F111 were each read at the source by Opus. One claim from the research agent failed and is
corrected in F104: Lietuvos bankas's pension warning of 2026-04-14 does not mention fake messages in
the name of Sodra, pension funds or banks.

Later the same day Opus settled the remaining `[tikrinti]` markers at their sources (F43 and F78 rewritten,
F117 to F122 new), starting from a research agent's leads. One lead did not hold as given: the FTC quotes
had been read through a summary, and the FTC answers a script with 403, so they are not used.

**B40. „Your son has had an accident": a relative in trouble, a stranger for the cash** (read by Opus on 2026-11-04 from the raw text of each page; found by a Sonnet agent the same day). Raw pages: `%TEMP%\seo4\acc*.html.txt` and `%TEMP%\avar\a-*.html.txt`; every quote below was matched against them by script (`verify_av.py`), the two German leaflets by eye, since their PDFs break a sentence across columns. Blocked, not got around: e-seimas (403, so the Criminal Procedure Code, the health-system law and the motor insurance law were not read at the official source), e-tar (the page came back as an empty script shell), the FTC pages and the original Vilnius police release (404). Already recorded and reused, not repeated here: F277–F283 (the collector at the door, `pareigunas-prie-duru`), F81 and F82 (the family word and its gap), F97 (a voice is no proof), F2, F4 and F13.

- F490. **It can begin in person, in a yard** (LRT/BNS, 2026-09-25 09:01, from a police report): „ketvirtadienį sostinės Vėtrungių gatvėje, namo kieme, prie 1942 metais gimusios moters priėjusi rusakalbė moteris pasakė, kad sūnus pateko į eismo įvykį ir reikalingi pinigai. Senolė moterį pasikvietė į butą, kur jai atidavė 8 tūkst. eurų, o moteriai išėjus, spintoje pasigedo dar 3 tūkst. eurų."; „dėl paskutinio – sukčiavimo ir vagystės tyrimus". The source says „rusakalbė moteris"; that she was a stranger („nepažįstamoji" on the page) is our reading. Source: https://www.lrt.lt/naujienos/lietuvoje/2/3063054/sukciai-is-penkiu-zmoniu-isviliojo-pinigu-ir-turto-uz-221-4-tukst-euru (`seo4/acc_lrt_114`). Secondary, from the police. The headline's 221,4 tūkst. covers five different cases, so it is not this scheme's figure.
- F491. **The story, as the police give it** (15min, 2025-05-23, Policijos virtualus patrulis): „Dažniausiai fiksuojamos 3 sukčiavimo schemos"; among them „Dažnai sukčiai praneša ir apie tariamą artimojo nelaimę. Teigia, kad sūnus, dukra ar kitas artimas žmogus pateko į avariją. Skubiai prašoma pinigų žalai ar gydymo išlaidoms padengti." Source: https://www.15min.lt/naujiena/aktualu/nusikaltimaiirnelaimes/policija-stebi-vis-izuliau-veikiancius-sukcius-ivardija-3-populiariausias-ju-schemas-59-2456430 (`seo4/acc15b`). Secondary, from the police. It gives no count.
- F492. **The same police: the sign and the advice** (same page): „Skubina, spaudžia priimti sprendimą iš karto"; „Neperduokite grynųjų pinigų nepažįstamiems asmenims"; „Visada patikrinkite informaciją – paskambinkite artimiesiems, oficialiems kontaktams."; „Jei kyla įtarimų – nedelsdami skambinkite 112." The page also lists broken Lithuanian as a sign; that is not used, since F97 says scammers now speak it correctly.
- F493. **Tell the older people around you** (same page): „Sukčiai dažniausiai taikosi į vyresnio amžiaus žmones. Pasikalbėkite su tėvais, seneliais, kaimynais".
- F494. **„Skubus pagalbos prašymas"** (LRT, 2025-01-10 15:12, from the Vilnius county police): „Vienas iš dažniausių telefoninių sukčiavimo metodų, žinomas kaip „skubus pagalbos prašymas“."; „Skambina nepažįstamas žmogus ir teigia, kad artimas giminaitis (pvz., sūnus, dukra, anūkas, giminaitis ir pan.) pateko į eismo įvykį. Jie dažnai pasakoja, kad žmogus yra sužeistas arba sulaikytas policijos, ir prašo pinigų, kad būtų sumokėta už gydymą ar išvengta teisinių pasekmių." Source: https://www.lrt.lt/naujienos/lietuvoje/2/2457411/policija-itin-suaktyveje-sukciai-taikosi-i-senjorus (`seo4/acc_lrt_sen`). Secondary, from the police. It says one of the most common, with no count.
- F495. **Fear on purpose, and others brought in** (same page): „Tokie skambučiai dažnai būna emociniai ir skubūs, siekiant sukelti baimę ir spaudimą aukai."; „sukčiai į „pagalbą“ dažnai pasitelkia ir kitus asmenis – tariamus advokatus ar medikus, su kuriais pabendravus, sumažėja tikimybė patikrinti informaciją".
- F496. **A voice she took for her daughter, and „tell nobody"** (same page, a case): „Po to pokalbį telefonu perėmusi moteris prisistatė esanti senjorės dukra. Moteris buvo įsitikinusi, kad iš tikrųjų kalba jos dukra."; „reikia 5 000 eurų, kad būtų išvengta teismo"; „Kadangi senjorei telefonu buvo liepta nieko niekam nesakyti, tuo metu kartu su ja buvęs sūnus, nežinodamas apie situaciją, rankinę su pinigais atidavė sukčiams." It does not say the voice was generated, and the page must not suggest it. The article dates neither this case nor those in F497 and F498, so the page says „described in 2025", not „in 2025".
- F497. **A driver, and a second demand** (same page, a second case): „į namų telefoną paskambinusi rusiškai kalbėjusi moteris prisistatė esanti jos dukra"; „Tariamas pareigūnas nurodė, kad nukentėjusi moteris reikalauja pinigų – 23 000 eurų už operaciją."; „Moteris surinko 10 000 eurų, kuriuos, sudėjusi į maišą su patalyne, atidavė atvykusiam vairuotojui."; „Moteris, susisiekusi su giminaite ir draugėmis, pasiskolino pinigų ir daugiau nei 10 000 eurų vėl atidavė vairuotojui."; „jos vyras taip pat buvo įviliotas į sukčių pinkles, tačiau pinigų jiems nespėjo atiduoti – buvo įspėtas".
- F498. **She argued with the real police** (same page): „Atvykusiems policijos pareigūnams moteris kategoriškai teigė, kad pastarieji jai meluoja ir iš jos pinigų niekas neišviliojo, ji tikino tik padedanti savo dukrai."; „Pareigūms teko pavargti kol įtikino moterį, kad ji buvo apgauta sukčių." (sic)
- F499. **The Vilnius county police's move** (same page): „neskubėkite atlikti jokių veiksmų"; „Paskambinkite tam neva nukentėjusiam žmogui ar kitiems šeimos nariams, kad sužinotumėte tikrąją situaciją."; „Jei vis gi tapote sukčių auka, kuo skubiau praneškite apie tai policijai."
- F500. **A man at the door, 13 tūkst. Eur** (Vilniaus diena, 2024-10-22 09:21, from the Police Department): „paskambino vyras, kuris pasakęs, kad dukrai atsitiko nelaimė, pareikalavo pinigų"; „Atėjusiam nepažįstamam vyriškiui moteris atidavė 13 tūkst. eurų." Source: https://vilniaus.diena.lt/naujienos/vilnius/nusikaltimai-ir-nelaimes/grizta-sena-taktika-apie-dukrai-nutikusia-nelaime-pamelaves-sukcius-1196848 (`seo4/acc_kd13`). Secondary, from the police.
- F501. **A young man at the door, 10,5 tūkst. Eur** (tv3/BNS, 2025-01-15, Kaunas county): „jai paskambino neva policijos pareigūnas ir pasakęs, jog dukra pateko į avariją, pareikalavo pinigų. Kiek vėliau į moters namus atėjo nepažįstamas jaunuolis, kuriam ji atidavė 10 tūkst. 500 eurų." Source: https://www.tv3.lt/naujiena/lietuva/is-dvieju-senjoriu-kauno-ir-panevezio-apskrityse-sukciai-isviliojo-beveik-28-tukst-euru-n1391092 (`avar/a-tv3-28k`). Secondary, from the police.
- F502. **The prosecutors' case: charges, 470 tūkst. Eur** (LRT/ELTA, 2026-10-09 12:10, from the prosecutor's release): five young men are charged; the pre-trial finding is that members of an organised group „iš sostinės ir jos apylinkių gyventojų išviliojo daugiau kaip 470 tūkst. eurų"; they „prisistatydavo gydytojais arba policijos pareigūnais, pasakydavo, kad jų artimasis sukėlė eismo įvykį, kuriame sunkiai nukentėjo kiti asmenys"; „Didelių pinigų sumų buvo reikalaujama ir už neva avarijoje nukentėjusių asmenų gydymą, ir už tai, kad būtų išvengta atsakomybės už neva sukeltą eismo įvykį."; „Išsigandę žmonės patys pasakydavo kaltinamiesiems savo namų adresą ir, atvykus tariamiems pareigūnams, perduodavo grynuosius pinigus, o kartais ir banko mokėjimo korteles"; „Nukentėjusiais šioje byloje pripažinti 45 asmenys."; „iš viso 104 nusikalstamos veikos"; „Baudžiamoji byla perduota nagrinėti Vilniaus miesto apylinkės teismui." Source: https://www.lrt.lt/naujienos/lietuvoje/2/3077177/penki-vyrai-kaltinami-is-zmoniu-isvilioje-daugiau-kaip-470-tukst-euru (`avar/a-lrt3077177`). Secondary, from the prosecutor. Charges only; no verdict was read, so the page says „kaltinami".
- F503. **Utena police, 2017: money problems are not settled between victim and offender** (release of 2017-10-24, same release as F281): „Patys paskambinkite giminaičiui ar artimajam, patekusiam į tariamą bėdą, ir įsitikinkite, ar tikrai jam reikalinga Jūsų pagalba."; „Atminkite, įvykus eismo įvykiui ar padarius nusikaltimą, niekada nesprendžiama iškilusios piniginės problemos tarp nukentėjusiojo ar pažeidėjo (įtariamojo)." Source: https://www.anyksta.lt/?p=54906 (`avar/a-anyksta54906`). Secondary, from the police. Old, so the page gives its year; it is the only Lithuanian sentence found that says this.
- F504. **Emergency care is free** (VLK, 2022-05-02, updated 2023-09-21): „kiekviena gydymo įstaiga būtinąją medicinos pagalbą privalo suteikti nemokamai visiems Lietuvos gyventojams – tiek apdraustiems PSD, tiek neturintiems šio draudimo"; „skubioji pagalba turi būti pacientui suteikta nedelsiant". Source: https://ligoniukasa.lrv.lt/lt/naujienos/butinosios-pagalbos-peripetijos-poliklinika-ar-ligonine/ (`avar/a-vlk-butinoji`). Primary. Emergency care only: the same page says non-emergency care at A&E can be charged and planned care is sent elsewhere; it says nothing of care abroad.
- F505. **Damage to someone else goes through insurance** (Lietuvos bankas, updated 2022-11-29): „Transporto priemonių valdytojų civilinės atsakomybės privalomojo draudimo (TPVCAPD) sutartimi yra apdraudžiama Jūsų atsakomybė, jei, valdydamas transporto priemonę, padarysite žalos kitam asmeniui."; „Pagal šį draudimą mokama draudimo išmoka yra skirta kito asmens patirtai žalai, padarytai dėl turto sugadinimo, sunaikinimo; žalai dėl asmens sveikatos sužalojimo ar gyvybės atėmimo ir (ar) neturtinei žalai atlyginti." Source: https://www.lb.lt/lt/transporto-priemoniu-draudimas (`avar/a-lb-tpvcapd`). Primary. It does not say that no money can ever be owed above the cover or by an uninsured driver, and it says the insurer can reclaim from the driver in some cases (drunk, fled the scene).
- F506. **Bail goes to an account** (Visuotinė lietuvių enciklopedija, no date, read 2026-11-04): „piniginė įmoka, kurią į prokuratūros ar teismo depozitinę sąskaitą įmoka įtariamasis, jo šeimos nariai ar giminaičiai"; „Užstato dydį nustato šią kardomąją priemonę skiriantis pareigūnas ar teismas". Source: https://www.vle.lt/straipsnis/uzstatas/ (`avar/a-vle-uzstatas`). Secondary. That nobody takes it in cash at a door is our reading, tagged `M` on the page.
- F507. **The same in the Code, from an unofficial copy** (BPK art. 133 on lrvalstybe.lt, no date): „Užstatas – tai piniginė įmoka, kurią į prokuratūros ar teismo depozitinę sąskaitą sumoka įtariamasis, jo šeimos nariai ar giminaičiai"; the ruling notes „kokioje banko įstaigoje įtariamasis ar užstato davėjas sumokėjo nustatyto dydžio piniginę įmoką". Source: https://lrvalstybe.lt/istatymai/straipsnis/133-straipsnis-uzstatas (`avar/a-bpk133-lrv`). Secondary; the version in force was not confirmed, since the official text was blocked. Supports F506, not cited alone.
- F508. **Reporting fast helped** (paninfo.lt, 2025-02-21, from the Panevėžys police): another story (money said to be counterfeit), about 9 tūkst. Eur: „Kadangi nukentėjusi moteris gana greitai pranešė apie sukčiavimą"; police „sustabdė įtariamojo vairuojamą automobilį"; „Du asmenys sulaikyti". Source: https://paninfo.lt/policijos-pareigunai-karstais-pedsakais-sulaike-telefoninius-sukcius (`avar/a-paninfo2`). Secondary, from the police. It does not say whether the money came back, so the page does not either.
- F509. **An older claim that the story had gone** (atpazinksukciu.lt, no date): „vietoje šokiruojančių dramatiškų situacijų apie artimuosius, patekusius į avarijas, jie vilioja aukas siūlydami neva labai pelningas investavimo galimybes". Source: https://atpazinksukciu.lt/istorijos (`avar/a-atpazink-ist`). F490 and F502 show the accident story still in use in 2026, so this is not used on the page.

Not used: Panevėžys 33 000 Eur (`avar/a-reidas-panev`, Reidas, 2024-10-04; one more case of the same shape). Radviliškis, where a woman who refused was tied up by two men and lost 230 Eur and jewellery (`avar/a-planuotas`, the police, 2020-12-11; old and unique, and on this page it could read as a reason not to refuse). The grandson case in court (`avar/a-tv3-penki`, tv3, 2024-08-04; offences of 2021, and F494 already names the grandson). The Kaunas campaign (`avar/a-kaunieciams`, 2025-04-16; says what F492 says). Two German leaflets, read by eye: Karlsruhe police, „In Deutschland ist eine ärztliche Behandlung oder Operation nach einem Verkehrsunfall nie von einer Vorauszahlung abhängig", and Brandenburg's interior ministry, 2023-10-10, on asking other relatives (`avar/a-FOREIGN-bw.pdf.txt`, `avar/a-FOREIGN-bb.pdf.txt`); they would read as Lithuanian law, and F499, F503 and F504 cover the ground. That the caller speaks Russian or broken Lithuanian (F490, F497, the 15min list): not given as a sign, since F97 says otherwise and it would point a frightened reader at the wrong thing. How much is put in the bag and what covers it (F496, F497): recognising it does not need the detail.

Not found: any count of this scheme alone in Lithuania; a dated 2025–2026 case in a grandson's name; a current official Lithuanian sentence that a real accident or arrest never involves cash to a stranger (only F503 of 2017, and the German leaflets); anything official on what to do when the relative does not answer, so the page's next step (other family, then 112) leans on F499 and F492; anything from NKSC or lb.lt on this story; where the caller learns of the family; the text of the laws at their official source (blocked, above).

**B41. A concert ticket from a stranger** (read by Opus on 2026-11-04 from the raw text of each page; found by a Sonnet agent the same day). Raw pages: `%TEMP%\bil\*.html.txt` and `%TEMP%\seo4\tk_*.html.txt`; every quote below was matched against them by script (`verify_quotes.py`, 83 of 83). Blocked, not got around: e-seimas.lrs.lt and infolex.lt answer 403, so the Criminal Code was not read; e-tar.lt and kakava.lt return an empty script shell; bilietupasaulis.lt and ticketmaster.lt gave no connection; Bilietai.lt's Lithuanian FAQ address gave 404; the delfi.lt original of F536 was not found. Piletilevi was not tried. Already recorded and reused, not repeated here: F2 (epolicija.lt), F4 (save the correspondence, tell the bank), F13 (reach the bank by official channels), F203 (the sooner, the likelier), F261 (report even a small loss).

- F520. **Rammstein, Vilnius 2023: 32 people in one month** (Šiaulių county police, 2023-05-25, on policija.lrv.lt and through LRT the same day): „Iš viso gegužės mėnesį Lietuvoje į policiją kreipėsi 32 sukčių apgauti „Rammstein“ gerbėjai. Didžioji dalis nukentėjusiųjų – vilniečiai." „Kainos buvo įvairiausios – nuo 65 iki 120 eurų." „Pareigūnai įspėja, kad įsigyjantys bilietus iš perpardavinėtojų visada rizikuoja." „Sukčių vaizduotę gali sužadinti ir populiaresnės sporto varžybos, ir garsesnis teatro spektaklis, ir bet koks kitas paklausą įgijęs renginys." Source: https://policija.lrv.lt/lt/naujienos/rammstein-koncertas-vilniuje-suzadino-ne-tik-grupes-gerbeju-bet-ir-sukciu-vaizduote/ (`p-rammstein`); https://www.lrt.lt/naujienos/lietuvoje/2/1997997/rammstein-koncertas-atskleide-naujas-sukciu-taktikas-netikrus-bilietus-isigijo-desimtys-grupes-gerbeju (`n-lrt-rammstein`). Primary. 32 is one event's reports, not a yearly or national count of ticket fraud.
- F521. **Rammstein: how it ended for the buyers** (same release, read through LRT): one buyer „pardavėjui į nurodytą banko sąskaitą už du bilietus pervedė 178 eurus ir bilietus gavo. Po kurio laiko joniškietis sulaukė žinutės, kad už bilietų repersonalizavimą reikia sumokėti dar 22 eurus. Vaikinas pardavėjui pervedė ir šią sumą." and, on sending them to Bilietai.lt, „sulaukė atsakymo, kad bilietai negaliojantys". Another „į koncertą taip ir nepateko, kadangi ant bilietų esantys brūkšniniai kodai buvo neaktyvūs". Others: „Kai tik pinigai įkrisdavo į nurodytą sąskaitą, pardavėjas pirkėjo feisbuko anketą užblokuodavo arba išjungdavo savo profilį neatsiuntęs jokio bilieto, net ir falsifikuoto." Sellers backed their claim „falsifikuotomis ekrano nuotraukomis" of a chat with the site. Source: `n-lrt-rammstein`. Primary (a police release), single cases. That Bilietai.lt answered in 2023 does not mean it checks tickets now: F533 says it does not, so the page never tells the reader to check there.
- F522. **Pakruojis, October 2026: 160 euros** (15min, 2026-10-20, from the police): „Pakruojietė socialiniame tinkle radusi skelbimą apie parduodamus bilietus į koncertą liko ir be bilietų, ir be pinigų." „Policijos duomenimis, spalio 9 dieną 2006 metais gimusi mergina į pardavėjo nurodytą banko sąskaitą pervedė 160 eurų, tačiau bilietų negavo, o pinigai jai nebuvo grąžinti." „Ikiteisminis tyrimas dėl įvykio pradėtas spalio 19 dieną, patikslinus aplinkybes." Source: https://www.15min.lt/naujiena/aktualu/nusikaltimaiirnelaimes/pakruojiete-uz-bilietus-i-koncerta-sumokejo-160-euru-taciau-ju-negavo-59-2788368 (`n-15min-pakruojis`). Secondary, naming the police. It names no concert.
- F523. **Lilas ir Innomine, Kaunas, March 2025: nine reports** (Kauno diena, 2025-03-17, the police's O. Vaitkevičienė): „Pranešimų apie įsigytus netikrus bilietus sulaukta tiek koncerto dieną, tiek kitą dieną. Iš viso – devyni pranešimai." A venue's refusal, in a buyer's words: „Kai tik pasakė, kad į koncertą neįleis, nes bilietas jau panaudotas, iš karto ir pranešėme policijai". An anonymous group administrator: „Bendravau su vienu žmogumi, kuris gyvai susitiko su T. L. ir padavė pinigus, o jis jam atsiuntė tuos pačius bilietus." and „Gavo bilietus, specialiai parskrido iš Airijos ir vis tiek liko už durų." Source: https://kauno.diena.lt/naujienos/kaunas/nusikaltimai-ir-nelaimes/bilietu-i-lilas-ir-innomine-skandalas-aiskinasi-policija-1216542 (`n-kd-lilas`). The count is primary (the police, quoted); the meeting in person and the trip from Ireland are one anonymous person's words, and the page says so or keeps them general. The man is a suspect, initials only in the article, and never named on our page.
- F524. **Dainų šventė, 2024: seven reports in days** (LRT, 2024-07-03, J. Samorokovskaja of Vilnius county police): „nuo birželio 29 d. Policijos registruojamų įvykių registre užregistruoti 7 pranešimai apie atvejus, kai žmonės pirko bilietus į Dainų šventės renginius ne iš oficialių platintojų ir liko apgauti." „Žmonės pasiskelbia, kad parduoda arba ieško nusipirkti bilietų „Facebook“ grupėse. Tuomet atsiranda „pardavėjai“, kurie nurodo užsienio sąskaitas ir, gavę pinigus, užblokuoja pirkėjus. Tuomet žmogus lieka ir be pinigų, ir be bilietų". „Visgi, jei žmonės susigundė ir liko apgauti, reikėtų kreiptis į policiją". Source: https://www.lrt.lt/naujienos/kultura/12/2310489/norinciais-patekti-i-dainu-sventes-renginius-naudojasi-sukciai-gauna-pinigus-ir-dingsta (`n-lrt-daingsv-sukciai`). Primary, quoted. The 7 counts reports from 29 June in an article of 3 July, while the festival was still on: the first days, not a total.
- F525. **Bocelli, Klaipėda: meeting in person did not help** (15min, 2019-01-22, from the prosecutors): a man accused of having dared, „susitikęs su 14 asmenų skirtinguose miestuose netikrus bilietus parduoti ir apgaule įgyti beveik 2000 eurų"; the prosecutors „teismui perdavė baudžiamąją bylą dėl sukčiavimo ir netikrų bilietų". Source: https://www.15min.lt/zmones/naujiena/lietuva/padirbtus-bilietus-i-andrea-bocelli-koncerta-pardavinejusiam-klaipedieciui-teisiamuju-suolas-1050-1091380 (`n-15min-bocelli`). A case sent to court, not a conviction: the page says „kaltintas". We did not look for the verdict.
- F526. **A real ticket sold to several; sold out does not stop them** (Kauno diena, 2026-08-26, from the police, on Jessica Shy's concerts): „Anot pareigūnų, pasitaiko ir atvejų, kai vienas ir tas pats, net ir tikras, bilietas yra perparduodamas keliems pirkėjams." „Sukčiams „sold out“ negalioja". „nuo tokių apgavysčių jau nukentėjo ne vienas žmogus. Be to, dalis pirkėjų apie klastotę ar jau panaudotą bilietą sužino tik renginio dieną." „bilietus į koncertus patariama pirkti tik iš oficialių bilietų platinimo svetainių." Source: https://kauno.diena.lt/naujienos/laisvalaikis-ir-kultura/zvaigzdes-ir-pramogos/ispeja-jessicos-shy-gerbejus-jau-nukentejo-ne-vienas-zmogus-1771851 (`n-kd-shy-nukentejo`). Secondary, naming the police. No count.
- F527. **At the door, and the police's timing** (LRT, 2024-07-21): M. Vedrickas of Žalgirio arena: „nes tu net nežinai, kiek dar kartų tas bilietas yra parduotas" and „matome, kad pirmas žmogus įeina su tuo bilietu, o dar penki žmonės, kuriems tas bilietas yra parduotas, jau neįeina". „Sukčių parduodami bilietai dažniausia identiški tikriems, dažnai tai tiesiog kopijos." LRT's own narration, after quoting Kauno county police: „Pareigūnai pranešimo sulaukia pavėluotai, kai pinigai jau būna perversti, o paskyros – panaikintos." A. Gubenko of Kauno county police, on invented shows: „Žmonės nusiperka bilietus į grupės koncertą, kuri į Lietuvą net fiziškai dėl sankcijų negali atvažiuoti". Source: https://www.lrt.lt/naujienos/verslas/4/2323410/daugeja-sukciavimo-atveju-kartais-bilietai-parduodami-ir-i-neegzistuojancius-renginius (`n-lrt2024`). Primary for the named people's quotes; the timing line is LRT's. The article's „arti pusės tūkstančio" is all fraud in the county, not tickets, and is not used.
- F528. **A bank's account of the scheme and what to do** (alkas.lt, 2026-06-25, an Artea press release): „Įdomiausia tai, kad būtent šiuo metu sukčiai parduoda realius bilietus. Tačiau problema iškyla, kai tą patį, realų vieną bilietą sukčiai parduoda dešimtims žmonių." „sukčius dažnai skatina veikti greitai: tikina, kad bilietų pageidauja ir kiti žmonės, todėl reikia kuo skubiau pervesti avansą arba visą sumą. Gavęs pinigus, pardavėjas dingsta, užblokuoja pirkėją arba atsiunčia negaliojantį bilietą." „pirkėjas nukreipiamas į suklastotą bilietų pardavimo svetainę, kuri vizualiai primena oficialų platintoją." „sukčiai gali pasisavinti ne tik sumą už tariamą bilietą, bet ir bandyti ištuštinti sąskaitą." „Patikimiausias būdas – naudotis renginių organizatorių nurodytomis prekybos vietomis ar oficialiomis perpardavimo platformomis." „Vien tai, kad žmogus turi nuotrauką, draugų ar seniau sukurtą paskyrą, dar nereiškia, jog jis yra patikimas pardavėjas." „Kuo greičiau klientas kreipiasi į banką, tuo didesnė tikimybė imtis veiksmų ir sumažinti galimus nuostolius. Jeigu buvo atskleisti mokėjimo kortelės ar prisijungimo prie interneto banko duomenys, reikėtų nedelsiant užblokuoti mokėjimo priemones ir informuoti banką". „rekomenduojama išsaugoti visą susirašinėjimą su tariamu pardavėju, mokėjimo informaciją, ekrano kopijas ir kreiptis į policiją." Source: https://alkas.lt/2026/06/25/sukciai-taikosi-ir-i-didziuosius-vasaros-renginius/ (`tk_alkas`). A bank's release, no count; „dešimtims žmonių" is its word, not a measured figure.
- F529. **A security firm: copies, forged proof, a clean profile** (LRT, 2025-08-28, a Baltimax release, L. Apynis): „Net jei bilietas atrodo tikras, jis gali būti kopijuotas ir parduotas keliems žmonėms. Į renginį pateks tik pirmasis, o visi kiti – liks už durų." Tools „padedantys suklastoti čekius, bilietų fragmentus ir net susirašinėjimų kopijas", „nuo bilieto nuotraukos iki fiktyvaus pervedimo kvito". „Per daug švarus arba visai naujas profilis – pirmas įtarimo ženklas". On fake sites: „Nors Lietuvoje tokie atvejai dar reti". „Geriau prarasti galimybę nueiti į renginį nei pinigus." „Naudokite saugius atsiskaitymo būdus, kurie leidžia susigrąžinti pinigus sukčiavimo atveju." „Bilieto pirkimas iš kito asmens kai kuriais atvejais gali būti vienintelis būdas patekti į trokštamą renginį." Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2623355/bilietai-i-rengini-ar-sukciu-pinkles-kaip-apsisaugoti-nuo-apgaules (`tk_lrt`). A company's release, its opinion, no figures.
- F530. **A ticket seller: when it peaks, and that it rarely comes back** (same LRT piece, J. Pačinskas of Kakava.lt): „Daugiausia sukčiavimo atvejų fiksuojama tuo metu, kai vyksta itin populiarūs arba išparduoti renginiai – tiek koncertai, tiek sporto varžybos." „pagal platformos taisykles bilietų perpardavimas yra draudžiamas, o riziką prisiima pats pirkėjas." „jei jau įsigijote netikrą bilietą, deja, atgauti pinigų dažnai tampa neįmanoma. Oficialūs platintojai tokiu atveju negali padėti, nes bilietas buvo pirktas ne per jų sistemą." „Nukentėjusiems patariame kreiptis į teisėsaugą dėl galimo sukčiavimo". Source: `tk_lrt`. One seller's words: the resale rule is about its own platform, the „negali padėti" sentence about official sellers in general. Its rules were not read (kakava.lt is a script shell).
- F531. **The police on rush and price** (Kauno diena, 2025-03-17, O. Vaitkevičienė; repeated by the same paper on 2025-07-15, introduced „Kiek anksčiau"): „Dažnai gyventojai neįvertina rizikos, pasiduoda „spaudimui“, kad greitai bilietus nupirks kiti. Taip pat neretai imponuoja ir mažesnė siūloma nei rinkos kaina". „policijos pareigūnai pirmiausiai rekomenduoja bilietus įsigyti iš oficialių platintojų. Taip pat siūlo naudotis saugaus pirkimo internetu paslauga, kai gali atšaukti mokėjimą". Source: `n-kd-lilas`; `tk_kd_js` (URL under F536). Primary, quoted. The 2025-07-15 repeat adds an author's note naming PayPal and some credit cards; the police did not name them, so the page names none.
- F532. **Bilietai.lt's terms** (its rules, version shown as in force from 2026-02-26): „Bilieto nukopijavimo atveju į renginį patenka asmuo, pirmas pateikęs bilietą įėjimo kontrolės vietoje." „Bilietą kopijuoti, dauginti, klastoti, perparduoti tretiesiems asmenims griežtai draudžiama." „Personalizuotų bilietų pirkėjams gali būti sudaryta galimybė tokius bilietus repersonalizuoti, tačiau už šią paslaugą gali būti taikomas papildomas mokestis." and, on the event, „informaciją apie tai galite rasti to konkretaus renginio aprašyme". Also „Asmenys, neteisėtai naudojantys bilietus gali būti patraukti baudžiamojon atsakomybėn pagal Lietuvos Respublikos baudžiamojo kodekso 182, 300 bei kitus straipsnius." and „Neteisėtai įsigytu bilietu disponuojančiam asmeniui, gali būti panaikinta teisė pasinaudoti biliete nurodyta paslauga." Source: https://www.bilietai.lt/apacia/company/430/privatumo-politika-ir-paslaugu-teikimo-taisykles (`s-bilietai-terms`). Primary for one seller's rules only, not law, and not other sellers'. The last two sentences are not on the page (see F536).
- F533. **Bilietai.lt on the e-ticket** (its article, 2026-08-28): „Vienu e. bilietu galima pasinaudoti tik vieną kartą. Jei bilietas nukopijuojamas ir egzistuoja kelios jo kopijos, į renginį pateks tas asmuo, kuris bilietą pirmas pateiks įėjimo kontrolėje." „„Bilietai.lt“ neteikia iš trečiųjų asmenų įsigytų bilietų tikrinimo paslaugos ir negali patvirtinti, ar toks bilietas yra galiojantis." „vien tai, kad gavote PDF failą ar bilieto nuotrauką, negarantuoja, kad su juo pateksite į renginį." „vienintelis patikimas būdas įsigyti „Bilietai.lt“ platinamą bilietą – pirkti jį oficialiose „Bilietai.lt“ pardavimo vietose." „Jei personalizuojamas konkretus bilietas, į renginį su juo gali patekti tik biliete nurodytas asmuo." „Paprastai kitas žmogus gali pasinaudoti jūsų įsigytu „Bilietai.lt“ elektroniniu bilietu, net jei ant jo nurodytas pirkėjo vardas, jeigu konkretaus renginio aprašyme nenurodyta kitaip." Source: https://www.bilietai.lt/naujienos/19082/elektroninis-bilietas-ka-reikia-zinoti (`s-bilietai-eticket-lt`). Primary for tickets it sells; it says nothing about other sellers. Giving a ticket to a friend is therefore not, by these words, the thing warned about.
- F534. **A fake site, Kaunas 2022: the money was held** (Kauno county police, 2022-02-11): fake tickets, on a fake site, to announced concerts (the title's „nebevyks" means the buyers will not get in): „spėta išplatinti apie 20 netikrų bilietų, tačiau dėl policijos pareigūnų veiksmų gautos piniginės lėšos buvo sulaikytos banko sąskaitose ir sukčiautojų nepasiekė." „Įtariama, kad dauguma bilietus į koncertus įsigijusių asmenų neįtaria įsigiję netikrus bilietus". „įsitikintų, ar pardavėjas yra oficialus platintojas – paieškotų informacijos apie tai, kas dar platina bilietus į tą patį renginį". Source: https://policija.lrv.lt/lt/naujienos/kai-kuriems-gyventojams-teks-nusivilti-i-pasaulinio-lygio-koncertus-nebevyks/ (`p-kauno-nebevyks`). Primary. One case, which the police worked themselves before calling for victims, on a website and not a stranger's post; it says the money did not reach the fraudsters, not that buyers got it back, and it is no promise that a report holds the money. The page says so.
- F535. **Tickets among the most common advance-fee frauds** (the police, 2025-07-04, A. Gubenko): „Masiškiausiais sukčiavimo būdais išlieka melagingos internetinės nuorodos, netikros banko svetainės ar el. parduotuvės bei avansiniai sukčiavimai, kai socialiniuose tinkluose įkeltuose skelbimuose siūlomos prekės ar renginių bilietai, dažniausiai pasižymintys nedidelėmis kainomis, kurių pirkėjas negauna." Source: https://policija.lrv.lt/lt/naujienos/apgaules-piramide-kaip-nepakliuti-i-naujausias-finansines-pinkles/ (`p-piramide`). Primary. No figure, and goods and tickets are counted together.
- F536. **Who the criminal liability falls on: the reseller; no source on the buyer** (Kauno diena, 2025-07-15, repeating Bilietai.lt's comment to delfi.lt): „portalui delfi.lt dėl bilietų perpardavinėjimo komentavo oficialus bilietų platintojas Bilietai.lt." The headline's „užsiimant tokia veikla gali grėsti administracinė arba net baudžiamoji atsakomybė" follows „iš jų įsigyti bilietai – netikri", so „tokia veikla" is reselling. „Toks elgesys gali būti traktuojamas kaip teisės pažeidimas" sits in the same reseller's passage, „Bilietų perpardavinėjimo teisėtumą, taikytinas baudas ar kitas galimas pasekmes vertina atsakingos institucijos". Also „bilietų perpardavinėtojai, dažnai teigdami negalintys patys vykti į renginį, siūlo savo bilietus už originalią ar net aukštesnę kainą." Source: https://kauno.diena.lt/naujienos/laisvalaikis-ir-kultura/zvaigzdes-ir-pramogos/pries-pat-jessicos-shy-koncertus-ispejimas-uzsiimant-tokia-veikla-gresia-baudziamoji-atsakomybe-1711190 (`tk_kd_js`). A seller's comment through two papers, with no state source for the sums it gives, and it does not speak of buyers. Where the offers appear: „aktyviai jų ieško socialiniuose tinkluose ir skelbimų portaluose". **On the page only those two lines (where and at what price)**: no source says a buyer is punished, and we say nothing that frightens one.
- F537. **Tele2 on paying a stranger** (LRT, 2024-07-12, a Tele2 release, M. Užupis): „jokiu būdu neperveskite pinigų, jei nurodytos sąskaitos gavėjas nėra tas pats asmuo, su kuriuo susirašinėjate". „Venkite tiesioginių banko pavedimų, išankstinio mokėjimo ir grynųjų pinigų operacijų." „Perpirkti bilietus socialiniuose tinkluose – rizikinga." Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2316467/siule-netikrus-bilietus-i-dainu-svente-kaip-atpazinti-sukciaujancius-perpardavinetojus (`n-lrt-daingsv-netikri`). A company's advice. Its checks of a ticket's look (fonts, security marks) are not used: a copy looks identical (F527).
- F538. **Matches too** (tv3, 2026-09-29, from the police): „Socialiniuose tinkluose skelbiamas bilietų pasiūlymas gali būti sukčių spąstai." „Tokiais atvejais gyventojai gali likti ir be pinigų, ir be žadėtų bilietų." Source: https://www.tv3.lt/naujiena/gyvenimas/pamate-ka-daro-sukciai-lietuvoje-skubiai-perspeja-visus-pirkite-tik-n1555202 (`n-tv3-n1555202`). Secondary, naming the police.

Not used: Tiketa's rule against resale (`s-tiketa-rules`, undated); the „apie 2 tūkst. eurų" in `n-kd-lilas` (a relative's hearsay about a named suspect); „arti pusės tūkstančio" in `n-lrt2024` (all fraud in Kaunas county); a reader's own account of 70 euros (`n-tv3-daingsv-70`); Dua Lipa 2021 (`n-lrt-dualipa`, old, adds nothing); a distributor's case before VVTAT (`n-lrt-sheeran-perparduoti`, another subject); Vedrickas's sentence on how codes are copied (`n-lrt2024`, too close to how-to); F536's Criminal Code articles and sums.

Not found: any national total or yearly count of ticket fraud in Lithuania, so the page gives single events and says it has no total; whether a buyer can be held liable for a resold ticket; VMI on reselling; any named official resale channel in Lithuania, so the page names none; Kakava.lt's own rules, read only through F530; the verdict in F525.

**B42. Blackmail with private pictures: „pay or I publish"** (read by Opus on 2026-11-04 from the raw text of each page; found by a Sonnet research agent the same day). Raw pages: `%TEMP%\sant\` (`a-*` the route for a child, `b-*` the rest, `f-*` foreign) and `%TEMP%\seo4\sx_*`; every quote below was matched against them by script. The reader of this page may be a child, so the route was researched first. Nothing below says how such pictures are made, found or used, and no sexual detail is kept.

- F540. **Vaikų linija 116 111, the first line for a child** (Vaikų linija, an NGO; „Pagalba telefonu", dated 15 November 2023, and „Pagalba pokalbiais internetu", updated 8 October 2024; „Apie mus", no date): „Pasikalbėkime kasdien 11-23 val.“; written chat „rašyk Vaikų linijai kasdien nuo 14 iki 23 val.“; „emocinės paramos tarnyba vaikams ir paaugliams, teikianti nemokamą ir anonimišką pagalbą telefonu bei internetu“; „Paskambinus Tau nebūtina prisistatyti, pasakyti savo vardo ar iš kur skambini.“; it does not see the caller's number: „mes nematome telefono numerio, iš kurio skambini.“. Confidential, with two stated limits, which the page must not hide: „Vaikų linija gali nesilaikyti konfidencialumo principo, jeigu pokalbio metu Tavo gyvybei grėstų pavojus.“ (the call is then connected to 112), and „sužinojus, kad planuojamas, yra įvykdytas labai sunkus nusikaltimas“. It does not say what the second limit means for a caller being blackmailed. Sources: https://www.vaikulinija.lt/vaikams-paaugliams/pagalba-telefonu/ , https://www.vaikulinija.lt/vaikams-paaugliams/pagalba-pokalbiais-internetu/ , https://www.vaikulinija.lt/apie-mus/ . Primary.
- F541. **Vaikų linija on exactly this: not your fault, save it, tell someone** (Vaikų linija's page on sent pictures for children and teenagers, 13 October 2024, updated 24 November 2025): „niekas neturi teisės platinti tavo nuotraukų be tavo sutikimo“; if a picture has been shared, „tai ne tavo kaltė“; „Nepasiduok spaudimui atsiųsti daugiau nuotraukų, nekreipk dėmesio į gautus prašymus ar grasinimus.“; „Atvejais, kai asmuo atsisako ištrinti nuotrauką ar grasina ja pasidalyti su kitais, išsisaugok žinutes (pasidaryk ekrano nuotraukas) ir kreipkis pagalbos į teisėsaugos institucijas.“; tell „patikimam suaugusiam“ person; if a site refuses to remove a public picture, „gali kreiptis į policiją arba pranešti apie tai karštąja interneto linija“. It names the foreign tool Take It Down for „vaikų bei paauglių (iki 18 m.)“ pictures (F558). „Ne tavo kaltė" is an NGO's sentence about a picture shared, not a state body's about a blackmailed sender. The page's own vocabulary stays off Suktas. Source: https://www.vaikulinija.lt/vaikams-paaugliams/sekstingas-ir-nudes-ka-svarbu-apie-tai-zinoti/ . Primary.
- F542. **Vaikų linija as trusted flagger: it can go to the platform for the child** (Vaikų linija, „Patikimas pranešėjas", no date): its list of what to report includes „privataus turinio naudojimas šantažui“; „Jei susidūrei su žalingu ar galimai neteisėtu turiniu, gali pranešti mums.“; no promise: „Patikimo pranešėjo funkcija nėra automatinis kitų platformų turinio šalinimas.“. Platforms named: Facebook, YouTube, Discord, Instagram, Snapchat, Reddit, TikTok, X, Telegram. It is the only Lithuanian page found that names blackmail with private content in a report list. Source: https://www.vaikulinija.lt/patikimas-pranesejas/ . Primary.
- F543. **Vaiko teisių linija, the state's line, also for parents** (Valstybės vaiko teisių apsaugos ir įvaikinimo tarnyba, „Atnaujinimo data: 2026-08-11“): 0 800 10800; „Pirmadieniais – šeštadieniais nuo aštuntos iki dvidešimtos valandos.“; „Ji skirta visiems: vaikams, tėvams, pedagogams“; „Konsultacijos vaiko teisių apsaugos klausimais teikiamos nemokamai.“. It does not name this kind of blackmail. Source: https://vaikoteises.lrv.lt/lt/veiklos-sritys/vaiko-teisiu-linija/ . Primary.
- F544. **The police: where to report, and how they tell parents to speak** (Lietuvos policija, both pages 2026-10-20): reports through epolicija.lt, a station or e-mail; „Kai Jums būtina skubioji pagalba, skambinkite trumpuoju numeriu 112.“. To parents of a child bullied online (bullying, not this blackmail by name): „Stenkitės bendrauti nekritikuodami ir nekaltindami, net jei jums atrodo, kad patyčios prasidėjo po vaiko neatsargaus ir neapgalvoto poelgio.“; „Išsaugokite įrodymus“. They do not say whether a child may report without a parent, and no Lithuanian state page found says a blackmailed sender is treated as a victim (see Not found). Sources: https://policija.lrv.lt/lt/dazniausiai-uzduodami-klausimai-1/prasymai-ir-pranesimai-policijai/ , https://policija.lrv.lt/lt/policija-pataria/ . Primary.
- F545. **Lines for those who are not children** (Jaunimo linija and Vilties linija, each page without a date): „Emocinę paramą teikiame jaunimui (16-35 m.).“, „Skambučio laukiame nemokamu telefonu 0 800 28 888“, „laukia kasdien visą parą“. So Jaunimo linija is not a line for a child under 16. Vilties linija: „nemokamu telefonu 116 123“, „emocinės paramos tarnyba suaugusiesiems, teikianti nemokamą, anonimišką emocinę paramą telefonu bei laiškais“. „Linija veikia visą parą, septynias dienas per savaitę“. Sources: https://jaunimolinija.lt/ , https://www.viltieslinija.lt/ . Primary.
- F546. **Švarus internetas: RRT's hotline for what is public** (RRT, svarusinternetas.lt, no dates): „Interneto karštoji linija yra įkurta Lietuvos Respublikos ryšių reguliavimo tarnyboje ( RRT ).“; „Taip, pranešimus galima pateikti anonimiškai.“; „JŪS NEPRIVALOTE PATEIKTI SAVO ASMENS DUOMENŲ.“; for a personal picture online, first the site's administrator, then the hotline: „Jeigu susisiekti su administratoriumi nepavyksta, administratorius atsisako pašalinti turinį“. Its form's categories have no „šantažas“. Sources: https://www.svarusinternetas.lt/apie-mus/6 , https://www.svarusinternetas.lt/pagalba/4 , https://www.svarusinternetas.lt/pranesk/1 . Primary.
- F547. **RRT: a public link it can act on, a private chat it cannot** (Domas Janulis, RRT, in tv3.lt, 2026-10-20): „galima kreiptis į RRT interneto karštąją liniją svarusinternetas.lt“ when anyone can see the picture through a link; „Pranešimą joje galima pateikti ir anonimiškai.“; „RRT negali atidaryti svetimo susirašinėjimo ar iš jo pašalinti žinučių.“, so keep the chat and screenshots and go „su šiais įrodymais kreiptis į policiją“; „Jeigu žmogus nežino, ką daryti, tai gali kreiptis į mus“; on a public picture, „Tarnybos specialistai įvertina pranešimą ir padeda siekti, kad viešai paskelbtas turinys būtų pašalintas.“. Source: https://www.tv3.lt/naujiena/verslas/ispeja-visus-kurie-kelia-nuotraukas-i-interneta-jokiu-budu-nedarykite-1-dalyko-n1548824 . Secondary, an official's words in the press.
- F548. **RRT: reports are few, and there is no wave of AI fakes** (same article): „Esame gavę tik keletą – turbūt ant pirštų telpa – dėl tokio pobūdžio šantažo.“; „Vis dėlto RRT kol kas nefiksuoja tikroviškų intymių DI klastočių bangos.“; „Todėl negalima tvirtinti, kad Lietuvoje jau plinta tokių vaizdų banga.“. This counts reports to RRT about AI fakes, not all such blackmail; few people report at all. Same source.
- F549. **RRT: who it hits and what it runs on** (same article): „intymiomis nuotraukomis šantažuojami ne tik vaikai , bet ir suaugusieji“; „Vienais atvejais reikalaujama daugiau nuotraukų, kitais – pinigų.“; „Šantažuotojas naudojasi žmogaus baime ir gėda“; „Ypač sunku apie tai pasakyti vaikui, jeigu jis bijo tėvų reakcijos arba mano, kad pats dėl visko kaltas.“. Same source.
- F550. **Tauragė, 2024: 8,5 thousand euros** (police via BNS, tv3.lt, 2024-04-24): a man born in 1977 reported being blackmailed by someone met on social networks, who demanded „8,5 tūkst. eurų“. A pre-trial investigation was opened, „dėl disponavimo pornografinio turinio dalykais“; the article does not say against whom and gives no outcome. It is one reason the page promises nothing about how a sender is treated, and it stays off the page. Source: https://www.tv3.lt/naujiena/lietuva/taurageje-vyras-del-santazo-kreipesi-i-policija-n1333413 . Secondary, police via BNS.
- F551. **Šiauliai, 2023: the money and the threat** (police via BNS, tv3.lt, 2023-03-01): one man was told to pay „daugiau kaip 8 tūkstančių eurų“ or be shown to all his social-network friends; he agreed to „2500 eurų“ borrowed from friends, then reported „turto prievartavimą“; the messages were in incorrect Lithuanian, possibly translated by an app. Another man, asked for several thousand and unable to pay, went to the police after the recording was sent to people he knew. So a threat can be carried out. The police's closing line about flirting blames the victim and is not used. Source: https://www.tv3.lt/naujiena/lietuva/intymios-pazintys-internete-siaulieciams-apkarto-susigunde-neteko-pinigu-intymios-nuotraukos-buvo-paviesintos-artimiesiems-n1221243 . Secondary, police via BNS.
- F552. **A court, 2025: it is a crime and those men are its victims** (Šiaulių apylinkės teismas via BNS, Kauno diena, 2025-09-23): sentenced „už turto prievartavimą ir sukčiavimą“ to one year and four months' restriction of liberty; „dėl turto prievartavimo nukentėjo keturi vyrai“; the court upheld 28 victims' claims totalling „12 tūkst. 500 eurų“. A person abroad, posing as a girl, threatened to share with relatives and acquaintances. The court calls these men „nukentėjusieji“. Adults, one case: it does not state a rule for all senders. The offender is not named on our page (`docs/ARCHITECTURE.md` §6). Source: https://kauno.diena.lt/naujienos/kriminalai/nusikaltimai/mergina-apsimetinejes-emigrantas-internete-viliojo-vyrus-ir-tustino-ju-banku-saskaitas-1720977 . Secondary, the court via BNS.
- F553. **Never pay; the police at once** (Marius Pareščius, security expert, 15min „Lengvai", 2026-08-18): „pataria niekada nemokėti pinigų.“; „Nes sukčiai vis tiek gali paviešinti nuotraukas.“; „reikia iškart kreiptis į policiją“. An expert's advice, not a police statement. Source: https://www.15min.lt/lengvai/naujiena/lietuva/ka-daryti-jeigu-sukciai-pavoge-jusu-nuotraukas-1730-2745086 . Secondary.
- F554. **Ukmergė police: a frightened child tells an adult at once** (Ukmergės rajono policija via Kauno diena, 2026-05-20): a child whom someone frightens or angers „turi nedelsdamas pasakyti suaugusiajam“; among the main dangers to talk about, „Prašymai siųsti nuotraukas, ypač asmeninio pobūdžio.“. General online-safety advice, not about this blackmail by name. Source: https://kauno.diena.lt/naujienos/kriminalai/policijos-svarbi-zinia-del-vaiku-saugumo-1757176 . Secondary.
- F555. **More and more; and who it reaches** (LRT, 2022-12-04, NGO speakers, gender-based online violence; the blame line is the head of the association „Lygiai"): „Kai nusiunčia vieną nuotrauką, tuomet šantažuojama ir prašoma vis daugiau nuotraukų.“; „Aukos kaltinimas yra tikrai stiprus, atsiranda gėdos jausmas, baimė“; „smurtą internete patiria ir vyrai bei berniukai“; former partners too: „buvusių partnerių grasina paviešinti“. NGO speakers in the press, not official figures; its percentages are not used. The saved page is `seo4/sx_lrt_10`. Secondary.
- F556. **The mass e-mail that has nothing: only a private firm says so** (ESET Lietuva, a security vendor's press release, no date): „platinami sukčių el. laiškai tėra bandymas šantažuoti neturint jokios privačios informacijos apie vartotojus.“; „jokiu būdu nepulkite mokėti išpirkos“; „neatrašyti į tokius el. laiškus“; if a password is quoted, „kuo skubiau jį pasikeiskite“. The same text says real cases happen rarely, and it sells antivirus. No NKSC, RRT or police page was found saying this; on our page it is attributed and undated. Source: https://www.eset.com/lt/apie/naujienos/straipsniai/pranesimai-spaudai/sukciai-vel-emesi-pornografijos-megeju-santazo/ . Secondary.
- F557. **The Criminal Code, art. 181, read at a mirror only** (lrvalstybe.lt, whose notes stop at 2007; e-seimas.lrs.lt answered 403): forcing someone to hand over property by threatening to publish compromising information, up to „laisvės atėmimu iki šešerių metų“. Not checked against the current text. Art. 162 and later laws were not obtained. Say „a crime" through F552 and leave the penalty off the page. Saved as `a-bk181`. Secondary.
- F558. **FOREIGN: NCMEC and the removal tools** (NCMEC, USA, no dates; StopNCII.org, UK charity, no date): „Remember, the blackmailer is to blame, not you. Even if you made a choice you regret, what they are doing is a crime.“; „it may feel overwhelming or like there is no way out, but there is hope“; „Cooperating or paying rarely stops the blackmail.“; „BLOCK the suspect but DO NOT DELETE your profile or messages“. Take It Down, for pictures of those under 18, works by a fingerprint on participating platforms; takeitdown.ncmec.org itself answered 403, so it was not read and whether it works from Lithuania is known only through Vaikų linija recommending it (F541). StopNCII is for those over 18: „cannot remove images from the whole internet“. Foreign, marked foreign on the page. Sources: https://www.missingkids.org/theissues/sextortion , https://www.missingkids.org/gethelpnow/isyourexplicitcontentoutthere , https://stopncii.org/ . Primary for their own tools.
- F559. **FOREIGN: UK National Crime Agency** (NCA, 29 April 2024, the page now marked „Expired“): „you are not to blame and help and support is available“; „there is no guarantee that this will stop the threats“; „once you have shown you can pay, they will likely ask for more“; „If you have paid, don’t panic but don’t pay anything more.“; to parents, „stop all communication with the offender“, „Avoid deleting anything“; „a large proportion of cases have involved male victims aged between 14-18“. UK figures and a UK route, which say nothing about Lithuania. Source: https://www.nationalcrimeagency.gov.uk/news/nca-issues-urgent-warning-about-sextortion . Primary, foreign.

**Not used:** the tv3 article's passages on how AI fakes are made, what photo serves them and which sites offer it (the page must not teach it); the sexual detail in F551, the suicide figures in F555 and the case of the child offered earnings on Telegram, which has no age and no outcome; the UK's Report Remove (UK only); the name of the man in F552.

**Not found:** any Lithuanian state page saying a person who sent a picture of themselves and is then blackmailed is treated as a victim and not punished (the nearest are F541, an NGO; F544, on bullying; F552, one court on adults; the plain statements are foreign, F558 and F559), so the page may not promise what the police will do. Whether a child may report to the police without a parent. A recent Lithuanian police figure for this blackmail. Any Lithuanian official source on the mass-mail bluff. Tėvų linija: its site did not answer on 2026-11-04, so it is not named. Blocked, reported and not got around: paslaugos.epolicija.lt (403), e-seimas.lrs.lt and www3.lrs.lt (403), takeitdown.ncmec.org (403), childline.org.uk (403), fbi.gov's page (403); NCA's crime-threats page (404). Platform help pages were not fetched.

**B43. A loan taken in your name, and Lietuvos bankas's free list** (read by Opus on 2026-11-04 from the raw text of each page; found by Sonnet research agents the same day). Raw pages: `%TEMP%\seo5\cr_*`, `%TEMP%\kurj\pk-*`, `%TEMP%\paskola\p-*`, `%TEMP%\kreditas\l-*`, `%TEMP%\teisine\tp-*`; every quote below was matched against them by script. The text layers of the three PDFs (F571, F577, F578) have lost most Lithuanian letters: their quotes have the letters restored by hand and were compared with those letters folded, so the spelling of the restored letters is ours.

- F560. **The list: what it does** (Lietuvos bankas, „STOP vartojimo kreditams“, updated 2024-09-17): „Į sąrašą įrašytam asmeniui negali būti suteiktas vartojimo kreditas.“; „Kreditoriai, prieš sudarydami vartojimo kredito sutartį, visada privalo patikrinti, ar asmens nėra sąraše.“; „Su į sąrašą įrašytu asmeniu sudaryta vartojimo kredito sutartis laikoma negaliojančia.“ It offers the list also „prevenciniais tikslais, siekiant, kad kiti asmenys nepaimtų kreditų jūsų vardu“. Does not say how long after filing the entry takes effect. Source: https://www.lb.lt/lt/stop-vartojimo-kreditams . Primary. The law keeps the list from 2026-11-20 (F584); this page is dated 2024, so re-read it after that date for how to join.
- F561. **How to join** (the same page; Lietuvos bankas, 2024-06-10): online, „prisijungę per“ „elektroninius valdžios vartus“; „Tiesiogiai atvykę į Lietuvos banką adresu Totorių g. 4, Vilnius“; „Atsiuntę registruotu laišku“, with an ID copy „patvirtintas notarinius veiksmus turinčio teisę atlikti asmens“; by e-mail with copies „patvirtintas kvalifikuotu elektroniniu parašu“. „Paprasčiausias būdas įsirašyti į šį sąrašą – elektroniniu būdu prisijungus per elektroninius valdžios vartus.“ Sources: https://www.lb.lt/lt/stop-vartojimo-kreditams ; https://www.lb.lt/lt/naujienos/naujas-sukciavimo-budas-nugvelbe-tapatybes-duomenis-sukciai-zmoniu-vardu-taikosi-paimti-vartojimo-kreditus . Primary.
- F562. **Free, for how long, leaving, the credit history** (the same page, updated 2024-09-17): „Įsirašymas į sąrašą bei išsibraukimas iš jo yra nemokamas.“; „Įsirašymo į sąrašą laikotarpis nėra ribojamas.“; „Laikotarpio nenurodžius, asmuo įrašomas 2 metams.“; „Įsirašymo laikotarpį galima bet kada pratęsti.“; „Išsibraukti iš sąrašo galima bet kada, tokiu pačiu būdu, kaip ir įsirašėte.“; „Įsirašymas į sąrašą neturi ir neturės įtakos asmens kreditingumo istorijai.“ Source: https://www.lb.lt/lt/stop-vartojimo-kreditams . Primary.
- F563. **What the list does not cover** (the same page; 15min, 2025-09-28, quoting Lietuvos bankas): „Sąrašą būtina tikrinti tik sudarant sutartis dėl vartojimo kredito (įskaitant lizingą, kredito korteles ir pan.).“; „Sąrašo nereikia tikrinti, kai sutartis sudaroma dėl būsto kredito.“; „Įsirašymas į sąrašą nedaro įtakos jau sudarytų vartojimo kredito sutarčių vykdymui.“; „Sąrašas galioja tik Lietuvoje, kitose šalyse jis negalioja.“ And in 2025: „paskolos viršijančios 75 tūkst. eurų ribą nebelaikomos vartojimo kreditais pagal įstatymą“; the law's own figure, and its change on 2026-11-20: F584. Sources: https://www.lb.lt/lt/stop-vartojimo-kreditams ; F566's. Primary; the limit secondary.
- F564. **Fines, and the list as a security measure** (Lietuvos bankas, 2016-10-28): „sutartis bus laikoma negaliojančia, o kreditą suteikusiai bendrovei grės baudos“; it may be used for safety, for example „kad, pametus asmens dokumentą, kiti asmenys nepaimtų vartojimo kreditų jų vardu“. Old; the fine is not restated on the page of 2024. Source: https://www.lb.lt/lt/naujienos/negalintiems-suvaldyti-noro-skolintis-nemokama-apsauga-1 . Primary.
- F565. **Lietuvos bankas's warning** (Lietuvos bankas, 2024-06-10): „Sukčiai gyventojui el. laišku arba trumpąja SMS žinute atsiųsdavo nuorodą“; on the page that opened, the person typed Smart-ID or Mobile-ID codes: „Taip pats to nežinodamas gyventojas iš tikrųjų patvirtindavo paraišką vartojimo kreditui gauti arba pasirašydavo vartojimo kredito sutartį.“; the person learns „tik sulaukęs kreditoriaus pranešimo apie pradelstą mokėjimą“; „sukčiai taikosi į vienišus Lietuvos gyventojus“ of or near pension age; on that day „sąraše yra 2 257 žmonės.“ A 2024 figure, and those people are not all victims. Does not say how many complaints. Source: https://www.lb.lt/lt/naujienos/naujas-sukciavimo-budas-nugvelbe-tapatybes-duomenis-sukciai-zmoniu-vardu-taikosi-paimti-vartojimo-kreditus . Primary.
- F566. **A 92 362 euro report, and the lender's duty** (police and Lietuvos bankas via 15min, 2025-09-28): in Panevėžio r., a woman born in 1986, „pasinaudojusi jos duomenimis, galėjo paimti net 92 362 eurų paskolą“ in the name of a woman born in 1957; „Pradėtas ikiteisminis tyrimas, aiškinamės aplinkybes“; Lietuvos bankas: „finansų rinkos dalyviai privalo įsitikinti, kad finansines paslaugas teikia tam asmeniui, kuris jų prašo“. No outcome, and it is not known how the loan was signed. Source: https://www.15min.lt/verslas/naujiena/finansai/paeme-92-tukst-euru-paskola-svetimu-vardu-ekspertai-atsake-ar-tai-imanoma-662-2529716 . Secondary.
- F567. **Data alone is not enough, says a credit bureau** (Creditinfo in a press release via 15min, 2026-05-28, after the Registrų centras incident, F105): „Bent trečdalis šios savaitės pradžioje priimtų skambučių buvo susiję su klausimais apie asmens duomenų apsaugą.“; „vien asmens duomenų finansiniam įsipareigojimui ar paskolai gauti nepakanka“; „sukurti tikroviškų sukčiavimo scenarijų“; „netikėta užklausa iš įstaigos, į kurią nesikreipėte, gali būti ženklas“, which means a lookup seen in the firm's paid report of who checked your data, so it is not a sign the reader would see and stays off the page. A firm that sells credit reports, in its own release; no state body said the same after this leak (Not found). Source: https://www.15min.lt/verslas/naujiena/finansai/po-registru-centro-incidento-isauges-gyventoju-nerimas-baiminamasi-paskolu-svetimu-vardu-662-2692850 . Secondary.
- F568. **Banks, and the word „never“** (Lietuvos bankų asociacija, 2021-02-17; Jekaterina Govina, Lietuvos bankas, via 15min, the same day): in banks operating in Lithuania „nėra galima situacija, kai žinant asmens vardą, pavardę, asmens kodą ar vairuotojo pažymėjimo duomenis būtų galima paimti kreditą“; „Negaliu sakyti, kad neįmanoma, bet tikimybė labai maža.“ The association speaks for banks only and says nothing of other lenders; both are from 2021. Sources: https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/nutekinti-asmens-duomenys-kaip-sumazinti-rizikas-ir-apsisaugoti-nuo-sukciu ; https://www.15min.lt/verslas/naujiena/bendroves/ekspertai-ramina-pavogtu-citybee-duomenu-nepakanka-svetimu-vardu-pasiimti-greituju-kreditu-gresmiu-neizvalgia-ir-regitra-663-1457110 . The first primary, the second secondary.
- F569. **How a remote loan is signed, and whom to contact** (tv3.lt, 2024-11-11, quoting Lietuvos bankų asociacija and SB lizingas's Mindaugas Valančius): a reader's elderly relative was told by a supposed bank employee: „susisiekė neva banko darbuotojas, kuris pranešė, kad jo vardu bendrovėje „SB lizingas“ yra paimta paskola“; he went to the police; no sum and no outcome. „Pasirašoma kvalifikuota priemone, tokia kaip Smart-ID, Mobile-ID ir kt.“; „žmogus turėtų nedelsiant kreiptis į mus ir būtinai į teisėsaugą dėl neteisėto jo asmens duomenų panaudojimo“; „Kiekvieną atvejį nagrinėjame ir vertiname individualiai“; „jeigu asmuo įtaria, kad jo vardu bandoma pasiskolinti pinigų, turėtų nedelsiant kreiptis bendruoju kredito įstaigos numeriu“; „nevestų savo Smart-ID ar Mobile-ID PIN kodų jei neinicijavo“; „jei asmuo yra praradęs asmens dokumentą ar prisijungimo duomenis prie elektroninės bankininkystės ir apie tai nėra pranešęs atsakingoms institucijoms, egzistuoja rizika“. Source: https://www.tv3.lt/naujiena/verslas/ne-tik-istustina-saskaita-bet-jau-paima-ir-paskolas-svetimu-vardu-ispeja-kiekviena-n1375683 . Secondary.
- F570. **The fake job** (Citadele, a bank's press release via 15min, 2026-07-10): „netikėta žinia apie jų vardu paimtą paskolą“; people were employed on paper; „įmonę valdęs asmuo buvo gavęs prieigą prie darbuotojų elektroninės bankininkystės duomenų“ and „jis darbuotojų vardu ėmė paskolas“. Romas Čereška: „Sukčiams dingus, visa atsakomybė už skolą tenka tam asmeniui, kurio vardu ji buvo paimta“; „Teisėtai veikiančiai įmonei tokia informacija nėra reikalinga.“; „patikimas darbdavys neprašo darbuotojo nei skolintis, nei pervesti pinigų, nei atskleisti elektroninės bankininkystės prisijungimų“; first „kuo greičiau susisiekti su savo banku“; one of the commonest mistakes is „delsimas veikti dėl gėdos ar vilties“. A bank's line on who pays, not a court's; no amount and no case number. Source: https://www.15min.lt/verslas/naujiena/finansai/is-pradziu-svajoniu-darbas-veliau-paskola-savo-vardu-kaip-veikia-nauja-sukciu-schema-662-2721538 . Secondary.
- F571. **One decision on a loan the person was tricked into signing** (Lietuvos bankas, decision No. 242-65 of 2020-02-12, case 2019-02175): after a Facebook job post she gave her data and typed a recognition code; „mobiliuoju kvalifikuotu elektroniniu parašu buvo pasirašyta Vartojimo kredito sutartis“ on 2019-10-15; the lender „suteikė pareiškėjai 1 900 Eur vartojimo kreditą“, and she forwarded the money to a third person; she learned when the lender phoned on 2019-10-17. The contract was signed with „galiojančiu kvalifikuotu elektroniniu parašu“ (raw PDF text has lost letters, matched folded). No data that the lender „žinojo arba galėjo žinoti apie apgaule sudaromą sutartį“; she „elgėsi itin neapdairiai ir neatsargiai“; „vartojimo kredito davėjos reikalavimas vykdyti ginčijamą sutartį yra pagrįstas ir nėra pagrindo laikyti sutartį negaliojančia pareiškėjos kreipimesi nurodytais pagrindais“; „Pareiškėja žalą galimai patyrė dėl trečiųjų asmenų neteisėtų veiksmų“; „Atmesti pareiškėjos Y. Y. reikalavimus.“; „Lietuvos banko sprendimas dėl ginčo esmės yra rekomendacinio pobūdžio ir teismui neskundžiamas.“ The right to go to court remains. The lender said that if she refused its offer to take back the 1 900 euros within two months, debt collection „nebus stabdomi“. One old decision, not a court ruling, and it covers only a person who confirmed the contract herself. Source: https://www.lb.lt/lt/frd-gincai-su-vartotojais/view_dispute?id=4739 . Primary.
- F572. **Lietuvos bankas on the same case** (Lietuvos bankas, 2020-02-20): the lender „sutiko atleisti tik nuo palūkanų ir administravimo mokesčių mokėjimo“, and asked for the 1 900 euros back; Lietuvos bankas „nusprendė netenkinti pareiškėjos reikalavimo pripažinti sudarytą vartojimo sutartį negaliojančia“, and „patarė ginti savo interesus pareiškiant civilinį ieškinį“ in the pre-trial investigation. Source: https://www.lb.lt/lt/naujienos/gincu-nagrinejimas-asmens-duomenis-sukciams-patikejusi-moteris-tapo-skolininke . Primary.
- F573. **A phone and Smart-ID lent to an acquaintance** (Policijos departamentas via LRT, 2025-04-10): „Pažįstamam telefoną ir SMART ID kodų prisijungimus davęs vilnietis buvo apgautas“; „jo vardu buvo paimtos ir išgrynintos 22,6 tūkst. eurų paskolos“; „Nuostolis – 22 650 eurų, pranešė Policijos departamentas.“ No outcome; does not say who repays. Source: https://www.lrt.lt/naujienos/lietuvoje/2/2533414/telefona-ir-smart-id-kodu-prisijungimus-atidaves-vilnietis-prarado-22-6-tukst-euru . Secondary.
- F574. **The closest case to a loan the person never touched** (15min, 2018-10-20): a clerk at Lietuvos paštas, „pasinaudojusi jos asmens duomenimis, pasiėmė 1450 eurų dydžio greitąjį kreditą“; the customer „iš kreditų bendrovės gavo laišką apie nemokamas įmokas“ and went to the law; „Pati nukentėjusioji jokio žalos atlyginimo neprašė“, and the convicted clerk was to repay the lender. Old and one case; says nothing general about who pays, and how the loan was signed is not on the page we use. The clerk is not named here. Source: https://www.15min.lt/naujiena/aktualu/nusikaltimaiirnelaimes/skandalas-lietuvos-paste-kliento-duomenis-pasisavinusi-darbuotoja-pasieme-greitaji-kredita-59-1046756 . Secondary.
- F575. **Seeing your own loans, free** (Lietuvos bankas, Paskolų rizikos duomenų bazė, updated 2026-02-23): „Fiziniai ir juridiniai asmenys turi teisę nemokamai susipažinti su PRDB tvarkomais jų įsipareigojimų duomenimis.“; „Prisijungti galite per portalą „Elektroninės valdžios vartai““; or „Užpildykite ir pateikite nustatytos formos prašymą“. Data come from banks and their leasing firms, foreign branches, credit unions, listed consumer lenders and P2P operators. Says nothing on how quickly an entry appears. Source: https://www.lb.lt/lt/paskolu-rizikos-duomenu-baze . Primary.
- F576. **A copy from the credit bureau** (Creditinfo, Mano Creditinfo FAQ, no date): „Fiziniai asmenys turi teisę gauti asmens duomenų, kuriuos kredito biuras apie juos turi, kopiją (kredito istorijos ataskaitą).“; „arba pateik prašymą susipažinti su savo asmens duomenimis“; registered users: „tau nemokamai suteikiama pasikeitimų stebėjimo paslauga“. The price of the copy is not stated, so the page does not call it free. The firm sells other reports: no paid product is recommended. Source: https://www.manocreditinfo.lt/klausimai . Primary for itself.
- F577. **The signs and the steps, by the data protection inspectorate** (VDAI, 2025-12-17): „Kreipėtės dėl paskolų, išmokų, bet jums atsakoma, kad jūs jau kreipėtės šiais klausimais, nors“ you have not; „Gaunate laiškus ar pranešimus dėl skolų apmokėjimo, nors nesate įsiskolinę“; „Stebėti savo kredito istorijos ataskaitą“; „Informuoti policiją ir kitas atitinkamas institucijas apie prarastus ar pavogtus dokumentus“; „Informuoti banką, finansų įstaigas apie neįprastus sandorius ir operacijas“. Nothing on disputing a loan or who pays. Source: https://vdai.lrv.lt/public/canonical/1767943031/1223/2025_12_17_DUK%20Tapatybes%20vagyste.pdf . Primary.
- F578. **The police, when a loan was taken** (NKSC, „Tapatybės vagystė“, 2020-07-31): go to the police if „Buvo paimtas greitasis kreditas jūsų vardu“. Source: https://www.nksc.lt/doc/biuleteniai/2020_07_31_NKSC_Tapatybes_vagystes.pdf . Primary; 2020.
- F579. **The order of complaint** (Lietuvos bankas, „Spręsk pats“, updated 2024-07-05): „jeigu turi nusiskundimų dėl finansinių paslaugų, kreipkis į savo finansų įstaigą, o jeigu ši neatsako arba atsakymas tavęs netenkina, – į Lietuvos banką su skundu ar ginču.“ Source: https://www.lb.lt/lt/spresk-pats-gincai . Primary.
- F580. **After falling for it** (Lietuvos bankas, „Pakliuvau sukčiams“, updated 2026-07-30): „nutraukite su jais bet kokį bendravimą ir nedelsdami kreipkitės į savo mokėjimo paslaugų teikėją“; „Informuokite Lietuvos policiją“. Written for stolen payments, not loans. Source: https://www.lb.lt/lt/pakliuvau-sukciams-ka-daryti . Primary.
- F581. **New rules on 2026-11-20** (Lietuvos bankas, 2026-07-16; 2026-02-25): changes „kurie įsigalios 2026 m. lapkričio 20 d.“; the notice lists the rule changes and does not mention the list. A proposal of February: „įpareigojimas nesudaryti sutarties arba sustabdyti kredito išmokėjimą, jeigu yra pagrindo įtarti sukčiavimą“, with „dalis jų įsigaliotų 2026 m., o dalis – 2027 m. lapkritį“. A draft, not law. The list itself: F584. Off the page since that check. Sources: https://www.lb.lt/lt/naujienos/lietuvos-banko-valdyba-patvirtino-vartojimo-kredito-reguliavimo-pakeitimus ; https://www.lb.lt/lt/naujienos/stiprinama-kova-su-finansiniu-sukciavimu . Primary.
- F582. **A lost ID** (Migracijos departamentas, 2022-12-14): „apie prarastą asmens dokumentą pilietis ir toliau galės pranešti naudodamasis MIGRIS sistema“. No source says this stops a loan. Source: https://migracija.lrv.lt/lt/naujienos/lietuvos-pilieciams-lengvinama-antro-asmens-dokumento-uzsakymo-tvarka/ . Primary.
- F583. **The request you did not start** (Luminor via 15min, 2026-05-28, after the Registrų centras incident): „Jei netikėtai gaunate „Smart-ID“, mobiliojo parašo ar kitą autentifikavimo užklausą – netvirtinkite jos.“; scammers say „jūsų duomenys pateko į nutekėjusių sąrašą, todėl būtina „patvirtinti tapatybę““. Source: https://www.15min.lt/verslas/naujiena/finansai/nutekejo-registru-centro-duomenys-ka-sukciai-gali-nuveikti-su-jusu-adresu-ir-asmens-kodu-662-2692808 . Secondary.
- F584. **The list in the law, before and after 2026-11-20** (Vartojimo kredito įstatymas Nr. XI-1253 on e-tar, read 2026-11-04: the edition in force until 2026-11-19, art. 21¹; the new edition, „Suvestinė redakcija nuo 2026-11-20“, Nr. XV-822 of 2026-04-16, art. 35). The list stays. Compared by script, parts 1 to 6 of the article differ by two words of grammar only (nurodytas / nurodomas, nėra įrašytas / yra įrašytas); part 7 read by eye, the same. In both: „Kiekvienas fizinis asmuo (toliau šiame straipsnyje – asmuo) turi teisę priežiūros institucijai pateikti prašymą neleisti jam sudaryti vartojimo kredito sutarčių“; „pateikęs asmuo nedelsiant įrašomas“; „laikoma, kad šis terminas yra 2 metai nuo asmens įrašymo į Sąrašą dienos“; „Vartojimo kredito davėjams ir vartojimo kredito tarpininkams draudžiama sudaryti vartojimo kredito sutartį su įrašytu į Sąrašą asmeniu.“; „atliekama sprendimo dėl vartojimo kredito suteikimo priėmimo momentu“; „Vartojimo kredito sutartis, sudaryta su į Sąrašą įrašytu asmeniu, laikoma negaliojančia.“ When the term ends, „asmuo, kuriam neleidžiama sudaryti minėtų sutarčių, išbraukiamas iš Sąrašo.“ The law leaves out credit „kai bendra suteikiamo kredito suma yra didesnė negu 75 000 eurų“ until 2026-11-19 and „didesnė negu 100 000 eurų“ from 2026-11-20, each with exceptions, so the page says „paprastai“. It gives no number of hours. How to file is left to Lietuvos bankas, whose rules for it were not read, so its page (F561) gets a re-read after 2026-11-20. Sources: https://www.e-tar.lt/rs/actualedition/TAR.3E5A0E0D14C8/unbvMnRcBP/ ; https://www.e-tar.lt/rs/actualedition/TAR.3E5A0E0D14C8/tDKzgaoDoR/ . Primary. e-seimas answered with a bot challenge and was not got around; e-tar carries the same act.
- F585. **Free legal help** (Lithuania's page on the EU's e-Justice portal, updated 2025-08-01): „Pirminę teisinę pagalbą galima gauti bet kurioje Lietuvos savivaldybėje.“; citizens of Lithuania and the EU and legal residents „gali pasinaudoti nemokama vienos valandos konsultacija, rūpimu klausimu, neatsižvelgiant į turtinę padėtį“; it also covers „prieštaravimus dėl kreditoriaus pateikto pareiškimo“; secondary aid includes „advokato gynyba arba atstovavimas bylose“, and whatever their means „nemokamai antrinę teisinę pagalbą gali gauti, pavyzdžiui, nukentėjusieji nuo nusikalstamų veikų“. It can be refused, for instance when a claim is plainly unfounded; the Valstybės garantuojamos teisinės pagalbos tarnyba decides on secondary aid. Nothing here is about loans in particular. Which victims: F587. Source: https://e-justice.europa.eu/topics/taking-legal-action/legal-aid/lt_lt . Official; raw page in `%TEMP%\teisine\tp-ej.html`.
- F586. **A court order: 20 days to object** (Lithuania's page on the EU's e-Justice portal, „Europos mokėjimo įsakymas“, updated 2019-10-21; the Code of Civil Procedure art. 439 as copied on lrvalstybe.lt, no date, the same words but for „šioje dalyje“ in the third quote): „Skolininko prieštaravimai dėl kreditoriaus pareiškimo turi būti pateikti raštu per dvidešimt dienų nuo pranešimo apie teismo įsakymo išdavimą įteikimo skolininkui dienos.“; the objection need not give a reason: „išskyrus reikalavimą nurodyti prieštaravimų pagrindą“; „Jeigu dėl svarbių priežasčių skolininkas prieštaravimus pareiškė pasibaigus nurodytam terminui, skolininko prašymu teismas terminą prieštaravimams pareikšti gali atnaujinti.“; it goes to the court that issued the order: „skolininkas pateikia teismo įsakymą išdavusiam teismui“; „Teismo įsakymas įsiteisėja, jeigu per dvidešimt dienų skolininkas nepareiškia prieštaravimų dėl kreditoriaus pareiškimo.“ The official consolidated code was not read; the two copies agree. Nothing here is about loans in particular. Sources: https://e-justice.europa.eu/pdf-export/1365_lt ; https://lrvalstybe.lt/istatymai/straipsnis/439-straipsnis-skolininko-priestaravimai . Official page and a secondary copy; raw pages `%TEMP%\teisine\tp-1365.pdf.txt`, `tp-439.html.txt`.
- F587. **Which victims get a free lawyer whatever their means** (Lithuania's page on the EU's e-Justice portal, „Išlaidos“, updated 2023-04-07), listing art. 12 of the legal aid law: „nukentėjusieji dėl nusikaltimų atsiradusios žalos atlyginimo bylose, įskaitant atvejus, kai žalos atlyginimo klausimas yra sprendžiamas baudžiamojoje byloje“. Narrower than F585's example: these are cases about damage, so it does not say a victim gets a lawyer against a lender's claim. Art. 12 itself was not read. Source: https://e-justice.europa.eu/topics/taking-legal-action/where-and-how/costs/lt_lt . Official; raw page `%TEMP%\teisine\tp-costs.html.txt`.

**Not used:** F576, off the page since the second reader: the free route is Lietuvos bankas's database, and the firm sells reports; the banks' association's 2021 line in F568, cut for length; VVTAT as the place to complain about a lender (NKSC, 2020), since Lietuvos bankas's page of 2024 and F571 send financial disputes to the bank; NKSC's line on one free report a year, which reads as translated from a foreign text; Creditinfo's paid identity product, which the banks' association recommended in 2021, and Verito's release, because the move stays the free list; the count of 667 on the list in 2020, and nearly 2 million lender queries in 2019 (Lietuvos bankas, 2020-08-12), old; the fines in F564, not restated since 2016; the tv3 report of 2026-06-08 on about 0.5 million people possibly affected, since F105 already carries the leak; epolicija's notices section; reports seen only as search snippets (Šiauliai, Utena, Klaipėda, a 19-year-old in Panevėžys, Rokiškis), never read.

**Not found:** who pays for a loan the person never confirmed: no court ruling and no Lietuvos bankas decision was found (F571 covers only the tricked case; F574 is one conviction), so the page promises nothing; how many hours after filing the entry takes effect (the law says only „nedelsiant“, F584); how fast a new loan appears in PRDB; any official statement after the 2026 leak that a personal code and address are not enough (only Creditinfo, F567); a count of loans taken in other people's names; a count on the list later than 2024.

## B44. The fortune teller who keeps asking for more (`/scenarijai/bureja-praso-dar/`), read 2026-11-04

Raw pages are `%TEMP%/kurj/bu-<name>.html` and `.txt`; every quote below was matched in the saved text by a script. People's names and initials in the sources stay off the page. No Lithuanian official prevention page on this was found, so the move is ours and carries `M`. The nearest official word is the police line in F597.

- F590. **A profile, a false name, a contract that promised money back** (tv3.lt retelling a court record, 2022-06-21): „Laikotarpiu nuo 2015 m. gruodžio 1 d. iki 2019 m. spalio 31 d.“, a Facebook profile; „Moteris anketoje melagingai prisistatė būrėja“ (the initial cut here); part of the money was to buy religious goods „kuri vėliau bus grąžinta nukentėjusiajai“, and she even prepared a contract; „Pinigai, kurie aukojami vaikams, turėjo būti grąžintini 100 procentų“. Two women, 145 and 26 tūkst. eurų, 171 tūkst. in all. The accused denied guilt. On appeal: „pats įkalinimo terminas buvo sutrumpintas iki 3 metų, o tada bausmės vykdymas atidėtas trejiems metams“, and, in the first year, at least 6 tūkst. eurų to one victim and at least 20 tūkst. to the other; the first instance had awarded the whole „26 tūkst. ir 145 tūkst.“ (both kept off the page, as too hope-raising). Says nothing on whether the money came back. Source: https://www.tv3.lt/naujiena/lietuva/dvi-lietuves-burejai-uz-stebuklingas-zvakes-atidave-171-tukst-euru-tikejo-pazadais-kad-viskas-susitvarkys-n1174216 Secondary, retelling a court.
- F591. **It was not enough** (same page): „Pirmą kartą sumokėjus pinigus buvo pasakyta, kad neužteko, esą „uždėtas daug stipresnis prakeiksmas“, todėl reikia „valyti“ dar, nes kitaip vaikams bus blogai.“ One victim's testimony as the court heard it.
- F592. **Fear, secret payments, loans, threats on stopping** (same page): „nukentėjusioji buvo tikrai išsigandusi, todėl pradėjo slapta mokėti, nes tuo tikėjo, net pradėjo imti paskolas.“; „rašė, kad ir namas gali sudegti, vaikelio neturės ant rankų, jei neperves pinigų.“; „145 tūkst. eurų per maždaug pusantrų metų“; „Nukentėjusioji skolinosi tiek iš savo, tiek iš sutuoktinio artimųjų.“; she stopped „nes nebeturėjo iš kur pasiskolinti“, and then „pradėjo rašyti grasinančias žinutes“, „Vėliau prasidėjo grasinimai, kad vyras paklius į avariją.“ Two victims: the secret payments and the first loans are the woman who lost 26 tūkst.; the 145 tūkst., the borrowing from relatives, stopping for lack of lenders and the threats after it are the other. The secrecy here was her own fear; F606 has it demanded.
- F593. **A court's own account: death threats, goods on credit, all promised back** (teismai.lt, a court's press release, 2015-10-29): she read „padėką būrėjai“ in a local paper; „tam reikia atversti „gyvenimo knygą“, bet tai, esą, kainuoja pinigus. Tiesa, ji pati nežino, kiek pinigų reikės“; „to nepadarius, mirs ji pati ir pradės žūti jos artimiausi žmonės.“; „nukentėjusioji atgaus visus pinigus, daiktus ir visos bėdos susitvarkys.“; „sudarydama vartojimo kredito sutartis, įsigijo kaltinamosios išrinktus didelės vertės telefonus, nešiojamus kompiuterius, fotoaparatą.“; „nuteista laisvės atėmimu 3 metams 6 mėnesiams“, and „priteista 29 345,93 Eur turtinei ir 1000 Eur neturtinei“ harm. Could still be appealed on that date; says nothing on whether it was paid. Source: https://www.teismai.lt/lt/naujienos/teismu-pranesimai-spaudai/nuteista-bureja-teigusi-galinti-isvaryti-velnia-bei-pagydyti-nuo-negalios/2859 Primary. Old: date it.
- F594. **A curse that reaches relatives, and relatives who pushed** (tv3.lt, 2014-02-26; a mocking article, the facts only): „Tas prakeikimas toks galingas, kad jis palies ne tik tave, bet ir tavo gimines“; „Keturi prakeiksmo nuėmimo mėnesiai vilnietei kainavo apie 36 000 litų.“; „Ir tik, kai giminės sužinojo, kad moteris paėmusi kreditus atiduoda juos būrėjai, pareikalavo, kad ši kreiptųsi į policiją.“ Source: https://www.tv3.lt/naujiena/lietuva/uzkeiktos-moterys-neteko-dar-ir-pinigu-n777828 Secondary. Old: date it, and it is in litas.
- F595. **Small sums that grow; cash to be cleaned** (Lietuvos policija, 2021-02-01; the same text on 15min): „imta reikalauti atlygio nedidelėmis sumomis, kurios laikui bėgant vis didėjo.“; „taip pat atiduodavo ir grynuosius, kuriuos, kaip buvo patikinta, būrėja „išvalys ir įkraus geros energijos“.“; „Iš viso moteris būrėjai atidavė apie 25 000 eurų.“ The police text is a report of an investigation, not a verdict. Source: https://policija.lrv.lt/lt/naujienos/vietoje-pazadetos-sekmes-isviliotos-kelios-desimtys-tukstanciu-euru/ Primary. 15min's copy is not a second source.
- F596. **Nothing asked at first, then sums, never returned** (same page): „ieškodama pagalbos dėl nelaimingų santykių, prastos sveikatos ir turtinių klausimų“; „Iš pradžių už asmenines konsultacijas ir pagalbą jokio piniginio atlygio neprašiusi moteris palaipsniui ėmė įvardinti pinigų sumas, kurias taip pat ketinta „įkrauti gera energija“, o vėliau grąžinti.“; „Per kelis mėnesius moteris būrėjai atidavė apie 32 000 eurų, kurie, priešingai nei buvo tikinta, sugrąžinti nebuvo.“ Criminal Code 182(2), up to eight years.
- F597. **The one police line, and how the money went** (Ukmergė, 2023-03-02; 15min and Kauno diena from the police): „Net sunkiomis gyvenimo akimirkomis išlaikykite budrumą! Būrėjai gyvenimo problemų neišsprendžia“, then „Jeigu nukentėjote nuo sukčių, kreipkitės www.epolicija.lt arba telefono numeriu 112.“ (Kauno diena only); met on Facebook; „per tris mėnesius – gruodį, sausį ir vasarį – „būrėja“ iš moters išviliojo 25 277 eurų.“; „Nukentėjusioji pervedė pinigus per banką, atliko pašto perlaidas, pirko ir siuntė auksinius gaminius.“ (15min). The police line is a general remark, not a study. Sources: https://kauno.diena.lt/naujienos/kriminalai/nusikaltimai/bureja-prisistaciusi-moteris-nesismulkino-uz-ivairius-ritualus-isviliojo-25-tukst-euru-1115952 , https://www.15min.lt/naujiena/aktualu/nusikaltimaiirnelaimes/nesekminga-internetine-pazintis-ukmergiske-prarado-virs-25-tukst-euru-59-2016680 Secondary, from the police.
- F598. **Jewellery to have a curse lifted** (respublika.lt, 2022-06-09, from a court): „ji nuims prakeiksmą nuo pinigų ir papuošalų, kuriuos vėliau grąžins.“; gold jewellery „įkainuotus 4 tūkst. eurų“. Source: https://www.respublika.lt/lt/naujienos/lietuva/nusikaltimai_ir_nelaimes/mergina-ispirko-nuodemes---uz-prakeiksmo-nuemima-atidave-mamos-papuosalus/ Secondary.
- F599. **FOREIGN: the follow-up message** (Canadian Anti-Fraud Centre, modified 2026-01-16; about mail and letters from abroad): „After you pay the initial fee, the fraudster sends a follow-up message. They state that your name will be sent to collections if you don't send more payments, or they'll place a curse on you.“ Source: https://antifraudcentre-centreantifraude.ca/scams-fraudes/psychic-voyance-eng.htm Primary, foreign: says nothing about Lithuania, and never to read as local.
- F600. **171 089 Eur, Klaipėda** (LRT, 2025-12-18, from the police): a woman born in 1950, Facebook, from 1 August; „Prisistatęs būrėju ir gydomųjų ritualų ekspertu, apgaulės būdu išviliojo 171 tūkst. 089 eurų.“; „Tai viena didžiausių šiemet sukčių iš Lietuvos gyventojų išviliotų sumų.“ Source: https://www.lrt.lt/naujienos/lietuvoje/2/2779031/bureju-apsimetes-sukcius-per-nepilna-pusmeti-is-klaipedietes-isviliojo-171-tukst-euru Secondary. A report to the police, not a verdict; likewise F601–F605.
- F601. **75 280 Eur, Vilnius** (LRT, 2025-11-20, from the police): a woman born in 1972, between 9 September and 8 November, „internetinėse platformose ieškant darbo, telefonu su ja susisiekė nepažįstami asmenys“, who „teigė teikiantys būrimo paslaugas, gerinantys žmonių emocinę būklę“. Does not say how they found her. Source: https://www.lrt.lt/naujienos/lietuvoje/2/2751090/burejais-prisistate-sukciai-is-vilnietes-isviliojo-apie-75-3-tukst-euru Secondary.
- F602. **52 500 Eur, Druskininkai** (tv3.lt, 2025-04-28, from the police): from last December to 23 April, „internetu bendravo su būrimo paslaugas teikiančia moterimi“, „apgaulės būdu pasisavino 52 500 eurų“. Source: https://www.tv3.lt/naujiena/gyvenimas/isgirdus-kiek-pinigu-bureja-isviliojo-is-lietuves-netenka-zado-ispeja-visus-n1415799 Secondary.
- F603. **2 050 Eur, found by searching** (15min, 2026-10-08): a woman born in 1987 „rado būrimo paslaugas teikiančio asmens paskyrą ir už paslaugas pervedė pinigus“, „2050 eurų“, Criminal Code 182. 15min names Jurbarkas's police and Suvalkietis (https://www.suvalkietis.lt/2026/10/08/moteris-nukentejo-nuo-burejo/) the Marijampolė county force for the same report, so the place stays off the page. Source: https://www.15min.lt/naujiena/aktualu/nusikaltimaiirnelaimes/burimo-paslaugu-internete-ieskojusi-moteris-neteko-daugiau-nei-2-tukst-euru-59-2780248 Secondary.
- F604. **A man, phoned at home** (jp.lt, 2025-10-08, from the Vilnius county police): a man born in 1950, 19 September to 7 October, „skambino nepažįstamos moterys, kurios, pristačiusios ekstrasense ir jos padėjėja, apgaule išviliojo 1,2 tūkst. eurų.“ Source: https://jp.lt/is-vilniecio-pinigus-isviliojo-ekstrasensemis-apsimetusios-sukciuvienes/ Secondary.
- F605. **32 tūkst. Eur in a week** (respublika.lt, 2026-04-28, from the police): a woman born in 1973, 6–13 April, „bendraudama telefonu su ekstrasense ir atlikinėdama nuotolinius seansus“, „išviliojo 32 tūkst. eurų“. Source: https://www.respublika.lt/lt/naujienos/lietuva/nusikaltimai_ir_nelaimes/ekstrasense-is-klaipedos-rajono-gyventojos-isviliojo-32-tukst-euru/ Secondary.
- F606. **From 50 pounds to 43 238; police send her to a civil court** (Vakarų ekspresas, 2022-10-26; a Lithuanian woman in Britain): „Už kortų metimą sumokėjau 50 svarų. Atlikus analizę paaiškėjo, kad turiu nemažai problemų, todėl pasiūlyta atlikti specialų ritualą.“; „sumokėjo 43 238 Anglijos svarus - beveik 49 659 eurus“; after the 50, another 100 pounds for the ritual; „Visus savo sutaupytus ir pasiskolintus pinigus.“; her own account of being told to keep quiet: „Griežtai liepė tylėti.“, „jei kam nors prasitarsiu, jie nutrūks ir viską teks pradėti iš naujo“; asking for the money back brought „tik grasinimų ir užgauliojimų“; personal bankruptcy. Kauno apskrities VPK's answer: „nėra jokių kliūčių, apsunkinančių netinkamos paslaugos suteikimo klausimą spręsti civilinio, o ne baudžiamojo proceso tvarka“; „Ikiteisminį tyrimą dėl sukčiavimo jie pradėti atsisakė.“, and on her complaint the prosecutors said „šis pareigūnų sprendimas yra teisingas“. Her own account: the other side denied it and nobody was convicted, so the page says who said it. Source: https://ve.lt/kriminalai/laiminga-bilieta-istrauke-tik-apsisaukele-bureja Secondary.
- F607. **10 Eur: no offence** (Šilo karčema, 2018-06-07; the writer's own case): „kuri jai pervedė 10 eurų“; „būrėja nepadarė administracinio nusižengimo“; „kadangi tam tikros būrimo paslaugos buvo suteiktos“; „Paslauga nebuvo teikiama viešoje vietoje, todėl“ the case closed (the police had looked at the administrative code's art. 108 and art. 490, gambling and fortune telling). Source: https://www.silokarcema.lt/naujiena/9819_bureja-is-vilniaus-apgaudineja-silutiskius.html Secondary. Old and small: shows a case can be closed, nothing more.
- F608. **Where the line runs, as a newspaper retells the Supreme Court** (Valstietis, no date, a case begun in 2012): „Tokių paslaugų teikimas Lietuvos Respublikoje įstatymu nėra uždraustas.“; „Vien tik su magija susijusių paslaugų teikimo faktas savaime nesudaro pagrindo tokios veikos laikyti sukčiavimu“; using as deceit „objektyviais duomenimis nepagrįstus teiginius apie grėsmes nukentėjusiojo ar jo artimųjų gyvybei, sveikatai ar turtui“ so that the person makes a bad bargain „kvalifikuotina kaip sukčiavimas“. The ruling itself was not found or read, so the page names the newspaper. Source: https://www.valstietis.lt/naujienos/raganas-ir-kitokius-burtininkus-galima-vadinti-sukciais/25673 Secondary. Medium confidence.
- F609. **A second repayment order** (Raseinių naujienos, 2022-11-08, from a court): a false advert for teaching card reading and rituals, „teismas skyrė 1 800 eurų (36 MGL) baudą“, and she „per pusantrų metų taip pat turės grąžinti nukentėjusiajai apgaule gautus pinigus – 7 701 eurą“. „gali būti skundžiamas“ within 20 days. Says nothing on whether it was appealed or paid. Source: https://raseiniunaujienos.lt/2022/11/08/nuteista-moteris-isviliojusi-pinigus-uz-neva-burimo-kortomis-ir-ivairiu-ritualu-mokymus/ Secondary.

**Not used:** F594 on the page (kept here as a record): the article mocks its victims and uses an ethnic word, and the Šaltiniai link would send an ashamed reader there; a Šiauliai street fraud of 2017 (Kauno diena; hair on money, another trick, in person), a 980 Eur Klaipėda case of 2021 (15min; adds nothing), Kauno diena's foreign case, the US indictment of a mail-order clairvoyant (an allegation, foreign), Bromley Council's alert (it is about letters, and foreign), and four pages the research agent saved that say nothing checked here (manojurbarkas, suzinoti, polsearch, tv3-gaires).

**Not found:** an official Lithuanian warning or a police total; a fortune teller telling anyone to avoid doctors or family (F594 has family pushing to the police); secrecy demanded anywhere but in one woman's own account (F606); how often such money comes back; whether the repayment orders in F590, F593 and F609 were paid. Action Fraud and Scamwatch refused the fetch, and Delfi, lrytas and vz were refused by the search; none was got around.

**B47. Social engineering: the word, how much of it there is, and why people think it will not happen to them** (read by Opus on 2026-11-06 from the raw text of each page; found by a Sonnet research agent the same day). Raw pages: `%TEMP%\kurj\si-*`; every quote below was matched against them by script. The text layers of the NKSC and KAM PDFs (F650, F651–F655, F662) have lost most Lithuanian letters: their quotes have the letters restored by hand and were compared with those letters dropped, so the spelling of the restored letters is ours. This block is the first Lithuanian official source for the term „socialinė inžinerija" (`docs/ARCHITECTURE.md` had kept it off the launch pages for want of one).

- F650. **What social engineering is, in NKSC's words** (NKSC, „Kibernetinio saugumo vadovas verslui", 2020): „Bandymai apgauti yra pagrįsti socialinės inžinerijos metodais. Imituojant įvairias gyvenimo / darbo aplinkybes ir situacijas, siekiama apgavystės taikinį suklaidinti, paveikti psichologiškai ir taip išvilioti pinigus, jautrius duomenis arba išprovokuoti daryti veiksmus, kurie gali pažeisti IT infrastruktūrą.“; „Socialinės inžinerijos tikslas – išgauti konfidencialią informaciją, asmeninius, banko ar kitus finansinius duomenis arba kitą asmeninę informaciją, kurią galima panaudoti šantažuojant, užverbuojant ir pan.“ It describes the aim, not a one-line definition: no Lithuanian official page found says „Socialinė inžinerija – tai…". The guide names phishing (sukčiavimas), whaling (banginių medžioklė) and pretexting. Source: https://www.nksc.lt/doc/Kibernetinio_saugumo_vadovas_verslui_2020.pdf . Official; raw `si-nkscverslui.pdf.txt` lines 405–429.
- F651. **The largest kind of incident NKSC registered** (NKSC, „Nacionalinė kibernetinio saugumo ataskaita 2025"): „Tiek 2025 m., tiek 2024 m. NKSC daugiausia registravo socialinės inžinerijos principais grįstų kibernetinių incidentų. 2025 m. šio tipo incidentai (1551) sudarė 54 proc. visų registruotų incidentų (2024 m. – 59 proc.).“ They fell by almost a third (32 %; 2,288 in 2024), which NKSC ties to blocking malicious domains, more vigilant internet users and better-prepared organisations; „socialinės inžinerijos atvejai vis dar kelia didelę grėsmę organizacijoms ir fiziniams asmenims“. The base is NKSC's own registered incidents, not all fraud: not comparable with F108's share or F652's 44 %. Source: https://www.nksc.lt/doc/Nacionaline-kibernetinio-saugumo-ataskaita-2025.pdf . Official; raw `si-nksc2025full.pdf.txt` line 523.
- F652. **Threats aim at people, not systems** (same report, summary; repeated in KAM's 2025 overview): „Grėsmės vis dažniau nukreiptos ne į pačias sistemas, o į žmones, kurie turi prieigą prie jų. Socialinės inžinerijos pagrindu vykdyti incidentai sudarė didžiausią dalį visų užregistruotų atvejų. Sukčiavimas išlieka dominuojančiu kibernetiniu nusikaltimu – 44 proc. visų nusikalstamų veikų elektroninėje erdvėje“. People are hit through „investiciniu sukčiavimu, suklastotomis internetinėmis parduotuvėmis ar apgaulės būdu gauta prieiga prie el. bankininkystės“ (line 514). Sources: the report above, line 58; https://kam.lt/wp-content/uploads/2026/06/Lietuvos-kibernetinio-saugumo-bukles-apzvalga-svarbiausia-informacija-2025_pataisyta_final.pdf , `si-kam2025.pdf.txt` line 62. Official.
- F653. **The police: the biggest risk stays social engineering** (same report, the police's section heading): „Nusikalstamumo elektroninėje erdvėje rizikos veiksniai nesikeičia – didžiausia grėsmė išlieka socialinė inžinerija“ (line 1059). Official.
- F654. **Data breaches** (same report, the data-protection inspectorate's section): of 2025's breach notices caused by a cyber incident, „45 proc. … piktavaliui neteisėtai gavus prieigą prie IT sistemų, 26 proc. dėl socialinės inžinerijos ir duomenų viliojimo (angl. Phishing) atakų“ (line 134). Official.
- F655. **Calls and SMS** (same report, the telecoms regulator's section): millions of fraudulent calls blocked (63 % more than in 2024) and spoofed SMS (almost 80 % more); „daugėja suklastotų lietuviškų numerių, pritaikomi vis nauji socialinės inžinerijos metodai“ (line 145). Official.
- F656. **Lietuvos bankas's own name for it: a payer manipulated** (Lietuvos bankas, 2025-09-17, on publishing payment-fraud data): one of the two kinds of fraud it counts is the „mokėjimo operacija, kurią vykdant sukčius savo veiksmais manipuliavo mokėtoju skatindamas jį duoti mokėjimo vykdymo nurodymą… mokėtojui manant, kad lėšos siunčiamos sąžiningam gavėjui“. Its published tables show only the total, so no Lithuanian share of manipulation was found. Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-pradeda-skelbti-sukciavimo-atliekant-mokejimus-duomenis . Official; raw `si-lbfrdnews.html.txt` line 286.
- F657. **FOREIGN (EU-wide): manipulation is now most credit-transfer fraud** (EBA and ECB, „Report on payment fraud", 15 December 2025): fraud by manipulating the payer rose „from 65% to 74% in value terms and 55% to 71% in volume terms, from 2023 to 2024“ and includes impersonation and fraud „supported by phishing/smishing/vishing techniques“; for cards it was about 9 % of value. Lithuania: „Lithuania accounted for the highest fraud rate in terms of volumes (0.015%)“ for credit transfers in 2024 (line 2472; a rate of all transfers, still small). EU/EEA figures, not Lithuania's split. Source: https://www.ecb.europa.eu/press/intro/publications/pdf/ecb.ebaecb202512.en.pdf . Official; raw `si-ebaecb2025.pdf.txt` lines 663–664, 798, 2472.
- F658. **Most think they are hard to fool** (Lietuvos bankas, 2023-07-03; survey by Spinter, February 2023, 1,011 people aged 18–75): „58 proc. respondentų, vertindami savo atsparumą finansiniams sukčiams, mano, jog yra atsparūs“ (22 % very good, 36 % good); 30 % medium; 42 % do not know how to check whether a firm offering investments is a scam. Source: https://www.lb.lt/lt/naujienos/beveik-puse-lietuviu-nezino-kaip-patikrinti-ar-investuoti-siulantys-asmenys-nera-sukciai . Official; raw `si-lbspinter.html.txt` lines 267–268.
- F659. **Many are targeted; most notice** (Lietuvos bankas, 2023-06-15; the same February 2023 survey): „iš 39 proc. gyventojų, kurie per pastaruosius trejus metus susidūrė su finansinių sukčių ataka, 6 proc. finansiškai nukentėjo, o 33 proc. atpažino ataką ir finansiškai nenukentėjo.“ So 6 + 33 = 39: both shares are of all residents, not of the 39 % (the bank itself writes „daugiau kaip trečdalis gyventojų geba atpažinti sukčius“). Source: https://www.lb.lt/lt/naujienos/lietuvos-banko-finansinio-rastingumo-centras-primena-sukciai-neatostogauja . Official; raw `si-lbneatost.html.txt` line 268.
- F660. **At least 44 % have been hit** (Lietuvos bankas, 2026-04-22, preliminary findings of a representative survey of adults; sample size not on the page): over the last two years „nukentėję ne mažiau kaip 44 proc. suaugusių gyventojų, daugiau kaip pusė jų patyrė finansinių nuostolių“; more than a third of those who lost money did not report it; „auka gali tapti bet kas“. Different years and questions from F658–F659: not to be set against them as a trend. Source: https://www.lb.lt/lt/naujienos/bent-vienos-rusies-finansine-apgaule-ar-sukciavima-yra-patyre-44-proc-suaugusiuju-tarptautiniame-seminare-vilniuje-ketinama-aptarti-kaip-su-tuo-kovoti . Official; raw `si-lb44.html.txt` line 268.
- F661. **A director's order by e-mail, 2026** (ELTA via LRT, 2026-06-19, citing the Kaunas district police): on 17 June a Kaunas district firm's accountant „į elektroninį paštą gavo neva įmonės direktoriaus nurodymą pervesti pinigines lėšas į užsienio įmonės sąskaitą“; 47 thousand euros were lost and the police opened an investigation. Source: https://www.lrt.lt/naujienos/lietuvoje/2/2965025/is-kauno-rajono-imones-apgaules-budu-sukciai-isviliojo-47-tukst-euru . Secondary (press, police as source); raw `si-lrtkaunas.html.txt` lines 84–96.
- F662. **Earlier cases at work** (NKSC's 2020 guide, citing the press of 2019): „Įmonės Alytuje buhalterė, gavusi apgaulingą elektroninį laišką nuo direktoriumi apsimetusio asmens, jam pervedė beveik 20 tūkstančių eur.“; a Tauragė firm lost over 5 thousand euros after a fake request to update the bank's app on a company phone. Same source as F650, lines 413–416.
- F663. **Messaging-app accounts** (NKSC with AOTD and VSD, page updated 2026-07-13): „niekada neatskleisti SMS patvirtinimo kodų, programėlės PIN kodo, paskyros atkūrimo raktų“; before anything unusual, „įsitikinti, kad žinutę iš tiesų atsiuntė patikimas asmuo“; „pagrindinis atakų taikinys yra žmogus, o ne technologija“; NKSC's director: „Socialinės inžinerijos atakos tampa vis įtikinamesnės“. Source: https://nksc.lrv.lt/lt/naujienos/daugeja-bandymu-perimti-susirasinejimo-programeliu-paskyras-ekspertai-pataria-kaip-apsisaugoti-cRO/ . Official; raw `si-nkscmsg.html.txt` lines 70–76.
- F664. **Hang up, then call them yourself** (Lietuvos bankas, 2025-12-15, launching „Padėk ragelį" with partners): „Jei skambutis ar žinutė kelia šoką, spaudimą ar verčia skubėti – nutraukite pokalbį“; „padėti ragelį ir patiems susisiekti su institucija oficialiais kanalais“; for the bank: „padėję ragelį patys paskambinkite į banką oficialiu numeriu“; „Policijos pareigūnai neskambina žmonėms ir neprašo asmens duomenų ar prisijungimo slaptažodžių.“ Source: https://www.lb.lt/lt/naujienos/pradedama-kampanija-padek-rageli-raginama-nesuteikti-sukciams-progos . Official; raw `si-padek.html.txt` lines 268–281.
- F665. **FOREIGN (EU): the main way in** (ENISA Threat Landscape 2025, July 2024 – June 2025, 4,875 incidents): „social engineering tactics remain the primary entry point for threat actors, with phishing (including vishing, malspam, and malvertising) accounting for about 60% of observed cases“. EU-wide, organisations' incidents, not people's losses. Source: https://www.enisa.europa.eu/sites/default/files/2025-11/ENISA%20Threat%20Landscape%202025.pdf . Official; raw `si-enisa2025.pdf.txt` line 252.

**Not used:** NKSC's 2022 advice page on haste (its address was not kept with the saved copy); the FBI's 2025 figures (US; nothing on the page needs them); KAM's „Nespausiu" signs page (undated); the ESET Lithuania page for „višingas"/„smišingas" (a vendor; the page uses plain words).

**Not found:** a one-line Lithuanian official definition („Socialinė inžinerija – tai…"); a Lithuanian share of fraud done by manipulation (F656 names the kind but publishes no split); any Lithuanian official use of „USB masalas" or „sekimas į patalpas"; a Lithuanian figure on how often people at work are targeted.

**B48. SEO sellers: what Google says no one can promise, what breaks its rules, and the caller posing as Google** (read by Opus on 2026-11-06 from the raw text of each page; found by a Sonnet research agent the same day). Raw pages: `%TEMP%\seo-scam\` (`g-*` Google, `p-*` press, `f-*` foreign); every quote below was matched against them by script. Google's pages on SEO and on spam exist in English only (the `?hl=lt` request returned the same English bytes), so their quotes stay English and a page puts them in its own Lithuanian words; the Business Profile pages have official Lithuanian versions, quoted as they stand. These are a company's own rules for its own products, not law.

- F670. **No one can guarantee first place** (Google Search Central, „Do you need an SEO?", last updated 2026-06-05): „No one can guarantee a #1 ranking on Google. Beware of SEOs that claim to guarantee rankings, allege a "special relationship" with Google, or advertise a "priority submit" to Google." Also: „Be careful if a company is secretive or won't clearly explain what they intend to do." Source: https://developers.google.com/search/docs/fundamentals/do-i-need-seo . Official (Google about its own search); raw `g-doineedseo-en.html.txt` lines 422–425.
- F671. **An honest audit gives estimates, not a place** (same page): „An SEO audit should be about giving you realistic estimates of improvement, and an estimate of the work involved. If they guarantee you that their changes will give you first place in search results, find someone else." It also advises asking past clients and giving an SEO only read access to Search Console at first. Same source; lines 389–396.
- F672. **Cold e-mail from SEO firms** (same page): „Be wary of SEO firms and web consultants or agencies that email you out of the blue. Amazingly, we get these spam emails too". Same source; lines 415–416.
- F673. **The owner answers for the seller** (same page): „If an SEO creates deceptive or misleading content on your behalf, your site could be removed entirely from Google's index. Ultimately, you are responsible for the actions of any companies you hire". Same source; lines 426–428. It says what Google may do to the site; it says nothing about the law.
- F674. **No links to the SEO, no link schemes** (same page): „You should never have to link to an SEO." and „Avoid SEOs that talk about link popularity schemes". Same source; lines 431–432.
- F675. **Ads do not buy a place in search, and appearing costs nothing** (same page): „Advertising with Google won't have any effect on your site's presence in our search results. Google never accepts money to include or rank sites in our search results, and it costs nothing to appear in our organic search results." Ads are paid placement that is marked as such; the page does not say ads are worthless. Same source; lines 342–344.
- F676. **What useful SEO work is** (same page): „Many SEOs and other agencies and consultants provide useful services for website owners, including:" a review of the site's content or structure, technical advice (hosting, redirects, error pages, JavaScript), content development, keyword research, SEO training, expertise in specific markets. Same source; lines 332–341. The page is not against hiring an SEO; it says how to choose one.
- F677. **A better local ranking cannot be bought from Google** (Google Business Profile help, Lithuanian, „Kaip pagerinti vietinį reitingą „Google“", no date): „„Google“ nėra galimybės prašyti geresnio vietinio reitingo ar už tai sumokėti."; „Vietiniai rezultatai teikiami atsižvelgiant į jų atitikimą, atstumą ir populiarumą." So the place in local results also depends on where the searcher is. Source: https://support.google.com/business/answer/7091?hl=lt . Official; raw `g-ranking-lt.html.txt` lines 67–68.
- F678. **A real Google call never asks for money** (Google Business Profile help, Lithuanian, on suspicious calls, no date): „telefonu niekada neprašysime mokėjimo informacijos ar negarantuosime specialios vietos mūsų produktuose."; „Jūsų nebus prašoma prisiregistruoti gauti paslaugą, sumokėti pinigų ar pateikti asmens informacijos."; the callers „gali teigti, kad dirba su „Google“ … Jie parduoda skirtingas schemas ir internetinės rinkodaros paslaugas nieko neįtariantiems asmenims ir įmonėms."; „Jei kas nors jums skambina apsimetęs „Google“ atstovu, baikite pokalbį. Nespauskite jokių mygtukų". Google does phone businesses (about Ads, Play and other accounts; line 29), so a call alone is not the sign. The page's reporting steps are for the US (FTC) and are not used. Source: https://support.google.com/business/answer/6212928?hl=lt . Official; raw `g-bp-fraud-lt.html.txt` lines 29–30, 47–49.
- F679. **Paid reviews are removed from Maps** (Google Maps contribution policy, Lithuanian, no date): forbidden are „Atsiliepimai ar įvertinimai, už kuriuos sumokėta tiesiogiai arba kitais būdais." and „Turinys, kurį paskelbė kelios paskyros vieno asmens prašymu arba jo iniciatyva."; „Manipuliavimas įvertinimais apima skatinamus arba šališkus atsiliepimus, kurie yra neleidžiami ir bus pašalinti iš Žemėlapių." It names removal of the content; it names no further penalty for the business. Source: https://support.google.com/contributionpolicy/answer/7400114?hl=lt . Official; raw `g-bp-reviews-lt.html.txt` lines 22–34.
- F680. **Bought links break Google's spam policy** (Google Search Central, „Spam policies for Google web search", no date in the text): link spam includes „Buying or selling links for ranking purposes. This includes: Exchanging money for links, or posts that contain links" and „Using automated programs or services to create links to your site"; „Sites that violate our policies may rank lower in results or not appear in results at all." A paid link marked `rel="sponsored"` or `rel="nofollow"` is allowed (line 488). Source: https://developers.google.com/search/docs/essentials/spam-policies . Official; raw `g-linkspam-en.html.txt` lines 339, 448, 452.
- F681. **Google sued people who posed as Google and sold fake reviews** (Google's blog, 2022-11-29; Google's own account of its suit, US): „scammers who sought to defraud hundreds of small businesses by impersonating Google through telemarketing calls. They also created websites advertising the purchase of fake reviews, both positive and negative"; they „tried to charge people for Business Profiles — a service we provide for free." Source: https://blog.google/innovation-and-ai/technology/safety-security/protecting-small-businesses-from-scammers/ . A party's statement about its own case (FOREIGN, US); raw `g-blog-scammers.html.txt` lines 247–250.
- F682. **In Lithuania, „Google" opens a bank-login theft** (LRT, 2024-11-22, citing the Vilnius county police): „Sukčiai apsimetė JAV technologijų kompanijos „Google“, taip pat banko ir policijos atstovais ir iš įmonės pasisavino 50 tūkst. eurų."; posing as Google, bank staff and police officers they „apgaulės būdu išviliojo banko prisijungimo duomenis"; such frauds are carried out „gana daug". This is a bank-login theft, not an SEO sale: it belongs on a page only to show that a "Google" caller may be after the bank. Source: https://www.lrt.lt/naujienos/verslas/4/2420283/sukciai-apsimete-google-banko-ir-policijos-atstovais-is-imones-pavoge-50-tukst-euru . Secondary (press, police as source); raw `p-lrt-50k.html.txt` lines 96–102.

**Not used:** the UK's DMCCA ban on „the posting and commissioning of fake reviews" (gov.uk, 2025-04-07, `f-cma-regime.html.txt` line 92): foreign law, and next to Google's rules it would read as Lithuanian law; the EU's 2022 sweep of 223 sites (it checked traders' own review pages, not review sellers, and the Commission's page did not render); LRT (2024-08-26) and tv3 (2024-08-25) on private persons robbed by „Google" callers (same kind as F682); the CMA's 2025 investigations of five firms (not about SEO sellers).

**Not found:** the Lithuanian law's text on fake reviews (e-seimas and EUR-Lex refused the script with a bot challenge, not got around), so no page may say what Lithuanian law allows; whether that law protects a business that buys a service rather than a consumer; a Lithuanian case of a small business cheated by an SEO or „Google profile" seller; the FTC's 2018 case and 2024 rule (its pages refused the script); how many Lithuanian businesses get such calls.

**B49. The call from the „clinic" and the „medics" at the door; and what the seventh pass adds to live pages (the cloned voice, remote access before a fake platform, who runs the call centres, ESO at the door)** (read by Opus on 2026-11-07 from the raw text of each page; found by two Sonnet research agents the same day). Raw pages: `%TEMP%\seo4\` (`md-` medics, `ch-` callers, `kr-` investment, `en-` energy, `voice_`); every quote below was matched against them by script (42 of 42), and the script was shown to fail on a false quote and a missing file. F697–F709 stay unused; B50 starts at F710.

- F683. **Calls in a clinic's name ask for document numbers and logins** (LRT, 2026-06-11, Antakalnio poliklinika; https://www.lrt.lt/naujienos/sveikata/682/2957216/antakalnio-poliklinika-perspeja-sukciai-prisistato-gydymo-istaigu-darbuotojais): „Jau fiksuota situacijų, kai gyventojams skambinama poliklinikų vardu ir pasakojama apie prevencines programas, nedarbingumo pažymėjimus, tyrimus ar kitas sveikatos priežiūros paslaugas. Tačiau kartu prašoma pateikti asmens dokumento numerį, elektroninės bankininkystės ar kitus prisijungimo duomenis." The same page: „įtartinų skambučių galima sulaukti ir lietuvių kalba." So Lithuanian speech proves nothing.
- F684. **What one clinic never asks by phone, and when it may ask the personal code** (same source): „mūsų darbuotojai telefonu niekada neprašo pacientų prisijungimo duomenų ar asmens dokumentų numerių."; „Tapatybei patvirtinti kai kuriais atvejais gali būti prašoma nurodyti asmens kodą ar gimimo datą, tačiau tik tuomet, kai pats pacientas kreipiasi į registratūrą." It is Antakalnio's own rule; with F691 and F688 it is the pattern of three institutions, not a law for every clinic.
- F685. **The address for a „home blood test"** (same source): „Būta atvejų, kai pacientų teiraujamasi namų adreso, kad poliklinikos specialistai galėtų atvykti atlikti kraujo ar kitų tyrimų." Antakalnio offers no such visits, except nursing and newborn visits agreed in advance.
- F686. **The move the clinic gives: hang up, ring the registratūra on its public number** (same source): „nutraukę įtartiną pokalbį visada galite paskambinti viešai skelbiamu Antakalnio poliklinikos registratūros telefonu". Its number is not copied to a page: it is one clinic's.
- F687. **„Medics" at the door in the regions** (LRT, 2026-02-20, quoting the Health Ministry's (SAM) Facebook post; https://www.lrt.lt/naujienos/sveikata/682/2845250/ispejimas-gyventojams-regionuose-lankosi-sukciai-apsimetantys-medikais): they „prisistato medikais ar sveikatos priežiūros darbuotojais bei siūlo „užregistruoti vizitui pas gydytoją“, „patikrinti sveikatą“ ar „atnaujinti duomenis“ ir prašo pateikti asmeninę informaciją"; „sveikatos priežiūros įstaigų darbuotojai nevaikšto po namus be išankstinio suderinto oficialaus vizito."; „Jei į jūsų namus atvyko įtartini asmenys – neįsileiskite jų ir nedelsdami skambinkite 112. Jei sulaukėte įtartino skambučio – nutraukite pokalbį."; „Pasidalinkite šia informacija su artimaisiais ir kaimynais, ypač vyresnio amžiaus žmonėmis". It reports no loss.
- F688. **Real staff speak Lithuanian and call only about care; a loss through the clinic-then-police chain** (tv3.lt, 2026-05-21, SAM's post and the Police Department; https://www.tv3.lt/naujiena/lietuva/isidemekite-patys-ir-perspekite-kitus-ministerija-skelbia-skubu-perspejima-del-naujos-sukciu-bangos-n1521458): „gydymo įstaigų darbuotojai bendrauja valstybine, lietuvių kalba, ir skambinti gali tik sveikatos priežiūros paslaugų klausimais". In the Vilnius district a man „(gim. 1938 m.), būnant namuose" got calls in Russian; „Paskambinę asmenys prisistatė poliklinikos darbuotojais, policijos pareigūnais ir apgaulės būdu iš vyro išviliojo apie 10 tūkst. eurų."; „Pinigus vyras atidavė atvykusiam nepažįstamam asmeniui." The money went in the police step, not the clinic step.
- F689. **How the call opens** (regionai.lt, 2026-05-24, the police; https://regionai.lt/policija-ispeja-gyventojus-rusiskai-kalbantys-sukciai-apsimeta-medikais-ir-pareigunais-125573/): „Tokie skambučiai neretai pradedami tariamai nekaltais klausimais apie sveikatą, registraciją ar tyrimų atsakymus, o vėliau pereinama prie grasinimų ar skubos."; „Sukčiai gali teigti, kad esą nustatyta problema, pradėtas tyrimas arba reikia skubiai patvirtinti tapatybę."; „Dažniausiai jie bendrauja rusų kalba".
- F690. **The surge of May 2026: blood tests, a cancelled visit, then „police"** (Respublika, „Publikuota: 2026 gegužės 31", quoting the police; https://www.respublika.lt/lt/naujienos/lietuva/kitos-lietuvos-zinios/po-duomenu-nutekejimo-gyventojai-ispejami-del-suaktyvejusiu-sukciu/): „Gegužės 18 - 22 d. pagausėjo įvykių, kuomet sukčius skambina į telefoną, apsimeta poliklinikos darbuotoju, siūlo ateiti atlikti kraujo tyrimus, ar siūlosi atvykti į namus atlikti tyrimus, siūlo užregistruoti pas gydytojus, informuoja, kad atšaukė vizitą pas gydytoją ar siūlo kitas medicinines paslaugas."; it „bando išgauti asmenų duomenis: asmens kodus, gyvenamosios vietos adresus ir kt."; „Po pirmo skambučio seka kitas skambutis su kita versija. Tuomet prisistatoma policijos pareigūnais". The paper sets it beside the Registrų centras leak with „Sutapimas tai ar ne"; no source says the callers used leaked data, so a page does not.
- F691. **The „mobile dentist" call** (tv3.lt, 2026-10-20, Ukmergė primary health care centre; https://www.tv3.lt/naujiena/gyvenimas/lietuvoje-plinta-neregeto-izulumo-sukciu-afera-skubiai-ispeja-visus-gyventojus-n1561149): „odontologinių paslaugų namuose vizitai telefonu nėra siūlomi ar derinami be išankstinio paciento kreipimosi"; „centro darbuotojai niekada neprašo banko prisijungimų, mokėjimo kortelių duomenų ar PIN kodų". It reports no loss.
- F692. **A brother heard his sister's voice, and it was not her** (LRT, 2026-07-29; https://www.lrt.lt/naujienos/mokslas-ir-it/11/2985209/vilnieti-nustebino-artimojo-skambutis-paaiskejo-kad-balsa-pavoge-sukciai): a Vilnius man saw „nuotrauką, sesers vardą ir jos numerį" and heard her voice asking for help; „Supratęs, kad pokalbis gali būti apgaulė, vyras jį užbaigė ir tuoj pat perskambino seseriai."; „Perskambinęs seseriai, Domantas suprato, kad skambino visai ne ji, o jos balsą „pavogę“ sukčiai." One man's account to the paper; no money lost; a page does not name him (§6.7).
- F693. **A known name or voice proves nothing** (same source, KTU's prof. Š. Grigaliūnas): „telefone rodomas pažįstamo žmogaus vardas nebūtinai reiškia, kad skambinama iš jo telefono."; „vien pažįstamas balsas ar telefono numeris nebėra pakankamas tapatybės įrodymas". His report of a police warning on AI voices is his, not read at the police's source, and is not used; nor his account of how voices are gathered or changed (§6.1).
- F694. **Remote access, then a fake platform: 235 000 Eur** (tv3.lt, 2025-08-30, the Police Department's R. Matonis; https://www.tv3.lt/naujiena/lietuva/sukciai-is-vilniecio-isviliojo-beveik-ketvirti-milijono-papasakojo-kur-sulauke-pasiulymo-investuoti-n1446864): „70 metų vilnietis prarado 235 tūkstančius eurų."; „Sukčiai, pasinaudodami nutolusia programine įranga, prisijungė prie žmogaus kompiuterio ir padėjo, taip pavadinkim, jam investuoti į netikrą investicinę platformą."; they „pinigus iš 70-mečio traukė pusmetį".
- F695. **Who makes the calls: call centres whose callers take a share** (LRT, 2025-12-16, the Prosecutor General's Office; https://www.lrt.lt/naujienos/lietuvoje/2/2777169/tarnybos-per-operacija-ukrainoje-isarde-telefoniniu-sukciu-tinkla-veikusi-ir-lietuvoje): Lithuanian, Czech, Latvian and Ukrainian prosecutors and investigators, coordinated by Eurojust, „išardė organizuotą nusikalstamą tinklą, valdžiusį skambučių centrus Dnipre, Ivano Frankivske ir Kyjive"; „Tinklo nariai, įtariama, apgaudinėjo asmenis Europos šalyse, tarp jų ir Lietuvoje."; the network „darbuotojus verbavo Čekijoje, Latvijoje, Lietuvoje ir kitose šalyse"; „Darbuotojai, kuriems pavykdavo išvilioti pinigų iš nukentėjusiųjų, gaudavo iki 7 proc. nuo neteisėtai užvaldytos sumos."; „nuo šios nusikalstamos grupuotės nukentėjo daugiau kaip 400 asmenų, bendra padaryta žala viršija 10 mln. eurų" (across Europe, not Lithuania alone); „Tarptautinės operacijos metu skambučių centruose Lietuvos piliečių nerasta." No source ties these or any call centres to a state, so a page does not.
- F696. **„ESO" at the door** (alkas.lt, 2025-03-07, ESO's release with the police; https://alkas.lt/2025/03/07/eso-perspeja-saugotis-energetikais-apsimetanciu-sukciu/): „Energetikais apsimetantys sukčiai į gyventojų namus gali bandyti įsiprašyti prisidengę skaitiklių diegimu ar patikra, vidaus tinklo darbais."; „ESO inžinieriai neatlieka vidaus tinklo remonto darbų, netikrina namų elektros tinklo."; „ESO inžinieriai niekada neprašo susimokėti už išmaniojo skaitiklio diegimą – skaitiklį pakeičiame arba naujai montuojame nemokamai. Darbuotojai taip pat niekada neprašo atsiskaityti čia ir dabar"; staff carry an „ESO patvirtintą pažymėjimą"; „apie planuojamus darbus mes savo klientams pranešame iš anksto". The police: „pastaruoju metu fiksuota apie 10 atvejų, kai prisidengdami ESO vardu sukčiai bandė iš gyventojų išvilioti pinigus" (attempts in ESO's name, mostly by phone; not 10 at the door).

**Not used:** the police commissioner general's „iš rytinio flango valstybių" (LRT, 2025-07-17): an answer to a leading question, right after he declined to name any state, and in the same interview the 21 suspects are „įvairių valstybių piliečiai", some Lithuanian; quoted alone it would read as a state link no source makes. The 15min piece on call centres (2025-05-02; behind a paywall past its opening). 15min on the clinic call (2026-05-21): the same police release as F279, which is reused. ESO's page of 2026-04-21 on public-supply letters (no scam using those letters is recorded). Lietuvos bankas on LWEX (2025-04-24) and Citadel (2025-07-08): `netikras-brokeris`'s move is already the list of licensed firms, a warnings list proves nothing by a name's absence, and Telegram is already on the page. 15min (2026-11-04) on AI-made nude pictures of children: `grasina-paviesinti` already says the picture may be AI-made (F548) and that children blame themselves (F549), and the apps and bots it names are tooling (§6.1). Jurbarko „Šviesa" (2025-01-28) on „Alio, mama": one officer's word for older landline calls, not the AI voice. Antakalnio's registratūra number: one clinic's.

**Not found:** any sum lost in the clinic step itself (the money is taken in the later police step, F688); clinic scams through e-sveikata, the VLK, vaccines or SMS links; whether the May 2026 callers used data from the Registrų centras leak; a 2025–2026 case of money lost to someone posing as ESO.

**B50. Trading courses, signals and tips sold on social media (`/scenarijai/prekybos-kursai-ir-signalai/`)** (read by Opus on 2026-11-07 from the raw text of each page; found by two Sonnet research agents the same day for the survey in `docs/GURUS-PLAN.md`). Raw pages: `%TEMP%\seo4g\` (`tr-*` trading, `gy-*` sellers and consumer law, `lo-*` gambling); every quote below was matched against them by script, except F712, whose PDF loses its Lithuanian letters in text extraction and was read from the rendered PDF. B49 (F683–F709) is the seventh pass's, on its own branch. No source names an influencer for any of this, and the page names nobody (ARCHITECTURE §6.7).

- F710. **Tips on what to buy can be licensed activity** (Lietuvos bankas, 2026-02-24, advice to influencers): „Patarimai žmonėms, į ką investuoti, gali būti laikomi investavimo rekomendacijomis. O tai jau yra prižiūrima veikla, jai reikia licencijos ar veiklos leidimo.“; „Net ir viešas pasidalijimas nuomone ar pasvarstymas apie akcijų arba kriptoturto kainos pokyčius, investavimo strategijas gali būti laikomi investavimo rekomendacija“. Source: https://www.lb.lt/lt/naujienos/patarimai-nuomones-formuotojams-i-ka-atkreipti-demesi (`tr-lb-patarimai`). Primary. It says „gali būti", never "is"; the page keeps that.
- F711. **Too good, paid, and all of it can be lost** (same page): „Jeigu pasiūlymas skamba per gerai (pavyzdžiui, „didelis pelnas ir jokios rizikos“), nuomonės formuotojas turėtų jį vertinti itin kritiškai, kad tai nebūtų apgaulė.“; „Jei nuomonės formuotojas už finansinių paslaugų ar produktų reklamą gauna pinigų, dovanų ar privilegijų, tą turi viešai įvardyti.“; „žmonės gali prarasti net ir visas investuotas lėšas.“ Primary. Addressed to influencers; the page turns it round for followers.
- F712. **The ESMA and Lietuvos bankas leaflet** „Nuomonės finansų srityje formuotojai" (© 2025, both logos, in ESMA's folder of 2026-01): „Tam tikrais atvejais mokymo ar edukacinio turinio teikimas gali būti laikomas investavimo rekomendacijomis.“; „Perspėjimai, pvz., „Tai nėra investavimo rekomendacija", tokiais atvejais jūsų neapsaugos.“; „Nedarykite spaudimo ar nekurkite skubos įspūdžio, sakydami tokius dalykus kaip „praturtėk greitai“. Nes žmonės taip pat gali prarasti pinigus – greitai.“; „Be to, jei jau investuojate į tai, apie ką skelbiate įrašus, arba Jums gali būti naudinga, jei kiti tai pirktų, – pasakykite ir tai.“; risky products include „prekyba valiutomis, ateities sandoriai … arba volatilus kriptoturtas", „įskaitant galimybę prarasti 100 proc. investuoto kapitalo.“ Source: https://www.esma.europa.eu/sites/default/files/2026-01/LT_Lithuania_lt_-_Finfluencers_factsheet.pdf (`tr-LT_Lithuania_lt_-_Finfluencers_factsheet.pdf`). Primary (an EU body with the Lithuanian regulator). Read from the rendered PDF. The disclaimer line says the disclaimer does not protect *the influencer*; it is not a rule about the follower.
- F713. **Paid courses, no official status, and the scale** (Lietuvos bankas, 2025-03-18): „Kai kurie „finfluenceriai“ net pristato save kaip ekspertus, siūlydami mokamus mokymus ar rinkos įžvalgas, kurios neretai būna nepatikrintos ar netgi klaidinančios.“; „Jie įprastai neturi oficialaus finansinio patarėjo ar konsultanto statuso“; „Nors Lietuvoje „finfluenceriai“ arba finansų nuomonės formuotojai dar netapo masiniu reiškiniu“. Source: https://www.lb.lt/lt/naujienos/nuo-finansu-konsultanto-iki-tiktok-eksperto-kuo-is-tiesu-galiu-pasitiketi (`tr-lb-tiktok`). Primary. So the page claims no scale. Its Telegram and Discord line is about influencers drawn into market manipulation, not a scam on followers, and is not used.
- F714. **The one Lithuanian case of a tips seller, and it is about tax** (Kauno diena, 2022-04-27, an interview with a VMI officer, from LNK): an unnamed influencer „ypač mėgo fotografuotis su daug pinigų, kurie neva buvo laimėti iš įvairių statymų, prekybos kriptovaliutomis“, and people „pirko jo informaciją apie tai, kur geriau statyti pinigus ir į kokią kriptovaliutą investuoti“; „Per atitinkamą laikotarpį jis gavo virš 200 tūkst. eurų pajamų“, undeclared. Source: https://m.kauno.diena.lt/naujienos/verslas/ekonomika/kas-svarbiausia-vystant-internetini-versla-1075284 (`gy-kd-influ`). Secondary. It shows the cash-photo display and income from selling tips; it does not say the tips lost anyone money, or that the income was all from tips.
- F715. **Unlabelled ads, most often of the influencer's own products** (VVTAT, 2020-11-30, updated 2024-05-22): „Dažniausiai pastebima, kad nėra žymimi „Stories“ įrašai, taip pat nėra žymima produktų reklama, kuriuos parduoda patys nuomonės formuotojai.“ Source: https://vvtat.lrv.lt/lt/naujienos-ir-pranesimai-ziniasklaidai-377/vvtat-primena-kaip-influenceriai-turi-zymeti-reklama-socialiniuose-tinkluose-1692/ (`gy-vvtat-influ`). Primary.
- F716. **Check who sells** (VVTAT with VMI, 2024-09-12, a leaflet on buying in social networks): unreliable sellers are recognised by checking „ar nurodyti pardavėjo kontaktai“, and to „pasidomėti kitų vartotojų atsiliepimais apie pardavėją“; a seller who breaks consumer rules is often also „neteisėtai komercinę veiklą vykdantis asmuo“, who should have registered individual activity „arba įsteigęs juridinį asmenį“; to check that the activity is legal, in VMI's „Mokesčių mokėtojų informacija“ „reikia suvesti pardavėjo duomenis“. Source: https://vvtat.lrv.lt/lt/naujienos-ir-pranesimai-ziniasklaidai-377/kaip-atpazinti-nesaziningus-pardavejus-socialiniuose-tinkluose-vvtat-ir-vmi-dalinasi-atmintine-pirkejams/ (`gy-vvtat-nesaz`). Primary. Written about goods; the page applies the same check to a course, tagged `M`. Not tried by hand on a real seller (GURUS-PLAN, *Before any drafting* 5).
- F717. **A seller in another EU country** (Your Europe, page last checked 2026-09-21; re-read 2026-11-09): the European Consumer Centre in your country can „padėti jums draugiškai susitarti su užsienio prekiautoju“, and first checks that you contacted the trader yourself: „Pirma, pabandykite ginčą su prekiautoju išspręsti tiesiogiai.“ Source: https://europa.eu/youreurope/citizens/consumers/consumers-dispute-resolution/informal-alternative-dispute-resolution/index_lt.htm (`gy-yeu-ecc`). Primary, EU.
- F718. **LPT, 2021: influencers may not urge gambling** (LPT, 2021-05-05, a consultation on gambling ads in social networks, not the law's text): „Lošėjams, nuomonės formuotojams ir kitiems asmenims draudžiama bet kokiais būdais raginti išbandyti lošimus, atlikti parodomuosius lošimus, informuoti apie lošimų laimėjimus, nurodant konkretų lošimų organizatorių, ar kitais būdais skleisti informaciją apie lošimų organizatorius.“ Source: https://lpt.lrv.lt/lt/naujienos/atnaujintoje-konsultacijos-apie-azartiniu-losimu-reklama-socialiniuose-tinkluose/ (`lo-r2`). Primary. Older than the 2024 amendment and the statute was not read, so a page says „LPT 2021 m. išaiškino", never that it is the law today. Left off page 1 at its second read (2026-11-07): a rule for promoters gives the reader no move.
- F719. **The police on "investment" pyramids and their lures** (LRT/ELTA, 2025-07-04, the Kaunas county police): „sukčiai žada greitą pelną, pasyvią grąžą ir netgi rodo tariamus sėkmės pavyzdžius, kad įtrauktų vis daugiau žmonių“; such schemes last only while new „investuotojų“ pay, then „griūna visa piramidė“; „pagrindiniai sukčių įrankiai – grąža, greiti rezultatai ir spaudimas, ypač pasitelkiant tariamas sėkmės istorijas, pažįstamų rekomendacijas, įtikinamai atrodančius socialinių tinklų įrašus“; when in doubt about an offer to invest, „visada verta pasitarti su specialistais, pasitikrinti informaciją internete, įsitikinti, ar veikla registruota ir prižiūrima“. The same article, quoting the head of the Kaunas county criminal police's property crime board: the scheme „pasitelkia socialinius tinklus ir draugų rekomendacijas“; it is built so that „pirmieji „investuotojai“ gauna tariamą pelną iš vėliau prisijungusiųjų įnašų“; „Pajamos nėra gaunamos iš jokios realios veiklos – schema remiasi naujų „investuotojų“ pinigais. Kol pinigų srautas nesustoja, viskas atrodo patikima. Tačiau kai tik naujų „investuotojų“ nebelieka, sistema žlunga, palikdama gyventojus be jų turėtų pinigų“ (these three added 2026-11-07 for B53, read from the saved text). Source: https://www.lrt.lt/naujienos/lietuvoje/2/2603154/policija-perspeja-apie-sukciu-naudojama-ponzi-principu-grindziama-apgaules-schema (`tr-lrt-ponzi`). Secondary, republishing the police. The article names one platform as an example; the page does not.
- F720. **LPT's free help line, for relatives too** (LPT, updated 2026-02-18): „+370 5 233 62 41“, „Konsultacijos nemokamos.“; its specialists advise „problemų turinčius asmenis ir jų artimuosius“. Source: LPT's page „Konsultavimas", in its section „Pagalba lošėjams" (https://lpt.lrv.lt/lt/apribojusiu-savo-galimybe-losti-asmenu-registras/pagalba-losejams/konsultavimas/, `lo-h1`; re-read at that address on 2026-11-07). Primary. LPT's own definition calls the addiction „psichikos sutrikimas"; the page does not put that word at the reader.

**Not used:** LPT's 2,204 blocked sites, its site-check tool, self-exclusion and the 2028 ad ban (for a glossary entry on illegal casinos, parked until a source says what a player loses there; GURUS-PLAN page 2); Lietuvos bankas 2019 on CFD losses and „greitą praturtėjimą" (said again in 2025–2026 by F712 and F104); Lietuvos bankas 2026-11-05 on 27 blocked crypto sites (a row for `netikras-brokeris`); EU Directive 2005/29's pyramid and limited-time bans (for `/zodynas/piramide/`); a Bigbank press release on day traders (a bank's marketing, no source).

**Not found:** any Lithuanian official decision, fine, court case or press story naming or describing a course seller or a paid signals group as a scam; anything Lithuanian on paid betting-tip VIP groups or fixed matches; the consolidated refund rules for online courses (EU 2011/83 as amended in 2019, Civil Code 6.228(10)), so the page says nothing about refunds; how to stop a recurring card payment to a group; Lietuvos bankas's way to check an individual (not a firm) who gives tips; how many Lithuanians pay for such courses.

**B51. From an ad to a Telegram group: the „consultant", the profit on screen, who is writing, and what Telegram itself offers** (read by Opus on 2026-11-07 from the raw text of each page; found by two Sonnet research agents the same day). Raw pages: `%TEMP%\seo5\` (`tg-lt-` Lithuanian, `tg-fx-` Telegram and foreign official); every quote below was matched against them by script (45 of 45), and the script was shown to fail on a false quote and a missing file. Already recorded and reused, not repeated here: F2, F13, F14, F15, F104, F118, F190, F305, F337, F348, F351, F353, F414, F418, F459, F462, F465, F466, F467, F469, F471, F473. B50 (F710–F720) and F721–F739 belong to the guru pages on `copy/prekybos-kursai`.

- F740. **From a Facebook or Instagram ad to a Telegram group, and the „consultants" in it** (Lietuvos bankų asociacija, 2023-12-15; https://www.lba.lt/lt/apie-mus/asociacijos-naujienos/investiciniai-sukciai-siauteja-telegram-programeleje, `tg-lt-lba`; the same text on LRT, `tg-lt-lrt_siaut`): „sukčiai reklamuojasi socialiniuose tinkluose „Facebook“ ir „Instagram“, o vėliau susidomėjusį asmenį nukreipia į „Telegram“ programėlėje sukurtas specialias pokalbių grupes."; „Tokių grupių pavadinimai nuolat kinta, kuriamos naujos."; „tariami „investavimo konsultantai“ prisistato skirtingais lietuviškais vardais ir pavardėmis"; „atsiunčiamos sąskaitos ir prašymas pervesti pinigus per ne Lietuvoje veikiančias bendroves"; a person „keletą mėnesių gauna įspūdingą „investicinę grąžą“. Tuomet, kai sukčius įgauna gyventojo pasitikėjimą, įtikina jį pervesti dar kelias reikšmingesnes pinigų sumas, kurių vėliau nebegrąžina."; „Dažnai sukčiai gyventojus moko, kaip bendrauti su savo finansų įstaiga, kad jai nekiltų įtarimas"; „Kilus įtarimui, kad bendraujate su apsimetėliais, iškart nutraukite pokalbį." Primary, the banks' association. Dated 2023: a page says so when it uses it. It does not say who writes in the groups, nor that any member is a bot.
- F741. **Who writes: hired Lithuanian speakers and AI; centres of hundreds** (15min, 2026-02-19, the police's annual review; https://www.15min.lt/verslas/naujiena/finansai/policija-ispeja-apie-naujus-sukciu-metodus-siuloma-prekyba-auksu-ir-pasitelkiamas-dirbtinis-intelektas-662-2625042, `tg-lt-15min_ai`): per the police deputy commissioner general Oksana Plesko, „sukčiai mokosi, samdo lietuviškai kalbančius darbuotojus ir pasitelkia dirbtinį intelektą, kad pokalbius pradėtų lietuvių kalba."; „Didžiausiuose centruose dirba šimtai, kartais ir tūkstančiai darbuotojų". About scams in general, not Telegram groups in particular. Secondary (a paper reporting her words).
- F742. **One operator, many chats, possibly an AI agent** (15min, 2026-03-13, a Tele2 press release, product manager Donatas Drakickas; https://www.15min.lt/verslas/naujiena/mokslas-it/kas-penkias-minutes-vis-nauja-sukciu-ataka-dirbtinis-intelektas-padeda-apgauti-greiciau-nei-bet-kada-1290-2640366, `tg-lt-15min_5min`): „šiandien jau įmanoma integruoti DI agentus į žinučių platformas, tokias kaip „Telegram“ ar „WhatsApp“, todėl vienas operatorius gali valdyti daugybę pokalbių, o auka net nesupras, jog bendrauja ne su žmogumi." A statement of what is possible, from a telecom company; no case is given. A page says „gali", never that a given chat was a bot.
- F743. **Telegram groups, profit examples, fees to withdraw; AI makes the profile, the messages, even a short video call** (15min, 2026-09-23, Luminor's head of fraud prevention Mindaugas Kutkaitis; https://www.15min.lt/verslas/naujiena/finansai/finansiniai-sukciai-vis-dazniau-taikosi-i-jaunima-kaip-atpazinti-pavojingas-schemas-662-2769548, `tg-lt-15min_jaun`): such messages „gali pasirodyti „TikTok“, „Instagram“, „Facebook“ ar „Telegram“ grupėse"; „Jie rodo tariamus pelno pavyzdžius, pasakoja sėkmės istorijas, ragina pradėti nuo nedidelės sumos. Tačiau vėliau žmogus dažnai spaudžiamas įnešti vis daugiau pinigų, o bandant juos atsiimti atsiranda papildomi mokesčiai"; AI tools to „kurti įtikinamas nuotraukas, sklandžiai rašyti žinutes ar net imituoti trumpus vaizdo skambučius. Todėl vien gražus profilis, taisyklinga kalba ar trumpas pokalbis vaizdu dar nėra patikimumo įrodymas." The article is about young people; the lines are general.
- F744. **The profit that grows on a site or in an app; then fees, or silence** (15min, 2026-09-15, a Luminor press release; https://www.15min.lt/verslas/naujiena/investavimas/pazadejo-greita-pelna-paliko-be-santaupu-kaip-veikia-investiciniai-sukciai-1790-2763822, `tg-lt-15min_pazad`): „Potencialios aukos nukreipiamos į profesionaliai atrodančias interneto svetaines ar programėles, kuriose matomas tariamai augantis investicijų pelnas."; „Tačiau panorėjus išsiimti pinigus paaiškėja, kad tam reikia sumokėti papildomus mokesčius arba ryšys su „konsultantais“ tiesiog nutrūksta."; „Vienas dažniausių investicinio sukčiavimo požymių – spaudimas priimti sprendimą čia ir dabar."; among the lures, „dirbtinio intelekto sugeneruoti neva žinomų žmonių vaizdo įrašai ir pažadai per kelias savaites padvigubinti investicijas". It does not name Telegram.
- F745. **Revolut: Telegram the fastest-growing source of reported scams** (15min, 2026-02-26, Revolut's press release on its fourth consumer security report; https://www.15min.lt/verslas/naujiena/finansai/sparciai-kinta-sukciu-taktika-lietuvoje-sioje-platformoje-ju-veikla-smarkiai-isaugo-662-2629918, `tg-lt-15min_taktika`): „„Telegram“ pokalbių programėlė įvardyta kaip sparčiausiai augantis sukčiavimo šaltinis."; „iš „Telegram“ kylančių sukčiavimo atvejų skaičius pernai išaugo net 233 proc." (Revolut's customers worldwide); in Lithuania „dauguma praneštų sukčiavimo atvejų 2025 m. prasidėjo „Facebook“ ir „Telegram“ (atitinkamai 38 proc. ir 21 proc.)." Scams of every type its customers reported, one company's customers only; not a share of investment fraud or of losses.
- F746. **Lietuvos bankas: investing offered in messaging apps such as Telegram; a „personal consultant"; the list of 300+; the exact name** (Lietuvos bankas, 2025-07-08; https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-del-nelegalios-citadel-coinlink-gs-investment-group-ir-tofro-veiklos, `tg-fx-lbtg`): „Lietuvos bankas įspėja, kad socialiniuose tinkluose ir įvairiose susirašinėjimų programėlėse (pvz., Telegram) yra siūloma investuoti į finansines priemones ir kriptoturtą naudojantis nelegaliai šias paslaugas siūlančių subjektų" platforms; among what they promise, „„asmeninio konsultanto (brokerio) priskyrimas“"; its list of firms with no right to offer financial services: „Jame – jau daugiau kaip 300 įmonių."; „įmonės pavadinimas turi tiksliai sutapti su nurodytu Lietuvos banko interneto svetainėje." Primary. It names four platforms; a page names none (ARCHITECTURE §6.7). Recorded as not used in B49 (Citadel); used here for the Telegram line.
- F747. **Two police cases** (both primary police reports, carried by the press): Biržai (tv3.lt, 2026-09-25; https://www.tv3.lt/naujiena/lietuva/sukciai-is-zmoniu-isviliojo-daugiau-nei-225-tukst-euru-gatveje-melavo-apie-avarijas-itikino-investuoti-ejo-i-namus-n1554272, `tg-lt-tv3115`): a man born 2004 „Biržuose, rugsėjo 19 d., programėlėje „Telegram“ rado skelbimą dėl galimybės investuoti pervedant pinigus į banko sąskaitą. Vyras pervedė pinigus į nurodytą sąskaitą ir pinigų neatgavo. Jam padaryta 360 eurų turtinė žala." Panevėžys (LRT, 2025-11-12; https://www.lrt.lt/naujienos/lietuvoje/2/2743037/sukciai-is-telegram-per-tris-menesius-is-moters-isviliojo-per-25-tukst-euru, `tg-lt-lrt25`): „Garbaus amžiaus panevėžietė platformoje „Telegram“ susipažino su asmenimis, jie, siūlydami investuoti, apgaulės būdu iš moters per tris mėnesius išviliojo 25 tūkst. 238 eurus." Neither says how they reached Telegram from an ad, nor whether a group was involved.
- F748. **AI-made videos with famous Lithuanian faces, 500–700 a week at times** (Swedbank's blog, 2026-01-22, quoting Viktoras Daukšas, head of the NGO Debunk.org; https://blog.swedbank.lt/asmeniniai-finansai-pranesimai-spaudai/nauji-sukciu-metodai-dirbtiniu-intelektu-kuriamos-ziniu-laidos-ir-dvigubi-laiskai, `tg-lt-swed`): „Dirbtiniu intelektu generuoto video turinio, naudojamo sukčiavimo schemose, daugėja drastiškai. Kartais per vieną savaitę fiksuojame 500–700 tokių atvejų. Tai įvairiuose socialiniuose tinkluose rodomi vaizdo įrašai, kuriuose – žinomi veidai: nuo futbolininkų iki užsienio televizijos laidų vedėjų, taip pat Lietuvoje gerai žinomų žurnalistų ir politikų veidų."; „Vaizdo įrašai gali būti sugeneruoti tarsi žinių laida". The count is Debunk's, an NGO's, not an official figure; it is cases of such video, not losses. It closes F50's GAP (an AI-made famous-face ad, from a named Lithuanian source), not from an official one.
- F749. **Telegram: a bot is labelled, but the name can mislead** (Telegram's developer pages, no date; https://core.telegram.org/bots, `tg-fx-botintro`): „Bots don't have 'last seen' or online statuses – instead they show a 'bot' label in the chat."; „Bot usernames normally require a 'bot' suffix, but some bots don't have them". The company's own description; read 2026-11-07. A page says the label means a program and its absence proves nothing about who is writing (an AI run through an ordinary account carries no label; that is our inference, `M`).
- F750. **Telegram verifies no user accounts** (https://telegram.org/verify, no date, `tg-fx-verify`): „Sorry, Telegram doesn't verify user accounts at the moment. Verification is only available for large and active official channels, groups and bots."; „verification doesn't give any additional abilities in Telegram - it is simply one of the ways to demonstrate that your channel, group or bot is official." So a „confirmed consultant" is no thing Telegram confirms, and a mark proves no licence to offer investments (our inference, `M`).
- F751. **The FAKE and SCAM labels** (Telegram's EU Digital Services Act page, no date; https://telegram.org/tos/eu-dsa, `tg-fx-dsa`): „Accounts, bots and communities that engage in impersonation or attempt to defraud other users may be marked with a FAKE or SCAM label, which will be displayed on their public Telegram profile." „may be": the absence of a label proves nothing.
- F752. **Report, and save first: messages can be deleted for both sides** (https://telegram.org/faq, no date, `tg-fx-faq`): „All Telegram apps have 'Report' buttons that let you flag illegal content for our moderators"; „Reported accounts can only send messages to people who have their number saved as a contact."; deleting: „To delete individual messages or entire chats for both parties at any time". So the other side can erase the chat on the victim's phone too, and a screenshot or export first is our advice (`M`, with F418's „save everything").
- F753. **FOREIGN (US SEC, 2025-12-22): screenshots of wins, a made-up leader, a fee to withdraw** (https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/gateway-to-investment-scams, `tg-fx-secgw`): „members posted screenshots in the group chats of purportedly successful trades and praised the signals."; the leader „may be a completely made-up person."; „Your account may show "profits." But when you try to withdraw the "profits," fraudsters may demand a fee, tax, or deposit to release the funds." American; its case was on WhatsApp. A page marks it as foreign.
- F754. **FOREIGN (FBI IC3, 2025-07-03): members of an investment „club" may be bots or fake accounts** (https://www.ic3.gov/PSA/2025/PSA250703, `tg-fx-ic3club`): „some of which may be bots or fake accounts. These promotions typically direct victims to secure messaging apps where the group operates." A US warning about share ramp-and-dump clubs; the only official source found that says group members may be bots. A page marks it as foreign and says „gali".
- F755. **FOREIGN (ESMA, the EU securities regulator, no date): AI and guaranteed profit** (https://www.esma.europa.eu/investor-corner, `tg-fx-esmaic`): „Be wary of platforms claiming to use AI for guaranteed profits, as these may be scams." An EU body, not Lithuanian.

**Not used:** the Klaipėda case (Respublika, 2026-10-23, 100 tūkst. eurų after a form, then phone and Telegram): F459's pattern, already on `netikras-brokeris`. Tele2's line that a chat moved to a „saugesnę" app is where AI agents take over: stated more strongly than F742 and with no case. SEB on paid tasks (2025-10-24): F414 already holds it. Lietuvos bankas's „Investavimas: kaip atpažinti sukčius" (updated 2024-10-28): F14, F190, F462, F473 already hold it. The CFTC (US, 2024-01-25: AI cannot predict the market; fake balances on demo accounts), the FBI IC3 (2024-12-03: AI-made profiles), ESMA's letter to platforms (2025-05-28; a request, not proof of action) and Telegram's terms of service: the page has enough without them. The four platforms Lietuvos bankas names (§6.7). Revolut's job-scam share: not read at its source.

**Not found:** a Lithuanian case where a „consultant" was shown to be a bot or AI; a Lithuanian source on fake members in an investment group, on a Telegram bot that shows a balance, or on USDT deposits; Telegram's share of Lithuanian investment-fraud losses; a Lithuanian source naming reporting to Telegram itself. Delfi refused the search tool; NKSC and policija.lrv.lt were not reached; NordVPN's Lithuanian page was a bot challenge (not got around).

**B52. Illegal online casinos and the people who advertise them (`/zodynas/nelegalus-kazino/`)** (read by Opus on 2026-11-07 from the raw text of each page; found by a Sonnet research agent the same day, after the `lo-*` pages of the survey in `docs/GURUS-PLAN.md`). Raw pages: `%TEMP%\seo4g\` (`g2-*` this pass, `lo-*` the survey); every quote below was matched against them by script (30 of 30, and a planted false quote was reported missing). B51 is another session's. F718 (LPT 2021, influencers may not urge gambling), F720 (LPT's free line), F384 (gambling accounts in money mule schemes), F2, F14 and F15 are reused. Page 2's gate in GURUS-PLAN (an official, dated sentence on what a player risks at an illegal site) is passed by F721 and F723.

- F721. **The player risks the money paid in, and no Lithuanian institution defends it** (LPT, 2022-01-28, news item „Iš nelegalių azartinių lošimų gauti pinigai atiteks valstybei"): „Lošimų priežiūros tarnyba taip pat atkreipia dėmesį, kad lošiantys nelegaliose nuotolinių lošimų svetainėse rizikuoja savo įmokėtais pinigais, o galimo ginčo atveju jų teisių ir interesų negina Lietuvos valstybes institucijos." („valstybes" is the page's own typo.) Same page: „Lietuvoje azartinius lošimus leidžiama organizuoti tik turint Lošimų priežiūros tarnybos išduotą licenciją šiai veiklai vykdyti." Source: https://lpt.lrv.lt/lt/naujienos/is-nelegaliu-azartiniu-losimu-gauti-pinigai-atiteks-valstybei/ (`g2-atiteks`). Primary. Says nothing about how often money is lost.
- F722. **Winnings from an illegal site went to the state** (same page, LPT repeating an FNTT release): „Finansinių nusikaltimų tyrimo tarnyba (FNTT) paskelbė, jog ikiteisminio tyrimo metu konfiskuoti daugiau nei 422 tūkst. eurų bus pervesti į valstybės biudžetą, teismui pripažinus, kad pinigai gauti iš nelegalių azartinių lošimų." The pre-trial investigation began in 2020 over an unusually large sum paid into a Kaunas resident's account; the money was suspected to come from „žaidžiant nelegalius azartinius žaidimus" on a site on LPT's illegal-operators list; „Tokio leidimo neturinčios įmonės yra pripažįstamos lošimų veiklą organizuojančios nelegaliai." Primary for what LPT and FNTT announced; the court's ruling and FNTT's own release were not seen. One case; the person and the company are not named, and the page does not name them either. It does not say the player was charged with anything.
- F723. **LPT cannot help with unpaid winnings from a foreign site without a Lithuanian licence** (LPT, „Dažniausiai užduodami klausimai", updated 2026-01-30, answer to „Kokių imtis veiksmų ir kur kreiptis dėl užsienio internetinės lošimų bendrovės nesąžiningo elgesio, laimėtų pinigų neišmokėjimo?"): „Atsižvelgiant į tai, kad Jūs kreipėtės dėl užsienio internetinės lošimų bendrovės, kuri neturi licencijos organizuoti azartinius lošimus Lietuvoje, Priežiūros tarnyba neturi galimybių taikyti poveikio priemonių ir apginti Jūsų interesų, laimėtų pinigų neišmokėjimo klausimu."; „Siūlome kreiptis į užsienio internetinei lošimų bendrovei licenciją išdavusią instituciją (kontaktai būna nurodomi interneto svetainės apačioje, kontaktų skiltyje)." The same FAQ, on payment providers, speaks of illegal operators „įtrauktiems į Priežiūros tarnybos Nelegalios lošimų veiklos vykdytojų sąrašą ir turintiems užsienio šalies išduotą lošimų licenciją": a foreign licence does not take a site off the illegal list. Source: https://lpt.lrv.lt/lt/dazniausiai-uzduodami-klausimai/ (`g2-duk`). Primary. Does not say such a body will help.
- F724. **Money left on a blocked illegal site: write to the address in LPT's list** (same page, answer to „Kokių imtis veiksmų ir kur kreiptis dėl lošėjo piniginių lėšų atsiėmimo užblokuotoje nelegalios lošimų veiklos vykdytojo svetainėje?"): „Priežiūros tarnyba rekomenduoja lošėjui dėl išmokėjimo kreiptis elektroninio pašto adresu, kuris visada yra pateikiamas Nelegalios veiklos vykdytojų sąraše" (https://lpt.lrv.lt/lt/nelegalios-losimu-veiklos-vykdytojai/nelegalios-losimu-veiklos-vykdytoju-sarasas) „šalia konkrečios nelegalios lošimų svetainės." Primary. Says nothing about whether it works.
- F725. **Why a foreign betting site will not open** (same page, „Kodėl man neleidžia prisijungti prie užsienio lažybų svetainių?"): the sites „priklauso bendrovėms, kurios neturi Lošimų priežiūros tarnybos išduotos licencijos ir leidimo organizuoti nuotolinius lošimus Lietuvoje"; LPT may order Lithuanian electronic-communications providers to „panaikinti galimybę pasiekti informaciją, kuri naudojama siekiant nelegaliai vykdyti lošimus. Dėl šios priežasties, nelegalūs tinklalapiai yra blokuojami." The same page says payment and credit institutions are ordered to stop payments with an illegal operator, „įskaitant atsiskaitymus už dalyvavimą … laimėjimų išmokėjimus". Primary.
- F726. **2,204 illegal sites blocked** (LPT, 2026-09-08): „Iš viso iki šiol yra užblokuotos 2204 nelegalios nuotolinių lošimų svetainės." Source: https://lpt.lrv.lt/lt/naujienos/po-lpt-tyrimo-uzblokuota-prieiga-prie-polymarket-svetaines-Jno/ (`g2-polym`, `lo-p8`). Primary. The Finance Ministry gave 1,809 blocked from 2016 to the end of 2024 (F730's page).
- F727. **What a blocked visitor sees** (https://blokuojama.lpt.lt/, no date, read 2026-11-07): the site „yra blokuojama dėl joje vykdomų nelegalių nuotolinių lošimų"; contact „blokavimas@lpt.lt" (`lo-blok`). Primary.
- F728. **LPT's check before you play** (LPT, updated 2026-05-14): a page titled „Patikrinkite, ar lošimų svetainė Lietuvoje veikia legaliai" (https://lpt.lrv.lt/lt/patikrinkite-ar-losimu-svetaine-lietuvoje-veikia-legaliai/, `lo-p2`). Primary. How the check itself works was not tried.
- F729. **Asking not to be allowed to gamble, and whom it binds** (LPT, updated 2026-08-05, „Prašymų neleisti lošti pateikimas"): three routes, „Elektroniniu būdu portale „Elektroniniai valdžios vartai"", at a gambling venue, or „tiesiogiai atvykus į Priežiūros tarnybą"; „Už asmenų, pateikusių prašymus, įleidimą į lošimų organizavimo vietas atsakingi tampa lošimų organizatoriai." Source: https://lpt.lrv.lt/lt/apribojusiu-savo-galimybe-losti-asmenu-registras/pagalba-losejams/prasymu-neleisti-losti-pateikimas/ (`lo-h4`). Primary. It binds licensed organisers; no source says an illegal site checks it (the page may say only that). Filed by the player.
- F730. **Card payments to illegal sites are to be blocked, and the blocking is still being improved** (Finance Ministry, 2025-01-14, updated 2025-01-20: the Seimas passed its proposals): „Bandant lošti nelegaliuose portaluose mokėjimai bus blokuojami"; „LPT nuo 2016 metų iki 2024 metų pabaigos blokavo 1809 nelegalias interneto svetaines" (https://finmin.lrv.lt/lt/naujienos/seimas-pritare-finansu-ministerijos-siulymams-kurie-pades-kovoti-su-nelegaliais-nuotoliniais-losimais/, `g2-finmin3`). LPT, 2026-07-24, after meeting Lietuvos bankas and the ministry, on the need to „ieškoti efektyvesnių mokėjimų blokavimo sprendimų" (https://lpt.lrv.lt/lt/naujienos/susitikime-aptartas-mokejimu-blokavimo-priemoniu-efektyvumas-rjK, `g2-blokmeet`). Primary. The date the card blocking took effect was not found.
- F731. **Support group for relatives** (LPT, updated 2026-11-03, „Lošėjų artimųjų paramos grupė", in its section „Pagalba lošėjams"): once a month, „savitarpio paramos grupės, skirtos artimiesiems, kurių aplinkoje yra asmuo, turintis problemų dėl azartinių lošimų" (https://lpt.lrv.lt/lt/apribojusiu-savo-galimybe-losti-asmenu-registras/pagalba-losejams/loseju-artimuju-paramos-grupe/, the address LPT's own help pages link, `lo-h2`). Primary.
- F732. **The ad ban** (LRT, 2024-11-12: the Seimas passed it; „Iki 2028 m. sausio 1 d. lažybų reklama taip pat dar bus leidžiama interneto svetainėse.", https://www.lrt.lt/naujienos/verslas/4/2411312/seimas-uzdraude-azartiniu-losimu-reklama-lietuvoje-visiskai-dings-po-3-metu, `lo-n2`; LRT, 2025-07-01, quoting LPT: „pokyčiai yra pereinamieji, prieš įsigaliosiant visiškam lošimų reklamos draudimui 2028-aisiais.", https://www.lrt.lt/naujienos/verslas/4/2600468/isigalioja-losimu-reklamos-apribojimai-galios-iki-visisko-draudimo-2028-metais, `lo-n1`). Secondary. The statute was not read, so no article numbers.
- F733. **FOREIGN: what the British regulator sees at unlicensed sites** (UK Gambling Commission, blog by its Director of Enforcement, 2025-10-21): „Consumers face increased risks from unfair gaming practices, financial loss, and a lack of recourse if things go wrong. We are also aware that some illegal gambling sites are blocking payouts or setting withdrawal limits so high they're unattainable."; unlicensed operators target consumers by „exploiting social media platforms". Source: https://www.gamblingcommission.gov.uk/blog/post/confronting-the-threat-how-were-tackling-illegal-gambling-in-great-britain (`g2-ukgcblog`). Primary, British; on a page it is attributed as the British regulator's, never as Lithuanian.

**Not used:** Swedbank's page that it restricted card payments to illegal operators on LPT's orders (no date on the page); the UK Gambling Commission's 2019-20 report (older, F733 says it now); an opinion piece by the head of the Atsakingo lošimų verslo asociacija (paninfo.lt, 2022-04-01) and an association quote in LRT, both an interested party, on bonuses and no protection; alkas.lt (2024-11-07) on a bill to set 21 as the minimum age for all gambling (secondary, a bill, in force not confirmed); the EU TRIS notification (loads by script, empty).

**Not found:** any LPT decision, court ruling, police case or press story about a Lithuanian influencer or streamer advertising an illegal casino, so the page names none and says it found none; any Lithuanian official source that an illegal casino keeps or refuses winnings as a practice (F723 and F724 answer a player whose winnings were not paid; only the British regulator, F733, says some sites block payouts); the minimum age for remote gambling in force today; a "block gambling" setting in a Lithuanian bank's app; anything official on crypto casinos, Telegram casino bots or mirror domains in Lithuania; when the card blocking took effect.

## B70. Privacy: what is collected, what leaks, and your rights (`/temos/privatumas/`), read 2026-11-07

Researched by two Sonnet agents on 2026-11-07; every quote below was matched by script (`verify_pv.py`, `verify_pv2.py`) against the saved page's text in `%TEMP%\kurj\` (prefixes `pv-` and `pv2-`), or read there by hand where the text splits a menu label onto its own lines. Pages without a date are "read 2026-11-07". The /irankiai/ session's B71–B73 (F950–F982) hold the VPN and GrapheneOS facts this page also cites.

- F900. **Android: delete the advertising ID** (Google's Lithuanian ads policy page, no date): „„Android“ įrenginyje eikite į skiltį Nustatymai. Palieskite Privatumas > Skelbimai." then the option „Ištrinti reklamavimo ID" (or „Iš naujo nustatyti reklamavimo ID", which replaces it with a new one); afterwards „Nematysite skelbimų pagal šį reklamavimo ID, bet vis tiek gali būti rodomi skelbimai pagal kitus veiksnius, pvz., informaciją, kurią bendrinate su programomis." Source: https://policies.google.com/technologies/ads?hl=lt (`pv-polads`). Primary. It does not say ads stop, and makers other than Google may word the menu differently.
- F901. **What an app sees after the ID is deleted** (Google Play's developer policy, Lithuanian, dated 2022 m. balandžio 1 d. on the page): „Bandant pasiekti identifikatorių bus pateikta eilutė su nuliais vietoj identifikatoriaus." Source: https://support.google.com/googleplay/android-developer/answer/6048248?hl=lt (`pv-adid2`). Primary, written for developers.
- F902. **Android permissions** (Android help, Lithuanian, no date): the choices „Visas laikas" (location only), „Leisti tik naudojant programą: programa gali naudoti leidimą tik tada, kai naudojate šią programą.", „Klausti kaskart", „Neleisti"; per app: Nustatymai → Programos → the app → Leidimai; by type: „Sauga ir privatumas" → „Privatumas" → „Leidimų tvarkytuvė". Source: https://support.google.com/android/answer/9431959?hl=lt (`pv-perm`). Primary; Samsung and other makers may word the menus differently.
- F903. **iPhone: stop apps asking to track** (Apple's Lithuanian iPhone guide, „„iPhone“ programų sekimo leidimų valdymas", no date): „Pasirinkite „Nustatymai“ > „Privatumas ir saugumas“ > „Sekimas“." then „išjunkite „Leisti programoms teikti sekimo prašymą“". Source: https://support.apple.com/lt-lt/guide/iphone/iph4f4cbd242/ios (`pv-atti`). Primary. The Lithuanian label differs from the 2026-10-02 notes in `docs/LANDING.md` („Leisti programoms prašyti leidimo sekti"); this one is Apple's own.
- F904. **What refusing does on iPhone** (Apple, English text on the lt-lt address, „Publikavimo data: 2025 m. gruodžio 19 d."): "If you choose Ask App Not to Track, the app developer can't access the system advertising identifier (IDFA)" and the app may not track you by other identifying information such as your email address. Source: https://support.apple.com/lt-lt/102420 (`pv-att`). Primary, untranslated.
- F905. **Apple's own personalised ads** (Apple's Lithuanian iPhone guide, no date): „Pasirinkite „Nustatymai“ > „Privatumas ir saugumas“ > „Apple“ reklama“, tada įjunkite arba išjunkite „Individualizuota reklama“." and „Jūsų gaunamos reklamos kiekis gali nesumažėti." Source: https://support.apple.com/lt-lt/guide/iphone/iphf60a6a256/ios (`pv2-appadsguideLT`). Primary. The label is „Individualizuota reklama", not „Suasmenintos reklamos" as `docs/LANDING.md` has it.
- F906. **Google: search history is moving to a new setting, mid-rollout** (Google help, English on the ?hl=lt address, no date): "We're currently updating settings for Google Search services … These are rolling out gradually over the next few months. If the settings in this article do not match what you see, history and personalized recommendations for Search services are still controlled by Web & App Activity."; in My Google Activity choose Search Services History, then "Turn off" or "Turn off and delete activity". Google's Lithuanian account help carries the same notice and names the setting „Paieškos paslaugų istorija" (the old one: „Žiniatinklio ir programų veikla"). Sources: https://support.google.com/websearch/answer/17024959?hl=lt (`pv-ws`), https://support.google.com/accounts/answer/3118687?hl=lt (`pv-myact`). Primary.
- F907. **Google: auto-delete** (Google account help, Lithuanian, no date): „Kairėje spustelėkite Duomenys ir privatumas. Skiltyje „Istorijos nustatymai“ spustelėkite veiklą … Spustelėkite Automatinis ištrynimas. Spustelėkite mygtuką, kiek laiko norite saugoti veiklą."; deleting by hand: myactivity.google.com → „Ištrinti" → „Visas laikotarpis". Source: https://support.google.com/accounts/answer/465?hl=lt (`pv-autodel`). Primary. The page read today does not list the periods (`docs/LANDING.md` proposes 3 months), so the page does not state them.
- F908. **Laiko skalė (location history) is off by default and kept on the phone** (Google account help and Maps help, Lithuanian, no date): „Laiko skalė išjungta pagal numatytuosius nustatymus."; when on, „tiksli įrenginio vietovė reguliariai išsaugoma įrenginyje", with an optional encrypted backup on Google's servers. Sources: https://support.google.com/accounts/answer/3118687?hl=lt (`pv-myact`), https://support.google.com/maps/answer/6258979?hl=lt (`pv-timeline`). Primary.
- F909. **Google's personalised ads** (Google ads help, Lithuanian, no date): in „Mano skelbimų centras" you can „įjungti arba išjungti suasmenintus skelbimus sistemoje „Google“"; „Skelbimų tinkinimas nereiškia, kad jums bus rodoma daugiau ar mažiau skelbimų". Source: https://support.google.com/ads/answer/2662856?hl=lt (`pv-gads`). Primary. The exact switch's steps were not captured.
- F910. **Meta is withdrawing the off-Meta switch** (Meta newsroom, "June 8, 2026"): Meta "will no longer offer the “Your activity off Meta technologies” setting that lets you disconnect activity that businesses share with us from your account"; the control left, which is being expanded, is "Activity from other businesses" ("formerly known as “Activity information from ad partners”"), which governs how Meta uses the data, not whether businesses send it — "If you don't, we won't use this information to show you more relevant ads or other content." — and Meta will also use this data for "the content you see in your Feed and AI responses"; "These control and data-use changes will go into effect in the US and a number of other countries next month with more countries to follow." Source: https://about.fb.com/news/2026/06/better-personalization-and-changes-to-controls-for-your-activity-from-other-businesses/ (`pv-metanews`, `pv2-metanews2`). Primary. **The EU and Lithuania are not named**; whether the old switch is still there for a Lithuanian account is unknown, so the page tells the reader to look for it, not that it exists. The page's head shows both "June 9, 2026" and "June 8, 2026"; `docs/LANDING.md` says 9 June.
- F911. **Pixel: no location in photos** (Pixel Camera help, Lithuanian, no date): „Atidarykite Fotoaparato programą. Apačioje kairėje palieskite „Nustatymai“ > Daugiau nustatymų. Išjunkite parinktį Išsaugoti vietovę." Source: https://support.google.com/pixelcamera/answer/2838995?hl=lt (`pv-pixloc`). Primary; Pixel only.
- F912. **iPhone: no location in photos** (Apple Personal Safety guide, English, "Published Date: September 2026"): "Location metadata in photos and videos can be collected only if your Camera app has access to Location Services." and "Go to Settings > Privacy & Security > Location Services > Camera, then tap Never." Source: https://support.apple.com/guide/personal-safety/manage-location-metadata-in-photos-ips0d7a5df82/web (`pv2-appmetaen`). Primary. The Lithuanian labels of the Camera path are not confirmed (the lt-lt page is mostly English); Apple's Lithuanian page names the setting „vietos nustatymo paslaugos" (`pv-ioscamloc`, https://support.apple.com/lt-lt/102515).
- F913. **A company must answer within a month** (BDAR 12 str. 3 d., Lithuanian text on EUR-Lex): „ne vėliau kaip per vieną mėnesį nuo prašymo gavimo"; „Tas laikotarpis prireikus gali būti pratęstas dar dviem mėnesiams", and the person is told of an extension within the first month. Source: https://eur-lex.europa.eu/legal-content/LT/TXT/HTML/?uri=CELEX:32016R0679 (`pv-bdar`). Primary.
- F914. **It is free** (BDAR 12 str. 5 d.): „visi veiksmai pagal 15–22 ir 34 straipsnius yra nemokami"; for requests „akivaizdžiai nepagrįsti arba neproporcingi" the controller may charge a reasonable fee or refuse. Same source. Primary.
- F915. **A refusal must give reasons and name the complaint route** (BDAR 12 str. 4 d.): the controller „informuoja duomenų subjektą apie neveikimo priežastis ir apie galimybę pateikti skundą priežiūros institucijai". Same source. Primary.
- F916. **The right to see your data** (BDAR 15 str.): the person „turi teisę iš duomenų valdytojo gauti patvirtinimą, ar su juo susiję asmens duomenys yra tvarkomi, o jei tokie asmens duomenys yra tvarkomi, turi teisę susipažinti su asmens duomenimis" (with purposes, categories, recipients and more). Same source. Primary.
- F917. **The right to erasure** (BDAR 17 str.): the person has the „teisę reikalauti, kad duomenų valdytojas nepagrįstai nedelsdamas ištrintų su juo susijusius asmens duomenis" where one of the article's grounds applies. Same source. Primary. Not absolute: the article lists grounds and exceptions, so the page says „gali paprašyti", not „privalo ištrinti".
- F918. **Saying no to direct marketing** (BDAR 21 str. 2–3 d.): „duomenų subjektas turi teisę bet kuriuo metu nesutikti"; then „asmens duomenys tokiais tikslais nebetvarkomi". Same source. Primary.
- F919. **VDAI: ask the company first** (VDAI, „Skundų nagrinėjimas", page dated 2025-05-26): „Prieš pateikdami VDAI skundą, pamėginkite išspręsti Jus neraminantį atvejį ar klausimą kreipdamiesi į duomenų valdytoją". Source: https://vdai.lrv.lt/lt/veiklos-sritys-1/skundu-nagrinejimas/ (`pv-vdaiskund`). Primary. Extends F115.
- F920. **VDAI's sample access request** (VDAI presentation of 2025-11-20, „Rekomendacijos dėl teisės susipažinti su duomenimis įgyvendinimo", Kristina Jocaitė): contains a sample headed „PRAŠYMAS SUSIPAŽINTI SU DUOMENIMIS". Source: https://vdai.lrv.lt/public/canonical/1763728192/1169/2025-11-20_Rekomendacijos%20d%C4%97l%20teises%20susipazinti%20su%20duomenimis%20igyvendinimo_Kristina%20Jocaite.pdf (`pv2-teise-susipazinti`). Primary. Its wording was not read beyond the heading; a letter template on our site would need it read first.
- F921. **Breaches reported in 2025** (VDAI annual report 2025, published 2026; the PDF's text lost its diacritics, the numbers read by hand): VDAI received 223 breach notifications, affecting 1 249 409 people in Lithuania (2024: 273 and 1 467 368); 29 % (69) came from cyber incidents and 58 % from human error; of the cyber incidents, 45 % were unauthorised access, 26 % social engineering and phishing, 16 % ransomware. Source: https://vdai.lrv.lt/public/canonical/1772605397/1298/2025m_VDAI_veiklos_ataskaita_galutinis.pdf (`pv-vdai2025`). Primary.
- F922. **Breaches reported in the first half of 2026** (VDAI, „2026 m. ADSP I pusm. apibendrinimas"): „2026 m. I pusm. VDAI buvo gauta 140 pranešimų apie ADSP, Lietuvoje paveiktų duomenų subjektų skaičius – 1 647 399."; 51 (36 %) came from cyber incidents; 87 % were confidentiality breaches. Source: https://vdai.lrv.lt/public/canonical/1784180884/1493/2026%20m_ADSP_Ipusm_apibendrinimas.pdf (`pv2-vdai-2026h1`). Primary.
- F923. **A clinic fined €450,000** (same VDAI summary; LRT, 2026-06-27, names it InMedica): in June 2026 VDAI fined a health-care company „450 tūkst. eurų"; in the second breach an attacker used a privileged account, encrypted the systems, „paveikiant beveik 400 tūkst. duomenų subjektų asmens duomenis", and outside logins had no multi-factor authentication. Sources: the F922 PDF; https://www.lrt.lt/naujienos/verslas/4/2973046/inmedicai-450-tukst-euru-bauda-uz-asmens-duomenu-saugumo-pazeidimus (`pv2-lrtinmedica`). Primary (VDAI) and secondary (LRT).
- F924. **VDAI: scammers use leaked data** (VDAI's statement on the Registrų centras leak, relayed by LRT, 2026-05-22): „piktavaliai naudojasi naujienomis apie incidentus ir pačiais nutekėjusiais duomenimis"; they may pose as „Registrų centro, bankų, policijos, Valstybinės mokesčių inspekcijos, „Sodros“, kitų institucijų ar draudimo bendrovių atstovais, antstoliais, notarais"; „Oficialios institucijos telefonu, SMS žinute ar el. paštu neprašo atskleisti prisijungimo kodų, banko slaptažodžių ar patvirtinti finansinių operacijų."; leaked identity data may be used „bandant sudaryti sandorius ar prisiimti įsipareigojimus asmens vardu". Source: https://www.lrt.lt/naujienos/verslas/4/2936434/duomenu-apsaugos-inspekcija-pradejo-tyrima-del-duomenu-nutekejimo-is-registru-centro (`pv2-vdaityrimas`). Official statement via LRT. Extends F105.
- F925. **VDAI will not take single complaints about the Registrų centras leak** (LRT, 2026-05-26): „Dėl nutekintų duomenų jau pradėtas tyrimas, todėl atskiri skundai nebus nagrinėjami". Source: https://www.lrt.lt/naujienos/verslas/4/2941147/inspekcija-skundai-del-duomenu-saugumo-pazeidimo-registru-centre-nebus-nagrinejami (`pv2-lrtvdainenagr`). Secondary.
- F926. **VDAI: how little makes another „you"** (VDAI, identity theft FAQ, 2025-12-17, the F577 PDF): „Užtenka vos Jūsų vardo, adreso ir gimimo datos, kad būtų galima sukurti kitą „Jus“."; „kuo mažiau informacijos asmuo teiks apie save, tuo mažesnė rizika, kad informacija pateks į netinkamas rankas". Source: https://vdai.lrv.lt/public/canonical/1767943031/1223/2025_12_17_DUK%20Tapatybes%20vagyste.pdf (`pv2-tapatybes-vagyste`). Primary.
- F927. **A telecom's security head: exact data makes the call believable** (Darius Povilaitis, Telia, LRT, 2026-05-27): „Gavę unikalų asmens kodo, vardo, pavardės ir nekilnojamojo turto adreso rinkinį, sukčiai geba kurti neįtikėtinai tikroviškas apgaulės schemas."; a fake bank, VMI or police caller „operuoja tiksliais duomenimis". Source: https://www.lrt.lt/naujienos/verslas/4/2942125/nutekejus-registru-centro-duomenims-ekspertai-ispeja-del-personalizuotu-sukciu-ataku (`pv-lrt1`). Secondary, a company's voice; on a page it is attributed to Telia, never to the state.
- F928. **A bank: the more he knows, the more convincing** (Luminor, LRT, 2026-06-01): „Kuo daugiau informacijos apgavikai turi, tuo įtikinamiau atrodys jų skambučiai, laiškai ar žinutės"; „Kai sukčius jau žino jūsų vardą, pavardę, adresą ar kitą asmeninę informaciją, jis gali atrodyti kur kas patikimesnis."; „nutraukite pokalbį ir perskambinkite oficialiu numeriu". Source: https://www.lrt.lt/naujienos/verslas/4/2943059/ka-sukciai-gali-nuveikti-su-jusu-adresu-ir-asmens-kodu (`pv-lrt2`, `pv2-lrtadresu`). Secondary, a bank's voice.
- F929. **Nobody official calls you about a leak** (LRT, 2026-05-25, Arūnas Girdziušas, head of MB „Cybora"): „Registrų centro darbuotojai, policijos atstovai ar kitų valstybinių institucijų darbuotojai niekada neskambins, nesiųs žinučių ir nebandys kitaip asmeniškai jūsų informuoti apie nutekėjusius duomenis". Source: https://www.lrt.lt/naujienos/mokslas-ir-it/11/2939234/is-registru-centro-nutekeje-duomenys-gali-suaktyvinti-sukcius-kaip-neapsigauti (`pv-lrt3`). Secondary, a company's voice; the page cites it only with VDAI's F924 beside it. His advice not to confirm your name is not used.
- F930. **GetContact uploads your contact book** (GetContact privacy policy, "Last updated: November 1, 2026"): "Where you grant contact permission, we may access, collect, upload, synchronise and process names, phone numbers and related contact information from your device address book"; non-public contact-list data is not published in its public directory unless you allow it, but "Contact-list data may still be used internally for matching". Source: https://www.getcontact.com/en/privacy (`pv-gcpriv`). Primary, the vendor's own policy; no Lithuanian official source mentions GetContact or any caller-ID app.
- F931. **Refusing marketing SMS** (VDAI presentation of 2025-11-20 on complaints and practice): „STOP SMS → tinkamas, jei žinutė nėra papildomai apmokestinama."; „Adresų rinkimas internete = neteisėtas." Source: https://vdai.lrv.lt/public/canonical/1763728192/1168/2025-11-20_Reiksmingu%20skundu%20aptarimas%20ir%20VDAI%20formuojama%20praktika.pdf (`pv2-2025-11-20-skundai`). Primary, slides (terse).
- F932. **Marketing by phone, SMS or e-mail needs your consent first** (VDAI FAQ of 2026-05-19 quoting the Elektroninių ryšių įstatymas, 81 str. 1 d.; the PDF's text lost its diacritics, read by hand): electronic direct marketing „leidžiama tik gavus išankstinį abonento … sutikimą", which is not needed where the subscriber is a legal person; and 81 str. 2 d.: a seller that got a customer's e-mail address while selling may use it for marketing „savo paties panašių prekių ar paslaugų", if the customer is given a clear, free and easy way to object. Source: https://vdai.lrv.lt/public/canonical/1779182967/1405/05-19_DUK_Tiesiogin%C4%97%20rinkodara_juridiniai_asm_svetainei.pdf (`pv-vdaimkt`). Primary; the FAQ is written for legal persons, so the page states only the consent rule.

**Not used:** Lietuvos bankas's 2023-04-26 and 2021-07-09 pages (`pv2-lbsuakt`, `pv2-lbduom`: neither says scammers use leaked data); Vinted's €2.385 million fine (it is about deletion requests, not a leak; LRT English, 2025-05-23); Švaros broliai's €20,000 fine for leaked customer data (tv3, 2023-05-19, older than this page's window); the Registrų centras fine of 2021 (a 2020 incident, unrelated) and VDAI's deputy director on a ceiling of €60,000 for a state body (LRT 2026-05-26, no decision yet); Truecaller's policy (no contact-upload sentence found); a 2022 user bug report on Telegram's tracker about photo location (not a vendor statement); techpp.com and thehackernews.com on Meta in the EU (blocked or empty); VDAI's „teisė būti pamirštam" FAQ of 2026-05 (written for organisations) and its 2022 data-brokerage paper (not read in depth).

**Not found:** whether WhatsApp, Signal, Telegram or Messenger remove location from a photo (their help pages were script-only shells or answered 403; no vendor statement read), so the page says only to switch location off in the camera; Meta's status in the EU and the Lithuanian label of "Activity from other businesses"; Samsung's camera location setting; the Lithuanian labels of the iPhone Camera location path; any Lithuanian official word on caller-ID apps (GetContact, Truecaller); RRT guidance for people on refusing marketing calls; where companies get phone numbers; a police or NKSC statement of its own on leaked data (not searched); Lithuanian leaks of 2024–2026 other than Registrų centras (F105), Booking.com (F443) and the clinic (F923) with a source read (bilietai.lt and CityBee were headlines only).

**B53. The financial pyramid (`/zodynas/piramide/`)** (read by Opus on 2026-11-07 from the raw text of each page, found by a Sonnet research agent the same day; every quote below was checked by script against the saved text, 14 of 14, with a false quote fed in as a control and reported missing. Raw pages: `%TEMP%\seo4g`, prefix `pi-`, plus `gy-eurlex-ucpd` from the plan's pass; a temp folder, re-fetch from the URLs if gone). F756 and F757 sit after B51's F740–F755, which another session took the same day. F719 (the police on Ponzi schemes, 2025), F118 (Lietuvos bankas's register), F466 (stop and transfer nothing more), F2, F14 and F15 are reused. No person or company is named on the page, though every Lietuvos bankas page below names the scheme it is about (the owner's decision, 2026-11-07).

- F734. **How a pyramid looks, in Lietuvos bankas's words** (2012-09-10, a scheme LB reported to the Prosecutor General's Office): its Lithuanian-language website urged people to join by paying in a sum; „Sistemos dalyviams žadama finansinė nauda, kuri, kaip nurodoma tame pačiame tinklapyje, tiesiogiai priklausys nuo pritrauktų dalyvių ir į sistemą įneštų lėšų. Taip pat žadama, kad pajamos, įsitraukus į sistemą, esą bus reguliarios ir nuolat augs." LB „ragina gyventojus, prieš kam nors patikint savo pinigus, įsitikinti, ar toks asmuo yra licencijuotas"; licensed providers are listed on LB's website. Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-perspeja-gyventojus-del-itariamos-gold-line-international-finansu-piramides-del-jos-veiklos-kreipesi-i-lr-generaline-prokuratura (`pi-gold`). Primary. It describes one suspected scheme in 2012, not a court's finding; on a page it is LB's description of what such a scheme promises.
- F735. **Who may take people's money to pay back** (Lietuvos bankas, F734's page, 2012): „Lietuvoje išimtinę teisę priimti indėlius ir kitas grąžintinas lėšas iš neprofesionalių rinkos dalyvių turi tik licencijuotos kredito įstaigos." The 2013 page (F736) says the same: such activity „gali tik kredito įstaigos (bankai ir kredito unijos)". Primary, 2012–2013; the statute itself was not read, so a page says it as LB's statement with its date.
- F736. **Double your money by bringing in new people** (Lietuvos bankas, 2013-05-30, another scheme reported to the Prosecutor General's Office): its website described how, „pervedus pinigus į nurodytas sąskaitas ir į sistemą įtraukus naujų dalyvių, esą galima padvigubinti savo pasirinktą pinigų sumą"; „Todėl darytina išvada, kad vykdoma veikla galimai atitinka finansinės piramidės veiklos požymius." Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-del-itariamos-finansines-piramides-kreipesi-i-generaline-prokuratura (`pi-lbfin`). Primary. „galimai": LB's suspicion, not a finding.
- F737. **How they all end** (Lietuvos bankas, 2012-03-16, the chairman of its board): „Finansinės piramidės nesukuria jokios vertės, todėl visų jų pabaiga tokia pati – didžiuliai nuostoliai pasakišku pelnu susiviliojusiems žmonėms". The same page: entrust savings only to lawfully operating market participants with valid licences. Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-kreipesi-i-generaline-prokuratura-del-mmm2011-veiklos-ir-ragina-gyventojus-saugoti-savo-pinigus (`pi-mmm`). Primary. An official's general statement, 2012.
- F738. **A recent one, through social media** (Lietuvos bankas, 2025-04-24): „Socialiniuose tinkluose pastaruoju metu pasirodė žinučių, kuriomis kviečiama prisijungti prie investavimo į kriptoturtą ir finansines priemones" through one platform; LB had not authorised or supervised it, no other EU/EEA supervisor had either, and „Be to, investavimas per šią platformą galimai turi finansinės piramidės požymių." LB put it on its list of entities with no right to provide financial services in Lithuania. LB's advice: „neinvestuoti į produktus, kurių nesuprantate, kitaip rizikuojate ne tik prarasti savo santaupas, bet ir įlįsti į skolas"; check the licence on LB's website, where „įmonės pavadinimas turi tiksliai sutapti su nurodytu Lietuvos banko svetainėje"; „vengti pasiūlymų, žadančių „greitą praturtėjimą“ ir „jokios rizikos“". Source: https://www.lb.lt/lt/naujienos/lietuvos-bankas-ispeja-investuodami-lesas-i-lwex-kriptoturto-prekybos-platforma-rizikuojate-jas-prarasti (`pi-lwex`). Primary. The page also gives the list's size (over 300 firms) and LB's power to have sites blocked with a court's leave; neither is used (no scale wording).
- F739. **Losses, then a second "investment" to win them back** (the Prosecutor General's Office, 2018-01-30, as relayed on tv3.lt's tag page): „Gavus informacijos, kad nuo finansinės piramidės „MMM-2011“ nukentėjusiems, į ją investavusiems ir pinigus praradusiems asmenims siūloma lėšas susigrąžinti toliau „investuojant“ į abejotinas finansines sistemas, Generalinė prokuratūra perspėja nepakliūti į galimai nusikalstamos veikos pinkles." Source: https://www.tv3.lt/gaires/finansine-piramide (`pi-tv3`; the date is the line under the item). Secondary (press, relaying the prosecutors; their own page was not found).
- F756. **Those who lured people in were convicted** (the prosecutors, 2019-05-22, as relayed on the same tv3.lt page): the people who „Investuoti pinigus į finansinę sistemą „MMM“ žmones vilioję ir didžiules palūkanas žadėję" heard their verdict; „Vilniaus apygardos teismas 9 asmenis pripažino kaltais dėl vertimosi neteisėta finansine veikla", with fines and a sum confiscated. Secondary. The charge was unlicensed financial activity, not fraud; it says nothing about ordinary participants who brought in friends.
- F757. **EU law bans pyramids outright** (Directive 2005/29/EC, Annex I, practices unfair in all circumstances, point 14, Lithuanian text): „Piramidės pobūdžio skatinimo sistemos sukūrimas, jos naudojimas ar reklamavimas, kai vartotojui suteikiama galimybė gauti atlygį visų pirma už kitų vartotojų įtraukimą į tą sistemą, o ne už produktų pardavimą ar naudojimą." Source: https://eur-lex.europa.eu/legal-content/LT/TXT/HTML/?uri=CELEX:32005L0029 (`gy-eurlex-ucpd`, read for `docs/GURUS-PLAN.md`, L2). Primary, EU law. The Lithuanian statute that carries it (Nesąžiningos komercinės veiklos vartotojams draudimo įstatymas) was not read: e-seimas and infolex answered with a bot challenge and e-tar loaded without the text; a search snippet put it in Article 7, but that law was amended in 2025, so no article number is given. A page writes „ES teisė draudžia".

**Not used:** the size of LB's list (over 300 firms) and its blocking power (F738's page; no scale wording, and blocking is not the reader's move); the 2012 detentions and suspect counts in the MMM case (F734's page; scale); the 2018 tv3 item that the MMM case reached court (F756 says more); a VDU thesis and a 2008 LTVK paper on pyramids (catalogue record and an unreadable PDF).

**Not found:** the article of the Lithuanian statute that bans pyramids (blocked, above); any official source that running a pyramid is prosecuted as fraud (BK 182) — the only charge found is unlicensed financial activity (F756); anything from VVTAT on telling a pyramid from legal network marketing; a police or prosecutors' page of their own on a pyramid case (F719, F739 and F756 are relayed by the press); any official word on whether an ordinary participant who brought in others must return money or answers for it, so the page says nothing about it; an official page on what to do once inside a pyramid (the page uses F466, F2, F14 and F15, which are about investment fraud generally); a Lithuanian source on „dovanų ratai" (autocomplete returned nothing for it).

**B54. Paid betting tips and "fixed match" sellers (`/zodynas/lazybu-prognozes/`)** (read by Opus on 2026-11-07 from the raw text of each page; found by three Sonnet research passes the same day. Raw pages: `%TEMP%\lz`, prefixes `lz-`, `lz2-` and `lz3-`; a temp folder, re-fetch from the URLs if gone; the ministry answer is a PDF, read as `lz3-an.u8.txt` from `pdftotext -enc UTF-8`. Every quote below was checked by script against the saved text, 42 of 42, with a false quote fed in as a control and reported missing.) **No Lithuanian source speaks to tip buyers** (two passes, `docs/GURUS-PLAN.md`, *Left out*), so on the owner's decision of 2026-11-07 this page rests on foreign official sources, each named as foreign on the page, plus EU law (F760) and Lithuanian sources on gambling (F771, F772). Reused: F2, F14, F15, F714 (the one Lithuanian case of a tips seller, about tax), F717 (the European Consumer Centre), F720 (LPT's free line).

- F760. **EU law: claiming a product helps you win at games of chance is unfair in all circumstances** (Directive 2005/29/EC, Annex I, „Komercinė veikla, kuri bet kuriomis aplinkybėmis laikoma nesąžininga", under „Klaidinanti komercinė veikla", point 16, Lithuanian text): „Tvirtinimas, kad produktai gali palengvinti pasiekti pergalę atsitiktinumo principu grindžiamuose žaidimuose." Source: https://eur-lex.europa.eu/legal-content/LT/TXT/HTML/?uri=CELEX:32005L0029 (`%TEMP%\seo4g\gy-eurlex-ucpd`, as F757). Primary, EU law. The Lithuanian statute that carries it was not read, and no Lithuanian authority was found applying it to betting tips; France applies its own copy of this rule to them (F761). A page says it as EU law, never as "Lithuanian law says", and not that every tip seller breaks it: only a claim that the tips raise the chance of winning.
- F761. **France: how the tip trade works, and that the rule applies to it** (the French government's answer to written question no. 11745, Assemblée nationale, published in the Journal officiel on 2026-06-09, p. 5193): „Les enquêtes conduites sur le secteur ont permis de mieux cerner le modèle de ces sites de conseils en paris sportifs qui repose sur la délivrance sur les réseaux sociaux, d'abord gratuite, de conseils relatifs à des matchs dont le score est peu risqué, entrainant le joueur, via des messageries sécurisées à souscrire un abonnement. L'abonnement payant à ces sites de conseils est également rendu attrayant par le système de bonus mis en place par les bookmakers sur ces sites grâce à des liens d'affiliation."; and „la pratique consistant à affirmer d'un produit ou d'un service qu'il augmente les chances de gagner aux jeux d'argent et de hasard étant une pratique commerciale réputée trompeuse en toute circonstance (article L.121-4,15° du code de la consommation)". Source: https://questions.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11745.pdf (`lz3-an`). Primary, France. The luxury-lifestyle line on this PDF is the deputy's question, not the government's answer, and is not used from here.
- F762. **France: a fine and a conviction** (same answer): „À l'été 2025, les pratiques trompeuses d'une société de conseil en paris sportifs ont été sanctionnées par une amende de 80 000 euros. Fin 2025, une influenceuse issue du monde de la téléréalité a été condamnée par le tribunal correctionnel de Paris à un an de prison avec sursis et 150 000€ d'amende pour diverses pratiques commerciales trompeuses, dont la promotion d'offre de conseil de paris sportifs."; and since the law of 9 June 2023 „toute promotion, directe ou indirecte, en faveur d'abonnements à des conseils ou à des pronostics sportifs est interdite aux personnes exerçant l'activité d'influence commerciale par voie électronique". Primary, France. The conviction was for several deceptive practices, the tips among them; a page says so. No names (§6.7).
- F763. **France, 2024: free or paid tips, and the luxury display** (INC, the French national consumer institute, 2024-07-11, relaying the DGCCRF and ANJ's joint release, which F761's answer dates 2024-06-25): „Des tipsters (pronostiqueurs) délivrent des conseils gratuitement ou via des souscriptions payantes, afin d'influencer les paris des consommateurs. Certains n'hésitent pas à mettre en avant un train de vie luxueux, obtenu soi-disant facilement, grâce aux paris en ligne."; „LA DGCCRF et l'ANJ rappellent que les influences à visée promotionnelle sont de nature trompeuses et susceptibles de constituer un délit, passible de poursuites pénales." Source: https://www.inc-conso.fr/content/soyez-prudents-face-aux-promesses-de-gain-facile-en-ligne (`lz3-inc`). A public body relaying the regulators; secondary-official.
- F764. **France, 2023: the lifestyle is paid for by the subscriptions** (the DGCCRF, as quoted by MoneyVox, 2023-11-02, updated 2023-11-06): „certains affichent un train de vie luxueux prétendument atteint grâce à leurs paris gagnants, alors qu'il est en réalité obtenu grâce à l'argent collecté par les abonnements. En laissant croire, à tort, à une augmentation des gains grâce à leurs conseils, ils trompent les consommateurs." Source: https://www.moneyvox.fr/votre-argent/actualites/94939/paris-sportifs-attention-aux-faux-bons-tuyaux-des-tipsters (`lz3-moneyvox`). Secondary (press quoting the regulator; the DGCCRF's own page was not read). „certains": some sellers, not all.
- F765. **France, 2026: the signs** (lesclesdelabanque.com, a French banking-consumer site, 2026-06-12, relaying a DGCCRF and ANJ alert whose own page on economie.gouv.fr answered 403 and was not got around): „Leur méthode est bien rodée : affichage d'un train de vie luxueux, promesses de gains rapides et importants, abonnements payants présentés comme « rentables »."; „Aucun service ne peut garantir un gain aux jeux d'argent." Source: https://www.lesclesdelabanque.com/particulier/coupe-du-monde-arnaques-pieges-paris-sportifs/ (`lz-lesc`). Secondary. Whether „Aucun service…" is the regulators' wording or the site's is not clear from the page, so a page leans on F766 and F760 for that point.
- F766. **Australia: fake tipping services, the warning signs, and stop paying** (Scamwatch, run by the ACCC, page „Gambling and betting scams", no date): „Gambling and betting scams involve fake betting offers fake tipping services, copying real betting businesses, and illegal online gambling games."; they „may offer high odds, bonus credits, free spins, insider tips, or special promotions"; signs: „You are promised easy money, sign-up credits or guaranteed wins."; „You are pressured to keep paying small amounts before you can get your winnings."; what to do: „Do not keep paying money to unlock winnings, recover losses or prove your identity."; „Contact your bank or card provider immediately to report the scam. Ask them to stop any transactions." Source: https://www.scamwatch.gov.au/types-of-scams/gambling-and-betting-scams (`lz3-scam`). Primary, Australia. Most of the page is about fake gambling sites; tips are one line, and it never says "fixed match".
- F767. **Australia, 2013: why would they sell it?** (ACCC media release, 2013-10-31, on "guaranteed" betting syndicates and software): „Before handing over your money, ask yourself, if someone can accurately predict gambling results, why would they need to sell it to you to make money?"; „there is no such thing as a fool-proof bet"; scammers „typically use high pressure sales tactics such as claiming that places are strictly limited". Source: https://www.accc.gov.au/media-release/dont-back-a-scammer-this-spring-racing-carnival (`lz3-accc`). Primary, Australia, 2013, dated on the page. About syndicates and software, not "fixed" matches.
- F768. **India, 2025: "fixed matches" sold in Telegram groups were a fraud** (the Cyberabad police in Telangana, as reported by Deccan Chronicle and Telangana Today, 2025-06-24): the accused „created private Telegram groups offering exclusive insider tips as part of victim acquisition and claimed access to "fixed matches" and "guaranteed predictions""; the network „deceived youth with false promises of match-fixing tips"; police „asked them to report any suspicious activity to 1930" (India's line). Sources: https://www.deccanchronicle.com/southern-states/telangana/cyberabad-police-dismantles-online-cricket-betting-syndicate-4-held-1887238 (`lz3-dc`), https://telanganatoday.com/hyderabad-cybercrime-police-bust-betting-scam-nab-four-social-media-influencers (`lz3-tt`). Secondary (press quoting the police; no police release was read). Cricket, India, and the case also involved illegal betting sites; it does not describe asking for more money after a loss.
- F769. **UK: no "guaranteed", and past wins must be proofed** (ASA/CAP advice „Betting and gaming: Tipsters", no date of its own): tipsters „should not state or imply that success is "guaranteed""; those claiming past winners or profit „must "proof" their advice with an independent body". Source: https://www.asa.org.uk/advice-online/betting-and-gaming-tipsters.html (`lz3-asa`). Primary, UK advertising rules, not a scam warning.
- F770. **Chargeback, in general** (European Consumer Centres Network, no date): „Chargeback is a procedure allowing consumers to recover funds from their bank if a transaction is unauthorized or if the merchant fails to deliver goods or services as promised. Initially designed to address fraud"; ECC Germany: „Act quickly! There are deadlines after which the chargeback may be rejected."; „First, try to resolve the matter in writing with the provider. If this does not work, contact your bank." Sources: https://www.eccnet.eu/publication/chargeback-eueea (`lz3-eccnet`), https://www.evz.de/en/topics/banking-finance/chargeback/ (`lz3-evz`). Primary, EU network. Nothing says it works for a paid tip or anything tied to gambling; a page may say only "ask your bank quickly", never that the money comes back.
- F771. **LPT: chasing losses is the sign of a serious problem** (LPT, „Konsultavimas", updated 2026-02-18, F720's page): „Signalas, kad turite rimtų problemų dėl lošimo, – desperatiškas bandymas atsilošti arba lošimas iš tų lėšų, kurios lošimams nėra skirtos." Source: https://lpt.lrv.lt/lt/apribojusiu-savo-galimybe-losti-asmenu-registras/pagalba-losejams/konsultavimas/ (`lz2-lpt-konsult`). Primary, Lithuanian.
- F772. **LPT: "I have a strategy" is a false belief** (LPT, 2024-01-16, „Lietuviškas azartas", its psychologist commenting on a survey): uncontrolled gambling is often led by „tam tikros klaidingos nuostatos, pavyzdžiui, jog „iš lošimų įmanoma pragyventi“, „aš galiu atsilošti praloštus pinigus, kadangi turiu strategiją“". Source: https://lpt.lrv.lt/lt/naujienos/lietuviskas-azartas/ (`lz2-lpt-azartas`). Primary, Lithuanian. About gamblers' beliefs, not about tip sellers.

**Not used:** the size of the French market and the influencer's audience (scale; F762's page and the deputy's question); the Indian victims' losses and the influencers' commission per bet (F768's articles; scale and India-specific); Intergame's report of the 2026 alert (trade press; F761 is the primary for the same facts); a law firm's list of risk signs (Telegram groups, screenshots of wins; the firm's analysis, not a regulator's); the 2024 French settlements of over €130,000 (trade press; scale); SignalConso (France only); the UK and Australian help lines (not the reader's).

**Not found:** any Lithuanian source on tip buyers or "fixed match" sellers (LPT, the police, Lietuvos bankas, LBA, banks, VVTAT, LFF, LKF, the press reachable by search; `docs/GURUS-PLAN.md`); any official body (Europol, Interpol, UEFA, FIFA, the FA, the UK Gambling Commission, Sport Integrity Australia, ESSA, Sportradar; the Dutch, Swedish, Danish and German regulators) saying that fixed matches are never sold to the public; the pattern "pay for a fixed match, it loses, pay again for the next" in any official source (so a page does not describe it); edited betting slips or fake win records in an official warning; whether a card chargeback works for a tip service; whether selling tips is regulated or licensed in Lithuania. Blocked and not got around: economie.gouv.fr (403), Action Fraud's tipster page (403, Cloudflare), gamblinginsider.com (403).

**B55. Paid get-rich courses: "make money online", "pasyvios pajamos", mentoring and coaching programmes (`/zodynas/greito-uzdarbio-kursai/`)** (read by Opus on 2026-11-08 from the raw text of each page; found by a Sonnet research agent the same day. Raw pages: `%TEMP%\gr`, prefix `gr-`; a temp folder, re-fetch from the URLs if gone. Every quote below was matched by script, `verify_gr.py`, which also reported a planted false quote as a miss. Before the page was built, on 2026-11-09, the older facts it uses were fetched again, F2, F4, F14, F15, F252, F716, F717 and F770 (`%TEMP%\gr`, prefix `gr5-`): 47 of 47 quotes matched.) Page 5 of `docs/GURUS-PLAN.md`; written from foreign official sources where no Lithuanian one exists, each named as foreign, by the owner's decision of 2026-11-08 (decision 7).

- F773. **VVTAT: 14 days to withdraw from a distance contract, and the exceptions that matter for a course** (VVTAT, „Dažniausiai užduodami klausimai", „Atnaujinimo data: 2026-10-28"): „Turite teisę, nenurodant priežasties ir nepatiriant kitų, negu nustatyta Civilinio kodekso 6.228(11) straipsnyje, išlaidų, per 14 dienų atsisakyti nuotolinės sutarties. Pastebėtina, kad ši teisė nėra absoliuti"; the right does not apply to „paslaugų sutartims, pagal kurias paslaugos vartotojui visiškai suteiktos, jeigu prieš paslaugų teikimą buvo gautas vartotojo aiškus sutikimas ir pripažinimas, kad jis neteks teisės atsisakyti sutarties, kai verslininkas visiškai įvykdys sutartį;" nor where „skaitmeninio turinio teikimas buvo pradėtas vartotojui iš anksto aiškiai sutikus ir pripažinus, kad dėl to jis praras teisę atsisakyti sutarties". If the seller gave no information on the right: „Jeigu verslininkas nepateikė vartotojui informacijos apie teisę atsisakyti sutarties pagal Civilinio kodekso 6.228(7) straipsnio 1 dalies 7 punktą, vartotojas turi teisę atsisakyti sutarties per 12 mėnesių nuo šio straipsnio 3 dalyje nustatytos termino pabaigos." Source: https://vvtat.lrv.lt/lt/DUK/ (`gr-vvtat-duk2`). Primary, Lithuanian; the Civil Code itself (e-seimas) answered 403 and was not read. It does NOT say whether an online course is a service or digital content, nor from which day the 14 days run for a service. The consolidated Consumer Rights Directive (CELEX 02011L0083-20220528, `gr-crd-cons`, Art. 16(a) and 14(3)) says the same in EU law and is not used on the page.
- F774. **VVTAT: a service contract can be ended early, paying only for what was given** (same page, under „Sutarties nutraukimas", citing Civil Code 6.721(1)): „Turite teisę vienašališkai nutraukti sutartį, nepaisydamas to, kad paslaugų teikėjas jau pradėjo ją vykdyti. Šiuo atveju privalote sumokėti paslaugų teikėjui kainos dalį, proporcingą suteiktoms paslaugoms, ir atlyginti kitas protingas išlaidas"; the provider „paslaugos teikėjas neturi teisės reikalauti mokesčio už sutarties nutraukimą"; „Taigi, vartotojas turi teisę bet kada nutraukti paslaugų teikimo sutartį ir atgauti pinigus už nesuteiktas paslaugas, tačiau vartotojas turi atlyginti su paslaugos suteikimu susijusias išlaidas." Source: as F773. Primary, Lithuanian. VVTAT's answer is about service contracts in general, not courses.
- F775. **VVTAT: write to the seller or service provider first, within three months, then to VVTAT** (same page, „Kreipimosi tvarka" and „Kreipimosi terminai", citing the Law on Consumer Protection, Art. 21): „Kilus ginčui su pardavėju ar paslaugų teikėju, pirmiausia turite raštu (raštu, el. paštu ar registruotu laišku) kreiptis į pardavėją / paslaugų teikėją ir nurodyti savo reikalavimą. Jei per 14 kalendorinių dienų nuo Jūsų raštiško kreipimosi gavimo dienos pardavėjas / paslaugų teikėjas nepateiks atsakymo arba atsakymas Jūsų netenkins – turite teisę kreiptis į Valstybinę vartotojų teisių apsaugos tarnybą dėl ginčo sprendimo alternatyvia (ne teismo) ginčų nagrinėjimo tvarka"; the consumer „privalo kreiptis į pardavėją ar paslaugų teikėją ne vėliau kaip per tris mėnesius nuo tos dienos, kurią vartotojas sužinojo ar turėjo sužinoti apie savo teisių ar teisėtų interesų pažeidimą". Source: as F773. Primary, Lithuanian; written for sellers and service providers alike. It does not say whether VVTAT hears a dispute with a seller outside Lithuania (F717 covers that).
- F776. **A bank: urgency, „paskutinė proga" and passive-income content** („Luminor" bank's press release, published by 15min on 2026-09-19, its head of everyday banking): „Rizika prasideda tada, kai rodomas turinys ragina skubiai pirkti konkrečią akciją, kriptovaliutą ar kitą priemonę, nes „dabar paskutinė proga“."; „Jeigu turinyje girdite pažadus greitai praturtėti, garantuotai uždirbti ar nepraleisti „vienintelės progos“, tai turėtų kelti abejonių."; „trečią – pasyvios pajamos ar vadinamieji greito praturtėjimo metodai. Tokiam turiniui būdinga tai, kad jis dažnai remiasi emocija, sėkmės istorijomis ir baime praleisti galimybę." Source: https://www.15min.lt/verslas/naujiena/finansai/jaunuoliai-apie-finansus-mokosi-tiktok-kada-patarimai-tampa-rizikingi-662-2766490 (`gr-15min-tiktok`). A bank's own release, Lithuanian; about financial content on social media in general, not about courses.
- F777. **UK: "make money" course ads that could not prove their results** (the ASA, the UK advertising regulator; CAP News „Money making courses – stick to the facts", 2026-04-09, and two of its rulings of 2025-10-15): the ASA „recently investigated a number of advertisers in regards to misleading practices across a number of ads promoting business‑growth and “make money” courses"; „The ASA found that such claims lacked adequate substantiation, with advertisers unable to demonstrate that the highlighted results reflected what most consumers were likely to achieve."; such marketing „must not imply that exceptional success is typical". One ruling: „We considered the qualification contradicted the impression in the body of the ad, that anyone could achieve the earnings and lifestyle if they followed the course, rather than clarifying it." Another, on an offer „FREE for the next 48 hours": the landing page „had been in existence for longer than this duration and continued to appear after the end of the advertised 48 hours"; „We therefore considered that the promotion was not actually time limited and that the claim in ad (b) was misleading." Sources: https://www.asa.org.uk/news/money-making-courses-stick-to-the-facts.html, https://www.asa.org.uk/rulings/self-made-girl-boss-ltd-a25-1293166-self-made-girl-boss-ltd.html, https://www.asa.org.uk/rulings/charlie-johnson-a25-1293121-charlie-johnson.html (`gr-asa-news`, `gr-asa-sgb`, `gr-asa-cj`). Primary, **foreign (UK)**. The advertisers are not named on the page.
- F778. **Germany: how a coaching programme draws people in, the warning signs, and what an honest one gives** (Verbraucherzentrale, the German consumer centres, „Kostenfalle Coachingprogramm", „Stand: 23. Juli 2026"): „So werde etwa mit kostenlosen Seminaren gelockt, tatsächlich sollen dann aber mehrere tausende Euro für das eigentliche Seminar gezahlt werden. Oft wird nach dem ersten Coaching-Programm ein weiteres Coaching mit neuem Vertrag und neuen Kosten angeboten"; „Ein deutlicher Warnhinweis ist es, wenn Ihnen beiläufig erklärt wird, dass Sie selbst zum Coach ausgebildet werden sollen oder wenn irgendwo versteckt im Vertrag steht, dass sie als Unternehmer:in agieren. In diesem Fall handelt es sich meist um ein Pyramidensystem, in welchem immer mehr Coaches angeworben werden, um die Einnahmen zu vergrößern."; „Unabhängig von Voraussetzungen und Vorbedingungen soll das Coaching-Programm alle Menschen zum gewünschten Erfolg führen können."; „Der Coach selbst hat es aus eigener Kraft geschafft und daher kann es jeder („auch DU!“) schaffen."; „Das Angebot gebe es nur „jetzt und heute“ und auch nur für die ersten 100 Personen, die sich anmelden."; on reviews: „Jedoch sollten Sie misstrauisch werden bei ausschließlich guten. Oft sind diese gefälscht oder wurden eingekauft."; „Die Werbung und Ansprache erfolgt fast ausschließlich über Social Media. Die Formulierungen sind sehr blumig und es wird mit schnellem Geld oder schnellem Erfolg geworben."; and for an honest offer: „Unerlässlich ist in jedem Fall ein schriftlicher Vertrag, der genau aufschlüsselt, was das Coaching umfasst."; „Ein kostenfreies Vorgespräch sollte möglich sein." Source: https://www.verbraucherzentrale.de/wissen/vertraege-reklamation/kundenrechte/kostenfalle-coachingprogramm-so-schuetzen-sie-sich-vor-unserioesen-anbietern-98817 (`gr-vz-kosten`). Primary (a consumer organisation funded by the state), **foreign (Germany)**. The signs are a reason for suspicion when several apply, not proof: „Treffen mehrere der Merkmale auf das Coaching zu, für das Sie sich interessieren, sollten Sie misstrauisch werden"; on time pressure: „Lassen Sie sich auf solchen „Events“ niemals dazu drängen, einen Vertrag überhastet zu unterschreiben." and „Bedenkzeit wird nicht eingeräumt – keine Zeit, sich mit Familie oder Freunden zu besprechen oder auch nur den Vertrag durchzulesen."; on the right of withdrawal (German law, but F773 is the same rule in Lithuania): „Eine andere Methode ist, digitale Inhalte sofort zur Verfügung stellen und Interessierte dazu drängen, dem sofortigen Zugang zu diesen Inhalten zuzustimmen und zugleich auf ihr Widerrufsrecht zu verzichten. Auch hier heißt es: Finger weg!"
- F779. **EU: an influencer who sells for their own account has a shop's duties** (European Commission press release IP/24/708, 2024-02-14, on a screening of influencers in which Lithuania's authority took part): „influencers who sell products or services for their own account have the same legal obligations as online shops, such as providing consumers with legal guarantees or withdrawal rights". Source: https://ec.europa.eu/commission/presscorner/api/files/document/print/cs/ip_24_708/IP_24_708_EN.pdf (`gr-ec-sweep`). Primary, EU. Its percentages are scale and not used (decision 5).
- F780. **EU law: a false "only for a very short time" is unfair in all circumstances** (Directive 2005/29/EC, Annex I, point 7, Lithuanian text): „Apgaulingas pareiškimas, kad gaminį bus galima įsigyti tik per labai ribotą laikotarpį arba kad jį bus galima įsigyti pagal tam tikras sąlygas tik per labai ribotą laikotarpį, siekiant paskatinti pirkėją nedelsiant priimti sprendimą ir atimti iš vartotojų galimybę priimti informacija paremtą sprendimą ar tam nesuteikti užtektinai laiko." Source: https://eur-lex.europa.eu/legal-content/LT/TXT/HTML/?uri=CELEX:32005L0029 (`%TEMP%\seo4g\gy-eurlex-ucpd`, the plan's L3). Primary, EU law. It names a limited time; "only 100 places" is F778's, not this one's.

**Not used:** the same VVTAT page's rule for contracts signed off business premises (whether a hired seminar hall counts, it does not say); the German withdrawal period of a year and 14 days and the trick of making the buyer a business (Verbraucherzentrale, 2026-08-04, `gr-vz-schluss`, and F778's page; German law, no Lithuanian source on it); the Bundesgerichtshof's 2025-06-12 ruling that an unapproved online mentoring programme was void (III ZR 109/24, `gr-bgh-109`; German distance-learning law, no Lithuanian equivalent found); the consolidated Consumer Rights Directive (F773 says the same in Lithuanian); Scamwatch's business-opportunity page (2009, too old); the ACCC on "side hustle" task scams (2024-01-22; `/scenarijai/uzduotys-uz-pinigus/` already covers tasks from Lithuanian sources); Lietuvos bankas's 2014 warning listing „siūlomi mokymai" (old, about investment services); the Commission sweep's percentages (scale).

**Not found:** any Lithuanian official text (VVTAT, the consumer disputes commission, Konkurencijos taryba, VMI, Lietuvos bankas, the police, NKSC, ECC Lietuva) or dated press story on paid get-rich, dropshipping, passive-income or mentoring courses, their income claims, a buyer pushed into a loan to pay, or a refund dispute over one; delfi.lt, vz.lt and lrytas.lt were not reachable by the search tool, so this is "not found", not "does not exist". The US FTC's 2025 cases on e-commerce "business opportunity" courses: ftc.gov answered 404 to the script and was not got around. Nothing from the Nordic ombudsmen or the Dutch ACM on such courses. Autocomplete (gl=lt, hl=lt, 2026-11-08): *dropshipping kursai* returned only itself; *pasyvios pajamos kursai*, *uždarbis internetu kursai* and *kursai grąžinti pinigus* returned nothing; *finansinė laisvė* returned books and *kaip pasiekti*; *mentorystė* and *koučingas* returned programmes and training; no completion with *apgaulė*, *sukčiai* or *atsiliepimai*.

**B71. Mullvad VPN (`/irankiai/mullvad/` and its card on `/irankiai/`)** (read by Opus on 2026-11-07 from the raw text of each page; found by a Sonnet research agent the same day). Raw pages: `%TEMP%\kurj\` (`mv-` Mullvad, `vpn-` general VPN sources); every quote in B71–B73 was matched against them by script (98 of 98, five re-read by hand where a line break or a missing full stop broke the match). F950–F999 and B71–B73 are this pass's; F900–F949 and B70 belong to the `/temos/privatumas/` session.

- F950. **What Mullvad says a VPN does, and that it is not enough** (https://mullvad.net/en, no date, `mv-home`): „A VPN (Virtual Private Network) is a service that creates a private connection to the internet by encrypting your traffic. The outcome: your ISP (internet service provider) can't see your activity and nobody else can use your IP address to track you."; „A VPN is not enough for privacy. That's why you should combine a trustworthy VPN with a privacy-focused browser." Primary (the maker).
- F951. **Platforms and the official download** (https://mullvad.net/en/download/vpn, no date, `mv-download`, `mv-android`, `mv-ios`; README of https://github.com/mullvad/mullvadvpn-app, `mv-gh`): home page „Compatible with: Windows, macOS, Linux, iOS, Android"; „Works on Windows 10 or later (64 bit only)"; „Works on Android 9.0+"; „The Android app is also available on Google Play and F-Droid and the iOS version on App Store". Routers only through a WireGuard client (FAQ, `mv-faq`). Primary.
- F952. **Price: one flat €5 a month, no free plan** (https://mullvad.net/en/pricing, no date, `mv-pricing`): „1 month €5 per month / 1 year €5 per month / 1 decade €5 per month"; „one flat monthly rate"; „Including VAT"; the price has not changed since it „launched in 2009"; „top up your VPN account for an entire year, or just pay month to month"; „We accept cash, Bitcoin, Bitcoin Cash, Monero, bank wire, credit card, PayPal, Swish" and more; cash goes by post with „your cash and payment token" in an envelope; „14-day money back guarantee" (not for cash). On „Why no free plan?": „"Free" services nearly always come at some cost, whether that be the time you spend watching an intro ad, the collection of your data, or by limiting the functionality of the service." Primary.
- F953. **No personal details, a numbered account, and which payments are not anonymous** (https://mullvad.net/en/help/no-logging-data-policy, „Last updated: June 17, 2026", `mv-nolog`): „we do not ask for any personal information - no username, no password, no email address. Instead, a random account number is generated, a so-called numbered account."; payments by card, PayPal, Swish or bank wire are „not anonymous". Primary.
- F954. **No activity logs, by their own policy** (same page): „The underlying policy of Mullvad is that we never store any activity logs of any kind." The maker's statement; F955 and F956 are what backs it outside the policy.
- F955. **The Swedish police search of 2023** (Mullvad's blog, 2023-04-20, https://mullvad.net/en/blog/2023/4/20/mullvad-vpn-was-subject-to-a-search-warrant-customer-data-not-compromised, `mv-police`): „at least six police officers from the National Operations Department (NOA) of the Swedish Police visited the Mullvad VPN office in Gothenburg with a search warrant."; „They intended to seize computers with customer data. In line with our policies such customer data did not exist."; „they left without taking anything and without any customer information." Primary, but Mullvad's own account; no police statement was read.
- F956. **Outside audits, as Mullvad lists them** (download page, `mv-download`; https://mullvad.net/en/blog/tag/audits, `mv-audits`): „Latest security assessment (February 2026 - by Leviathan)"; „Latest App audit (November 2024 - by X41 D-Sec)"; infrastructure audits by Cure53 (2024-06-27) and Radically Open Security (2023-08-09). The audit reports themselves were not read.
- F957. **Open source: GPL-3** (README, `mv-ltcheck`, `mv-gh`): licensed under the GNU GPL „either version 3 of the License, or (at your option) any later version"; the iOS source is GPL-3, but the build on the App Store „falls under the [Apple App Store EULA]". Primary.
- F958. **Who: Mullvad VPN AB, Gothenburg, Sweden, since 2009** (https://mullvad.net/en/about, no date, `mv-about`): „Mullvad VPN AB is owned by parent company Amagicom AB."; both „are 100% owned by founders Fredrik Strömberg and Daniel Berntsson"; address Box 53049, 400 14 Gothenburg, Sweden; „March 2009 - The Mullvad VPN service launches!" Primary.
- F959. **Five devices per account** (`mv-pricing`; FAQ https://mullvad.net/en/help/faq, `mv-faq`): „You can use a Mullvad VPN account on up to 5 devices."; „We cannot add more devices to an account." Primary.
- F960. **No Lithuanian** (the desktop app's locales folder on GitHub, `mv-lt`, read 2026-11-07: ar da de es fa fi fr it ja ko my nb nl pl pt ru sv th tr uk zh-CN zh-TW; the site's language list has no Lithuanian either). The phone apps' languages were not checked.

**Not used:** the audit reports' contents (not read); Mullvad Browser beyond F950's one line (a tool of its own, not carded); the FAQ line on the browser without a VPN (about the browser, not the VPN).

**Not found:** a Mullvad page saying in so many words that a VPN does not make you anonymous (their guessed help URLs gave 404); Mullvad's own page on the Tailscale add-on (404).

**B72. Tailscale (`/irankiai/tailscale/` and its card)** (read 2026-11-07 as B71; prefix `ts-`).

- F961. **What it is** („What is Tailscale?", last validated 2025-09-30, https://tailscale.com/kb/1151/what-is-tailscale, `ts-what`): „It enables encrypted point-to-point connections using the open source WireGuard protocol, which means only devices on your private network can communicate with each other."; „you can still use Tailscale like a traditional VPN by routing all traffic through an exit node". Primary. The page opens with a business pitch; the card uses only these two lines.
- F962. **By default it leaves your internet traffic alone; an exit node changes that** (https://tailscale.com/kb/1103/exit-nodes, last validated 2025-12-15, `ts-exit`): „it only routes traffic between devices running Tailscale, but doesn't touch your public internet traffic"; examples „You're in a coffee shop with untrusted Wi-Fi." and travelling abroad to use a service „(such as banking) only available in your home country"; you can route all public internet traffic through a device of yours set as an exit node, „similar to how you would if you were using a typical VPN"; exit nodes are „available for all plans". Primary.
- F963. **Platforms and download** (https://tailscale.com/download, no date, `ts-dl`): macOS, iOS, Windows, Linux, Android. Primary.
- F964. **Price** (https://tailscale.com/pricing, no date, `ts-pricing`): Personal „$0", „Free forever", „Unlimited user devices", „Up to 6 users"; the Personal plan „is only suitable for non-commercial use"; the Mullvad add-on „$5 Per month for every 5 devices". Primary.
- F965. **What is open source** (https://tailscale.com/opensource, no date, `ts-opensource`; LICENSE on GitHub, `ts-lic`): „The client, which runs on each of a user's devices, is mostly open source."; on closed operating systems the GUI is closed source; „A closed source coordination server."; „BSD 3-Clause License". Primary.
- F966. **Who** (Terms of Service, „Last updated: August 25, 2026", https://tailscale.com/terms, `ts-terms`): accounts existing as of 2024-09-02 contract with „Tailscale Inc., a Canadian business corporation" (Toronto); new accounts from 2024-09-03 with „Tailscale US Inc., a Delaware corporation" (San Francisco). Primary. The founding year was not found.
- F967. **Traffic is end-to-end encrypted; metadata is collected** (privacy policy, effective 2026-08-25, https://tailscale.com/privacy-policy, `ts-privacy`): „Tailscale does not process, or have the ability to access, the content of User traffic data transmitted through the Tailscale Solution, which is fully end-to-end encrypted."; it collects metadata including „device name", IP address, public key, times of access and „logs describing connections". Relays: „there is never a way for a DERP server to decrypt your traffic." (https://tailscale.com/blog/how-tailscale-works, `ts-how`). Primary.
- F968. **No Tailscale password: you sign in with another account** (https://tailscale.com/kb/1013/sso-providers, last validated 2026-01-05, `ts-idp`): „Tailscale does not support sign-up with email addresses."; „there are no Tailscale passwords"; natively supported providers include Apple, Google, GitHub, Microsoft, Okta, OneLogin; „you can enable MFA features in your single sign-on identity provider, and they will apply to all your apps, including Tailscale." Primary.
- F969. **The Mullvad add-on, and what it does to anonymity** (https://tailscale.com/kb/1258/mullvad-exit-nodes, last validated 2026-01-09, `ts-mullvad`): the feature is in beta; „Tailscale doesn't support anonymous tailnets"; „All Tailscale users are connected to an email address or GitHub account."; „Tailscale knows which Mullvad accounts belong to which Tailscale users."; „Mullvad does not receive user identity information from Tailscale."; one licence covers up to five devices. Primary.

**Not found:** Tailscale's founding year; a Lithuanian interface (the docs are English; the apps were not checked).

**B73. GrapheneOS, Smart-ID on a changed phone, and what a VPN does (`/irankiai/grapheneos/`, its card, and the VPN lines of `/irankiai/mullvad/`)** (read 2026-11-07 as B71; prefixes `go-`, `sid-`, `vpn-`).

- F970. **What GrapheneOS is** (https://grapheneos.org/, no date, `go-home`): „GrapheneOS is a privacy and security focused mobile OS with Android app compatibility developed as a non-profit open source project."; „It was founded in 2014 and was formerly known as CopperheadOS."; „GrapheneOS will never include either Google Play services or another implementation of Google services like microG." Primary.
- F971. **Only Pixel phones, and which to buy** (https://grapheneos.org/faq, no date, `go-faq`): „GrapheneOS has official production support for the following devices:" Pixel 6, 6 Pro, 6a, 7, 7 Pro, 7a, Pixel Tablet, Pixel Fold, 8, 8 Pro, 8a, 9, 9 Pro, 9 Pro XL, 9 Pro Fold, 9a, 10, 10 Pro, 10 Pro XL, 10 Pro Fold, 10a; „We strongly recommend only purchasing one of the following devices" (Pixel 8 to Pixel 10a); „8th generation and later Pixels provide a minimum guarantee of 7 years of support from launch". Devices are chosen for security requirements the project lists, not for broad support. Primary.
- F972. **Carrier-locked phones** (`go-faq`; web installer, `go-web`): „Devices sold in partnership with specific carriers may be locked by the carrier, which will prevent installing GrapheneOS." It is mainly a US carrier issue and „isn't common elsewhere in the world"; „avoid carrier variants of the devices". Primary.
- F973. **Installing: the official web installer, a wipe, then lock** (https://grapheneos.org/install/, `go-install`; https://grapheneos.org/install/web, `go-web`, no dates): „You can either use the WebUSB-based installer recommended for most users or the command-line installation guide aimed at more technical users."; „Third party installation guides tend to be out-of-date"; it needs a computer with a Chromium-based browser (Chromium, Vanadium, Google Chrome, Microsoft Edge, Brave with Shields off) and „a USB cable"; „This will replace the existing OS installation and wipe all the existing data."; „Locking the bootloader is important as it enables full verified boot." Primary.
- F974. **The Auditor app** (`go-web`): „GrapheneOS provides our Auditor app" to verify that the hardware, firmware and operating system are genuine; it needs a second Android device running Auditor. Primary.
- F975. **Sandboxed Google Play is optional and gets no special access** (https://grapheneos.org/usage, no date, `go-usage`): an option to install the official Google Play in the standard app sandbox; „Google Play receives absolutely no special access or privileges on GrapheneOS"; „To install sandboxed Google Play, open our App Store, select Google Play services and install it." Primary.
- F976. **Banking apps** (`go-usage`, section „Banking apps"): „Banking apps are a particularly problematic class of apps for compatibility with alternate operating systems."; „For many of these apps, it's enough to set up the GrapheneOS sandboxed Google Play feature in the same profile."; GrapheneOS is not certified by Google and does not try to bypass the checks; a community list by PrivSec.dev exists and „GrapheneOS does not make any guarantees regarding the list's validity." The section uses SafetyNet-era wording, so no page states today's Play Integrity behaviour from it. Primary.
- F977. **Updates and the browser** (`go-faq`; https://grapheneos.org/features, `go-features`): „GrapheneOS has entirely automatic background updates", and leaving them on is strongly recommended; Vanadium is its „hardened WebView and default browser". Primary.
- F978. **Licence and organisation** (`go-faq`; https://grapheneos.org/donate, `go-donate`): „MIT licensing is used for our own standalone projects", upstream licences kept for changes to other projects; donations go to the „non-profit GrapheneOS Foundation". Free to download; no price stated. The foundation's country was not found.
- F979. **GrapheneOS names Mullvad's app** (`go-faq`, VPN section): „The only apps we can recommend are the official WireGuard app and the official Mullvad app." Primary.
- F980. **Smart-ID on a changed phone** (SK ID Solutions, no dates): „For security reasons, you can't use Smart-ID app on a rooted device." (https://www.smart-id.com/help/faq/warnings-and-limitations/using-smart-id-with-a-rooted-device/, `sid-rooted`); „Smart-ID works on Android and iOS devices, other operating systems are not currently supported." (…/operating-systems-and-smart-id-app-updates/, `sid-os`); the security-check error may appear „if your phone settings are considered to be 'unusual'." (…/error-messages/app-problems/unable-to-pass-security-check/, `sid-secfail`). None of the three names GrapheneOS, a custom OS or Play Integrity, so whether Smart-ID runs on GrapheneOS is not stated by Smart-ID. Primary.
- F981. **NKSC: public Wi-Fi, and a VPN as the safer route** (NKSC, 2020-02-12, https://www.nksc.lt/naujienos/pagrindines_priemones_kaip_islikti_saugiam_interne.html, `vpn-nksc-tips`): „Jeigu naudojate viešai prieinamą bevielį internetą (angl. public Wi-Fi) nesinaudokite elektroninėmis banko paslaugomis, nepirkite prekių ir venkite interneto svetainių, kuriose reikėtų įvesti kokius nors asmeninius duomenis. Būtinoms operacijoms atlikti būtų saugiau naudotis savo įrenginio mobiliuoju internetu arba virtualiu privačiu tinklu (angl. VPN)." Primary, Lithuanian official; from 2020.
- F982. **FOREIGN (EFF Surveillance Self-Defense, last reviewed 2026-07-28): what a VPN is for, and trust** (https://ssd.eff.org/module/choosing-vpn-thats-right-you, `vpn-eff`): VPN ads claim it is the only tool you need against criminals, malware, surveillance and tracking, but „these advertisements vastly oversell the benefits of VPNs. The reality is that VPNs are best suited for one thing: routing your network connection through a different network."; „Do not assume that just because a VPN app is available on an official storefront that it's safe."; „Do not use a VPN that you do not trust."; on business models: „If the VPN doesn't sell its service, how is it keeping its business afloat?" A US non-profit, not an official body.

**Not used:** LRT, 2026-07-22, an expert on fake („evil twin") Wi-Fi networks and a VPN (the expert's affiliation was not captured); Tailscale's SOC 2 claim; GrapheneOS's command-line install, its release notes on Play Integrity settings, and preinstalled phones sold by third parties.

**Not found:** any Lithuanian official source on free or fake VPN apps, or on whether a VPN is legal here (so no page says either); Smart-ID or any Lithuanian bank (Swedbank, SEB, Luminor, Šiaulių bankas, Revolut) naming GrapheneOS or a custom OS (the banks' pages were not searched); whether GrapheneOS offers Lithuanian as a system language; the GrapheneOS Foundation's country.

**B74. Free VPNs that promised privacy (reel R11, `social/r11-nemokamas-vpn/`, and `/irankiai/mullvad/`, *Kodėl ne nemokamas VPN*)** (read by Opus on 2026-11-07 from the raw text of each page; found by a Sonnet research agent the same day). Raw pages: `%TEMP%\kurj\fv-*.html` and their `.html.txt`.

- F983. **FOREIGN (ACCC, Australia's competition and consumer regulator, 2023-07-26): Onavo Protect, a free VPN of Meta's, A$20m** (https://www.accc.gov.au/media-release/20m-penalty-for-meta-companies-for-conduct-liable-to-mislead-consumers-about-use-of-their-data, `fv-accc20`): „The Federal Court has ordered two subsidiaries of social media giant Meta, Facebook Israel and Onavo Inc, to each pay $10 million for engaging in conduct liable to mislead in breach of the Australian Consumer Law"; „Onavo Protect, a free app providing a virtual private network (VPN) service, was installed more than 270,000 times by Australian users between February 2016 and October 2017."; in Google's and Apple's store listings it was promoted with „Use a free, fast and secure VPN to protect personal information" and „Helps Keep You and Your Data Safe"; „In fact, Onavo and Facebook Israel shared the personal activity data from users collected by the app in anonymised and aggregated form with parent company Meta (then known as Facebook Inc) for commercial benefit."; the data included „records of every app they accessed and time they spent using those apps"; the Court declared the conduct liable to mislead „by failing to adequately disclose that users' data would be used for purposes other than providing Onavo Protect, including Meta's commercial purposes"; the companies agreed the listings „conveyed that Onavo Protect users' data would only be used to provide the Onavo Protect VPN"; the ACCC's chair: „consumers seeking to protect their privacy through a virtual private network were not clearly told that in downloading and using this app they were actually facilitating the use of their data for Meta's commercial benefit"; „The service ceased in May 2019." Primary. It does NOT say „misled" or „lied": the finding is conduct *liable to* mislead, by failing to disclose; the data passed on was anonymised and aggregated, not each person's own record. Meta's reply was read only in press summaries, not saved.
- F984. **FOREIGN (ACCC, 2020-12-16, when it sued): Apple removed Onavo in 2018; what the data was for, as alleged** (https://www.accc.gov.au/media-release/accc-alleges-facebook-misled-consumers-when-promoting-app-to-protect-users-data, `fv-accc2020`): „Apple removed Onavo Protect from its App store in 2018" for breaking its developer terms, among them collecting information about other apps on the device for analytics; it was later removed from Google Play and „discontinued in 2019"; an ad line „Keep it secret. Keep it safe"; „This data was used to support Facebook's market research activities, including identifying potential future acquisition targets." Primary; the purpose is the ACCC's allegation of 2020, not the court's finding (F983 is the finding).
- F985. **FOREIGN, secondary (The Register, 2020-07-17, reporting Comparitech's and vpnMentor's research): seven Hong Kong VPN apps that said „no logs"** (https://www.theregister.com/2020/07/17/ufo_vpn_database/, `fv-ufoReg`): „894GB of records in an unsecured Elasticsearch cluster that belonged to UFO VPN"; UFO's privacy policy: „We do not track user activities outside of our site, nor do we track the website browsing or connection activities of users who are using our Services."; seven Hong Kong providers (UFO VPN, FAST VPN, Free VPN, Super VPN, Flash VPN, Secure VPN, Rabbit VPN) „all share a common entity"; vpnMentor: „Each of these VPNs claims that their services are 'no-log' VPNs" … „we found multiple instances of internet activity logs on their shared server." UFO denied plain-text passwords and said the logs were anonymised; Comparitech: „we do not believe this data to be anonymous". Secondary (Comparitech's own report answered 403); not every one of the seven is said to be free. **Not used** on a page or in a reel: a secondary, disputed incident report, and §6.7 of `docs/ARCHITECTURE.md` cites incidents only from official or primary sources (second reader of R11, 2026-11-07).

**Not used:** Hola (2015, free users' bandwidth sold through Luminati; whether it was disclosed is disputed between Fortune and PCWorld, and no Hola statement was found: `fv-fortune`, `fv-hola1`, `fv-hola2`); SuperVPN (2023, 360 million records exposed; the source names no „no logs" promise: `fv-supervpn`); the 2016 study of 283 free Android VPN apps (18 % unencrypted, three quarters with trackers; only iTnews's 2017 summary was reachable, the primary pages answered 403: `fv-itnews`); the UK parliament's Onavo documents (only CircleID's summary, `fv-circleid`); Google Play's VPN security badge (Help Net Security, `fv-gplay`).

**Not found:** any Lithuanian official source or Lithuanian press article on free VPN apps (searches surfaced only a VPN seller's blog); Comparitech's own UFO report (403); a primary page of the 2016 study (ACM and ICSI 403).
