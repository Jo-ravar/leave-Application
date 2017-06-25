# leave-Application

 ## API Endpoints and their Usage:--
 
 #### 1. URL:-- https://leaveapplication.herokuapp.com/add 
 * Type:- POST
 * Usage:-- To add a new user(Employee or Manager). 
 * Params Required **(IN BODY)** :-email , fname(firstname), lname(lastname), username , role *('Employee','Manager')*  
```
 O/P:-- { success: true, message: 'Successfully created new user.' }
 ````
 #### 2. URL:-- https://leaveapplication.herokuapp.com/token
 * Type:- POST
 * Usage:-- To get a **JWT** token which will be used for authentication of users for accessing different APIs.
 * Params Required **(IN BODY)** :-email , username  
```
 O/P:-- { success: true, token: 'JWT ' + token }
 ````
 #### 3. URL:--https://leaveapplication.herokuapp.com/employee/application
 * Type:- POST
 * Usage:-- To create a new leave application by employee.
 * Params Required **(IN BODY)** :-sdate(Start date) , edate(end date) , ltype *(leaveType:-'Sick','FMLA','Vacation','Maternity','Paternity','Pregnancy','Bereavement','Personal')* ,  reason
     
     **(In Header)**:-- AUTHORIZATION : JWT Token *(received from token API)*
```
 O/P:-- If accessed by employee :-- { success: true, message: 'Successfully created your application.' }.
        If accessed by manager :-- {error: 'You are not authorized to view this content'}.
 ````
  #### 4. URL:--https://leaveapplication.herokuapp.com/employee/viewApplications
 * Type:- GET
 * Usage:-- To see all previously created leave request & their approval status of an individual employee.
 * Params Required **(In Header)**:-- AUTHORIZATION : JWT Token *(received from token API)* .
```
 O/P:-- If accessed by employee :-- Send array of all applications created by employee.
        If accessed by manager :-- {error: 'You are not authorized to view this content'}.
 ````
 #### 5. URL:--https://leaveapplication.herokuapp.com/manager/viewAll
 * Type:- GET
 * Usage:-- To See all leave requests in the system.
 * Params Required **(In Header)**:-- AUTHORIZATION : JWT Token *(received from token API)* .
```
 O/P:-- If accessed by employee :-- {error: 'You are not authorized to view this content'}.
        If accessed by manager :-- Send array of all the applications present in system.
 ````
 #### 6. URL:--https://leaveapplication.herokuapp.com/manager/respond?appId=ObjectId
 * Type:- POST
 * Usage:-- To respond to the leave application in system.
 * Params Required **(IN BODY)** :- status *(ApprovalStatus:- 'Pending','Under Review','Approved','Rejected')* 
     
     **(In Query)**:-- appId *(unique objectId of each application)*
      
     **(In Header)**:-- AUTHORIZATION : JWT Token *(received from token API)*
```
 O/P:-- If accessed by employee :-- {error: 'You are not authorized to view this content'}.
        If accessed by manager :-- { success: true, message: 'Successfully Responded.' }.
 ````
 
