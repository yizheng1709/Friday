class ProjectsController < ApplicationController
    def index
        render json: Project.all, only: [:id, :name, :due_date], include: [:tasks]
    end

    def show 
        project = Project.find_by_id(params[:id])
        render json: project, only: [:id, :name, :due_date, :group_supervisor, :completed]
    end

    def search 
        binding.pry
    end

    def create 
        project = Project.create(project_params)
        #AR create  method to build relationship
        tasks = params[:project][:tasks]
        tasks.each_slice(2) do |email, content|
            binding.pry
            project.tasks.create(member_email: email.strip, content: content.strip)
        end
        #iterate through params[:project][:tasks]
        render json: project
    end

    def destroy
        id = params[:project][:id]
        if id 
            Project.find_by_id(id).destroy 
        end
    end

    private 
    def project_params
        params.require(:project).permit(:name, :group_supervisor, :due_date, :completed)
    end
end
