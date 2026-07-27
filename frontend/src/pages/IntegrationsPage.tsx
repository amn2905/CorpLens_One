import React from 'react';
import { Share2, Key, Webhook, Shield } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const IntegrationsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-3">
          <Share2 className="h-6 w-6 text-blue-600" />
          Enterprise Webhooks & API Integrations
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          HMAC-signed webhook endpoints, SIEM event forwarders, and OAuth2 API keys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
              <Webhook className="w-4 h-4 text-blue-600" />
              Webhook Subscriptions
            </h3>
            <Badge variant="low">Active</Badge>
          </div>
          <p className="text-xs text-slate-600 font-sans">
            Cryptographic HMAC-SHA256 payload delivery to SIEM endpoints (Splunk / Datadog / Sentinel).
          </p>
          <Button variant="outline" size="sm">Configure Webhook →</Button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 font-heading flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-600" />
              API Secret Keys
            </h3>
            <Badge variant="cyan">3 Keys</Badge>
          </div>
          <p className="text-xs text-slate-600 font-sans">
            Bearer tokens for automated CIOS REST API integration.
          </p>
          <Button variant="outline" size="sm">+ Generate Key</Button>
        </div>
      </div>
    </div>
  );
};
