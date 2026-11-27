#!/usr/bin/env python3
"""Builds index.html from src/layout.html and the files in src/sections/.

Edit the files in src/, then run:  python3 build.py
Sections are joined in file-name order (01-..., 02-..., ...).
"""
from pathlib import Path

root = Path(__file__).parent
layout = (root / 'src' / 'layout.html').read_text()
sections = sorted((root / 'src' / 'sections').glob('*.html'))
body = '\n'.join(p.read_text() for p in sections)
(root / 'index.html').write_text(layout.replace('{{sections}}\n', body, 1))
print(f'index.html built from {len(sections)} sections')
