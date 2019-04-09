class Task < ApplicationRecord
  belongs_to :user

  enum status: {
    untouched: 0,
    started: 1,
    completed: 2
  }

  enum priority: {
    top: 0,
    next: 1,
    other: 2
  }
end
