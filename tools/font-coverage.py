"""Does a font file carry every Lithuanian letter, and is each one really drawn?

    python tools/font-coverage.py FILE.woff2 [FILE2.woff2 ...]

A cmap entry is not proof. Fraunces (fontsource, 2026-10-02) maps U+016B to a glyph whose
macron is drawn beside the u instead of over it, so "Būk" reads "Buk" with a stray bar on
the k. So each accented letter's outline is compared with its base letter's:

  - the mark must sit above (č ė š ū ž) or below (ą ę į ų) the letter, and
  - the whole outline must stay within the base letter's width, give or take a little, and
    inside the advance width, so a displaced mark is caught.

Variable fonts are checked at the default instance, which catches a missing, stripped or
displaced glyph. Weights other than the default still have to be looked at in a browser
(a specimen screenshot), because a variable font can break only at some weights.
"""
import sys
sys.stdout.reconfigure(encoding="utf-8")
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen

LETTERS = {
    'ą': 'a', 'č': 'c', 'ę': 'e', 'ė': 'e', 'į': 'i', 'š': 's', 'ų': 'u', 'ū': 'u', 'ž': 'z',
    'Ą': 'A', 'Č': 'C', 'Ę': 'E', 'Ė': 'E', 'Į': 'I', 'Š': 'S', 'Ų': 'U', 'Ū': 'U', 'Ž': 'Z',
}
ABOVE = set('čėšūžČĖŠŪŽ')
BELOW = set('ąęįųĄĘĮŲ')


def bounds(font, glyph_name):
    gs = font.getGlyphSet()
    pen = BoundsPen(gs)
    gs[glyph_name].draw(pen)
    return pen.bounds


def check(path):
    font = TTFont(path)
    cmap = font.getBestCmap()
    upem = font['head'].unitsPerEm
    hmtx = font['hmtx']
    slack = 0.09 * upem
    problems = []
    for ch, base in LETTERS.items():
        g = cmap.get(ord(ch))
        b = cmap.get(ord(base))
        if g is None:
            problems.append(f'{ch} (U+{ord(ch):04X}) is not in the file')
            continue
        if b is None:
            continue
        bg, bb = bounds(font, g), bounds(font, b)
        if bg is None:
            problems.append(f'{ch} has an empty outline')
            continue
        if bb is None:
            continue
        if ch in ABOVE and bg[3] <= bb[3] + 1:
            problems.append(f'{ch}: no mark above the letter (top {bg[3]} vs base {bb[3]})')
        if ch in BELOW and bg[1] >= bb[1] - 1:
            problems.append(f'{ch}: no ogonek below the letter (bottom {bg[1]} vs base {bb[1]})')
        if bg[2] > bb[2] + slack or bg[0] < bb[0] - slack:
            problems.append(f'{ch}: outline spans {bg[0]}..{bg[2]}, base letter {bb[0]}..{bb[2]}: a mark is displaced')
        adv = hmtx[g][0]
        if bg[2] > adv + slack:
            problems.append(f'{ch}: outline ends at {bg[2]}, past its advance width {adv}')
    return len(cmap), problems


if __name__ == '__main__':
    bad = False
    for p in sys.argv[1:]:
        try:
            n, problems = check(p)
        except Exception as e:
            print(f'{p}: {e}')
            bad = True
            continue
        print(f"{'ok     ' if not problems else 'PROBLEM'}  {p}  ({n} characters)")
        for q in problems:
            print('      ' + q)
        bad = bad or bool(problems)
    sys.exit(1 if bad else 0)
