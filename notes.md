# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [X] Read the README [please please please]
- [ ] Something cool!
- [X] Back-end
  - [X] Minimum Requirements
    - [X] Setup MongoDB database
    - [X] Setup item requests collection
    - [X] `PUT /api/request`
    - [X] `GET /api/request?page=_`
  - [X] Main Requirements
    - [X] `GET /api/request?status=pending`
    - [X] `PATCH /api/request`
  - [X] Above and Beyond
    - [X] Batch edits
    - [X] Batch deletes
- [ ] Front-end
  - [X] Minimum Requirements
    - [X] Dropdown component
    - [X] Table component
    - [X] Base page [table with data]
    - [X] Table dropdown interactivity
  - [X] Main Requirements
    - [X] Pagination
    - [X] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

# Notes

<!-- Notes go here -->
## Backend Implementation:  


### 1. DB 
  - **new**: Implement MongoDB connection using Mongoose, enable connection existence checking to avoid duplicate connection in dev 
  - **new**: Set up Mongoose model, create "request" collection with validations

### 2. Controllers 
NOTE: check part 5. for extra notes on batch edit/delete design
  - **modify**: All function - enable async functions & change return type = Promise<T> 
  - **modify**: All function - validation before DB connection
  - **modify**: getItemRequests - filter before sorting to improve query performance
  - **modify**: function editStatusRequest() => batch edit enabled, return type BatchResult<EditStatusRequest>
  - **new**: function deleteRequest() => batch delete

### 3. Routes
  - **modify**: Create util function handleError(e), replacing if-else statement 
  - **modify**: Response return status - PATCH (edits) - if all success, code = success, otherwise (partial fail / all fail), code = fail
  - **new**: Route for DELETE request - DELETE - same logic to batch edit 


### 4. Test  
  The backend portion was tested using **Postman** to ensure routes and corresponding methods (GET /PUT /PATH /DELETE) are working as expected (success /error handling)


### 5. Extra Note: Batch Edit/Delete Implementation
  - **Batch Edit**: 
  
    Body Format Expected: an array wrapper by "updates"  
      { updates:
    
          [ 
            {
                  id: ___,
                  status: "approved",
            },

            {
                  id: ___,
                  status: "rejected",
            }
          ] 
        }


  - **Batch Delete**

    Body Format Expected:
    {ids: number[]}
    
    Batch delete is implemented in a **HARD deletion** manner in this submission instead of SOFT deletion. However, if the scenario extends to designing "Requestor" portal, better to use soft delete (status = "deleted") for history tracking and efficient reactivation.

  - **Design on Batch Operation**  
      - <u>*Non-atomity*</u>: allow partial success updates, if partial succeed, return fail code as well, but with detailed response body
      - <u>*Response with succeed counter*</u>: declare new type "BatchEditResult" to show succeed and failed counts on top of request content.

  - **Rationale**  
      - <u>*Relatively Independent Requests*</u>: Unlikely bank account transfer which requires strict consistency, atomicity and need to be guaranteed by Transactions, one edit/delete operation in this project context did not seem to intersect with other operations
      - <u>*Lower Debugging Cost by Releasing Atomicity*</u>: Debugging and time cost is high if enabling atomity in batch operations (need to debug and send whole batch again). This also enhanced debugging efficiency for precisely identify "how many & what requests" are problemic.
      - <u>*Lower implementation & storage cost*</u>: Easier, faster to implement. No extra space required for storing soft deleted records.


## Frontend Implementation:  


### 1. Components
  The Admin main page is composed of reuseable components in following hierachy. Bold prints are created components.
  - **TableHeader** 
  - **TableTab**
  - Major Table Contents
      -  **TableRowHeader**
      -  TableRows
          - data
          - data
          - data
          - data
          - **Dropdown**
            - **Dropdown Badge**
      -  **Pagination**(provided by Bits Of Good)
          
  Both **TableTab and Pagination** components were implemented with **functionality** to trigger get requests by:

  - Combined **state variable: filter** = {tabStatus, page}
  - **Auto re-fetch** items via UseEffect() 

### 2. API Interactivity
  - **GET request** 
    
    Triggered via the useEffect() as described above in 1.Components
  - **PATCH request**
    
    Despite implemented backend batch edit requests, frontend batch edit feature was not implemented due to time constraint. However, I still defined a handler that can turn selected items into body format accepted by the backend (batch format), increasing the scalability and flexibility for future developement.


### 3. State Management
  useState hooks were used in the frontend, together with useEffect, to reduce manual works and streamline the process of updating contents.

  Major state variables implemented in the frontend are:
  - **paginatedRequests**: storing major table data returned by GET request, e.g. requestorName, itemRequested, etc.
  - **rowStatus**: storing request.status only, managed separately to be: used in Dropdown component & avoid updating whole paginatedRequests state when only updting a specific entry status. 
  - **updateStatueRequests**: storing requests to be updated. For implementing furhter batch edit request, this one will come in handy.
  - **totalRecords**: storing total record information to be used in Pagination component
  - **filter**: described above in 1. Components
