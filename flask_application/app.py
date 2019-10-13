# app.py
# Main Application
from flask import Flask, jsonify, make_response, Response
from flask_restplus import Resource, Api, fields
from database import db_session, conn
from models import BlogPost, WorldFactbook, FestivalsCount, festivals_count, FestivalDetails, AllFestivalDetails, FestivalContent
from flask import request
import requests
from datetime import datetime
from dateutil import relativedelta
from datetime import date
from flask_cors import CORS
import json
#from difflib import SequenceMatcher

application = Flask(__name__)
# For cross
cors = CORS(application, resources={r"/api/*": {"origins": "*"}})
api = Api(application,
          version='0.1',
          title='BridgingCultures',
          description='Elites project for Industrial Experience.',
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
        arg_val_start_date = request.args['start_date']
        arg_val_end_date = request.args['end_date']
        resp = requests.get('https://www.eventbriteapi.com/v3/events/search/?q=' + arg_val_name + '&sort_by=date&location.address='+ arg_val_loc + '&location.within=50km&start_date.range_start='+ arg_val_start_date + 'T00:00:01Z&start_date.range_end=' + arg_val_end_date + 'T23:59:59Z&include_adult_events=on&token=ATLOQ64ONWN4KMFL6C53&expand=organizer,venue')
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
        arg_val = request.args['ip_address']
        #arg_val_loc = request.args['location']
        resp = requests.get('https://ipinfo.io/'+arg_val+'?token=0d071e2f5f6c77')
        if resp.status_code != 200:
            # This means something went wrong.
            return {}
        response = Response(resp)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

# Festivals/Events API
@api.route('/festival_details')
class FestivalDetailsData(Resource):
    model = api.model('Model', {
        'id': fields.Integer,
        'countries': fields.String,
        'festivals': fields.String,
        'date': fields.String,
        'description': fields.String,
        'food': fields.String,
        'reference': fields.String,
        'image': fields.String,
    })

    @api.marshal_with(model, envelope='resource')
    def get(self):
        alpha_2_code = "Australia"
        arg_val = request.args['name']
        if arg_val.lower() == "China".lower():
            alpha_2_code = "China"
        elif arg_val.lower() == "India".lower():
            alpha_2_code = "India"
        elif arg_val.lower() == "Japan".lower():
            alpha_2_code = "Japan"

        #response = Response(resp)
        #response.headers['Access-Control-Allow-Origin'] = '*'
        return FestivalDetails.query.filter_by(countries=alpha_2_code).all(), 200, {'Access-Control-Allow-Origin': '*'}

# Recipe Google Custom Searc API
@api.route('/recipe_links')
class RecipeData(Resource):
    def get(self):
        #print(request.args)
        arg_val = request.args['name']
        arg_country = request.args['country']
        #print(request.args['name'])
        #print(request.args['country'])
        indian_list_api = '005263693131602275062:3wpoazmejfq'
        taste_au_api = '005263693131602275062:h5xlwjjhx60'
        asian_food_api = '005263693131602275062:yntvembfx1u'
        chinese_list_api = '005263693131602275062:kxtqmiygxv2'
        jew_food_list_api = '005263693131602275062:qj832ka7vyz'
        sbs_food_list_api = '005263693131602275062:rgazfsyjaj3'
        the_woks_of_life = '005263693131602275062:k00be44x2dy'
        cooking_simple_chinese_food = '005263693131602275062:kpxe75oc9iz'
        japanese_food_api = '005263693131602275062:mz8k4mqtvob'
        malaysian_food_api = '005263693131602275062:mua4uwhltkp'
        italian_food_api = '005263693131602275062:kwgoies5glv'
        aus_latest_food_api = '005263693131602275062:f9df0qct5xk'
        api_list_australia = [taste_au_api,aus_latest_food_api,asian_food_api,sbs_food_list_api,chinese_list_api,jew_food_list_api,indian_list_api,the_woks_of_life]
        api_list_india = [indian_list_api,asian_food_api,sbs_food_list_api,taste_au_api,chinese_list_api,jew_food_list_api,the_woks_of_life,aus_latest_food_api]
        api_list_china = [the_woks_of_life,cooking_simple_chinese_food,chinese_list_api,asian_food_api,taste_au_api,jew_food_list_api,indian_list_api,sbs_food_list_api,aus_latest_food_api]
        api_list_japan = [jew_food_list_api,japanese_food_api,asian_food_api,chinese_list_api,the_woks_of_life,cooking_simple_chinese_food,taste_au_api,indian_list_api,aus_latest_food_api]
        api_list_malaysia = [malaysian_food_api,asian_food_api,indian_list_api,chinese_list_api,cooking_simple_chinese_food,japanese_food_api,taste_au_api,sbs_food_list_api,jew_food_list_api,aus_latest_food_api]
        api_list_italy = [italian_food_api,taste_au_api,jew_food_list_api,the_woks_of_life,sbs_food_list_api,malaysian_food_api,japanese_food_api,chinese_list_api,cooking_simple_chinese_food,indian_list_api,aus_latest_food_api]
        req_listing = api_list_india
        if arg_country == "Australia" or arg_country == "Australian":
            req_listing = api_list_australia
        elif arg_country == "China" or arg_country == "Chinese":
            req_listing = api_list_china
        elif arg_country == "India" or arg_country == "Indian":
            req_listing = api_list_india
        elif arg_country == "Japan" or arg_country == "Japanese":
            req_listing = api_list_japan
        elif arg_country == "Malaysia" or arg_country == "Malaysian":
            req_listing = api_list_malaysia
        elif arg_country == "Italy" or arg_country == "Italian":
            req_listing = api_list_italy

        #arg_val_loc = request.args['location']
        #########################################
        #response.queries.request[0].totalResults > 0
        #########################################
        food_items = str(arg_val).split(", ")
        food_items = food_items[0:3]
        #print(food_items)
        food_item_list = []
        resp = {}
        for each_food_item in food_items:
            #print(each_food_item)
            for each_api in req_listing:
                #print("-----------------------------"+each_api)
                resp = requests.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc&cx='+ each_api +'&q=' + each_food_item)
                resp_status_code = resp.status_code
                response = resp.json()
                rendered_title = ""
                #print(response)
                #resp = Response(resp)
                #if int(response["queries"]["request"][0]['totalResults']) > 1:
                #    rendered_title = str(response["items"][0]["title"]).split(" |")[0]
                #print(rendered_title, flush=True)
                #and SequenceMatcher(None, each_food_item, rendered_title).ratio() > 0.5
                if resp_status_code == 200 and int(response["queries"]["request"][0]['totalResults']) > 1 and 'cse_image' in response["items"][0]["pagemap"] :
                    food_item_list.append(response)
                    break
                
        food_content = {'food_items':food_item_list}
        #print(food_content)
        resp = Response(json.dumps(food_content))
        resp.headers['Access-Control-Allow-Origin'] = '*'

        return resp

# Eventbrite Location API
@api.route('/restaurant_location')
class RestaurantLocation(Resource):
    def get(self):
        arg_val = request.args['name']
        arg_loc = request.args['location']
        #print(arg_val)
        restaurant_names = str(arg_val).split(",")
        #print(restaurant_names)
        restaurant_list = []
        resp = {}
        for each_restaurant in restaurant_names:
            #print(each_restaurant)
            resp = requests.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc&input='+each_restaurant+' '+arg_loc)
            resp_status_code = resp.status_code
            response = resp.json()
            if resp_status_code != 200:
                # This means something went wrong.
                return {}
            else:
                #print(response)
                restaurant_list.append(response)
        restaurant_content = {'restaurant_items':restaurant_list}
        #print(restaurant_content)
        resp = Response(json.dumps(restaurant_content))
        resp.headers['Access-Control-Allow-Origin'] = '*'

        return resp

# All Festivals/Events API
@api.route('/festival_content')
class AllFestivalDetailsData(Resource):
    # model = api.model('Model', {
    #     'id': fields.Integer,
    #     'countries': fields.String,
    #     'festivals': fields.String,
    #     'date': fields.String,
    #     'description': fields.String,
    #     'food': fields.String,
    #     'reference': fields.String,
    #     'image': fields.String,
    # })

    # @api.marshal_with(model, envelope='resource')
    def get(self):
        alpha_2_code = "Australia"
        arg_val = request.args['name']
        arg_year = request.args['year']
        if arg_val.lower() == "China".lower():
            alpha_2_code = "China"
        elif arg_val.lower() == "India".lower():
            alpha_2_code = "India"
        elif arg_val.lower() == "Japan".lower():
            alpha_2_code = "Japan"
        elif arg_val.lower() == "Malaysia".lower():
            alpha_2_code = "Malaysia"
        elif arg_val.lower() == "Italy".lower():
            alpha_2_code = "Italy"

        req_format = {
        "countries": "",
        "festials": "",
        "date": "",
        "description": "",
        "food": "",
        "reference": "",
        "image": "",
        "food_desc":"",
        "food_default":"",
        "celebration":"",
        "year": ""
        }
        resource_dict = {"resource": []}

        req_format_arr = ["countries", "festivals", "date", "description", "food", "reference", "image", "food_desc", "food_default", "celebration", "year"]

        #response = Response(resp)
        #response.headers['Access-Control-Allow-Origin'] = '*'
        result = db_session.query(AllFestivalDetails.countries, AllFestivalDetails.festivals, AllFestivalDetails.date, FestivalContent.description, FestivalContent.food, FestivalContent.reference, FestivalContent.image, FestivalContent.food_desc, FestivalContent.food_default, FestivalContent.celebration, AllFestivalDetails.year).filter( AllFestivalDetails.festivals == FestivalContent.festivals).filter(AllFestivalDetails.countries == alpha_2_code).filter(AllFestivalDetails.year == arg_year).all()
        # print("+++++++++++++++++++")
        # print(result[0])
        # print(dict(zip(req_format_arr, result[0])))
        for each in result:
            resource_dict["resource"].append(dict(zip(req_format_arr, each)))
        #print(type(result))
        #return AllFestivalDetails.query.filter_by(countries=alpha_2_code).all(), 200, {'Access-Control-Allow-Origin': '*'}
        #return db_session.query(AllFestivalDetails,FestivalContent).filter(AllFestivalDetails.countries == alpha_2_code).all()
        # AllFestivalDetails.id, AllFestivalDetails.countries, AllFestivalDetails.festivals, AllFestivalDetails.date, FestivalContent.description, FestivalContent.food, FestivalContent.reference, FestivalContent.image
        return resource_dict, 200, {'Access-Control-Allow-Origin': '*'}
        #db_session.query(AllFestivalDetails.countries, AllFestivalDetails.festivals, AllFestivalDetails.date, FestivalContent.description, FestivalContent.food, FestivalContent.reference, FestivalContent.image).filter( AllFestivalDetails.festivals == FestivalContent.festivals).filter(AllFestivalDetails.countries == alpha_2_code).filter(AllFestivalDetails.year == "2019").all(), 200, {'Access-Control-Allow-Origin': '*'}
        #return db_session.query(AllFestivalDetails, FestivalContent).join(FestivalContent, AllFestivalDetails.festivals == FestivalContent.festivals).filter(AllFestivalDetails.countries == alpha_2_code).filter(AllFestivalDetails.year == "2019").all()

# Today's Events/Festivals API
@api.route('/todays_list')
class TodaysFestivalList(Resource):

    def get(self):
        arg_val = request.args['date']
        if arg_val is None:
            today = date.today()
            d1 = today.strftime("%m/%d/%Y")
        else:
            today = arg_val
            d1 = today
        # mm/dd/YY
        
        print(type(d1))
        print("d1 = "+ d1)
        # Overriden for testing purpose
        #d1 = "10/27/2019"

        req_format = {
        "countries": "",
        "festials": "",
        "date": "",
        "description": "",
        "food": "",
        "reference": "",
        "image": "",
        "food_desc":"",
        "food_default":"",
        "celebration":"",
        "year": ""
        }
        resource_dict = {"resource": []}

        req_format_arr = ["countries", "festivals", "date", "description", "food", "reference", "image", "food_desc", "food_default", "celebration", "year"]

        result = db_session.query(AllFestivalDetails.countries, AllFestivalDetails.festivals, AllFestivalDetails.date, FestivalContent.description, FestivalContent.food, FestivalContent.reference, FestivalContent.image, FestivalContent.food_desc, FestivalContent.food_default, FestivalContent.celebration, AllFestivalDetails.year).filter( AllFestivalDetails.festivals == FestivalContent.festivals).filter(AllFestivalDetails.date == d1).all()
        for each in result:
            resource_dict["resource"].append(dict(zip(req_format_arr, each)))
        return resource_dict, 200, {'Access-Control-Allow-Origin': '*'}

@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    application.run(debug=True)