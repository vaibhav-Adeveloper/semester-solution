import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fc",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "2rem",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1e1e2e",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#6b7280",
    marginTop: "0.3rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    alignItems: "start",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "1.8rem",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#1e1e2e",
    margin: "0 0 1.2rem",
    paddingBottom: "0.8rem",
    borderBottom: "1px solid #f3f4f6",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.9rem 0",
    borderBottom: "1px solid #f9fafb",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
  contactIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#eef0ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: "0.78rem",
    color: "#9ca3af",
    marginBottom: "2px",
  },
  contactValue: {
    fontSize: "0.92rem",
    fontWeight: "600",
    color: "#1e1e2e",
  },
  contactArrow: {
    marginLeft: "auto",
    color: "#5b5bd6",
    fontWeight: "700",
    fontSize: "1.1rem",
  },
  formGroup: {
    marginBottom: "1.1rem",
  },
  label: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.4rem",
  },
  input: {
    width: "100%",
    padding: "0.65rem 0.9rem",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.9rem",
    color: "#1e1e2e",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "0.65rem 0.9rem",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.9rem",
    color: "#1e1e2e",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: "110px",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  btn: {
    width: "100%",
    padding: "0.75rem",
    background: "#5b5bd6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "background 0.2s, transform 0.1s",
  },
  successBanner: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "10px",
    padding: "1rem 1.2rem",
    fontSize: "0.9rem",
    color: "#15803d",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "1rem",
  },
  availCard: {
    background: "linear-gradient(135deg, #5b5bd6, #6d6de4)",
    borderRadius: "14px",
    padding: "1.6rem",
    color: "#fff",
    marginTop: "1.5rem",
  },
  availTitle: {
    fontWeight: "700",
    fontSize: "1rem",
    margin: "0 0 0.8rem",
  },
  availRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.88rem",
    opacity: 0.9,
    padding: "0.35rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
  },
};

const contacts = [
  { icon: "✉️", label: "Email", value: "vaibhav@example.com" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/vaibhav-sharma" },
  { icon: "🐙", label: "GitHub", value: "github.com/vaibhav-sharma" },
  { icon: "🐦", label: "Twitter / X", value: "@vaibhav_dev" },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Contact({ showBackButton = false }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  }

  return (
    <>
     {
      showBackButton &&
      <button
  onClick={() => navigate(-1)}
  style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    background: "#fff",
    border: "1.5px solid #c7d2fe",
    borderRadius: "10px",
    color: "#4f46e5",
    fontSize: "0.88rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(91,91,214,0.12)",
    zIndex: 999,
    transition: "all 0.2s",
    fontFamily: "'Segoe UI', sans-serif",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = "#eef0ff";
    e.currentTarget.style.boxShadow = "0 4px 14px rgba(91,91,214,0.22)";
    e.currentTarget.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.boxShadow = "0 2px 8px rgba(91,91,214,0.12)";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  ← Go Back
</button>
     }

    <div style={styles.page}>
      <h1 style={styles.title}>Contact Developer</h1>
      <p style={styles.subtitle}>Reach out for suggestions, bug reports, or just to say hi!</p>

      <div style={{ ...styles.grid, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {/* Left: Contact Info */}
        <div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Direct Contact</p>
            {contacts.map(({ icon, label, value }) => (
              <div key={label} style={styles.contactRow}>
                <div style={styles.contactIcon}>{icon}</div>
                <div>
                  <div style={styles.contactLabel}>{label}</div>
                  <div style={styles.contactValue}>{value}</div>
                </div>
                <span style={styles.contactArrow}>→</span>
              </div>
            ))}
          </div>

          <div style={styles.availCard}>
            <p style={styles.availTitle}>Availability</p>
            {hours.map(({ day, time }) => (
              <div key={day} style={styles.availRow}>
                <span>{day}</span>
                <span style={{ fontWeight: "600" }}>{time}</span>
              </div>
            ))}
            <p style={{ fontSize: "0.82rem", opacity: 0.75, marginTop: "0.8rem", marginBottom: 0 }}>
              Typical response time: within 24–48 hours
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Send a Message</p>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                style={styles.input}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                style={styles.input}
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Bug report, Suggestion..."
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                style={styles.textarea}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
              />
            </div>
            <button
              type="submit"
              style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </form>
          {sent && (
            <div style={styles.successBanner}>
              ✅ Message sent! Vaibhav will get back to you soon.
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}