import React, { useEffect, useState } from 'react'
import { dashboard } from '../services/DashboardService'

const DashboardComponent = () => {
  const [stats, setStats] = useState({ totalEmployees: 0, totalDepartments: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
  setLoading(true);

  dashboard()
    .then(response => {
      const payload = response.data || {};

      setStats({
        totalEmployees: payload.employeeCount ?? 0,
        totalDepartments: payload.departmentCount ?? 0
      });
    })
    .catch(err => {
      console.error(err);
      setError('Unable to load dashboard data');
    })
    .finally(() => setLoading(false));

  }, []);

  const pageStyle = {
    minHeight: 'calc(100vh - 80px)',
    paddingTop: '60px',
    paddingBottom: '50px',
    background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)'
  }

  const headerStyle = {
    marginBottom: '30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '25px 20px',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(102, 118, 234, 0.18)'
  }

  const gridStyle = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
  }

  const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
    border: '1px solid rgba(148, 163, 184, 0.16)'
  }

  const titleStyle = {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#334155',
    marginBottom: '12px'
  }

  const valueStyle = {
    fontSize: '3.4rem',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 1
  }

  const captionStyle = {
    marginTop: '16px',
    color: '#64748b',
    lineHeight: 1.75
  }

  const metricRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return (
    <div style={pageStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: '2.6rem', fontWeight: 800, color: 'white' }}>
            Dashboard Overview
          </h1>
          <p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,0.85)', maxWidth: '720px', fontSize: '1rem' }}>
            A clean summary of your organization’s employee and department counts.
          </p>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={metricRow}>
              <div>
                <div style={titleStyle}>Total Employees</div>
                <div style={valueStyle}>{loading ? '—' : stats.totalEmployees}</div>
              </div>
              <div style={{ fontSize: '2.2rem' }}>👥</div>
            </div>
            <div style={captionStyle}>
              Total number of employees currently tracked in the system.
            </div>
          </div>

          <div style={cardStyle}>
            <div style={metricRow}>
              <div>
                <div style={titleStyle}>Total Departments</div>
                <div style={valueStyle}>{loading ? '—' : stats.totalDepartments}</div>
              </div>
              <div style={{ fontSize: '2.2rem' }}>🏢</div>
            </div>
            <div style={captionStyle}>
              Number of departments available in the organization.
            </div>
          </div>

          <div style={cardStyle}>
            <div style={metricRow}>
              <div>
                <div style={titleStyle}>Status</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1d4ed8' }}>
                  {loading ? 'Loading…' : error ? 'Error' : 'Fresh'}
                </div>
              </div>
              <div style={{ fontSize: '2.2rem' }}>📈</div>
            </div>
            <div style={captionStyle}>
              {loading
                ? 'Dashboard data is on its way.'
                : error
                ? 'There was a problem loading metrics.'
                : 'Current system statistics.'}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: '24px', color: '#b91c1c', fontWeight: 600 }}>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardComponent