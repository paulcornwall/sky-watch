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

## Optional Flight Times

For scheduled/estimated departure and arrival times, add an Aviationstack API key in Render:

1. Open your Render web service.
2. Go to **Environment**.
3. Add `AVIATIONSTACK_API_KEY`.
4. Paste your Aviationstack key as the value.
5. Redeploy.

Without this key, Sky Watch still uses live ADS-B position feeds and ADSBDB route lookup where available, but many flights will show `Flight times unavailable`.

## Other Hosts

Railway, Fly.io and a small VPS can run the same app. The host must run:

```bash
python live_server.py
```

The server reads the hosted `PORT` automatically.

## Privacy Note

Avoid hard-coding your exact home coordinates into public files. Use the browser's saved location instead, or add password protection before sharing the URL publicly.
