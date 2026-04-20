import { React } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fc",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "2rem",
  },
  header: {
    marginBottom: "2rem",
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
  },
  profileCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "2rem",
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  avatarWrapper: {
    flexShrink: 0,
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #5b5bd6, #7c7cec)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "1px",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#1e1e2e",
    margin: 0,
  },
  role: {
    fontSize: "0.95rem",
    color: "#5b5bd6",
    fontWeight: "600",
    marginTop: "0.2rem",
  },
  bio: {
    fontSize: "0.9rem",
    color: "#4b5563",
    lineHeight: "1.7",
    marginTop: "0.8rem",
  },
  badgeRow: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  badge: {
    background: "#eef0ff",
    color: "#4f46e5",
    fontSize: "0.8rem",
    fontWeight: "600",
    padding: "0.3rem 0.9rem",
    borderRadius: "20px",
    border: "1px solid #c7d2fe",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.2rem",
    marginBottom: "1.5rem",
  },
  infoCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.4rem 1.6rem",
  },
  infoCardTitle: {
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.8rem",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.5rem 0",
    borderBottom: "1px solid #f3f4f6",
    fontSize: "0.9rem",
    color: "#374151",
  },
  infoIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: "#eef0ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "13px",
  },
  skillCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.4rem 1.6rem",
    marginBottom: "1.5rem",
  },
  skillBarRow: {
    marginBottom: "0.9rem",
  },
  skillLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.88rem",
    color: "#374151",
    marginBottom: "0.3rem",
    fontWeight: "500",
  },
  skillTrack: {
    height: "8px",
    background: "#f3f4f6",
    borderRadius: "4px",
    overflow: "hidden",
  },
  skillFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #5b5bd6, #818cf8)",
    borderRadius: "4px",
    transition: "width 1s ease",
  }),
  missionCard: {
    background: "linear-gradient(135deg, #5b5bd6 0%, #6d6de4 100%)",
    borderRadius: "12px",
    padding: "1.6rem 2rem",
    color: "#fff",
  },
  missionTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    margin: "0 0 0.5rem",
  },
  missionText: {
    fontSize: "0.92rem",
    lineHeight: "1.7",
    opacity: 0.9,
    margin: 0,
  },
};

const skills = [
  { name: "React.js", pct: 85 },
  { name: "Node.js / Express", pct: 78 },
  { name: "MongoDB", pct: 72 },
  { name: "JavaScript (ES6+)", pct: 88 },
  { name: "UI/UX Design", pct: 65 },
];

function AboutDeveloperPage() {
    const navigate = useNavigate();
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
      <div style={styles.header}>
        <h1 style={styles.title}>About Developer</h1>
        <p style={styles.subtitle}>The person behind Semester-Solution</p>
      </div>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.avatarWrapper}>
          <div style={styles.avatar}>VS</div>
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.name}>Vaibhav Sharma</h2>
          <p style={styles.role}>Full-Stack Developer · ECE 2nd Year Student</p>
          <p style={styles.bio}>
            Hey! I'm Vaibhav, an Electronics & Communication Engineering student
            with a passion for web development. I built Semester-Solution to
            solve a real problem I faced — students struggling to find semester
            resources in one place. My goal is to make learning accessible and
            well-organised for everyone.
          </p>
          <div style={styles.badgeRow}>
            {["React", "Node.js", "MongoDB", "Express", "Vite"].map((t) => (
              <span key={t} style={styles.badge}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div style={styles.grid}>
        <div style={styles.infoCard}>
          <div style={styles.infoCardTitle}>Personal Details</div>
          {
          [
            { icon: "🎓", label: "Branch", value: "ECE — 2nd Year" },
            { icon: "🏫", label: "Institute", value: "Engineering College" },
            { icon: "📍", label: "Location", value: "India" },
            { icon: "💼", label: "Role", value: "Student Developer" },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ ...styles.infoItem, borderBottom: "1px solid #f3f4f6" }}>
              <div style={styles.infoIcon}>{icon}</div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{label}</div>
                <div style={{ fontWeight: "600", color: "#1e1e2e" }}>{value}</div>
              </div>
            </div>
          ))
          }
        </div>

        <div style={styles.infoCard}>
          <div style={styles.infoCardTitle}>Project Info</div>
          {[
            { icon: "🚀", label: "Project", value: "Semester-Solution" },
            { icon: "📅", label: "Started", value: "2024" },
            { icon: "🌐", label: "Type", value: "Full-Stack Web App" },
            { icon: "📂", label: "Stack", value: "MERN Stack + Vite" },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ ...styles.infoItem, borderBottom: "1px solid #f3f4f6" }}>
              <div style={styles.infoIcon}>{icon}</div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{label}</div>
                <div style={{ fontWeight: "600", color: "#1e1e2e" }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={styles.skillCard}>
        <div style={{ ...styles.infoCardTitle, marginBottom: "1rem" }}>Technical Skills</div>
        {skills.map(({ name, pct }) => (
          <div key={name} style={styles.skillBarRow}>
            <div style={styles.skillLabel}>
              <span>{name}</span>
              <span style={{ color: "#5b5bd6" }}>{pct}%</span>
            </div>
            <div style={styles.skillTrack}>
              <div style={styles.skillFill(pct)} />
            </div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div style={styles.missionCard}>
        <p style={styles.missionTitle}>My Mission</p>
        <p style={styles.missionText}>
          "This site Semester Solution is built with the intent of giving all
          students of any branch or semester easy access to their semester
          course resources — so they can grab the knowledge of their subjects
          without any hassle."
        </p>
      </div>
    </div>
  </>
  );
}

export default AboutDeveloperPage;
