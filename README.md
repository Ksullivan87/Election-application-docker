# Election-application-docker
Run the following in the command line under project root directory:
$ npm install
$ node index.js

Postgres command:
psql -U postgres -d americandream -h localhost

Then open index.html in a browser(testing only)

App should function from http://localhost:3000/*endpointname*

11/14 page folders were moved into public to reflect the localhost run condition

line 6 in index.js "app.use(express.static('public'));"(reccomended by Dean) is used to statically access the 
html file from the public folder, this should not affect the functionality of the code outside of direct file calls 
which will be addressed in the push following "file restructuring" 

--App Dev ex05 update--

As far as I can tell the image has taken and ive gotten both the db and app working separately, but theres some sort of issue with the db connection when i try to run my start script, the connection was something we were having a lot of trouble with throughout development too, mainly when we migrated from localhost to serving from a server that dean gave us. The idea should still be the same though, node index.js(the start script) then itll be accessible through localhost:3000