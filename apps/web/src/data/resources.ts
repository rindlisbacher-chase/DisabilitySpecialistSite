import type { Audience, Disability, Resource } from '@cds/shared'

/** Fallback taxonomy when PocketBase is unavailable. */
export const seedDisabilities: Disability[] = [
  {
    id: 'dis-autism',
    name: 'Autism',
    description:
      'May affect language, behavior, social skills, and communication.',
    sortOrder: 1,
  },
  {
    id: 'dis-chronic',
    name: 'Chronic illness / medical disabilities',
    description: 'May affect health, energy, and quality of life.',
    sortOrder: 2,
  },
  {
    id: 'dis-hearing',
    name: 'Hearing loss & deafness',
    description: 'Affects hearing and verbal communication.',
    sortOrder: 3,
  },
  {
    id: 'dis-general',
    name: 'General',
    description: 'Broad inclusion and calling support.',
    sortOrder: 99,
  },
]

export const seedAudiences: Audience[] = [
  { id: 'aud-primary', name: 'Primary', description: '3–11', sortOrder: 1 },
  { id: 'aud-youth', name: 'Youth', description: '11–17', sortOrder: 2 },
  {
    id: 'aud-young-adult',
    name: 'Young Adult',
    description: '18–35',
    sortOrder: 3,
  },
  { id: 'aud-leaders', name: 'Leaders', sortOrder: 6 },
  { id: 'aud-parents', name: 'Parents', sortOrder: 5 },
]

/** Fallback sample resources when PocketBase is unavailable. */
export const seedResources: Resource[] = [
  {
    id: '1',
    name: 'Getting Started Checklist for New Ward Specialists',
    summary:
      'A simple checklist: be set apart, attend ward council, meet families, find resources, and make a plan.',
    type: 'printable',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!],
    author: 'Community contributors',
    status: 'published',
    updatedAt: '2026-06-01',
    link: 'https://www.churchofjesuschrist.org/study/manual/my-calling-as-a-ward-disability-specialist/getting-started',
  },
  {
    id: '2',
    name: 'Questions That Help Families Feel Heard',
    summary:
      'Conversation starters such as “What is your experience at church like?” to build trust with individuals and caregivers.',
    type: 'talk',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!, seedAudiences[4]!],
    author: 'Community presentation themes',
    status: 'published',
    updatedAt: '2026-06-15',
  },
  {
    id: '3',
    name: 'Sample Ward Council Presentation Outline',
    summary:
      'A short outline you can adapt when introducing the Disability Specialist calling to a bishopric or ward council.',
    type: 'presentation',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!],
    status: 'published',
    updatedAt: '2026-05-20',
  },
  {
    id: '4',
    name: 'Sensory-Friendly Sacrament Meeting Ideas',
    summary:
      'Practical adjustments for lighting, seating, fidgets, and quiet spaces that many wards have found helpful.',
    type: 'printable',
    disabilities: [seedDisabilities[0]!],
    audiences: [seedAudiences[3]!, seedAudiences[4]!],
    status: 'published',
    updatedAt: '2026-04-12',
  },
  {
    id: '5',
    name: 'Supporting Caregivers at Home',
    summary:
      'Ideas for check-ins, respite coordination, and ministering that honors caregiver burnout without overstepping.',
    type: 'printable',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[4]!],
    status: 'published',
    updatedAt: '2026-03-28',
  },
  {
    id: '6',
    name: 'Community Resource Mapping Worksheet',
    summary:
      'A printable worksheet to list local agencies, therapy providers, and peer supports your stake can share.',
    type: 'printable',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!],
    status: 'published',
    updatedAt: '2026-02-10',
  },
  {
    id: '7',
    name: 'Church Accessibility Statement (Official Link)',
    summary:
      'Link to the Church’s accessibility commitment for leaders and members—use as a reference, not as an endorsement of this site.',
    type: 'video',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!],
    link: 'https://www.churchofjesuschrist.org/learn/accessibility-statement',
    status: 'published',
    updatedAt: '2026-06-01',
  },
  {
    id: '8',
    name: 'Ideas for Stake Disability Specialists',
    summary:
      'Train new specialists, support ward presentations, and counsel with stake organizations—adapted from Getting Started training themes.',
    type: 'talk',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!],
    status: 'published',
    updatedAt: '2026-06-15',
  },
  {
    id: '9',
    name: 'Hearing Access Tips for Sunday Meetings',
    summary:
      'Microphone habits, seating, and captioning considerations that help members who are deaf or hard of hearing participate.',
    type: 'printable',
    disabilities: [seedDisabilities[2]!],
    audiences: [seedAudiences[3]!],
    status: 'published',
    updatedAt: '2026-01-22',
  },
  {
    id: '10',
    name: 'Vision-Friendly Materials Checklist',
    summary:
      'Large print, contrast, and digital format tips when preparing class materials or announcements.',
    type: 'printable',
    disabilities: [seedDisabilities[3]!],
    audiences: [seedAudiences[3]!, seedAudiences[4]!],
    status: 'published',
    updatedAt: '2025-12-05',
  },
]
