import React from 'react';
import { Share2, Key, Webhook, Shield } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="clay-panel p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-heading tracking-tight flex items-center gap-3">
              <Share2 className="h-6 w-6 text-[#3B82F6]" />
              Enterprise Webhooks & API Integration Settings
            </h1>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-3 py-1 rounded-full">
              HMAC-SHA256 Signed
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
            Configure SIEM event forwarders, Jira issue automation, and OAuth2 API secret keys for CorpLens One REST endpoints.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="clay-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
              <Webhook className="w-4 h-4 text-[#3B82F6]" />
              SIEM Webhook Subscriptions
            </h3>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Cryptographic HMAC-SHA256 event notification delivery to enterprise SIEM platforms (Splunk, Datadog, Microsoft Sentinel).
          </p>
          <button className="clay-button-secondary px-4 py-2 text-xs font-bold">
            Configure Webhook Endpoint →
          </button>
        </div>

        <div className="clay-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[#1E293B] font-heading flex items-center gap-2">
              <Key className="w-4 h-4 text-[#3B82F6]" />
              API Access Secret Keys
            </h3>
            <span className="text-xs font-mono font-bold bg-[#EEF6FF] text-[#3B82F6] border border-[#DCE7F5] px-2.5 py-0.5 rounded-full">
              3 Active Keys
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Scoped bearer access tokens for programmatic API access to corporate profiles and PDF generation endpoints.
          </p>
          <button className="clay-button-primary px-4 py-2 text-xs font-bold">
            + Generate Secret Key
          </button>
        </div>
      </div>
    </div>
  );
};
