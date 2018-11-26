import { readInput, parseInput } from './logic/inputParser';

const plans = JSON.parse(process.argv[2]);

readInput(parseInput, plans);
