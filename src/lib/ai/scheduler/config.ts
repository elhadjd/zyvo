import type { AgentCode } from '../types';

export interface ScheduleEntry {
  agent: AgentCode;
  time: string;
  jobType: string;
}

export const DEFAULT_SCHEDULE: ScheduleEntry[] = [
  { agent: 'research', time: '06:00', jobType: 'research_content' },
  { agent: 'knowledge_organizer', time: '08:00', jobType: 'organize_knowledge' },
  { agent: 'content_writer', time: '10:00', jobType: 'generate_article' },
  { agent: 'seo_optimizer', time: '12:00', jobType: 'optimize_seo' },
  { agent: 'fact_checker', time: '14:00', jobType: 'fact_check' },
  { agent: 'editor', time: '15:00', jobType: 'edit_article' },
  { agent: 'publisher', time: '16:00', jobType: 'publish_article' },
];

export function getScheduleForCountry(
  customConfig?: Record<string, string>
): ScheduleEntry[] {
  if (!customConfig || Object.keys(customConfig).length === 0) {
    return DEFAULT_SCHEDULE;
  }

  return DEFAULT_SCHEDULE.map((entry) => ({
    ...entry,
    time: customConfig[entry.agent] ?? entry.time,
  }));
}

export function getCurrentScheduledJobs(
  schedule: ScheduleEntry[],
  currentTime = new Date()
): ScheduleEntry[] {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  return schedule.filter((entry) => {
    const [h, m] = entry.time.split(':').map(Number);
    const entryMinutes = h * 60 + m;
    return Math.abs(currentMinutes - entryMinutes) <= 30;
  });
}
