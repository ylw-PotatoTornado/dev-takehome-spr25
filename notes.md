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
  - [ ] Minimum Requirements
    - [ ] Dropdown component
    - [ ] Table component
    - [ ] Base page [table with data]
    - [ ] Table dropdown interactivity
  - [ ] Main Requirements
    - [ ] Pagination
    - [ ] Tabs
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


