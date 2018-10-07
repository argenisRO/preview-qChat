FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV PRODUCTION "False"
ENV DB_HOST "db"
ENV REDIS_HOST "redis"
WORKDIR /usr/src/app
ADD requirements.txt /usr/src/app
RUN pip install -r requirements.txt
ADD . /usr/src/app