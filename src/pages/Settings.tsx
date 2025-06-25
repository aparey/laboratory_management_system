import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, User, Lock, Bell, ToggleLeft, Database, Users, Sliders } from 'lucide-react';

export const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState('account');
  
  useEffect(() => {
    document.title = 'Settings - LabTrack';
  }, []);

  return (
    <div className="py-6 fade-in">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Manage your account and application preferences
      </p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="card">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-medium text-slate-800 dark:text-slate-200">Settings</h2>
            </div>
            <div className="p-2">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'account'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <User className="mr-3 h-5 w-5 flex-shrink-0" />
                  Account
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'appearance'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {darkMode ? (
                    <Moon className="mr-3 h-5 w-5 flex-shrink-0" />
                  ) : (
                    <Sun className="mr-3 h-5 w-5 flex-shrink-0" />
                  )}
                  Appearance
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'security'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Lock className="mr-3 h-5 w-5 flex-shrink-0" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'notifications'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Bell className="mr-3 h-5 w-5 flex-shrink-0" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'integrations'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <ToggleLeft className="mr-3 h-5 w-5 flex-shrink-0" />
                  Integrations
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'data'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Database className="mr-3 h-5 w-5 flex-shrink-0" />
                  Data Management
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'team'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Users className="mr-3 h-5 w-5 flex-shrink-0" />
                  Team
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'preferences'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Sliders className="mr-3 h-5 w-5 flex-shrink-0" />
                  Preferences
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="col-span-1 md:col-span-3">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="card">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-medium text-slate-800 dark:text-slate-200">Account Settings</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl font-medium text-indigo-600 dark:text-indigo-400">
                      JS
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">John Smith</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">john.smith@example.com</p>
                    <div className="mt-2">
                      <button className="btn-outline text-sm">
                        Change avatar
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">Personal Information</h3>
                  
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="first-name" className="label">
                        First name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className="input"
                        defaultValue="John"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="last-name" className="label">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className="input"
                        defaultValue="Smith"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="label">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="input"
                        defaultValue="john.smith@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="label">
                        Role
                      </label>
                      <select id="role" className="select">
                        <option>Lab Manager</option>
                        <option>Lab Technician</option>
                        <option>Scientist</option>
                        <option>Research Assistant</option>
                        <option>Administrator</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <button className="btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="card">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-medium text-slate-800 dark:text-slate-200">Appearance Settings</h2>
              </div>
              <div className="p-6">
                <h3 className="text-base font-medium text-slate-900 dark:text-white">Theme</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Customize how LabTrack looks on your device
                </p>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <button 
                      onClick={toggleDarkMode}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        darkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      <span className="sr-only">Toggle dark mode</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          darkMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="ml-3 text-sm font-medium text-slate-900 dark:text-white">
                      Dark mode
                    </span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">
                    Color scheme
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="relative flex cursor-pointer flex-col items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none">
                      <div className="h-6 w-6 rounded-full bg-indigo-600 dark:bg-indigo-500"></div>
                      <span className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                        Indigo
                      </span>
                      <div className="absolute -inset-0.5 rounded-lg border-2 border-indigo-500 dark:border-indigo-400 pointer-events-none"></div>
                    </div>
                    <div className="relative flex cursor-pointer flex-col items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none">
                      <div className="h-6 w-6 rounded-full bg-teal-600 dark:bg-teal-500"></div>
                      <span className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                        Teal
                      </span>
                    </div>
                    <div className="relative flex cursor-pointer flex-col items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none">
                      <div className="h-6 w-6 rounded-full bg-violet-600 dark:bg-violet-500"></div>
                      <span className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                        Violet
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">
                    Density
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Adjust the density of the user interface
                  </p>
                  <div className="mt-4">
                    <select className="select">
                      <option>Comfortable</option>
                      <option>Compact</option>
                      <option>Default</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <button className="btn-primary">Save preferences</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="card">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-medium text-slate-800 dark:text-slate-200">Security Settings</h2>
              </div>
              <div className="p-6">
                <div>
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">Change Password</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Update your password to keep your account secure
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="current-password" className="label">
                        Current password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="label">
                        New password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="label">
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Add an extra layer of security to your account
                  </p>
                  
                  <div className="mt-4">
                    <button className="btn-outline">
                      Set up two-factor authentication
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">
                    Login Sessions
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage your active sessions
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          Current session
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Chrome on Windows • IP: 192.168.1.1
                        </p>
                      </div>
                      <span className="badge-green">Active</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          Mobile session
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Safari on iPhone • Last active: 3 days ago
                        </p>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <button className="btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-medium text-slate-800 dark:text-slate-200">Notification Settings</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Configure how and when you want to be notified about laboratory events.
                </p>
                
                <div className="mt-6">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">
                    Email Notifications
                  </h3>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email-exp"
                          type="checkbox"
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-exp" className="font-medium text-slate-900 dark:text-white">
                          Sample expiration alerts
                        </label>
                        <p className="text-slate-500 dark:text-slate-400">
                          Get notified when samples are approaching their expiration date.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email-exp-complete"
                          type="checkbox"
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-exp-complete" className="font-medium text-slate-900 dark:text-white">
                          Experiment completion
                        </label>
                        <p className="text-slate-500 dark:text-slate-400">
                          Get notified when experiments are completed or fail.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="email-updates"
                          type="checkbox"
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="email-updates" className="font-medium text-slate-900 dark:text-white">
                          System updates
                        </label>
                        <p className="text-slate-500 dark:text-slate-400">
                          Get notified about system updates and new features.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">
                    In-App Notifications
                  </h3>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="app-sample"
                          type="checkbox"
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="app-sample" className="font-medium text-slate-900 dark:text-white">
                          Sample events
                        </label>
                        <p className="text-slate-500 dark:text-slate-400">
                          Show notifications for sample creation, modification, and status changes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="app-exp"
                          type="checkbox"
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="app-exp" className="font-medium text-slate-900 dark:text-white">
                          Experiment events
                        </label>
                        <p className="text-slate-500 dark:text-slate-400">
                          Show notifications for experiment creation, status changes, and results.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="app-team"
                          type="checkbox"
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
                          defaultChecked
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="app-team" className="font-medium text-slate-900 dark:text-white">
                          Team activity
                        </label>
                        <p className="text-slate-500 dark:text-slate-400">
                          Show notifications for team member actions and comments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <button className="btn-primary">Save preferences</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholder for other settings tabs */}
          {(activeTab === 'integrations' || activeTab === 'data' || activeTab === 'team' || activeTab === 'preferences') && (
            <div className="card">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="font-medium text-slate-800 dark:text-slate-200">
                  {activeTab === 'integrations' && 'Integrations'}
                  {activeTab === 'data' && 'Data Management'}
                  {activeTab === 'team' && 'Team Settings'}
                  {activeTab === 'preferences' && 'Preferences'}
                </h2>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="mt-2 text-base font-medium text-slate-900 dark:text-white">
                    {activeTab === 'integrations' && 'Configure Integrations'}
                    {activeTab === 'data' && 'Manage your Data'}
                    {activeTab === 'team' && 'Team Management'}
                    {activeTab === 'preferences' && 'Application Preferences'}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    This feature will be available in the next update.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};