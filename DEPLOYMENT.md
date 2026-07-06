# Deploying Sky Watch

This folder is ready to run as a small hosted Python web app.

## Recommended: Render

1. Create a GitHub repository and upload the files in this folder.
2. In Render, choose **New Web Service**.
3. Connect the repository.
4. Use these settings:
   - Runtime: `Python`
   - Build command: `pip install -r requirements.txt`
   - Start command: `python live_server.py`
5. Deploy the service.
6. Open the Render URL on the wall iPad.

The app will keep your home location in that browser after you tap `Locate` or enter coordinates and refresh.

## Other Hosts

Railway, Fly.io and a small VPS can run the same app. The host must run:

```bash
python live_server.py
```

The server reads the hosted `PORT` automatically.

## Privacy Note

Avoid hard-coding your exact home coordinates into public files. Use the browser's saved location instead, or add password protection before sharing the URL publicly.
