FROM python:3.6
ENV PYTHONUNBUFFERED 1
ENV PRODUCTION "False"
WORKDIR /usr/src/app
ADD requirements.txt /usr/src/app
RUN pip install -r requirements.txt
ADD . /usr/src/app