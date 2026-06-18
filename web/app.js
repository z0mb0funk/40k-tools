/* MFM Points Explorer - vanilla JS, reads window.MFM from data.js */
(function () {
  "use strict";
  const MFM = window.MFM || { diff: { overall: {}, factions: {} }, new: { factions: {} } };
  const DIFF = MFM.diff, NEW = MFM.new;
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, props = {}, ...kids) => {
    const n = Object.assign(document.createElement(tag), props);
    for (const k of kids) n.append(k.nodeType ? k : document.createTextNode(k));
    return n;
  };
  const sign = (n) => n == null ? "" : (n > 0 ? "+" + n : "" + n);
  const cls = (n) => n == null || n === 0 ? "" : (n < 0 ? "buff" : "nerf");
  const byName = (o) => Object.values(o).sort((a, b) => a.name.localeCompare(b.name));

  /* ---------- meta + tabs ---------- */
  const ov = DIFF.overall || {};
  $("#meta").textContent =
    `${ov.old_version || "?"} → ${ov.new_version || "?"}  ·  ` +
    `${ov.factions_compared || 0} factions compared  ·  ${ov.total_matched || 0} units matched` +
    (MFM.generated ? `  ·  built ${MFM.generated}` : "");

  document.querySelectorAll(".tabs button").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((x) => x.classList.remove("active"));
      document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      $("#tab-" + b.dataset.tab).classList.add("active");
    });
  });
  function goFaction(slug) {
    document.querySelectorAll(".tabs button").forEach((x) => x.classList.remove("active"));
    document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
    $('.tabs button[data-tab="faction"]').classList.add("active");
    $("#tab-faction").classList.add("active");
    $("#faction-select").value = slug;
    renderFaction();
  }

  /* ---------- overview ---------- */
  const OV_COLS = [
    ["name", "Faction", false],
    ["avg_pct", "Avg %", true],
    ["net_points", "Net pts", true],
    ["avg_delta", "Avg pts", true],
    ["decreased", "Cheaper", true],
    ["increased", "Pricier", true],
    ["unchanged", "Same", true],
    ["added", "Added", true],
    ["removed", "Removed", true],
    ["matched", "Matched", true],
    ["wargear_units", "Wargear", true],
  ];
  let ovSort = { key: "avg_pct", dir: 1 };

  function overviewRows() {
    return Object.values(DIFF.factions).map((fd) => ({
      slug: fd.slug, name: fd.name, ...fd.summary,
    }));
  }
  function renderOverview() {
    const rows = overviewRows();
    rows.sort((a, b) => {
      const k = ovSort.key, av = a[k], bv = b[k];
      if (typeof av === "string") return ovSort.dir * av.localeCompare(bv);
      return ovSort.dir * ((av || 0) - (bv || 0));
    });
    const t = $("#overview-table");
    t.innerHTML = "";
    const thead = el("tr");
    OV_COLS.forEach(([key, label, num]) => {
      const th = el("th", { className: num ? "num" : "" }, label +
        (ovSort.key === key ? (ovSort.dir > 0 ? " ▲" : " ▼") : ""));
      th.addEventListener("click", () => {
        ovSort = { key, dir: ovSort.key === key ? -ovSort.dir : (num ? 1 : 1) };
        renderOverview();
      });
      thead.append(th);
    });
    t.append(el("thead", {}, thead));
    const tb = el("tbody");
    rows.forEach((r) => {
      const tr = el("tr");
      const link = el("a", { className: "faction-link" }, r.name);
      link.addEventListener("click", () => goFaction(r.slug));
      tr.append(el("td", {}, link));
      tr.append(el("td", { className: "num " + cls(r.avg_pct) }, (r.avg_pct > 0 ? "+" : "") + r.avg_pct + "%"));
      tr.append(el("td", { className: "num " + cls(r.net_points) }, sign(r.net_points)));
      tr.append(el("td", { className: "num " + cls(r.avg_delta) }, (r.avg_delta > 0 ? "+" : "") + r.avg_delta));
      tr.append(el("td", { className: "num buff" }, r.decreased || 0));
      tr.append(el("td", { className: "num nerf" }, r.increased || 0));
      tr.append(el("td", { className: "num muted" }, r.unchanged || 0));
      tr.append(el("td", { className: "num" }, r.added || 0));
      tr.append(el("td", { className: "num" }, r.removed || 0));
      tr.append(el("td", { className: "num muted" }, r.matched || 0));
      tr.append(el("td", { className: "num" + (r.wargear_units ? " nerf" : " muted") }, r.wargear_units || 0));
      tb.append(tr);
    });
    t.append(tb);
  }

  /* ---------- faction changes ---------- */
  function tiersStr(map) {
    const ks = Object.keys(map || {}).map(Number).sort((a, b) => a - b);
    if (!ks.length) return "—";
    return ks.map((m) => `${m}m:${map[m]}`).join(", ");
  }
  function fillFactionSelect() {
    const sel = $("#faction-select");
    byName(DIFF.factions).forEach((fd) => sel.append(el("option", { value: fd.slug }, fd.name)));
    sel.addEventListener("change", renderFaction);
    $("#changes-only").addEventListener("change", renderFaction);
  }
  function renderFaction() {
    const slug = $("#faction-select").value;
    const fd = DIFF.factions[slug];
    if (!fd) return;
    const s = fd.summary;
    $("#faction-summary").innerHTML =
      `<strong>${fd.name}</strong> — units ${s.units_old}→${s.units_new}, ` +
      `matched ${s.matched}. ` +
      `<span class="buff">${s.decreased} cheaper</span>, ` +
      `<span class="nerf">${s.increased} pricier</span>, ` +
      `${s.unchanged} same, ${s.added} added, ${s.removed} removed. ` +
      `Avg <b class="${cls(s.avg_pct)}">${s.avg_pct > 0 ? "+" : ""}${s.avg_pct}%</b>, ` +
      `net <b class="${cls(s.net_points)}">${sign(s.net_points)}</b> pts.` +
      (s.wargear_units ? ` <span class="nerf">${s.wargear_units}</span> units gained paid wargear (new in 11th).` : "");

    const onlyCh = $("#changes-only").checked;
    let units = fd.units.slice();
    if (onlyCh) units = units.filter((u) => u.status !== "unchanged");
    units.sort((a, b) => (a.base_delta == null) - (b.base_delta == null) ||
      (a.base_delta || 0) - (b.base_delta || 0));

    const t = $("#faction-units"); t.innerHTML = "";
    t.append(thead(["Unit", "Old", "New (base)", "Δ base", "Repeat copy", ""]));
    const tb = el("tbody");
    units.forEach((u) => {
      const tr = el("tr");
      tr.append(el("td", {}, u.name));
      tr.append(el("td", { className: "num muted" }, tiersStr(u.old)));
      tr.append(el("td", { className: "num" }, tiersStr(u.new)));
      tr.append(el("td", { className: "num " + cls(u.base_delta) }, sign(u.base_delta) || "—"));
      // full repeat-tier structure with the threshold label + surcharge
      let rep = "";
      if (u.repeat_tiers && Object.keys(u.repeat_tiers).length) {
        rep = `${u.repeat_threshold}: ${tiersStr(u.repeat_tiers)}`;
        if (u.repeat_surcharge) rep += `  (${sign(u.repeat_surcharge)})`;
      }
      tr.append(el("td", { className: "num tag3" }, rep));
      const note = el("td");
      if (u.iterative) note.append(el("span", { className: "pill iter" }, "iterative"));
      if (u.status === "added" || u.status === "removed")
        note.append(el("span", { className: "pill" }, u.status));
      tr.append(note);
      tb.append(tr);
    });
    t.append(tb);
    if (!units.length) tb.append(el("tr", {}, el("td", { className: "empty" }, "No changes.")));

    // enhancements
    const enh = fd.enhancements.filter((e) => !onlyCh || e.status !== "unchanged");
    enh.sort((a, b) => (a.delta == null) - (b.delta == null) || (a.delta || 0) - (b.delta || 0));
    const et = $("#faction-enh"); et.innerHTML = "";
    et.append(thead(["Enhancement", "Old", "New", "Δ", ""]));
    const etb = el("tbody");
    enh.forEach((e) => {
      const tr = el("tr");
      tr.append(el("td", {}, e.name));
      tr.append(el("td", { className: "num muted" }, e.old == null ? "—" : e.old));
      tr.append(el("td", { className: "num" }, e.new == null ? "—" : e.new));
      tr.append(el("td", { className: "num " + cls(e.delta) }, sign(e.delta) || "—"));
      tr.append(el("td", {}, e.status === "unchanged" ? "" :
        el("span", { className: "pill" }, e.status)));
      etb.append(tr);
    });
    et.append(etb);
    if (!enh.length) etb.append(el("tr", {}, el("td", { className: "empty" }, "No changes.")));

    // wargear (new paid options in 11th)
    const wg = fd.units.filter((u) => u.wargear && u.wargear.length);
    const wt = $("#faction-wargear"); wt.innerHTML = "";
    wt.append(thead(["Unit", "Option", "Cost"]));
    const wtb = el("tbody");
    wg.sort((a, b) => a.name.localeCompare(b.name)).forEach((u) => {
      u.wargear.forEach((w) => {
        const tr = el("tr");
        tr.append(el("td", {}, u.name));
        tr.append(el("td", { className: "muted" }, w.name));
        tr.append(el("td", { className: "num nerf" }, "+" + w.points));
        wtb.append(tr);
      });
    });
    wt.append(wtb);
    if (!wg.length) wtb.append(el("tr", {}, el("td", { className: "empty" }, "No paid wargear options.")));
  }
  function thead(labels) {
    const tr = el("tr");
    labels.forEach((l, i) => tr.append(el("th", { className: i ? "num" : "" }, l)));
    return el("thead", {}, tr);
  }

  /* ---------- list builder ---------- */
  const builder = { slug: null, detachments: [], dpBudget: 3, battleSize: 2000, instances: [], seq: 0 };
  const BATTLE_SIZES = [["Combat Patrol", 500], ["Incursion", 1000],
    ["Strike Force", 2000], ["Onslaught", 3000]];
  const STORE_KEY = "mfm_saved_lists";
  let dragPayload = null;   // {t:'unit',key} | {t:'enh',enh}

  function thresholdRange(threshold) {
    const t = (threshold || "").toLowerCase().trim();
    if (!t || t === "default") return [1, null];
    const nums = (t.match(/\d+/g) || []).map(Number);
    const plus = t.includes("+");
    if (t.includes("to") && nums.length >= 2) return [nums[0], nums[1]];
    if (nums.length) return plus ? [nums[0], null] : [nums[0], nums[0]];
    return [1, null];
  }
  function blockForOrdinal(unit, n) {
    let chosen = null;
    for (const b of unit.cost_blocks) {
      const [lo, hi] = thresholdRange(b.threshold);
      if (n >= lo && (hi == null || n <= hi)) return b;
      if (!chosen) chosen = b;
    }
    return chosen;
  }
  function sizesOf(unit) {
    const set = new Set();
    unit.cost_blocks.forEach((b) => b.tiers.forEach((t) => set.add(t.models)));
    return [...set].sort((a, b) => a - b);
  }
  function tierPoints(block, size) {
    if (!block) return 0;
    const t = block.tiers.find((t) => t.models === size) || block.tiers[0];
    return t ? t.points : 0;
  }
  function unitByKey(key) {
    return NEW.factions[builder.slug].units.find((u) => u.name_key === key);
  }
  function copyCost(unit, ordinal, size) {
    const block = blockForOrdinal(unit, ordinal);
    const [lo] = block ? thresholdRange(block.threshold) : [1];
    return { pts: tierPoints(block, size), isRepeat: lo > 1, label: block ? block.threshold : "" };
  }
  // ordinal (1-based) of each instance among same-key instances, in add order
  function ordinals() {
    const counts = {}, map = {};
    builder.instances.forEach((ins) => {
      counts[ins.key] = (counts[ins.key] || 0) + 1;
      map[ins.id] = counts[ins.key];
    });
    return map;
  }
  function keyOfName(name) { return name.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
  function canLead(charUnit, targetUnit) {
    const targets = (charUnit.leader_targets || []).map(keyOfName);
    return targets.includes(targetUnit.name_key) || targets.includes(keyOfName(targetUnit.name));
  }
  function attachBadge(attachType) {
    if (attachType === "support") return el("span", { className: "pill support", title: "Support" }, "Support");
    if (attachType === "leader/support") return el("span", { className: "pill leadsup", title: "Leader / Support" }, "Ldr/Sup");
    if (attachType === "leader") return el("span", { className: "pill char", title: "Leader" }, "Leader");
    return el("span", { className: "pill char", title: "Character" }, "★");
  }
  function attachTypeOf(key) { const u = unitByKey(key); return u ? u.attach_type : null; }

  function addInstance(key, attachedTo = null) {
    const u = unitByKey(key);
    if (!u) return null;
    const ins = {
      id: ++builder.seq, key, name: u.name, isCharacter: !!u.is_character,
      size: sizesOf(u)[0], wargear: {}, enhancement: null, upgrade: null, attachedTo,
    };
    builder.instances.push(ins);
    renderList();
    return ins;
  }
  function removeInstance(id) {
    // also detach any characters attached to it
    builder.instances = builder.instances.filter((x) => x.id !== id && x.attachedTo !== id);
    renderList();
  }

  function fillBuilderFaction() {
    const sel = $("#builder-faction");
    byName(NEW.factions).forEach((f) => sel.append(el("option", { value: f.slug }, f.name)));
    sel.addEventListener("change", () => setFaction(sel.value));

    const bs = $("#builder-battlesize");
    BATTLE_SIZES.forEach(([label, pts]) =>
      bs.append(el("option", { value: pts }, `${label} (${pts})`)));
    bs.value = String(builder.battleSize);
    bs.addEventListener("change", () => { builder.battleSize = Number(bs.value); renderList(); });

    $("#unit-filter").addEventListener("input", renderAvailable);
    $("#save-list").addEventListener("click", saveList);
    $("#copy-list").addEventListener("click", copyList);

    builder.slug = sel.value;
    // list area is a drop zone for adding units / dropping a reorder at the end
    const zone = $("#builder-list");
    zone.addEventListener("dragover", (e) => {
      if (dragPayload && (dragPayload.t === "unit" || dragPayload.t === "reorder")) e.preventDefault();
    });
    zone.addEventListener("drop", (e) => {
      if (!dragPayload) return;
      if (dragPayload.t === "unit") { e.preventDefault(); addInstance(dragPayload.key); }
      else if (dragPayload.t === "reorder") { e.preventDefault(); moveGroup(dragPayload.id, null, true); }
    });
  }
  // move a top-level instance (and its attached characters) before/after a target
  function moveGroup(draggedId, targetId, after) {
    if (draggedId === targetId) return;
    const arr = builder.instances;
    const dragged = arr.find((x) => x.id === draggedId);
    if (!dragged || dragged.attachedTo != null) return;
    const groupIds = new Set([draggedId, ...arr.filter((x) => x.attachedTo === draggedId).map((x) => x.id)]);
    const group = arr.filter((x) => groupIds.has(x.id));
    const rest = arr.filter((x) => !groupIds.has(x.id));
    let ti = targetId == null ? -1 : rest.findIndex((x) => x.id === targetId);
    if (ti < 0) { builder.instances = [...rest, ...group]; }
    else { if (after) ti += 1; rest.splice(ti, 0, ...group); builder.instances = rest; }
    renderList();
  }
  function enhDetachment(enh) { return enh.detachment || null; }
  function setFaction(slug) {
    builder.slug = slug; builder.instances = []; builder.detachments = [];
    $("#builder-faction").value = slug;
    renderDetachments(); renderAvailable(); renderEnhancements(); renderList();
  }
  function detachmentsOf() { return NEW.factions[builder.slug].detachments || []; }
  function dpUsed() {
    const dets = detachmentsOf();
    return builder.detachments.reduce((s, name) => {
      const d = dets.find((x) => x.name === name); return s + ((d && d.dp) || 0);
    }, 0);
  }
  function toggleDetachment(name) {
    const dets = detachmentsOf();
    const d = dets.find((x) => x.name === name);
    if (builder.detachments.includes(name)) {
      builder.detachments = builder.detachments.filter((n) => n !== name);
      // strip enhancements that came from a now-deselected detachment
      builder.instances.forEach((i) => {
        if (i.enhancement && !builder.detachments.includes(enhDetachment(i.enhancement))) i.enhancement = null;
      });
    } else {
      if (dpUsed() + ((d && d.dp) || 0) > builder.dpBudget) { flash("Not enough Detachment Points."); return; }
      builder.detachments.push(name);
    }
    renderDetachments(); renderEnhancements(); renderList();
  }
  function renderDetachments() {
    const wrap = $("#builder-detachments"); wrap.innerHTML = "";
    const dets = detachmentsOf();
    if (!dets.length) { wrap.append(el("div", { className: "empty" }, "No detachments listed.")); }
    dets.forEach((d) => {
      const on = builder.detachments.includes(d.name);
      const row = el("div", { className: "row det" + (on ? " on" : "") });
      const nm = el("span", { className: "name" }, titleCase(d.name));
      row.append(nm);
      row.append(el("span", { className: "cost" }, (d.dp != null ? d.dp + "DP" : "?")));
      const btn = el("button", { className: on ? "rm" : "", title: on ? "remove" : "add" }, on ? "−" : "+");
      btn.addEventListener("click", () => toggleDetachment(d.name));
      row.append(btn);
      wrap.append(row);
    });
    const used = dpUsed();
    const note = `DP ${used}/${builder.dpBudget}`;
    $("#dp-used").textContent = used;
    $("#dp-budget").textContent = builder.dpBudget;
    $("#dp-note").textContent = note;
    $("#dp-badge").classList.toggle("over", used > builder.dpBudget);
  }
  function titleCase(s) {
    return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function renderAvailable() {
    const wrap = $("#builder-available"); wrap.innerHTML = "";
    const f = NEW.factions[builder.slug];
    const q = $("#unit-filter").value.trim().toLowerCase();
    f.units.filter((u) => !q || u.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((u) => {
        const sizes = sizesOf(u);
        const base = blockForOrdinal(u, 1);
        const rep = u.cost_blocks.find((b) => thresholdRange(b.threshold)[0] > 1);
        const row = el("div", { className: "row", draggable: true });
        row.addEventListener("dragstart", () => { dragPayload = { t: "unit", key: u.name_key }; });
        row.addEventListener("dragend", () => { dragPayload = null; });
        const nm = el("span", { className: "name" }, u.name);
        if (u.is_character) nm.append(attachBadge(u.attach_type));
        row.append(nm);
        row.append(el("span", { className: "cost" }, tierPoints(base, sizes[0]) + (sizes.length > 1 ? "+" : "") + "pts"));
        if (rep) row.append(el("span", { className: "tag3", title: "repeat-copy cost: " + rep.threshold }, "↑" + rep.threshold));
        const add = el("button", { title: "add to list" }, "+");
        add.addEventListener("click", () => addInstance(u.name_key));
        row.append(add);
        wrap.append(row);
      });
    if (!wrap.children.length) wrap.append(el("div", { className: "empty" }, "No units."));
  }

  function renderEnhancements() {
    const wrap = $("#builder-enhancements"); wrap.innerHTML = "";
    const f = NEW.factions[builder.slug];
    const sel = builder.detachments;
    const list = f.enhancements.filter((e) => !sel.length || sel.includes(e.detachment));
    const st = selectionState();
    $("#sel-note").textContent = `selections ${st.distinct}/4`;
    if (!list.length) {
      wrap.append(el("div", { className: "empty" },
        sel.length ? "No enhancements/upgrades for the selected detachment(s)."
                   : "Select a detachment to see its enhancements & upgrades."));
      return;
    }
    const enh = list.filter((e) => !e.is_upgrade);
    const upg = list.filter((e) => e.is_upgrade);

    const makeRow = (e, isUp) => {
      const row = el("div", { className: "row", draggable: true });
      row.addEventListener("dragstart", () => { dragPayload = { t: "enh", enh: e }; });
      row.addEventListener("dragend", () => { dragPayload = null; });
      row.append(el("span", { className: "name" }, stripUpgrade(e.name)));
      row.append(el("span", { className: "cost" }, e.points + "pts"));
      const add = el("button", { title: isUp ? "apply to a unit" : "attach to a character" }, "+");
      add.addEventListener("click", () => isUp ? applyUpgradeToFreeUnit(e) : attachEnhToFreeCharacter(e));
      row.append(add);
      return row;
    };

    if (enh.length) {
      wrap.append(el("div", { className: "group-label" }, "Enhancements → characters"));
      enh.forEach((e) => wrap.append(makeRow(e, false)));
    }
    if (upg.length) {
      wrap.append(el("div", { className: "group-label" }, "Upgrades → units (max 3 each)"));
      upg.forEach((e) => wrap.append(makeRow(e, true)));
    }
  }
  function attachEnhToFreeCharacter(enh) {
    const c = builder.instances.find((i) => i.isCharacter && !i.enhancement);
    if (!c) { flash("Add a character first, then drag the enhancement onto it."); return; }
    const err = tryAssign(c, "enhancement", enh);
    if (err) flash(err); else renderList();
  }
  function applyUpgradeToFreeUnit(up) {
    const c = builder.instances.find((i) => !i.isCharacter && i.attachedTo == null && !i.upgrade);
    if (!c) { flash("Add a non-character unit first, then drop the upgrade on it."); return; }
    const err = tryAssign(c, "upgrade", up);
    if (err) flash(err); else renderList();
  }
  function stripUpgrade(name) { return name.replace(/\s*\(upgrade\)\s*$/i, ""); }
  function updateSelNote() {
    const n = $("#sel-note");
    if (n) n.textContent = `selections ${selectionState().distinct}/4`;
  }

  // --- enhancement/upgrade selection accounting (4 total; upgrade x3) ---
  function selectionState() {
    const enh = new Set(), upg = {};
    builder.instances.forEach((i) => {
      if (i.enhancement) enh.add(i.enhancement.name);
      if (i.upgrade) upg[i.upgrade.name] = (upg[i.upgrade.name] || 0) + 1;
    });
    return { enh, upg, distinct: enh.size + Object.keys(upg).length };
  }
  // hypothetically assign ins[field]=value; revert and return an error string if invalid
  function tryAssign(ins, field, value) {
    if (field === "enhancement" && !ins.isCharacter) return "Enhancements go on characters.";
    if (field === "upgrade" && ins.isCharacter) return "Upgrades go on (non-character) units.";
    const prev = ins[field];
    ins[field] = value;
    const st = selectionState();
    let err = null;
    if (st.distinct > 4) err = "Max 4 enhancements/upgrades in total.";
    const enhCounts = {};
    builder.instances.forEach((i) => { if (i.enhancement) enhCounts[i.enhancement.name] = (enhCounts[i.enhancement.name] || 0) + 1; });
    if (Object.values(enhCounts).some((c) => c > 1)) err = "Each enhancement can only be taken once.";
    if (Object.values(st.upg).some((c) => c > 3)) err = "An upgrade can be applied to at most 3 units.";
    if (err) { ins[field] = prev; return err; }
    return null;
  }

  function instanceCost(ins, ord) {
    const u = unitByKey(ins.key);
    const cc = copyCost(u, ord, ins.size);
    let pts = cc.pts;
    let wg = 0;
    Object.entries(ins.wargear).forEach(([nm, qty]) => {
      const opt = (u.wargear || []).find((w) => w.name === nm);
      if (opt) wg += opt.points * qty;
    });
    const enh = ins.enhancement ? ins.enhancement.points : 0;
    const up = ins.upgrade ? ins.upgrade.points : 0;   // upgrades are paid per instance
    return { unit: pts, wargear: wg, enh: enh + up, total: pts + wg + enh + up, repeat: cc.isRepeat, label: cc.label };
  }

  function renderList() {
    const wrap = $("#builder-list"); wrap.innerHTML = "";
    const ord = ordinals();
    let total = 0, models = 0;
    const tops = builder.instances.filter((i) => i.attachedTo == null);
    tops.forEach((ins) => {
      const u = unitByKey(ins.key);
      const c = instanceCost(ins, ord[ins.id]);
      total += c.total; models += ins.size;
      const card = el("div", { className: "card" + (ins.isCharacter ? " character" : "") });

      // ---- drop handling: reorder / attach character / enhancement / upgrade ----
      card.addEventListener("dragover", (e) => {
        if (!dragPayload) return;
        if (dragPayload.t === "reorder") { e.preventDefault(); card.classList.add("drop-ok"); return; }
        if (dragPayload.t === "enh") {
          const en = dragPayload.enh;
          if ((!en.is_upgrade && ins.isCharacter) || (en.is_upgrade && !ins.isCharacter)) {
            e.preventDefault(); card.classList.add("drop-ok");
          }
        }
        if (dragPayload.t === "unit") {
          const cu = unitByKey(dragPayload.key);
          if (cu && cu.is_character && canLead(cu, u)) { e.preventDefault(); card.classList.add("drop-ok"); }
        }
      });
      card.addEventListener("dragleave", () => card.classList.remove("drop-ok"));
      card.addEventListener("drop", (e) => {
        card.classList.remove("drop-ok");
        if (!dragPayload) return;
        if (dragPayload.t === "reorder") {
          e.preventDefault(); e.stopPropagation();
          const rect = card.getBoundingClientRect();
          const after = rect.height ? (e.clientY - rect.top) > rect.height / 2 : false;
          moveGroup(dragPayload.id, ins.id, after);
          return;
        }
        if (dragPayload.t === "enh") {
          const en = dragPayload.enh;
          const field = en.is_upgrade ? "upgrade" : "enhancement";
          e.preventDefault(); e.stopPropagation();
          const err = tryAssign(ins, field, en); if (err) flash(err); else renderList();
        } else if (dragPayload.t === "unit") {
          const cu = unitByKey(dragPayload.key);
          if (cu && cu.is_character && canLead(cu, u)) { e.preventDefault(); e.stopPropagation(); addInstance(dragPayload.key, ins.id); }
        }
      });

      // header
      const head = el("div", { className: "row head" });
      const handle = el("span", { className: "handle", draggable: true, title: "drag to reorder" }, "⠿");
      handle.addEventListener("dragstart", (e) => {
        dragPayload = { t: "reorder", id: ins.id };
        if (e.dataTransfer) { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(ins.id)); }
      });
      handle.addEventListener("dragend", () => { dragPayload = null; });
      head.append(handle);
      const nm = el("span", { className: "name" }, ins.name);
      if (ins.isCharacter) nm.append(attachBadge(attachTypeOf(ins.key)));
      if (c.repeat) nm.append(el("span", { className: "tag3", title: "repeat-copy price" }, c.label));
      head.append(nm);
      head.append(sizeControl(ins, u));
      head.append(el("span", { className: "cost" }, c.total + "pts"));
      head.append(rmButton(ins.id));
      card.append(head);

      // enhancement slot (characters) or upgrade slot (units)
      if (ins.isCharacter) card.append(modSlot(ins, "enhancement"));
      else card.append(modSlot(ins, "upgrade"));
      // wargear
      wargearRows(ins, u).forEach((r) => card.append(r));

      // attached characters
      builder.instances.filter((x) => x.attachedTo === ins.id).forEach((ch) => {
        const cc2 = instanceCost(ch, ord[ch.id]);
        total += cc2.total;
        const row = el("div", { className: "row attached" });
        const cnm = el("span", { className: "name" }, "↳ " + ch.name);
        cnm.append(attachBadge(attachTypeOf(ch.key)));
        row.append(cnm);
        row.append(el("span", { className: "cost" }, cc2.total + "pts"));
        const detach = el("button", { className: "rm", title: "remove" }, "−");
        detach.addEventListener("click", () => removeInstance(ch.id));
        row.append(detach);
        card.append(row);
        card.append(modSlot(ch, "enhancement", true));
        wargearRows(ch, unitByKey(ch.key), true).forEach((r) => card.append(r));
      });

      wrap.append(card);
    });

    if (!tops.length) wrap.append(el("div", { className: "empty" },
      "Empty. Drag a unit here (or click +). Drag a character onto a unit to attach it; drag an enhancement onto a character."));
    const target = builder.battleSize;
    const remaining = target - total;
    $("#builder-total").textContent = total;
    $("#builder-target").textContent = target;
    const remEl = $("#builder-remaining");
    remEl.textContent = remaining >= 0 ? remaining : `${-remaining} over`;
    remEl.className = remaining < 0 ? "nerf" : "under";
    $("#total-badge").classList.toggle("over", remaining < 0);
    $("#builder-count").textContent =
      builder.instances.length ? `· ${builder.instances.length} units, ${models} models` : "";
    updateSelNote();
  }

  function sizeControl(ins, u) {
    const sizes = sizesOf(u);
    if (sizes.length <= 1) return el("span", { className: "muted" }, sizes[0] + "m");
    const ss = el("select");
    sizes.forEach((s) => {
      const o = el("option", { value: s }, `${s} models`);
      if (s === ins.size) o.selected = true;
      ss.append(o);
    });
    ss.addEventListener("change", () => { ins.size = Number(ss.value); renderList(); });
    return ss;
  }
  function rmButton(id) {
    const b = el("button", { className: "rm", title: "remove" }, "−");
    b.addEventListener("click", () => removeInstance(id));
    return b;
  }
  function modSlot(ins, field, attached) {
    const isUp = field === "upgrade";
    const val = ins[field];
    const slot = el("div", { className: "slot" + (val ? " filled" : "") + (attached ? " attached" : "") });
    if (val) {
      slot.append(el("span", { className: "name" }, (isUp ? "▲ " : "✦ ") + stripUpgrade(val.name)));
      slot.append(el("span", { className: "cost" }, val.points + "pts"));
      const rm = el("button", { className: "rm", title: "remove" }, "−");
      rm.addEventListener("click", () => { ins[field] = null; renderList(); });
      slot.append(rm);
    } else {
      slot.append(el("span", { className: "muted" }, isUp ? "drop upgrade here" : "drop enhancement here"));
    }
    const accepts = (en) => en && (isUp ? en.is_upgrade : !en.is_upgrade);
    slot.addEventListener("dragover", (e) => { if (dragPayload && dragPayload.t === "enh" && accepts(dragPayload.enh)) { e.preventDefault(); slot.classList.add("drop-ok"); } });
    slot.addEventListener("dragleave", () => slot.classList.remove("drop-ok"));
    slot.addEventListener("drop", (e) => {
      slot.classList.remove("drop-ok");
      if (dragPayload && dragPayload.t === "enh" && accepts(dragPayload.enh)) {
        e.preventDefault(); e.stopPropagation();
        const err = tryAssign(ins, field, dragPayload.enh); if (err) flash(err); else renderList();
      }
    });
    return slot;
  }
  function wargearRows(ins, u, attached) {
    if (!u.wargear || !u.wargear.length) return [];
    return u.wargear.map((w) => {
      const qty = ins.wargear[w.name] || 0;
      const row = el("div", { className: "row wg" + (attached ? " attached" : "") });
      row.append(el("span", { className: "name muted" }, "⚙ " + w.name));
      row.append(el("span", { className: "cost" }, "+" + w.points + (qty ? " ×" + qty : "")));
      const minus = el("button", { className: "rm" }, "−");
      minus.addEventListener("click", () => { if (qty > 0) { ins.wargear[w.name] = qty - 1; renderList(); } });
      const plus = el("button", {}, "+");
      plus.addEventListener("click", () => { ins.wargear[w.name] = qty + 1; renderList(); });
      row.append(minus); row.append(el("span", { className: "qty" }, qty)); row.append(plus);
      return row;
    });
  }

  let flashTimer = null;
  function flash(msg) {
    let f = $("#flash");
    if (!f) { f = el("div", { id: "flash" }); document.body.append(f); }
    f.textContent = msg; f.classList.add("show");
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => f.classList.remove("show"), 2600);
  }

  /* ---------- save / load / export ---------- */
  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeStore(arr) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(arr)); }
    catch (e) { flash("Could not save (storage unavailable)."); }
  }
  function snapshot() {
    return {
      slug: builder.slug, detachments: builder.detachments, dpBudget: builder.dpBudget,
      battleSize: builder.battleSize, seq: builder.seq,
      instances: builder.instances.map((i) => ({
        id: i.id, key: i.key, size: i.size, wargear: i.wargear,
        enhancement: i.enhancement, upgrade: i.upgrade, attachedTo: i.attachedTo,
      })),
    };
  }
  function saveList() {
    if (!builder.instances.length) { flash("Nothing to save yet."); return; }
    const name = ($("#list-name").value || "").trim()
      || `${NEW.factions[builder.slug].name} ${new Date().toLocaleDateString()}`;
    const arr = loadStore();
    const rec = { name, saved: Date.now(), ...snapshot() };
    const i = arr.findIndex((x) => x.name === name);
    if (i >= 0) arr[i] = rec; else arr.push(rec);
    writeStore(arr); renderSavedLists(); flash(`Saved "${name}".`);
  }
  function loadList(rec) {
    builder.slug = rec.slug; builder.battleSize = rec.battleSize || 2000;
    builder.dpBudget = rec.dpBudget || 3;
    builder.detachments = rec.detachments || (rec.detachment ? [rec.detachment] : []);
    builder.seq = rec.seq || rec.instances.reduce((m, i) => Math.max(m, i.id), 0);
    builder.instances = rec.instances.map((i) => {
      const u = (NEW.factions[rec.slug].units.find((x) => x.name_key === i.key)) || {};
      return { ...i, name: u.name || i.key, isCharacter: !!u.is_character };
    });
    $("#builder-faction").value = rec.slug;
    $("#builder-battlesize").value = String(builder.battleSize);
    $("#list-name").value = rec.name;
    renderDetachments(); renderAvailable(); renderEnhancements(); renderList();
    flash(`Loaded "${rec.name}".`);
  }
  function deleteList(name) {
    writeStore(loadStore().filter((x) => x.name !== name));
    renderSavedLists();
  }
  function renderSavedLists() {
    const wrap = $("#saved-lists"); wrap.innerHTML = "";
    const arr = loadStore().sort((a, b) => b.saved - a.saved);
    if (!arr.length) { wrap.append(el("div", { className: "empty" }, "No saved lists yet.")); return; }
    arr.forEach((rec) => {
      const row = el("div", { className: "saved-row" });
      const nm = el("span", { className: "name" }, rec.name);
      nm.title = "load";
      nm.addEventListener("click", () => loadList(rec));
      row.append(nm);
      const fac = NEW.factions[rec.slug];
      row.append(el("span", { className: "meta" }, (fac ? fac.name : rec.slug)));
      const del = el("button", { className: "rm", title: "delete" }, "×");
      del.addEventListener("click", () => deleteList(rec.name));
      row.append(del);
      wrap.append(row);
    });
  }
  function listToText() {
    const ord = ordinals();
    const fac = NEW.factions[builder.slug];
    let total = 0;
    const lines = [`${fac.name} — ${builder.detachments.length ? builder.detachments.map(titleCase).join(" + ") + ` (${dpUsed()}DP)` : "(no detachment)"}`];
    builder.instances.filter((i) => i.attachedTo == null).forEach((ins) => {
      const c = instanceCost(ins, ord[ins.id]); total += c.total;
      lines.push(`• ${ins.name} (${ins.size}) — ${c.total} pts` +
        (ins.enhancement ? ` [${stripUpgrade(ins.enhancement.name)}]` : "") +
        (ins.upgrade ? ` [${stripUpgrade(ins.upgrade.name)} ▲]` : ""));
      Object.entries(ins.wargear).forEach(([n, q]) => { if (q) lines.push(`    ⚙ ${n} ×${q}`); });
      builder.instances.filter((x) => x.attachedTo === ins.id).forEach((ch) => {
        const cc = instanceCost(ch, ord[ch.id]); total += cc.total;
        lines.push(`    ↳ ${ch.name} — ${cc.total} pts` + (ch.enhancement ? ` [${ch.enhancement.name}]` : ""));
      });
    });
    lines.unshift(`Total: ${total} / ${builder.battleSize} pts`);
    return lines.join("\n");
  }
  function copyList() {
    if (!builder.instances.length) { flash("Nothing to copy yet."); return; }
    const text = listToText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => flash("List copied to clipboard."),
        () => flash("Copy failed; see console."));
    }
    console.log(text);
  }

  /* ---------- init ---------- */
  renderOverview();
  fillFactionSelect();
  renderFaction();
  fillBuilderFaction();
  renderDetachments();
  renderAvailable();
  renderEnhancements();
  renderList();
  renderSavedLists();
})();
