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
    model = api.model('Model', {
        'Region': fields.String,
        'Age': fields.String,
        'Time': fields.Integer,
        'Person': fields.Integer,
        'Male': fields.Integer,
        'Female': fields.Integer,
        'id': fields.Integer
    })
    @api.marshal_with(model, envelope='resource')
    def get(self, **kwargs):
        return WorldFactbook.query.filter_by(Region='Victoria').all()

@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    application.run(debug=True)