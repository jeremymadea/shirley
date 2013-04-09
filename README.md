# Shirley: a Personal Bookmarking Service 
**Ted Striker:** *Surely you can't be serious!*   
**Dr. Rumack:** *I am serious. And don't call me Shirley.*

## Prerequisites
You've gotta have node.js and mongodb installed. Mongodb should be 
running on its default port. 

## Quick Start

Change into the directory this README.md file is in. 

    $ npm install
    $ node ./shirley.js

This will start the shirley server on port 8080 by default. The port
can be changed in `config.js`. After the server is running, an HTML
version of this page should be available at: 

[http://localhost:8080/readme.html](http://localhost:8080/readme.html)

If the collection specified in config.js doesn't exist, shirley will 
create it and add some sample data.

## API

This is a simple REST API that uses `application/json` as the message
format for responses. 

### Get By Tags
A GET request to `/t/*` will treat the remainder of the path
as slash separated tags and will return a list of the bookmarks
that match any of those tags. 
#### Example
    $ curl http://localhost:8080/t/nosql/javascript

### Get by Name
A GET request to `/n/:name` will return the bookmark with the name
attribute matching `:name`. 
#### Example
    $ curl http://localhost:8080/n/madea

### Redirect By Name
A GET request to `/r/:name` will return a status 302 redirect with  
location header holding the URL of the bookmark with the name
attribute matching `:name`. 
#### Example
    $ curl --include http://localhost:8080/r/madea

### Add Bookmark
A POST request to `/add` with a suitable message body will 
add a bookmark to the database.     
#### Example
If the shirley server is running, a form that posts to `/add` should
be available at [http://localhost:8080/](http://localhost:8080/).


