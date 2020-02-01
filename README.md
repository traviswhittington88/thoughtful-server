# Thoughtful API

This is an Express server contained within the NodeJS infrastructure that handles authentication and routing requests to a PostgreSQL database that houses data for the entire Thoughtful application. 

To setup this repo, clone it to an empty project folder (git clone) and install all dependencies using the npm install command. The node package manager is used to perform all of the setup, installation, migration and testing commands. See package.json for more information.



## Install

    npm install

## Run the app

    npm run dev

## Run the tests

    npm t

# REST API

The REST API to the Thoughtful application is described below.

## Get list of Entries

### Request

`GET /api/entries`

    curl -i -H 'Accept: application/json' http://localhost:7000/api/entries

### Response

The response for all entries will be an array of entry objects in json format


[{ "id": "2",
  "title": "New Entry",
  "content": "My first and favorite entry!",
  "pseudonym": "Dr Jeckyl",
  "journal_id": "3",
  "date_created": "2020-01-30T03:28:00.449Z"
}]

## Create a new Entry

### Request

`POST /api/entries`

    curl -i -H 'Accept: application/json' -d 'title=Foo&content=new&pseudonym=catinthehat&journal_id=2'        http://localhost:7000/api/entries

### Response

returns status 201 and new entry object

    {
    "id":1,
    "title":"Foo",
    "content":"new",
    "pseudonym"="catinthehat",
    "journal_id":"2",
    "date_created":"2020-01-30T03:28:00.449Z"
    }
    

## Get a specific Entry

### Request

`GET /api/entries/:entryid`

    curl -i -H 'Accept: application/json' http://localhost:7000/entries/1

### Response

returns status 200 and entry object

  {
    "id":1,
    "title":"Foo",
    "content":"new",
    "pseudonym"="catinthehat",
    "journal_id":"2",
    "date_created":"2020-01-30T03:28:00.449Z"
   }
    
    
## Get a non-existent entry

### Request

`GET /api/entries/:entryid`

    curl -i -H 'Accept: application/json' http://localhost:7000/entries/9999

### Response

returns status 404 not found response object

    {"status":404,"reason":"Not found"}
    
## Change an entry

### Request

`PATCH /api/entries/:entryid`

    curl -i -H 'Accept: application/json' -X PUT -d 'title=Foo&status=patchedentry' http://localhost:7000/api/entries/1

### Response

returns status 200 (ok) and edited entry object

    {
      "id":1,
      "title":"EditedFoo",
      "content": "patched content", 
      "pseudonym": "Sam Says", 
      "journal_id": "3", 
      "date_created":"2020-01-30T03:28:00.449Z"
    }


## Delete an entry

### Request

`DELETE /api/entries/:entryid`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:7000/api/entries/1

### Response

returns 204 (no content) status


## Try to delete same entry again

### Request

`DELETE /api/entries/:entryid`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:7000/api/entries/1

### Response

returns status 404 (not found)

    {"status":404,"reason":"Not found"}


    
## Get list of Journals

### Request

`GET /api/journals`

    curl -i -H 'Accept: application/json' http://localhost:7000/api/journals
    
### Response

The response for all journals will be an array of journal objects in json format


[{ "id": "2",
  "title": "New Entry",
  "date_created": "2020-01-30T03:28:00.449Z"
}]


## Create a journal

### Request

`POST /api/journals`

    curl -i -H 'Accept: application/json' -d 'name=newJournal' http://localhost:7000/api/journals

### Response

responds with 201 (created) status and journal object

    {"id":2,"name":"newJournal" }



## Get a specific journal

### Request

`GET /api/journals/:journal_id`

    curl -i -H 'Accept: application/json' http://localhost:7000/api/journals/1
    

### Response

returns status 200 (ok) and journal object

    {"id":1,"name":"Foo"}





