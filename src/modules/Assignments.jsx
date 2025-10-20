import React, { useState } from 'react';

export default function Assignments() {
  const [assignments] = useState([
    {
      id: 1,
      title: 'Calculus Problem Set #8',
      course: 'Advanced Mathematics',
      dueDate: '2024-10-18',
      status: 'pending',
      points: 100,
    },
    {
      id: 2,
      title: 'Literary Analysis Essay',
      course: 'English Literature',
      dueDate: '2024-10-20',
      status: 'in-progress',
      points: 150,
    },
    {
      id: 3,
      title: 'Binary Search Tree Implementation',
      course: 'Computer Science',
      dueDate: '2024-10-16',
      status: 'submitted',
      points: 200,
      score: 198,
    },
    {
      id: 4,
      title: 'Lab Report: Projectile Motion',
      course: 'Physics',
      dueDate: '2024-10-22',
      status: 'pending',
      points: 100,
    },
    {
      id: 5,
      title: 'WWI Causes Analysis',
      course: 'World History',
      dueDate: '2024-10-17',
      status: 'graded',
      points: 75,
      score: 72,
    },
  ]);

  const getStatusInfo = status => {
    const statusMap = {
      pending: { color: '#94a3b8', icon: '○', label: 'Not Started' },
      'in-progress': { color: '#3b82f6', icon: '◐', label: 'In Progress' },
      submitted: { color: '#f59e0b', icon: '◑', label: 'Submitted' },
      graded: { color: '#10b981', icon: '●', label: 'Graded' },
    };
    return statusMap[status] || statusMap['pending'];
  };

  const getDaysUntilDue = dueDate => {
    const due = new Date(dueDate);
    const today = new Date('2024-10-14');
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <div className="nova-container">
      <h1 className="nova-title">Assignments</h1>
      <p className="nova-desc">Manage your coursework and track assignment deadlines.</p>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {assignments.map(assignment => {
          const statusInfo = getStatusInfo(assignment.status);
          const daysInfo = getDaysUntilDue(assignment.dueDate);

          return (
            <div key={assignment.id} className="nova-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', color: statusInfo.color }}>
                      {statusInfo.icon}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)' }}>
                      {assignment.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      marginLeft: '2.25rem',
                    }}
                  >
                    {assignment.course}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: statusInfo.color,
                      padding: '0.375rem 0.875rem',
                      background: `${statusInfo.color}15`,
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {statusInfo.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{daysInfo}</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Due: <strong>{assignment.dueDate}</strong>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {assignment.score !== undefined ? (
                    <span style={{ color: 'var(--success)', fontWeight: '700' }}>
                      {assignment.score}/{assignment.points} pts
                    </span>
                  ) : (
                    <span>{assignment.points} pts</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
