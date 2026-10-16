import chalk from 'chalk';

export const cardData = {
  config: {
    formatters: {
      border: chalk.bold.blue,
      bannerName: chalk.bold.white.bgBlue,
      bannerEmail: chalk.italic.bgBlue,
      link: chalk.cyan,
    },
    padding: 2,
    margin: 1,
  },
  content: {
    name: 'Martin Doyle',
    whatami: 'Engineering leader: frontend, platforms and AI enablement',
    location: 'Maidenhead, UK',
    email: 'work@martindoyle.com',
    job: {
      title: 'AI Enablement',
      employer: 'J.P. Morgan Personal Investing',
    },
    skills: ['TypeScript', 'React', 'Microfrontends', 'GraphQL', 'CI/CD'],
    hobbies: ['DIY', 'Photography', 'Piano', 'Violin', 'Singing'],
    links: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/martindoyleuk',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MartinDoyleUK',
      },
    ],
  },
};
