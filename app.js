/* ═══════ STATE ═══════ */
var selectedProduct = null;
var selectedColor = {};

/* ═══════ SCORING ENGINE (reproduce Excel formulas) ═══════ */
function getAllow(comfort, removeInsole) {
  var ins = removeInsole ? 3.5 : 0;
  if (comfort === 'socks') return {len:3, g:Math.max(0, 8-ins)};
  if (comfort === 'roomy') return {len:5, g:Math.max(0, 12-ins)};
  return {len:0, g:Math.max(0, -ins)};
}

function scoreSizeRow(p, s, m, allow) {
  var needFL = m.footLength + allow.len;
  var needBG = m.ballGirth  + allow.g;
  var needBW = m.ballWidth  + allow.g * 0.4;
  var needIG = m.instepGirth + allow.g;

  var duFL = s.fl - needFL;
  var duBG = s.bg - needBG;
  var duBW = s.bw - needBW;
  var duIG = s.ig - needIG;
  var duCG = (p.hasCalf && m.calfGirth && s.cg) ? (s.cg - m.calfGirth) : null;

  var shortages = [];
  if (duFL < 0) shortages.push(-duFL);
  if (duBG < 0) shortages.push(-duBG);
  if (duBW < 0) shortages.push(-duBW);
  if (duIG < 0) shortages.push(-duIG);
  if (duCG !== null && duCG < 0) shortages.push(-duCG);

  var fit = shortages.length === 0;
  var score;
  if (!fit) {
    var worst = Math.max.apply(null, shortages);
    score = 100 - worst * 8;
  } else {
    score = 100;
  }

  return {
    fit: fit,
    score: score,
    du: {fl: +duFL.toFixed(1), bg: +duBG.toFixed(1), bw: +duBW.toFixed(1), ig: +duIG.toFixed(1), cg: duCG !== null ? +duCG.toFixed(1) : null},
    worst: fit ? 0 : Math.max.apply(null, shortages),
  };
}

function scoreFitWithN(p, n_above_min) {
  var k;
  if (p.id === 'ANCHOR') k = 10.9;
  else if (p.id === 'FLEXOSLIP') k = 4.95;
  else k = 13;

  if (p.id === 'FLEXOSLIP') {
    return Math.min(100, 100.45 - 4.95 * n_above_min);
  }
  return Math.min(100, 116.45 - k * n_above_min);
}

function computeAllScores(m) {
  var allow = getAllow(m.comfort, m.removeInsole);
  var all = [];

  PRODUCTS.forEach(function(p) {
    var rawScores = p.sizes.map(function(s) {
      return scoreSizeRow(p, s, m, allow);
    });

    var minFitIdx = -1;
    for (var i = 0; i < rawScores.length; i++) {
      if (rawScores[i].fit) { minFitIdx = i; break; }
    }

    var results = p.sizes.map(function(s, i) {
      var raw = rawScores[i];
      var score;
      if (!raw.fit) {
        score = raw.score;
      } else if (minFitIdx < 0) {
        score = raw.score;
      } else {
        var n = i - minFitIdx;
        score = scoreFitWithN(p, n);
      }
      return {
        product: p,
        size: s,
        score: +score.toFixed(4),
        fit: raw.fit,
        du: raw.du,
        n: (raw.fit && minFitIdx >= 0) ? (i - minFitIdx) : null,
        worst: raw.worst,
      };
    });

    all = all.concat(results);
  });

  all.sort(function(a,b) {
    if (a.fit !== b.fit) return b.fit - a.fit;
    if (b.score !== a.score) return b.score - a.score;
    return a.size.fl - b.size.fl;
  });

  return all;
}

function getBestPerProduct(allScores) {
  var best = {};
  allScores.forEach(function(r) {
    var pid = r.product.id;
    if (!best[pid]) best[pid] = r;
  });
  return best;
}

/* ═══════ RENDER PRODUCTS ═══════ */
function renderProducts() {
  var grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  PRODUCTS.forEach(function(p) {
    var card = document.createElement('div');
    card.className = 'product-card' + (selectedProduct && selectedProduct.id === p.id ? ' selected' : '');
    var ci = selectedColor[p.id] || 0;
    var col = p.colors[ci];
    var imgH = p.image ? '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' : '';
    var typeL = {tall:'Boot cao cổ', mid:'Boot trung cổ', short:'Boot cổ ngắn', flat:'Giày thấp'}[p.type]||'';
    card.innerHTML =
      '<div class="product-img-wrap" style="background:' + col.hex + '18">' + imgH + '</div>' +
      '<div class="product-name">' + p.name + '</div>' +
      '<div class="product-code">' + p.id + ' · ' + typeL + '</div>' +
      '<div class="color-dots">' +
        p.colors.map(function(c,i){ return '<span class="color-dot'+(i===ci?' active':'')+'" style="background:'+c.hex+'" title="'+c.name+'" data-pid="'+p.id+'" data-ci="'+i+'"></span>'; }).join('') +
      '</div>' +
      '<div style="font-size:.72rem;color:var(--text-muted);margin-top:4px">' + col.name + '</div>' +
      '<div style="font-size:.7rem;color:var(--brand);margin-top:3px">EUR ' + p.sizes[0].eur + '\u2013' + p.sizes[p.sizes.length-1].eur + '</div>';

    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('color-dot')) return;
      if (selectedProduct && selectedProduct.id === p.id) {
        selectedProduct = null;
      } else {
        selectedProduct = p;
      }
      renderProducts();
    });
    card.querySelectorAll('.color-dot').forEach(function(d) {
      d.addEventListener('click', function(e) {
        e.stopPropagation();
        selectedColor[p.id] = +d.dataset.ci;
        selectedProduct = p; renderProducts();
      });
    });
    grid.appendChild(card);
  });
}

/* ═══════ RENDER GUIDE ═══════ */
function renderGuide() {
  var g = document.getElementById('guide-grid');
  g.innerHTML = '';
  GUIDE_STEPS.forEach(function(s) {
    var c = document.createElement('div');
    c.className = 'guide-card';
    c.innerHTML = (s.image ? '<img src="'+s.image+'" alt="'+s.title+'" loading="lazy" onclick="openGuideModal(this.src, \''+s.title.replace(/'/g,"\\'")+'\')">' : '') +
      '<h3>'+s.title+'</h3><p>'+s.desc+'</p>';
    g.appendChild(c);
  });
}

/* ═══════ GUIDE MODAL ═══════ */
function openGuideModal(src, title) {
  var existing = document.querySelector('.guide-modal');
  if (existing) existing.remove();

  var modal = document.createElement('div');
  modal.className = 'guide-modal active';
  modal.innerHTML =
    '<div class="guide-modal-overlay"></div>' +
    '<div class="guide-modal-content">' +
      '<button class="guide-modal-close">&times;</button>' +
      '<img src="' + src + '" alt="' + title + '">' +
      '<p>' + title + '</p>' +
    '</div>';
  document.body.appendChild(modal);

  modal.querySelector('.guide-modal-overlay').addEventListener('click', function() { modal.remove(); });
  modal.querySelector('.guide-modal-close').addEventListener('click', function() { modal.remove(); });
}

/* ═══════ RENDER TABLE ═══════ */
function renderTable(hlPid, hlEur) {
  var tb = document.querySelector('#size-table tbody');
  tb.innerHTML = '';
  PRODUCTS.forEach(function(p) {
    p.sizes.forEach(function(s) {
      var tr = document.createElement('tr');
      if (p.id === hlPid && s.eur === hlEur) tr.className = 'hl-row';
      tr.innerHTML = '<td class="sku-col">'+p.name+'</td><td>'+s.uk+'</td><td>'+s.us+'</td><td>'+s.eur+'</td>' +
        '<td>'+s.fl+'</td><td>'+s.bg+'</td><td>'+s.bw+'</td><td>'+s.ig+'</td>' +
        '<td>'+(s.cg||'\u2014')+'</td><td>'+s.h+'</td>';
      tb.appendChild(tr);
    });
  });
}

/* ═══════ HELPERS ═══════ */
function scls(d) {
  if (d === null || d === undefined) return 'na';
  if (d >= 5) return 'ok';
  if (d >= 0) return 'warn';
  return 'bad';
}
function stxt(d, note) {
  if (note) return note;
  if (d === null || d === undefined) return '\u2014';
  if (d >= 0) return '+' + d + 'mm \u2713';
  return Math.abs(d) + 'mm thi\u1EBFu';
}
function scoreBadge(sc) {
  var cls = sc >= 100 ? 'badge-100' : sc >= 90 ? 'badge-90' : sc >= 80 ? 'badge-80' : sc >= 60 ? 'badge-60' : 'badge-low';
  return '<span class="alt-score-badge ' + cls + '">' + sc.toFixed(0) + '/100</span>';
}

/* ═══════ RENDER RESULT ═══════ */
function renderResult(allScores, m) {
  var panel = document.getElementById('result-panel');

  var priId = selectedProduct ? selectedProduct.id : 'RAINIS_AM';
  var priResult = null;
  for (var i = 0; i < allScores.length; i++) {
    if (allScores[i].product.id === priId) { priResult = allScores[i]; break; }
  }
  if (!priResult) priResult = allScores[0];

  var ps = priResult.size, pp = priResult.product;

  var topN = [];
  var seen = {};
  for (var j = 0; j < allScores.length; j++) {
    var r = allScores[j];
    var key = r.product.id + '_' + r.size.eur;
    if (!seen[key] && topN.length < 8) {
      seen[key] = true;
      topN.push(r);
    }
  }

  var bestPerProd = getBestPerProduct(allScores);
  var altLines = '';
  var altCount = 0;
  PRODUCTS.forEach(function(p) {
    if (p.id === priId || altCount >= 4) return;
    var r = bestPerProd[p.id];
    if (r && r.fit) {
      altLines += '<span class="alt-line"><strong>' + p.name + ':</strong> EUR ' + r.size.eur + '</span>';
      altCount++;
    }
  });

  var cNote = m.comfort === 'socks' ? 'th\u01B0\u1EDDng mang v\u1EDB d\u00E0y ho\u1EB7c th\u00EDch form r\u1ED9ng r\u00E3i h\u01A1n'
            : m.comfort === 'roomy' ? 'th\u00EDch form r\u1ED9ng r\u00E3i h\u01A1n'
            : 'th\u01B0\u1EDDng mang v\u1EDB d\u00E0y ho\u1EB7c th\u00EDch form r\u1ED9ng r\u00E3i h\u01A1n';

  var du = priResult.du;
  var checkRows = '';
  var checkDefs = [
    {key:'fl', lbl:'Chi\u1EC1u d\u00E0i b\u00E0n ch\u00E2n',     val:m.footLength,   spec:ps.fl,  diff:du.fl},
    {key:'bg', lbl:'V\u00F2ng kh\u1EDBp ng\u00F3n ch\u00E2n',     val:m.ballGirth,    spec:ps.bg,  diff:du.bg},
    {key:'bw', lbl:'B\u1EC1 ngang kh\u1EDBp ng\u00F3n',     val:m.ballWidth,    spec:ps.bw,  diff:du.bw},
    {key:'ig', lbl:'V\u00F2ng mu b\u00E0n ch\u00E2n',        val:m.instepGirth,  spec:ps.ig,  diff:du.ig},
  ];
  if (m.calfGirth) {
    if (pp.hasCalf) {
      checkDefs.push({key:'cg', lbl:'V\u00F2ng b\u1EAFp ch\u00E2n', val:m.calfGirth, spec:ps.cg, diff:du.cg});
    } else {
      checkDefs.push({key:'cg', lbl:'V\u00F2ng b\u1EAFp ch\u00E2n', val:m.calfGirth, spec:null, diff:null, note:'Boot c\u1ED5 ng\u1EAFn/gi\u00E0y th\u1EA5p \u2014 kh\u00F4ng \u00E1p d\u1EE5ng'});
    }
  }
  checkDefs.forEach(function(c) {
    checkRows += '<div class="fit-row ' + scls(c.diff) + '">' +
      '<div class="lbl">' + c.lbl + '</div>' +
      '<div class="val">B\u1EA1n: ' + c.val + 'mm \u00B7 Gi\u00E0y: ' + (c.spec !== null && c.spec !== undefined ? c.spec + 'mm' : '\u2014') + '</div>' +
      '<div class="val">' + stxt(c.diff, c.note) + '</div>' +
    '</div>';
  });

  var altCards = '';
  topN.forEach(function(r, idx) {
    var isPri = (r.product.id === priId && r.size.eur === ps.eur);
    altCards += '<div class="alt-card' + (isPri?' is-primary':'') + '">' +
      '<div class="alt-card-rank">#' + (idx+1) + '</div>' +
      '<div class="alt-card-info">' +
        '<div class="alt-card-name">' + r.product.name + ' EUR ' + r.size.eur + (isPri?' \u2605':'') + '</div>' +
        '<div class="alt-card-meta">UK ' + r.size.uk + ' \u00B7 US ' + r.size.us + ' \u00B7 Cao \u1EE7ng: ' + r.size.h + 'mm' +
          (r.fit ? '' : ' \u00B7 <span style="color:#dc2626">Thi\u1EBFu ' + r.worst.toFixed(1) + 'mm</span>') + '</div>' +
        '<div class="score-bar-wrap"><div class="score-bar" style="width:' + Math.max(0,r.score) + '%;background:' + (r.score>=90?'#1a5c38':r.score>=70?'#4ade80':r.score>=50?'#fbbf24':'#f87171') + '"></div></div>' +
      '</div>' +
      scoreBadge(r.score) +
    '</div>';
  });

  var notes = [];
  if (m.comfort === 'socks') notes.push('\u0110\u00E3 t\u00EDnh th\u00EAm kho\u1EA3ng cho v\u1EDB d\u00E0y (+8mm v\u00F2ng kh\u1EDBp/mu).');
  if (m.comfort === 'roomy') notes.push('\u0110\u00E3 t\u00EDnh kho\u1EA3ng r\u1ED9ng r\u00E3i (+12mm v\u00F2ng kh\u1EDBp/mu).');
  if (m.removeInsole) notes.push('Th\u00E1o l\u00F3t \u0111\u1EBF (3.5mm) gi\u00FAp t\u0103ng th\u00EAm kh\u00F4ng gian b\u00EAn trong.');
  if (!priResult.fit) notes.push('\u26A0 M\u00E3 \u0111\u01B0\u1EE3c ch\u1ECDn kh\u00F4ng c\u00F3 size v\u1EEBa \u2014 \u0111\u1EC1 xu\u1EA5t t\u1EEB size g\u1EA7n nh\u1EA5t. Xem g\u1EE3i \u00FD b\u00EAn d\u01B0\u1EDBi \u0111\u1EC3 ch\u1ECDn m\u00E3 ph\u00F9 h\u1EE3p h\u01A1n.');
  else if (priResult.score < 80) notes.push('\u26A0 Size \u0111\u1EC1 xu\u1EA5t c\u00F3 nhi\u1EC1u kho\u1EA3ng d\u01B0 \u2014 n\u00EAn ki\u1EC3m tra th\u00EAm size nh\u1ECF h\u01A1n ho\u1EB7c m\u00E3 kh\u00E1c.');

  panel.innerHTML =
    '<div class="result-inner">' +

    '<div class="best-match">' +
      '<span class="best-match-label">T\u01AF V\u1EA4N SIZE PH\u00D9 H\u1EE2P V\u1EDAI KH\u00C1CH NH\u01AF SAU</span>' +
      '<div class="advisory-text">' +
        '<p>D\u1EA1, d\u1EF1a tr\u00EAn s\u1ED1 \u0111o anh/ch\u1ECB cung c\u1EA5p, b\u00EAn em g\u1EE3i \u00FD d\u00F2ng <strong>' + pp.name + '</strong> size EUR <strong>' + ps.eur + '</strong> l\u00E0 ph\u00F9 h\u1EE3p theo h\u01B0\u1EDBng v\u1EEBa ch\u00E2n, d\u1EC5 mang v\u00E0 tho\u1EA3i m\u00E1i khi s\u1EED d\u1EE5ng h\u1EB1ng ng\u00E0y. N\u1EBFu anh/ch\u1ECB ' + cNote + ', b\u00EAn em c\u00F3 th\u1EC3 h\u1ED7 tr\u1EE3 ki\u1EC3m tra th\u00EAm size k\u1EBF ti\u1EBFp.</p>' +
        (altLines ? '<p style="margin-top:9px"><strong>V\u1EDBi c\u00E1c d\u00F2ng kh\u00E1c, anh/ch\u1ECB c\u00F3 th\u1EC3 tham kh\u1EA3o:</strong></p><div class="alt-lines">' + altLines + '</div>' : '') +
        '<div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(26,92,56,.2)">' +
          '<p>\u0110\u1ED1i v\u1EDBi m\u1EABu <strong>' + pp.name + '</strong> size EUR <strong>' + ps.eur + '</strong>, chi\u1EC1u cao th\u00E2n b\u1ED1t l\u00E0 <strong>' + ps.h + 'mm</strong>.</p>' +
          '<p style="margin-top:7px"><strong>C\u00E1c th\u00F4ng s\u1ED1 anh/ch\u1ECB \u0111\u00E3 g\u1EEDi b\u00EAn em g\u1ED3m:</strong></p>' +
          '<div class="meas-list">' +
            '<div>V\u00F2ng kh\u1EDBp ng\u00F3n ch\u00E2n: <strong>' + m.ballGirth + 'mm</strong></div>' +
            '<div>B\u1EC1 ngang kh\u1EDBp ng\u00F3n ch\u00E2n: <strong>' + m.ballWidth + 'mm</strong></div>' +
            '<div>V\u00F2ng mu b\u00E0n ch\u00E2n: <strong>' + m.instepGirth + 'mm</strong></div>' +
            '<div>V\u00F2ng b\u1EAFp ch\u00E2n: <strong>' + (m.calfGirth ? m.calfGirth+'mm' : '(ch\u01B0a cung c\u1EA5p)') + '</strong></div>' +
            '<div>Chi\u1EC1u d\u00E0i b\u00E0n ch\u00E2n: <strong>' + m.footLength + 'mm</strong></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div>' +
      '<div class="section-sub">Ki\u1EC3m tra \u0111\u1ED9 kh\u1EDBp \u2014 ' + pp.name + ' EUR ' + ps.eur + '</div>' +
      '<div class="fit-details">' + checkRows + '</div>' +
    '</div>' +

    '<div>' +
      '<div class="section-sub">Top g\u1EE3i \u00FD size t\u1ED1i \u01B0u (t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m, x\u1EBFp theo \u0111i\u1EC3m)</div>' +
      '<div class="alt-grid">' + altCards + '</div>' +
    '</div>' +

    (notes.length ? '<div class="note-box"><strong>L\u01B0u \u00FD t\u01B0 v\u1EA5n:</strong><br>' + notes.join('<br>') + '</div>' : '') +

    '</div>';

  renderTable(priId, ps.eur);
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}

/* ═══════ EVENTS ═══════ */
document.getElementById('advisor-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var fd = new FormData(e.target);
  var m = {
    footLength:   parseFloat(fd.get('footLength')),
    ballGirth:    parseFloat(fd.get('ballGirth')),
    ballWidth:    parseFloat(fd.get('ballWidth')),
    instepGirth:  parseFloat(fd.get('instepGirth')),
    calfGirth:    fd.get('calfGirth') ? parseFloat(fd.get('calfGirth')) : null,
    comfort:      fd.get('comfort'),
    removeInsole: fd.get('removeInsole') === 'on',
  };
  var all = computeAllScores(m);
  renderResult(all, m);
});

document.getElementById('advisor-form').addEventListener('reset', function() {
  document.getElementById('result-panel').innerHTML =
    '<div class="empty-state"><h2>\u0110\u1EE3i s\u1ED1 \u0111o \u0111\u1EA7u v\u00E0o</h2><p>Nh\u1EADp s\u1ED1 \u0111o theo mm, ch\u1ECDn m\u00E3 kh\u00E1ch th\u00EDch, h\u1EC7 th\u1ED1ng s\u1EBD g\u1EE3i \u00FD size v\u00E0 c\u00E2u t\u01B0 v\u1EA5n \u0111\u1EA7y \u0111\u1EE7.</p></div>';
  renderTable(null, null);
});

/* ═══════ INIT ═══════ */
renderProducts();
renderGuide();
renderTable(null, null);
