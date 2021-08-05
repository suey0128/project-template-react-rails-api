class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    
    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create!(user_params)
        render json: user
    end

    def show 
        user =User.find_by(id: session[:user_id])
        if user
        render json: user
        else 
          render json: {error:"Not authorized"},status: :unauthorized
         end 
    end
    private

    def user_params
        params.require(:user).permit(:username,:first_name,:last_name,:password, :billing_address, :shipping_address, :email, :birthday)
    end

    def render_not_found_response
        render json: {error: "User not found"}, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
