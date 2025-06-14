import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Zap, 
  Plus, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  FileText,
  Users,
  Filter,
  Search
} from 'lucide-react';

const TaskAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedIntegration, setSelectedIntegration] = useState('all');

  const automations = {
    active: [
      {
        id: 1,
        name: 'Sprint Planning Auto-Tasks',
        description: 'Automatically create Jira tickets from sprint planning meetings',
        integration: 'jira',
        trigger: 'Meeting ends with "Sprint Planning" in title',
        actions: ['Create Jira tickets', 'Assign to team members', 'Set sprint milestone'],
        status: 'running',
        tasksCreated: 47,
        lastRun: '2 hours ago',
        successRate: 96
      },
      {
        id: 2,
        name: 'Documentation Sync',
        description: 'Update Confluence pages with meeting summaries and decisions',
        integration: 'confluence',
        trigger: 'Any meeting with stakeholders ends',
        actions: ['Update project pages', 'Create meeting notes', 'Notify team'],
        status: 'running',
        tasksCreated: 23,
        lastRun: '1 hour ago',
        successRate: 98
      },
      {
        id: 3,
        name: 'Cross-team Coordination',
        description: 'Coordinate tasks between different team agents',
        integration: 'multi-agent',
        trigger: 'Dependencies identified in meetings',
        actions: ['Create dependency tickets', 'Notify other agents', 'Schedule follow-ups'],
        status: 'running',
        tasksCreated: 15,
        lastRun: '30 minutes ago',
        successRate: 94
      }
    ],
    draft: [
      {
        id: 4,
        name: 'Client Meeting Follow-up',
        description: 'Automatically send follow-up emails after client meetings',
        integration: 'email',
        trigger: 'Client meeting ends',
        actions: ['Generate summary email', 'Create action items', 'Schedule follow-up'],
        status: 'draft',
        tasksCreated: 0,
        lastRun: 'Never',
        successRate: 0
      }
    ]
  };

  const integrations = [
    { id: 'jira', name: 'Jira', icon: '🎯', connected: true },
    { id: 'confluence', name: 'Confluence', icon: '📝', connected: true },
    { id: 'multi-agent', name: 'Agent Network', icon: '🤖', connected: true },
    { id: 'email', name: 'Email', icon: '📧', connected: false },
    { id: 'slack', name: 'Slack', icon: '💬', connected: false },
    { id: 'github', name: 'GitHub', icon: '🐙', connected: false }
  ];

  const recentTasks = [
    {
      title: 'Implement user authentication system',
      type: 'jira',
      assignee: 'Mike Johnson',
      priority: 'High',
      created: '10 minutes ago',
      automation: 'Sprint Planning Auto-Tasks'
    },
    {
      title: 'Update API documentation for v2.0',
      type: 'confluence',
      assignee: 'Lisa Wang',
      priority: 'Medium',
      created: '25 minutes ago',
      automation: 'Documentation Sync'
    },
    {
      title: 'Design system component review',
      type: 'jira',
      assignee: 'David Brown',
      priority: 'Low',
      created: '1 hour ago',
      automation: 'Cross-team Coordination'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4 text-green-600" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'draft': return <Clock className="w-4 h-4 text-gray-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'jira': return '🎯';
      case 'confluence': return '📝';
      case 'github': return '🐙';
      default: return '📋';
    }
  };

  const filteredAutomations = automations[activeTab as keyof typeof automations]?.filter(automation => 
    selectedIntegration === 'all' || automation.integration === selectedIntegration
  ) || [];

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Automation</h1>
            <p className="text-gray-600">Manage your AI-powered workflow automations</p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Automation</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="w-8 h-8 text-primary-600" />
                  <span className="text-2xl font-bold text-gray-900">85</span>
                </div>
                <h3 className="font-medium text-gray-900">Tasks Created Today</h3>
                <p className="text-sm text-gray-600 mt-1">+23% from yesterday</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">96%</span>
                </div>
                <h3 className="font-medium text-gray-900">Success Rate</h3>
                <p className="text-sm text-gray-600 mt-1">Across all automations</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">4.2h</span>
                </div>
                <h3 className="font-medium text-gray-900">Time Saved</h3>
                <p className="text-sm text-gray-600 mt-1">Per day average</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50 inline-flex">
              {[
                { key: 'active', label: 'Active', count: automations.active.length },
                { key: 'draft', label: 'Draft', count: automations.draft.length }
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedIntegration}
                  onChange={(e) => setSelectedIntegration(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Integrations</option>
                  {integrations.filter(i => i.connected).map(integration => (
                    <option key={integration.id} value={integration.id}>
                      {integration.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search automations..."
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Automations List */}
            <div className="space-y-6">
              {filteredAutomations.map((automation) => (
                <div
                  key={automation.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">
                          {integrations.find(i => i.id === automation.integration)?.icon}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-lg">{automation.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(automation.status)}`}>
                          {getStatusIcon(automation.status)}
                          <span>{automation.status}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{automation.description}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                        <GitBranch className="w-4 h-4" />
                        <span>Trigger</span>
                      </h4>
                      <p className="text-sm text-gray-700">{automation.trigger}</p>
                    </div>

                    <div className="bg-gray-50/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4" />
                        <span>Actions</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {automation.actions.map((action, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                          >
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{automation.tasksCreated} tasks created</span>
                        </span>
                        <span>Last run: {automation.lastRun}</span>
                        <span>Success rate: {automation.successRate}%</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {automation.status === 'running' ? (
                          <button className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors duration-200">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-2 text-green-600 hover:text-green-700 transition-colors duration-200">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Integrations */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <h3 className="font-semibold text-gray-900 mb-4">Integrations</h3>
              <div className="space-y-3">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{integration.icon}</span>
                      <span className="font-medium text-gray-900">{integration.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      integration.connected ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Tasks</h3>
              <div className="space-y-4">
                {recentTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-gray-200/50 hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg mt-1">{getTypeIcon(task.type)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{task.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Assigned to {task.assignee}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">{task.created}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskAutomation;