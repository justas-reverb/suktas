/**
 * The scenario catalogue, once: the catalogue page, the home page's chooser, the header, the footer
 * and the wayfinding on every scenario page all read it, so a new scenario is added here and nowhere
 * else. The one-line scenes are docs/copy/scenarijai/index.md, word for word (the source tags stay as
 * comments and the build strips them). `ask` is the channel as the reader would say it.
 */
const raw = [
  ['Skambutis', [
    ['Skambutis iš „banko“', '/scenarijai/skambutis-is-banko/', 'skambina „bankas“ ir kalba apie įtartinas operacijas tavo sąskaitoje. <!-- F23 F24 -->'],
    ['„Parodyk ekraną“', '/scenarijai/parodyk-ekrana/', 'skambina „bankas“ ir prašo parodyti ekraną ar įsidiegti „AnyDesk“. <!-- F305 F308 -->'],
    ['Skambutis iš „policijos“', '/scenarijai/skambutis-is-policijos/', 'skambina „pareigūnas“ policijos, banko ar kitos įstaigos vardu. <!-- F23 -->'],
    ['„Pareigūnas“ prie durų', '/scenarijai/pareigunas-prie-duru/', 'prie durų „pareigūnas“ ar „kurjeris“ sako, kad tavo pinigai padirbti, ir ateina pasiimti pinigų, kortelės ar aukso. <!-- F277 F278 -->'],
    ['Skambutis iš „poliklinikos“', '/scenarijai/skambutis-is-poliklinikos/', 'skambina „poliklinikos darbuotojas“, siūlo tyrimą namuose ir klausia adreso ar dokumento numerio. <!-- F683 F685 F690 -->'],
    ['„Tavo sūnus pateko į avariją“', '/scenarijai/artimojo-avarija/', 'skambina ir sako, kad tavo sūnus ar dukra pateko į avariją ir skubiai reikia pinigų. <!-- F491 F494 -->', '4 min.'],
    ['Skambutis iš „VMI“', '/scenarijai/skambutis-is-vmi/', 'skambina „VMI darbuotojas“ ir kalba apie skolą, baudą ar permoką. <!-- F143 F140 M -->'],
    ['„Padėsime atsiimti pensiją“', '/scenarijai/padesime-atsiimti-pensija/', 'skambina „konsultantas“ ir siūlo padėti atsiimti II pakopos pensijų pinigus. <!-- F404 F400 -->'],
    ['Užpildei formą, o skambina „brokeris“', '/scenarijai/netikras-brokeris/', 'internete užpildei formą, o skambina „brokeris“ ir siūlo pradėti nuo 100 eurų. <!-- F458 F459 F461 F467 -->', '4 min.'],
    ['Žada pirmą vietą „Google“', '/scenarijai/zada-pirma-vieta-google/', 'skambina „Google“ dėl tavo verslo profilio arba laiškas žada pirmą vietą paieškoje. <!-- F678 F681 F672 F670 -->', '3 min.'],
    ['Praleistas skambutis iš užsienio', '/scenarijai/praleistas-skambutis/', 'nežinomas užsienio numeris suskambo kartą ir laukia, kad perskambintum. <!-- F175 F173 -->', '2 min.'],
  ]],
  ['Žinutė', [
    ['Žinutė su nuoroda', '/scenarijai/zinute-su-nuoroda/', 'SMS ar laiškas apie „siuntinį“, „mokestį“ ar paskyrą, kuri „bus užblokuota“. <!-- F24 F44 -->'],
    ['SMS apie baudą', '/scenarijai/sms-apie-bauda/', 'SMS apie neapmokėtą stovėjimą ar baudą su nuoroda sumokėti. <!-- F292 F299 -->'],
    ['Žinutė su kodu', '/scenarijai/zinute-su-kodu/', 'pokalbių programėlėje „palaikymas“ ar „pažįstamas“ prašo kodo. <!-- F41 -->'],
    ['Užduotys už pinigus', '/scenarijai/uzduotys-uz-pinigus/', 'žinutė siūlo kelis eurus už „patiktuką“, o paskui prašo susimokėti už „geresnes užduotis“. <!-- F414 F417 -->'],
  ]],
  ['El. paštas', [
    ['Netikras laiškas iš „Sodros“, banko ar „Telia“', '/scenarijai/netikras-laiskas/', 'laiškas „Sodros“, banko ar „Telia“ vardu su nuoroda atsiimti išmoką, prisijungti ar sumokėti sąskaitą. <!-- F317 F321 F323 -->'],
  ]],
  ['Svetainė', [
    ['„Patvirtink per „Smart-ID““', '/scenarijai/smart-id-patvirtinimas/', 'netikra banko svetainė ar „banko darbuotojas“ prašo patvirtinti „Smart-ID“ užklausą. <!-- F169 F171 -->'],
    ['Netikra valstybės svetainė', '/scenarijai/netikra-valstybes-svetaine/', 'paieškoje ar žinutėje – „Regitros“, „Sodros“ ar E. sveikatos svetainės kopija, kuri prašo prisijungti per banką. <!-- F362 F356 -->'],
  ]],
  ['QR kodas', [
    ['Netikras QR kodas', '/scenarijai/netikras-qr-kodas/', 'QR lipdukas ant parkomato, bankomato ar afišos veda į netikrą mokėjimo ar banko puslapį. <!-- F235 F237 -->'],
  ]],
  ['Paskyra', [
    ['Tavo slaptažodis nutekėjo', '/scenarijai/slaptazodis-nutekejo/', 'tavo adresas nutekėjo, o slaptažodį naudoji ir kitur. <!-- F69 F71 -->'],
    ['Paskola tavo vardu, kurios neėmei', '/scenarijai/paskola-tavo-vardu/', 'gauni laišką ar skambutį dėl paskolos, kurios neėmei. <!-- F577 F569 -->', '5 min.'],
    ['„Draugas“ prašo pinigų', '/scenarijai/draugas-praso-pinigu/', 'draugo „Facebook“ paskyra skubiai prašo paskolinti pinigų ar atsiųsti kodą. <!-- F156 F158 -->'],
    ['Meilė internete, kuri prašo pinigų', '/scenarijai/meile-internete/', 'pažintis internete virsta meile, o tada – prašymu pinigų. <!-- F329 F331 -->', '4 min.'],
    ['„Mokėk arba paviešinsiu tavo nuotraukas“', '/scenarijai/grasina-paviesinti/', 'kažkas reikalauja pinigų ar daugiau nuotraukų ir grasina jas parodyti tavo draugams ir artimiesiems. <!-- F549 F551 F552 -->', '4 min.'],
    ['Būrėja prašo vis daugiau pinigų', '/scenarijai/bureja-praso-dar/', 'sumokėjai už būrimą ar ritualą, o tau sako, kad „neužteko“, ir gąsdina prakeiksmu. <!-- F591 F606 -->', '4 min.'],
  ]],
  ['Reklama', [
    ['Reklama su žinomu veidu', '/scenarijai/reklama-su-zinomu-veidu/', 'žinomas veidas reklamoje rekomenduoja investuoti. <!-- F50 -->'],
    ['Reklama kviečia į „Telegram“, o ten auga „pelnas“', '/scenarijai/investicijos-telegram/', 'reklama nuveda į „Telegram“ grupę, kur „konsultantas“ rodo augantį pelną ir ragina pervesti daugiau. <!-- F740 F744 -->', '4 min.'],
    ['Prekybos kursai ir signalai už pinigus', '/scenarijai/prekybos-kursai-ir-signalai/', '„mentorius“ socialiniuose tinkluose parduoda kursą ar signalus ir žada greitą pelną. <!-- F713 F712 -->', '4 min.'],
    ['Netikra banko reklama', '/scenarijai/netikra-banko-reklama/', 'ieškai banko paieškoje, o reklama „Remiama“ veda į netikrą jo svetainę. <!-- F213 F218 -->'],
    ['Programėlė iš nuorodos ar reklamos', '/scenarijai/programele-is-nuorodos/', 'reklama ar žinutė siūlo programėlę ne iš „Google Play“, o ji perima telefoną. <!-- F224 F225 -->'],
    ['Netikras konkursas', '/scenarijai/netikras-konkursas/', '„Iki“ ar „Maximos“ vardu „Facebook“ tinkle žadamas prizas, o jam atsiimti prašoma kortelės duomenų. <!-- F367 F368 -->'],
    ['„Padėsime susigrąžinti pinigus“', '/scenarijai/susigrazinti-pinigus/', 'po apgaulės „teisininkas“ ar „Interpolas“ žada susigrąžinti pinigus už mokestį. <!-- F14 F185 -->'],
  ]],
  ['Skelbimai ir pirkimas', [
    ['„Pirkėjas“ skelbime', '/scenarijai/pirkejas-skelbime/', 'tavo skelbimo „pirkėjas“ „jau sumokėjo“ ir siunčia nuorodą pinigams „gauti“. <!-- F147 F151 -->'],
    ['„Pardavėjas“ prašo avanso', '/scenarijai/netikras-pardavejas/', 'skelbime daiktas pigiai, o „pardavėjas“ prašo avanso ar pavedimo tiesiai į sąskaitą: sumoki, o daikto nesulauki. <!-- F260 F263 -->'],
    ['Bilietas į koncertą iš nepažįstamo žmogaus', '/scenarijai/bilietas-i-koncerta/', 'koncertas išparduotas, o nepažįstamas žmogus socialiniame tinkle siūlo savo bilietą: sumoki, o bilieto negauni arba su juo nepatenki. <!-- F526 F528 -->', '4 min.'],
    ['Netikra el. parduotuvė', '/scenarijai/netikra-parduotuve/', 'reklamoje brangi prekė už itin mažą kainą: sumoki, o prekės nesulauki. <!-- F203 -->'],
    ['Nuoma, kuri neegzistuoja', '/scenarijai/netikra-nuoma/', 'pigus butas ar atostogų būstas, o avansą prašo pervesti dabar, arba „viešbutis“ duoda 24 valandas sumokėti. <!-- F450 F440 F444 -->', '4 min.'],
  ]],
];

const meta = {
  'Skambutis': ['skambutis', 'Man paskambino'],
  'Žinutė': ['zinute', 'Gavau žinutę'],
  'El. paštas': ['el-pastas', 'Gavau laišką'],
  'Svetainė': ['svetaine', 'Svetainė prašo prisijungti'],
  'QR kodas': ['qr-kodas', 'Mačiau QR kodą'],
  'Paskyra': ['paskyra', 'Paskyra ar pažintis'],
  'Reklama': ['reklama', 'Mačiau reklamą'],
  'Skelbimai ir pirkimas': ['skelbimai', 'Perku ar parduodu'],
};

export const channels = raw.map(([name, items]) => ({
  name,
  slug: meta[name][0],
  ask: meta[name][1],
  items: items.map(([title, href, text, time = '3 min.']) => ({ title, href, text: text.replace(/\s*<!--.*?-->/g, '').trim(), time })),
}));

/** Every scenario in reading order, with the channel it sits in and its place there. */
export const scenarios = channels.flatMap((c) => c.items.map((s, i) => ({ ...s, channel: c, n: i + 1 })));

/** Where a scenario page sits: the scenario, its channel, and its neighbours in reading order. */
export function locate(pathname) {
  const href = pathname.endsWith('/') ? pathname : pathname + '/';
  const at = scenarios.findIndex((s) => s.href === href);
  if (at < 0) return null;
  return { s: scenarios[at], prev: scenarios[at - 1] ?? null, next: scenarios[at + 1] ?? null };
}

/** Lithuanian plural of "apgaulė": 1 apgaulė, 2-9 apgaulės, 10-20 apgaulių, 21 apgaulė. */
export function apgaules(n) {
  const w = n % 10 === 1 && n % 100 !== 11 ? 'apgaulė' : n % 10 === 0 || (n % 100 >= 11 && n % 100 <= 19) ? 'apgaulių' : 'apgaulės';
  return `${n} ${w}`;
}
