class Food < ApplicationRecord
  belongs_to :restaurant
  belongs_to :order, optional: true
  has_many :line_food
end