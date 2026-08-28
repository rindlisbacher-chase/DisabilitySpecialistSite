export type Insight = {
  id: string
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export const insights: Insight[] = [
  {
    id: 'social-anxiety',
    src: '/images/insights/uncomfortable-woman.png',
    alt: 'A woman sitting alone in a church pew, looking uncomfortable',
    caption: 'Social Anxiety — Sometimes disability is not obvious',
    width: 386,
    height: 256,
  },
  {
    id: 'introverts-hiding',
    src: '/images/insights/hiding-face.jpg',
    alt: 'A person covering their face with their hands',
    caption: 'Introverts — Not just shy',
    width: 493,
    height: 258,
  },
  {
    id: 'introverts-speaking',
    src: '/images/insights/overwhelmed-speaking.png',
    alt: 'A person looking overwhelmed while speaking in a group setting',
    caption: 'Introverts — Not just shy',
    width: 484,
    height: 253,
  },
  {
    id: 'sensory-1',
    src: '/images/insights/sensory-sensitivity.jpg',
    alt: 'A child experiencing sensory overload in a busy environment',
    caption: 'Sensory Sensitivity — Not just a tantrum',
    width: 708,
    height: 506,
  },
  {
    id: 'sensory-2',
    src: '/images/insights/sensory-sensitivity-2.jpg',
    alt: 'A young person reacting to overwhelming sensory input',
    caption: 'Sensory Sensitivity — Not just a tantrum',
    width: 691,
    height: 388,
  },
  {
    id: 'hidden-message-1',
    src: '/images/insights/hear-the-hidden-message.jpg',
    alt: 'A person whose expression suggests an unspoken struggle',
    caption:
      'Hear the Hidden Message — Actions are messages about what’s going on inside',
    width: 781,
    height: 411,
  },
  {
    id: 'hidden-message-2',
    src: '/images/insights/hear-the-hidden-message-alt.png',
    alt: 'Illustration encouraging listeners to notice what behavior may be communicating',
    caption:
      'Hear the Hidden Message — Actions are messages about what’s going on inside',
    width: 300,
    height: 150,
  },
  {
    id: 'neurodiversity',
    src: '/images/insights/look-beyond-the-physical.jpg',
    alt: 'People gathered in a church setting, reminding viewers to look beyond visible differences',
    caption:
      'In this day and age we need to look beyond the physical and look at neurodiversity. Autism, Learning Difficulties, Attention Deficit and Anxiety are prevalent.',
    width: 738,
    height: 391,
  },
  {
    id: 'which-has-disability',
    src: '/images/insights/which-has-disability.jpg',
    alt: 'A group of children where a disability may not be immediately apparent',
    caption:
      'Some disabilities are harder to spot — Which child has a disability?',
    width: 690,
    height: 519,
  },
]

export const hollandQuote = {
  text: 'We may not be able to alter the journey, but we can make sure no one walks it alone. Surely that is what it means to bear one another’s burdens.',
  attribution: 'Jeffrey R. Holland',
}
