import React, { useState } from 'react';

export default function Grades() {
    const [courses] = useState([
        { id: 1, name: "Advanced Mathematics", grade: "A", percentage: 95, teacher: "Ms. Johnson", credits: 3 },
        { id: 2, name: "English Literature", grade: "A-", percentage: 90, teacher: "Mr. Smith", credits: 3 },
        { id: 3, name: "Computer Science", grade: "A+", percentage: 98, teacher: "Dr. Chen", credits: 4 },
        { id: 4, name: "Physics", grade: "B+", percentage: 87, teacher: "Ms. Rodriguez", credits: 4 },
        { id: 5, name: "World History", grade: "A", percentage: 93, teacher: "Mr. Williams", credits: 3 },
    ]);

    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return '#10b981';
        if (grade.startsWith('B')) return '#3b82f6';
        if (grade.startsWith('C')) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="nova-container">
            <h1 className="nova-title">Grades</h1>
            <p className="nova-desc">View your current grades and academic performance across all courses.</p>

            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {courses.map(course => (
                    <div key={course.id} className="nova-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--text)", marginBottom: "0.5rem" }}>
                                {course.name}
                            </h3>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                {course.teacher} • {course.credits} Credits
                            </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Percentage</div>
                                <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--primary)" }}>{course.percentage}%</div>
                            </div>
                            <div style={{
                                fontSize: "2rem",
                                fontWeight: "800",
                                color: getGradeColor(course.grade),
                                padding: "0.5rem 1.5rem",
                                background: `${getGradeColor(course.grade)}15`,
                                borderRadius: "var(--radius-sm)",
                                border: `2px solid ${getGradeColor(course.grade)}40`
                            }}>
                                {course.grade}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="nova-card" style={{ marginTop: "2rem", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)", borderColor: "#a5b4fc" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>Overall Statistics</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" }}>
                    <div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Current GPA</div>
                        <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary)" }}>3.8</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Total Credits</div>
                        <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary)" }}>17</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Average Grade</div>
                        <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--success)" }}>92.6%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
