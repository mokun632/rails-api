module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace]

      def index
        line_foods = LineFood.active.all
        if line_foods.exists?
          puts line_foods.count
          render json: {
            line_foods_ids: line_foods.map { |line_foods| line_foods.id },
            restaurant: line_foods[0].restaurant,
            count: line_foods.active.sum { |line_food| line_food[:count] },
            amount: line_foods.active.sum { |line_food| line_food.total_amount },
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists? 
          return render json: {
            exists_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          },status: :not_acceptable
        end

        set_line_foods(@ordered_food)

        if @line_foods.save
          render json: {
            line_foods: @line_foods
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_foods|
          line_foods.update_attribute(:active, false)
        end

        set_line_foods(@ordered_food)

        if @line_foods.save
          render json: {
            line_foods: @line_foods
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_food
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_foods(ordered_food)
        if ordered_food.line_food.present?
          @line_foods = ordered_food.line_food
          @line_foods.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          @line_foods = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
