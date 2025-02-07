import chalk from 'chalk';

function redConsoleError(msg: string) {
  console.error(chalk.red(msg));
}

process.on('unhandledRejection', (reason: string, promise: Promise<unknown>) => {
  redConsoleError('\nAn unhandled rejection has occurred inside Forge:');
  redConsoleError(reason.toString());
  redConsoleError('\nElectron Forge was terminated. Location:');
  redConsoleError(JSON.stringify(promise));
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  if (err && err.message && err.stack) {
    redConsoleError('\nAn unhandled exception has occurred inside Forge:');
    redConsoleError(err.message);
    redConsoleError(err.stack);
  } else {
    redConsoleError('\nElectron Forge was terminated:');
    redConsoleError(typeof err === 'string' ? err : JSON.stringify(err));
  }
  process.exit(1);
});
