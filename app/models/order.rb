class Order < ApplicationRecord
  has_one :line_food
  has_one :restaurant, through: :line_food

  validates :total_price, numericality: { greater_than: 0 }

  def save_with_update_line_foods!(line_foods)
    ActiveRecord::Base.transaction do
      line_foods.each do |line_food|
        line_food.update_attribute(:active, false)
        line_food.update_attribute(:order, self)
      end
      self.save!
    end
  end
end
