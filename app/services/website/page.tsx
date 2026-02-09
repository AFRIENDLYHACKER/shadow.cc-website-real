import ServicePage from '@/components/service-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Creation - Shadow.CC',
  description: 'Custom website design and development. From landing pages to full web applications.',
}

export default function WebsitePage() {
  return (
    <ServicePage
      title="WEBSITE CREATION"
      subtitle="// CUSTOM WEB DEVELOPMENT"
      description="Custom website design and development tailored to your needs. From landing pages to full web applications with modern tech stacks."
      icon="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      tiers={[
        {
          name: 'Landing Page',
          price: '$25',
          description: 'Single page website with modern design and responsive layout.',
          features: ['1 Page Design', 'Mobile Responsive', 'Contact Form', 'Basic SEO', 'Hosting Setup'],
        },
        {
          name: 'Multi-Page Site',
          price: '$80',
          description: 'Full website with multiple pages, custom functionality, and CMS.',
          popular: true,
          features: ['Up to 5 Pages', 'Custom Design', 'CMS Integration', 'Advanced SEO', 'Analytics Setup', 'Hosting Included'],
        },
        {
          name: 'Web Application',
          price: '$175+',
          description: 'Full-stack web application with authentication, database, and custom features.',
          features: ['Unlimited Pages', 'Full-Stack Development', 'User Authentication', 'Database Integration', 'API Development', 'Ongoing Support'],
        },
      ]}
      features={[
        { title: 'Modern Design', desc: 'Clean, professional designs built with the latest frameworks and tools', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
        { title: 'Responsive', desc: 'Fully responsive across all devices - desktop, tablet, and mobile', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
        { title: 'Fast Loading', desc: 'Optimized performance with fast load times and smooth interactions', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { title: 'SEO Optimized', desc: 'Built-in search engine optimization so your site ranks higher', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { title: 'Secure', desc: 'SSL certificates, secure coding practices, and data protection', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { title: 'Hosting', desc: 'We handle deployment and hosting so you do not have to worry', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' },
      ]}
      processSteps={[
        'Choose a tier and describe your project',
        'We discuss details and start building',
        'Receive your finished website with hosting',
      ]}
    />
  )
}
