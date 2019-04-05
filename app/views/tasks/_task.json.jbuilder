json.extract! task, :id, :title, :deadline, :status, :user, :created_at, :updated_at
json.url task_url(task, format: :json)
