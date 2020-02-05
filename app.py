# Import dependencies
import os
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import password

# Flask set up  
app = Flask(__name__)

# Database set up
engine = create_engine(f"postgres://rjjyvluhffgfit:{password}@ec2-54-197-34-207.compute-1.amazonaws.com:5432/ddk7ubc172h81e")

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
            "Year": result[4],
            "Latitude": result[5],
            "Longitude": result[6]}
        meteorite_list.append(meteorite_data)

    
    return jsonify(meteorite_list)  
    
if __name__=="__main__":
    app.run(debug=True)