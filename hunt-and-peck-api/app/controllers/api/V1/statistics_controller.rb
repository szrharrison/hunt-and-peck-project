class Api::V1::StatisticsController < ApplicationController
  
  def top_plays
    plays = Play.order(wpm: :desc).limit(10)
    render json: plays
  end

  def most_accurate_users
    # can't figure out activerecord so i manually did it
    # however, the app can't work with the data i'm sending back

    users = User.all

    users_and_accuracy = users.map do |user|
      total = 0
      user.plays.each do |play|
        total += play.accuracy 
      end
      acc = (total / user.plays.length).round(2)
      {player: user, accuracy: acc}
    end

    sorted_users = users_and_accuracy.sort_by{ |hash| hash[:accuracy] }.reverse
    top_users = sorted_users[0, 10]
    render json: top_users
  end

end