# frozen_string_literal: true

module Mutations
  class TaskCreate < BaseMutation
    include GraphqlHelper

    description "Creates a new task."

    type Payloads::TaskCreatePayload

    argument :input, Inputs::TaskCreateInputType, "The task to be created.", required: true

    def resolve(input:)
      must_be_authenticated!
      validate_input(input)

      input = create_input(input)
      user = User.find_by(id: context[:user_id])
      task = user.projects.find_by!(id: input[:project_id]).tasks.new(input)
      task.save!

      task.project.users.each do |user|
        if input[:parent_id].nil?
          TaskTreeSchema.subscriptions.trigger "rootTaskCreated", { project_id: input[:project_id] }, task, scope: user.id unless user.id === context[:user_id]
        else
          TaskTreeSchema.subscriptions.trigger "taskCreated", { parent_id: input[:parent_id] }, task, scope: user.id unless user.id === context[:user_id]
        end
      end

      { task: task }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{input[:project_id]}"
    end

    private

      def validate_input(input)
        if !!input[:parent_id] === !!!input[:root_id]
          raise Errors::InvalidInputError, "parentId and rootId must either both be included or both be null."
        end

        if !input[:project_id] && !input[:parent_id]
          raise Errors::InvalidInputError, "Must provide a projectId for root tasks"
        end

        if input[:parent_id] && input[:project_id]
          raise Errors::InvalidInputError, "Child tasks inherit the project of their parent. Don't provide a projectId"
        end
      end

      def create_input(input)
        input_hash = input.to_h
        input_hash[:project_id] ||= ::Task.find_by!(id: input_hash[:parent_id]).project_id
        input_hash
      rescue ActiveRecord::RecordNotFound
        raise Errors::NotFoundError, "Could not find the Task with identifier #{input_hash[:parent_id]}"
      end
  end
end
