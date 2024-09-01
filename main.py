import json
import os
from dotenv import load_dotenv
import websocket
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import threading
import time

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app)

dataset = "binance"
tickers = ["BNB/JPY"]
api_key = os.getenv("API_KEY")


@app.route("/")
def index():
    return render_template("index.html")


def on_message(wsapp, message):
    print(f"Message: {message}")
    socketio.emit("new_message", message)


def on_error(wsapp, error):
    print(f"Error: {error}")


def on_close(wsapp, close_status_code, close_msg):

    print("Connection is closed")


def on_open(wsapp):
    print("Connection is opened")
    subscribe(wsapp, dataset, tickers)


def subscribe(wsapp, dataset, tickers):
    sub_request = {
        "event": "subscribe",
        "dataset": dataset,
        "tickers": tickers,
        "channel": "bars",
        "frequency": "1s",
        "aggregation": "1m",
    }
    wsapp.send(json.dumps(sub_request))


def start_ws_client():
    while True:
        try:
            ws = websocket.WebSocketApp(
                f"wss://ws.finazon.io/v1?apikey={api_key}",
                on_open=on_open,
                on_message=on_message,
                on_error=on_error,
                on_close=on_close,
            )
            ws.run_forever(ping_interval=30, ping_timeout=10)
        except Exception as e:
            print(f"WebSocket connection error: {e}")
        time.sleep(5)  # Wait before reconnecting


if __name__ == "__main__":
    # Start WebSocket client in a separate thread
    ws_thread = threading.Thread(target=start_ws_client)
    ws_thread.start()

    # Start Flask server
    socketio.run(app, debug=True)
