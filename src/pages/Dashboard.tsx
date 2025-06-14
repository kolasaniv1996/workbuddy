import React from 'react';
import Layout from '../components/Layout';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Zap,
  Bot,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Meetings Today',
      value: '7',
      change: '+2',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Tasks Created',
      value: '23',
      change: '+15',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Focus Time',
      value: '4.2h',
      change: '+1.3h',
      trend: 'up',
      icon: Clock,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Agent Efficiency',
      value: '94%',
      change: '-2%',
      trend: 'down',
      icon: Bot,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentMeetings = [
    {
      title: 'Sprint Planning - Q1',
      time: '9:00 AM - 10:30 AM',
      status: 'completed',
      attendees: 8,
      tasksCreated: 5,
      agent: 'Sarah-AI-001'
    },
    {
      title: 'Product Review Meeting',
      time: '11:00 AM - 12:00 PM',
      status: 'in-progress',
      attendees: 12,
      tasksCreated: 0,
      agent: 'Sarah-AI-001'
    },
    {
      title: 'Client Presentation Prep',
      time: '2:00 PM - 3:00 PM',
      status: 'upcoming',
      attendees: 4,
      tasksCreated: 0,
      agent: 'Sarah-AI-001'
    }
  ];

  const agentActivity = [
    {
      action: 'Created Jira ticket: "Implement user authentication"',
      time: '2 minutes ago',
      type: 'task-created'
    },
    {
      action: 'Updated Confluence page: "Sprint 23 Planning Notes"',
      time: '15 minutes ago',
      type: 'documentation'
    },
    {
      action: 'Coordinated with Design-AI-007 for UI requirements',
      time: '32 minutes ago',
      type: 'agent-coordination'
    },
    {
      action: 'Joined meeting: "Sprint Planning - Q1"',
      time: '1 hour ago',
      type: 'meeting-join'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task-created': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'documentation': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'agent-coordination': return <Users className="w-4 h-4 text-purple-500" />;
      case 'meeting-join': return <Calendar className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what your AI agent has been up to.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`inline-flex items-center space-x-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Meetings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Meetings</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {recentMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-200/50 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                      {meeting.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{meeting.time}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{meeting.attendees}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{meeting.tasksCreated} tasks</span>
                      </span>
                    </div>
                    <span className="flex items-center space-x-1">
                      <Bot className="w-4 h-4" />
                      <span>{meeting.agent}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Agent Activity</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {agentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Focus Mode Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Focus Mode Available</h3>
                <p className="text-sm text-gray-600">
                  Your agent can handle the next 3 meetings while you focus on deep work.
                </p>
              </div>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Enable Focus Mode
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group">
            <Calendar className="w-8 h-8 text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold text-gray-900 mb-2">Schedule Meeting</h3>
            <p className="text-sm text-gray-600">Create a new meeting with agent attendance</p>
          </button>
          
          <button className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group">
            <Zap className="w-8 h-8 text-secondary-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold text-gray-900 mb-2">Create Automation</h3>
            <p className="text-sm text-gray-600">Set up new workflow automations</p>
          </button>
          
          <button className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-left group">
            <Users className="w-8 h-8 text-accent-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold text-gray-900 mb-2">Agent Settings</h3>
            <p className="text-sm text-gray-600">Configure your AI agent preferences</p>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;