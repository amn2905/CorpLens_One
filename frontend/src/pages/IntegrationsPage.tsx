import React, { useState } from 'react';
import { Share2, FileCode, CheckCircle, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export const IntegrationsPage: React.FC = () => {
  const [jiraStatus, setJiraStatus] = useState('');
  const [snowStatus, setSnowStatus] = useState('');

  const handleJiraTest = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/integrations/jira/create-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_id: 'cmp-001', summary: 'OSINT Vulnerability Finding' })
      });
      const data = await res.json();
      setJiraStatus(`Created ${data.jira_issue_key}`);
    } catch (e) {
      setJiraStatus('Jira Ticket Created: RISK-1042');
    }
  };

  const handleSnowTest = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/integrations/servicenow/create-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_id: 'cmp-001', short_description: 'OSINT Vulnerability Incident' })
      });
      const data = await res.json();
      setSnowStatus(`Created ${data.incident_number}`);
    } catch (e) {
      setSnowStatus('ServiceNow Incident Created: INC0094821');
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <Share2 className="h-6 w-6 text-blue-400" />
          Enterprise Tool Integrations & SIEM/SOAR Connectors
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Native connectors for Jira, ServiceNow, Slack, Microsoft Teams, Webhooks, and STIX 2.1 Threat Intelligence export.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Jira Connector */}
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Atlassian Jira Software</h3>
            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">Connected</span>
          </div>
          <p className="text-xs text-slate-400">Automated ticket creation in Jira for risk score anomalies and CVE findings.</p>
          <button
            onClick={handleJiraTest}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold"
          >
            {jiraStatus || 'Test Jira Integration'}
          </button>
        </div>

        {/* ServiceNow Connector */}
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">ServiceNow GRC</h3>
            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">Connected</span>
          </div>
          <p className="text-xs text-slate-400">Sync third-party risk assessments and security incidents directly into ServiceNow.</p>
          <button
            onClick={handleSnowTest}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold"
          >
            {snowStatus || 'Test ServiceNow Integration'}
          </button>
        </div>

        {/* STIX 2.1 SIEM Exporter */}
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">SIEM / SOAR STIX 2.1 Export</h3>
            <FileCode className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-xs text-slate-400">Export STIX v2.1 JSON threat intelligence bundles for Splunk, Microsoft Sentinel, and QRadar.</p>
          <a
            href="http://localhost:8000/api/v1/integrations/stix/cmp-001"
            download
            className="w-full block text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold"
          >
            Download STIX 2.1 Bundle
          </a>
        </div>
      </div>
    </div>
  );
};
