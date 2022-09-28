import chalk from 'chalk';

export const cardData = {
  config: {
    formatters: {
      primary: chalk.bold.blue,
      secondary: chalk.cyan,
      accent: chalk.bold.magenta,
    },
    padding: 1,
    margin: 1,
  },
  content: {
    name: 'Martin Doyle',
    location: 'Maidenhead, UK',
    job: {
      title: 'Principal Frontend Engineer',
      employer: 'Nutmeg',
    },
    links: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/martindoyleuk',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MartinDoyleUK',
      },
      {
        label: 'Twitter',
        url: 'https://twitter.com/MartinDoyleUK',
      },
      {
        label: 'Email',
        url: 'work@martindoyle.com',
      },
    ],
  },
};
