import React, { useState } from 'react';

export default function Schedule() {
    const [schedule] = useState([
        { period: 1, time: "8:00 - 8:50", course: "Advanced Mathematics", room: "B-204", teacher: "Ms. Johnson" },
        { period: 2, time: "9:00 - 9:50", course: "English Literature", room: "A-115", teacher: "Mr. Smith" },
        { period: 3, time: "10:00 - 10:50", course: "Computer Science", room: "C-301", teacher: "Dr. Chen" },
        { period: "Lunch", time: "11:00 - 11:45", course: "Lunch Break", room: "Cafeteria", teacher: "" },
        { period: 4, time: "12:00 - 12:50", course: "Physics", room: "B-108", teacher: "Ms. Rodriguez" },
        { period: 5, time: "1:00 - 1:50", course: "World History", room: "A-220", teacher: "Mr. Williams" },
    ]);

    const getCurrentPeriod = () => {
        return 3;
    };

    const currentPeriod = getCurrentPeriod();

    return (
        <div className="nova-container">
            <h1 className="nova-title">Schedule</h1>
            <p className="nova-desc">Your daily class schedule and room assignments.</p>

            <div className="nova-card" style={{ marginTop: "2rem", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)", borderColor: "#a5b4fc" }}>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Currently In</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--primary)" }}>
                    Period {currentPeriod} • Computer Science
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                    C-301 with Dr. Chen
                </div>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {schedule.map((item, idx) => (
                    <div
                        key={idx}
                        className="nova-card"
                        style={{
                            borderLeft: item.period === currentPeriod ? "4px solid var(--primary)" : "4px solid transparent",
                            background: item.period === currentPeriod ? "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.03) 100%)" : "var(--card-bg)"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                <div style={{
                                    textAlign: "center",
                                    minWidth: "60px"
                                }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                                        {item.period === "Lunch" ? "🍽️" : `Period ${item.period}`}
                                    </div>
                                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                                        {item.time}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--text)", marginBottom: "0.25rem" }}>
                                        {item.course}
                                    </div>
                                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                                        {item.room} {item.teacher && `• ${item.teacher}`}
                                    </div>
                                </div>
                            </div>
                            {item.period === currentPeriod && (
                                <div style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color: "var(--primary)",
                                    padding: "0.375rem 0.875rem",
                                    background: "rgba(99, 102, 241, 0.15)",
                                    borderRadius: "var(--radius-sm)",
                                    border: "2px solid var(--primary-light)"
                                }}>
                                    CURRENT
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}