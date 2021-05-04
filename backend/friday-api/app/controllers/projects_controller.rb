class ProjectsController < ApplicationController
    def index
        render json: Project.all, only: [:id, :name, :due_date], include: [:tasks]
    end

    def show 
        # pry
        project = Project.find_by_id(params[:id])
        render json: project, only: [:id, :name, :due_date, :completed], :include => {
            :tasks => {:only => [:content, :member_email, :completed]}}
    end
end
