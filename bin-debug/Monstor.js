var MonsterState;
(function (MonsterState) {
    MonsterState[MonsterState["LIVE"] = 0] = "LIVE";
    MonsterState[MonsterState["DEAD"] = 1] = "DEAD";
})(MonsterState || (MonsterState = {}));
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(id, name, pictureId, maxHP) {
        _super.call(this);
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
    var d = __define,c=Monster,p=c.prototype;
    p.BeenAttacked = function (damage) {
        this.currentHP -= damage;
        this.checkState();
    };
    p.checkState = function () {
        if (this.currentHP <= 0) {
            this.state = MonsterState.DEAD;
        }
    };
    p.getMonsterState = function () {
        return this.state;
    };
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster');
//# sourceMappingURL=Monstor.js.map