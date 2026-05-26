/**
 * TVS Rubber Boots - Size Advisor Application
 */

(function () {
  "use strict";

  // DOM Elements
  const productGrid = document.getElementById("product-grid");
  const sourceMeta = document.getElementById("source-meta");
  const form = document.getElementById("advisor-form");
  const resultPanel = document.getElementById("result-panel");
  const guideGrid = document.getElementById("guide-grid");
  const sizeTableBody = document.querySelector("#size-table tbody");

  // State
  let selectedProduct = null;

  // ===== INIT =====
  function init() {
    renderProducts();
    renderGuides();
    renderSizeTable();
    bindEvents();
    updateSourceMeta();
  }

  // ===== RENDER PRODUCTS =====
  function renderProducts() {
    productGrid.innerHTML = PRODUCTS.map(p => `
      <div class="product-card" data-id="${p.id}" title="${p.description}">
        <div class="product-swatch" style="background-color: ${p.color}; ${p.color === '#f5f5f4' ? 'border-color:#ccc;' : ''}"></div>
        <div class="product-name">${p.name}</div>
        <div class="product-code">${p.code}</div>
      </div>
    `).join("");
  }

  // ===== RENDER GUIDES =====
  function renderGuides() {
    guideGrid.innerHTML = MEASUREMENT_GUIDES.map(g => `
      <div class="guide-card">
        <div class="guide-icon">${g.icon}</div>
        <h4>${g.title}</h4>
        <p>${g.description}</p>
      </div>
    `).join("");
  }

  // ===== RENDER SIZE TABLE =====
  function renderSizeTable(filterProductId) {
    const data = filterProductId
      ? SIZE_CHART.filter(r => r.productId === filterProductId)
      : SIZE_CHART;

    sizeTableBody.innerHTML = data.map(r => `
      <tr data-product="${r.productId}" data-eur="${r.eur}">
        <td>${r.productId}</td>
        <td>${r.uk}</td>
        <td>${r.us}</td>
        <td>${r.eur}</td>
        <td>${r.footLength}</td>
        <td>${r.ballGirth}</td>
        <td>${r.ballWidth}</td>
        <td>${r.instepGirth}</td>
        <td>${r.calfGirth !== null ? r.calfGirth : '—'}</td>
      </tr>
    `).join("");
  }

  // ===== UPDATE SOURCE META =====
  function updateSourceMeta() {
    sourceMeta.textContent = `${PRODUCTS.length} mã · ${SIZE_CHART.length} size entries`;
  }

  // ===== BIND EVENTS =====
  function bindEvents() {
    // Product selection
    productGrid.addEventListener("click", function (e) {
      const card = e.target.closest(".product-card");
      if (!card) return;

      document.querySelectorAll(".product-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedProduct = card.dataset.id;

      renderSizeTable(selectedProduct);
    });

    // Form submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleSubmit();
    });

    // Form reset
    form.addEventListener("reset", function () {
      setTimeout(() => {
        showEmptyState();
        clearTableHighlights();
      }, 10);
    });
  }

  // ===== HANDLE SUBMIT =====
  function handleSubmit() {
    const fd = new FormData(form);
    const measurements = {
      footLength: parseFloat(fd.get("footLength")),
      ballGirth: parseFloat(fd.get("ballGirth")),
      ballWidth: parseFloat(fd.get("ballWidth")),
      instepGirth: parseFloat(fd.get("instepGirth")),
      calfGirth: fd.get("calfGirth") ? parseFloat(fd.get("calfGirth")) : null,
      comfort: fd.get("comfort"),
      removeInsole: fd.get("removeInsole") === "on"
    };

    // Comfort adjustments (mm added to allowance)
    const comfortAllowance = {
      standard: 0,
      socks: 4,
      roomy: 7
    };
    const allowance = comfortAllowance[measurements.comfort] || 0;

    // Find best sizes
    const targetProducts = selectedProduct
      ? PRODUCTS.filter(p => p.id === selectedProduct)
      : PRODUCTS;

    const results = [];

    targetProducts.forEach(product => {
      const sizes = SIZE_CHART.filter(s => s.productId === product.id);

      sizes.forEach(size => {
        const score = calculateFitScore(measurements, size, allowance);
        results.push({
          product,
          size,
          score,
          details: getFitDetails(measurements, size, allowance)
        });
      });
    });

    // Sort by best score
    results.sort((a, b) => a.score - b.score);

    if (results.length === 0) {
      showNoResult();
      return;
    }

    const best = results[0];
    const alternatives = results.slice(1, 4);

    renderResult(best, alternatives, measurements);
    highlightTableRow(best.size.productId, best.size.eur);
  }

  // ===== CALCULATE FIT SCORE =====
  function calculateFitScore(m, size, allowance) {
    // Weighted scoring: lower = better fit
    const lengthDiff = Math.abs(m.footLength - (size.footLength - 10 - allowance));
    const girthDiff = Math.abs(m.ballGirth - (size.ballGirth - allowance));
    const widthDiff = Math.abs(m.ballWidth - (size.ballWidth - allowance / 2));
    const instepDiff = Math.abs(m.instepGirth - (size.instepGirth - allowance));

    let score = lengthDiff * 2.5 + girthDiff * 2.0 + widthDiff * 1.5 + instepDiff * 1.5;

    // Calf penalty for high boots
    if (m.calfGirth && size.calfGirth) {
      const calfDiff = m.calfGirth - size.calfGirth;
      if (calfDiff > 0) {
        score += calfDiff * 3; // Too tight is heavily penalized
      } else {
        score += Math.abs(calfDiff) * 0.5; // Slightly loose is ok
      }
    }

    // Penalty for foot longer than boot
    if (m.footLength > size.footLength - 5) {
      score += (m.footLength - size.footLength + 5) * 5;
    }

    return score;
  }

  // ===== GET FIT DETAILS =====
  function getFitDetails(m, size, allowance) {
    const details = [];
    const effectiveLength = size.footLength - 10;
    const lengthDiff = effectiveLength - m.footLength;

    details.push({
      label: "Chiều dài",
      value: lengthDiff >= 5 ? "Vừa" : lengthDiff >= 0 ? "Sát" : "Chật",
      status: lengthDiff >= 5 ? "good" : lengthDiff >= 0 ? "tight" : "loose",
      detail: `Dư ${lengthDiff.toFixed(1)}mm`
    });

    const girthDiff = (size.ballGirth + allowance) - m.ballGirth;
    details.push({
      label: "Vòng khớp",
      value: girthDiff >= 3 ? "Thoải mái" : girthDiff >= 0 ? "Vừa" : "Chật",
      status: girthDiff >= 3 ? "good" : girthDiff >= 0 ? "tight" : "loose",
      detail: `Dư ${girthDiff.toFixed(1)}mm`
    });

    const widthDiff = (size.ballWidth + allowance / 2) - m.ballWidth;
    details.push({
      label: "Bề ngang",
      value: widthDiff >= 2 ? "Thoải mái" : widthDiff >= 0 ? "Vừa" : "Chật",
      status: widthDiff >= 2 ? "good" : widthDiff >= 0 ? "tight" : "loose",
      detail: `Dư ${widthDiff.toFixed(1)}mm`
    });

    const instepDiff = (size.instepGirth + allowance) - m.instepGirth;
    details.push({
      label: "Vòng mu",
      value: instepDiff >= 3 ? "Thoải mái" : instepDiff >= 0 ? "Vừa" : "Chật",
      status: instepDiff >= 3 ? "good" : instepDiff >= 0 ? "tight" : "loose",
      detail: `Dư ${instepDiff.toFixed(1)}mm`
    });

    if (m.calfGirth && size.calfGirth) {
      const calfDiff = size.calfGirth - m.calfGirth;
      details.push({
        label: "Vòng bắp chân",
        value: calfDiff >= 10 ? "Rộng" : calfDiff >= 0 ? "Vừa" : "Chật",
        status: calfDiff >= 10 ? "good" : calfDiff >= 0 ? "tight" : "loose",
        detail: `Dư ${calfDiff.toFixed(1)}mm`
      });
    }

    return details;
  }

  // ===== RENDER RESULT =====
  function renderResult(best, alternatives, measurements) {
    const product = best.product;
    const size = best.size;
    const details = best.details;

    let insoleNote = "";
    if (measurements.removeInsole) {
      insoleNote = `<p class="rec-detail" style="color:var(--clr-accent-dark);">* Có thể tháo lót đế để thêm ~3mm độ rộng</p>`;
    }

    let altHtml = "";
    if (alternatives.length > 0) {
      altHtml = `
        <div class="alternatives">
          <h4>Lựa chọn thay thế:</h4>
          <div class="alt-list">
            ${alternatives.map(a => `
              <div class="alt-item">
                <span class="alt-name">${a.product.name} - EU ${a.size.eur}</span>
                <span class="alt-reason">Điểm phù hợp: ${(100 - Math.min(a.score, 100)).toFixed(0)}%</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    resultPanel.innerHTML = `
      <div class="result-content">
        <div class="result-header">
          <div class="result-icon" style="background-color: ${product.color}; ${product.color === '#f5f5f4' ? 'color:#333;border:1px solid #ccc;' : ''}">
            ${size.eur}
          </div>
          <div>
            <h3>${product.name}</h3>
            <span class="result-subtitle">${product.code} · ${product.description}</span>
          </div>
        </div>

        <div class="size-recommendation">
          <div class="rec-label">Size đề xuất</div>
          <div class="rec-size">EU ${size.eur} / UK ${size.uk} / US ${size.us}</div>
          <p class="rec-detail">Điểm phù hợp: ${(100 - Math.min(best.score, 100)).toFixed(0)}%</p>
          ${insoleNote}
        </div>

        <div class="fit-details">
          ${details.map(d => `
            <div class="fit-row">
              <span class="fit-label">${d.label}</span>
              <span class="fit-value ${d.status}">${d.value} (${d.detail})</span>
            </div>
          `).join("")}
        </div>

        ${altHtml}
      </div>
    `;
  }

  // ===== SHOW EMPTY STATE =====
  function showEmptyState() {
    resultPanel.innerHTML = `
      <div class="empty-state">
        <h2>Đợi số đo đầu vào</h2>
        <p>Nhập số đo theo mm, chọn mã khách thích, hệ thống sẽ gợi ý size và các mã gần tối ưu để sale tư vấn tiếp.</p>
      </div>
    `;
  }

  // ===== SHOW NO RESULT =====
  function showNoResult() {
    resultPanel.innerHTML = `
      <div class="empty-state">
        <h2>Không tìm thấy size phù hợp</h2>
        <p>Số đo của khách nằm ngoài phạm vi size hiện có. Vui lòng kiểm tra lại số đo hoặc thử mã khác.</p>
      </div>
    `;
  }

  // ===== TABLE HIGHLIGHT =====
  function highlightTableRow(productId, eur) {
    clearTableHighlights();
    const rows = sizeTableBody.querySelectorAll("tr");
    rows.forEach(row => {
      if (row.dataset.product === productId && parseInt(row.dataset.eur) === eur) {
        row.classList.add("highlight");
        row.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  function clearTableHighlights() {
    sizeTableBody.querySelectorAll("tr.highlight").forEach(r => r.classList.remove("highlight"));
  }

  // ===== START =====
  document.addEventListener("DOMContentLoaded", init);
})();
