class PlaysController < ApplicationController
  def index
    @plays = Play.all
    render json: @plays
  end

  def show
    @play = Play.find(params[:id])
    render json: @play
  end

  def create
  end
end
