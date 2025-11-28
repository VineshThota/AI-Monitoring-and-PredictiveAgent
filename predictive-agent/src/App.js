import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [equipmentData, setEquipmentData] = useState([
    {
      id: 1,
      name: 'Conveyor Belt A1',
      status: 'operational',
      temperature: 72,
      vibration: 0.3,
      predictedFailure: 15,
      lastMaintenance: '2024-11-15',
      aiAgentRecommendation: 'Schedule lubrication in 10 days'
    },
    {
      id: 2,
      name: 'Compressor Unit B2',
      status: 'warning',
      temperature: 95,
      vibration: 0.8,
      predictedFailure: 3,
      lastMaintenance: '2024-10-20',
      aiAgentRecommendation: 'Immediate inspection required - high vibration detected'
    },
    {
      id: 3,
      name: 'Hydraulic Press C3',
      status: 'critical',
      temperature: 110,
      vibration: 1.2,
      predictedFailure: 1,
      lastMaintenance: '2024-09-30',
      aiAgentRecommendation: 'URGENT: Schedule maintenance within 24 hours'
    }
  ]);

  const [aiAgents, setAiAgents] = useState([
    {
      id: 1,
      name: 'Thermal Monitor Agent',
      status: 'active',
      tasksCompleted: 1247,
      accuracy: 94.2,
      specialty: 'Temperature anomaly detection'
    },
    {
      id: 2,
      name: 'Vibration Analysis Agent',
      status: 'active',
      tasksCompleted: 892,
      accuracy: 91.8,
      specialty: 'Mechanical wear prediction'
    },
    {
      id: 3,
      name: 'Maintenance Scheduler Agent',
      status: 'active',
      tasksCompleted: 456,
      accuracy: 96.5,
      specialty: 'Optimal maintenance timing'
    }
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      timestamp: '2024-11-29 08:30',
      severity: 'high',
      message: 'Compressor Unit B2: Vibration levels exceeding normal range',
      agent: 'Vibration Analysis Agent'
    },
    {
      id: 2,
      timestamp: '2024-11-29 07:15',
      severity: 'critical',
      message: 'Hydraulic Press C3: Temperature spike detected - immediate attention required',
      agent: 'Thermal Monitor Agent'
    }
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setEquipmentData(prevData => 
        prevData.map(equipment => ({
          ...equipment,
          temperature: equipment.temperature + (Math.random() - 0.5) * 2,
          vibration: Math.max(0, equipment.vibration + (Math.random() - 0.5) * 0.1)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#FF5722';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🤖 PredictiveAgent - AI-Powered Industrial Monitoring</h1>
        <p>Intelligent equipment monitoring with AI agents for predictive maintenance</p>
      </header>

      <div className="dashboard">
        {/* Equipment Monitoring Section */}
        <section className="equipment-section">
          <h2>📊 Equipment Status Dashboard</h2>
          <div className="equipment-grid">
            {equipmentData.map(equipment => (
              <div key={equipment.id} className="equipment-card">
                <div className="equipment-header">
                  <h3>{equipment.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(equipment.status) }}
                  >
                    {equipment.status.toUpperCase()}
                  </span>
                </div>
                <div className="equipment-metrics">
                  <div className="metric">
                    <span className="metric-label">Temperature:</span>
                    <span className="metric-value">{equipment.temperature.toFixed(1)}°F</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Vibration:</span>
                    <span className="metric-value">{equipment.vibration.toFixed(2)} mm/s</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Failure Prediction:</span>
                    <span className="metric-value">{equipment.predictedFailure} days</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Last Maintenance:</span>
                    <span className="metric-value">{equipment.lastMaintenance}</span>
                  </div>
                </div>
                <div className="ai-recommendation">
                  <strong>🤖 AI Recommendation:</strong>
                  <p>{equipment.aiAgentRecommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Agents Section */}
        <section className="agents-section">
          <h2>🤖 AI Agents Status</h2>
          <div className="agents-grid">
            {aiAgents.map(agent => (
              <div key={agent.id} className="agent-card">
                <div className="agent-header">
                  <h3>{agent.name}</h3>
                  <span className="agent-status active">ACTIVE</span>
                </div>
                <div className="agent-stats">
                  <div className="stat">
                    <span className="stat-label">Tasks Completed:</span>
                    <span className="stat-value">{agent.tasksCompleted.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Accuracy:</span>
                    <span className="stat-value">{agent.accuracy}%</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Specialty:</span>
                    <span className="stat-value">{agent.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alerts Section */}
        <section className="alerts-section">
          <h2>🚨 Real-time Alerts</h2>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <div className="alert-header">
                  <span 
                    className="alert-severity"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="alert-timestamp">{alert.timestamp}</span>
                </div>
                <div className="alert-message">{alert.message}</div>
                <div className="alert-agent">Generated by: {alert.agent}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics Section */}
        <section className="analytics-section">
          <h2>📈 Predictive Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Downtime Prevention</h3>
              <div className="analytics-metric">
                <span className="metric-number">87%</span>
                <span className="metric-description">Reduction in unplanned downtime</span>
              </div>
            </div>
            <div className="analytics-card">
              <h3>Cost Savings</h3>
              <div className="analytics-metric">
                <span className="metric-number">$2.4M</span>
                <span className="metric-description">Annual maintenance cost savings</span>
              </div>
            </div>
            <div className="analytics-card">
              <h3>Prediction Accuracy</h3>
              <div className="analytics-metric">
                <span className="metric-number">94.2%</span>
                <span className="metric-description">Average AI prediction accuracy</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="app-footer">
        <p>Powered by AI Agents | Real-time Industrial Monitoring | Predictive Maintenance</p>
      </footer>
    </div>
  );
}

export default App;