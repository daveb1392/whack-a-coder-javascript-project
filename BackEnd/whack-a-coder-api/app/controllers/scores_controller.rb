class ScoresController < ApplicationController
    
    def index  
        scores = Score.all
        render json: scores
    end

    def create
        # user = User.find(strong_params)
        # byebug
        # user = User.create(strong_params)
        user = User.create(strong_params[:user])
        score = Score.create(time: strong_params["score"]["time"] , user: user)
        byebug
        render json: score, includes: user
    end

   
    private

    def strong_params
        params.require(:game_params).permit(score: {}, user: {})
    end



end