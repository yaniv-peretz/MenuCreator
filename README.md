# Menu Creator
A personal project for creating, editing a viewing user created menus. <br />
<b>Tech stack:</b> NodeJS (knex, bookshelf), MySql, ReactJS (with bootstrap).

prerequisites:
-------------
1. NodeJS installed.
2. MySql server installed
3. create a new .env file from the .env.default and populate all remaining feilds

How to run
-----------
1. enter `npm install` | "Yarn install" to install all required node_modules.
2. enter `knex migrate:latest` to update the DB schema
3. enter `npm start`
4. surf to localhost:8081