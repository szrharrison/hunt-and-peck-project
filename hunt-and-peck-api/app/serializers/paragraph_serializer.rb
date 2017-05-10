class ParagraphSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_many :plays
  # has_many :users
end
