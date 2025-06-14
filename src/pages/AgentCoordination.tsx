import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Users, 
  Bot, 
  MessageSquare, 
  Activity, 
  Settings,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  GitBranch,
  Network
} from 'lucide-react';

const AgentCoordination: React.FC = () => {
  const [activeTab, setActiveTab] = useState('network');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const agents = [
    {
      id: 'sarah-ai-001',
      name: 'Sarah-AI-001',
      owner: 'Sarah Chen',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'active',
      currentTask: 'Attending Sprint Planning',
      efficiency: 96,
      tasksToday: 12,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      specializations: ['Backend Development', 'API Design', 'Database Management']
    },
    {
      id: 'mike-ai-002',
      name: 'Mike-AI-002',
      owner: 'Mike Johnson',
      department: 'Engineering',
      role: 'Frontend Lead',
      status: 'active',
      currentTask: 'Coordinating with Design team',
      efficiency: 94,
      tasksToday: 8,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      specializations: ['React Development', 'UI/UX Implementation', 'Performance Optimization']
    },
    {
      id: 'lisa-ai-003',
      name: 'Lisa-AI-003',
      owner: 'Lisa Wang',
      department: 'Product',
      role: 'Product Manager',
      status: 'busy',
      currentTask: 'Client presentation prep',
      efficiency: 98,
      tasksToday: 15,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      specializations: ['Product Strategy', 'Market Research', 'Stakeholder Management']
    },
    {
      id: 'david-ai-004',
      name: 'David-AI-004',
      owner: 'David Brown',
      department: 'Design',
      role: 'Design Lead',
      status: 'offline',
      currentTask: 'Design system review',
      efficiency: 92,
      tasksToday: 6,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      specializations: ['Design Systems', 'User Research', 'Prototyping']
    }
  ];

  const communications = [
    {
      id: 1,
      from: 'Sarah-AI-001',
      to: 'Mike-AI-002',
      type: 'task-handoff',
      message: 'API endpoints ready for frontend integration. Documentation shared in Confluence.',
      timestamp: '2 minutes ago',
      status: 'delivered',
      priority: 'high'
    },
    {
      id: 2,
      from: 'Lisa-AI-003',
      to: 'David-AI-004',
      type: 'collaboration',
      message: 'User feedback incorporated. Design updates needed for mobile responsive layout.',
      timestamp: '15 minutes ago',
      status: 'read',
      priority: 'medium'
    },
    {
      id: 3,
      from: 'Mike-AI-002',
      to: 'Sarah-AI-001',
      type: 'dependency',
      message: 'Frontend testing blocked. Need API rate limiting documentation.',
      timestamp: '1 hour ago',
      status: 'acknowledged',
      priority: 'high'
    },
    {
      id: 4,
      from: 'David-AI-004',
      to: 'Engineering Team Agents',
      type: 'broadcast',
      message: 'Design system v2.0 components available. Integration guide updated.',
      timestamp: '2 hours ago',
      status: 'delivered',
      priority: 'low'
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'Customer Portal Redesign',
      agents: ['Sarah-AI-001', 'Mike-AI-002', 'David-AI-004'],
      status: 'active',
      progress: 78,
      deadline: '2 weeks',
      lastUpdate: '1 hour ago'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      agents: ['Mike-AI-002', 'Lisa-AI-003'],
      status: 'planning',
      progress: 25,
      deadline: '6 weeks',
      lastUpdate: '3 hours ago'
    },
    {
      id: 3,
      name: 'API Documentation Portal',
      agents: ['Sarah-AI-001'],
      status: 'review',
      progress: 95,
      deadline: '3 days',
      lastUpdate: '30 minutes ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50';
      case 'low': return 'border-l-green-500 bg-green-50/50';
      default: return 'border-l-gray-500 bg-gray-50/50';
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'task-handoff': return <ArrowRight className="w-4 h-4 text-blue-600" />;
      case 'collaboration': return <Users className="w-4 h-4 text-green-600" />;
      case 'dependency': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'broadcast': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAgents = agents.filter(agent => 
    selectedDepartment === 'all' || agent.department === selectedDepartment
  );

  const departments = [...new Set(agents.map(agent => agent.department))];

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Coordination</h1>
            <p className="text-gray-600">Monitor and manage your AI agent network</p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Agent</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50 mb-8 inline-flex">
          {[
            { key: 'network', label: 'Agent Network', icon: Network },
            { key: 'communications', label: 'Communications', icon: MessageSquare },
            { key: 'projects', label: 'Projects', icon: GitBranch }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Network Tab */}
        {activeTab === 'network' && (
          <div className="space-y-8">
            {/* Network Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <Bot className="w-8 h-8 text-primary-600" />
                  <span className="text-2xl font-bold text-gray-900">{agents.length}</span>
                </div>
                <h3 className="font-medium text-gray-900">Active Agents</h3>
                <p className="text-sm text-gray-600 mt-1">Across all departments</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">95%</span>
                </div>
                <h3 className="font-medium text-gray-900">Avg Efficiency</h3>
                <p className="text-sm text-gray-600 mt-1">Network-wide performance</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">127</span>
                </div>
                <h3 className="font-medium text-gray-900">Messages Today</h3>
                <p className="text-sm text-gray-600 mt-1">Inter-agent communications</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                  <span className="text-2xl font-bold text-gray-900">41</span>
                </div>
                <h3 className="font-medium text-gray-900">Tasks Coordinated</h3>
                <p className="text-sm text-gray-600 mt-1">Cross-team collaborations</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusDot(agent.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-600">{agent.owner}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{agent.role}</p>
                      <p className="text-sm text-gray-600">{agent.department}</p>
                    </div>

                    <div className="bg-gray-50/50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-900 mb-1 flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Current Task</span>
                      </p>
                      <p className="text-sm text-gray-700">{agent.currentTask}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Efficiency: </span>
                        <span className="text-green-600 font-medium">{agent.efficiency}%</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Tasks: </span>
                        <span className="text-blue-600 font-medium">{agent.tasksToday}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Specializations</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.specializations.map((spec, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                      View Details
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Communications Tab */}
        {activeTab === 'communications' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Inter-Agent Communications</h2>
              
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-4 rounded-xl border-l-4 ${getPriorityColor(comm.priority)} transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getMessageIcon(comm.type)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {comm.from} → {comm.to}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">
                            {comm.type.replace('-', ' ')} • {comm.timestamp}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        comm.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        comm.status === 'read' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                    <p className="text-gray-700">{comm.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Deadline: {project.deadline}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Assigned Agents</p>
                      <div className="flex -space-x-2">
                        {project.agents.map((agentId) => {
                          const agent = agents.find(a => a.id === agentId);
                          return (
                            <img
                              key={agentId}
                              src={agent?.avatar}
                              alt={agent?.name}
                              className="w-8 h-8 rounded-full border-2 border-white"
                              title={agent?.name}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                      <span className="text-sm text-gray-600">Updated {project.lastUpdate}</span>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AgentCoordination;