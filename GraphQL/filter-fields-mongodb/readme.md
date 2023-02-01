### Filter Fields Examples

### Example

```
db.persons.find({<query>}) , {name: 1, age: 1}
db.persons.find({<query>}) , {"company.location": 1, age: 1}
db.persons.find({<query>}) , {_id: 0, name: 1, age: 1}
db.persons.find({<query>}) , {name: 1, age: 0}
```

### Example query

```
db.geCollection('person')
    .find({}, {name:1, age: 1, eyeColor: 1, company: 1})
```