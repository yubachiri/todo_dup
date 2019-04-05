class Task < ApplicationRecord
  belongs_to :user

  enum status: {
    untouched: 0,
    started: 1,
    completed: 2
  }
end
