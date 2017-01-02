interface Command{
    execute(callback: Function): void;

    cancel(callback: Function): void;
}

class WalkCommand implements Command{

    private _tmain : Main;

    constructor(_tmain : Main){
        this._tmain = _tmain;
    }

    execute(callback: Function){
        if(this._tmain.ifFindAWay){
            this._tmain.Player.SetState(new WalkingState(),this._tmain);
            this._tmain.ifStartMove = true;
            callback();
        }
    }

    cancel(callback: Function){
        callback();
    }

}

class FightCommand implements Command{

    private _hasBeenCancelled = false;
    private player : Person;
    private _tmain : Main;

    constructor(player : Person,main : Main){
        this.player = player;
        this._tmain = main;
    }

    execute(callback: Function){
        console.log("开始战斗")
        this.player.SetState(new FightState(),this._tmain);
        egret.setTimeout(() => {
            if (!this._hasBeenCancelled) {
                console.log("结束战斗")
                this.player.SetState(new IdleState(),this._tmain);
                callback();
            }
        }, this, 500)
    }

    cancel(callback: Function){
        console.log("脱离战斗")
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100)

    }

}

class TalkCommand implements Command{

    
    execute(callback: Function){
        callback();
    }

    cancel(callback: Function){
        callback();
    }

}


class CommandList {



    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;
        egret.setTimeout(() => {
            if (this._frozen) {
                this._frozen = false;
            }

        }, this, 2000);
        if (command) {
            command.cancel(() => {
                this._frozen = false;
            });
            this._list = [];
        }

    }

    execute() {
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            return;
        }

        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(() => {
                this.execute();
            })

        }
        else {
            console.log("全部命令执行完毕");
        }
    }

}