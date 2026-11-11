export type ModelProvider = 
  | 'DeepSeek' 
  | 'Meta' 
  | 'Alibaba' 
  | 'Mistral' 
  | 'Local Ollama' 
  | 'Custom Endpoint';

export interface AIModel {
  id: string;
  name: string;
  provider: ModelProvider;
  version: string;
  description: string;
  contextWindow: string;
  license: string;
  specialty: string;
  strengths: string[];
  recommendedRole: string;
  endpointUrl?: string;
  color: string;
  active: boolean;
  isLocal: boolean;
  benchmarkScore: string;
}

export type AgentRole = 
  | 'orchestrator' 
  | 'reasoner' 
  | 'coder' 
  | 'researcher' 
  | 'operator';

export type AgentStatus = 'idle' | 'planning' | 'reasoning' | 'executing' | 'speaking' | 'evaluating';

export interface Agent {
  id: string;
  name: string;
  title: string;
  role: AgentRole;
  modelId: string;
  avatarColor: string;
  accentHex: number;
  systemPrompt: string;
  status: AgentStatus;
  currentTask?: string;
  capabilities: string[];
  totalTasksCompleted: number;
  confidenceScore: number;
  priority?: 'High' | 'Medium' | 'Low';
  hasPendingTasks?: boolean;
}

export interface TaskStep {
  id: string;
  title: string;
  agentId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  reasoning?: string;
  output?: string;
  toolUsed?: string;
  toolArgs?: Record<string, any>;
  toolResult?: any;
  durationMs?: number;
}

export interface TaskPlan {
  id: string;
  goal: string;
  leadAgentId: string;
  status: 'planning' | 'running' | 'completed' | 'error';
  steps: TaskStep[];
  progressPercent: number;
  finalSynthesis?: string;
  createdAt: number;
  completedAt?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'jarvis' | 'agent';
  agentId?: string;
  agentName?: string;
  text: string;
  reasoning?: string;
  toolCall?: {
    tool: string;
    input: any;
    output: any;
  };
  timestamp: number;
  audioPlayed?: boolean;
}

export type WorkflowConditionType =
  | 'always'
  | 'if_success'
  | 'if_confidence_gt'
  | 'if_verified'
  | 'if_error_fallback';

export interface WorkflowCondition {
  type: WorkflowConditionType;
  label: string;
  threshold?: number;
  expression?: string;
}

export interface WorkflowStep {
  stepNumber: number;
  agentId: string;
  action: string;
  tool: string;
  inputTemplate: string;
  dependsOn?: number[];
  condition?: WorkflowCondition;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  description: string;
  category: 'Development' | 'Intelligence' | 'Operations' | 'Finance' | 'DevOps' | 'Marketing' | 'Custom';
  trigger: {
    type: 'manual' | 'interval' | 'webhook' | 'event';
    detail: string;
  };
  steps: WorkflowStep[];
  active: boolean;
  lastRun?: number;
  runCount: number;
  status: 'idle' | 'running' | 'success';
}

export interface MemoryItem {
  id: string;
  type: 'episodic' | 'semantic' | 'document' | 'user_profile';
  title: string;
  content: string;
  tags: string[];
  relevanceScore?: number;
  importance: number; // 1-10
  timestamp: number;
}

export interface VirtualFile {
  path: string;
  name: string;
  language: string;
  content: string;
  updatedAt: number;
}

export interface SystemTelemetry {
  activeModel: string;
  totalTokensGenerated: number;
  tokensPerSec: number;
  averageLatencyMs: number;
  memoryItemsCount: number;
  activeAgentsCount: number;
  voiceActive: boolean;
  ollamaConnected: boolean;
  securityIntegrityValid: boolean;
  activeRole: UserRole;
}

// Security Module Types
export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'AI_SECURITY_OFFICER' 
  | 'LEAD_DEVELOPER' 
  | 'AUDITOR' 
  | 'AGENT_OPERATOR' 
  | 'READ_ONLY';

export type Permission = 
  | 'agent:execute_unrestricted'
  | 'agent:spawn_swarm'
  | 'agent:modify_system_prompt'
  | 'sandbox:bypass'
  | 'sandbox:network_access'
  | 'sandbox:filesystem_write'
  | 'credentials:read_secrets'
  | 'credentials:write_keys'
  | 'credentials:rotate'
  | 'audit:export_tamper_proof'
  | 'audit:clear_logs'
  | 'model:deploy_custom_weights';

export interface UserSession {
  userId: string;
  username: string;
  role: UserRole;
  permissions: Permission[];
  sessionStartedAt: number;
}

export interface CredentialItem {
  id: string;
  name: string;
  category: 'LLM_PROVIDER' | 'CLOUD_API' | 'DATABASE' | 'WEBHOOK';
  maskedKey: string;
  actualKey: string;
  provider: string;
  createdAt: number;
  lastRotated: number;
  status: 'active' | 'revoked' | 'needs_rotation';
}

export type AuditSeverity = 'INFO' | 'WARN' | 'CRITICAL' | 'SECURITY';

export interface AuditLogEntry {
  id: string;
  timestamp: number;
  actor: string;
  actorType: 'USER' | 'AGENT' | 'SYSTEM';
  role: UserRole;
  action: string;
  target: string;
  severity: AuditSeverity;
  status: 'GRANTED' | 'BLOCKED' | 'FAILED';
  hash: string;
  prevHash: string;
  details?: Record<string, any>;
}

export interface SandboxPolicy {
  isolationLevel: 'STRICT_AIRGAP' | 'MONITORED_DEV' | 'ELEVATED';
  maxExecutionTimeMs: number;
  maxMemoryMb: number;
  allowNetwork: boolean;
  allowFsWrite: boolean;
  requireHumanApprovalForDestructive: boolean;
  blockedPatterns: string[];
  allowedDomains: string[];
}

export interface SecurityViolation {
  id: string;
  timestamp: number;
  agentId: string;
  ruleViolated: string;
  payloadSnippet: string;
  blocked: boolean;
}

// Marketplace Types
export interface AgentReview {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  timestamp: number;
}

export interface MarketplaceAgent {
  id: string;
  name: string;
  title: string;
  author: string;
  category: 'Engineering' | 'Research' | 'Security' | 'Finance' | 'Operations';
  modelId: string;
  avatarColor: string;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  tools: string[];
  rating: number;
  reviewsCount: number;
  installsCount: number;
  reviews: AgentReview[];
  publishedAt: number;
  isInstalled?: boolean;
}
