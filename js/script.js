/* ================================================================
   INEEDYOU Authentic Wear - script.js  (WEDE5020 Part 3)
   Vanilla JavaScript, no frameworks. Loaded with "defer" on every page.

   Sections
   0. Settings
   1. Helpers
   2. Site-wide: menu, active link, footer year, scroll reveal, back to top
   3. Product data + dynamic product list with search / filter / sort
   4. Lightbox gallery
   5. FAQ accordion
   6. Form validation (shared)
   7. Enquiry form  (AJAX + processed response)
   8. Contact form  (compiled into an email)
   9. Interactive map (Leaflet)
   ================================================================ */
(function () {
  "use strict";

  /* ---------- 0. SETTINGS (change these in one place) ---------- */
  var SETTINGS = {
    // The email address that contact-form messages are sent to.
    recipientEmail: "arnoldloneeagle@gmail.com",
    // Free test API that accepts a POST and answers like a real server.
    ajaxEndpoint: "https://jsonplaceholder.typicode.com/posts",
    courierFee: 100,                 // flat nationwide courier fee (R)
    mapLat: -25.7747,                // Middelburg, Mpumalanga
    mapLng: 29.4667
  };

  document.documentElement.classList.add("js");
  document.documentElement.classList.remove("no-js");

  /* ---------- 1. HELPERS ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function money(n) { return "R" + Number(n).toLocaleString("en-ZA"); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text !== undefined) { e.textContent = text; }   // textContent = safe against HTML injection
    return e;
  }

  /* ---------- 2. SITE-WIDE ---------- */
  function initMenu() {
    var toggle = $(".nav-toggle");
    var nav = $("#main-nav");
    if (!toggle || !nav) { return; }
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { toggle.click(); toggle.focus(); }
    });
  }

  function highlightCurrentPage() {
    var here = location.pathname.split("/").pop() || "home.html";
    if (here === "index.html") { here = "home.html"; }
    $all("#main-nav a").forEach(function (a) {
      if (a.getAttribute("href") === here) { a.setAttribute("aria-current", "page"); }
    });
  }

  function setFooterYear() {
    var y = $("#year");
    if (y) { y.textContent = "2025\u2013" + new Date().getFullYear(); }
  }

  function initReveal() {
    var items = $all("main h1, main h2, main .product-card, main .accordion-item, main figure, main table, main form");
    items.forEach(function (i) { i.classList.add("reveal"); });
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (i) { obs.observe(i); });
  }

  function initBackToTop() {
    var b = el("button", "back-to-top", "\u2191");
    b.type = "button";
    b.setAttribute("aria-label", "Back to top");
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(b);
    window.addEventListener("scroll", function () {
      b.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
  }

  /* ---------- 3. PRODUCTS ---------- */
  // Prices come from the original Products page.
  var PRODUCTS = [
    { id: "hoodie",   name: "Hoodie",                 category: "Hoodies",     price: 400, image: "images/hoodie-cartoon-back-print.jpg", w: 800, h: 707, alt: "White hoodie with a cartoon cat and mouse and the words I need you, next by my side printed on the back", desc: "Message-driven white hoodie, printed to order." },
    { id: "tee",      name: "Signature Oversized Tee", category: "Tees",       price: 270, image: "images/oversized-white-tee.jpg", w: 800, h: 999, alt: "White oversized tee with the INEEDYOU wordmark print", desc: "Our signature oversized tee." },
    { id: "tee-msg",  name: "Statement Tee",          category: "Tees",        price: 270, image: "images/statement-white-tee.jpg", w: 800, h: 1000, alt: "White tee printed with the words I need you, I'm nothing without you, next by my side", desc: "Carries the full brand message across the chest." },
    { id: "vest",     name: "Vest (sleeveless top)",  category: "Vests",       price: 180, image: "images/vests-grey-white.jpg", w: 800, h: 528, alt: "Grey and white sleeveless vests printed with I need you, I'm nothing without you", desc: "Lightweight sleeveless top in grey or white." },
    { id: "tracksuit",name: "Tracksuit Set",          category: "Tracksuits",  price: 550, image: "images/white-tracksuit-set.jpg", w: 800, h: 999, alt: "White tracksuit set laid out flat with the signature print on the back", desc: "Matching top and bottoms." },
    { id: "beanie",   name: "Beanie",                 category: "Accessories", price: 160, image: "images/beanies-grey-black-white.jpg", w: 800, h: 531, alt: "Grey, black and white ribbed beanies embroidered with I need you, I'm nothing without you", desc: "Winter beanie in grey, black or white." },
    { id: "combo",    name: "Winter Combo (hoodie + beanie)", category: "Bundles", price: 560, image: "images/hoodie-and-beanie-winter-combo.jpg", w: 800, h: 805, alt: "Winter combo promotion showing a hoodie and a beanie bundle", desc: "Hoodie and beanie bundle for R560." }
  ];
  function findProduct(id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0];
  }

  function initProducts() {
    var grid = $("#product-grid");
    if (!grid) { return; }
    var search = $("#product-search"), cat = $("#product-category"), sort = $("#product-sort");
    var count = $("#result-count");

    var cats = ["All"];
    PRODUCTS.forEach(function (p) { if (cats.indexOf(p.category) === -1) { cats.push(p.category); } });
    cats.forEach(function (c) { var o = el("option", "", c); o.value = c; cat.appendChild(o); });

    function render() {
      var q = search.value.trim().toLowerCase();
      var list = PRODUCTS.filter(function (p) {
        var matchCat = cat.value === "All" || p.category === cat.value;
        var matchText = !q || (p.name + " " + p.category + " " + p.desc).toLowerCase().indexOf(q) !== -1;
        return matchCat && matchText;
      });
      list.sort(function (a, b) {
        switch (sort.value) {
          case "price-asc":  return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "name":       return a.name.localeCompare(b.name);
          default:           return PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b);
        }
      });

      grid.textContent = "";                       // clear, then rebuild with DOM methods
      if (!list.length) {
        grid.appendChild(el("p", "empty-state", "No products match your search. Try a different word or choose All."));
      }
      list.forEach(function (p) {
        var card = el("article", "product-card visible");
        if (p.image) {
          var btn = el("button", "thumb");
          btn.type = "button";
          btn.setAttribute("data-lightbox", p.image);
          btn.setAttribute("data-caption", p.name + " - " + money(p.price));
          btn.setAttribute("data-group", "products");
          btn.setAttribute("aria-label", "View larger photo of " + p.name);
          var img = el("img");
          img.src = p.image; img.alt = p.alt; img.width = p.w; img.height = p.h; img.loading = "lazy";
          if (Math.abs(p.w / p.h - 0.8) > 0.1) { img.style.aspectRatio = p.w + " / " + p.h; }   // show wide photos in full
          btn.appendChild(img);
          card.appendChild(btn);
        } else {
          card.appendChild(el("div", "no-photo", "Photo coming soon"));
        }
        var info = el("div", "product-info");
        info.appendChild(el("span", "tag", p.category));
        info.appendChild(el("h3", "", p.name));
        info.appendChild(el("p", "", p.desc));
        info.appendChild(el("span", "price", money(p.price)));
        var link = el("a", "btn-link", "Enquire about this");
        link.href = "enquiry.html?product=" + encodeURIComponent(p.id);
        info.appendChild(link);
        card.appendChild(info);
        grid.appendChild(card);
      });
      count.textContent = list.length + (list.length === 1 ? " product" : " products") + " shown";
    }

    [search, cat, sort].forEach(function (c) {
      c.addEventListener(c === search ? "input" : "change", render);
    });
    render();
  }

  /* ---------- 4. LIGHTBOX ---------- */
  function initLightbox() {
    var box = el("div", "lightbox");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    var img = el("img");
    var cap = el("p", "lightbox-caption");
    var close = el("button", "lb-close", "\u00d7"); close.type = "button"; close.setAttribute("aria-label", "Close image");
    var prev = el("button", "lb-prev", "\u2039");   prev.type = "button"; prev.setAttribute("aria-label", "Previous image");
    var next = el("button", "lb-next", "\u203a");   next.type = "button"; next.setAttribute("aria-label", "Next image");
    [close, prev, next, img, cap].forEach(function (n) { box.appendChild(n); });
    document.body.appendChild(box);

    var group = [], index = 0, opener = null;

    function show(i) {
      index = (i + group.length) % group.length;
      var t = group[index];
      img.src = t.getAttribute("data-lightbox") || t.getAttribute("href");
      var thumb = $("img", t);
      img.alt = thumb ? thumb.alt : "";
      cap.textContent = t.getAttribute("data-caption") || img.alt;
      prev.style.display = next.style.display = group.length > 1 ? "" : "none";
    }
    function open(t) {
      opener = t;
      var g = t.getAttribute("data-group");
      group = $all('[data-lightbox][data-group="' + g + '"]');
      show(group.indexOf(t));
      box.classList.add("open");
      document.body.style.overflow = "hidden";
      close.focus();
    }
    function shut() {
      box.classList.remove("open");
      document.body.style.overflow = "";
      if (opener) { opener.focus(); }
    }

    // Event delegation: also works for cards created later by JavaScript.
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-lightbox]");
      if (t) { e.preventDefault(); open(t); }
    });
    close.addEventListener("click", shut);
    prev.addEventListener("click", function () { show(index - 1); });
    next.addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) { shut(); } });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) { return; }
      if (e.key === "Escape") { shut(); }
      if (e.key === "ArrowLeft") { show(index - 1); }
      if (e.key === "ArrowRight") { show(index + 1); }
      if (e.key === "Tab") {                       // keep keyboard focus inside the dialog
        var f = $all("button", box).filter(function (b) { return b.style.display !== "none"; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- 5. ACCORDION ---------- */
  function initAccordion() {
    $all(".accordion").forEach(function (acc) {
      var triggers = $all(".accordion-trigger", acc);
      triggers.forEach(function (t) {
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.style.maxHeight = "0px";
        t.addEventListener("click", function () {
          var isOpen = t.getAttribute("aria-expanded") === "true";
          triggers.forEach(function (o) {              // only one panel open at a time
            o.setAttribute("aria-expanded", "false");
            document.getElementById(o.getAttribute("aria-controls")).style.maxHeight = "0px";
          });
          if (!isOpen) {
            t.setAttribute("aria-expanded", "true");
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      });
    });
  }

  /* ---------- 6. FORM VALIDATION (shared) ---------- */
  var PHONE_RE = /^(\+27|0)[1-9][0-9]{8}$/;           // South African numbers, spaces/dashes removed first
  var NAME_RE = /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F '\-]{1,59}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldError(field) {
    var v = field.value.trim();
    var label = field.getAttribute("data-label") || "This field";
    if (field.required && !v) { return label + " is required."; }
    if (!v) { return ""; }
    switch (field.getAttribute("data-rule")) {
      case "name":
        if (!NAME_RE.test(v)) { return "Use letters only (2 to 60 characters)."; }
        break;
      case "email":
        if (!EMAIL_RE.test(v)) { return "Enter a valid email address, e.g. name@example.com."; }
        break;
      case "phone":
        if (!PHONE_RE.test(v.replace(/[\s\-()]/g, ""))) { return "Enter a valid South African number, e.g. 071 234 5678 or +27 71 234 5678."; }
        break;
      case "date":
        var d = new Date(v), today = new Date(); today.setHours(0, 0, 0, 0);
        if (isNaN(d) || d < today) { return "Choose today or a future date."; }
        break;
    }
    if (field.type === "number") {
      var n = Number(v);
      if (!Number.isInteger(n) || n < Number(field.min) || n > Number(field.max)) {
        return "Enter a whole number from " + field.min + " to " + field.max + ".";
      }
    }
    var min = Number(field.getAttribute("minlength")), max = Number(field.getAttribute("maxlength"));
    if (min && v.length < min) { return "Please write at least " + min + " characters (now " + v.length + ")."; }
    if (max && v.length > max) { return "Please keep it under " + max + " characters."; }
    return "";
  }

  function checkField(field) {
    var box = document.getElementById(field.id + "-error");
    var msg = fieldError(field);
    field.classList.toggle("invalid", !!msg);
    field.classList.toggle("valid", !msg && !!field.value.trim());
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (box) { box.textContent = msg; }
    return !msg;
  }

  function validateForm(form) {
    var fields = $all("input[data-rule], input[required], select[required], textarea[required], textarea[data-rule]", form)
      .filter(function (f) { return !f.disabled && !f.closest("[hidden]"); });
    var firstBad = null;
    fields.forEach(function (f) {
      if (!checkField(f) && !firstBad) { firstBad = f; }
    });
    var summary = $(".form-error-summary", form);
    if (summary) {
      summary.classList.toggle("show", !!firstBad);
      summary.textContent = firstBad ? "Please fix the highlighted fields and try again." : "";
    }
    if (firstBad) { firstBad.focus(); }
    return !firstBad;
  }

  function liveValidate(form) {
    $all("input, select, textarea", form).forEach(function (f) {
      f.addEventListener("blur", function () { if (f.id) { checkField(f); } });
      f.addEventListener("input", function () { if (f.classList.contains("invalid")) { checkField(f); } });
    });
    $all("textarea[maxlength]", form).forEach(function (t) {
      var out = document.getElementById(t.id + "-count");
      if (!out) { return; }
      var update = function () { out.textContent = t.value.length + " / " + t.getAttribute("maxlength"); };
      t.addEventListener("input", update); update();
    });
  }

  /* ---------- 7. ENQUIRY FORM ---------- */
  function initEnquiry() {
    var form = $("#enquiry-form");
    if (!form) { return; }
    liveValidate(form);

    var productSel = $("#product");
    PRODUCTS.forEach(function (p) {
      var o = el("option", "", p.name + " - " + money(p.price)); o.value = p.id; productSel.appendChild(o);
    });
    var wanted = new URLSearchParams(location.search).get("product");   // from "Enquire about this" buttons
    if (wanted && findProduct(wanted)) { productSel.value = wanted; }

    // Date can't be in the past (HTML5 min attribute set by JS)
    var dateEl = $("#needed-by");
    var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    dateEl.min = t.toISOString().slice(0, 10);

    // Show/hide product fields depending on enquiry type
    var typeSel = $("#enquiry-type");
    var productRows = $all(".product-only", form);
    function toggleType() {
      var needs = typeSel.value === "order" || typeSel.value === "bulk";
      productRows.forEach(function (r) {
        r.hidden = !needs;
        $all("select, input", r).forEach(function (f) { f.required = needs && f.id !== "needed-by" && f.id !== "size"; });
      });
      var q = $("#quantity");
      if (typeSel.value === "bulk") { q.min = 20; q.max = 50; if (Number(q.value) < 20) { q.value = 20; } }
      else { q.min = 1; q.max = 50; }
    }
    typeSel.addEventListener("change", toggleType);
    toggleType();

    var result = $("#enquiry-result");
    var success = $("#enquiry-success");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      success.classList.remove("show");
      result.classList.remove("show");
      if ($("#website", form).value) { return; }          // honeypot: bots fill this, people can't see it
      if (!validateForm(form)) { return; }

      var data = {
        name: $("#full-name").value.trim(),
        email: $("#email").value.trim(),
        phone: $("#phone").value.trim(),
        type: typeSel.value,
        product: productSel.value,
        size: $("#size").value,
        quantity: Number($("#quantity").value),
        neededBy: dateEl.value,
        message: $("#message").value.trim()
      };

      var btn = $(".submit-btn", form);
      btn.disabled = true; btn.textContent = "Sending...";

      sendAjax(data).then(function (ref) {
        showQuote(data, ref, result);
        success.textContent = "Thank you " + data.name.split(" ")[0] + "! Your enquiry was sent. Your reference is " + ref + ".";
        success.classList.add("show");
        form.reset(); toggleType();
        $all(".valid, .invalid", form).forEach(function (f) { f.classList.remove("valid", "invalid"); });
        $all(".char-count", form).forEach(function (c) { c.textContent = "0 / 500"; });
        result.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }).catch(function () {
        var s = $(".form-error-summary", form);
        s.textContent = "We could not send your enquiry (check your connection). Your answers are still here, please try again.";
        s.classList.add("show");
      }).then(function () {
        btn.disabled = false; btn.textContent = "Send enquiry";
      });
    });
  }

  // AJAX: send the data in the background without reloading the page
  function sendAjax(data) {
    var ctrl = ("AbortController" in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) { ctrl.abort(); } }, 10000);
    return fetch(SETTINGS.ajaxEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) { throw new Error("Server answered " + res.status); }
      return res.json();
    }).then(function (json) {
      return "INY-" + (json.id || Date.now().toString(36)).toString().toUpperCase();
    });
  }

  // Processing: build the response about cost and availability
  function showQuote(d, ref, panel) {
    panel.textContent = "";
    panel.appendChild(el("h2", "", "Your enquiry response (" + ref + ")"));
    var rows = [];
    var p = findProduct(d.product);

    if (d.type === "order" || d.type === "bulk") {
      var items = p.price * d.quantity;
      var bulk = d.type === "bulk" || d.quantity >= 20;
      rows.push(["Item", d.quantity + " x " + p.name + (d.size ? " (size " + d.size + ")" : "")]);
      rows.push(["Item cost", money(items) + " (" + money(p.price) + " each)"]);
      rows.push(["Courier (nationwide, flat rate)", money(SETTINGS.courierFee)]);
      rows.push(["Estimated total", money(items + SETTINGS.courierFee)]);
      rows.push(["Availability", "Made to order: allow 5-7 days for printing, plus courier time."]);
      if (bulk) { rows.push(["Bulk order", "Orders of 20-50 pieces are confirmed by us personally before you pay."]); }
      if (d.neededBy) { rows.push(["You need it by", d.neededBy + ". We will tell you if this date is tight."]); }
    } else if (d.type === "custom") {
      rows.push(["Custom printing", "Names, dates and quotes can be printed on our items. We will reply with a price based on your wording."]);
      rows.push(["Availability", "Print-on-demand, normally 5-7 days."]);
    } else {
      rows.push(["Next step", "Thank you for your interest. We will reply to " + d.email + " with details."]);
    }
    var tbl = el("table");
    rows.forEach(function (r) {
      var tr = el("tr"); tr.appendChild(el("th", "", r[0])); tr.appendChild(el("td", "", r[1])); tbl.appendChild(tr);
    });
    panel.appendChild(tbl);
    panel.appendChild(el("p", "form-note", "This is an estimate. Final prices are confirmed when we reply."));
    panel.classList.add("show");
  }

  /* ---------- 8. CONTACT FORM (compiled into an email) ---------- */
  function initContact() {
    var form = $("#contact-form");
    if (!form) { return; }
    liveValidate(form);
    var panel = $("#email-preview");
    var body = $("#email-body");
    var openBtn = $("#open-email");
    var copyBtn = $("#copy-email");
    var note = $("#email-note");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if ($("#website", form).value) { return; }
      if (!validateForm(form)) { return; }

      var reasonSel = $("#reason");
      var subject = "[INEEDYOU website] " + reasonSel.options[reasonSel.selectedIndex].text + ": " + $("#subject").value.trim();
      var text = [
        "To: " + SETTINGS.recipientEmail,
        "Subject: " + subject,
        "",
        "Name: " + $("#c-name").value.trim(),
        "Email: " + $("#c-email").value.trim(),
        "Phone: " + ($("#c-phone").value.trim() || "not given"),
        "Type of message: " + reasonSel.options[reasonSel.selectedIndex].text,
        "",
        $("#c-message").value.trim()
      ].join("\n");

      body.value = text;
      var mailBody = text.split("\n").slice(3).join("\n");        // body only, without To/Subject lines
      openBtn.href = "mailto:" + SETTINGS.recipientEmail +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(mailBody);
      note.textContent = "";
      panel.classList.add("show");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    copyBtn.addEventListener("click", function () {
      body.select();
      var done = function () { note.textContent = "Email text copied."; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(body.value).then(done, function () { document.execCommand("copy"); done(); });
      } else { document.execCommand("copy"); done(); }
    });
  }

  /* ---------- 9. INTERACTIVE MAP (Leaflet + OpenStreetMap) ---------- */
  function initMap() {
    var holder = $("#map");
    if (!holder) { return; }
    if (typeof window.L === "undefined") {
      holder.appendChild(el("p", "map-fallback", "The interactive map could not load. Find us in Middelburg, Mpumalanga on OpenStreetMap."));
      return;
    }
    var map = L.map("map", { scrollWheelZoom: false }).setView([SETTINGS.mapLat, SETTINGS.mapLng], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    L.marker([SETTINGS.mapLat, SETTINGS.mapLng]).addTo(map)
      .bindPopup("<strong>INEEDYOU Authentic Wear</strong><br>Middelburg, Mpumalanga<br>Mon-Sat, 9am-6pm")
      .openPopup();
  }

  /* ---------- START ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMenu();
    highlightCurrentPage();
    setFooterYear();
    initProducts();       // build cards first so reveal + lightbox can see them
    initLightbox();
    initAccordion();
    initEnquiry();
    initContact();
    initMap();
    initReveal();
    initBackToTop();
  });
})();
