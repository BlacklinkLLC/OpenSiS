import React from 'react';

export default function Dashboard() {
    return (
        <div className="nova-container">
            <h1 className="nova-title">Dashboard</h1>
            <p className="nova-desc">Student overview and quick stats.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
                <div className="nova-card" style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)", borderColor: "#a5b4fc" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📚</div>
                    <div style={{ fontWeight: "600", color: "var(--text)" }}>Courses</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#6366f1", marginTop: "0.5rem" }}>5</div>
                </div>
                <div className="nova-card" style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)", borderColor: "#a5b4fc" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⭐</div>
                    <div style={{ fontWeight: "600", color: "var(--text)" }}>GPA</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#6366f1", marginTop: "0.5rem" }}>3.8</div>
                </div>
                <div className="nova-card" style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)", borderColor: "#a5b4fc" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✓</div>
                    <div style={{ fontWeight: "600", color: "var(--text)" }}>Attendance</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#6366f1", marginTop: "0.5rem" }}>98%</div>
                </div>
            </div>
        </div>
    );
}