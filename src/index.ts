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
  const longestLine = getLongest([
    name,
    whatami,
    location,
    email,
    title,
    employer,
    ...rawLinkLines.map((line) => stripColor(line)),
  ]);
  const marginLines = Array.from({ length: margin }, () => '');
  const marginCol = ' '.repeat(margin);
  const paddingCol = ' '.repeat(padding);
  const innerWidth = longestLine + padding * 2;

  // In colour, the blue banner is the card's top edge and spans the border columns. Without
  // colour (NO_COLOR, a pipe, a CI log) the banner would vanish and leave the box open, so
  // box-drawing characters frame it instead, with a divider under it.
  const hasColour = chalk.level > 0;
  const borderLine = (left: string, fill: string, right: string): string =>
    formatters.border(
      `${marginCol}${left}${fill.repeat(innerWidth)}${right}${marginCol}`,
    );
  const bannerLine = (
    text: string,
    format: (value: string) => string,
  ): string =>
    hasColour
      ? [
          marginCol,
          format(`${paddingCol} ${text.padEnd(longestLine)}${paddingCol} `),
          marginCol,
        ].join('')
      : `${marginCol}║${paddingCol}${text.padEnd(
          longestLine,
        )}${paddingCol}║${marginCol}`;

  const topLine = borderLine('╔', '═', '╗');
  const headerPadding = bannerLine('', formatters.bannerName);
  const nameLine = bannerLine(name, formatters.bannerName);
  const whatamiLine = bannerLine(whatami, formatters.bannerName);
  const emailLine = bannerLine(email, formatters.bannerEmail);
  const dividerLine = borderLine('╠', '═', '╣');
  const blankLine = [
    formatters.border(`${marginCol}║`),
    ' '.repeat(innerWidth),
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
  const bottomLine = borderLine('╚', '═', '╝');

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
    ...marginLines,
    ...(hasColour ? [] : [topLine]),
    headerPadding,
    nameLine,
    whatamiLine,
    emailLine,
    headerPadding,
    ...(hasColour ? [] : [dividerLine]),
    blankLine,
    jobLine,
    locationLine,
    blankLine,
    ...linkLines,
    blankLine,
    bottomLine,
    ...marginLines,
  ].join('\n');
};

const showInfo = async () => {
  const card = constructCard();
  console.log(card);
};

showInfo();
