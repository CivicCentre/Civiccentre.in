import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "chatbotDockPos";

/**
 * Floating Chat-to-WhatsApp widget
 *
 * How it works:
 * - Small circular chat button fixed at bottom-right.
 * - Clicking opens a tiny chat box UI. Typing a message and pressing Send
 *   opens WhatsApp (mobile app or web) with the message prefilled.
 *
 * Props:
 *  - whatsAppNumber: string (E.164 format without spaces, e.g. "919876543210").
 *                     If omitted, uses process.env.VITE_WHATSAPP_NUMBER or a placeholder.
 */
export default function Chatbot({ whatsAppNumber }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const panelRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0, moved: false });

  const number =
    (whatsAppNumber && String(whatsAppNumber)) ||
    (import.meta?.env?.VITE_WHATSAPP_NUMBER && String(import.meta.env.VITE_WHATSAPP_NUMBER)) ||
    "917013495019"; // TODO: replace with your real number

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      window.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Initialize dock position and clamp on resize/orientation
  useEffect(() => {
    const btnSize = 56; // matches styles.button
    const margin = 16;
    const tabbar = 64; // bottom tab bar height used in CSS var

    const clamp = (x, y) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxX = Math.max(0, vw - btnSize - margin);
      const maxY = Math.max(0, vh - btnSize - (tabbar + margin));
      return { x: Math.min(Math.max(margin, x), maxX), y: Math.min(Math.max(margin, y), maxY) };
    };

    // Load from storage or default to bottom-right above tabbar
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved.x === "number" && typeof saved.y === "number") {
        setPos(clamp(saved.x, saved.y));
      } else {
        const defX = window.innerWidth - btnSize - margin;
        const defY = window.innerHeight - (tabbar + btnSize + margin);
        setPos(clamp(defX, defY));
      }
    } catch {
      const defX = window.innerWidth - btnSize - margin;
      const defY = window.innerHeight - (tabbar + btnSize + margin);
      setPos(clamp(defX, defY));
    }

    const onResize = () => setPos(p => clamp(p.x, p.y));
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // Dragging: mouse & touch
  useEffect(() => {
    const onMove = (e) => {
      if (!drag.current.active) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - drag.current.startX;
      const dy = clientY - drag.current.startY;
      if (Math.abs(dx) + Math.abs(dy) > 12) drag.current.moved = true;
      const next = { x: drag.current.origX + dx, y: drag.current.origY + dy };
      // simple clamp within viewport
      const vw = window.innerWidth, vh = window.innerHeight, btn = 56, margin = 8, tabbar = 64;
      const maxX = Math.max(0, vw - btn - margin);
      const maxY = Math.max(0, vh - btn - (tabbar + margin));
      setPos({ x: Math.min(Math.max(margin, next.x), maxX), y: Math.min(Math.max(margin, next.y), maxY) });
    };
    const onEnd = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pos)); } catch (err) { void err; }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
    const start = (e) => {
      const t = e.touches ? e.touches[0] : e;
      drag.current.active = true;
      drag.current.moved = false;
      drag.current.startX = t.clientX;
      drag.current.startY = t.clientY;
      drag.current.origX = pos.x;
      drag.current.origY = pos.y;
      window.addEventListener("mousemove", onMove, { passive: false });
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("mouseup", onEnd, { passive: true });
      window.addEventListener("touchend", onEnd, { passive: true });
    };
    // Expose starters
    drag.current.begin = start;
    drag.current.finish = onEnd;
    drag.current.move = onMove;
  }, [pos]);

  function handleSend(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    // Build a WhatsApp deep-link that works on mobile & desktop
    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    // Open in a new tab. If you prefer a hard redirect, replace with: window.location.href = waUrl
    window.open(waUrl, "_blank");
    setMessage("");
    setOpen(false);
  }

  // Basic inline styles to avoid touching global CSS
  const styles = {
    container: {
      position: "fixed",
      left: pos.x,
      top: pos.y,
      zIndex: 5000,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8,
      touchAction: "none",
      userSelect: "none",
   },
    button: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
      color: "white",
      animation: "glowPulse 1.5s infinite",
      position: "relative",
    },
    pop: (open) => ({
      position: "absolute",
      zIndex: 5001,
      right: 0,
      bottom: 72,
      width: 300,
      maxWidth: "calc(100vw - 32px)",
      borderRadius: 12,
      boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
      background: "#ffffff",
      overflow: "hidden",
      transform: open ? "scale(1) translateY(0)" : "scale(0.9) translateY(8px)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity 160ms ease, transform 160ms ease",
    }),
    header: {
      padding: "12px 14px",
      background: "#f6f7f9",
      borderBottom: "1px solid #eceff3",
      fontWeight: 600,
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    body: {
      padding: 12,
      fontSize: 13,
      color: "#344054",
    },
    form: {
      display: "flex",
      gap: 8,
      padding: 12,
      borderTop: "1px solid #eceff3",
      background: "#fff",
    },
    input: {
      flex: 1,
      padding: "10px 12px",
      fontSize: 14,
      borderRadius: 10,
      outline: "none",
      border: "1px solid #d0d5dd",
    },
    send: {
      padding: "10px 14px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      background: "#25D366",
      color: "white",
      fontWeight: 600,
    },
    badge: {
      marginLeft: "auto",
      fontSize: 11,
      color: "#667085",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
@keyframes glowPulse {
  0% { box-shadow: 0 0 5px rgba(37,211,102,0.5), 0 0 10px rgba(37,211,102,0.4), 0 0 15px rgba(37,211,102,0.3); }
  50% { box-shadow: 0 0 15px rgba(37,211,102,0.8), 0 0 25px rgba(37,211,102,0.6), 0 0 35px rgba(37,211,102,0.4); }
  100% { box-shadow: 0 0 5px rgba(37,211,102,0.5), 0 0 10px rgba(37,211,102,0.4), 0 0 15px rgba(37,211,102,0.3); }
}
        `}
      </style>
      {/* Popup panel */}
      <div ref={panelRef} style={styles.pop(open)} aria-hidden={!open}>
        <div style={styles.header}>
          {/* Simple chat icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6EE7F9"/>
                <stop offset="100%" stopColor="#A78BFA"/>
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#aiGrad)"/>
            <rect x="7" y="8" width="10" height="8" rx="3" fill="#fff"/>
            <circle cx="10" cy="12" r="1" fill="#111827"/>
            <circle cx="14" cy="12" r="1" fill="#111827"/>
            <path d="M9 15c1 .8 5 .8 6 0" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 6v2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <span>AI Assistant</span>
          <span style={{...styles.badge, display: "inline-flex", alignItems: "center", gap: 6}}>
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M20.52 3.48A11.73 11.73 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.83c0 2.08.54 4.1 1.57 5.9L0 24l6.4-1.66a11.8 11.8 0 0 0 5.63 1.43c6.54 0 11.84-5.3 11.84-11.84a11.8 11.8 0 0 0-3.36-8.45zM12.04 21.5a9.6 9.6 0 0 1-4.9-1.34l-.35-.2-3.8 1 .99-3.7-.24-.38a9.6 9.6 0 1 1 8.3 4.62zm5.55-7.18c-.3-.15-1.76-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.4-1.47-.89-.79-1.5-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.53.07-.8.38-.27.3-1.06 1.04-1.06 2.54 0 1.5 1.09 2.94 1.24 3.14.15.2 2.15 3.3 5.2 4.63.73.32 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.76-.72 2-1.41.24-.7.24-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="#25D366"/>
            </svg>
            Sends via WhatsApp
          </span>
        </div>
        <div style={styles.body}>
          Type your message below and hit Send. You'll be redirected to WhatsApp with the message prefilled.
        </div>
        <form style={styles.form} onSubmit={handleSend}>
          <input
            style={styles.input}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            aria-label="Message"
          />
          <button type="submit" style={styles.send}>
            Send
          </button>
        </form>
      </div>

      {/* Floating chat button */}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onMouseDown={(e) => { drag.current.begin?.(e); }}
        onTouchStart={(e) => { drag.current.begin?.(e); }}
        onMouseUp={() => {
          if (!drag.current.moved) setOpen(v => !v);
          drag.current.moved = false;
        }}
        onTouchEnd={() => {
          if (!drag.current.moved) setOpen(v => !v);
          drag.current.moved = false;
        }}
        style={{ ...styles.button, cursor: drag.current.active ? "grabbing" : "grab" }}
      >
        {/* Chat bubble icon */}
        <svg width="26" height="26" viewBox="1 0 30 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M20.52 3.48A11.73 11.73 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.83c0 2.08.54 4.1 1.57 5.9L0 24l6.4-1.66a11.8 11.8 0 0 0 5.63 1.43c6.54 0 11.84-5.3 11.84-11.84a11.8 11.8 0 0 0-3.36-8.45zM12.04 21.5a9.6 9.6 0 0 1-4.9-1.34l-.35-.2-3.8 1 .99-3.7-.24-.38a9.6 9.6 0 1 1 8.3 4.62zm5.55-7.18c-.3-.15-1.76-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.4-1.47-.89-.79-1.5-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.53.07-.8.38-.27.3-1.06 1.04-1.06 2.54 0 1.5 1.09 2.94 1.24 3.14.15.2 2.15 3.3 5.2 4.63.73.32 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.76-.72 2-1.41.24-.7.24-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
  );
}