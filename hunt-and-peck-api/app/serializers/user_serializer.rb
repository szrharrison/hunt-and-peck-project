class UserSerializer < ActiveModel::Serializer
  attributes :username
  has_many :plays
  has_many :paragraphs, through: :plays
end
