import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ── adjust this selector to match your authSlice state shape ──────────────
const selectUser = (state) => state.auth.userData;
// e.g. userData = { name: "Sourav", branch: "ECE", semester: "3", email: "..." }
// ─────────────────────────────────────────────────────────────────────────

const BRANCHES  = ["CSE","ECE","EEE","ME","CE","IT","AIDS","AIML","Cyber Security","Other"];
const SEMESTERS = ["1","2","3","4","5","6","7","8"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const userData = useSelector(selectUser) || {};

  const [form, setForm] = useState({
    name    : userData.name     || "",
    email   : userData.email    || "",
    branch  : userData.branch   || "",
    semester: userData.semester || "",
    rollNo  : "",
    bio     : "",
    github  : "",
    linkedin: "",
  });

  const [avatar,   setAvatar]   = useState(null);
  const [editing,  setEditing]  = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  // ── handlers ────────────────────────────────────────────────────────────
  function handleChange(e) {
    setSaved(false);
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function processImageFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please upload an image file."); return; }
    if (file.size > 2 * 1024 * 1024)    { alert("Image must be under 2 MB.");     return; }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  }

  function handleImageChange(e) { processImageFile(e.target.files[0]); }
  function handleDrop(e)        { e.preventDefault(); setDragOver(false); processImageFile(e.dataTransfer.files[0]); }
  function handleDragOver(e)    { e.preventDefault(); setDragOver(true); }
  function handleDragLeave()    { setDragOver(false); }

  function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim()) { alert("Name cannot be empty."); return; }
    setLoading(true);
    setTimeout(() => {
      // TODO: dispatch(updateProfile({ ...form, avatar }))
      setLoading(false);
      setSaved(true);
      setEditing(false);
    }, 900);
  }

  // ── profile completion ───────────────────────────────────────────────────
  const allFields   = ["name","email","branch","semester","rollNo","bio","github","linkedin","avatar"];
  const fieldLabels = {
    name:"Name", email:"Email", branch:"Branch", semester:"Semester",
    rollNo:"Roll Number", bio:"Bio", github:"GitHub", linkedin:"LinkedIn", avatar:"Profile Picture",
  };
  const filledCount = allFields.filter((f) => f === "avatar" ? !!avatar : !!form[f]?.trim()).length;
  const pct         = Math.round((filledCount / allFields.length) * 100);
  const pctColor    = pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";

  // ── avatar initials fallback ─────────────────────────────────────────────
  const initials = (form.name || "S")
    .split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  // ── shared style tokens ──────────────────────────────────────────────────
  const S = {
    card: {
      background:"#fff", border:"1px solid #e5e7eb",
      borderRadius:14, padding:"22px 24px", marginBottom:16,
    },
    sectionTitle: {
      fontSize:".78rem", fontWeight:700, color:"#9ca3af",
      textTransform:"uppercase", letterSpacing:".08em",
      paddingBottom:10, borderBottom:"1px solid #f3f4f6", marginBottom:16,
    },
    label: {
      display:"block", fontSize:".8rem", fontWeight:700, color:"#6b7280", marginBottom:5,
    },
    input: (active) => ({
      width:"100%", padding:"10px 13px",
      border: active ? "1.5px solid #a5b4fc" : "1.5px solid #e5e7eb",
      borderRadius:9, fontSize:".9rem", color:"#1e1e2e",
      background: active ? "#fff" : "#fafafa",
      outline:"none", boxSizing:"border-box",
      fontFamily:"inherit", transition:"border-color .2s",
      cursor: active ? "text" : "not-allowed", resize:"vertical",
    }),
    select: (active) => ({
      width:"100%", padding:"10px 36px 10px 13px",
      border: active ? "1.5px solid #a5b4fc" : "1.5px solid #e5e7eb",
      borderRadius:9, fontSize:".9rem", color:"#1e1e2e",
      background: active ? "#fff" : "#fafafa",
      outline:"none", boxSizing:"border-box", fontFamily:"inherit",
      appearance:"none",
      backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
      backgroundRepeat:"no-repeat", backgroundPosition:"right 13px center",
      cursor: active ? "pointer" : "not-allowed",
    }),
    badge: {
      background:"#eef0ff", color:"#4f46e5", fontSize:".78rem",
      fontWeight:600, padding:"3px 11px", borderRadius:20, border:"1px solid #c7d2fe",
    },
    autoTag: {
      marginLeft:6, fontSize:".7rem", color:"#9ca3af", fontWeight:400, textTransform:"none",
    },
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f8f9fc",
      fontFamily:"'Segoe UI', sans-serif", padding:"24px 24px 48px" }}>

      {/* ── Back button ───────────────────────────────────────────────── */}
      <button
        onClick={() => navigate(-1)}
        style={{ position:"fixed", top:20, right:20, display:"flex", alignItems:"center",
          gap:6, padding:"8px 18px", background:"#fff", border:"1.5px solid #c7d2fe",
          borderRadius:10, color:"#4f46e5", fontSize:".88rem", fontWeight:700,
          cursor:"pointer", boxShadow:"0 2px 8px rgba(91,91,214,.12)",
          zIndex:999, fontFamily:"inherit", transition:"all .2s" }}
        onMouseEnter={e => { e.currentTarget.style.background="#eef0ff"; e.currentTarget.style.transform="translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background="#fff";    e.currentTarget.style.transform="translateY(0)"; }}
      >
        ← Go Back
      </button>

      {/* ── Page header ───────────────────────────────────────────────── */}
      <h1 style={{ fontSize:"1.5rem", fontWeight:700, color:"#1e1e2e", margin:0 }}>My Profile</h1>
      <p style={{ fontSize:".9rem", color:"#6b7280", marginTop:4, marginBottom:24 }}>
        Manage your personal and academic information
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",
        gap:16, alignItems:"start" }}>

        {/* ════════════ LEFT COLUMN ════════════════════════════════════ */}
        <div>

          {/* ── Avatar card ─────────────────────────────────────────── */}
          <div style={{ ...S.card, textAlign:"center" }}>

            {/* Avatar */}
            <div style={{ position:"relative", display:"inline-block", marginBottom:16 }}>
              {avatar ? (
                <img src={avatar} alt="profile"
                  style={{ width:100, height:100, borderRadius:"50%", objectFit:"cover",
                    border:"3px solid #c7d2fe", display:"block" }} />
              ) : (
                <div style={{ width:100, height:100, borderRadius:"50%", background:"#5b5bd6",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"2rem", fontWeight:700, color:"#fff",
                  border:"3px solid #c7d2fe", margin:"0 auto" }}>
                  {initials}
                </div>
              )}
              <button type="button" onClick={() => fileRef.current.click()}
                style={{ position:"absolute", bottom:2, right:2, width:30, height:30,
                  borderRadius:"50%", background:"#5b5bd6", border:"2px solid #fff",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", fontSize:13, color:"#fff" }}
                title="Change photo">
                📷
              </button>
              <input ref={fileRef} type="file" accept="image/*"
                style={{ display:"none" }} onChange={handleImageChange} />
            </div>

            {/* Drag & drop zone */}
            <div
              onClick={() => fileRef.current.click()}
              onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
              style={{ border: dragOver ? "2px dashed #5b5bd6" : "2px dashed #c7d2fe",
                borderRadius:10, padding:"12px 16px", cursor:"pointer",
                background: dragOver ? "#eef0ff" : "#fafbff",
                transition:"all .2s", marginBottom:avatar ? 10 : 14 }}>
              <div style={{ fontSize:".82rem", color:"#6b7280", lineHeight:1.6 }}>
                <span style={{ fontWeight:700, color:"#5b5bd6" }}>Click to upload</span>
                {" "}or drag & drop
                <br/>
                <span style={{ fontSize:".75rem" }}>PNG · JPG · WEBP &nbsp;·&nbsp; max 2 MB</span>
              </div>
            </div>

            {avatar && (
              <button type="button" onClick={() => setAvatar(null)}
                style={{ fontSize:".78rem", color:"#ef4444", background:"none",
                  border:"1px solid #fca5a5", borderRadius:7, padding:"4px 12px",
                  cursor:"pointer", marginBottom:14 }}>
                ✕ Remove Photo
              </button>
            )}

            {/* Name / role preview */}
            <div style={{ fontSize:"1.1rem", fontWeight:700, color:"#1e1e2e", marginTop:4 }}>
              {form.name || "Your Name"}
            </div>
            <div style={{ fontSize:".85rem", color:"#5b5bd6", fontWeight:600, marginTop:3 }}>
              {form.branch || "Branch"}{form.semester ? ` · Sem ${form.semester}` : ""}
            </div>
            {form.email && (
              <div style={{ fontSize:".8rem", color:"#9ca3af", marginTop:3 }}>{form.email}</div>
            )}
            <div style={{ display:"flex", gap:6, justifyContent:"center",
              flexWrap:"wrap", marginTop:12 }}>
              {form.branch   && <span style={S.badge}>{form.branch}</span>}
              {form.semester && <span style={S.badge}>Sem {form.semester}</span>}
              {form.rollNo   && <span style={S.badge}>#{form.rollNo}</span>}
            </div>
          </div>

          {/* ── Profile completion ──────────────────────────────────── */}
          <div style={S.card}>
            <div style={S.sectionTitle}>Profile Completion</div>

            <div style={{ display:"flex", justifyContent:"space-between",
              fontSize:".88rem", marginBottom:6 }}>
              <span style={{ fontWeight:600, color:"#374151" }}>Progress</span>
              <span style={{ fontWeight:700, color: pctColor }}>{pct}%</span>
            </div>
            <div style={{ height:10, background:"#f3f4f6", borderRadius:5,
              overflow:"hidden", marginBottom:14 }}>
              <div style={{ height:"100%", width:`${pct}%`, background: pctColor,
                borderRadius:5, transition:"width .6s ease" }} />
            </div>

            {allFields.map((f) => {
              const done = f === "avatar" ? !!avatar : !!form[f]?.trim();
              return (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8,
                  padding:"4px 0", fontSize:".82rem",
                  color: done ? "#374151" : "#c4c9d4" }}>
                  <span style={{ fontSize:10, color: done ? "#22c55e" : "#d1d5db",
                    fontWeight:900 }}>
                    {done ? "✔" : "○"}
                  </span>
                  {fieldLabels[f]}
                </div>
              );
            })}
          </div>

          {/* ── Social quick-view ───────────────────────────────────── */}
          {(form.github || form.linkedin) && (
            <div style={S.card}>
              <div style={S.sectionTitle}>Social Links</div>
              {[
                { key:"github",   icon:"🐙", label:"GitHub"   },
                { key:"linkedin", icon:"💼", label:"LinkedIn" },
              ].filter(({ key }) => form[key]).map(({ key, icon, label }) => (
                <a key={key} href={form[key]} target="_blank" rel="noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0",
                    borderBottom:"1px solid #f3f4f6", textDecoration:"none", color:"inherit" }}>
                  <div style={{ width:34, height:34, borderRadius:8, flexShrink:0,
                    background: key === "github" ? "#f3f4f6" : "#eef0ff",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>
                    {icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:".72rem", color:"#9ca3af" }}>{label}</div>
                    <div style={{ fontSize:".84rem", fontWeight:600, color:"#1e1e2e",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {form[key]}
                    </div>
                  </div>
                  <span style={{ color:"#5b5bd6", fontWeight:700, flexShrink:0 }}>→</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ════════════ RIGHT COLUMN ════════════════════════════════════ */}
        <form onSubmit={handleSave}>

          {/* ── Basic info ──────────────────────────────────────────── */}
          <div style={S.card}>
            <div style={{ display:"flex", justifyContent:"space-between",
              alignItems:"center", marginBottom:14 }}>
              <span style={{ fontSize:".78rem", fontWeight:700, color:"#9ca3af",
                textTransform:"uppercase", letterSpacing:".08em" }}>
                Basic Information
              </span>
              <button type="button"
                onClick={() => { setEditing((p) => !p); setSaved(false); }}
                style={{ fontSize:".8rem", fontWeight:700, color:"#5b5bd6",
                  background:"#eef0ff", border:"1px solid #c7d2fe",
                  borderRadius:7, padding:"5px 14px", cursor:"pointer" }}>
                {editing ? "✕ Cancel" : "✏ Edit Profile"}
              </button>
            </div>
            <div style={{ height:1, background:"#f3f4f6", marginBottom:16 }} />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div>
                <label style={S.label}>Full Name</label>
                <input style={S.input(editing)} name="name"
                  value={form.name} onChange={handleChange}
                  disabled={!editing} placeholder="Your full name" />
              </div>

              <div>
                <label style={S.label}>
                  Email <span style={S.autoTag}>(auto-filled)</span>
                </label>
                <input style={{ ...S.input(false), background:"#f3f4f6", cursor:"not-allowed" }}
                  name="email" value={form.email} disabled
                  placeholder="From your login" />
              </div>

              <div>
                <label style={S.label}>
                  Branch <span style={S.autoTag}>(auto-filled)</span>
                </label>
                <select style={S.select(editing)} name="branch"
                  value={form.branch} onChange={handleChange} disabled={!editing}>
                  <option value="">Select Branch</option>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label style={S.label}>
                  Semester <span style={S.autoTag}>(auto-filled)</span>
                </label>
                <select style={S.select(editing)} name="semester"
                  value={form.semester} onChange={handleChange} disabled={!editing}>
                  <option value="">Select Semester</option>
                  {SEMESTERS.map((s) => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>

              <div style={{ gridColumn:"1 / -1" }}>
                <label style={S.label}>Roll Number</label>
                <input style={S.input(editing)} name="rollNo"
                  value={form.rollNo} onChange={handleChange}
                  disabled={!editing} placeholder="e.g. 22ECE101" />
              </div>
            </div>
          </div>

          {/* ── Bio ─────────────────────────────────────────────────── */}
          <div style={S.card}>
            <div style={S.sectionTitle}>About Me</div>
            <label style={S.label}>Bio</label>
            <textarea
              name="bio" value={form.bio} onChange={handleChange}
              disabled={!editing} maxLength={250}
              placeholder={editing
                ? "Write a short intro about yourself..."
                : "Click Edit Profile to add a bio"}
              style={{ ...S.input(editing), minHeight:90, lineHeight:1.6 }} />
            <div style={{ fontSize:".75rem", color:"#9ca3af", textAlign:"right", marginTop:4 }}>
              {form.bio.length}/250
            </div>
          </div>

          {/* ── Social links ────────────────────────────────────────── */}
          <div style={S.card}>
            <div style={S.sectionTitle}>Social Links</div>

            <div style={{ marginBottom:14 }}>
              <label style={S.label}>GitHub Profile URL</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%",
                  transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>
                  🐙
                </span>
                <input style={{ ...S.input(editing), paddingLeft:36 }}
                  name="github" value={form.github} onChange={handleChange}
                  disabled={!editing} placeholder="https://github.com/username" />
              </div>
            </div>

            <div>
              <label style={S.label}>LinkedIn Profile URL</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%",
                  transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>
                  💼
                </span>
                <input style={{ ...S.input(editing), paddingLeft:36 }}
                  name="linkedin" value={form.linkedin} onChange={handleChange}
                  disabled={!editing} placeholder="https://linkedin.com/in/username" />
              </div>
            </div>
          </div>

          {/* ── Save button ─────────────────────────────────────────── */}
          {editing && (
            <button type="submit" disabled={loading}
              style={{ width:"100%", padding:"12px",
                background: loading ? "#818cf8" : "#5b5bd6",
                color:"#fff", border:"none", borderRadius:11,
                fontSize:".95rem", fontWeight:700,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing:".02em", transition:"background .2s",
                marginBottom:12 }}>
              {loading ? "Saving..." : "Save Changes →"}
            </button>
          )}

          {/* ── Success banner ──────────────────────────────────────── */}
          {saved && (
            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0",
              borderRadius:11, padding:"14px 18px", display:"flex",
              alignItems:"center", gap:12 }}>
              <span style={{ fontSize:20 }}>✅</span>
              <div>
                <div style={{ fontSize:".88rem", fontWeight:700, color:"#15803d" }}>
                  Profile updated successfully!
                </div>
                <div style={{ fontSize:".8rem", color:"#166534", marginTop:2 }}>
                  Your changes have been saved.
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}