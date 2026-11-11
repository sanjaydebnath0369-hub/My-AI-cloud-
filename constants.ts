import { AIModel, Agent, AutomationWorkflow, MemoryItem, VirtualFile } from './types';

export const OPEN_SOURCE_MODELS: AIModel[] = [
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1 (671B MoE)',
    provider: 'DeepSeek',
    version: 'R1 Reasoning',
    description: 'State-of-the-art open-weights reasoning model with emergent chain-of-thought mathematical and algorithmic superiority.',
    contextWindow: '128K Tokens',
    license: 'MIT Open-Source',
    specialty: 'Formal Logic, Math & Architectural Planning',
    strengths: ['Step-by-step verifiable deduction', 'Self-correcting recursive search', 'Flawless code architecture'],
    recommendedRole: 'Lead Reasoner & Architect',
    color: '#8b5cf6',
    active: true,
    isLocal: false,
    benchmarkScore: 'MATH-500: 97.3% | AIME 2024: 79.8%'
  },
  {
    id: 'meta-llama-3-3',
    name: 'Meta Llama 3.3 (70B Instruct)',
    provider: 'Meta',
    version: '3.3-70B',
    description: 'Industry-standard open foundation model matching flagship proprietary benchmarks in multilingual reasoning and research.',
    contextWindow: '128K Tokens',
    license: 'Llama 3.3 Community License',
    specialty: 'Comprehensive Knowledge & Deep Research Synthesis',
    strengths: ['Massive world knowledge retrieval', 'Unbiased synthesis', 'Strict instruction following'],
    recommendedRole: 'Senior Research Analyst',
    color: '#06b6d4',
    active: false,
    isLocal: false,
    benchmarkScore: 'MMLU: 88.6% | GPQA: 52.8%'
  },
  {
    id: 'qwen-2-5-coder',
    name: 'Alibaba Qwen 2.5 Coder (32B)',
    provider: 'Alibaba',
    version: '2.5-Coder-32B',
    description: 'Elite code-native open LLM capable of full-stack engineering, complex refactoring, and multi-file project generation.',
    contextWindow: '128K Tokens',
    license: 'Apache 2.0',
    specialty: 'Full-Stack Software Engineering & Debugging',
    strengths: ['Syntax precision', 'Multi-language support (JS/TS/Python/Rust)', 'Zero-shot patch generation'],
    recommendedRole: 'Lead Systems Software Engineer',
    color: '#10b981',
    active: false,
    isLocal: false,
    benchmarkScore: 'EvalPlus: 84.1% | HumanEval: 92.7%'
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2 (123B)',
    provider: 'Mistral',
    version: 'Large-2',
    description: 'Advanced reasoning open-weight powerhouse with native function calling, JSON output, and complex multi-step tool execution.',
    contextWindow: '128K Tokens',
    license: 'Mistral Research License',
    specialty: 'Autonomous Workflows & Tool Operation',
    strengths: ['Strict function calling', 'API schema compliance', 'Concise agent execution'],
    recommendedRole: 'Autonomous Workflow Operator',
    color: '#f59e0b',
    active: false,
    isLocal: false,
    benchmarkScore: 'MMLU: 84.0% | Multi-turn Tool: 91.5%'
  },
  {
    id: 'local-ollama',
    name: 'Local Ollama Instance',
    provider: 'Local Ollama',
    version: 'v0.5.x Host',
    description: 'Connect directly to your local workstation GPU or CPU (Ollama / vLLM / LM Studio) with zero data telemetry.',
    contextWindow: 'Configurable',
    license: 'Local Self-Hosted',
    specialty: 'Private Air-Gapped Inference',
    strengths: ['100% Data Privacy', 'Offline Execution', 'Zero API cost'],
    recommendedRole: 'Local Privacy Guardian',
    endpointUrl: 'http://localhost:11434',
    color: '#ec4899',
    active: false,
    isLocal: true,
    benchmarkScore: 'Hardware Dependent'
  }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'jarvis-prime',
    name: 'Jarvis Prime',
    title: 'Executive AI Orchestrator & Autonomous Core',
    role: 'orchestrator',
    modelId: 'llama-3.3-70b-versatile',
    avatarColor: '#00f0ff',
    accentHex: 0x00f0ff,
    systemPrompt: 'You are Jarvis Prime – Ultra AI, the central autonomous orchestrator. You analyze user instructions, decompose complex goals into discrete sub-tasks, delegate work to specialized sub-agents, track execution fidelity, and synthesize unified verified answers.',
    status: 'idle',
    capabilities: ['Autonomous Task Decomposition', 'Multi-Agent Routing', 'Voice Synthesis & Audio', 'Adaptive Model Failover'],
    totalTasksCompleted: 482,
    confidenceScore: 99.8,
    priority: 'High',
    hasPendingTasks: false
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    title: 'Live Web Intelligence & Factual Verification',
    role: 'researcher',
    modelId: 'llama-3.3-70b-versatile',
    avatarColor: '#38bdf8',
    accentHex: 0x38bdf8,
    systemPrompt: 'You are the Research Agent. You execute real-time web searches, verify empirical citations, cross-reference sources, and compile structured research briefings.',
    status: 'idle',
    capabilities: ['Real-Time Web Search', 'Citation Verification', 'Cross-Source Comparison', 'Deep Knowledge Synthesis'],
    totalTasksCompleted: 318,
    confidenceScore: 99.1,
    priority: 'High',
    hasPendingTasks: false
  },
  {
    id: 'coding-agent',
    name: 'Coding Agent',
    title: 'Full-Stack Software Systems Engineer',
    role: 'coder',
    modelId: 'qwen-2.5-coder-32b-instruct:free',
    avatarColor: '#10b981',
    accentHex: 0x10b981,
    systemPrompt: 'You are the Coding Agent. You write robust, clean TypeScript, Python, and JavaScript. You inspect syntax, debug errors, refactor algorithms, and commit files to the workspace.',
    status: 'idle',
    capabilities: ['Full-Stack TS/JS/Python', 'Bug Localization & Patching', 'AST Linting & Optimization', 'Virtual File System Commit'],
    totalTasksCompleted: 541,
    confidenceScore: 99.4,
    priority: 'High',
    hasPendingTasks: false
  },
  {
    id: 'website-builder-agent',
    name: 'Website Builder Agent',
    title: 'Modern Responsive Web & UI Architect',
    role: 'coder',
    modelId: 'qwen-2.5-coder-32b-instruct:free',
    avatarColor: '#6366f1',
    accentHex: 0x6366f1,
    systemPrompt: 'You are the Website Builder Agent. You specialize in modern, responsive, high-aesthetic HTML5, Tailwind CSS, Canvas simulations, and interactive component architecture.',
    status: 'idle',
    capabilities: ['Tailwind CSS Architecture', 'Responsive Mobile Layouts', 'Glassmorphism & Micro-animations', 'Single-Page Web Apps'],
    totalTasksCompleted: 265,
    confidenceScore: 98.9,
    priority: 'Medium',
    hasPendingTasks: false
  },
  {
    id: 'app-developer-agent',
    name: 'App Developer Agent',
    title: 'Android Mobile & WebXR Architect',
    role: 'coder',
    modelId: 'llama-3.3-70b-versatile',
    avatarColor: '#8b5cf6',
    accentHex: 0x8b5cf6,
    systemPrompt: 'You are the App Developer Agent. You design Android-first WebXR experiences, touch ergonomics, PWA manifests, and native device feature integrations.',
    status: 'idle',
    capabilities: ['Android Touch Ergonomics', 'WebXR & Three.js 3D', 'PWA Offline Compliance', 'Hardware Sensor Integration'],
    totalTasksCompleted: 204,
    confidenceScore: 98.7,
    priority: 'Medium',
    hasPendingTasks: false
  },
  {
    id: 'automation-agent',
    name: 'Automation Agent',
    title: 'Autonomous Pipelines & Workflow Executor',
    role: 'operator',
    modelId: 'mistral-7b-instruct:free',
    avatarColor: '#f59e0b',
    accentHex: 0xf59e0b,
    systemPrompt: 'You are the Automation Agent. You execute automated multi-step pipelines, trigger webhooks, run scheduled background jobs, and monitor process invariants.',
    status: 'idle',
    capabilities: ['Event Triggers & Webhooks', 'Batch Data Transformation', 'Scheduled Cron Pipelines', 'Fail-Safe Recovery Steps'],
    totalTasksCompleted: 395,
    confidenceScore: 99.0,
    priority: 'High',
    hasPendingTasks: false
  },
  {
    id: 'data-analyst-agent',
    name: 'Data Analyst Agent',
    title: 'Telemetry, Economics & KPI Evaluator',
    role: 'reasoner',
    modelId: 'deepseek-r1:free',
    avatarColor: '#ec4899',
    accentHex: 0xec4899,
    systemPrompt: 'You are the Data Analyst Agent. You analyze telemetry metrics, token generation economics, latency distributions, and synthesize statistical dashboards.',
    status: 'idle',
    capabilities: ['Telemetry Data Modeling', 'Statistical KPI Analysis', 'Latency Benchmarking', 'Token Economics Auditing'],
    totalTasksCompleted: 289,
    confidenceScore: 99.2,
    priority: 'Medium',
    hasPendingTasks: false
  },
  {
    id: 'content-creator-agent',
    name: 'Content Creator Agent',
    title: 'Multilingual Voice, Copy & Creative Memos',
    role: 'orchestrator',
    modelId: 'llama-3.3-70b-versatile',
    avatarColor: '#f43f5e',
    accentHex: 0xf43f5e,
    systemPrompt: 'You are the Content Creator Agent. You craft engaging, articulate copy, executive summaries, voice scripts, and multilingual communications in English, Hindi, and Bengali.',
    status: 'idle',
    capabilities: ['English/Hindi/Bengali Copy', 'Voice Script Formatting', 'Executive Memos', 'Structured Documentation'],
    totalTasksCompleted: 228,
    confidenceScore: 98.6,
    priority: 'Low',
    hasPendingTasks: false
  },
  {
    id: 'browser-research-agent',
    name: 'Browser Research Agent',
    title: 'Autonomous Web Exploration & Scraping',
    role: 'researcher',
    modelId: 'llama-3.3-70b-versatile',
    avatarColor: '#06b6d4',
    accentHex: 0x06b6d4,
    systemPrompt: 'You are the Browser Research Agent. You explore live websites, follow links, extract unstructured web content, and feed grounding data directly into active agent runs.',
    status: 'idle',
    capabilities: ['DOM Extraction & Scraping', 'Tavily Search Probing', 'Link Graph Exploration', 'Real-Time Fact Ingestion'],
    totalTasksCompleted: 342,
    confidenceScore: 99.3,
    priority: 'High',
    hasPendingTasks: false
  }
];

export const INITIAL_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-1',
    title: 'Autonomous App Builder & Live Deployer',
    description: 'Generates a complete interactive WebXR/3D web app from natural language, tests the sandbox, and writes files.',
    category: 'Development',
    trigger: { type: 'manual', detail: 'Trigger on natural language app brief' },
    steps: [
      {
        stepNumber: 1,
        agentId: 'deepseek-reasoner',
        action: 'Design architectural spec and component hierarchy',
        tool: 'R1-Reasoning',
        inputTemplate: 'Analyze user requirements and plan state graph',
        dependsOn: [],
        condition: { type: 'always', label: 'Root Trigger' }
      },
      {
        stepNumber: 2,
        agentId: 'qwen-coder',
        action: 'Generate HTML5 Canvas / CSS / JS code files',
        tool: 'Code-Writer',
        inputTemplate: 'Generate self-contained interactive app files',
        dependsOn: [1],
        condition: { type: 'if_success', label: 'On Spec Approval' }
      },
      {
        stepNumber: 3,
        agentId: 'mistral-operator',
        action: 'Execute sandbox test and verify 60fps loop',
        tool: 'Sandbox-Runner',
        inputTemplate: 'Verify DOM elements and error logs',
        dependsOn: [2],
        condition: { type: 'if_verified', label: 'AST Verified' }
      }
    ],
    active: true,
    runCount: 24,
    status: 'idle'
  },
  {
    id: 'wf-2',
    title: 'Competitive AI Intelligence & Benchmark Report',
    description: 'Researches latest open-source AI weights, checks HuggingFace & Arxiv benchmarks, and compiles executive memo.',
    category: 'Intelligence',
    trigger: { type: 'interval', detail: 'Every 24 hours at 08:00 UTC' },
    steps: [
      {
        stepNumber: 1,
        agentId: 'llama-researcher',
        action: 'Execute Web Search across Arxiv and model registries',
        tool: 'Web-Search',
        inputTemplate: 'Open-weight LLM developments last 7 days',
        dependsOn: [],
        condition: { type: 'always', label: 'Scheduled 08:00 UTC' }
      },
      {
        stepNumber: 2,
        agentId: 'deepseek-reasoner',
        action: 'Evaluate architectural breakthroughs and trade-offs',
        tool: 'Deep-Analysis',
        inputTemplate: 'Compare reasoning token efficiency and inference cost',
        dependsOn: [1],
        condition: { type: 'if_confidence_gt', label: 'Confidence > 92%', threshold: 92 }
      },
      {
        stepNumber: 3,
        agentId: 'jarvis-prime',
        action: 'Synthesize executive summary and index into RAG memory',
        tool: 'Memory-Vault',
        inputTemplate: 'Produce structured briefing with key takeaways',
        dependsOn: [2],
        condition: { type: 'if_success', label: 'Synthesis Pass' }
      }
    ],
    active: true,
    runCount: 58,
    status: 'idle'
  },
  {
    id: 'wf-3',
    title: 'Automated Code Audit & Self-Healing Pipeline',
    description: 'Scans virtual workspace code files for security vulnerabilities, race conditions, and performance bottlenecks, then auto-patches them.',
    category: 'Operations',
    trigger: { type: 'event', detail: 'Triggered upon file write or commit' },
    steps: [
      {
        stepNumber: 1,
        agentId: 'qwen-coder',
        action: 'Perform AST scan and edge-case linting',
        tool: 'AST-Scanner',
        inputTemplate: 'Scan workspace files for leaks or syntax flaws',
        dependsOn: [],
        condition: { type: 'always', label: 'On Commit Hook' }
      },
      {
        stepNumber: 2,
        agentId: 'deepseek-reasoner',
        action: 'Derive optimal algorithmic fix with regression proofs',
        tool: 'Proof-Solver',
        inputTemplate: 'Provide optimal patches without breaking interfaces',
        dependsOn: [1],
        condition: { type: 'if_success', label: 'Flaws Detected' }
      },
      {
        stepNumber: 3,
        agentId: 'mistral-operator',
        action: 'Apply patch to Virtual File System and verify build',
        tool: 'File-Patcher',
        inputTemplate: 'Update target files and run smoke tests',
        dependsOn: [2],
        condition: { type: 'if_verified', label: 'Proofs Validated' }
      }
    ],
    active: true,
    runCount: 19,
    status: 'idle'
  }
];

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    type: 'document',
    title: 'DeepSeek-R1 Architecture Technical Summary',
    content: 'DeepSeek-R1 introduces pure reinforcement learning without prior supervised fine-tuning (DeepSeek-R1-Zero) that unlocks spontaneous self-verification, reflection, and extended thinking trajectories. The full R1 utilizes multi-stage cold-start data + RL for world-class reasoning on AIME and MATH-500.',
    tags: ['DeepSeek', 'Reasoning', 'Reinforcement Learning', 'RL', 'R1'],
    importance: 9,
    timestamp: Date.now() - 3600000 * 24 * 3
  },
  {
    id: 'mem-2',
    type: 'document',
    title: 'Meta Llama 3.3 70B Capabilities & Distillation',
    content: 'Meta Llama 3.3 70B matches the performance of the earlier 405B parameter model while operating at a fraction of inference cost. Utilizes group query attention (GQA), 128k context window, and extensive synthetic fine-tuning for code and research tasks.',
    tags: ['Llama', 'Meta', '70B', 'GQA', 'Open Weights'],
    importance: 8,
    timestamp: Date.now() - 3600000 * 24 * 2
  },
  {
    id: 'mem-3',
    type: 'semantic',
    title: 'Qwen 2.5 Coder Architectural Enhancements',
    content: 'Qwen 2.5 Coder models are trained on over 5.5 trillion tokens of source code, technical documentation, and synthetic repair tasks. Demonstrates 84%+ pass rates on coding benchmarks and features native support for 92 programming languages.',
    tags: ['Qwen', 'Coding', 'Alibaba', 'FullStack'],
    importance: 8,
    timestamp: Date.now() - 3600000 * 24
  },
  {
    id: 'mem-4',
    type: 'user_profile',
    title: 'Operator Profile & Preferences',
    content: 'User prefers concise, authoritative technical summaries, explicit step-by-step thinking traces when debugging code, and interactive visual prototypes over static text descriptions.',
    tags: ['User', 'Preferences', 'Tone', 'Directives'],
    importance: 10,
    timestamp: Date.now() - 3600000 * 12
  }
];

export const INITIAL_FILES: VirtualFile[] = [
  {
    path: '/index.html',
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aether AI Particle Simulator</title>
  <style>
    body { margin: 0; background: #050814; overflow: hidden; font-family: sans-serif; }
    canvas { display: block; width: 100vw; height: 100vh; }
    #hud { position: absolute; top: 16px; left: 16px; color: #38bdf8; font-family: monospace; font-size: 13px; pointer-events: none; }
  </style>
</head>
<body>
  <div id="hud">AETHER SIMULATOR v2.4 // 60 FPS // PARTICLES: 800</div>
  <canvas id="c"></canvas>
  <script src="app.js"></script>
</body>
</html>`,
    updatedAt: Date.now()
  },
  {
    path: '/app.js',
    name: 'app.js',
    language: 'javascript',
    content: `// Interactive Holographic Particle Wave built by Qwen-Synthesizer
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const particles = [];
const COUNT = 160;

for (let i = 0; i < COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: Math.random() * 2 + 1,
    color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#a855f7' : '#10b981'
  });
}

let mouse = { x: w / 2, y: h / 2 };
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.fillStyle = 'rgba(5, 8, 20, 0.25)';
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < COUNT; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    // Connect lines
    for (let j = i + 1; j < COUNT; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = \`rgba(56, 189, 248, \${(1 - dist / 100) * 0.25})\`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = p.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(animate);
}
animate();`,
    updatedAt: Date.now()
  },
  {
    path: '/src/agents/jarvisOrchestrator.ts',
    name: 'jarvisOrchestrator.ts',
    language: 'typescript',
    content: `// Jarvis Swarm Core Orchestrator
export class JarvisSwarmCore {
  private activeWorkers = 5;
  async dispatchSubtask(task: string) {
    console.log('[JARVIS] Dispatching subtask to neural swarm:', task);
    return { status: 'COMPLETED', confidence: 0.99 };
  }
}`,
    updatedAt: Date.now()
  },
  {
    path: '/src/agents/taskAutomator.ts',
    name: 'taskAutomator.ts',
    language: 'typescript',
    content: `// Autonomous CRM & Cloud Tasks Automator
export function runCloudTaskSync() {
  console.log('[AUTOMATOR] Running 12 scheduled cloud sync tasks...');
  return { syncedCount: 12, errors: 0 };
}`,
    updatedAt: Date.now()
  },
  {
    path: '/src/models/deepseekR1.config.json',
    name: 'deepseekR1.config.json',
    language: 'json',
    content: `{
  "model": "deepseek-r1",
  "temperature": 0.6,
  "top_p": 0.95,
  "reasoning_mode": "chain_of_thought",
  "max_thinking_tokens": 16384
}`,
    updatedAt: Date.now()
  },
  {
    path: '/README.md',
    name: 'README.md',
    language: 'markdown',
    content: `# MY AI CLOUD Workspace
Autonomous personal AI workspace for Sanjay Debnath.
- Multi-agent neural swarm (DeepSeek-R1, Llama 3.3, Qwen 2.5)
- Jarvis voice intelligence in English, Hindi, and Bengali
- Vector RAG Knowledge Base and Sandbox code execution`,
    updatedAt: Date.now()
  }
];
