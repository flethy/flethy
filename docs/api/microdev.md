# MicroDev

## Links

* URL: [https://m3o.com](https://m3o.com)
* Documentation: [https://m3o.com/](https://m3o.com/)
* Tags: web2, web3
* Category: cloud
* Type: services

## API

### Authentication

* Authorization: header:bearer

### storage

#### dbCreateRecord

##### Database: Create Record

* Description: Create a record in the database. Optionally include an "id" field otherwise it's set automatically.
* Docs: [https://m3o.com/db/api#Create](https://m3o.com/db/api#Create)

#### dbReadRecord

##### Database: Read Record

* Description: Read data from a table. Lookup can be by ID or via querying any field in the record.
* Docs: [https://m3o.com/db/api#read](https://m3o.com/db/api#read)

#### dbUpdateRecord

##### Database: Update Record

* Description: Update a record in the database. Include an "id" in the record to update.
* Docs: [https://m3o.com/db/api#Update](https://m3o.com/db/api#Update)

#### dbDeleteRecord

##### Database: Delete Record

* Description: Delete a record in the database by id.
* Docs: [https://m3o.com/db/api#Delete](https://m3o.com/db/api#Delete)

#### cacheDecrement

##### Cache: Decrement

* Description: Decrement a value (if it's a number). If key not found it is equivalent to set.
* Docs: [https://m3o.com/cache/api#Decrement](https://m3o.com/cache/api#Decrement)

#### cacheDelete

##### Cache: Delete

* Description: Delete a value from the cache. If key not found a success response is returned.
* Docs: [https://m3o.com/cache/api#Delete](https://m3o.com/cache/api#Delete)

#### cacheGet

##### Cache: Get

* Description: Get an item from the cache by key. If key is not found, an empty response is returned.
* Docs: [https://m3o.com/cache/api#Get](https://m3o.com/cache/api#Get)

#### cacheIncrement

##### Cache: Increment

* Description: Increment a value (if it's a number). If key not found it is equivalent to set.
* Docs: [https://m3o.com/cache/api#Increment](https://m3o.com/cache/api#Increment)

#### cacheListKeys

##### Cache: List Keys

* Description: List all the available keys
* Docs: [https://m3o.com/cache/api#ListKeys](https://m3o.com/cache/api#ListKeys)

#### cacheSet

##### Cache: Set

* Description: Set an item in the cache. Overwrites any existing value already set.
* Docs: [https://m3o.com/cache/api#Set](https://m3o.com/cache/api#Set)

#### notesCreate

##### Notes: Create

* Description: Create a new note
* Docs: [https://m3o.com/notes/api#Create](https://m3o.com/notes/api#Create)

#### notesDelete

##### Notes: Delete

* Description: Delete a note
* Docs: [https://m3o.com/notes/api#Delete](https://m3o.com/notes/api#Delete)

#### notesList

##### Notes: List

* Description: List all the notes
* Docs: [https://m3o.com/notes/api#List](https://m3o.com/notes/api#List)

#### notesRead

##### Notes: Read

* Description: Read a note
* Docs: [https://m3o.com/notes/api#Read](https://m3o.com/notes/api#Read)

#### notesUpdate

##### Notes: Update

* Description: Update a note
* Docs: [https://m3o.com/notes/api#Update](https://m3o.com/notes/api#Update)
