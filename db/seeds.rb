# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create([
  {
    first_name: "Joe",
    last_name: "Smith",
    email: "joe@yopmail.com",
    password: "password",
    password_confirmation: "password",
    terms_of_service: true
  },
  {
    first_name: "Bob",
    last_name: "Smith",
    email: "bob@yopmail.com",
    password: "password",
    password_confirmation: "password",
    terms_of_service: true
  }
])

projects = Project.create([{
    name: "Joe's Project",
  },
  {
    name: "Bob's Project"
  },
  {
    name: "Joe and Bob's Project",
    color: 2
}])

project_users = []

users.each_with_index do |user, i|
  project_users = project_users | [{ user_id: user.id, project_id: projects[i].id }, { user_id: user.id, project_id: projects[-1].id }]
end

ProjectUser.create(project_users)
