import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Calendar, 
  Zap, 
  Users, 
  Shield, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Play,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulate Google OAuth login
    const userData = {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      agentId: 'agent-sarah-001'
    };
    login(userData);
    // Navigate to dashboard after login
    navigate('/dashboard');
  };

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const features = [
    {
      icon: Calendar,
      title: 'Smart Meeting Management',
      description: 'Your AI agent joins meetings, takes notes, and creates action items automatically.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Intelligent Automation',
      description: 'Seamlessly integrates with Jira, Confluence, and your favorite productivity tools.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Agent Coordination',
      description: 'Multiple agents work together across teams for complex projects and workflows.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with GDPR, SOX, and industry standards.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    '30-40% reduction in meeting overhead',
    '95% accuracy in task capture',
    'Real-time cross-team coordination',
    'Focus mode for uninterrupted work',
    'Intelligent priority management',
    'Automated follow-up generation'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gen AI Work Buddy</h1>
              </div>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Sign in with Google</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Revolutionizing Workplace Productivity</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI-Powered
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent block">
                Meeting Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform how you handle meetings with intelligent automation, seamless integrations, 
              and proactive task management. Let AI attend meetings while you focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGoogleLogin}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 hover:border-primary-300 text-gray-700 hover:text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto animate-fade-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 animate-float">
                  <Calendar className="w-8 h-8 text-primary-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Meeting in Progress</h3>
                  <p className="text-sm text-gray-600">AI agent attending Sprint Planning</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 animate-float" style={{ animationDelay: '1s' }}>
                  <Zap className="w-8 h-8 text-secondary-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Tasks Created</h3>
                  <p className="text-sm text-gray-600">3 Jira tickets auto-generated</p>
                  <div className="mt-4 text-xs text-secondary-600 font-medium">Just now</div>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 animate-float" style={{ animationDelay: '2s' }}>
                  <Users className="w-8 h-8 text-accent-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Team Sync</h3>
                  <p className="text-sm text-gray-600">Agents coordinating updates</p>
                  <div className="mt-4 flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 bg-accent-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Intelligent Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI capabilities designed to eliminate meeting overhead and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Measurable Impact on Your Productivity
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of professionals who have transformed their work experience with AI-powered assistance.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-secondary-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Meeting Efficiency</span>
                    <TrendingUp className="w-5 h-5 text-secondary-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">+47%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Task Completion Rate</span>
                    <CheckCircle className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Focus Time Gained</span>
                    <Zap className="w-5 h-5 text-accent-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">3.2 hrs/day</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent-400 to-accent-600 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join the productivity revolution. Get started in minutes with your existing Google account.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="bg-white text-primary-600 hover:text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-primary-200 text-sm mt-4">No credit card required • Setup in 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">Gen AI Work Buddy</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Gen AI Work Buddy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;