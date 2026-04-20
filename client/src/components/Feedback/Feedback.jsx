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
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
  ratingSection: {
    marginBottom: "1.4rem",
  },
  ratingLabel: {
    fontSize: "0.88rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.6rem",
  },
  starRow: {
    display: "flex",
    gap: "0.4rem",
  },
  star: (active) => ({
    fontSize: "2rem",
    cursor: "pointer",
    color: active ? "#f59e0b" : "#d1d5db",
    transition: "color 0.15s, transform 0.1s",
    lineHeight: 1,
    userSelect: "none",
  }),
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.6rem",
    marginBottom: "1.4rem",
  },
  categoryBtn: (active) => ({
    padding: "0.6rem 0.8rem",
    border: active ? "2px solid #5b5bd6" : "1.5px solid #e5e7eb",
    borderRadius: "8px",
    background: active ? "#eef0ff" : "#fff",
    color: active ? "#4f46e5" : "#374151",
    fontSize: "0.85rem",
    fontWeight: active ? "700" : "500",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.15s",
  }),
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
    minHeight: "120px",
    fontFamily: "inherit",
  },
  charCount: {
    fontSize: "0.78rem",
    color: "#9ca3af",
    textAlign: "right",
    marginTop: "0.3rem",
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "1rem",
    fontSize: "0.88rem",
    color: "#374151",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#5b5bd6",
    cursor: "pointer",
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
    transition: "background 0.2s",
  },
  successCard: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "14px",
    padding: "2rem",
    textAlign: "center",
  },
  successEmoji: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  successTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#15803d",
    margin: "0 0 0.4rem",
  },
  successText: {
    fontSize: "0.9rem",
    color: "#374151",
    margin: 0,
  },
  statsCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "1.8rem",
  },
  statRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    borderBottom: "1px solid #f3f4f6",
  },
  statLabel: {
    fontSize: "0.88rem",
    color: "#374151",
    fontWeight: "500",
  },
  statBar: {
    flex: 1,
    margin: "0 1rem",
    height: "8px",
    background: "#f3f4f6",
    borderRadius: "4px",
    overflow: "hidden",
  },
  statFill: (pct, color) => ({
    height: "100%",
    width: `${pct}%`,
    background: color,
    borderRadius: "4px",
  }),
  statPct: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#5b5bd6",
    minWidth: "36px",
    textAlign: "right",
  },
  infoBox: {
    background: "#eef0ff",
    border: "1px solid #c7d2fe",
    borderRadius: "10px",
    padding: "1rem 1.2rem",
    marginTop: "1.5rem",
  },
  infoBoxTitle: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#4338ca",
    marginBottom: "0.4rem",
  },
  infoBoxText: {
    fontSize: "0.84rem",
    color: "#4f46e5",
    margin: 0,
    lineHeight: "1.6",
  },
};

const categories = [
  "UI / Design", "Course Content", "Performance", "Navigation",
  "Missing Resources", "Bug Report", "Suggestion", "Other",
];

const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const existingStats = [
  { label: "UI / Design", pct: 72, color: "#818cf8" },
  { label: "Content Quality", pct: 85, color: "#34d399" },
  { label: "Navigation", pct: 68, color: "#f59e0b" },
  { label: "Performance", pct: 60, color: "#f87171" },
];

export default function FeedbackPage() {

    const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [selectedCats, setSelectedCats] = useState([]);
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleCat(cat) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!rating) return alert("Please give a star rating!");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <>
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

    <div style={styles.page}>
      <h1 style={styles.title}>Give Us Feedback</h1>
      <p style={styles.subtitle}>
        Your feedback helps us make Semester-Solution better for everyone.
      </p>

      <div style={styles.grid}>
        {/* Left: Feedback Form */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Share Your Experience</p>

          {submitted ? (
            <div style={styles.successCard}>
              <div style={styles.successEmoji}>🎉</div>
              <p style={styles.successTitle}>Thank you for your feedback!</p>
              <p style={styles.successText}>
                Your response has been recorded. We'll use it to improve
                Semester-Solution for all students.
              </p>
              <button
                style={{ ...styles.btn, marginTop: "1.2rem", width: "auto", padding: "0.6rem 2rem" }}
                onClick={() => { setSubmitted(false); setRating(0); setSelectedCats([]); setForm({ name: "", feedback: "" }); }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div style={styles.ratingSection}>
                <div style={styles.ratingLabel}>
                  Overall Rating{" "}
                  {(hovered || rating) > 0 && (
                    <span style={{ color: "#5b5bd6", marginLeft: "0.4rem" }}>
                      — {ratingLabels[hovered || rating]}
                    </span>
                  )}
                </div>
                <div style={styles.starRow}>
                  {
                  [1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      style={styles.star(s <= (hovered || rating))}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                    >
                      ★
                    </span>
                  ))
                  }
                </div>
              </div>

              {/* Category */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Feedback Category (select all that apply)</label>
                <div style={styles.categoryGrid}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      style={styles.categoryBtn(selectedCats.includes(cat))}
                      onClick={() => toggleCat(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name (optional)</label>
                <input
                  style={{ ...styles.input, opacity: anonymous ? 0.5 : 1 }}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={anonymous ? "Submitting anonymously" : "Enter your name"}
                  disabled={anonymous}
                />
                <label style={{ ...styles.checkRow, marginTop: "0.5rem" }}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                  />
                  Submit anonymously
                </label>
              </div>

              {/* Feedback Text */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Feedback *</label>
                <textarea
                  style={styles.textarea}
                  name="feedback"
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder="Tell us what you liked, what can be improved, or report any issues..."
                  maxLength={500}
                  required
                />
                <div style={styles.charCount}>{form.feedback.length}/500</div>
              </div>

              <button
                type="submit"
                style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Feedback →"}
              </button>
            </form>
          )}
        </div>

        {/* Right: Stats + Info */}
        <div>
          <div style={styles.statsCard}>
            <p style={styles.cardTitle}>Community Ratings</p>
            <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: 0, marginBottom: "1rem" }}>
              Based on all user feedback received so far
            </p>
            {existingStats.map(({ label, pct, color }) => (
              <div key={label} style={styles.statRow}>
                <span style={styles.statLabel}>{label}</span>
                <div style={styles.statBar}>
                  <div style={styles.statFill(pct, color)} />
                </div>
                <span style={styles.statPct}>{pct}%</span>
              </div>
            ))}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "0.8rem",
                borderTop: "1px solid #f3f4f6",
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: "600" }}>
                Average Rating
              </span>
              <span
                style={{
                  background: "#eef0ff",
                  color: "#4f46e5",
                  fontWeight: "800",
                  fontSize: "1.2rem",
                  padding: "0.3rem 1rem",
                  borderRadius: "8px",
                }}
              >
                4.2 / 5 ★
              </span>
            </div>
          </div>

          <div style={styles.infoBox}>
            <p style={styles.infoBoxTitle}>Why your feedback matters</p>
            <p style={styles.infoBoxText}>
              Every response directly helps improve Semester-Solution. We use
              your suggestions to add missing resources, fix bugs, and improve
              the overall experience for thousands of students.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}