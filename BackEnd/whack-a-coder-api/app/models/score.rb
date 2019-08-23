class Score < ApplicationRecord
  belongs_to :user

  def self.high_scores
    scores = Score.all
    scores.map do |score|
      # byebug
      {score: score.time, user: score.user.username}
    end
  end
end
