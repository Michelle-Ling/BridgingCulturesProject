# database.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine('postgres://postgres:AppleOrange!234@postgres-instance.cbhgihzkp3yp.us-east-2.rds.amazonaws.com:5432/bridgingcultures', convert_unicode=True)
metadata = MetaData()
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
conn = engine.connect()
def init_db():
    metadata.create_all(bind=engine)