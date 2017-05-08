class User < ApplicationRecord
  has_many :plays
  has_many :paragraphs, through: :plays
end
