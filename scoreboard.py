from flask import Flask, render_template
app = Flask(__name__)

import gspread
import getpass

# Connect to Drive
account = gspread.login(raw_input('Email: '), getpass.getpass())
spreadsheet = account.open("Freshman Programming Competition 2013")
worksheet = spreadsheet.worksheet("Scoreboard")

def get_data():
    'Get the scoreboard data from Google Drive.'
    return worksheet.get_all_values()

@app.route('/')
def scoreboard():
    data = get_data()
    columns = data[0]
    entries = data[1:]
    return render_template('scoreboard.html', columns=columns, entries=entries)

if __name__=='__main__':
    app.run()

