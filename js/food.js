class Food{
    constructor(){
        this.image = loadImage("images/Milk.png")
        this.foodStock = 0;
        this.lastFed = 0;
    }

    getFoodStock(){
        return this.foodStock;      

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }

    deductFood() {
        if(this.foodStock - 1){
            this.foodStock = this.foodStock - 1;
        }
    }

    display(){
        var x = 300,y = 280;

        imageMode(CENTER);
        image(this.image,700,420,70,70)

        if(this.foodStock !== 0){
            for(var i = 0;i<=this.foodStock;i++){
                if(i % 10 === 0){
                    x = 80;
                    y = y + 50;
                }

                image(this.image,x,y,50,50)
                x = x + 30;
            }
        }
    }
      
}