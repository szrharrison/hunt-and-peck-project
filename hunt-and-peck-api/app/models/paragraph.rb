class Paragraph < ApplicationRecord
  has_many :plays
  has_many :users, through: :plays
end
