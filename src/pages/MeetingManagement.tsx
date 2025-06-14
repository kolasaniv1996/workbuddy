import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Calendar, 
  Clock, 
  Users, 
  Bot, 
  Play, 
  Pause, 
  CheckCircle,
  Plus,
  Filter,
  Search,
  Video,
  Mic,
  MicOff,
  Settings
} from 'lucide-react';

const MeetingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [filterStatus, setFilterStatus] = useState('all');

  const meetings = {
    today: [
      {
        id: 1,
        title: 'Sprint Planning - Q1 2025',
        time: '9:00 AM - 10:30 AM',
        status: 'completed',
        platform: 'zoom',
        attendees: ['Sarah Chen', 'Mike Johnson', 'Lisa Wang', 'David Brown'],
        agentJoined: true,
        tasksCreated: 5,
        summary: 'Completed sprint planning with 5 user stories assigned. Agent created tickets for backend API work.',
        recording: true
      },
      {
        id: 2,
        title: 'Product Review Meeting',
        time: '11:00 AM - 12:00 PM',
        status: 'in-progress',
        platform: 'teams',
        attendees: ['Sarah Chen', 'Product Team', 'Design Team'],
        agentJoined: true,
        tasksCreated: 2,
        summary: 'Currently in progress...',
        recording: true
      },
      {
        id: 3,
        title: 'Client Presentation Prep',
        time: '2:00 PM - 3:00 PM',
        status: 'upcoming',
        platform: 'meet',
        attendees: ['Sarah Chen', 'Sales Team'],
        agentJoined: false,
        tasksCreated: 0,
        summary: '',
        recording: false
      },
      {
        id: 4,
        title: 'Engineering Standup',
        time: '4:00 PM - 4:30 PM',
        status: 'agent-only',
        platform: 'zoom',
        attendees: ['Engineering Team'],
        agentJoined: true,
        tasksCreated: 0,
        summary: 'Agent will attend on your behalf to gather updates.',
        recording: true
      }
    ],
    upcoming: [
      {
        id: 5,
        title: 'Quarterly Planning Review',
        time: 'Tomorrow 10:00 AM - 11:30 AM',
        status: 'scheduled',
        platform: 'zoom',
        attendees: ['Leadership Team'],
        agentJoined: true,
        tasksCreated: 0,
        summary: 'Agent configured to attend and take detailed notes.',
        recording: true
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'agent-only': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'scheduled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'zoom': return '📹';
      case 'teams': return '💼';
      case 'meet': return '🎥';
      default: return '📞';
    }
  };

  const filteredMeetings = meetings[activeTab as keyof typeof meetings]?.filter(meeting => 
    filterStatus === 'all' || meeting.status === filterStatus
  ) || [];

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Management</h1>
            <p className="text-gray-600">Manage your meetings and AI agent attendance</p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Schedule Meeting</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50 mb-8 inline-flex">
          {[
            { key: 'today', label: 'Today', count: meetings.today.length },
            { key: 'upcoming', label: 'Upcoming', count: meetings.upcoming.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.key ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="upcoming">Upcoming</option>
              <option value="agent-only">Agent Only</option>
            </select>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search meetings..."
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Meetings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getPlatformIcon(meeting.platform)}</span>
                    <h3 className="font-semibold text-gray-900 text-lg">{meeting.title}</h3>
                  </div>
                  <p className="text-gray-600 flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{meeting.time}</span>
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting.status)}`}>
                  {meeting.status.replace('-', ' ')}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {meeting.attendees.length} attendees
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {meeting.recording && (
                      <div className="flex items-center space-x-1 text-sm text-red-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Recording</span>
                      </div>
                    )}
                    {meeting.agentJoined && (
                      <div className="flex items-center space-x-1 text-sm text-green-600">
                        <Bot className="w-4 h-4" />
                        <span>Agent Active</span>
                      </div>
                    )}
                  </div>
                </div>

                {meeting.summary && (
                  <div className="bg-gray-50/50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{meeting.summary}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {meeting.tasksCreated > 0 && (
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{meeting.tasksCreated} tasks created</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {meeting.status === 'in-progress' && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <Mic className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <Video className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-600">Try adjusting your filters or schedule a new meeting.</p>
          </div>
        )}

        {/* Focus Mode Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Agent Autonomy Mode</h3>
                <p className="text-sm text-gray-600">
                  Enable your agent to attend meetings independently and make decisions within your guidelines.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Current Status</p>
                <p className="text-xs text-green-600">Active for 3 meetings today</p>
              </div>
              <button className="bg-white text-purple-600 hover:text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-purple-200">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MeetingManagement;