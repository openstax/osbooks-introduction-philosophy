function ClickableItemModel(index, data){
   this.index = index;
   this.desktopWidth=data.desktopWidth;
   this.desktopHeight=data.desktopHeight;
   this.mobileWidth=data.mobileWidth;
   this.mobileHeight=data.mobileHeight;
   this.cssClass=data.desktopWidth.split('_')[0];
   this.captiontext = data.captiontext;
   this.backImg = data.link;
   this.backImgAlt = data.alt;
   this.citation = data.citation;
   this.iconshape = data.iconshape;
   this.matchingIndex = data.match
   this.isfliped = ko.observable(false);
   this.addMatch = ko.observable("");
   this.addRemoveFlip=ko.observable("");
   this.focus = ko.observable([false,false]);
   this.isAllfliped=ko.observable(false);
   this.disableEach = ko.observable(false);
    // this.isMoved = ko.observable(false);
}

function ReferenceItemModel(index,data){
    this.index = index;
    this.reftext = data.text;
    this.imgLink = data.image.link;
    this.imgAltText = data.image.alt;
    
 }

function CardFlipTemplate() 
{
    this.title = ko.observable();
    this.instruction = ko.observable();
    this.artworktext = ko.observable();
    this.image = ko.observable();
    this.feedback = ko.observable();
	this.clickableCards = ko.observableArray([]);
    this.artworkReferenceItems = ko.observableArray([]);

    this.totalItems = ko.observable();
   
    this.selectedClickableItem = ko.observable();
    this.counter = ko.observable(0);
    this.arrPairIndex = ko.observable([]);
    this.isAllFlipped = ko.observable(false);


    this.showHideClass = ko.observable("");
    this.showHideCardsClass = ko.observable("");
    this.citationtitle = ko.observable();

    // this.scorm = pipwerks.SCORM; // shortcut

    // this.scorm.version = "1.2";
    var ref = this;

    this.init = function(){
        // console.log("before  xml loaded");
        this.loadXML("./data/data.xml",this.xmlLoaded.bind(this));
        // this.scorm.init();
    }

    this.xmlLoaded = function(xml){
        // console.log("xml loaded");
        var data = this.xml2json(xml).dataset;
        this.title(data.title);
        this.instruction(data.instruction);
        this.artworktext(data.artworktext);
        this.citationtitle(data.citationtitle);
        // this.image(data.image);
        this.feedback(data.feedback);
        

        console.log("data.artworktext=",data.artworktext);
        var arrAllItemInSequence=[];
        for(var i = 0; i < data.cardpairs.cardpair.length; i++){
            for(var j = 0; j < data.cardpairs.cardpair[i].card.length; j++){
                var desktopWidth=data.cardpairs.cardpair[i].card[j].image.desktopsize.width;
                var desktopHeight=data.cardpairs.cardpair[i].card[j].image.desktopsize.height;
                var mobileWidth=data.cardpairs.cardpair[i].card[j].image.mobilesize.width;
                var mobileHeight=data.cardpairs.cardpair[i].card[j].image.mobilesize.height;

                var desktopWidthKey= 'desktop-width-'+i+'-'+j+'_'+desktopWidth;
                var desktopHeightKey= 'desktop-height-'+i+'-'+j+'_'+desktopHeight;
                var mobileWidthKey= 'mobile-width-'+i+'-'+j+'_'+mobileWidth;
                var mobileHeightKey= 'mobile-height-'+i+'-'+j+'_'+mobileHeight;

                var objData={desktopWidth:desktopWidthKey,desktopHeight:desktopHeightKey,mobileWidth:mobileWidthKey,mobileHeight:mobileHeightKey,match:i ,color:data.cardpairs.cardpair[i].color,iconshape:data.cardpairs.cardpair[i].iconshape,size:data.cardpairs.cardpair[i].card[j].image.size,link:data.cardpairs.cardpair[i].card[j].image.link,alt:data.cardpairs.cardpair[i].card[j].image.alt,citation:data.cardpairs.cardpair[i].card[j].image.citation,captiontext:data.cardpairs.cardpair[i].card[j].captiontext}
                arrAllItemInSequence.push(objData);
            }
        }
        // console.log("arrAllItemInSequence=",arrAllItemInSequence);

        var arr1 = [];
        //  var arr2 = [];
        for(var i = 0; i < arrAllItemInSequence.length; i++){
            // console.log(i);
            arr1.push(new ClickableItemModel(i+1,arrAllItemInSequence[i]));
        }

        // for(var i = 0; i < data.artworkreferences.item.length; i++){
        //     arr2.push(new ReferenceItemModel(i+1,data.artworkreferences.item[i]));
        // }

        

        // this.clickableCards(this.shuffleArray(arr1));
        // this.matchingItems(arr2);

        // this.clickableCards(arr1);
        var arrRandom=this.shuffleArray(arr1);
        this.clickableCards(arrRandom);
        // this.artworkReferenceItems(arr2);
        
        console.log("this.clickableCards=",this.clickableCards());
       
        this.totalItems(arrAllItemInSequence.length);

        var setRandomColor = function () {
            var sheet = document.createElement('style');
          
            var str = ":root{";
            // for(var o = 0; o < data.cardpairs.cardpair.length; o++){     
            //     str += "--color-"+o+":" +data.cardpairs.cardpair[o].color+ ";";

            //       }

            for(var p = 0; p < arrRandom.length; p++){     
                    var desktopWidth=arrRandom[p].desktopWidth.split('_')[1];
                    var desktopWidthCssClass=arrRandom[p].desktopWidth.split('_')[0];
                    var desktopHeight=arrRandom[p].desktopHeight.split('_')[1];
                    var desktopHeightCssClass=arrRandom[p].desktopHeight.split('_')[0];

                    var mobileWidth=arrRandom[p].mobileWidth.split('_')[1];
                    var mobileWidthCssClass=arrRandom[p].mobileWidth.split('_')[0];
                    var mobileHeight=arrRandom[p].mobileHeight.split('_')[1];
                    var mobileHeightCssClass=arrRandom[p].mobileHeight.split('_')[0];

                      str += "--"+desktopWidthCssClass+":" +desktopWidth+ ";";
                      str += "--"+desktopHeightCssClass+":" +desktopHeight+ ";";
                      str += "--"+mobileWidthCssClass+":" +mobileWidth+ ";";
                      str += "--"+mobileHeightCssClass+":" +mobileHeight+ ";";
      
             }
      

                //   console.log("arrRandom====",arrRandom);

            str += "}";
          
            sheet.innerHTML = str;
            document.head.appendChild(sheet);
          }

          setRandomColor();

    }

    

    self.flipIt = function (data, event) {
        console.log(data.isfliped(),"=self.index=",data.index);
        // var ind=data.index;   
      
        if(data.isfliped()===false)
        {
            ref.counter(ref.counter() + 1);
            data.isfliped(true);
            data.addRemoveFlip('flipped');
            data.focus([false,true]);
            ref.arrPairIndex().push(data.index);
        }
        // else{
        //     data.addRemoveFlip('');
        //     data.isfliped(false);
        //     data.focus([true,false])
        // }
        console.log("ref.counter()=",ref.counter());
        if(ref.counter()===2)
        {
        // setTimeout(function(){
                console.log(ref.arrPairIndex()[0],"==ref.counter=",ref.counter());
                // ref.disableAll(true);
                disableAll();
                var cardInd1=ref.arrPairIndex()[0];
                var cardInd2=ref.arrPairIndex()[1];
                console.log("ref.clickableCards()=",ref.clickableCards());
                console.log("cardInd1=",cardInd1,"cardInd2=",cardInd2);

                // console.log(ref.clickableCards()[cardInd1].isfliped(),"=isFlipped raj=",ref.clickableCards()[cardInd2].isfliped());

                var cardObj1 = ref.clickableCards().filter(function (el) {
                    return el.index === cardInd1
                  });

                  var cardObj2 = ref.clickableCards().filter(function (el) {
                    return el.index === cardInd2
                  });

                  console.log("cardObj1 cardObj2=",cardObj1[0].isfliped(),cardObj2[0].isfliped());

                
                if(cardObj1[0].isfliped() && cardObj2[0].isfliped())
                {
                    if(cardObj1[0].matchingIndex === cardObj2[0].matchingIndex)
                    {
                        var iconshape;
                        var color;
                        console.log("cardObj1[0].iconshape=",cardObj1[0].iconshape);
                        if(cardObj1[0].iconshape==="rectangle")
                        {
                            iconshape="rectangle";
                            color=cardObj1[0].color
                        }
                        else if(cardObj1[0].iconshape==="hexagon")
                        {
                            iconshape="hexagon";
                            color=cardObj1[0].color
                        }
                        else if(cardObj1[0].iconshape==="circle")
                        {
                            iconshape="circle";
                            color=cardObj1[0].color
                        }
                        else if(cardObj1[0].iconshape==="square")
                        {
                            iconshape="square";
                            color=cardObj1[0].color
                        }
                        else if(cardObj1[0].iconshape==="decagon")
                        {
                            iconshape="decagon";
                            color=cardObj1[0].color
                        }
                        else if(cardObj1[0].iconshape==="traingle")
                        {
                            iconshape="traingle";
                            color=cardObj1[0].color
                        }

                        // $('.'+iconshape).find("svg path,svg g").attr('fill',color);

                        console.log("correct");
                        enableRemainingItems();
                        ref.counter(0);
                        ref.arrPairIndex([]);
                        setTimeout(function(){
                            cardObj1[0].addRemoveFlip("flipped "+iconshape);
                            cardObj2[0].addRemoveFlip("flipped "+iconshape);
                        },500)
                        // console.log(cardInd1,"ref.clickableCards()=",ref.clickableCards());
                    }
                    else{
                        console.log("incorrect");
                        setTimeout(function(){
                            console.log('incorrect settimeout');
                            cardObj1[0].isfliped(false);
                            cardObj2[0].isfliped(false);
                            cardObj1[0].addRemoveFlip("");
                            cardObj2[0].addRemoveFlip("");
                            // ref.disableAll(false);
                            enableRemainingItems();
                            ref.counter(0);
                            ref.arrPairIndex([]);
                        },1000)
                        console.log("ref.clickableCards()=",ref.clickableCards());
                    }
                }

    // console.log(ref.clickableCards()[0].frontImg);
}
    }

    
    

    self.resetHandler = function(data, event) {

        for(var i = 0; i < ref.clickableCards().length; i++){
            console.log("ref.clickableCards()[i].isfliped()=",ref.clickableCards()[i].isfliped());
            ref.clickableCards()[i].isfliped(false)
            ref.clickableCards()[i].disableEach(false);
            ref.clickableCards()[i].addRemoveFlip("");
            ref.clickableCards()[i].addRemoveFlip("");
        }
        ref.isAllFlipped(false);
      
    };

    self.resetHandlerRef = function(data, event) {

        for(var i = 0; i < ref.clickableCards().length; i++){
            console.log("ref.clickableCards()[i].isfliped()=",ref.clickableCards()[i].isfliped());
            ref.clickableCards()[i].isfliped(false)
            ref.clickableCards()[i].disableEach(false);
            ref.clickableCards()[i].addRemoveFlip("");
            ref.clickableCards()[i].addRemoveFlip("");
        }
        ref.isAllFlipped(false);
        
        ref.showHideClass("");
        ref.showHideCardsClass("");
    };

    self.showRef=function(data, event) {
        ref.showHideClass("show");
        ref.showHideCardsClass("hide");
        ref.isAllFlipped(false);
    };

    self.prevHandler = function(data, event) {
        ref.showHideClass("");
        ref.showHideCardsClass("");
        ref.isAllFlipped(true);
    };

    this.init();

    function enableRemainingItems(){
        console.log("disable all");
        setTimeout(function(){
            var count=0;
            for(var i = 0; i < ref.clickableCards().length; i++){
                console.log("ref.clickableCards()[i].isfliped()=",ref.clickableCards()[i].isfliped());
                if(!ref.clickableCards()[i].isfliped())
                {
                    count++;
                    console.log("coun=",count);
                    ref.clickableCards()[i].disableEach(false);
                    ref.clickableCards()[i].addMatch("");
                }
            }

            if(count===0)
                {
                    console.log("enablereset");
                    ref.isAllFlipped(true);
                    resizeonPageload();
                    // document.getElementById("ff").focus();
                    // alert("ok");
                    // ref.scorm.set('cmi.core.lesson_status',"completed");
                    // ref.scorm.save();
                }
                
        },500);

        function resizeonPageload()
            {
                var win = $(window); //this = window
                if (win.width() < 1024) { 
                    let hei = $(".feedback").height();
                    if( $('#artwork-ref-btn-container').length )         // use this if you are using id to check
                        {
                            $("#artwork-ref-btn-container").css("padding-bottom",(hei+25)+"px");
                        }else{
                            $(".flip").css("padding-bottom",(hei+40)+"px");
                        }
                }
                else{
                    $("#artwork-ref-btn-container").css("padding-bottom","0px");
                    $(".flip").css("padding-bottom","0px");
                }
            }
    }

    function disableAll(){
        // console.log("disable all");
      
            for(var i = 0; i < ref.clickableCards().length; i++){
                // console.log("ref.clickableCards()[i].isfliped()=",ref.clickableCards()[i].isfliped());
                ref.clickableCards()[i].disableEach(true);
            }

    }

    
    
}

CardFlipTemplate.prototype = new Util();
CardFlipTemplate.prototype.constructor = CardFlipTemplate;


$(document).ready(function() {
	var obj = new CardFlipTemplate();

    // console.log('obj=====',obj);
	ko.applyBindings(obj,$("#cardflip_template")[0]);
    resizeonPageload();

    $(window).on('resize', function(){

        resizeonPageload();
    });

    function resizeonPageload()
    {
        var win = $(window); //this = window
		if (win.width() < 1024) { 
            let hei = $(".feedback").height();
            if( $('#artwork-ref-btn-container').length )         // use this if you are using id to check
                {
                    $("#artwork-ref-btn-container").css("padding-bottom",(hei+25)+"px");
                }else{
                    
                    $(".flip").css("padding-bottom",(hei+40)+"px");
                }
            
         }
         else{
            $("#artwork-ref-btn-container").css("padding-bottom","0px");
            $(".flip").css("padding-bottom","0px");
        }
    }

    // (".reset_btn").on("mouseover",function(){
    //     console.log("fdgfdgfgf")
    // });
});