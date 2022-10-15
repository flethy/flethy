# ORBIntelligence

## Links

* URL: [https://api.orb-intelligence.com/docs/](https://api.orb-intelligence.com/docs/)
* Documentation: [https://api.orb-intelligence.com/docs/](https://api.orb-intelligence.com/docs/)
* Tags: web2
* Category: data
* Type: brands

## API

### Authentication

* api_key: query

### core

#### match

##### Match API

* Description: The Match API call performs a candidate retrieval process; the process by which Orb records are identified as potential matches to the query. The candidate retrieval process can be thought of as throwing a large netout over all of the Orb reference database and pulling it back in to return all the records that could be considered a match based on the input fields provided.
* Docs: [https://api.orb-intelligence.com/docs/#!/Match_and_Fetch_API/get_3_match](https://api.orb-intelligence.com/docs/#!/Match_and_Fetch_API/get_3_match)

#### fetch

##### Fetch API

* Description: The Fetch API call allows a user to obtain a full company profile from the Orb database, based on an Orb Number.
* Docs: [https://api.orb-intelligence.com/docs/#!/Match_and_Fetch_API/get_3_fetch_orb_num](https://api.orb-intelligence.com/docs/#!/Match_and_Fetch_API/get_3_fetch_orb_num)

#### search

##### Search API

* Description: The Search API call allows a user to retrieve a list of companies for the given search criteria. This enables a user to build out a list of companies for use cases such as building out a list of companies in a specific territory or segment.
* Docs: [https://api.orb-intelligence.com/docs/#!/Search_and_Look-alike/get_3_search](https://api.orb-intelligence.com/docs/#!/Search_and_Look-alike/get_3_search)

#### lookalike

##### Lookalike API

* Description: The Lookalike API call allows a user to retrieve a list of companies similar to a target company and can be narrowed down based on a range of filtering attributes. This enables users to expand their total addressable market or evaluate leads by identifying for companies that look like existing customers.
* Docs: [https://api.orb-intelligence.com/docs/#!/Search_and_Look-alike/get_3_lookalike](https://api.orb-intelligence.com/docs/#!/Search_and_Look-alike/get_3_lookalike)

#### corpTree

##### CorpTree API

* Description: The Corporate Tree API call allows a user to retrive full corporate tree of subsidiaries for a given company, starting from its ultimate parent company. The input to the Corporate Tree call is the Orb Number of the target company (mandatory field).
* Docs: [https://api.orb-intelligence.com/docs/#!/Corporate_Tree/get_3_corporate_tree_orb_num](https://api.orb-intelligence.com/docs/#!/Corporate_Tree/get_3_corporate_tree_orb_num)

#### dictionaries

##### Dictionaries API

* Description: ORB provides dictionaries for various type of fields.
* Docs: [https://api.orb-intelligence.com/docs/#!/Dictionaries/get_3_dictionaries](https://api.orb-intelligence.com/docs/#!/Dictionaries/get_3_dictionaries)
