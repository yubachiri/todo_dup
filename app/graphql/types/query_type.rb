module Types
  class QueryType < Types::BaseObject
    field :all_task, [TaskType], null: false, description: "return all task"
    field :first_task, TaskType, null: false, description: "return first task"
    field :task_search_by, [TaskType], null: false, description: "return a task" do
      argument :task_name, String, required: true
    end
    field :resolver_method_exam, String, null: false, description: "this is resolver sample", resolver_method: :say_hello

    def all_task
      Task.all
    end

    def first_task
      Task.first
    end

    def task_search_by(task_name:)
      Task.where('title like ?', "%#{task_name}%")
    end

    def say_hello
      "Hello, resolver!"
    end
  end
end
