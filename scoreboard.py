from flask import Flask, jsonify
app = Flask(__name__, static_url_path='')

import gspread
import getpass

email = 'vergenzt@gmail.com'
password = 'ctqhdojganawaejz'
spreadsheet_name = 'Scoreboard 2015'
worksheet_name = 'Scoreboard'

# Connect to Drive
account = gspread.login(email, password)
spreadsheet = account.open(spreadsheet_name)
worksheet = spreadsheet.worksheet(worksheet_name)

def get_data():
    'Get the scoreboard data from Google Drive.'
    return worksheet.get_all_values()

@app.route('/scores.json')
def scores():
    data = get_data()
    columns = data[0]
    entries = filter(lambda e: e[2]!=None, data[1:])
    return jsonify({'columns': columns, 'entries': entries})

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__=='__main__':
    app.run('0.0.0.0')

