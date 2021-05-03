# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

date1 = Date.new(2023,5,6)
date2 = Date.new(2024,7,19)
schoolProject = Project.create({name: "Work Project", due_date: date1})
task1 = Task.create({project_id: 1, content: "Buy supplies"})
task2 = Task.create({project_id: 1, content: "Brainstorm"})
task3 = Task.create({project_id: 1, content: "Rent equipments"})
anotherProject = Project.create({name: "Work Project for Another Team", due_date: date2})
task4 = Task.create({project_id: 2, content: "Buy a lot a lot of supplies"})
task5 = Task.create({project_id: 2, content: "A lot a lot of Brainstorm"})
task6 = Task.create({project_id: 2, content: "Rent a lot a lot of equipments"})