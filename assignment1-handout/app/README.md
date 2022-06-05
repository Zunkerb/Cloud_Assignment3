# Assignment 3

1) Drew Klepfer and Ben Zunker

2) ALB: https://A3LoadBalancer3-625178038.us-west-2.elb.amazonaws.com 

3) The most challenging part of this assignment was deploying to ECS Fargate and getting a link through the alb that works.
    We can connect to the website through http and receive a 400 error, letting us know the http was sent to https. 
    When we try to connect with https however, it never loads. While we did end up getting our tasks to run, the 
    app was still not accessible through the link. 
    ![image](https://user-images.githubusercontent.com/55821081/172072176-24c50467-1dd7-467a-8071-fb98e0188931.png)


4) Features that are buggy is our ALB link does not work. We tested the app locally (tested user reg/login with mongoDB Atlas, using dynamoDB
   for posts) with no issues. To resolve deploying to Fargate we reached out to you and the discord, double checked
   security groups, double checked our post mapping in our task definitions, double checked our dockerhub image,
   and just going through the deployment process multiple times. 
