enum MonsterState{
    LIVE,
    DEAD
}

class Monster extends egret.DisplayObjectContainer{
    public name : string;
    public monsterID : string;
    private monsterPictureId : string;
    public monsterPicture : egret.Bitmap;
    private maxHP : number;
    private currentHP : number;
    private state : MonsterState;

    constructor(id,name,pictureId,maxHP){
        super();
        this.width = 64;
        this.height = 64;
        this.monsterPicture = new egret.Bitmap();
        this.monsterPicture.texture = RES.getRes(pictureId);
        this.addChild(this.monsterPicture);
        this.monsterPicture.x = 0;
        this.monsterPicture.y = 0;
        this.name = name;
        this.monsterID = id;
        this.monsterPictureId = pictureId;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.state = MonsterState.LIVE;
    }

    public BeenAttacked(damage : number){
        this.currentHP -= damage;
        this.checkState();
    }

    public checkState(){
        if(this.currentHP <= 0){
            this.state = MonsterState.DEAD;
        }
    }

    public getMonsterState(){
        return this.state;
    }
}