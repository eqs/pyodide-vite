import './style.css'
import { loadPyodide } from 'pyodide';

async function initPython() {
  const pyodide = await loadPyodide();

  // This causes the error like:
  // shutil.ReadError: /tmp/tmp8g4aziasnumpy-1.26.4-cp312-cp312-pyodide_2024_0_wasm32.whl is not a zip file

  // await pyodide.loadPackage("numpy", { checkIntegrity: false });

  // This causes the error like:
  // Failed to find a valid digest in the 'integrity' attribute for resource ...

  // await pyodide.loadPackage("numpy");

  pyodide.setStdin({ error: true });
  const result = pyodide.runPython('import sys; sys.version');
  console.log(`The pyodide is ready. \n${result}`);
  return pyodide;
}
let pyodideInitPromise = initPython();

function onRunClicked() {
  async function run() {
    const pyodide = await pyodideInitPromise;
    const code = `
import numpy as np
x = np.arange(10)
    `;
    try {
      const result = pyodide.runPython(code);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  run();
}

const runButton = document.createElement('button');
runButton.innerHTML = 'Run code';
runButton.addEventListener('click', onRunClicked);

const app = document.getElementById('app');
app!.appendChild(runButton);
