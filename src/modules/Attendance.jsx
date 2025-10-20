// modules/Attendance.jsx
import React, { useState } from 'react';

export default function Attendance() {
  const [viewMode, setViewMode] = useState('overview');
  const [filterType, setFilterType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('October 2024');

  const [attendanceData] = useState([
    {
      date: '2024-10-14',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-10-11',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-10-10',
      status: 'Tardy',
      period: 'Period 2',
      excused: true,
      minutesLate: 8,
      reason: 'Bus delay',
      course: 'English Literature',
      reportedBy: 'Mr. Smith',
    },
    {
      date: '2024-10-09',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-10-08',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-10-07',
      status: 'Absent',
      period: 'All Day',
      excused: true,
      reason: "Sick - Doctor's note on file",
      course: null,
      reportedBy: "Nurse's Office",
      parentContact: 'Parent called 10/06 8:45 AM',
    },
    {
      date: '2024-10-04',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-10-03',
      status: 'Tardy',
      period: 'Period 4',
      excused: false,
      minutesLate: 15,
      reason: 'Left class without permission',
      course: 'Physics',
      reportedBy: 'Ms. Rodriguez',
    },
    {
      date: '2024-10-02',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-09-30',
      status: 'Absent',
      period: 'Period 3',
      excused: false,
      reason: 'Skipped class',
      course: 'Computer Science',
      reportedBy: 'Dr. Chen',
      parentContact: 'Parent notified via email',
    },
    {
      date: '2024-09-27',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-09-26',
      status: 'Tardy',
      period: 'Period 1',
      excused: true,
      minutesLate: 5,
      reason: 'Medical appointment ran late',
      course: 'Advanced Mathematics',
      reportedBy: 'Ms. Johnson',
    },
    {
      date: '2024-09-25',
      status: 'Present',
      period: 'All Day',
      excused: null,
      minutesLate: 0,
      course: null,
    },
    {
      date: '2024-09-23',
      status: 'Absent',
      period: 'All Day',
      excused: true,
      reason: 'Family emergency',
      course: null,
      reportedBy: 'Main Office',
      parentContact: 'Parent called 09/22 5:30 PM',
    },
  ]);

  const stats = {
    totalDays: 98,
    present: 92,
    tardy: 3,
    tardyExcused: 2,
    tardyUnexcused: 1,
    absent: 3,
    absentExcused: 2,
    absentUnexcused: 1,
    attendanceRate: 93.9,
    perfectMonths: 2,
    consecutivePresent: 5,
    totalMinutesLate: 28,
    impactedClasses: 4,
  };

  const getStatusColor = (status, excused) => {
    if (status === 'Present') return '#10b981';
    if (status === 'Tardy') return excused ? '#f59e0b' : '#dc2626';
    if (status === 'Absent') return excused ? '#8b5cf6' : '#dc2626';
    return '#64748b';
  };

  const getStatusIcon = (status, excused) => {
    if (status === 'Present') return '✓';
    if (status === 'Tardy') return excused ? '⏱' : '⚠';
    if (status === 'Absent') return excused ? '📋' : '✗';
    return '?';
  };

  const getStatusLabel = (status, excused) => {
    if (status === 'Present') return 'Present';
    if (status === 'Tardy') return excused ? 'Tardy (Excused)' : 'Tardy (Unexcused)';
    if (status === 'Absent') return excused ? 'Absent (Excused)' : 'Absent (Unexcused)';
    return status;
  };

  const filteredData = attendanceData.filter(record => {
    if (filterType === 'all') return true;
    return record.status.toLowerCase() === filterType;
  });

  const getCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const dateStr = `2024-10-${String(i).padStart(2, '0')}`;
      const record = attendanceData.find(r => r.date === dateStr);
      days.push({ day: i, record });
    }
    return days;
  };

  return (
    <div className="nova-container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 className="nova-title">Attendance</h1>
          <p className="nova-desc">Comprehensive attendance tracking and insights.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setViewMode('overview')}
            style={{
              padding: '0.625rem 1.25rem',
              background:
                viewMode === 'overview'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'var(--bg-secondary)',
              color: viewMode === 'overview' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('history')}
            style={{
              padding: '0.625rem 1.25rem',
              background:
                viewMode === 'history'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'var(--bg-secondary)',
              color: viewMode === 'history' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            History
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            style={{
              padding: '0.625rem 1.25rem',
              background:
                viewMode === 'calendar'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'var(--bg-secondary)',
              color: viewMode === 'calendar' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Calendar
          </button>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div
              className="nova-card"
              style={{
                background:
                  'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                borderColor: '#6ee7b7',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
              <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '0.25rem' }}>
                Present Days
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>
                  {stats.present}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  of {stats.totalDays}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {stats.consecutivePresent} consecutive days
              </div>
            </div>

            <div
              className="nova-card"
              style={{
                background:
                  'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                borderColor: '#fcd34d',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱</div>
              <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '0.25rem' }}>
                Tardy Instances
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>
                  {stats.tardy}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>total</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {stats.tardyExcused} excused • {stats.tardyUnexcused} unexcused
              </div>
            </div>

            <div
              className="nova-card"
              style={{
                background:
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                borderColor: '#c4b5fd',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '0.25rem' }}>
                Absent Days
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6' }}>
                  {stats.absent}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>total</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {stats.absentExcused} excused • {stats.absentUnexcused} unexcused
              </div>
            </div>

            <div
              className="nova-card"
              style={{
                background:
                  'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                borderColor: '#a5b4fc',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '0.25rem' }}>
                Attendance Rate
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#6366f1' }}>
                  {stats.attendanceRate}%
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {stats.perfectMonths} perfect months this year
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div className="nova-card">
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'var(--text)',
                }}
              >
                📈 Attendance Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Present</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '120px',
                        height: '8px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${(stats.present / stats.totalDays) * 100}%`,
                          height: '100%',
                          background: '#10b981',
                          borderRadius: '4px',
                        }}
                      ></div>
                    </div>
                    <span style={{ fontWeight: '700', color: '#10b981', minWidth: '45px' }}>
                      {stats.present}
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Tardy</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '120px',
                        height: '8px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${(stats.tardy / stats.totalDays) * 100}%`,
                          height: '100%',
                          background: '#f59e0b',
                          borderRadius: '4px',
                        }}
                      ></div>
                    </div>
                    <span style={{ fontWeight: '700', color: '#f59e0b', minWidth: '45px' }}>
                      {stats.tardy}
                    </span>
                  </div>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Absent</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '120px',
                        height: '8px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${(stats.absent / stats.totalDays) * 100}%`,
                          height: '100%',
                          background: '#8b5cf6',
                          borderRadius: '4px',
                        }}
                      ></div>
                    </div>
                    <span style={{ fontWeight: '700', color: '#8b5cf6', minWidth: '45px' }}>
                      {stats.absent}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="nova-card">
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'var(--text)',
                }}
              >
                ⚠️ Important Metrics
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Total Minutes Late
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>
                    {stats.totalMinutesLate} mins
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Classes Impacted
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>
                    {stats.impactedClasses} courses
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Unexcused Incidents
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color:
                        stats.tardyUnexcused + stats.absentUnexcused > 0 ? '#dc2626' : '#10b981',
                    }}
                  >
                    {stats.tardyUnexcused + stats.absentUnexcused}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="nova-section">Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {attendanceData.slice(0, 5).map((record, idx) => (
              <div
                key={idx}
                className="nova-card"
                style={{
                  borderLeft: `4px solid ${getStatusColor(record.status, record.excused)}`,
                  background:
                    record.status !== 'Present'
                      ? `${getStatusColor(record.status, record.excused)}08`
                      : 'var(--card-bg)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flex: 1 }}
                  >
                    <div
                      style={{
                        fontSize: '1.5rem',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${getStatusColor(record.status, record.excused)}15`,
                        color: getStatusColor(record.status, record.excused),
                        border: `2px solid ${getStatusColor(record.status, record.excused)}40`,
                        flexShrink: 0,
                      }}
                    >
                      {getStatusIcon(record.status, record.excused)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <div
                          style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text)' }}
                        >
                          {record.date}
                        </div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '0.25rem 0.75rem',
                            background: `${getStatusColor(record.status, record.excused)}20`,
                            color: getStatusColor(record.status, record.excused),
                            borderRadius: '6px',
                          }}
                        >
                          {getStatusLabel(record.status, record.excused)}
                        </div>
                      </div>
                      <div
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {record.period} {record.course && `• ${record.course}`}
                      </div>
                      {record.reason && (
                        <div
                          style={{
                            color: 'var(--text)',
                            fontSize: '0.9rem',
                            marginTop: '0.5rem',
                            padding: '0.5rem',
                            background: 'var(--bg-secondary)',
                            borderRadius: '6px',
                          }}
                        >
                          <strong>Reason:</strong> {record.reason}
                        </div>
                      )}
                      {record.minutesLate > 0 && (
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginTop: '0.5rem',
                          }}
                        >
                          ⏱ {record.minutesLate} minutes late
                        </div>
                      )}
                      {record.reportedBy && (
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginTop: '0.25rem',
                          }}
                        >
                          Reported by: {record.reportedBy}
                        </div>
                      )}
                      {record.parentContact && (
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginTop: '0.25rem',
                            fontStyle: 'italic',
                          }}
                        >
                          📞 {record.parentContact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewMode === 'history' && (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['all', 'present', 'tardy', 'absent'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '0.5rem 1rem',
                  background: filterType === type ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: filterType === type ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'var(--transition)',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredData.map((record, idx) => (
              <div
                key={idx}
                className="nova-card"
                style={{
                  borderLeft: `4px solid ${getStatusColor(record.status, record.excused)}`,
                  background:
                    record.status !== 'Present'
                      ? `${getStatusColor(record.status, record.excused)}08`
                      : 'var(--card-bg)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flex: 1 }}
                  >
                    <div
                      style={{
                        fontSize: '1.5rem',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${getStatusColor(record.status, record.excused)}15`,
                        color: getStatusColor(record.status, record.excused),
                        border: `2px solid ${getStatusColor(record.status, record.excused)}40`,
                        flexShrink: 0,
                      }}
                    >
                      {getStatusIcon(record.status, record.excused)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '0.5rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div
                          style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text)' }}
                        >
                          {record.date}
                        </div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '0.25rem 0.75rem',
                            background: `${getStatusColor(record.status, record.excused)}20`,
                            color: getStatusColor(record.status, record.excused),
                            borderRadius: '6px',
                          }}
                        >
                          {getStatusLabel(record.status, record.excused)}
                        </div>
                      </div>
                      <div
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {record.period} {record.course && `• ${record.course}`}
                      </div>
                      {record.reason && (
                        <div
                          style={{
                            color: 'var(--text)',
                            fontSize: '0.9rem',
                            marginTop: '0.5rem',
                            padding: '0.5rem',
                            background: 'var(--bg-secondary)',
                            borderRadius: '6px',
                          }}
                        >
                          <strong>Reason:</strong> {record.reason}
                        </div>
                      )}
                      {record.minutesLate > 0 && (
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginTop: '0.5rem',
                          }}
                        >
                          ⏱ {record.minutesLate} minutes late
                        </div>
                      )}
                      {record.reportedBy && (
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginTop: '0.25rem',
                          }}
                        >
                          Reported by: {record.reportedBy}
                        </div>
                      )}
                      {record.parentContact && (
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginTop: '0.25rem',
                            fontStyle: 'italic',
                          }}
                        >
                          📞 {record.parentContact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewMode === 'calendar' && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              style={{
                padding: '0.75rem 1.25rem',
                background: 'var(--card-bg)',
                border: '2px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text)',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              <option>October 2024</option>
              <option>September 2024</option>
              <option>August 2024</option>
            </select>
          </div>

          <div className="nova-card">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div
                  key={day}
                  style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    color: 'var(--text-secondary)',
                    padding: '1rem',
                    fontSize: '0.85rem',
                  }}
                >
                  {day}
                </div>
              ))}

              {[...Array(2)].map((_, idx) => (
                <div key={`empty-${idx}`} style={{ padding: '1rem' }}></div>
              ))}

              {getCalendarDays().map(({ day, record }) => {
                const hasRecord = record && record.status !== 'Present';
                return (
                  <div
                    key={day}
                    style={{
                      padding: '1rem',
                      textAlign: 'center',
                      background: hasRecord
                        ? `${getStatusColor(record.status, record.excused)}15`
                        : 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      border: hasRecord
                        ? `2px solid ${getStatusColor(record.status, record.excused)}40`
                        : '2px solid transparent',
                      cursor: hasRecord ? 'pointer' : 'default',
                      transition: 'var(--transition)',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      if (hasRecord) e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      if (hasRecord) e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div
                      style={{
                        fontWeight: '700',
                        color: hasRecord
                          ? getStatusColor(record.status, record.excused)
                          : 'var(--text)',
                        marginBottom: hasRecord ? '0.25rem' : '0',
                      }}
                    >
                      {day}
                    </div>
                    {hasRecord && (
                      <div
                        style={{
                          fontSize: '1.25rem',
                          color: getStatusColor(record.status, record.excused),
                        }}
                      >
                        {getStatusIcon(record.status, record.excused)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '2rem' }} className="nova-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>
              Calendar Legend
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    background: '#10b98115',
                    border: '2px solid #10b98140',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    fontSize: '1.25rem',
                  }}
                >
                  ✓
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Present (No marker)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    background: '#f59e0b15',
                    border: '2px solid #f59e0b40',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b',
                    fontSize: '1.25rem',
                  }}
                >
                  ⏱
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Tardy (Excused)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    background: '#dc262615',
                    border: '2px solid #dc262640',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#dc2626',
                    fontSize: '1.25rem',
                  }}
                >
                  ⚠
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Tardy (Unexcused)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    background: '#8b5cf615',
                    border: '2px solid #8b5cf640',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b5cf6',
                    fontSize: '1.25rem',
                  }}
                >
                  📋
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Absent (Excused)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    background: '#dc262615',
                    border: '2px solid #dc262640',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#dc2626',
                    fontSize: '1.25rem',
                  }}
                >
                  ✗
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Absent (Unexcused)
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {(stats.absentUnexcused > 0 || stats.tardyUnexcused > 2) && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background:
              'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
            border: '2px solid rgba(220, 38, 38, 0.3)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>⚠️</div>
            <div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#dc2626',
                  marginBottom: '0.5rem',
                }}
              >
                Attendance Alert
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                You have {stats.absentUnexcused + stats.tardyUnexcused} unexcused incident(s) this
                semester. Excessive unexcused absences may impact your academic standing. Please
                contact your counselor if you need assistance with attendance issues.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
