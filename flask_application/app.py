# app.py
from flask import Flask
from flask_restplus import Resource, Api, fields
from database import db_session
from models import BlogPost, WorldFactbook
from flask import request

application = Flask(__name__)
api = Api(application,
          version='0.1',
          title='Our sample API',
          description='This is our sample API',
)

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

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

@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    application.run(debug=True)