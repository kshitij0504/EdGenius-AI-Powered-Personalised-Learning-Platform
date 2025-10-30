module.exports = {
  apps: [
    {
      name: "client",
      cwd: "./client",
      script: "npm",
      args: "run dev",
    },
    {
      name: "server",
      cwd: "./server",
      script: "npm",
      args: "run dev",
    },
    {
      name: "aiml_server_updated",
      cwd: "./aiml_server_updated",
      script: "./venv/bin/python",  // use the venv python directly
      args: ["-m", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
      interpreter: "none",          // prevents PM2 from wrapping it with Node
      watch: ["app"],               // optional: auto-reload when code changes
      env: {
        PYTHONUNBUFFERED: "1"      // optional: real-time logging
      },
    },
  ],
};
