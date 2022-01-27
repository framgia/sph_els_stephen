# Heroku Setup Monorepo for ELS Training App


### Working environment

assuming the repository has different projects to be deployed
and that the projects are skeleton projects, if not,
do take note of the configurations you have made such as environment variables and set them up properly

i.e.
backend/   and   
frontend/

##### Prerequisites
>heroku is configured and authenticated  
git is setup on the main directory


## Setup

    1) create heroku applications in relation with the desired applications to be deployed
    - by default, when creating heroku applications, the name of the remote is "heroku"
        - since we want to create multiple applications in one repository, we must name them properly
        - we can modify that using the "-r / --remote=remote" flag

    i.e
    [code]heroku create my-backend -r heroku-be[/code]
    [code]heroku create my-frontend -r heroku-fe[/code]


    2) create a "Procfile"* file for each of the project in their respective root directories
    the file should contain the definition for the applcation's processes

    i.e

    on a react project
    [code]web: npm start[/code]
    on a laravel project 
    [code]web: vendor/bin/heroku-php-apache2 public/[/code]

    * without extension


    3) configuring buildpacks for the projects,
    - buildpacks allow heroku to be properly configured in preparation for deploying the projects

    i.e.
    for the react project
    [code]heroku buildpacks:add heroku/nodejs -r heroku-fe[/code]
    for the laravel project
    [code]heroku buildpacks:add heroku/php -r heroku-be[/code]

    - note that we are adding the reference for the remote names with the -r flag


    4) continuation on buildpacks configuration,
    - since the repository contains multiple projects, we need to let heroku know that we want specific projects to be deployed on which app

    - there are 2 options:

        1) https://github.com/lstoll/heroku-buildpack-monorepo
            - set the config var "APP_BASE" to backend

        2) https://github.com/timanovsky/subdir-heroku-buildpack
            - set the config var "PROJECT_PATH" to backend

    - with the option chosen, configure another buildpack
    i.e.
    [code]heroku buildpacks:add -r heroku-fe -i 1 https://github.com/lstoll/heroku-buildpack-monorepo[/code]

    - the flag -i <n> sets the index of the buildpack, for these buildpacks, it is necessary that they are processed first

---
## PROJECT SPECIFIC CONFIGURATION

#### For React project
    - the application is almost ready to be deployed, there are a few steps left

    1) decide whether to deploy with yarn or npm, if we try to deploy the application with both yarn.lock and package-lock.json still present, the deployment will fail
        - we can simply remove either by, i.e. `rm yarn.lock`
    2) in package.json, add a key "engines" with its value being an object containing a key "node" with a value for example "16.x"
        [code]
        "engines": {
            "node": "16.x"
        },
        [/code]

#### For Laravel project
    - the application is almost ready to be deployed, there are a few steps left

    1) export the environment variables to heroku found in backend/.env
        - laravel cannot start without some of the variables set (i dont know which specifically)


## Deployment
    5) deployment
    - the applications should be set, just do
    `git push heroku-fe main`* 
    `git push heroku-be main`

    * or master if you prefer

    - you may need to scale your web workers
        `heroku ps:scale web=1 -r heroku-fe`
        - or you can do this in the heroku dashboard


ps. please do notify me if this process does not work for you :>
