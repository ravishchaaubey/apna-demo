"""Recalculate an .xlsx with LibreOffice headless and read back values.

Usage (module): recalc(path) -> path_to_recalculated_copy ; values(path, sheet, cells)
The recalculated copy is written to a temp dir; the source workbook (formulas only, as written by
openpyxl) is left untouched unless `replace=True`, in which case the recalculated file (which keeps the
formulas AND stores cached values) replaces the original so Excel/viewers show numbers immediately.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

import openpyxl

ERR_TOKENS = ("#REF!", "#NAME?", "#DIV/0!", "#VALUE!", "#N/A", "#NUM!", "#NULL!", "Err:", "#ERR")


def recalc(path, replace=True):
    tmp = tempfile.mkdtemp(prefix="pna_recalc_")
    profile = tempfile.mkdtemp(prefix="pna_lo_profile_")
    cmd = ["soffice", f"-env:UserInstallation=file://{profile}", "--headless", "--calc",
           "--convert-to", "xlsx:Calc MS Excel 2007 XML", "--outdir", tmp, path]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    out = os.path.join(tmp, os.path.basename(path))
    if not os.path.exists(out):
        raise RuntimeError(f"LibreOffice conversion failed: {res.stdout} {res.stderr}")
    if replace:
        shutil.copy(out, path)
        return path
    return out


def scan_errors(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    errs = []
    n = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                v = c.value
                if v is None:
                    continue
                n += 1
                if isinstance(v, str) and any(v.startswith(t) for t in ERR_TOKENS):
                    errs.append((ws.title, c.coordinate, v))
    return n, errs


def formula_count(path):
    wb = openpyxl.load_workbook(path, data_only=False)
    n = 0
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                if isinstance(c.value, str) and c.value.startswith("="):
                    n += 1
    return n


def read_cells(path, mapping):
    """mapping: {key: (sheet, cell)} -> {key: value}"""
    wb = openpyxl.load_workbook(path, data_only=True)
    return {k: wb[s][c].value for k, (s, c) in mapping.items()}


if __name__ == "__main__":
    p = sys.argv[1]
    recalc(p)
    n, errs = scan_errors(p)
    print(json.dumps({"cells_with_values": n, "formulas": formula_count(p), "errors": errs[:50]}, indent=1))
