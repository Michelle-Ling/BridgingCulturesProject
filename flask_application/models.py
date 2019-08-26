# models.py
from sqlalchemy import Table, Column, Integer, Text
from sqlalchemy.orm import mapper
from database import metadata, db_session

class BlogPost(object):
    query = db_session.query_property()
    def __init__(self, id=None, title=None, post=None):
        self.id = id
        self.title = title
        self.post = post

blog_posts = Table('blog_posts', metadata,
    Column('id', Integer, primary_key=True),
    Column('title', Text),
    Column('post', Text)
)

mapper(BlogPost, blog_posts)

class WorldFactbook(object):
	query = db_session.query_property()
	def __init__(self, region=None, age=None, time=None, person=None, male=None, female=None, id=None):
		self.region = region
		self.age = age
		self.time = time
		self.person = person
		self.male = male
		self.female = female
		self.id = id

world_factbook = Table('nom_child_data', metadata,
	Column('Region', Text),
    Column('Age', Text),
    Column('Time', Text),
    Column('Person', Text),
    Column('Male', Text),
    Column('Female', Text),
    Column('id', Integer, primary_key=True)
)

mapper(WorldFactbook, world_factbook)