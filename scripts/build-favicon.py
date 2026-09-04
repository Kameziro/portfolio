#!/usr/bin/env python3
"""Pixel HUD mark for tab / home-screen icons. 16-cell grid, 2 CSS px per cell."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

INK = (6, 5, 26, 255)
CYAN = (61, 232, 255, 255)
MAGENTA = (255, 61, 138, 255)
CREAM = (247, 244, 234, 255)

CELL = 2
GRID = 16
SIZE = GRID * CELL

# Chunky C, Press Start-ish. Dots are empty.
C_GLYPH = [
    " ### ",
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    " ### ",
]
C_X, C_Y = 5, 4
CHROMA = -1


def paint_grid() -> list[list[tuple[int, int, int, int]]]:
    grid = [[INK for _ in range(GRID)] for _ in range(GRID)]

    for i in range(GRID):
        grid[0][i] = CYAN
        grid[GRID - 1][i] = CYAN
        grid[i][0] = CYAN
        grid[i][GRID - 1] = CYAN

    def stamp(dx: int, color: tuple[int, int, int, int]) -> None:
        for row, line in enumerate(C_GLYPH):
            for col, ch in enumerate(line):
                if ch != "#":
                    continue
                x = C_X + col + dx
                y = C_Y + row
                if 1 <= x < GRID - 1 and 1 <= y < GRID - 1:
                    grid[y][x] = color

    stamp(CHROMA, MAGENTA)
    stamp(0, CREAM)
    return grid


def scale(grid: list[list[tuple[int, int, int, int]]], n: int) -> bytes:
    w = GRID * n
    out = bytearray(w * w * 4)
    i = 0
    for y in range(GRID):
        for _ in range(n):
            for x in range(GRID):
                px = grid[y][x]
                for _ in range(n):
                    out[i : i + 4] = bytes(px)
                    i += 4
    return bytes(out)


def write_png(path: Path, size: int, rgba: bytes) -> None:
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = b"".join(b"\x00" + rgba[y * size * 4 : (y + 1) * size * 4] for y in range(size))
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


def write_ico(path: Path, pngs: list[tuple[int, bytes]]) -> None:
    count = len(pngs)
    offset = 6 + 16 * count
    entries = bytearray()
    payload = bytearray()
    for size, png in pngs:
        w = 0 if size == 256 else size
        entries += struct.pack("<BBBBHHII", w, w, 0, 0, 1, 32, len(png), offset)
        payload += png
        offset += len(png)
    path.write_bytes(struct.pack("<HHH", 0, 1, count) + entries + payload)


def write_svg(path: Path, grid: list[list[tuple[int, int, int, int]]]) -> None:
    def hex_color(px: tuple[int, int, int, int]) -> str:
        return f"#{px[0]:02x}{px[1]:02x}{px[2]:02x}"

    rects: list[str] = []
    for y, row in enumerate(grid):
        x = 0
        while x < GRID:
            color = row[x]
            if color == INK:
                x += 1
                continue
            run = 1
            while x + run < GRID and row[x + run] == color:
                run += 1
            rects.append(
                f'  <rect x="{x * CELL}" y="{y * CELL}" width="{run * CELL}" height="{CELL}" fill="{hex_color(color)}"/>'
            )
            x += run

    svg = "\n".join(
        [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">',
            "  <title>Cleber Neto</title>",
            f'  <rect width="{SIZE}" height="{SIZE}" fill="{hex_color(INK)}"/>',
            *rects,
            "</svg>",
            "",
        ]
    )
    path.write_text(svg, encoding="utf-8")


def png_bytes(size: int, rgba: bytes) -> bytes:
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = b"".join(b"\x00" + rgba[y * size * 4 : (y + 1) * size * 4] for y in range(size))
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")


def main() -> None:
    app = Path(__file__).resolve().parents[1] / "src" / "app"
    grid = paint_grid()
    write_svg(app / "icon.svg", grid)

    rgba32 = scale(grid, CELL)
    write_png(app / "icon.png", SIZE, rgba32)

    apple_n = 180 // GRID  # 11 → 176, then we want 180. Use 12 → 192.
    rgba_apple = scale(grid, 12)
    write_png(app / "apple-icon.png", GRID * 12, rgba_apple)

    ico_pngs: list[tuple[int, bytes]] = []
    for n, px in ((1, 16), (2, 32), (3, 48)):
        ico_pngs.append((px, png_bytes(px, scale(grid, n))))
    write_ico(app / "favicon.ico", ico_pngs)
    print("Wrote icon.svg, icon.png, apple-icon.png, favicon.ico")


if __name__ == "__main__":
    main()
