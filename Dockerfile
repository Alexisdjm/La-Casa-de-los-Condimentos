FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY /frontend_/package.json package.json
RUN npm install
#npm install -g typescript

FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY /frontend_ .

RUN npm run build

# base image  
FROM python:3.8 as deploy   
# setup environment variable  
ENV DockerHOME=/home/app/webapp  

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN pip install --upgrade pip  

COPY --from=builder /app/build /home/app/webapp/build

# copy whole project to your docker home directory. 
COPY /backend $DockerHOME
# run this command to install all dependencies  
RUN pip install -r requirements.txt  
# port where the Django app runs  
EXPOSE 8000  
# start server  
CMD python manage.py runserver  