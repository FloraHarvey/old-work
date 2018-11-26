import readline from 'readline';
import { price } from './priceComparison';
import { usage } from './usageCalculator';
import { outputPlans, outputMessage } from '../outputter';

// object containing available commands mapping to:
// 1. usage that is displayed to the user,
// 2. a function checking that provided args are valid returning bool,
// 3. the function to execute if valid args have been given
const COMMANDS = {
  exit: {
    usage: 'exit',
    validArgs: (args) => !args.length,
    execute: (_args) => (_plans) => process.exit()
  },
  price: {
    usage: 'price ANNUAL_USAGE',
    validArgs: ([consumption, ...rest]) => !isNaN(consumption) && !rest.length,
    execute: ([consumption]) => (plans) => outputPlans(price(consumption, plans)),
  },
  usage: {
    usage: 'usage SUPPLIER_NAME PLAN_NAME SPEND',
    validArgs: ([supplierName, planName, spend]) => {
      return typeof supplierName === 'string' && typeof planName === 'string' && !isNaN(spend)
    },
    execute: ([supplierName, planName, spend]) => (plans) => {
      return outputMessage(usage(supplierName, planName, spend, plans));
    }
  }
}

export const readInput = (parseLine, plans) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', line => parseLine(line, plans));
}

export const parseInput = (input, plans) => {
  const [command, ...args] = input.toString().trim().split(' ');
  _maybeExecuteCommand(command, args, plans);
}

const _maybeExecuteCommand = (command, args, plans) => {
  _areCommandAndArgsValid(command, args)
  ? _executeCommand(command, args, plans)
  : _displayUsage();
}

const _executeCommand = (command, args, plans) => COMMANDS[command].execute(args)(plans);

const _areCommandAndArgsValid = (command, args) => COMMANDS[command] && COMMANDS[command].validArgs(args);

const _displayUsage = () => {
  outputMessage('Invalid command, please use one of the following available commands:\n');
  Object.keys(COMMANDS).forEach(command => outputMessage(`${COMMANDS[command].usage}`));
}
