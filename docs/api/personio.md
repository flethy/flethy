# Personio

## Links

* URL: [https://personio.de](https://personio.de)
* Documentation: [https://developer.personio.de](https://developer.personio.de)
* Tags: web2
* Category: tools
* Type: hr

## API

### Authentication

* Authorization: header:bearer

### auth

#### request

##### Authentication

* client_id: query
* client_secret: query

##### Request Authentication Token

* Description: Request Authentication Token
* Docs: [https://developer.personio.de/reference/post_auth-1](https://developer.personio.de/reference/post_auth-1)

### employees

#### get

##### List Company Employees

* Description: List Company Employees
* Docs: [https://developer.personio.de/reference/get_company-employees](https://developer.personio.de/reference/get_company-employees)

### absences

#### get

##### List Absences

* Description: This endpoint is responsible for fetching absence data for the company employees.The result can be paginated and filtered by period and/or specific employee/employees. The result contains a list of absence periods.
* Docs: [https://developer.personio.de/reference/get_company-time-offs](https://developer.personio.de/reference/get_company-time-offs)
