import ServicePage from '@/components/service-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Solutions - Shadow.CC',
  description: 'Custom AI integrations, chatbots, automation tools, and intelligent systems.',
}

export default function AIPage() {
  return (
    <ServicePage
      title="AI SOLUTIONS"
      subtitle="// CUSTOM AI DEVELOPMENT"
      description="Custom AI integrations, chatbots, automation tools, and intelligent systems for your business or personal project. Powered by the latest AI models."
      icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      tiers={[
        {
          name: 'AI Chatbot',
          price: '$50',
          description: 'Custom AI chatbot for your website or Discord with trained responses.',
          features: ['Custom Training Data', 'Website or Discord Integration', 'Natural Language Processing', 'Basic Analytics', 'Hosting Included'],
        },
        {
          name: 'AI Automation',
          price: '$100',
          description: 'Automate workflows with custom AI pipelines and integrations.',
          popular: true,
          features: ['Everything in Chatbot', 'Workflow Automation', 'API Integrations', 'Data Processing', 'Custom Triggers', 'Dashboard Access'],
        },
        {
          name: 'Custom AI System',
          price: '$250+',
          description: 'Fully custom AI solution built from scratch for your specific use case.',
          features: ['Everything in Automation', 'Custom Model Training', 'Advanced Analytics', 'Multi-Platform Deploy', 'Dedicated Support', 'Ongoing Updates'],
        },
      ]}
      features={[
        { title: 'Chatbots', desc: 'Intelligent conversational AI that understands context and learns over time', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
        { title: 'Automation', desc: 'Automate repetitive tasks with AI-powered workflows and triggers', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
        { title: 'Data Analysis', desc: 'Extract insights from your data with AI-powered analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { title: 'Image Generation', desc: 'AI-powered image creation and manipulation for your projects', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { title: 'API Access', desc: 'Connect your AI to any service or platform via robust APIs', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { title: 'Custom Models', desc: 'Train AI models on your own data for specialized tasks', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
      ]}
      processSteps={[
        'Describe your AI needs and select a tier',
        'We design and build your AI solution',
        'Deploy, test, and hand off with documentation',
      ]}
    />
  )
}
