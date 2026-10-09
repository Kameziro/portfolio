/**
 * 5×7 dot-matrix font and layout for the hero name. Shared by the server SVG
 * fallback and the interactive canvas, so both paint the exact same pixels.
 */

const GLYPH_W = 5;
const GLYPH_H = 7;
const LETTER_GAP = 1;
const LINE_GAP = 2;
const CURSOR_GAP = 1;

/** Ghost (unlit) cells around the name: room for pixels to be pushed into. */
export const MATRIX_PAD = 2;

// Each glyph is 7 rows of 5 columns, "#" = lit.
const FONT: Record<string, string> = {
  A: ".###. #...# #...# ##### #...# #...# #...#",
  B: "####. #...# #...# ####. #...# #...# ####.",
  C: ".###. #...# #.... #.... #.... #...# .###.",
  D: "####. #...# #...# #...# #...# #...# ####.",
  E: "##### #.... #.... ####. #.... #.... #####",
  F: "##### #.... #.... ####. #.... #.... #....",
  G: ".###. #...# #.... #.### #...# #...# .####",
  H: "#...# #...# #...# ##### #...# #...# #...#",
  I: ".###. ..#.. ..#.. ..#.. ..#.. ..#.. .###.",
  J: "..### ...#. ...#. ...#. ...#. #..#. .##..",
  K: "#...# #..#. #.#.. ##... #.#.. #..#. #...#",
  L: "#.... #.... #.... #.... #.... #.... #####",
  M: "#...# ##.## #.#.# #.#.# #...# #...# #...#",
  N: "#...# #...# ##..# #.#.# #..## #...# #...#",
  O: ".###. #...# #...# #...# #...# #...# .###.",
  P: "####. #...# #...# ####. #.... #.... #....",
  Q: ".###. #...# #...# #...# #.#.# #..#. .##.#",
  R: "####. #...# #...# ####. #.#.. #..#. #...#",
  S: ".#### #.... #.... .###. ....# ....# ####.",
  T: "##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..",
  U: "#...# #...# #...# #...# #...# #...# .###.",
  V: "#...# #...# #...# #...# #...# .#.#. ..#..",
  W: "#...# #...# #...# #.#.# #.#.# #.#.# .#.#.",
  X: "#...# #...# .#.#. ..#.. .#.#. #...# #...#",
  Y: "#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..",
  Z: "##### ....# ...#. ..#.. .#... #.... #####",
};

export type MatrixCell = {
  x: number;
  y: number;
  /** Index of the word (line) the cell belongs to. */
  word: number;
};

export type Matrix = {
  cols: number;
  rows: number;
  lit: MatrixCell[];
  /** Blinking underscore after the last word. */
  cursor: MatrixCell[];
};

function normalize(word: string) {
  return word
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
}

/** One word per line, left-aligned, with a blinking cursor after the last. */
export function buildMatrix(name: string): Matrix {
  const words = name.trim().split(/\s+/).map(normalize);
  const lit: MatrixCell[] = [];
  const cursor: MatrixCell[] = [];
  let widest = 0;

  words.forEach((word, line) => {
    const top = MATRIX_PAD + line * (GLYPH_H + LINE_GAP);
    let left = MATRIX_PAD;

    for (const char of word) {
      const rows = FONT[char]?.split(" ");
      rows?.forEach((row, dy) => {
        for (let dx = 0; dx < GLYPH_W; dx++) {
          if (row[dx] === "#") lit.push({ x: left + dx, y: top + dy, word: line });
        }
      });
      left += GLYPH_W + LETTER_GAP;
    }

    let right = left - LETTER_GAP;
    if (line === words.length - 1) {
      const start = right + CURSOR_GAP;
      for (let dx = 0; dx < GLYPH_W; dx++) {
        cursor.push({ x: start + dx, y: top + GLYPH_H - 1, word: line });
      }
      right = start + GLYPH_W;
    }
    widest = Math.max(widest, right - MATRIX_PAD);
  });

  return {
    cols: widest + MATRIX_PAD * 2,
    rows: words.length * GLYPH_H + (words.length - 1) * LINE_GAP + MATRIX_PAD * 2,
    lit,
    cursor,
  };
}
