class ProjectsController < ApplicationController
    def index
        render json: Project.all, only: [:id, :name, :due_date], include: [:tasks]
    end
end
