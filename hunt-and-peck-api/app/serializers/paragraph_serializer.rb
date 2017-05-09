class ParagraphSerializer < ActiveModel::Serializer
  attributes :content
  has_many :plays
  # has_many :users
end
