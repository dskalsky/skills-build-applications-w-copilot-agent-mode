import { app } from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();
