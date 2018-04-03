**Containerizing Python Flask Application into Docker** 
Nagendra Gautham Gondi

Application:

The task is on containerizing the RESTful Web Services we implemented in HW2 and HW3. This can be acheieved by using Docker which is lightweighted Linux System and host the applications much easier.  
I have used flask framework with Python to create a REST API to host weather information.  
The data used is weather information of Cincinnati for the last 3 years. The attributes are  
DATE in YYYYMMDD format,  
TMAX - Maximum Temperature for the particular date,  
TMIN - Minimum Temperature for the particular date.  
 
I have used in memory to retrieve the data according to the various endpoints in the URL. 
Forecast Model used in this is averaging the corresponding temperatures of all the years in the database for a particular date.  

Also, the front end UI is designed for the RESTful webservices which takes date as the input and displays two line plots having our forecast model and the data predicted by darksky API.  
The docker image is successfully pushed to docker cloud and to download the image all we have to do is:
  
``docker pull gauthamgn/weather``
  
And once we get the image downloaded, all we have to do is run the image which starts the container. Use the below command to run the image.  
  
``docker run -d -p 8081:80 gauthamgn/weather``  
  
The application will be hosted on localhost:8081 once the above command is run.

**GET:**  
http://localhost:8081/historical/ - Retrieves the list of all the dates that are available in the database in a JSON Array.  
http://localhost:8081/historical/dateYYYYMMDD - Retrieves the Max and Min temperature for the date passed, if not available throws 404 error.  
  
**Ex:** http://localhost:8081/historical/20130101  
**Output:** {"DATE": "20130101", "TMAX": 34, "TMIN": 26}  
  
**Ex:** http://localhost:8081/historical/20190101  
**Output:** 404 - Not Found  
  
http://localhost:8081/forecast/<dateYYYYMMDD> - Retrieves the Max and Min temperature for the date passed along with the next 7 days.  
**Ex:** http://localhost:8081/forecast/20200822  
  
**POST:**  
http://localhost:8081/historical/ - To add weather information for a particular day  
Posts the temperature information with HTTP 201 Response by appending the entered information into existing JSON Array.  
  
**DELETE:**  
http://localhost:8081/historical/<dateYYYYMMDD> - Delete method to delete the temperature information for a particular day  
  
**Used Technologies:** Python 2.7, Flask, JSON, HTML, CSS, Bootstrap, Javascript, Chart.js, FontAwesome, Google Fonts, Docker.   
  
The entire functionality has been done by defining various methods for each purpose.   
Source: ``"__init__.py"`` 

The entire WSGI Setup with apache server has been setup in the docker image. There is no need of shellscript for starting the web service as I have setup WSGI with apache and remaining commands have been run in Dockerfile while building the image.  

Commands to set up Docker Container and host application in localhost:8081  

1. Start the docker.  
2. ``docker pull gauthamgn/weather``  
3. ``docker run -d -p 8081:80 gauthamgn/weather``  

**References:**   
https://docker.github.io/engine/getstarted/  
https://ianlondon.github.io/blog/deploy-flask-docker-nginx/  

------------------------------------------------------------------------------------------   
  
**Readme:** https://github.com/gautham-gn/docker-wsgi-apache-flask/edit/master/README.md
  
------------------------------------------------------------------------------------------  
