all: app.py
	python app.py

remove:
	rm data/allData.db

create:
	python util/db.py
