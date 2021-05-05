class ProjectsController < ApplicationController
    def index
        # pry
        render json: Project.all, only: [:id, :name, :due_date], include: [:tasks]
    end

    def show 
        project = Project.find_by_id(params[:id])
        render json: project, only: [:id, :name, :due_date, :group_supervisor, :completed]
    end

    def create 
        # pry
        project = Project.create(project_params)
        render json: project
    end

    private 
    def project_params
        params.require(:project).permit(:name, :group_supervisor, :due_date, :completed, :tasks_attributes => [:id, :content, :member_email, :completed])
    end
end
