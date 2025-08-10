| #  | Name                                                                                              | Testing data  |
|----|---------------------------------------------------------------------------------------------------|---------------|
| 1  | Successful order change with correct id                                                           | 1, 5, 10      |
| 2  | Unsuccessful order change with incorrect id                                                       | 0,11          |
| 3  | Unsuccessful order change with missing id                                                         | NULL          |
| 4  | Unsuccessful order change with id written in incorrect format                                     | 'test"        |
| 5  | Successful order delete with correct id                                                           | 1, 5, 10      |
| 6  | Unsuccessful order delete with incorrect id                                                       | 0, 11         |
| 7  | Unsuccessful order delete with missing id                                                         | NULL          |
| 8  | Unsuccessful order delete with id written in incorrect format                                     | 'test'        |
| 9  | Successful authentication and return of API key with valid username and password in string format | 'test','test' |
| 10 | Unsuccessful authentication with missing username and password                                    |               |

### HW10 
| #   | Name                                                    | Testing data |
|-----|---------------------------------------------------------|--------------|
| 1   | Receiving Status OK with Random Loan period             | Random Data  |
| 2   | Receiving Status OK with Random age                     | Random Data  |
| 3   | Receive Status Bad request applying negative age        | -17          |
| 4   | Receive Status Bad request applying 0 in the each field | 0. 0, 0, 0   |
| 5   | Receive negative decision with employ false             | false        |
| 6   | Receive positive decision                               | 0            |
