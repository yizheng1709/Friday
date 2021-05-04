# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

email1 = "alex@alex.com"
email2 = "bonbon@bon.com"
email3 = "cat@cat.com"
email4 = "deer@deer.com"
email5 = "elk@elk.com"
email6 = "fawn@fawn.com"
date1 = Date.new(2023,5,6)
date2 = Date.new(2024,7,19)
schoolProject = Project.create({name: "Project", due_date: date1})
task1 = Task.create({project: schoolProject, content: "Buy supplies", member_email:email1})
task2 = Task.create({project: schoolProject, content: "Brainstorm", member_email:email2})
task3 = Task.create({project: schoolProject, content: "Rent equipments", member_email:email3})
anotherProject = Project.create({name: "Project for Random Team", due_date: date2})
task4 = Task.create({project: anotherProject, content: "Buy a lot a lot of supplies", member_email:email4})
task5 = Task.create({project: anotherProject, content: "A lot a lot of Brainstorm", member_email:email5})
task6 = Task.create({project: anotherProject, content: "Rent a lot a lot of equipments", member_email:email6})

