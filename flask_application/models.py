# models.py
# Schema models
from sqlalchemy import Table, Column, Integer, Text
from sqlalchemy.orm import mapper
from database import metadata, db_session

# Sample schema model
class BlogPost(object):
    query = db_session.query_property()
    def __init__(self, id=None, title=None, post=None):
        self.id = id
        self.title = title
        self.post = post

# Original sample schema (table)
blog_posts = Table('blog_posts', metadata,
    Column('id', Integer, primary_key=True),
    Column('title', Text),
    Column('post', Text)
)
# mapper function of original table schema and sample schema model
mapper(BlogPost, blog_posts)

# Schema class model for world factbook data
class WorldFactbook(object):
	query = db_session.query_property()
	def __init__(self, administrative_divisions=None, agriculture_products=None, background=None, climate=None, coastline=None, 
		economy_overview=None, electricity_consumption=None, ethnic_groups=None, flag_description=None, gdp=None, geograpy=None, 
		government_type=None, independence=None, industries=None, internet_country_code=None, languages=None, legal_system=None, 
		location=None, map_reference=None, military_branches=None, military_service_age=None, national_symbol=None, natural_resources=None, 
		population=None, population_below_poverty_line=None, population_growth=None, religions=None, taxes_and_revenues=None, terrain=None, 
		people=None, agriculture=None, border_countries=None, consulates=None, container_port=None, conventional_long_form=None, 
		conventional_short_form=None, dual_citizenship=None, elderly_dependancy_ratio=None, election_process=None, elevation=None, 
		forest=None, geographic_location=None, government_consumption=None, highest_court=None, household_consumption=None, 
		imports_goods_services=None, industry=None, inventory_registered_aircraft_operated=None, investment_fixed_capital=None, 
		investment_inventories=None, land=None, major_seaports=None, national_song=None, people_plurals=None, potential_support_ratio=None, 
		revenues=None, time_differences=None, urban_population=None, water=None, youth_dependency=None, id=None):
		self.administrative_divisions = administrative_divisions
		self.agriculture_products = agriculture_products
		self.background = background
		self.climate = climate
		self.coastline = coastline
		self.economy_overview = economy_overview
		self.electricity_consumption = electricity_consumption
		self.ethnic_groups = ethnic_groups
		self.flag_description = flag_description
		self.gdp = gdp
		self.geograpy = geograpy
		self.government_type = government_type
		self.independence = independence
		self.industries = industries
		self.internet_country_code = internet_country_code
		self.languages = languages
		self.legal_system = legal_system
		self.location = location
		self.map_reference = map_reference
		self.military_branches = military_branches
		self.military_service_age = military_service_age
		self.national_symbol = national_symbol
		self.natural_resources = natural_resources
		self.population = population
		self.population_below_poverty_line = population_below_poverty_line
		self.population_growth = population_growth
		self.religions = religions
		self.taxes_and_revenues = taxes_and_revenues
		self.terrain = terrain
		self.people = people
		self.agriculture = agriculture
		self.border_countries = border_countries
		self.consulates = consulates
		self.container_port = container_port
		self.conventional_long_form = conventional_long_form
		self.conventional_short_form = conventional_short_form
		self.dual_citizenship = dual_citizenship
		self.elderly_dependancy_ratio = elderly_dependancy_ratio
		self.election_process = election_process
		self.elevation = elevation
		self.forest = forest
		self.geographic_location = geographic_location
		self.government_consumption = government_consumption
		self.highest_court = highest_court
		self.household_consumption = household_consumption
		self.imports_goods_services = imports_goods_services
		self.industry = industry
		self.inventory_registered_aircraft_operated = inventory_registered_aircraft_operated
		self.investment_fixed_capital = investment_fixed_capital
		self.investment_inventories = investment_inventories
		self.land = land
		self.major_seaports = major_seaports
		self.national_song = national_song
		self.people_plurals = people_plurals
		self.potential_support_ratio = potential_support_ratio
		self.revenues = revenues
		self.time_differences = time_differences
		self.urban_population = urban_population
		self.water = water
		self.youth_dependency = youth_dependency
		self.id = id

# Original worldfactbook schema model
world_factbook = Table('world_factbook_data', metadata,
    Column("Administrative divisions", Text),
    Column("Agriculture - products", Text),
    Column("Background", Text),
    Column("Climate", Text),
    Column("Coastline", Text),
    Column("Economy - overview", Text),
    Column("Electricity - consumption", Text),
    Column("Ethnic groups", Text),
    Column("Flag description", Text),
    Column("GDP - per capita (PPP)", Text),
    Column("Geography - note", Text),
    Column("Government type", Text),
    Column("Independence", Text),
    Column("Industries", Text),
    Column("Internet country code", Text),
    Column("Languages", Text),
    Column("Legal system", Text),
    Column("Location", Text),
    Column("Map references", Text),
    Column("Military branches", Text),
    Column("Military service age and obligation", Text),
    Column("National symbol(s)", Text),
    Column("Natural resources", Text),
    Column("Population", Text),
    Column("Population below poverty line", Text),
    Column("Pop growth rate", Text),
    Column("Religions", Text),
    Column("Taxes and other revenues", Text),
    Column("Terrain", Text),
    Column("adjective", Text),
    Column("agriculture", Text),
    Column("border countries", Text),
    Column("consulate(s) general", Text),
    Column("container port(s) (TEUs)", Text),
    Column("conventional long form", Text),
    Column("conventional short form", Text, key='country_name'),
    Column("dual citizenship recognized", Text),
    Column("elderly dependency ratio", Text),
    Column("elections/appointments", Text),
    Column("elevation extremes", Text),
    Column("forest", Text),
    Column("geographic coordinates", Text),
    Column("government consumption", Text),
    Column("highest court(s)", Text),
    Column("household consumption", Text),
    Column("imports of goods and services", Text),
    Column("industry", Text),
    Column("inventory of registered aircraft operated by air carriers", Text),
    Column("investment in fixed capital", Text),
    Column("investment in inventories", Text),
    Column("land", Text),
    Column("major seaport(s)", Text),
    Column("national song", Text),
    Column("people", Text),
    Column("potential support ratio", Text),
    Column("revenues", Text),
    Column("time difference", Text),
    Column("urban population", Text),
    Column("water", Text),
    Column("youth dependency ratio", Text),
    Column('id', Integer, primary_key=True)
)

# mapper function
mapper(WorldFactbook, world_factbook)

# Schema class model for Festival Count
class FestivalsCount(object):
    query = db_session.query_property()
    def __init__(self, id=None, last_mod_date=None, count=None):
        self.id = id
        self.last_mod_date = last_mod_date
        self.count = count

# Original festival count table schema
festivals_count = Table('festivals_count', metadata,
    Column('id', Integer, primary_key=True),
    Column('last_mod_date', Text),
    Column('count', Integer)
)

# mapper function
mapper(FestivalsCount, festivals_count)

# Complete Festival Details
class FestivalDetails(object):
    query = db_session.query_property()
    def __init__(self, id=None, countries=None, festivals=None, date=None, description=None, food=None, reference=None):
        self.id = id
        self.countries = countries
        self.festivals = festivals
        self.date = date
        self.description = description
        self.food = food
        self.reference = reference

# Original Festival Details schema (table)
festival_details = Table('festival_details', metadata,
    Column('id', Integer, primary_key=True),
    Column('countries', Text),
    Column('festivals', Text),
    Column('date', Text),
    Column('description', Text),
    Column('food', Text),
    Column('reference', Text)
)
# mapper function of original table schema and festival details schema model
mapper(FestivalDetails, festival_details)