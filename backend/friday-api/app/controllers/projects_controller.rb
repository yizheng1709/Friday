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
        
        project = Project.create(project_params)
        #AR create  method to build relationship
        
        tasks = params[:project][:tasks]
        tasks.each_slice(2) do |content, email|
            project.tasks.create(content: content.strip, member_email: email.strip)
        end
        #iterate through params[:project][:tasks]
            
        
        render json: project
    end

    private 
    def project_params
        params.require(:project).permit(:name, :group_supervisor, :due_date, :completed)
    end
end
