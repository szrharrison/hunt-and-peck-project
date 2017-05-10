# class UsersController < ApplicationController
class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    # binding.pry
    @user = User.find_or_create_by(username: params[:user][:username])
    @user.plays.create(plays_params) 
  end

  private

  def plays_params
    params.require(:user).require(:play).permit(:wpm, :accuracy, :paragraph_id)
  end
  
end
