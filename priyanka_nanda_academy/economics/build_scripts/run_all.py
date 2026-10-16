"""Build all three economics workbooks in dependency order, recalculating each with LibreOffice.

funnel_economics.xlsx  -> (paid-route CAC, media per seat) -> business_forecast.xlsx
business_forecast.xlsx -> (Year-3 revenue by layer, illustrative baseline) -> market_sizing_model.xlsx
Writes _funnel_outputs.json, _forecast_outputs.json and _key_outputs.json (headline numbers for the methodology doc).
"""
import json
import os
import subprocess
import sys

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
ECON = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from recalc import recalc, scan_errors, formula_count  # noqa


def run(script):
    r = subprocess.run([sys.executable, os.path.join(HERE, script)], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout, r.stderr)
        raise SystemExit(f"{script} failed")


def vals(path, sheet):
    return openpyxl.load_workbook(path, data_only=True)[sheet]


def main():
    # 1 funnel
    run("build_funnel_economics.py")
    fpath = os.path.join(ECON, "funnel_economics.xlsx")
    recalc(fpath)
    ws = vals(fpath, "Summary")
    rows = {ws.cell(row=r, column=1).value: [ws.cell(row=r, column=c).value for c in (2, 3, 4)] for r in range(5, 40) if ws.cell(row=r, column=1).value}
    fun = {"prcac": rows["FEED: paid-route media CAC, CTWA + Search + Taster (₹)"],
           "media": rows["Funnel-required career media / month at target (₹)"],
           "mc": rows["FEED: masterclass media per seat (₹)"], "sm": rows["FEED: self-makeup media per seat (₹)"]}
    fun = {k: [round(float(x), 0) for x in v] for k, v in fun.items()}
    json.dump(fun, open(os.path.join(HERE, "_funnel_outputs.json"), "w"), indent=1)

    # 2 forecast
    run("build_business_forecast.py")
    bpath = os.path.join(ECON, "business_forecast.xlsx")
    recalc(bpath)
    refs = json.load(open(os.path.join(HERE, "_forecast_refs.json")))
    T = refs["T"]
    w3 = vals(bpath, "3yr_Scenarios")
    out = {}
    for si, sc in enumerate(("Conservative", "Base", "Aggressive"), 1):
        col = 1 + (si - 1) * 3 + 3
        d = {f"y3_{k}": round(float(w3.cell(row=T["som_" + k], column=col).value or 0), 2) for k in ("tri", "reg", "hyb", "cpd", "onl", "adj")}
        d.update({f"y3_lrn_{k}": round(float(w3.cell(row=T["lrn_" + k], column=col).value or 0), 1) for k in ("tri", "reg", "hyb")})
        wu = vals(bpath, "Unit_Economics")
        out[sc] = d
    # illustrative baseline (ex-GST) per scenario from Assumptions values (CA-01 x mix x fees)
    A = vals(bpath, "Assumptions")
    idx = {A.cell(row=r, column=1).value: r for r in range(7, A.max_row + 1) if A.cell(row=r, column=1).value}

    def av(aid, j):
        return float(A.cell(row=idx[aid], column=3 + j).value)
    for j, sc in enumerate(("Conservative", "Base", "Aggressive")):
        stud = av("CA-01", j)
        car = stud * av("A-ECO-101", j)
        rev = (car * av("CA-02", j) + (stud - car) * av("A-ECO-102", j)) / (1 + av("A-ECO-23", j) * av("A-ECO-24", j))
        out[sc]["baseline_rev_lakh"] = round(rev / 1e5, 2)
    json.dump(out, open(os.path.join(HERE, "_forecast_outputs.json"), "w"), indent=1)

    # 3 sizing
    run("build_market_sizing.py")
    spath = os.path.join(ECON, "market_sizing_model.xlsx")
    recalc(spath)

    report = {}
    for p in (fpath, bpath, spath):
        n, errs = scan_errors(p)
        report[os.path.basename(p)] = {"formulas": formula_count(p), "cells": n, "errors": errs[:20]}
    print(json.dumps(report, indent=1))


if __name__ == "__main__":
    main()
