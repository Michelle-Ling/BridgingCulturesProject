# app.py
# Main Application
from flask import Flask, jsonify, make_response, Response
from flask_restplus import Resource, Api, fields
from database import db_session, conn
from models import BlogPost, WorldFactbook, FestivalsCount, festivals_count
from flask import request
import requests
from datetime import datetime
from dateutil import relativedelta
from datetime import date
from flask_cors import CORS

application = Flask(__name__)
# For cross
cors = CORS(application, resources={r"/api/*": {"origins": "*"}})
api = Api(application,
          version='0.1',
          title='BridgingCultures',
          description='Elites project for Industrial Experience. Powered by Monash Uni.',
)

# Festivals/Events API
@api.route('/festivals')
class FestivalsData(Resource):
    model = api.model('Model', {
        'id': fields.Integer,
        'last_mod_date': fields.String,
        'count': fields.Integer,
    })

    #@api.marshal_with(model, envelope='resource')
    def get(self):
        alpha_2_code = "IN"
        arg_val = request.args['name']
        if arg_val.lower() == "China".lower():
            alpha_2_code = "CN"
        elif arg_val.lower() == "New Zealand".lower() or arg_val.lower() == "NewZealand".lower():
            alpha_2_code = "NZ"
        elif arg_val.lower() == "Sri Lanka".lower() or arg_val.lower() == "SriLanka".lower() :
            alpha_2_code = "LK"
        elif arg_val.lower() == "Malaysia".lower()  :
            alpha_2_code = "MY"
        elif arg_val.lower() == "Philippines".lower()  :
            alpha_2_code = "PH"
        elif arg_val.lower() == "United Kingdom".lower()or arg_val.lower() == "UnitedKingdom".lower() or "Britain".lower() in arg_val.lower():
            alpha_2_code = "UK"
        elif arg_val.lower() == "Viet Nam".lower() or arg_val.lower() == "Vietnam".lower() :
            alpha_2_code = "VN"
        elif arg_val.lower() == "Italy".lower():
            alpha_2_code = "IT"
        elif arg_val.lower() == "South Africa".lower() or arg_val.lower() == "Africa".lower() or arg_val.lower() == "SouthAfrica".lower():
            alpha_2_code = "ZA"
        elif arg_val.lower() == "Australia".lower():
            alpha_2_code = "AU"
        #BlogPost.query.all()
        today = date.today()
        str_today = today.strftime("%d/%m/%Y")
        result = FestivalsCount.query.all()
        #results = [ob.as_json() for ob in result]
        #print("-------------------------------------")
        last_modified_date = result[0].last_mod_date
        last_count = int(result[0].count)
        #print(result[0].last_mod_date)
        #print(result[0].count)
        #print(result.json()["resource"])
        #last_modified_date = result["resource"][0]["last_mod_date"]
        #last_count = result["resource"][0]["count"]
        mod_val = 1
        d1 = datetime.strptime(last_modified_date, "%d/%m/%Y")
        d2 = datetime.strptime(str_today, "%d/%m/%Y")
        r = relativedelta.relativedelta(d2, d1)
        if r.months == 0:
            if last_count < 999:
                mod_val = mod_val + last_count
            else:
                mod_val = -1
        if mod_val == -1:
            return {}
        else:
            resp = requests.get('https://calendarific.com/api/v2/holidays?&api_key=4cb480e8d054674a4452a25ff3b5631ae445248d&country=' + alpha_2_code + '&year=2019')
            if resp.status_code != 200:
                # This means something went wrong.
                return {}
            update_statement = festivals_count.update().where(festivals_count.c.id == 1).values(last_mod_date=str_today, count=mod_val)
            conn.execute(update_statement)
            #print(resp.json())
            #resp.headers.add('Access-Control-Allow-Origin', '*')
            response = Response(resp)
            response.headers['Access-Control-Allow-Origin'] = '*'
            #response = jsonify(resp)
            #response.status_code = 200
            #response.headers.add('Access-Control-Allow_Origin', '*')
            return response
        # [{"Column1": 1},{"Column2": "test"}]
        #values = (1, str(str_today), 1)
        #update_statement = film_table.update().where(film_table.c.year == "2016").values(title="Some2016Film")
        #conn.execute(update_statement)
        #statement = festivals_count.insert().values(id=1, last_mod_date=str_today, count=1)
        #conn.execute(statement)
        #resp = requests.get('https://calendarific.com/api/v2/holidays?&api_key=4cb480e8d054674a4452a25ff3b5631ae445248d&country='+alpha_2_code+'&year=2019')
        #if resp.status_code != 200:
            # This means something went wrong.
        #return FestivalsCount.query.all()
        #return(resp.json())

# Testing API
@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

# Another Testing API
@api.route('/blog_posts')
class BlogPosts(Resource):
    model = api.model('Model', {
        'id': fields.Integer,
        'title': fields.String,
        'post': fields.String,
    })
    @api.marshal_with(model, envelope='resource')
    def get(self, **kwargs):
        return BlogPost.query.all()

# World Factbook data API
@api.route('/world_factbook_data')
class WorldFactbookData(Resource):
    # def get(self):
    #     if 'name' in request.args:
    #         return 'Hello ' + request.args['name']
    #     else:
    #         return 'Hello John Doe'
    #model = api.model('Model', {
    #    'Region': fields.String,
    #    'Age': fields.String,
    #    'Time': fields.Integer,
    #    'Person': fields.Integer,
    #    'Male': fields.Integer,
    #    'Female': fields.Integer,
    #    'id': fields.Integer
    #})
    #@api.marshal_with(model, envelope='resource')
    #def get(self):
    #     if 'name' in request.args:
    #         return WorldFactbook.query.filter_by(Region=request.args['name']).first()
    #     else:
    #        return WorldFactbook.query.filter_by(Region='Victoria').first()
        #return WorldFactbook.query.filter_by(Region='Victoria').all()
    model = api.model('Model', {
    #    'Region': fields.String,
    #    'Age': fields.String,
    #    'Time': fields.Integer,
    #    'Person': fields.Integer,
    #    'Male': fields.Integer,
    #    'Female': fields.Integer,
    #    'id': fields.Integer
        "Administrative divisions": fields.String,
        "Agriculture - products": fields.String,
        "Background": fields.String,
        "Climate": fields.String,
        "Coastline": fields.String,
        "Economy - overview": fields.String,
        "Electricity - consumption": fields.String,
        "Ethnic groups": fields.String,
        "Flag description": fields.String,
        "GDP - per capita (PPP)": fields.String,
        "Geography - note": fields.String,
        "Government type": fields.String,
        "Independence": fields.String,
        "Industries": fields.String,
        "Internet country code": fields.String,
        "Languages": fields.String,
        "Legal system": fields.String,
        "Location": fields.String,
        "Map references": fields.String,
        "Military branches": fields.String,
        "Military service age and obligation": fields.String,
        "National symbol(s)": fields.String,
        "Natural resources": fields.String,
        "Population": fields.String,
        "Population below poverty line": fields.String,
        "Pop growth rate": fields.String,
        "Religions": fields.String,
        "Taxes and other revenues": fields.String,
        "Terrain": fields.String,
        "adjective": fields.String,
        "agriculture": fields.String,
        "border countries": fields.String,
        "consulate(s) general": fields.String,
        "container port(s) (TEUs)": fields.String,
        "conventional long form": fields.String,
        "conventional short form": fields.String,
        "dual citizenship recognized": fields.String,
        "elderly dependency ratio": fields.String,
        "elections/appointments": fields.String,
        "elevation extremes": fields.String,
        "forest": fields.String,
        "geographic coordinates": fields.String,
        "government consumption": fields.String,
        "highest court(s)": fields.String,
        "household consumption": fields.String,
        "imports of goods and services": fields.String,
        "industry": fields.String,
        "inventory of registered aircraft operated by air carriers": fields.String,
        "investment in fixed capital": fields.String,
        "investment in inventories": fields.String,
        "land": fields.String,
        "major seaport(s)": fields.String,
        "national song": fields.String,
        "people": fields.String,
        "potential support ratio": fields.String,
        "revenues": fields.String,
        "time difference": fields.String,
        "urban population": fields.String,
        "water": fields.String,
        "youth dependency ratio": fields.String,
        'id': fields.Integer
    })
    @api.marshal_with(model, envelope='resource')
    def get(self):
         if 'name' in request.args:
             return WorldFactbook.query.filter_by(country_name=request.args['name']).first()
         else:
            return WorldFactbook.query.filter_by(country_name='Italy').first()
        #return WorldFactbook.query.filter_by(Region='Victoria').all()

# Eventbrite API
@api.route('/eventbrite')
class EventbriteData(Resource):
    def get(self):
        arg_val_name = request.args['festival_name']
        arg_val_loc = request.args['location']
        resp = requests.get('https://www.eventbriteapi.com/v3/events/search/?q=' + arg_val_name + '&sort_by=date&location.address='+ arg_val_loc + '&include_adult_events=on&token=ATLOQ64ONWN4KMFL6C53&expand=organizer,venue')
        if resp.status_code != 200:
            # This means something went wrong.
            return {}
        #print(resp.json())
        #resp.headers.add('Access-Control-Allow-Origin', '*')
        response = Response(resp)
        response.headers['Access-Control-Allow-Origin'] = '*'
        #response = jsonify(resp)
        #response.status_code = 200
        #response.headers.add('Access-Control-Allow_Origin', '*')
        return response

# Eventbrite Location API
@api.route('/eventbrite/location')
class EventbriteData(Resource):
    def get(self):
        arg_val = request.args['venue_id']
        #arg_val_loc = request.args['location']
        resp = requests.get('https://www.eventbriteapi.com/v3/venues/' + arg_val + '/?token=ATLOQ64ONWN4KMFL6C53')
        if resp.status_code != 200:
            # This means something went wrong.
            return {}
        #print(resp.json())
        #resp.headers.add('Access-Control-Allow-Origin', '*')
        response = Response(resp)
        response.headers['Access-Control-Allow-Origin'] = '*'
        #response = jsonify(resp)
        #response.status_code = 200
        #response.headers.add('Access-Control-Allow_Origin', '*')
        return response

@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    application.run(debug=True)