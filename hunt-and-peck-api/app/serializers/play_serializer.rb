class PlaySerializer < ActiveModel::Serializer
  attributes :wpm, :cpm, :accuracy
  belongs_to :paragraph
  belongs_to :user
end
