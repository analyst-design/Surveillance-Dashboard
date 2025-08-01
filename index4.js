import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, TrendingUp, Shield, Clock, Eye, Target, Activity, DollarSign, Flag, Zap } from 'lucide-react';

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data for demonstration
  const overallStats = {
    totalUsers: 15247,
    totalBets: 89652,
    flaggedBets: 1247,
    suspiciousUsers: 89,
    groupBettingInstances: 23,
    avgBetSize: 1247.50
  };

  const suspiciousUsers = [
    {
      id: 'USR001',
      name: 'RajeshK_47',
      totalBets: 456,
      avgBetSize: 890.50,
      flaggedBets: 67,
      flaggedAvgSize: 3420.75,
      suspicionRatio: 3.84,
      riskLevel: 'HIGH',
      lastActivity: '2 hours ago',
      matchOdds: 234,
      sessions: 89,
      bookmaker: 133
    },
    {
      id: 'USR002', 
      name: 'CricketFan_92',
      totalBets: 678,
      avgBetSize: 1205.25,
      flaggedBets: 23,
      flaggedAvgSize: 1890.40,
      suspicionRatio: 1.57,
      riskLevel: 'MEDIUM',
      lastActivity: '45 mins ago',
      matchOdds: 345,
      sessions: 201,
      bookmaker: 132
    },
    {
      id: 'USR003',
      name: 'Mumbai_Bet_King',
      totalBets: 234,
      avgBetSize: 2340.80,
      flaggedBets: 89,
      flaggedAvgSize: 7890.25,
      suspicionRatio: 3.37,
      riskLevel: 'CRITICAL',
      lastActivity: '12 mins ago',
      matchOdds: 123,
      sessions: 67,
      bookmaker: 44
    }
  ];

  const groupBettingAlerts = [
    {
      id: 'GRP001',
      users: ['RajeshK_47', 'CricketFan_92', 'BetMaster_33'],
      matchId: 'IND_vs_AUS_T20_001',
      betAmount: 5000,
      timeWindow: '8 seconds',
      commonFactor: 'Same IP Address',
      ipAddress: '192.168.1.100',
      deviceId: 'DEV_456789',
      timestamp: '2025-08-01 14:23:45',
      riskScore: 95
    },
    {
      id: 'GRP002',
      users: ['Mumbai_Bet_King', 'Delhi_Pro_777', 'KKR_Fan_2024'],
      matchId: 'MI_vs_CSK_IPL_089',
      betAmount: 3500,
      timeWindow: '5 seconds',
      commonFactor: 'Same Device ID',
      ipAddress: 'Multiple',
      deviceId: 'DEV_123456',
      timestamp: '2025-08-01 13:45:12',
      riskScore: 87
    }
  ];

  const timeSeriesData = [
    { time: '00:00', normalBets: 120, flaggedBets: 8, groupBets: 2 },
    { time: '04:00', normalBets: 89, flaggedBets: 12, groupBets: 1 },
    { time: '08:00', normalBets: 234, flaggedBets: 23, groupBets: 4 },
    { time: '12:00', normalBets: 567, flaggedBets: 45, groupBets: 8 },
    { time: '16:00', normalBets: 789, flaggedBets: 67, groupBets: 12 },
    { time: '20:00', normalBets: 456, flaggedBets: 34, groupBets: 6 }
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtext, trend }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{borderLeftColor: color}}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className="p-3 rounded-full" style={{backgroundColor: color + '20'}}>
          <Icon className="h-8 w-8" style={{color: color}} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600">{trend}% from yesterday</span>
        </div>
      )}
    </div>
  );

  const UserProfileModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Profile: {user.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Betting Activity</h3>
            <p><span className="font-medium">Total Bets:</span> {user.totalBets}</p>
            <p><span className="font-medium">Match Odds:</span> {user.matchOdds}</p>
            <p><span className="font-medium">Sessions:</span> {user.sessions}</p>
            <p><span className="font-medium">Bookmaker:</span> {user.bookmaker}</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Financial Metrics</h3>
            <p><span className="font-medium">Avg Bet Size:</span> ₹{user.avgBetSize}</p>
            <p><span className="font-medium">Flagged Bets:</span> {user.flaggedBets}</p>
            <p><span className="font-medium">Flagged Avg:</span> ₹{user.flaggedAvgSize}</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Risk Assessment</h3>
            <p><span className="font-medium">Suspicion Ratio:</span> {user.suspicionRatio}x</p>
            <p><span className="font-medium">Risk Level:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                user.riskLevel === 'CRITICAL' ? 'bg-red-200 text-red-800' :
                user.riskLevel === 'HIGH' ? 'bg-orange-200 text-orange-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {user.riskLevel}
              </span>
            </p>
            <p><span className="font-medium">Last Activity:</span> {user.lastActivity}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Fraud Detection Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Flagged vs Average Bet Ratio</span>
              <span className={`font-bold ${user.suspicionRatio > 2 ? 'text-red-600' : user.suspicionRatio > 1.5 ? 'text-orange-600' : 'text-green-600'}`}>
                {user.suspicionRatio > 2 ? 'HIGH RISK' : user.suspicionRatio > 1.5 ? 'MEDIUM RISK' : 'LOW RISK'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${user.suspicionRatio > 2 ? 'bg-red-500' : user.suspicionRatio > 1.5 ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{width: `${Math.min(user.suspicionRatio * 20, 100)}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              This user's flagged bets are {user.suspicionRatio}x larger than their average bets, indicating potential suspicious activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Cricket Betting Surveillance Dashboard</h1>
            <p className="text-blue-200">Real-time fraud detection and betting pattern analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="h-16 w-16 text-blue-300" />
            <div className="text-right">
              <p className="text-2xl font-bold">{overallStats.suspiciousUsers}</p>
              <p className="text-blue-200">Active Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['1h', '24h', '7d', '30d'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedTimeframe === period 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={overallStats.totalUsers.toLocaleString()}
          icon={Users}
          color="#3B82F6"
          subtext="Active in last 24h"
          trend="+12"
        />
        <StatCard
          title="Total Bets"
          value={overallStats.totalBets.toLocaleString()}
          icon={Target}
          color="#10B981"
          subtext="All markets combined"
          trend="+8"
        />
        <StatCard
          title="Flagged Bets"
          value={overallStats.flaggedBets.toLocaleString()}
          icon={Flag}
          color="#F59E0B"
          subtext={`${((overallStats.flaggedBets/overallStats.totalBets)*100).toFixed(1)}% of total`}
          trend="+23"
        />
        <StatCard
          title="Group Betting Alerts"
          value={overallStats.groupBettingInstances}
          icon={AlertTriangle}
          color="#EF4444"
          subtext="Requires immediate attention"
          trend="+45"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Suspicious Users Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-red-500" />
              High-Risk Users
            </h2>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {suspiciousUsers.length} Active
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Total Bets</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Avg Size</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Flagged Avg</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Ratio</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Risk</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousUsers.map((user, idx) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-700">{user.totalBets}</td>
                    <td className="py-4 px-2 text-gray-700">₹{user.avgBetSize}</td>
                    <td className="py-4 px-2 font-bold text-red-600">₹{user.flaggedAvgSize}</td>
                    <td className="py-4 px-2">
                      <span className={`font-bold ${user.suspicionRatio > 2 ? 'text-red-600' : 'text-orange-600'}`}>
                        {user.suspicionRatio}x
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.riskLevel === 'CRITICAL' ? 'bg-red-200 text-red-800' :
                        user.riskLevel === 'HIGH' ? 'bg-orange-200 text-orange-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {user.riskLevel}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="space-y-6">
          {/* Betting Activity Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Betting Markets
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Match Odds (MO)</span>
                <span className="font-bold text-gray-900">45,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sessions</span>
                <span className="font-bold text-gray-900">23,456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bookmaker</span>
                <span className="font-bold text-gray-900">15,789</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Line Session</span>
                <span className="font-bold text-gray-900">5,173</span>
              </div>
            </div>
          </div>

          {/* Fraud Detection Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Detection Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Bet Size</span>
                <span className="font-bold text-green-600">₹{overallStats.avgBetSize}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Flagged Ratio</span>
                <span className="font-bold text-orange-600">1.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">False Positives</span>
                <span className="font-bold text-gray-900">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Detection Rate</span>
                <span className="font-bold text-blue-600">96.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Group Betting Alerts */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Users className="h-6 w-6 mr-2 text-purple-500" />
            Group Betting Detection
          </h2>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {groupBettingAlerts.length} Active Alerts
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groupBettingAlerts.map(alert => (
            <div key={alert.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-red-900">Alert #{alert.id}</h3>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  Risk: {alert.riskScore}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Users:</span> {alert.users.join(', ')}</p>
                  <p><span className="font-medium">Match:</span> {alert.matchId}</p>
                  <p><span className="font-medium">Amount:</span> ₹{alert.betAmount}</p>
                </div>
                <div>
                  <p><span className="font-medium">Time Window:</span> {alert.timeWindow}</p>
                  <p><span className="font-medium">Common Factor:</span> {alert.commonFactor}</p>
                  <p><span className="font-medium">Timestamp:</span> {alert.timestamp}</p>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Investigate
                </button>
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  Flag Users
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time-Based Analysis Chart */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="h-6 w-6 mr-2 text-green-500" />
          24-Hour Betting Activity Timeline
        </h2>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {timeSeriesData.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-12 space-y-1">
                <div 
                  className="bg-green-500 rounded-t" 
                  style={{height: `${(data.normalBets / 800) * 200}px`}}
                  title={`Normal Bets: ${data.normalBets}`}
                ></div>
                <div 
                  className="bg-yellow-500" 
                  style={{height: `${(data.flaggedBets / 800) * 200}px`}}
                  title={`Flagged Bets: ${data.flaggedBets}`}
                ></div>
                <div 
                  className="bg-red-500 rounded-b" 
                  style={{height: `${(data.groupBets / 800) * 200}px`}}
                  title={`Group Bets: ${data.groupBets}`}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{data.time}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Normal Bets</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Flagged Bets</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Group Betting</span>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Dashboard;