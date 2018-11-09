# WebDevBootCamp
| Name    | Path           | Http Verb | Purpose                                          | Mongoose Method         |
|---------|----------------|-----------|--------------------------------------------------|-------------------------|
| Index   | /dogs          | GET       | List all dogs                                    | Dog.find()              |
| New     | /dogs/new      | GET       | Show new dog form                                | N/A                     |
| Create  | /dogs          | POST      | Create a new dog, then redirect somewhere        | Dog.create()            |
| Show    | /dogs/:id      | GET       | Show info about one specific dog                 | Dog.findById()          |
| Edit    | /dogs/:id/edit | GET       | Show edit form for one dog                       | Dog.findById()          |
| Update  | /dogs/:id      | PUT       | Update a particular dog, then redirect somewhere | Dog.findByIdAndUpdate() |
| Destroy | /dogs/:id      | DELETE    | Delete a particular dog, then redirect somewhere | Dog.findByIdAndRemove() |