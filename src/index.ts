#!/usr/bin/env node

import chalk from 'chalk';
// import stripColor from 'strip-color';

import { cardData } from './card-data.js';

const {
  config: { formatters },
  content: {
    name,
    location,
    job: { title, employer },
    links,
  },
} = cardData;

const getLongest = (strings: string[]): number => {
  return strings.reduce(
    (longest, nextString) =>
      nextString.length > longest ? nextString.length : longest,
    0,
  );
};

const buildCardContents = (): string[] => {
  const mutableCardContents = [
    formatters.primary(name),
    `${title} @ ${employer}`,
    chalk.dim(`Based in ${location}`),
    '',
  ];

  const longestLinkLabel = getLongest(links.map(({ label }) => label));
  mutableCardContents.push(
    ...links.map(({ label, url }) => {
      const paddedLabel = `${label.padStart(longestLinkLabel)}:`;
      return `${chalk.bold(paddedLabel)} ${formatters.secondary(url)}`;
    }),
  );

  return mutableCardContents;
};

const applyBorderAndSpacing = (cardContents: string[]): string => {
  return cardContents.join('\n');
};

const constructCard = (): string => {
  const cardContents = buildCardContents();
  return applyBorderAndSpacing(cardContents);
};

const showInfo = async () => {
  const card = constructCard();
  console.log(card);
};

showInfo();
