import type { Resource } from '@cds/shared'

/** Seed data for the clickable mock. Will be replaced by PocketBase. */
export const seedResources: Resource[] = [
  {
    id: '1',
    title: 'Getting Started Checklist for New Ward Specialists',
    summary:
      'A simple checklist: be set apart, attend ward council, meet families, find resources, and make a plan.',
    type: 'how-to',
    settings: ['church'],
    topics: ['general'],
    audiences: ['ward-specialist'],
    contributorCredit: 'Community contributors',
    status: 'published',
    updatedAt: '2026-06-01',
    externalUrl:
      'https://www.churchofjesuschrist.org/study/manual/my-calling-as-a-ward-disability-specialist/getting-started',
  },
  {
    id: '2',
    title: 'Questions That Help Families Feel Heard',
    summary:
      'Conversation starters such as “What is your experience at church like?” to build trust with individuals and caregivers.',
    type: 'idea',
    settings: ['church', 'home'],
    topics: ['general'],
    audiences: ['ward-specialist', 'caregivers', 'families'],
    contributorCredit: 'Community presentation themes',
    status: 'published',
    updatedAt: '2026-06-15',
  },
  {
    id: '3',
    title: 'Sample Ward Council Presentation Outline',
    summary:
      'A short outline you can adapt when introducing the Disability Specialist calling to a bishopric or ward council.',
    type: 'presentation',
    settings: ['church'],
    topics: ['general'],
    audiences: ['ward-specialist', 'stake-specialist', 'leaders'],
    status: 'published',
    updatedAt: '2026-05-20',
  },
  {
    id: '4',
    title: 'Sensory-Friendly Sacrament Meeting Ideas',
    summary:
      'Practical adjustments for lighting, seating, fidgets, and quiet spaces that many wards have found helpful.',
    type: 'idea',
    settings: ['church'],
    topics: ['autism'],
    audiences: ['ward-specialist', 'leaders', 'families'],
    status: 'published',
    updatedAt: '2026-04-12',
  },
  {
    id: '5',
    title: 'Supporting Caregivers at Home',
    summary:
      'Ideas for check-ins, respite coordination, and ministering that honors caregiver burnout without overstepping.',
    type: 'how-to',
    settings: ['home'],
    topics: ['mental-health', 'general'],
    audiences: ['caregivers', 'ward-specialist', 'families'],
    status: 'published',
    updatedAt: '2026-03-28',
  },
  {
    id: '6',
    title: 'Community Resource Mapping Worksheet',
    summary:
      'A printable worksheet to list local agencies, therapy providers, and peer supports your stake can share.',
    type: 'printable',
    settings: ['community', 'home'],
    topics: ['general'],
    audiences: ['stake-specialist', 'ward-specialist'],
    status: 'published',
    updatedAt: '2026-02-10',
  },
  {
    id: '7',
    title: 'Church Accessibility Statement (Official Link)',
    summary:
      'Link to the Church’s accessibility commitment for leaders and members—use as a reference, not as an endorsement of this site.',
    type: 'external-link',
    settings: ['church'],
    topics: ['general'],
    audiences: ['leaders', 'ward-specialist', 'stake-specialist'],
    externalUrl:
      'https://www.churchofjesuschrist.org/learn/accessibility-statement',
    status: 'published',
    updatedAt: '2026-06-01',
  },
  {
    id: '8',
    title: 'Ideas for Stake Disability Specialists',
    summary:
      'Train new specialists, support ward presentations, and counsel with stake organizations—adapted from Getting Started training themes.',
    type: 'idea',
    settings: ['church'],
    topics: ['general'],
    audiences: ['stake-specialist'],
    status: 'published',
    updatedAt: '2026-06-15',
  },
  {
    id: '9',
    title: 'Hearing Access Tips for Sunday Meetings',
    summary:
      'Microphone habits, seating, and captioning considerations that help members who are deaf or hard of hearing participate.',
    type: 'how-to',
    settings: ['church'],
    topics: ['hearing'],
    audiences: ['ward-specialist', 'leaders'],
    status: 'published',
    updatedAt: '2026-01-22',
  },
  {
    id: '10',
    title: 'Vision-Friendly Materials Checklist',
    summary:
      'Large print, contrast, and digital format tips when preparing class materials or announcements.',
    type: 'printable',
    settings: ['church', 'home'],
    topics: ['vision'],
    audiences: ['ward-specialist', 'leaders', 'families'],
    status: 'published',
    updatedAt: '2025-12-05',
  },
]
