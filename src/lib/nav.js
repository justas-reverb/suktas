/**
 * The site's map, once: the header's drop-downs, the phone menu, the footer and the home page's
 * "what else is here" all read it. A label is what the reader wants to do, not what we call the
 * format. `at` lists the path prefixes that put the reader inside a group, so the header can say where
 * they are without every page passing a prop. Descriptions only say what the page holds.
 */
import { scenarios } from './catalogue.js';

export const catalogue = { label: 'Apgaulės', href: '/scenarijai/', at: ['/scenarijai/'], count: scenarios.length };

export const protect = {
  label: 'Apsisaugok',
  at: ['/sustok/', '/patikra/', '/treniruote/', '/irankiai/', '/triukai/', '/pranesk/'],
  items: [
    ['Įpročiai', '/sustok/', 'Kortelės: vienas ėjimas kiekvienai situacijai.'],
    ['Patikra per 15 minučių', '/patikra/', 'Pasitikrink savo paskyras ir telefoną.'],
    ['Treniruotė', '/treniruote/', 'Netikri puslapiai, kuriuose spausti galima drąsiai.'],
    ['Įrankiai', '/irankiai/', 'Slaptažodžių tvarkyklės, VPN ir telefonas: kaip renkamės ir ką siūlome.'],
    ['Savaitės triukas', '/triukai/', 'Vienas triukas per savaitę: iš kur žinome ir ką daryti.'],
    ['Pranešk', '/pranesk/', 'Parodyk įtartiną žinutę: perskaitysime ir, jei galėsime, atsakysime.'],
  ],
};

export const family = { label: 'Šeimai', href: '/seima/', at: ['/seima/'], desc: 'Puslapis, kurį gali nusiųsti tėvams ar seneliams.' };

export const understand = {
  label: 'Suprask',
  at: ['/temos/', '/zodynas/'],
  items: [
    ['Kaip jis galvoja', '/temos/kaip-veikia-atakos/', 'Penki žingsniai, kuriais eina beveik kiekvienas triukas.'],
    ['Temos', '/temos/', 'Apgaulė, slaptažodžiai, įrenginiai: pagal tai, ko jis siekia.'],
    ['Žodynas', '/zodynas/', 'Terminai paprastais žodžiais.'],
  ],
};

export const about = [
  ['Misija', '/misija/'],
  ['Apie', '/apie/'],
  ['Šaltiniai', '/saltiniai/'],
  ['Atviras kodas', 'https://github.com/justas-reverb/suktas'],
  ['Kas pasikeitė', '/kas-pasikeite/'],
  ['Privatumo pranešimas', '/privatumo-pranesimas/'],
  ['Turinys', '/turinys/'],
];

/** True when the path is inside the group (the home page and the rest belong to none). */
export const inside = (group, path) => group.at.some((p) => path.startsWith(p));
