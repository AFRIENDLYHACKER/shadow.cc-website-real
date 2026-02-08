import ServicePage from '@/components/service-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discord Bot Creation - Shadow.CC',
  description: 'Custom Discord bots with moderation, music, ticketing, economy systems, and more.',
}

export default function DiscordBotPage() {
  return (
    <ServicePage
      title="DISCORD BOT"
      subtitle="// CUSTOM BOT DEVELOPMENT"
      description="Custom Discord bots with moderation, music, ticketing, economy systems, and whatever you need. Hosted 24/7 with guaranteed uptime."
      icon="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      tiers={[
        {
          name: 'Basic Bot',
          price: '$15',
          description: 'Simple bot with core commands and basic moderation features.',
          features: ['Custom Commands', 'Basic Moderation', 'Welcome Messages', 'Role Management', 'Hosting Included'],
        },
        {
          name: 'Advanced Bot',
          price: '$40',
          description: 'Feature-rich bot with advanced systems and integrations.',
          popular: true,
          features: ['Everything in Basic', 'Ticket System', 'Leveling System', 'Music Player', 'Custom Embeds', 'Dashboard Panel'],
        },
        {
          name: 'Enterprise Bot',
          price: '$85+',
          description: 'Fully custom bot with complex features, APIs, and database integration.',
          features: ['Everything in Advanced', 'Economy System', 'API Integrations', 'Database Backend', 'Custom Dashboard', 'Ongoing Maintenance'],
        },
      ]}
      features={[
        { title: 'Moderation', desc: 'Auto-mod, word filters, mute/ban commands, and logging', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { title: 'Music', desc: 'Play music from YouTube, Spotify, and SoundCloud in voice channels', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
        { title: 'Tickets', desc: 'Support ticket system with categories, logs, and staff management', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
        { title: 'Economy', desc: 'Virtual currency, shops, gambling, and daily rewards system', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { title: '24/7 Hosting', desc: 'Your bot runs around the clock on our reliable infrastructure', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' },
        { title: 'Dashboard', desc: 'Web-based control panel to manage your bot settings remotely', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
      ]}
      processSteps={[
        'Choose a tier and describe what your bot needs',
        'We build and test your custom Discord bot',
        'Bot is deployed 24/7 on our servers',
      ]}
    />
  )
}
