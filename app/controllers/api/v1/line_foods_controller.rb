module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      def index
        line_foods = LineFood.active.all
        if line_foods.exists?
          render json: {
            line_foods_ids: line_foods.map { |line_food| line_food.id },
            restaurant: line_foods[0].restaurant,
            count: line_foods.sum { |line_food| line_food[:count] },
            amount: line_foods.sum { |line_food| line_food.total_amount },
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        # byebug
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists? 
          return render json: {
            exists_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          },status: :not_acceptable
        else
          save_line_food
        end
      end

      def replace
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_foods|
          line_foods.update_attribute(:active, false)
        end
        save_line_food
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def save_line_food
        set_line_food(@ordered_food)
        if @line_food.save
          render json: {
            line_foods: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def set_line_food(ordered_food)
        # byebug
        unless ordered_food.line_foods.active.empty?
          @line_food = ordered_food.line_foods.find_by(active: true)
          @line_food.attributes = {
            count: @line_food.count + params[:count],
          }
        else
          @line_food = ordered_food.line_foods.new(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end

    end
  end
end
