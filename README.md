# Counter Chrome Extension with Flask Backend  

This project is a Chrome extension that connects to a Flask backend with an SQLite database. Pressing a button in the extension increments a counter, and the updated value is displayed on a webpage.

## Features  

- **Chrome Extension**: A simple popup with a button to increment a counter.  
- **Flask Backend**: Stores the counter in an SQLite database.  
- **Live Updates**: Displays the counter value on a webpage.  
- **Cross-Origin Requests (CORS)**: Ensures communication between the extension and backend.  

## Installation  

### 1. Set Up the Flask Backend  

#### Install Dependencies  

Ensure you have Python installed, then set up a virtual environment:  

```sh  
python -m venv venv  
source venv/bin/activate  # On Windows, use venv\Scripts\activate  
pip install flask flask-cors sqlite3  
```  

#### Run the Server  

```sh  
python server.py  
```  

By default, the server runs on `http://127.0.0.1:5000`.  

### 2. Load the Chrome Extension  

1. Open Chrome and go to `chrome://extensions/`.  
2. Enable **Developer mode** (top-right corner).  
3. Click **Load unpacked** and select the `extension/` folder.  
4. The extension should now appear in the Chrome toolbar.  

## Usage  

- Click the extension button to increment the counter.  
- Open `http://127.0.0.1:5000` in your browser to see the counter update.  

## Troubleshooting  

- **"Method Not Allowed" error**: Ensure the Flask server is running.  
- **CORS issues**: Make sure `flask-cors` is installed and enabled.  
- **Chrome permissions error**: Check `manifest.json` for correct permissions.  

