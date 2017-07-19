'use strict';

//: Install and require the NPM Postgres package 'pg' into your server.js, and ensure that it is then listed as a dependency in your package.json
const fs = require('fs');
const express = require('express');
const pg = require('pg');

// REVIEW: Require in body-parser for post requests in our server. If you want to know more about what this does, read the docs!
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

//: Complete the connection string for the url that will connect to your local postgres database
// Windows and Linux users; You should have retained the user/pw from the pre-work for this course.
// Your url may require that it's composed of additional information including user and password
// const conString = 'postgres://USER:PASSWORD@HOST:PORT/DBNAME';
const conString = 'postgres://postgres:deltav301@localhost:5432/kilovolt';
//: Our pg module has a Client constructor that accepts one argument: the conString we just defined.
//       This is how it knows the URL and, for Windows and Linux users, our username and password for our
//       database when client.connect is called on line 26. Thus, we need to pass our conString into our
//       pg.Client() call.
const client = new pg.Client(conString);

// REVIEW: Use the client object to connect to our DB.
client.connect();


// REVIEW: Install the middleware plugins so that our app is aware and can use the body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// REVIEW: Routes for requesting HTML resources
app.get('/new', function(request, response) {
  // The following line of code refers to #5 in full-stack-diagram.png.  All this piece does is serve up new.html at a different url. (/new instead of /new.html).  article.js doesn't actually directly interact with this at all. The handler on the submit button in articleView.js ($('#new-form').on('submit', articleView.submit);) causes new.html to run article.insertRecord(); that is #3 on the picture and is the CREATE step in crud, since we are inserting some new data.
  response.sendFile('new.html', {root: './public'});
});


// REVIEW: Routes for making API calls to use CRUD Operations on our database
app.get('/articles', function(request, response) {
  //This code is #3 first, then #4. In articl.js the fetchAll function uses the response to push all the returned rows into the Article.all array that will later be used to generate our HTML. This is the READ step in CRUD.
  client.query('SELECT * FROM articles')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

app.post('/articles', function(request, response) {
  //This is again #3.  This piece is used in Article.prototype.insertRecord to insert new records into our articles table. This is the CREATE step in CRUD. There is also a #4 when 'insert complete' is sent to the server.  This is a #4 because the user will never see it, it would show up in your terminal if you have node server running, but would not show up in the console on the browser.
  client.query(
    `INSERT INTO
    articles(title, author, "authorUrl", category, "publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.put('/articles/:id', function(request, response) {
  // Some more #3.  Article.prototype.updateRecord uses this method to update already existing articles. This would be the UPDATE step in CRUD.  There is also a #4 when 'update complete' is sent back to the server from the DB.
  client.query(
    `UPDATE articles
    SET
      title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
  .then(function() {
    response.send('update complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.delete('/articles/:id', function(request, response) {
  //More #3.  Article.prototype.deleteRecord uses this to delete existing rows from our articles table.  This is DESTROY in CRUD.  There is also a %4 when 'delete complete' is sent back to the server from the DB.
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.delete('/articles', function(request, response) {
  // More #3. Article.truncateTable uses this to delete ALL the rows from our articles table.  This is more DESTROY in CRUD. Also another #4 when 'Delete complete' is sent to the server from the DB.
  client.query(
    'DELETE FROM articles;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

// invoking the function loadDB.  That function checks if the articles table exists, if it does not it creates it. Then it calls the loadArticles function which inserts our articles into the table from hackerIpsum.json.
loadDB();

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
  // Starts with #3. then a #4 the #4(result) is checked to se if there are any rows returned..  If there aren't any then the server reads the hackerIpsum.json file. Then there is another #3 and the data from hackerIpsum is written to the DB.  This is CREATE in CRUD since we are inserting new data.
  client.query('SELECT COUNT(*) FROM articles')
  .then(result => {
    // REVIEW: result.rows is an array of objects that Postgres returns as a response to a query.
    //         If there is nothing on the table, then result.rows[0] will be undefined, which will
    //         make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
    //         Therefore, if there is nothing on the table, line 151 will evaluate to true and
    //         enter into the code block.
    if(!parseInt(result.rows[0].count)) {
      fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
        JSON.parse(fd.toString()).forEach(ele => {
          client.query(`
            INSERT INTO
            articles(title, author, "authorUrl", category, "publishedOn", body)
            VALUES ($1, $2, $3, $4, $5, $6);
          `,
            [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
          )
        })
      })
    }
  })
}

function loadDB() {
  // #3.  This doesn't interact with article.js, this is instead called above on line 131.  This is CREATE in CRUD.  As above the function checks if the articles table exists, if it does not it creates it. Then it calls the loadArticles function which inserts our articles into the table from hackerIpsum.json.
  client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
    )
    .then(function() {
      loadArticles();
    })
    .catch(function(err) {
      console.error(err);
    }
  );
}
