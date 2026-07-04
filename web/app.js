/* MFM Points Explorer - vanilla JS, reads window.MFM from data.js */
(function () {
  "use strict";
  const MFM = window.MFM || { diff: { overall: {}, factions: {} }, new: { factions: {} } };
  const DIFF = MFM.diff, NEW = MFM.new;
  const DISPOS = window.DISPOSITIONS || {};
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
    // Search primary faction first, then all factions for allied units
    const primary = NEW.factions[builder.slug].units.find((u) => u.name_key === key);
    if (primary) return primary;
    for (const slug of Object.keys(NEW.factions)) {
      if (slug === builder.slug) continue;
      const found = NEW.factions[slug].units.find((u) => u.name_key === key);
      if (found) return found;
    }
    return null;
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
      size: sizesOf(u)[0], wargear: {}, loadout: {}, enhancement: null, upgrade: null, attachedTo,
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
    $("#ally-toggle").addEventListener("change", renderAvailable);
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
  function loadWargearRules(slug) {
    if (window.WARGEAR_RULES && window.WARGEAR_RULES[slug]) return; // already loaded
    const script = document.createElement("script");
    script.src = "datasheets/" + slug + "-wargear-rules.js";
    script.onload = () => renderList(); // re-render to show loadout options
    script.onerror = () => {}; // silently ignore if no file exists
    document.head.appendChild(script);
  }

  function setFaction(slug) {
    builder.slug = slug; builder.instances = []; builder.detachments = [];
    $("#builder-faction").value = slug;
    loadWargearRules(slug);
    renderDetachments(); renderDisposition(); renderAvailable(); renderEnhancements(); renderList();
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
    renderDetachments(); renderDisposition(); renderEnhancements(); renderList();
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
  function renderDisposition() {
    const sel = $("#builder-disposition");
    const prev = sel.value;
    const factionDispos = DISPOS[builder.slug] || [];
    const available = new Set();
    const norm = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (builder.detachments.length) {
      builder.detachments.forEach((detName) => {
        const key = norm(detName);
        const match = factionDispos.find((d) => norm(d.name) === key);
        if (match) available.add(match.disposition);
      });
    }
    sel.innerHTML = "";
    sel.append(el("option", { value: "" }, "— select —"));
    const ALL_DISPOS = ["Take and Hold", "Purge the Foe", "Disruption", "Reconnaissance", "Priority Assets"];
    ALL_DISPOS.forEach((d) => {
      const opt = el("option", { value: d }, d);
      if (available.size && !available.has(d)) opt.disabled = true;
      sel.append(opt);
    });
    if (prev && (!available.size || available.has(prev))) sel.value = prev;
    else sel.value = "";
  }
  function titleCase(s) {
    return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function renderAvailable() {
    const wrap = $("#builder-available"); wrap.innerHTML = "";
    const f = NEW.factions[builder.slug];
    const q = $("#unit-filter").value.trim().toLowerCase();
    const showAllies = $("#ally-toggle") && $("#ally-toggle").checked;

    // Gather units to display
    let units = f.units.map((u) => ({ ...u, _allied: false }));
    if (showAllies && q.length >= 2) {
      // Show matching units from other factions when allies toggle is on and there's a search query
      for (const slug of Object.keys(NEW.factions)) {
        if (slug === builder.slug) continue;
        NEW.factions[slug].units.forEach((u) => {
          if (u.name.toLowerCase().includes(q)) {
            units.push({ ...u, _allied: true, _allyFaction: NEW.factions[slug].name });
          }
        });
      }
    }

    units.filter((u) => !q || u.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((u) => {
        const sizes = sizesOf(u);
        const base = blockForOrdinal(u, 1);
        const rep = u.cost_blocks.find((b) => thresholdRange(b.threshold)[0] > 1);
        const row = el("div", { className: "row" + (u._allied ? " allied" : ""), draggable: true });
        row.addEventListener("dragstart", () => { dragPayload = { t: "unit", key: u.name_key }; });
        row.addEventListener("dragend", () => { dragPayload = null; });
        const nm = el("span", { className: "name clickable" }, u.name);
        nm.addEventListener("click", (e) => { e.stopPropagation(); showUnitCard(u.name_key); });
        if (u.is_character) nm.append(attachBadge(u.attach_type));
        if (u._allied) nm.append(el("span", { className: "pill allied-tag" }, u._allyFaction));
        row.append(nm);
        row.append(el("span", { className: "cost" }, tierPoints(base, sizes[0]) + (sizes.length > 1 ? "+" : "") + "pts"));
        if (rep) row.append(el("span", { className: "tag3", title: "repeat-copy cost: " + rep.threshold }, "↑" + rep.threshold));
        const add = el("button", { title: "add to list" }, "+");
        add.addEventListener("click", () => addInstance(u.name_key));
        row.append(add);
        wrap.append(row);
      });
    if (!wrap.children.length) wrap.append(el("div", { className: "empty" }, q && showAllies ? "No units matching \"" + q + "\" in any faction." : "No units."));
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
      const nm = el("span", { className: "name clickable" }, stripUpgrade(e.name));
      nm.addEventListener("click", (ev) => { ev.stopPropagation(); showEnhancementCard(e.name); });
      row.append(nm);
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
    // loadout costs from wargear rules
    wg += loadoutCost(ins);
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
      const nm = el("span", { className: "name clickable" }, ins.name);
      nm.addEventListener("click", (e) => { e.stopPropagation(); showUnitCard(ins.key); });
      if (ins.isCharacter) nm.append(attachBadge(attachTypeOf(ins.key)));
      if (c.repeat) nm.append(el("span", { className: "tag3", title: "repeat-copy price" }, c.label));
      head.append(nm);
      head.append(sizeControl(ins, u));
      head.append(el("span", { className: "cost" }, c.total + "pts"));
      head.append(rmButton(ins.id));
      const collapseBtn = el("button", { className: "collapse-btn", title: "collapse/expand" }, "▾");
      head.append(collapseBtn);
      card.append(head);

      // collapsible body
      const body = el("div", { className: "card-body" });
      const collapsed = builder._collapsed && builder._collapsed.has(ins.id);
      if (collapsed) { body.classList.add("hidden"); collapseBtn.textContent = "▸"; }
      collapseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!builder._collapsed) builder._collapsed = new Set();
        if (builder._collapsed.has(ins.id)) {
          builder._collapsed.delete(ins.id);
          body.classList.remove("hidden");
          collapseBtn.textContent = "▾";
        } else {
          builder._collapsed.add(ins.id);
          body.classList.add("hidden");
          collapseBtn.textContent = "▸";
        }
      });

      // enhancement slot (characters) or upgrade slot (units)
      if (ins.isCharacter) body.append(modSlot(ins, "enhancement"));
      else body.append(modSlot(ins, "upgrade"));
      // wargear
      wargearRows(ins, u).forEach((r) => body.append(r));

      // loadout config
      const loadoutEl = renderLoadoutSection(ins);
      if (loadoutEl) body.append(loadoutEl);

      // attached characters
      builder.instances.filter((x) => x.attachedTo === ins.id).forEach((ch) => {
        const cc2 = instanceCost(ch, ord[ch.id]);
        total += cc2.total;
        const row = el("div", { className: "row attached" });
        const cnm = el("span", { className: "name clickable" }, "↳ " + ch.name);
        cnm.addEventListener("click", (e) => { e.stopPropagation(); showUnitCard(ch.key); });
        cnm.append(attachBadge(attachTypeOf(ch.key)));
        row.append(cnm);
        row.append(el("span", { className: "cost" }, cc2.total + "pts"));
        const detach = el("button", { className: "rm", title: "remove" }, "−");
        detach.addEventListener("click", () => removeInstance(ch.id));
        row.append(detach);
        body.append(row);
        body.append(modSlot(ch, "enhancement", true));
        wargearRows(ch, unitByKey(ch.key), true).forEach((r) => body.append(r));
      });

      card.append(body);
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
      const nm = el("span", { className: "name clickable" }, (isUp ? "▲ " : "✦ ") + stripUpgrade(val.name));
      nm.addEventListener("click", (ev) => { ev.stopPropagation(); showEnhancementCard(val.name); });
      slot.append(nm);
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
      disposition: $("#builder-disposition").value,
      instances: builder.instances.map((i) => ({
        id: i.id, key: i.key, size: i.size, wargear: i.wargear, loadout: i.loadout || {},
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
      return { ...i, loadout: i.loadout || {}, name: u.name || i.key, isCharacter: !!u.is_character };
    });
    $("#builder-faction").value = rec.slug;
    $("#builder-battlesize").value = String(builder.battleSize);
    $("#builder-disposition").value = rec.disposition || "";
    $("#list-name").value = rec.name;
    renderDetachments(); renderDisposition(); renderAvailable(); renderEnhancements(); renderList();
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
    const disposition = $("#builder-disposition").value;
    let total = 0;
    const lines = [];
    lines.push(`${fac.name}`);
    lines.push(`Detachment: ${builder.detachments.length ? builder.detachments.map(titleCase).join(" + ") : "(none)"}`);
    lines.push(`Disposition: ${disposition || "(none)"}`);
    lines.push(`Battle Size: ${BATTLE_SIZES.find(([, pts]) => pts === builder.battleSize)?.[0] || ""} (${builder.battleSize} pts)`);
    lines.push("");
    builder.instances.filter((i) => i.attachedTo == null).forEach((ins) => {
      const u = unitByKey(ins.key);
      const c = instanceCost(ins, ord[ins.id]); total += c.total;
      // attached characters
      const attached = builder.instances.filter((x) => x.attachedTo === ins.id);
      attached.forEach((ch) => { total += instanceCost(ch, ord[ch.id]).total; });
      // unit line
      let line = `${ins.name} (${ins.size} model${ins.size > 1 ? "s" : ""})`;
      // enhancement on the unit itself (characters)
      if (ins.enhancement) line += ` — ${stripUpgrade(ins.enhancement.name)}`;
      if (ins.upgrade) line += ` — ${stripUpgrade(ins.upgrade.name)} [Upgrade]`;
      // wargear
      const wgParts = [];
      Object.entries(ins.wargear).forEach(([n, q]) => { if (q) wgParts.push(`${n} ×${q}`); });
      // loadout choices
      if (ins.loadout) {
        const lRules = getWargearRules(builder.slug, ins.key);
        if (lRules) {
          lRules.forEach((rule, ri) => {
            rule.choices.forEach((choice, ci) => {
              const cKey = "r" + ri + "_c" + ci;
              const qty = ins.loadout[cKey] || 0;
              if (qty > 0) wgParts.push(`${choiceLabel(choice)} ×${qty}`);
            });
          });
        }
      }
      if (wgParts.length) line += ` — ${wgParts.join(", ")}`;
      // cost
      let unitTotal = c.total;
      attached.forEach((ch) => { unitTotal += instanceCost(ch, ord[ch.id]).total; });
      line += ` [${unitTotal} pts]`;
      lines.push(line);
      // attached characters
      attached.forEach((ch) => {
        const cc = instanceCost(ch, ord[ch.id]);
        let chLine = `  ↳ ${ch.name}`;
        if (ch.enhancement) chLine += ` — ${ch.enhancement.name}`;
        chLine += ` [${cc.total} pts]`;
        lines.push(chLine);
      });
    });
    lines.push("");
    lines.push(`Total: ${total} / ${builder.battleSize} pts`);
    return lines.join("\n");
  }
  function copyList() {
    if (!builder.instances.length) { flash("Nothing to copy yet."); return; }
    const disposition = $("#builder-disposition").value;
    if (!disposition) { flash("Select a Force Disposition before exporting."); return; }
    const text = listToText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => flash("List copied to clipboard."),
        () => flash("Copy failed; see console."));
    }
    console.log(text);
  }

  /* ---------- datasheets lazy loading ---------- */
  const datasheetCache = {};
  function loadDatasheets(slug, cb) {
    if (datasheetCache[slug]) { cb(datasheetCache[slug]); return; }
    const ds = window.DATASHEETS && window.DATASHEETS[slug];
    if (ds) { datasheetCache[slug] = ds; cb(ds); return; }
    const script = document.createElement("script");
    script.src = "datasheets/" + slug + ".js";
    script.onload = () => {
      const loaded = window.DATASHEETS && window.DATASHEETS[slug];
      if (loaded) datasheetCache[slug] = loaded;
      cb(loaded || null);
    };
    script.onerror = () => cb(null);
    document.head.appendChild(script);
  }

  /* ---------- unit info card (modal) ---------- */
  function normalizeKey(str) { return str.toLowerCase().replace(/-/g, " ").replace(/[^a-z0-9 ]/g, "").trim(); }
  function slugFromKey(key) { return key.replace(/\s+/g, "-"); }

  function findDatasheet(datasheets, nameKey) {
    const norm = normalizeKey(nameKey);
    return datasheets.find((d) =>
      normalizeKey(d.name_key) === norm || normalizeKey(d.slug) === norm
    ) || null;
  }

  function showUnitCard(nameKey) {
    const root = document.getElementById("info-card-root");
    root.innerHTML = "";
    const overlay = el("div", { className: "info-card-overlay" });
    const card = el("div", { className: "info-card" });
    const closeBtn = el("button", { className: "info-card-close", title: "Close" }, "✕");
    closeBtn.addEventListener("click", () => root.innerHTML = "");
    card.append(closeBtn);
    card.append(el("h2", {}, nameKey.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())));
    card.append(el("div", { className: "loading" }, "Loading datasheet…"));
    overlay.append(card);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) root.innerHTML = ""; });
    root.append(overlay);

    loadDatasheets(builder.slug, (datasheets) => {
      const loading = card.querySelector(".loading");
      if (!datasheets) { if (loading) loading.textContent = "Datasheet unavailable."; return; }
      const ds = findDatasheet(datasheets, nameKey);
      if (!ds) { if (loading) loading.textContent = "Unit not found in datasheets."; return; }
      if (loading) loading.remove();
      // Update title with proper name
      card.querySelector("h2").textContent = ds.name;
      populateInfoCard(card, ds);
    });
  }

  function populateInfoCard(card, ds) {
    // --- Stat block ---
    if (ds.models && ds.models.length) {
      card.append(el("h3", {}, "Models"));
      const tbl = document.createElement("table");
      tbl.className = "stat-table";
      const hdr = el("tr");
      ["Model", "M", "T", "SV", "Inv", "FNP", "W", "LD", "OC"].forEach((h) =>
        hdr.append(el("th", {}, h)));
      tbl.append(el("thead", {}, hdr));
      const tbody = document.createElement("tbody");
      ds.models.forEach((m) => {
        const tr = el("tr");
        tr.append(el("td", {}, m.name));
        tr.append(el("td", {}, m.m || "—"));
        tr.append(el("td", {}, m.t != null ? String(m.t) : "—"));
        tr.append(el("td", {}, m.sv || "—"));
        tr.append(el("td", {}, m.invuln || "—"));
        tr.append(el("td", {}, m.fnp || "—"));
        tr.append(el("td", {}, m.w != null ? String(m.w) : "—"));
        tr.append(el("td", {}, m.ld || "—"));
        tr.append(el("td", {}, m.oc != null ? String(m.oc) : "—"));
        tbody.append(tr);
      });
      tbl.append(tbody);
      card.append(tbl);
    }

    // --- Ranged weapons ---
    if (ds.ranged_weapons && ds.ranged_weapons.length) {
      card.append(el("h3", {}, "Ranged Weapons"));
      const tbl = document.createElement("table");
      tbl.className = "weapon-table";
      const hdr = el("tr");
      ["Weapon", "Range", "A", "BS", "S", "AP", "D", "Abilities"].forEach((h) =>
        hdr.append(el("th", {}, h)));
      tbl.append(el("thead", {}, hdr));
      const tbody = document.createElement("tbody");
      ds.ranged_weapons.forEach((w) => {
        const tr = el("tr");
        tr.append(el("td", {}, w.name));
        tr.append(el("td", {}, w.range || "—"));
        tr.append(el("td", {}, w.a || "—"));
        tr.append(el("td", {}, w.bs || "—"));
        tr.append(el("td", {}, w.s != null ? String(w.s) : "—"));
        tr.append(el("td", {}, w.ap != null ? String(w.ap) : "—"));
        tr.append(el("td", {}, w.d || "—"));
        tr.append(el("td", {}, w.abilities || ""));
        tbody.append(tr);
      });
      tbl.append(tbody);
      card.append(tbl);
    }

    // --- Melee weapons ---
    if (ds.melee_weapons && ds.melee_weapons.length) {
      card.append(el("h3", {}, "Melee Weapons"));
      const tbl = document.createElement("table");
      tbl.className = "weapon-table";
      const hdr = el("tr");
      ["Weapon", "A", "WS", "S", "AP", "D", "Abilities"].forEach((h) =>
        hdr.append(el("th", {}, h)));
      tbl.append(el("thead", {}, hdr));
      const tbody = document.createElement("tbody");
      ds.melee_weapons.forEach((w) => {
        const tr = el("tr");
        tr.append(el("td", {}, w.name));
        tr.append(el("td", {}, w.a || "—"));
        tr.append(el("td", {}, w.ws || "—"));
        tr.append(el("td", {}, w.s != null ? String(w.s) : "—"));
        tr.append(el("td", {}, w.ap != null ? String(w.ap) : "—"));
        tr.append(el("td", {}, w.d || "—"));
        tr.append(el("td", {}, w.abilities || ""));
        tbody.append(tr);
      });
      tbl.append(tbody);
      card.append(tbl);
    }

    // --- Abilities (core + faction as pills) ---
    const pills = [];
    if (ds.core_abilities && ds.core_abilities.length) {
      ds.core_abilities.forEach((a) => pills.push(el("span", { className: "ability-pill core" }, a)));
    }
    if (ds.faction_abilities && ds.faction_abilities.length) {
      ds.faction_abilities.forEach((a) => pills.push(el("span", { className: "ability-pill faction" }, a)));
    }
    if (pills.length) {
      card.append(el("h3", {}, "Abilities"));
      const wrap = el("div", { className: "ability-pills" });
      pills.forEach((p) => wrap.append(p));
      card.append(wrap);
    }

    // --- Unit abilities ---
    if (ds.unit_abilities && Object.keys(ds.unit_abilities).length) {
      Object.entries(ds.unit_abilities).forEach(([name, desc]) => {
        const div = el("div", { className: "unit-ability" });
        div.append(el("strong", {}, name + ": "));
        div.append(document.createTextNode(desc));
        card.append(div);
      });
    }

    // --- Wargear abilities ---
    if (ds.wargear_abilities && Object.keys(ds.wargear_abilities).length) {
      card.append(el("h3", {}, "Wargear Abilities"));
      Object.entries(ds.wargear_abilities).forEach(([name, desc]) => {
        const div = el("div", { className: "wargear-ability" });
        div.append(el("strong", {}, name + ": "));
        div.append(document.createTextNode(desc));
        card.append(div);
      });
    }

    // --- Wargear options text ---
    if (ds.wargear_options && ds.wargear_options.length) {
      card.append(el("h3", {}, "Wargear Options"));
      const ul = document.createElement("ul");
      ul.className = "wargear-text";
      ds.wargear_options.forEach((opt) => ul.append(el("li", {}, opt)));
      card.append(ul);
    }

    // --- Leader info ---
    if (ds.leader_info) {
      const li = ds.leader_info;
      const parts = [];
      if (li.led_by && li.led_by.length) parts.push("Led by: " + li.led_by.join(", "));
      if (li.supported_by && li.supported_by.length) parts.push("Supported by: " + li.supported_by.join(", "));
      if (li.type) parts.push("Type: " + li.type);
      if (parts.length) {
        card.append(el("h3", {}, "Leader Info"));
        card.append(el("div", { className: "leader-info" }, parts.join(" · ")));
      }
    }

    // --- Transport ---
    if (ds.transport) {
      card.append(el("h3", {}, "Transport"));
      card.append(el("div", { className: "transport-info" }, ds.transport));
    }

    // --- Keywords ---
    if (ds.keywords && ds.keywords.length) {
      card.append(el("h3", {}, "Keywords"));
      const kw = el("div", { className: "ability-pills" });
      ds.keywords.forEach((k) => kw.append(el("span", { className: "ability-pill" }, k)));
      card.append(kw);
    }
  }

  /* ---------- wargear loadout configuration ---------- */
  function getWargearRules(slug, nameKey) {
    const rules = window.WARGEAR_RULES && window.WARGEAR_RULES[slug];
    if (!rules) return null;
    // Try slug form (hyphens)
    const slugKey = slugFromKey(nameKey);
    if (rules[slugKey]) return rules[slugKey];
    // Try as-is
    if (rules[nameKey]) return rules[nameKey];
    return null;
  }

  function choiceLabel(choice) {
    if (Array.isArray(choice)) return choice.join(" + ");
    return choice;
  }

  function maxAllowed(rule, unitSize) {
    if (rule.max_swaps === null) return Infinity; // replace_any: unlimited
    let base = rule.max_swaps;
    if (rule.per_models && unitSize) {
      // "for every N models" scales the allowance
      base = Math.floor(unitSize / rule.per_models) * rule.max_swaps;
    }
    return base;
  }

  function loadoutCostForChoice(ins, choiceKey) {
    // Look up wargear cost from MFM data
    const u = unitByKey(ins.key);
    if (!u || !u.wargear) return 0;
    const wg = u.wargear.find((w) => w.name.toLowerCase() === choiceKey.toLowerCase());
    return wg ? wg.points : 0;
  }

  function ensureLoadout(ins) {
    if (!ins.loadout) ins.loadout = {};
  }

  function renderLoadoutSection(ins) {
    const rules = getWargearRules(builder.slug, ins.key);
    if (!rules || !rules.length) return null;
    ensureLoadout(ins);

    const section = el("div", { className: "loadout-section" });
    section.append(el("div", { className: "loadout-title" }, "Loadout Options"));

    rules.forEach((rule, ri) => {
      const ruleKey = "r" + ri;
      const ruleDiv = el("div", { className: "loadout-rule" });

      // Label: what gets replaced
      const labelSpan = el("span", { className: "rule-label" });
      const typeLabel = rule.type.replace(/_/g, " ");
      let desc = typeLabel;
      if (rule.replaces && rule.replaces.length) {
        desc += " — ";
        const rep = el("span", { className: "replaces" }, rule.replaces.join(" + "));
        labelSpan.append(document.createTextNode(desc));
        labelSpan.append(rep);
      } else {
        labelSpan.append(document.createTextNode(desc));
      }
      if (rule.eligible_models && rule.eligible_models !== "any") {
        labelSpan.append(document.createTextNode(" (" + rule.eligible_models + ")"));
      }
      ruleDiv.append(labelSpan);

      // Max tag
      const max = maxAllowed(rule, ins.size);
      if (max !== Infinity) {
        ruleDiv.append(el("span", { className: "max-tag" }, "max " + max));
      }

      // For each choice, render a qty control
      rule.choices.forEach((choice, ci) => {
        const cKey = ruleKey + "_c" + ci;
        const cLabel = choiceLabel(choice);
        const qty = ins.loadout[cKey] || 0;
        const cost = rule.costs_points ? loadoutCostForChoice(ins, cLabel) : 0;

        const ctrl = el("div", { className: "qty-ctrl" });
        ctrl.append(el("span", { className: "muted" }, cLabel));
        const minus = el("button", { className: "rm" }, "−");
        minus.addEventListener("click", () => {
          ensureLoadout(ins);
          if ((ins.loadout[cKey] || 0) > 0) {
            ins.loadout[cKey] = (ins.loadout[cKey] || 0) - 1;
            renderList();
          }
        });
        const plus = el("button", {}, "+");
        plus.addEventListener("click", () => {
          ensureLoadout(ins);
          const current = ins.loadout[cKey] || 0;
          // Check max per choice (scales with per_models if applicable)
          if (rule.max_per_choice != null) {
            let perChoiceMax = rule.max_per_choice;
            if (rule.per_models && ins.size) {
              perChoiceMax = Math.floor(ins.size / rule.per_models) * rule.max_per_choice;
            }
            if (current >= perChoiceMax) {
              flash("Max " + perChoiceMax + " of " + cLabel + " allowed (unit size " + ins.size + ").");
              return;
            }
          }
          // Check total for this rule
          const totalForRule = rule.choices.reduce((s, _, j) => s + (ins.loadout[ruleKey + "_c" + j] || 0), 0);
          if (totalForRule >= max) {
            flash("Max " + max + " swaps for this option (unit size " + ins.size + ").");
            return;
          }
          ins.loadout[cKey] = current + 1;
          renderList();
        });
        ctrl.append(minus);
        ctrl.append(el("span", { className: "qty" }, String(qty)));
        ctrl.append(plus);
        if (cost > 0) {
          ctrl.append(el("span", { className: "cost-tag" }, "+" + cost + "pts ea"));
        }
        ruleDiv.append(ctrl);
      });

      section.append(ruleDiv);
    });
    return section;
  }

  function loadoutCost(ins) {
    if (!ins.loadout) return 0;
    const rules = getWargearRules(builder.slug, ins.key);
    if (!rules) return 0;
    let total = 0;
    rules.forEach((rule, ri) => {
      if (!rule.costs_points) return;
      rule.choices.forEach((choice, ci) => {
        const cKey = "r" + ri + "_c" + ci;
        const qty = ins.loadout[cKey] || 0;
        if (qty > 0) {
          const cLabel = choiceLabel(choice);
          total += loadoutCostForChoice(ins, cLabel) * qty;
        }
      });
    });
    return total;
  }

  /* ---------- faction rules lazy loading ---------- */
  const rulesCache = {};
  function loadFactionRules(slug, cb) {
    if (rulesCache[slug]) { cb(rulesCache[slug]); return; }
    const existing = window.FACTION_RULES && window.FACTION_RULES[slug];
    if (existing) { rulesCache[slug] = existing; cb(existing); return; }
    const script = document.createElement("script");
    script.src = "rules/" + slug + ".js";
    script.onload = () => {
      const loaded = window.FACTION_RULES && window.FACTION_RULES[slug];
      if (loaded) rulesCache[slug] = loaded;
      cb(loaded || null);
    };
    script.onerror = () => cb(null);
    document.head.appendChild(script);
  }

  /* ---------- enhancement info card ---------- */
  function showEnhancementCard(enhName) {
    const root = document.getElementById("info-card-root");
    root.innerHTML = "";
    const overlay = el("div", { className: "info-card-overlay" });
    const card = el("div", { className: "info-card" });
    const closeBtn = el("button", { className: "info-card-close", title: "Close" }, "✕");
    closeBtn.addEventListener("click", () => root.innerHTML = "");
    card.append(closeBtn);
    card.append(el("h2", {}, enhName));
    card.append(el("div", { className: "loading" }, "Loading rules…"));
    overlay.append(card);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) root.innerHTML = ""; });
    root.append(overlay);

    loadFactionRules(builder.slug, (rules) => {
      const loading = card.querySelector(".loading");
      if (!rules) { if (loading) loading.textContent = "Rules not available for this faction."; return; }
      // Search all detachments for the enhancement
      let found = null;
      const dets = rules.detachments || {};
      const enhNorm = enhName.toLowerCase().replace(/^the\s+/, "").replace(/[^a-z0-9]/g, "");
      for (const dk of Object.keys(dets)) {
        const det = dets[dk];
        if (det.enhancements) {
          const match = det.enhancements.find((e) => {
            const eNorm = e.name.toLowerCase().replace(/^the\s+/, "").replace(/\s*\(.*?\)\s*/g, "").replace(/[^a-z0-9]/g, "");
            return e.name === enhName || eNorm === enhNorm;
          });
          if (match) { found = match; break; }
        }
      }
      if (!found) { if (loading) loading.textContent = "Enhancement not found in rules data."; return; }
      if (loading) loading.remove();
      // Populate card
      card.append(el("div", { className: "enh-points" }, found.points + " pts"));
      if (found.restriction) card.append(el("div", { className: "enh-restriction" }, found.restriction));
      card.append(el("div", { className: "enh-description" }, found.description));
    });
  }

  /* ---------- stratagem info card ---------- */
  function showStratagemCard(stratName) {
    const root = document.getElementById("info-card-root");
    root.innerHTML = "";
    const overlay = el("div", { className: "info-card-overlay" });
    const card = el("div", { className: "info-card" });
    const closeBtn = el("button", { className: "info-card-close", title: "Close" }, "✕");
    closeBtn.addEventListener("click", () => root.innerHTML = "");
    card.append(closeBtn);
    card.append(el("h2", {}, stratName));
    card.append(el("div", { className: "loading" }, "Loading rules…"));
    overlay.append(card);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) root.innerHTML = ""; });
    root.append(overlay);

    loadFactionRules(builder.slug, (rules) => {
      const loading = card.querySelector(".loading");
      if (!rules) { if (loading) loading.textContent = "Rules not available for this faction."; return; }
      let found = null;
      const dets = rules.detachments || {};
      for (const dk of Object.keys(dets)) {
        const det = dets[dk];
        if (det.stratagems) {
          const match = det.stratagems.find((s) => s.name === stratName);
          if (match) { found = match; break; }
        }
      }
      if (!found) { if (loading) loading.textContent = "Stratagem not found in rules data."; return; }
      if (loading) loading.remove();
      // Meta row
      const meta = el("div", { className: "strat-meta" });
      if (found.cost) meta.append(el("span", {}, found.cost));
      if (found.phase) meta.append(el("span", {}, found.phase));
      if (found.type) meta.append(el("span", {}, found.type));
      card.append(meta);
      if (found.when) {
        const f = el("div", { className: "strat-field" });
        f.append(el("strong", {}, "When: ")); f.append(document.createTextNode(found.when));
        card.append(f);
      }
      if (found.target) {
        const f = el("div", { className: "strat-field" });
        f.append(el("strong", {}, "Target: ")); f.append(document.createTextNode(found.target));
        card.append(f);
      }
      if (found.effect) {
        const f = el("div", { className: "strat-field" });
        f.append(el("strong", {}, "Effect: ")); f.append(document.createTextNode(found.effect));
        card.append(f);
      }
    });
  }

  /* ---------- print reference sheet ---------- */
  function loadAbilitySummaries(slug, cb) {
    const existing = window.ABILITY_SUMMARIES && window.ABILITY_SUMMARIES[slug];
    if (existing) { cb(existing); return; }
    const script = document.createElement("script");
    script.src = "ability-summaries/" + slug + ".js";
    script.onload = () => {
      const loaded = window.ABILITY_SUMMARIES && window.ABILITY_SUMMARIES[slug];
      cb(loaded || null);
    };
    script.onerror = () => cb(null);
    document.head.appendChild(script);
  }

  function loadRuleSummaries(slug, cb) {
    const existing = window.RULE_SUMMARIES && window.RULE_SUMMARIES[slug];
    if (existing) { cb(existing); return; }
    const script = document.createElement("script");
    script.src = "rule-summaries/" + slug + ".js";
    script.onload = () => {
      const loaded = window.RULE_SUMMARIES && window.RULE_SUMMARIES[slug];
      cb(loaded || null);
    };
    script.onerror = () => cb(null);
    document.head.appendChild(script);
  }

  function printSheet() {
    if (!builder.instances.length) { flash("Add units to your list first."); return; }

    // Determine which faction slugs have units in the list
    const allKeys = new Set(builder.instances.map((i) => i.key));
    const primarySlug = builder.slug;
    const alliedSlugs = new Set();
    allKeys.forEach((key) => {
      // If not found in primary faction, find which faction it belongs to
      const inPrimary = NEW.factions[primarySlug].units.find((u) => u.name_key === key);
      if (!inPrimary) {
        for (const slug of Object.keys(NEW.factions)) {
          if (slug === primarySlug) continue;
          if (NEW.factions[slug].units.find((u) => u.name_key === key)) {
            alliedSlugs.add(slug);
            break;
          }
        }
      }
    });

    // Load primary + allied datasheets
    loadDatasheets(primarySlug, (primaryDs) => {
      if (!primaryDs) { flash("Datasheets not available for this faction yet."); return; }
      const slugsToLoad = [...alliedSlugs];
      let allDatasheets = [...primaryDs];

      function loadNext() {
        if (!slugsToLoad.length) {
          finishPrint(allDatasheets);
          return;
        }
        const slug = slugsToLoad.pop();
        loadDatasheets(slug, (ds) => {
          if (ds) allDatasheets = allDatasheets.concat(ds);
          loadNext();
        });
      }
      loadNext();
    });

    function finishPrint(datasheets) {
      // Build unit groups: top-level units with their attached characters
      const seen = new Set();
      const unitGroups = [];
      const tops = builder.instances.filter((i) => i.attachedTo == null);
      tops.forEach((ins) => {
        if (seen.has(ins.key)) return;
        seen.add(ins.key);
        const attached = builder.instances.filter((x) => x.attachedTo === ins.id);
        const charKeys = [];
        attached.forEach((ch) => { if (!seen.has(ch.key)) { seen.add(ch.key); charKeys.push(ch.key); } });
        unitGroups.push({ parentKey: ins.key, characterKeys: charKeys, instance: ins });
      });
      // Load faction rules and ability summaries (primary faction only)
      loadFactionRules(builder.slug, (rules) => {
        loadAbilitySummaries(builder.slug, (summaries) => {
          loadRuleSummaries(builder.slug, (ruleSummaries) => {
            const html = buildPrintHTML(unitGroups, datasheets, rules, summaries, ruleSummaries);
            const win = window.open("", "_blank");
            if (!win) { flash("Pop-up blocked. Allow pop-ups for this site."); return; }
            win.document.write(html);
            win.document.close();
          });
        });
      });
    }
  }

  function buildPrintHTML(unitGroups, datasheets, rules, summaries, ruleSummaries) {
    const fac = NEW.factions[builder.slug];
    const disposition = $("#builder-disposition").value;
    const abSums = summaries || {};

    // Helper: format rule text with structure (tables, line breaks for sections)
    function formatRuleText(text) {
      if (!text) return "";
      let html = esc(text);
      // Detect "In a/an X sized battle, you receive N ..." pattern → table
      const sizePattern = /In an? (\w+) sized battle,? you receive (\d+) ([^.]+)\./gi;
      const sizeMatches = [...text.matchAll(sizePattern)];
      if (sizeMatches.length >= 2) {
        let tbl = '<table class="resurg"><tr><th>Battle Size</th><th>Tokens</th></tr>';
        sizeMatches.forEach((m) => { tbl += `<tr><td>${esc(m[1])}</td><td>${esc(m[2])}</td></tr>`; });
        tbl += '</table>';
        // Replace the matched text block with the table
        const firstIdx = html.indexOf(esc(sizeMatches[0][0]));
        const lastMatch = sizeMatches[sizeMatches.length - 1];
        const lastIdx = html.indexOf(esc(lastMatch[0])) + esc(lastMatch[0]).length;
        if (firstIdx >= 0 && lastIdx > firstIdx) {
          html = html.slice(0, firstIdx) + tbl + html.slice(lastIdx);
        }
      }
      // Detect "Incursion : N ... Strike Force : N ... Onslaught : N ..." pattern
      const colonPattern = /Incursion\s*:\s*(\d+)\s*[^.]*?Strike Force\s*:\s*(\d+)\s*[^.]*?Onslaught\s*:\s*(\d+)/i;
      const colonMatch = text.match(colonPattern);
      if (colonMatch && sizeMatches.length < 2) {
        const tbl = `<table class="resurg"><tr><th>Incursion</th><th>Strike Force</th><th>Onslaught</th></tr><tr><td>${esc(colonMatch[1])}</td><td>${esc(colonMatch[2])}</td><td>${esc(colonMatch[3])}</td></tr></table>`;
        const fullMatch = esc(colonMatch[0]);
        html = html.replace(fullMatch, tbl);
      }
      // Bold section headers (e.g., "Agile Manoeuvres", "Swift as the Wind")
      html = html.replace(/([A-Z][A-Za-z\u2019']+(?:\s+[A-Za-z\u2019']+){0,4})\s+(Trigger:|When:|Effect:)/g, '<br><b>$1</b> $2');
      // Line breaks before "Trigger:", "When:", "Effect:" patterns
      html = html.replace(/(Trigger\s*:)/g, '<br><b>$1</b>');
      // Wrap in paragraph
      return `<p>${html}</p>`;
    }

    // Helper: get condensed ability text for a unit
    function getAbilityText(ds) {
      const parts = [];
      if (ds.core_abilities) parts.push(...ds.core_abilities.map((a) => a.replace("Feel No Pain", "FNP").replace("Deep Strike", "DS")));
      if (ds.faction_abilities) parts.push(...ds.faction_abilities.map((a) => a.toLowerCase().replace(/\s+/g, " ")));
      // Add condensed unit abilities from summaries
      const slug = ds.slug || ds.name_key.replace(/\s+/g, "-");
      const unitSums = abSums[slug];
      if (unitSums) {
        Object.values(unitSums).forEach((s) => parts.push(s));
      } else if (ds.unit_abilities) {
        // Fallback: just show ability names
        Object.keys(ds.unit_abilities).forEach((n) => parts.push(n.toLowerCase()));
      }
      return parts.join("; ");
    }

    // Helper: render stat + weapon rows for a single datasheet
    function renderUnitRows(ds, isCharacter, instance) {
      let rows = "";
      const models = ds.models || [];

      // Determine which weapons to show based on instance loadout/wargear
      let rangedWeapons = ds.ranged_weapons || [];
      let meleeWeapons = ds.melee_weapons || [];

      if (instance) {
        const slug = ds.slug || ds.name_key.replace(/\s+/g, "-");
        const wgRules = getWargearRules(builder.slug, ds.name_key || slug);
        const replacedWeapons = new Set();
        const addedWeapons = new Set();

        // Check loadout (free swaps from wargear rules)
        if (instance.loadout && wgRules) {
          wgRules.forEach((rule, ri) => {
            const ruleKey = "r" + ri;
            let anyChosen = false;
            rule.choices.forEach((choice, ci) => {
              const cKey = ruleKey + "_c" + ci;
              const qty = instance.loadout[cKey] || 0;
              if (qty > 0) {
                anyChosen = true;
                const cLabel = Array.isArray(choice) ? choice.join(" + ") : choice;
                addedWeapons.add(cLabel.toLowerCase());
              }
            });
            // If any choice was made for this rule, the replaced weapon is gone
            if (anyChosen && rule.replaces && rule.replaces.length) {
              rule.replaces.forEach((r) => replacedWeapons.add(r.toLowerCase()));
            }
          });
        }

        // Check paid wargear (e.g., "per Rupture cannon")
        if (instance.wargear) {
          Object.entries(instance.wargear).forEach(([name, qty]) => {
            if (qty > 0) {
              // The paid wargear name is like "per Rupture cannon" — extract weapon name
              const wpnName = name.replace(/^per\s+/i, "").toLowerCase();
              addedWeapons.add(wpnName);
              // Find which weapon it replaces from the wargear rules
              if (wgRules) {
                for (const rule of wgRules) {
                  const choiceMatch = rule.choices.some((c) => {
                    const cLabel = (Array.isArray(c) ? c.join(" + ") : c).toLowerCase();
                    return cLabel === wpnName;
                  });
                  if (choiceMatch && rule.replaces && rule.replaces.length) {
                    rule.replaces.forEach((r) => replacedWeapons.add(r.toLowerCase()));
                  }
                }
              }
            }
          });
        }

        // Filter weapons: remove replaced, keep added + anything not replaced
        if (replacedWeapons.size > 0) {
          rangedWeapons = rangedWeapons.filter((w) => !replacedWeapons.has(w.name.toLowerCase()));
          meleeWeapons = meleeWeapons.filter((w) => !replacedWeapons.has(w.name.toLowerCase()));
        }
      }

      const allWeapons = [];
      rangedWeapons.forEach((w) => allWeapons.push({ ...w, type: "r" }));
      meleeWeapons.forEach((w) => allWeapons.push({ ...w, type: "m" }));
      const rowCount = Math.max(models.length, allWeapons.length, 1);
      const abilityText = getAbilityText(ds);
      const charClass = isCharacter ? "char-row" : "";

      for (let i = 0; i < rowCount; i++) {
        const m = models[i];
        const w = allWeapons[i];
        let row = charClass ? `<tr class="${charClass}">` : "<tr>";
        // Stat cells
        if (m) {
          row += `<td class="stat">${esc(m.m || "-")}</td>`;
          row += `<td class="stat">${m.t != null ? m.t : "-"}</td>`;
          row += `<td class="stat">${esc(m.sv || "-")}</td>`;
          row += `<td class="stat">${esc(m.invuln || "-")}</td>`;
          row += `<td class="stat">${esc(m.fnp || "-")}</td>`;
          row += `<td class="stat">${m.w != null ? m.w : "-"}</td>`;
          row += `<td class="stat">${esc(m.ld || "-")}</td>`;
          row += `<td class="stat">${m.oc != null ? m.oc : "-"}</td>`;
          row += `<td class="ab">${i === 0 ? esc(abilityText) : ""}</td>`;
        } else {
          row += '<td class="empty">-</td>'.repeat(8);
          row += '<td class="ab"></td>';
        }
        // Weapon cells
        if (w) {
          const cls = w.type === "r" ? "r" : "m";
          if (w.type === "r") {
            row += `<td class="${cls}">${esc(w.range || "-")}</td>`;
            row += `<td class="${cls}">${esc(w.a || "-")}</td>`;
            row += `<td class="${cls}">${esc(w.bs || "-")}</td>`;
          } else {
            row += `<td class="${cls}">m</td>`;
            row += `<td class="${cls}">${esc(w.a || "-")}</td>`;
            row += `<td class="${cls}">${esc(w.ws || "-")}</td>`;
          }
          row += `<td class="${cls}">${w.s != null ? w.s : "-"}</td>`;
          row += `<td class="${cls}">${w.ap != null ? w.ap : "-"}</td>`;
          row += `<td class="${cls}">${esc(w.d || "-")}</td>`;
          row += `<td class="${cls} wn">${esc(w.abilities || w.name || "")}</td>`;
        } else {
          row += '<td class="empty">-</td>'.repeat(7);
        }
        row += "</tr>\n";
        rows += row;
      }
      return { html: rows, rowCount };
    }

    // Build grouped unit rows
    let tableRows = "";
    unitGroups.forEach((group) => {
      const parentDs = findDatasheet(datasheets, group.parentKey);
      if (!parentDs) return;
      tableRows += '<tr class="sep"><td colspan="17"></td></tr>\n';

      // Determine total row count for the unit-name rowspan
      const parentResult = renderUnitRows(parentDs, false, group.instance);
      let totalGroupRows = parentResult.rowCount;
      const charResults = [];
      group.characterKeys.forEach((ck) => {
        const cds = findDatasheet(datasheets, ck);
        if (cds) {
          // Find the character instance for loadout filtering
          const charIns = builder.instances.find((x) => x.key === ck && x.attachedTo === group.instance.id);
          const cr = renderUnitRows(cds, true, charIns || null);
          charResults.push({ ds: cds, html: cr.html, rowCount: cr.rowCount });
          totalGroupRows += cr.rowCount;
        }
      });

      // Build unit name label
      let label = esc(parentDs.name);
      if (charResults.length) {
        label += "<br>" + charResults.map((c) => '<span class="char-label">+' + esc(c.ds.name) + "</span>").join("<br>");
      }

      // Insert name cell into first row of parent
      const parentRows = parentResult.html.replace("<tr", `<tr`);
      const firstRowEnd = parentRows.indexOf(">");
      const nameCell = `<td class="unit-name" rowspan="${totalGroupRows}">${label}</td>`;
      // Inject name cell after the opening <tr> or <tr class="...">
      const injected = parentRows.replace(/(<tr[^>]*>)/, "$1" + nameCell);
      tableRows += injected;

      // Character rows (with left-border accent)
      charResults.forEach((cr) => { tableRows += cr.html; });
    });

    // Build rules sidebar with operational summaries
    let rulesHTML = "";
    // Load rule summaries if available (same pattern as ability summaries)
    const ruleSums = ruleSummaries || null;
    if (rules) {
      // Army rules — use summary if available, else full text
      if (rules.army_rules && rules.army_rules.length) {
        rules.army_rules.forEach((ar) => {
          rulesHTML += `<div class="rules-box"><h4>${esc(ar.name).toUpperCase()}</h4>`;
          const summary = ruleSums && ruleSums.army_rules && ruleSums.army_rules[ar.name];
          const desc = summary || ar.description;
          rulesHTML += formatRuleText(desc) + `</div>`;
        });
      }
      // Selected detachment rules
      builder.detachments.forEach((detName) => {
        const dets = rules.detachments || {};
        const det = Object.values(dets).find((d) =>
          d.name && d.name.toLowerCase().replace(/[^a-z0-9]/g, "") === detName.toLowerCase().replace(/[^a-z0-9]/g, "")
        );
        if (det && det.detachment_rule) {
          rulesHTML += `<div class="rules-box"><h4>${esc(det.detachment_rule.name).toUpperCase()}</h4>`;
          const summary = ruleSums && ruleSums.detachment_rules && ruleSums.detachment_rules[det.detachment_rule.name];
          const desc = summary || det.detachment_rule.description;
          rulesHTML += formatRuleText(desc) + `</div>`;
        }
      });
      // Enhancements in the list
      const enhInList = builder.instances.filter((i) => i.enhancement).map((i) => i.enhancement);
      if (enhInList.length) {
        rulesHTML += `<div class="rules-box"><h4>ENHANCEMENTS</h4>`;
        enhInList.forEach((enh) => {
          rulesHTML += `<p><b>${esc(enh.name)}</b> (${enh.points}pts)`;
          if (enh.restriction) rulesHTML += ` <i>${esc(enh.restriction)}</i>`;
          rulesHTML += `</p>`;
          let desc = "";
          const dets = rules.detachments || {};
          for (const dk of Object.keys(dets)) {
            const match = (dets[dk].enhancements || []).find((e) => e.name === enh.name);
            if (match) { desc = match.description; break; }
          }
          if (desc) rulesHTML += `<p style="font-style:italic;font-size:7pt">${esc(desc)}</p>`;
        });
        rulesHTML += `</div>`;
      }
    }

    // Build stratagems grid
    let stratsHTML = "";
    if (rules) {
      const allStrats = [];
      builder.detachments.forEach((detName) => {
        const dets = rules.detachments || {};
        const det = Object.values(dets).find((d) =>
          d.name && d.name.toLowerCase().replace(/[^a-z0-9]/g, "") === detName.toLowerCase().replace(/[^a-z0-9]/g, "")
        );
        if (det && det.stratagems) {
          det.stratagems.forEach((s) => allStrats.push({ ...s, detachment: det.name }));
        }
      });
      if (allStrats.length) {
        stratsHTML = `<div class="strats"><h3>STRATAGEMS</h3><div class="strat-grid">`;
        allStrats.forEach((s) => {
          stratsHTML += `<div class="strat">`;
          stratsHTML += `<div class="strat-name">${esc(s.name)}</div>`;
          stratsHTML += `<div class="strat-type">${esc(s.cost || "1 CP")}${s.type ? " — " + esc(s.type) : ""}</div>`;
          stratsHTML += `<div class="strat-body">`;
          if (s.when) stratsHTML += `<b>WHEN:</b> ${esc(s.when)}<br>`;
          if (s.target) stratsHTML += `<b>TARGET:</b> ${esc(s.target)}<br>`;
          if (s.effect) stratsHTML += `<b>EFFECT:</b> ${esc(s.effect)}`;
          stratsHTML += `</div></div>`;
        });
        stratsHTML += `</div></div>`;
      }
    }

    const title = `${fac.name} - Reference Sheet`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 9pt; line-height: 1.15; }
  #sheet { }
  table { border-collapse: collapse; width: auto; }
  th, td { border: 1px solid #888; padding: 1px 3px; vertical-align: middle; text-align: center; white-space: nowrap; }
  th { background: #ddd !important; font-weight: bold; }
  .unit-name { font-weight: bold; font-size: 9pt; background: #f5f5dc !important; vertical-align: top; text-align: left; white-space: normal; max-width: 90px; }
  .unit-name .char-label { font-weight: normal; font-size: 7.5pt; color: #555; }
  .stat { background: #e8d44d !important; font-weight: bold; }
  .ab { background: #fff !important; text-align: left; font-size: 8pt; white-space: normal; max-width: 160px; }
  .r { background: #d5c8e8 !important; }
  .m { background: #c8e8c8 !important; }
  .wn { text-align: left; font-size: 8pt; white-space: normal; }
  .sep td { border: none; height: 3px; background: #333 !important; padding: 0; }
  .empty { background: #f0f0f0 !important; color: #aaa; }
  .char-row td:first-child { border-left: 3px solid #6a5acd !important; background: #f0eaff !important; }
  .char-row .stat { background: #f0d83a !important; }
  .right-col { font-size: 7.5pt; line-height: 1.2; }
  #sheet.orient-landscape .page-layout { display: flex; gap: 8px; align-items: flex-start; }
  #sheet.orient-landscape .left-col { flex: 0 0 auto; min-width: 0; }
  #sheet.orient-landscape .right-col { flex: 1 1 auto; min-width: 200px; column-width: 195px; column-gap: 8px; }
  #sheet.orient-portrait .page-layout { display: block; }
  #sheet.orient-portrait .right-col { margin-top: 6px; column-width: 235px; column-gap: 8px; }
  .rules-box { border: 1px solid #555; padding: 3px 4px; margin-bottom: 4px; break-inside: avoid; }
  .rules-box h4 { font-size: 8pt; margin-bottom: 2px; background: #333; color: #fff; padding: 1px 4px; margin: -3px -4px 3px -4px; }
  .rules-box p { margin: 2px 0; white-space: normal; }
  h1 { font-size: 11pt; margin-bottom: 3px; }
  .list-meta { font-size: 8pt; color: #555; margin-bottom: 4px; }
  .strats { margin-top: 6px; }
  .strats h3 { font-size: 9pt; margin-bottom: 3px; }
  .strat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 4px; }
  .strat { break-inside: avoid; }
  .strat { border: 1px solid #555; padding: 3px 4px; font-size: 7.5pt; line-height: 1.2; }
  .strat-name { font-weight: bold; font-size: 8.5pt; }
  .strat-type { font-size: 7pt; color: #555; margin-bottom: 1px; }
  .strat-body { white-space: normal; }
</style>
<style id="page-style">@page { size: landscape; margin: 6mm; }</style>
</head>
<body>
<div id="sheet" class="orient-landscape">
<h1>${esc(fac.name)}</h1>
<div class="list-meta">${disposition ? "Disposition: " + esc(disposition) + " &middot; " : ""}${builder.detachments.length ? "Detachment: " + builder.detachments.map(titleCase).join(" + ") : ""} &middot; ${builder.battleSize}pts</div>
<div class="page-layout">
<div class="left-col">
<table>
<thead>
<tr>
  <th></th>
  <th>M</th><th>T</th><th>SV</th>
  <th>Inv</th><th>FNP</th><th>W</th>
  <th>LD</th><th>OC</th>
  <th>abilities</th>
  <th>rng</th><th>atks</th><th>sk</th>
  <th>S</th><th>AP</th><th>D</th>
  <th>wpn abilities</th>
</tr>
</thead>
<tbody>
${tableRows}
</tbody></table>
</div>
${rulesHTML ? '<div class="right-col">' + rulesHTML + '</div>' : ''}
</div>
${stratsHTML}
</div>
<script>
// Dynamically choose orientation + scale to fill the page and maximize readability.
(function() {
  // Printable areas in px (~96dpi, Letter, 6mm margins) with a ~4% safety margin
  // so measurement/render differences don't spill onto a second page.
  var PAGES = { landscape: { W: 1000, H: 748 }, portrait: { W: 760, H: 985 } };
  var CANDIDATES = [
    ["landscape", 1000], ["landscape", 870], ["landscape", 755],
    ["portrait", 760], ["portrait", 610]
  ];
  var MAX_ZOOM = 2.2;
  var sheet = document.getElementById("sheet");
  var pageStyle = document.getElementById("page-style");

  function measure(orient, w) {
    sheet.className = "orient-" + orient;
    sheet.style.zoom = "1";
    sheet.style.width = w + "px";
    void sheet.offsetHeight; // force reflow
    return { cw: Math.max(sheet.scrollWidth, w), ch: sheet.scrollHeight };
  }

  // True printable bounds (px) used to verify the final render actually fits.
  var VERIFY = { landscape: { W: 1010, H: 765 }, portrait: { W: 768, H: 1008 } };

  function fitPage() {
    var best = null;
    CANDIDATES.forEach(function(c) {
      var orient = c[0], w = c[1], pg = PAGES[orient];
      var m = measure(orient, w);
      var z = Math.min(pg.W / m.cw, pg.H / m.ch);
      if (z > MAX_ZOOM) z = MAX_ZOOM;
      // prefer larger zoom; tie-break toward landscape
      if (!best || z > best.z + 0.001) best = { orient: orient, w: w, z: z };
    });
    // Apply layout at zoom 1 first so we can measure and fill vertical slack.
    sheet.className = "orient-" + best.orient;
    sheet.style.width = best.w + "px";
    sheet.style.zoom = "1";
    pageStyle.textContent = "@page { size: " + best.orient + "; margin: 6mm; }";
    void sheet.offsetHeight;

    // Vertical fill: if content is width-constrained (leftover height),
    // stretch the stat table to absorb the slack. Browsers distribute a
    // table's height across its rows, spreading them to fill the page.
    var vb = VERIFY[best.orient];
    var availH = vb.H / best.z;          // height budget in unzoomed px
    var contentH = sheet.scrollHeight;   // unzoomed
    var table = sheet.querySelector(".left-col table");
    if (table && availH > contentH + 6) {
      var natural = table.offsetHeight;
      var newH = natural + (availH - contentH);
      var cap = natural * 2.2;           // avoid absurd row spacing on tiny lists
      if (newH > cap) newH = cap;
      table.style.height = newH + "px";
      void sheet.offsetHeight;
    }

    // Apply the chosen zoom.
    sheet.style.zoom = best.z;
    void sheet.offsetHeight;

    // Self-correct: measure the actual rendered footprint and shrink if it
    // overflows the true page bounds (guards against measurement drift).
    var rect = sheet.getBoundingClientRect();
    var over = Math.max(rect.width / vb.W, rect.height / vb.H);
    if (over > 1) {
      sheet.style.zoom = (best.z / over) * 0.99;
    }
  }

  setTimeout(fitPage, 60);
})();
</script>
</body>
</html>`;
  }

  function esc(s) {
    if (s == null) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------- init ---------- */
  renderOverview();
  fillFactionSelect();
  renderFaction();
  fillBuilderFaction();
  loadWargearRules(builder.slug);
  renderDetachments();
  renderDisposition();
  renderAvailable();
  renderEnhancements();
  renderList();
  renderSavedLists();
  $("#print-sheet").addEventListener("click", printSheet);
})();
