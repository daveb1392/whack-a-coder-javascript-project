class ScoresController < ApplicationController
    
    def index  
        scores = Score.all
        render json: scores
    end

    def endgame
        User.create()
    end 



end