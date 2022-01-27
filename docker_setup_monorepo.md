# Docker Setup Monorepo for ELS Training App

### Working environment
- the project has these folders:
> /backend  \
/frontend

- backend is laravel
- frontend is react


### Notes
- I know that there is laravel sail for dockerizing laravel apps as well, however, this gist will not be making use of laravel sail, but instead will use a very simple setup for dockerizing the laravel app


- Cors might become an issue, one bug that i found in my frontend application is the trailing slashes of my api calls
- i.e. `api/quizzes/` must instead be `api/quizzes` 
- the main issue here is that `api/quizzes/` is, in the backend (laravel), being redirected to `api/quizzes`, this process of redirection loses the header details of the `api/quizzes/` request, so despite having XSRF-TOKEN in the `api/quizzes/` request, it is lost in the process of the redirection
- other than that, do follow laravel sanctum guide in preparing for the SPA setup, if you are using laravel sanctum.


### links

- [x] https://github.com/framgia/sph_els_stephen/pull/73
- [x] [Laravel Docker Package](https://github.com/laravel-fans/laravel-docker) 
- [x] [My docker-compose.yml file](https://github.com/framgia/sph_els_stephen/pull/73/files#diff-e45e45baeda1c1e73482975a664062aa56f20c03dd9d64a827aba57775bed0d3)


## Frontend Setup

- [x] create `Dockerfile` in /frontend, below is my dockerfile, feel free to change if you do know a better setup, but for my case it works
> FROM node:17
>
> WORKDIR /app
> 
> COPY package*.json ./
>
> RUN npm i
> 
> COPY . .
> 
> CMD [ "npm", "start" ]

- [x] create `.dockerignore` in /frontend
    - [ ] for this one, i just copied my gitignore
    - [x] just make sure that node_modules is inside


## Backend Setup

- [x] As said earlier, this gist will make use of a package to easily dockerize the laravel app, from the 2nd link above, follow their instructions
    - [x] do this in your `/backend` directory
- [x] this should generate you a `Docker/` folder on the backend as well as the `Dockerfile`



## Docker Compose Setup

- [x] create `docker-compose.yml` in the root of your monorepo
    - [ ] doing otherwise would require you to direct docker compose to which file to use

- [x] for starters use the 3rd link above to copy or follow my yml setup

### Things of note

>- the `frontend` service is for the react application, the `build` uses the context of `./frontend` which accesses `Dockerfile`, if you name your dockerfile differently there is a config under `build` for that as well
>- my frontend application uses environment variables for setups such as these that would not require one to redo bits of the application, instead just change environment variables

>- the same goes with the backend service
>- it might be good to also make use of the environment variables i used here which is mainly for database and connection setup, feel free to add if you have application logic that requires more environment variables to be set
>- laravel APP_KEY is not found in my yml file because, the package that i am using checks if the APP_KEY is present, if not, it will use artisan to generate key
>- inline with that, the package also migrates your migrations for you
>- inline with that, it does not seed the database for you, if you need to you can just access the shell of the container via docker desktop or the cli and do the db:seed there.


>- for the `db` service, take note that in the backend service, the DB_HOST is db, the service name
>- the MYSQL_USER cannot be `root` so just use other values.

>- `adminer` service is optional, but is also useful if you want to check if your containers are actually able to communicate with each other

>- in line with being able to check the communication between containers, one important configuration here is the network, they can be found in the services as well as a separate config for the network as well. this enables containers to communicate with each other.

>- as for the `volumes`, im just following the conventions, and i guess, for the database data to persist, having configured the volumes allows the saving of the data outside of the containers.
