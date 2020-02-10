# Import dependencies
import os
from flask import Flask, jsonify
from flask import render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
#from config import password
#from boto.s3.connection import S3Connection

# Flask set up  
app = Flask(__name__)

# Get config keys
database_url = os.environ.get('DATABASE_URL')    
password = os.environ.get('API_KEY')
#database_url = S3Connection(os.environ['DATABASE_URL'])
#password = S3Connection(os.environ['API_KEY'])

# Database set up
engine = create_engine(database_url)

# Reflect
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save table name
Meteorite = Base.classes.meteorites

session = Session(engine)

# Route to render template
@app.route("/")
def index():
    return render_template("index.html")
 
# Route to return meteorite info
@app.route("/api/meteorites")
def meteorites():

    # Query database
    results = session.query(Meteorite.id, Meteorite.name, Meteorite.recclass, Meteorite.mass_g, Meteorite.year, Meteorite.reclat, Meteorite.reclong).all()
    
    meteorite_list = []
    
    # Loop through and save results to list
    for result in results:
        meteorite_data = {
            "ID": result[0],
            "Name": result[1],
            "Classification": result[2],
            "Mass": result[3],
            "Year": result[4][6:-12],
            "Latitude": result[5],
            "Longitude": result[6]}
        meteorite_list.append(meteorite_data)

    
    return jsonify(meteorite_list)  
    
# Route to return largest meteorites
@app.route("/api/largest")
def largest():

    # Query database 
    results = session.query(Meteorite.id, Meteorite.name, Meteorite.recclass, Meteorite.mass_g, Meteorite.year, Meteorite.reclat, Meteorite.reclong).filter(Meteorite.mass_g != None).order_by(desc(Meteorite.mass_g)).limit(10).all()
    
    largest_list = []
    
    # Loop through and save results to list
    for result in results:
        largest_data = {
            "ID": result[0],
            "Name": result[1],
            "Classification": result[2],
            "Mass": result[3],
            "Year": result[4][6:-12],
            "Latitude": result[5],
            "Longitude": result[6]}
        largest_list.append(largest_data)

    
    return jsonify(largest_list)  
    
if __name__=="__main__":
    app.run(debug=True)