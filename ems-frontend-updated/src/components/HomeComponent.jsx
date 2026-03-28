import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeComponent = () => {

  const navigator = useNavigate();

  function goToEmployees(){
    navigator('/employees')
  }

  function goToDepartments(){
    navigator('/departments')
  }

  function goToDashboard(){
    navigator('/dashboard')
  }

  const heroStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '60px 20px',
    color: 'white',
    marginBottom: '50px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    textAlign: 'center'
  }

  const heroTitleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  }

  const heroSubtitleStyle = {
    fontSize: '1.3rem',
    opacity: 0.95,
    marginBottom: '5px'
  }

  const containerStyle = {
    minHeight: '100vh',
    paddingTop: '40px',
    paddingBottom: '40px',
    background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)'
  }

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '50px',
    marginBottom: '50px'
  }

  const cardStyle = {
    background: 'white',
    borderRadius: '15px',
    padding: '40px 30px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '2px solid transparent',
    position: 'relative',
    overflow: 'hidden'
  }

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
    borderColor: '#667eea'
  }

  const iconStyle = {
    fontSize: '4rem',
    marginBottom: '20px',
    display: 'block'
  }

  const cardTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333'
  }

  const cardDescriptionStyle = {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '25px',
    lineHeight: '1.6'
  }

  const buttonStyle = {
    padding: '12px 35px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    marginTop: '10px'
  }

  const employeeButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  }

  const departmentButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white'
  }

  const [hovered, setHovered] = React.useState(null)

  return (
    <div style={containerStyle}>
      <div className='container'>
        {/* Hero Section */}
        <div style={heroStyle}>
          <h1 style={heroTitleStyle}>
            <span style={{ fontSize: '3rem' }}>👥</span>
            <br />
            Employee Management System
          </h1>
          <p style={heroSubtitleStyle}>
            Streamline your workforce management with our comprehensive solution
          </p>
          <p style={{ opacity: 0.8, marginTop: '10px', fontSize: '0.95rem' }}>
            Efficiently manage employees, departments, and organizational structure
          </p>
        </div>

        {/* Stats Section */}
        <div style={cardContainerStyle}>
          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '15px', 
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' }}>📊</div>
            <div style={{ fontSize: '1.5rem', color: '#333', marginTop: '10px' }}>Complete Dashboard</div>
            <p style={{ color: '#666', marginTop: '10px' }}>View all your organizational data at a glance</p>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '15px', 
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f5576c' }}>⚡</div>
            <div style={{ fontSize: '1.5rem', color: '#333', marginTop: '10px' }}>Quick Management</div>
            <p style={{ color: '#666', marginTop: '10px' }}>Fast and intuitive management tools</p>
          </div>
          <div style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '15px', 
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>🔒</div>
            <div style={{ fontSize: '1.5rem', color: '#333', marginTop: '10px' }}>Secure & Reliable</div>
            <p style={{ color: '#666', marginTop: '10px' }}>Your data is safe and protected</p>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div style={cardContainerStyle}>
          {/* Employees Card */}
          <div 
            style={{
              ...cardStyle,
              ...(hovered === 'employees' ? cardHoverStyle : {})
            }}
            onMouseEnter={() => setHovered('employees')}
            onMouseLeave={() => setHovered(null)}
            onClick={goToEmployees}
          >
            <span style={{ ...iconStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              👨‍💼
            </span>
            <h2 style={cardTitleStyle}>Manage Employees</h2>
            <p style={cardDescriptionStyle}>
              View, add, edit, and manage all employee information. Keep track of employee details, contact information, and departmental assignments.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '25px' }}>
              ✓ Add new employees<br/>
              ✓ Update employee details<br/>
              ✓ View complete employee list
            </p>
            <button 
              style={employeeButtonStyle}
              onClick={goToEmployees}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              View All Employees →
            </button>
          </div>

          {/* Departments Card */}
          <div 
            style={{
              ...cardStyle,
              ...(hovered === 'departments' ? cardHoverStyle : {})
            }}
            onMouseEnter={() => setHovered('departments')}
            onMouseLeave={() => setHovered(null)}
            onClick={goToDepartments}
          >
            <span style={{ ...iconStyle, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              🏢
            </span>
            <h2 style={cardTitleStyle}>Manage Departments</h2>
            <p style={cardDescriptionStyle}>
              Organize your company structure by departments. Create, view, and manage departments to organize your workforce efficiently.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '25px' }}>
              ✓ Create departments<br/>
              ✓ Update department info<br/>
              ✓ View all departments
            </p>
            <button 
              style={departmentButtonStyle}
              onClick={goToDepartments}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              View All Departments →
            </button>
          </div>

          {/* Dashboard Card */}
          <div 
            style={{
              ...cardStyle,
              ...(hovered === 'dashboard' ? cardHoverStyle : {})
            }}
            onMouseEnter={() => setHovered('dashboard')}
            onMouseLeave={() => setHovered(null)}
            onClick={goToDashboard}
          >
            <span style={{ ...iconStyle, background: 'linear-gradient(135deg, #22c55e 0%, #0ea5e9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              📊
            </span>
            <h2 style={cardTitleStyle}>View Dashboard</h2>
            <p style={cardDescriptionStyle}>
              Check employee and department metrics in one centralized view. Use the dashboard for a quick organizational snapshot.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '25px' }}>
              ✓ KPI overview<br/>
              ✓ Real-time counts<br/>
              ✓ Clean visual summary
            </p>
            <button 
              style={employeeButtonStyle}
              onClick={goToDashboard}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Open Dashboard →
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '50px 30px',
          marginTop: '50px',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '40px', color: '#333' }}>
            Why Choose Our System?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🎯</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>User-Friendly Interface</h3>
              <p style={{ color: '#666' }}>Intuitive design for easy navigation and management</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📈</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Real-time Updates</h3>
              <p style={{ color: '#666' }}>Instantly update and sync employee and department data</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚀</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Fast Performance</h3>
              <p style={{ color: '#666' }}>Lightning-fast loading and processing of data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent