class UsersController < ApplicationController

    def index  
        users = User.all
        render json: users
    end

    def create
        # user = User.find(strong_params)
        # byebug
        user = User.create(strong_params)
        score = Score.create(time: '', user: user)
        render json: {user: user, score: score}
    end

    # def create
    #     @trainer = Trainer.find(strong_params)
    
    #     if @trainer.pokemons.length < 6
    #       pokemon = generate_pokemon
    #       render json: pokemon
    #     else
    #       render json: { error: "Can't create pokemon" }
    #     end
    # end
    private

    def strong_params
        params.require(:user).permit(:username)
    end
    
end
