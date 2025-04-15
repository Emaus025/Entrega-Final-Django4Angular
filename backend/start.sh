#!/bin/bash

# Wait for postgres
sleep 5

# Create postgres user and database
psql -U postgres -c "CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';"
psql -U postgres -c "CREATE DATABASE postgres OWNER postgres;"

# Remove existing migrations (if any)
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Create fresh migrations
python manage.py makemigrations crud1

# Apply migrations in order
python manage.py migrate auth
python manage.py migrate crud1
python manage.py migrate admin
python manage.py migrate contenttypes
python manage.py migrate sessions

# Create remaining migrations
python manage.py makemigrations instrumentos
python manage.py makemigrations partituras
python manage.py makemigrations ensambles

# Apply all remaining migrations
python manage.py migrate

# Start server
python manage.py runserver 0.0.0.0:8000