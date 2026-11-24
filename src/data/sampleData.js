// ============================================================
// Synthetic / sample data for the Banking Cyber Incident
// Coordination Dashboard.  ALL names are fictitious.
// ============================================================

export const INSTITUTIONS = [
  { id: 'inst-001', name: 'Maybank-Sim',                impact: 'Critical',   services: ['Online Banking', 'Interbank Transfers', 'Payment Gateway'], patchVersion: 'KB5041585-v1', lastUpdated: '2026-11-24T14:30:00' },
  { id: 'inst-002', name: 'CIMB-Sim',                   impact: 'Critical',   services: ['Online Banking', 'Payment Gateway'],                       patchVersion: 'KB5041585-v1', lastUpdated: '2026-11-24T13:45:00' },
  { id: 'inst-003', name: 'PublicBank-Sim',              impact: 'Degraded',   services: ['Interbank Transfers'],                                     patchVersion: 'KB5041585-v2', lastUpdated: '2026-11-24T15:10:00' },
  { id: 'inst-004', name: 'RHB-Sim',                     impact: 'Critical',   services: ['Online Banking', 'Interbank Transfers'],                   patchVersion: 'KB5041585-v1', lastUpdated: '2026-11-24T12:00:00' },
  { id: 'inst-005', name: 'AmBank-Sim',                  impact: 'Degraded',   services: ['Payment Gateway'],                                         patchVersion: 'KB5041585-v2', lastUpdated: '2026-11-24T14:00:00' },
  { id: 'inst-006', name: 'HongLeong-Sim',               impact: 'Operational', services: [],                                                         patchVersion: 'KB5041585-v3', lastUpdated: '2026-11-24T16:00:00' },
  { id: 'inst-007', name: 'Apex National Bank',          impact: 'Critical',   services: ['Online Banking', 'Payment Gateway'],                       patchVersion: 'KB5041585-v1', lastUpdated: '2026-11-24T11:30:00' },
  { id: 'inst-008', name: 'Merdeka Islamic Bank',        impact: 'Degraded',   services: ['Interbank Transfers', 'Payment Gateway'],                  patchVersion: 'KB5041585-v2', lastUpdated: '2026-11-24T13:20:00' },
  { id: 'inst-009', name: 'Klang Valley Commercial Bank', impact: 'Degraded',  services: ['Online Banking'],                                          patchVersion: 'KB5041585-v2', lastUpdated: '2026-11-24T15:45:00' },
  { id: 'inst-010', name: 'Nusantara Digital Bank',      impact: 'Operational', services: [],                                                         patchVersion: 'KB5041585-v3', lastUpdated: '2026-11-24T16:30:00' },
];

export const INCIDENTS = [
  { id: 'inc-001', institution: 'Maybank-Sim',                service: 'Online Banking',       severity: 'Critical', description: 'Complete online banking portal outage following Windows patch deployment. Users unable to authenticate.', reportedBy: 'Ahmad Razak',  timestamp: '2026-11-24T08:15:00' },
  { id: 'inc-002', institution: 'CIMB-Sim',                   service: 'Payment Gateway',      severity: 'Critical', description: 'Payment gateway returning 503 errors on all merchant transactions. Linked to corrupted TLS certificate store after patch.', reportedBy: 'Dr. Lim Wei',   timestamp: '2026-11-24T08:45:00' },
  { id: 'inc-003', institution: 'RHB-Sim',                     service: 'Interbank Transfers',  severity: 'High',     description: 'RENTAS interbank transfer module failing intermittently. Approximately 40% of transfers timing out.', reportedBy: 'Siti Nurhaliza', timestamp: '2026-11-24T09:30:00' },
  { id: 'inc-004', institution: 'Apex National Bank',          service: 'Online Banking',       severity: 'Critical', description: 'Core banking middleware crashed post-patch. Database connection pool exhausted, manual restart required.', reportedBy: 'Raj Kumar',     timestamp: '2026-11-24T10:00:00' },
  { id: 'inc-005', institution: 'Merdeka Islamic Bank',        service: 'Payment Gateway',      severity: 'Medium',   description: 'Intermittent delays on DuitNow QR payments. Transaction queue growing but not failing.', reportedBy: 'Nurul Izzah',   timestamp: '2026-11-24T10:30:00' },
  { id: 'inc-006', institution: 'Klang Valley Commercial Bank', service: 'Online Banking',      severity: 'High',     description: 'Mobile banking app login flow broken due to incompatible security library update bundled in Windows patch.', reportedBy: 'Jason Tan',     timestamp: '2026-11-24T11:00:00' },
];

export const RISKS = [
  { id: 'risk-001', title: 'Cascading interbank settlement failure',       category: 'Operational',  likelihood: 5, impact: 5, owner: 'BNM Taskforce Lead',    mitigation: 'Activate manual settlement protocols and isolate affected nodes', status: 'Active' },
  { id: 'risk-002', title: 'Customer data exposure via debug logs',        category: 'Security',     likelihood: 3, impact: 5, owner: 'CISO – Maybank-Sim',    mitigation: 'Disable verbose logging, rotate exposed API keys',               status: 'Active' },
  { id: 'risk-003', title: 'Reputational damage from prolonged outage',    category: 'Strategic',    likelihood: 4, impact: 4, owner: 'Comms Director',        mitigation: 'Coordinated press briefing & customer advisory within 2 hours',  status: 'Mitigating' },
  { id: 'risk-004', title: 'Fraudulent transactions during service gaps',  category: 'Security',     likelihood: 4, impact: 5, owner: 'Fraud Ops – CIMB-Sim', mitigation: 'Enable enhanced fraud monitoring rules, hold suspicious txns',    status: 'Active' },
  { id: 'risk-005', title: 'Patch rollback causing data inconsistency',    category: 'Technical',    likelihood: 3, impact: 4, owner: 'Infra Lead',            mitigation: 'Snapshot databases before rollback; validate checksums',          status: 'Mitigating' },
  { id: 'risk-006', title: 'Regulatory non-compliance (BNM RMiT)',        category: 'Compliance',   likelihood: 2, impact: 5, owner: 'Compliance Officer',    mitigation: 'Document all actions for post-incident regulatory report',        status: 'Monitoring' },
];

export const TASKS = [
  { id: 'task-001', title: 'Deploy emergency patch rollback on Maybank-Sim core servers',   assignee: 'Ahmad Razak',    institution: 'Maybank-Sim',     status: 'In Progress', priority: 'Critical', dueDate: '2026-11-24T18:00:00', linkedIncident: 'inc-001' },
  { id: 'task-002', title: 'Restore TLS certificate store on CIMB-Sim payment gateway',     assignee: 'Dr. Lim Wei',    institution: 'CIMB-Sim',        status: 'To Do',       priority: 'Critical', dueDate: '2026-11-24T17:00:00', linkedIncident: 'inc-002' },
  { id: 'task-003', title: 'Isolate RHB-Sim RENTAS node and reroute via backup channel',    assignee: 'Siti Nurhaliza', institution: 'RHB-Sim',         status: 'In Progress', priority: 'High',     dueDate: '2026-11-24T19:00:00', linkedIncident: 'inc-003' },
  { id: 'task-004', title: 'Restart Apex National Bank middleware and flush connection pool', assignee: 'Raj Kumar',      institution: 'Apex National Bank', status: 'Done',    priority: 'Critical', dueDate: '2026-11-24T14:00:00', linkedIncident: 'inc-004' },
  { id: 'task-005', title: 'Monitor DuitNow QR queue depth at Merdeka Islamic Bank',        assignee: 'Nurul Izzah',    institution: 'Merdeka Islamic Bank', status: 'Under Review', priority: 'Medium', dueDate: '2026-11-24T20:00:00', linkedIncident: 'inc-005' },
  { id: 'task-006', title: 'Coordinate BNM press briefing & customer advisory',             assignee: 'Comms Director', institution: 'All',              status: 'In Progress', priority: 'High',     dueDate: '2026-11-24T16:00:00', linkedIncident: null },
  { id: 'task-007', title: 'Enable enhanced fraud detection rules across all institutions',  assignee: 'Fraud Ops Lead', institution: 'All',              status: 'Done',        priority: 'Critical', dueDate: '2026-11-24T12:00:00', linkedIncident: null },
  { id: 'task-008', title: 'Patch validation in sandbox environment before wider rollout',   assignee: 'Infra Lead',     institution: 'All',              status: 'To Do',       priority: 'High',     dueDate: '2026-11-25T08:00:00', linkedIncident: null },
];

export const PREVENTIVE_CONTROLS = [
  { id: 'pc-001', title: 'Staged Patch Rollout Protocol',          description: 'All vendor patches must be deployed in 3 stages: sandbox → pilot (2 institutions) → full fleet, with 24-hour observation windows between stages.', owner: 'Infra Lead',          implementationStatus: 'Planned',       category: 'Change Management' },
  { id: 'pc-002', title: 'Automated Rollback Mechanism',           description: 'Implement automated rollback triggers based on health-check failures within 30 minutes of patch deployment.', owner: 'DevOps Team',         implementationStatus: 'In Progress',   category: 'Automation' },
  { id: 'pc-003', title: 'Pre-Deployment Sandbox Validation Suite', description: 'Mandatory automated test suite covering TLS, authentication, interbank connectivity, and payment gateway flows before any OS-level patch is approved.', owner: 'QA Lead',             implementationStatus: 'Planned',       category: 'Testing' },
  { id: 'pc-004', title: 'Real-Time Patch Impact Monitoring',      description: 'Deploy APM agents and synthetic transaction monitors that alert within 5 minutes of service degradation post-patch.', owner: 'NOC Manager',         implementationStatus: 'Implemented',   category: 'Monitoring' },
  { id: 'pc-005', title: 'Vendor Patch Review Board',              description: 'Establish a cross-institutional review board that evaluates all critical OS patches for banking-specific risks before approval for deployment.', owner: 'CISO Council Chair',  implementationStatus: 'Planned',       category: 'Governance' },
];

export const ACTIVITY_FEED = [
  { id: 'act-001', action: 'Incident reported',       detail: 'Maybank-Sim online banking portal outage logged as Critical',              user: 'Ahmad Razak',    timestamp: '2026-11-24T08:15:00' },
  { id: 'act-002', action: 'Task assigned',            detail: 'Emergency patch rollback assigned to Ahmad Razak',                         user: 'Taskforce Lead', timestamp: '2026-11-24T08:20:00' },
  { id: 'act-003', action: 'Risk escalated',           detail: 'Cascading interbank settlement failure raised to Critical (25/25)',         user: 'BNM Analyst',    timestamp: '2026-11-24T09:00:00' },
  { id: 'act-004', action: 'Incident reported',        detail: 'CIMB-Sim payment gateway 503 errors logged',                               user: 'Dr. Lim Wei',    timestamp: '2026-11-24T08:45:00' },
  { id: 'act-005', action: 'Task completed',           detail: 'Enhanced fraud detection rules enabled across all institutions',            user: 'Fraud Ops Lead', timestamp: '2026-11-24T11:30:00' },
  { id: 'act-006', action: 'Status update',            detail: 'Apex National Bank middleware restarted — service recovering',              user: 'Raj Kumar',      timestamp: '2026-11-24T13:00:00' },
  { id: 'act-007', action: 'Preventive control added', detail: 'Staged Patch Rollout Protocol documented and assigned to Infra Lead',      user: 'CISO',           timestamp: '2026-11-24T14:00:00' },
  { id: 'act-008', action: 'Task in progress',         detail: 'RHB-Sim RENTAS node isolation underway',                                   user: 'Siti Nurhaliza', timestamp: '2026-11-24T15:00:00' },
];

export const TASKFORCE_MEMBERS = [
  'Ahmad Razak', 'Dr. Lim Wei', 'Siti Nurhaliza', 'Raj Kumar',
  'Nurul Izzah', 'Jason Tan', 'Comms Director', 'Fraud Ops Lead',
  'Infra Lead', 'QA Lead', 'NOC Manager', 'CISO Council Chair',
  'BNM Taskforce Lead', 'DevOps Team',
];
