release: python manage.py makemigrations
release: python manage.py migrate

web: gunicorn flexpay.wsgi --log-file -