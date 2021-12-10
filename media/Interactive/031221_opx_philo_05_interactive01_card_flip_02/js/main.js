function ClickableItemModel(index, frontData, backData){
   this.index = index;
   this.frontText = frontData.text;
   this.type = frontData.type;
   this.backText = backData.text;
   this.frontImg = frontData.image;
   this.isfliped = ko.observable(false);
   this.addRemoveFlip=ko.observable("");
   this.focus = ko.observable([false,false]);
   this.isAllfliped=ko.observable([false,false,false,false,false,false]);
    // this.isMoved = ko.observable(false);

    // console.log("this.type=", this.type);
}

// function MatchingItemModel(index,data){
//     this.index = index;
//     this.text = data.text;
//     this.position = data.position;
//     this.clickableItem = ko.observable();

//     this.isShowingUnmatch = ko.observable(false);

//     this.isFilled = ko.computed(function(){
//         return this.clickableItem();
//     },this);

//     this.isCorrect = ko.observable();
//  }

function CardFlipTemplate() 
{
    this.title = ko.observable();
    this.instruction = ko.observable();
    this.image = ko.observable();
    this.feedback = ko.observable();
	this.clickableCards = ko.observableArray([]);
    // this.matchingItems = ko.observableArray([]);

    this.totalItems = ko.observable();
   
    this.selectedClickableItem = ko.observable();

    this.isSubmitted = ko.observable(false);
    this.isAllCorrect = ko.observable(false);

    this.showHideClass = ko.observable("");
    this.showHideCardsClass = ko.observable("");
    // this.isAllFlipped = ko.observable(false);
    
    this.artworktext = ko.observable();
    this.citationtitle = ko.observable();
    

    var ref = this;

    this.init = function(){
        // console.log("before  xml loaded");
        this.loadXML("./data/data.xml",this.xmlLoaded.bind(this));
    }

    this.xmlLoaded = function(xml){
        // console.log("xml loaded");
        var data = this.xml2json(xml).dataset;
        this.artworktext(data.artworktext);
        this.citationtitle(data.citationtitle);
        this.title(data.title);
        this.instruction(data.instruction);
        this.image(data.image);
        this.feedback(data.feedback);

        var arr1 = [];

        // alert("ok");
        // var arr2 = [];
        for(var i = 0; i < data.items.item.length; i++){
            arr1.push(new ClickableItemModel(i+1,data.items.item[i].front,data.items.item[i].back));
        }

        // this.clickableCards(this.shuffleArray(arr1));
        // this.matchingItems(arr2);

        this.clickableCards(arr1);
       
        this.totalItems(data.items.item.length);
    }

    self.flipIt = function (data, event) {
        console.log(data.isfliped(),"=self.index=",data.index);
        var ind=data.index;   

        if(data.isfliped()===false)
        {
            data.isfliped(true);
            data.addRemoveFlip('flipped');
            data.focus([false,true])
        }else{
            data.addRemoveFlip('');
            data.isfliped(false);
            data.focus([true,false])
        }
        
    }
    
    
    self.resetHandlerRef = function(data, event) {

        for(var i = 0; i < ref.clickableCards().length; i++){
            console.log("ref.clickableCards()[i].isfliped()=",ref.clickableCards()[i].isfliped());
            ref.clickableCards()[i].isfliped(false);
            ref.clickableCards()[i].addRemoveFlip("");
        }
        // ref.isAllFlipped(false);
        ref.showHideClass("");
        ref.showHideCardsClass("");
    };

    self.showRef=function(data, event) {
       
        ref.showHideClass("show");
        ref.showHideCardsClass("hide");
        // ref.isAllFlipped(false);
    };

    self.prevHandler = function(data, event) {
        ref.showHideClass("");
        ref.showHideCardsClass("");
        // ref.isAllFlipped(true);
    };

    this.init();
}

CardFlipTemplate.prototype = new Util();
CardFlipTemplate.prototype.constructor = CardFlipTemplate;


$(document).ready(function() {
	var obj = new CardFlipTemplate();

    // console.log('obj=====',obj);
	ko.applyBindings(obj,$("#cardflip_template")[0])

});