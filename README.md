![DV](https://www.deltavcodeschool.com/wp-content/uploads/DeltaV.png)  Lab 08: SQL and Postgres
=======
[Code of Conduct](https://github.com/codefellows/code-of-conduct)

## Submission Instructions
When you are finished with lab, follow these steps to submit your work. Create one Pull Request (aka: "PR") from your Forked repo to the DV repo with your changes, and you'll each submit that same PR link in Canvas.

1. Ensure that all your local changes are committed, and pushed to your origin repo.
1. Visit the origin repo on github.com, and ensure that all of your completed work has been merged to master via Pull Requests within your repo.
1. Create a new PR from your Fork to the DV repo and ensure the branches look correct.
1. Fill in the template based on the text box prompts:
  1. Write a good descriptive summary of your changes:
    1. Be sure to include how much time you spent on it, and who you worked with.
    1. Briefly reflect on and summarize your process.
1. When you create the PR, it will have a unique URL. Copy this link, share with your partner, and paste it into the assignment submission form in Canvas. Both the driver and the navigator will submit the same PR link.
---

## Learning Objectives

- Understand the basic concepts of a database
- Effectively use basic SQL commands to create, read, update, and delete rows from a table

---

## Resources  
[SQL Syntax Cheatsheet](cheatsheets/sql.md)
[PostgreSQL Shell Cheatsheet](cheatsheets/postgress-shell.md)

---

## Feature Tasks  

1. Complete the TODO items in `server.js` to ensure that your server file is properly configured

2. Study each of the new routes in your `server.js` file by examining the SQL statements and any associated data being handed through the request.

3. For each of the COMMENT items in `server.js`, provide a brief description of what that function immediately below is doing. Be sure to indicate, where applicable, details such as:
  - What number(s) of the full-stack-diagram.png image is this part of the code interacting with?
  - Which method of `article.js` is interacting with this particular piece of `server.js`?
  - What part of ***CRUD*** is being enacted/managed by this particular piece of code?
  - As applicable, an additional sentence or two of explanation about what the code is doing, what NPM packages are involved, etc. The goal is to demonstrate that you understand what is going on in the code without glossing over details, but also without writing a novel about it.

#### Stretch Goals

* You may test each of these routes by utilizing the corresponding Article prototype methods in the `article.js` file.
* For example, the `app.post()` route in `server.js` corresponds to the `Article.prototype.insertRecord()` method in `article.js`. You can create a new Article object and call that method on it from the browser console. You can then check your Postgres DB to confirm that it exists in the DB. It will also render to the page upon refreshing the browser.
```javascript
  // In the browser console
  let myArticle = new Article({title:'Flibbity goes Jibbiting', author:'Flibbity Jibbit', authorUrl:'flibbity.jibbit.com', category:'jibbits', publishedOn:'01-01-2217', body:'Flibbity Jibbit and the Key Keeper'});

  myArticle.insertRecord();
```

Refresh the page and you will see the new article at the top of the blog, plus the relevant information populated into the author and category filters.

You can test/verify each of the routes through console commands like this.

---

## Rubric  

Criteria | Pts
---|---
Meets all Assignment Reqs | 6
Uses idiomatic code style | 3
Follows proper Git workflow | 1
**Total** | **10**
