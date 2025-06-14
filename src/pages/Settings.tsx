import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Settings as SettingsIcon, 
  User, 
  Bot, 
  Bell, 
  Shield, 
  Zap, 
  Calendar,
  Save,
  TestTube,
  Link,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [agentSettings, setAgentSettings] = useState({
    focusMode: true,
    autoJoinMeetings: true,
    createTasks: true,
    updateDocumentation: true,
    crossTeamCoordination: true,
    priorityLevel: 'medium',
    workingHours: {
      start: '09:00',
      end: '17:00'
    }
  });

  const [notificationSettings, setNotificationSettings] = useState({
    meetingReminders: true,
    taskCreated: true,
    agentUpdates: false,
    weeklyReports: true,
    email: true,
    slack: false
  });

  const integrations = [
    {
      name: 'Google Calendar',
      description: 'Sync meetings and automatically join scheduled calls',
      status: 'connected',
      icon: '📅',
      lastSync: '2 minutes ago'
    },
    {
      name: 'Jira',
      description: 'Create and manage tickets from meeting action items',
      status: 'connected',
      icon: '🎯',
      lastSync: '15 minutes ago'
    },
    {
      name: 'Confluence',
      description: 'Update documentation and meeting notes automatically',
      status: 'connected',
      icon: '📝',
      lastSync: '1 hour ago'
    },
    {
      name: 'Slack',
      description: 'Send notifications and updates to team channels',
      status: 'disconnected',
      icon: '💬',
      lastSync: 'Never'
    },
    {
      name: 'Microsoft Teams',
      description: 'Join Teams meetings and coordinate with team members',
      status: 'disconnected',
      icon: '💼',
      lastSync: 'Never'
    },
    {
      name: 'GitHub',
      description: 'Create issues and link code changes to meetings',
      status: 'disconnected',
      icon: '🐙',
      lastSync: 'Never'
    }
  ];

  const automationRules = [
    {
      id: 1,
      name: 'Sprint Planning Automation',
      trigger: 'Meeting title contains "Sprint Planning"',
      actions: ['Create Jira tickets', 'Assign to team members', 'Set sprint milestone'],
      enabled: true
    },
    {
      id: 2,
      name: 'Client Meeting Follow-up',
      trigger: 'Meeting with external attendees ends',
      actions: ['Send summary email', 'Create follow-up tasks', 'Schedule next meeting'],
      enabled: false
    },
    {
      id: 3,
      name: 'Documentation Updates',
      trigger: 'Any engineering meeting ends',
      actions: ['Update Confluence pages', 'Notify documentation team'],
      enabled: true
    }
  ];

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'agent', label: 'Agent Settings', icon: Bot },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'integrations', label: 'Integrations', icon: Link },
    { key: 'automation', label: 'Automation', icon: Zap },
    { key: 'security', label: 'Security', icon: Shield }
  ];

  const handleSave = () => {
    // Simulate saving settings
    alert('Settings saved successfully!');
  };

  const toggleIntegration = (name: string) => {
    // Simulate toggling integration
    console.log(`Toggling ${name} integration`);
  };

  const toggleAutomationRule = (id: number) => {
    // Simulate toggling automation rule
    console.log(`Toggling automation rule ${id}`);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Configure your AI agent and preferences</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                      activeTab === tab.key
                        ? 'bg-primary-50 text-primary-600 border border-primary-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      alt="Profile"
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Sarah Chen</h3>
                      <p className="text-gray-600">sarah.chen@company.com</p>
                      <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Sarah Chen"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        defaultValue="Senior Software Engineer"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Design</option>
                        <option>Marketing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Agent Settings Tab */}
            {activeTab === 'agent' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Agent Configuration</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Sarah-AI-001</h3>
                        <p className="text-gray-600">Your personal AI agent</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 font-medium">Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Focus Mode</span>
                            <p className="text-sm text-gray-500">Allow agent to attend meetings while you focus on deep work</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={agentSettings.focusMode}
                            onChange={(e) => setAgentSettings({...agentSettings, focusMode: e.target.checked})}
                            className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Auto-join Meetings</span>
                            <p className="text-sm text-gray-500">Automatically join scheduled meetings</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={agentSettings.autoJoinMeetings}
                            onChange={(e) => setAgentSettings({...agentSettings, autoJoinMeetings: e.target.checked})}
                            className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Create Tasks</span>
                            <p className="text-sm text-gray-500">Automatically create Jira tickets from meeting action items</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={agentSettings.createTasks}
                            onChange={(e) => setAgentSettings({...agentSettings, createTasks: e.target.checked})}
                            className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Update Documentation</span>
                            <p className="text-sm text-gray-500">Update Confluence pages with meeting summaries</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={agentSettings.updateDocumentation}
                            onChange={(e) => setAgentSettings({...agentSettings, updateDocumentation: e.target.checked})}
                            className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Cross-team Coordination</span>
                            <p className="text-sm text-gray-500">Allow agent to communicate with other team agents</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={agentSettings.crossTeamCoordination}
                            onChange={(e) => setAgentSettings({...agentSettings, crossTeamCoordination: e.target.checked})}
                            className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority Level
                        </label>
                        <select 
                          value={agentSettings.priorityLevel}
                          onChange={(e) => setAgentSettings({...agentSettings, priorityLevel: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="low">Low - Notify only</option>
                          <option value="medium">Medium - Standard automation</option>
                          <option value="high">High - Full autonomy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Working Hours
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="time"
                            value={agentSettings.workingHours.start}
                            onChange={(e) => setAgentSettings({
                              ...agentSettings, 
                              workingHours: {...agentSettings.workingHours, start: e.target.value}
                            })}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <input
                            type="time"
                            value={agentSettings.workingHours.end}
                            onChange={(e) => setAgentSettings({
                              ...agentSettings, 
                              workingHours: {...agentSettings.workingHours, end: e.target.value}
                            })}
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Meeting Notifications</h3>
                    
                    <div>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Meeting Reminders</span>
                          <p className="text-sm text-gray-500">Get notified before scheduled meetings</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.meetingReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, meetingReminders: e.target.checked})}
                          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Task Created</span>
                          <p className="text-sm text-gray-500">Notify when agent creates new tasks</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.taskCreated}
                          onChange={(e) => setNotificationSettings({...notificationSettings, taskCreated: e.target.checked})}
                          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Agent Updates</span>
                          <p className="text-sm text-gray-500">Real-time updates on agent activities</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.agentUpdates}
                          onChange={(e) => setNotificationSettings({...notificationSettings, agentUpdates: e.target.checked})}
                          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Weekly Reports</span>
                          <p className="text-sm text-gray-500">Summary of weekly productivity and agent performance</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.weeklyReports}
                          onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReports: e.target.checked})}
                          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Delivery Methods</h3>
                    
                    <div>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.email}
                          onChange={(e) => setNotificationSettings({...notificationSettings, email: e.target.checked})}
                          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Slack Integration</span>
                          <p className="text-sm text-gray-500">Send notifications to your Slack DM</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.slack}
                          onChange={(e) => setNotificationSettings({...notificationSettings, slack: e.target.checked})}
                          className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Integrations</h2>
                
                <div className="space-y-4">
                  {integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Last sync: {integration.lastSync}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          integration.status === 'connected' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {integration.status}
                        </span>
                        <button
                          onClick={() => toggleIntegration(integration.name)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                            integration.status === 'connected'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-primary-600 text-white hover:bg-primary-700'
                          }`}
                        >
                          {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Automation Tab */}
            {activeTab === 'automation' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Automation Rules</h2>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Rule</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {automationRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{rule.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rule.enabled 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {rule.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{rule.trigger}</p>
                          <div className="flex flex-wrap gap-2">
                            {rule.actions.map((action, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                              >
                                {action}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAutomationRule(rule.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              rule.enabled
                                ? 'text-green-600 hover:bg-green-100'
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            {rule.enabled ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security & Privacy</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6 text-green-600" />
                        <div>
                          <h3 className="font-medium text-green-900">Security Status: Excellent</h3>
                          <p className="text-sm text-green-700">All security measures are active and up to date.</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Data Protection</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">End-to-end encryption</span>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">GDPR compliance</span>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">SOX compliance</span>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Access Control</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Two-factor authentication</span>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Session management</span>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Role-based permissions</span>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Export Data
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;