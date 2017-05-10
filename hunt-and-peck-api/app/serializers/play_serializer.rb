class PlaySerializer < ActiveModel::Serializer
  attributes :wpm, :cpm, :accuracy, :paragraph_id
  belongs_to :paragraph
  belongs_to :user
end
