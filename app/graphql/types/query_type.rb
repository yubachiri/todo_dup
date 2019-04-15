module Types
  class QueryType < Types::BaseObject
    field :first_task, TaskType, null: false, description: "return first task"
    field :task_find_by, TaskType, null: false, description: "return a task" do
      argument :task_id, Integer, required: true
    end
    field :resolver_method_exam, String, null: false, description: "this is resolver sample", resolver_method: :say_hello

    def first_task
      Task.first
    end

    def task_find_by(task_id:)
      Task.find_by(id: task_id)
    end

    def say_hello
      "Hello, resolver!"
    end
  end
end
