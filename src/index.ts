#!/usr/bin/env node

import chalk from 'chalk';
import stripColor from 'strip-color';

import { cardData } from './card-data.js';

const {
  config: { formatters, padding, margin },
  content: {
    name,
    whatami,
    location,
    email,
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

const getLinkLines = (): string[] => {
  const longestLinkLabel = getLongest(links.map(({ label }) => label));
  return links.map(({ label, url }) => {
    const paddedLabel = `${`${label}:`.padEnd(longestLinkLabel + 1)}`;
    return `${chalk.bold(paddedLabel)} ${formatters.link(url)}`;
  });
};

const constructCard = (): string => {
  const rawLinkLines = getLinkLines();
  const longestLine = getLongest([name, whatami, location, email, title, employer, ...rawLinkLines.map((line) => stripColor(line))]);
  const marginLine = '\n'.repeat(margin);
  const marginCol = ' '.repeat(margin);
  const paddingCol = ' '.repeat(padding);

  const headerPadding = [
    formatters.border(`${marginCol}`),
    formatters.bannerName(' '.repeat(longestLine + padding * 2 + 2)),
    formatters.border(`${marginCol}`),
  ].join('');
  const nameLine = [
    formatters.border(`${marginCol}`),
    formatters.bannerName(
      `${paddingCol}${name.padEnd(longestLine)}  ${paddingCol}`,
    ),
    formatters.border(`${marginCol}`),
  ].join('');
  const whatamiLine = [
    formatters.border(`${marginCol}`),
    formatters.bannerName(
      `${paddingCol}${whatami.padEnd(longestLine)}  ${paddingCol}`,
    ),
    formatters.border(`${marginCol}`),
  ].join('');
  const emailLine = [
    formatters.border(`${marginCol}`),
    formatters.bannerEmail(
      `${paddingCol}${email.padEnd(longestLine)}  ${paddingCol}`,
    ),
    formatters.border(`${marginCol}`),
  ].join('');
  const blankLine = [
    formatters.border(`${marginCol}║`),
    ' '.repeat(longestLine + padding * 2),
    formatters.border(`║${marginCol}`),
  ].join('');
  const jobLine = [
    formatters.border(`${marginCol}║`),
    paddingCol,
    `${title} @ ${employer}`.padEnd(longestLine),
    paddingCol,
    formatters.border(`║${marginCol}`),
  ].join('');
  const locationLine = [
    formatters.border(`${marginCol}║`),
    paddingCol,
    chalk.dim(`Based in ${location}`.padEnd(longestLine)),
    paddingCol,
    formatters.border(`║${marginCol}`),
  ].join('');
  const bottomLine = formatters.border(
    [
      marginCol,
      '╚',
      '═'.repeat(longestLine + padding * 2),
      '╝',
      marginCol,
    ].join(''),
  );

  const linkLines = rawLinkLines.map((nextLinkLine) => {
    const numSpaces = longestLine - stripColor(nextLinkLine).length;
    const afterSpaces = ' '.repeat(numSpaces);
    return [
      formatters.border(`${marginCol}║`),
      paddingCol,
      nextLinkLine,
      afterSpaces,
      paddingCol,
      formatters.border(`║${marginCol}`),
    ].join('');
  });

  return [
    marginLine,
    headerPadding,
    nameLine,
    whatamiLine,
    emailLine,
    headerPadding,
    blankLine,
    jobLine,
    locationLine,
    blankLine,
    ...linkLines,
    blankLine,
    bottomLine,
    marginLine,
  ].join('\n');
};

const showInfo = async () => {
  const card = constructCard();
  console.log(card);
};

showInfo();
