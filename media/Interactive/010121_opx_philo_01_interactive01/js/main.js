function changableSlideModel(index, visibility, imgData, position, contentData,redpointdetails,min,max){
   this.index = index;
   this.imgSrc = imgData.src;
   this.imgAlt = imgData.alt;
   this.citation = imgData.citation;
   this.contentHeading = contentData.heading;
   this.contentParas = contentData.paras;
   this.pos=ko.observable(position);
   this.isSlideVisible=ko.observable(visibility);
   this.pointValue=ko.observable(redpointdetails.point);
   this.eachrangevalue=ko.observable(redpointdetails.rangevalue);
   this.rangemin=ko.observable(min);
   this.rangemax=ko.observable(max);
   
}

function timelineDetailsModel(index,tval,min,max){
    this.index=index;
    this.tval=tval;
    this.min=ko.observable(min);
    this.max=ko.observable(max);

}

function SteppedGraphicWithSlideTemplate() 
{
    this.title = ko.observable();
    this.instruction = ko.observable();
    this.redpoints=ko.observable();
	this.changableSlides = ko.observableArray([]);
    this.bigLine = ko.observableArray([]);
    this.totalItems = ko.observable();
    this.addRemoveFillThumb = ko.observable("");
    this.showHideClass = ko.observable("fill");
    this.setSlider = ko.observable("setslider");
    this.showHideRef = ko.observable("");
    this.showHideTimelineClass = ko.observable("");
    
    this.artworktext = ko.observable();
    this.citationtitle = ko.observable();
    // this.setSmallDevider=ko.observable();
    

    this.isSubmitted = ko.observable(false);
    this.isAllCorrect = ko.observable(false);

    this.rangeValue = ko.observable(11.6);

    this.smallLineLeftPos=ko.observable(0);

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
        console.log("this.artworktext()",this.artworktext());

        var eachInterval=0
        var devider=data.timelinedrawdetails.tval.length-1;
        var division=100/devider;
        var obj={};
        // var arrMinMax=[];
        for(var i=0;i<devider+1;i++)
        {
             eachInterval=(eachInterval+division);
             var interval=(eachInterval-division).toFixed(2);
            
             if(i==devider)
             {
                obj['min'+(i+1)]=interval-.1;
                obj['max'+(i+1)]=eachInterval-.2;
             }else
             {
                obj['min'+(i+1)]=interval;
                obj['max'+(i+1)]=eachInterval-.1;
             }
            //  arrMinMax.push(obj);
        }

        // console.log("xml loaded obj rajnish=",obj);
        console.log("xml loaded=",data);
        this.title(data.title);
        this.instruction(data.instruction);
        this.redpoints(data.slides.slide.length);
        this.smallLineLeftPos(obj.max1/2);
        
        this.rangeValue(data.slides.slide[0].redpointdetails.rangevalue);
        
        var arr1 = [];
        var arr2 = [];
        var visibility=[];
        

        var arrMinMax=[];
        for(var p = 0; p < data.slides.slide.length; p++){
            var rValue1=0;
            var rValue=Number(data.slides.slide[p].redpointdetails.rangevalue);
            if(p<data.slides.slide.length-1)
            {
            rValue1=Number(data.slides.slide[(p+1)].redpointdetails.rangevalue);
            }else{
                rValue1=99.9;
            }

            console.log(rValue,"=rValue=",rValue1);
            // rValue1-
            var minval=middleNumber(rValue,rValue1);

            console.log("rValue=",minval);
            if(p==0)
            {
                arrMinMax.push(-1);
                arrMinMax.push(minval);
                // objMinMax['max'+(p+1)]=minval;
            }else
            {
                arrMinMax.push(minval);
            }
            // arr1.push(new changableSlideModel(i+1,visibility[i],data.slides.slide[i].image,data.slides.slide[i].image.position,data.slides.slide[i].content,data.slides.slide[i].redpointdetails));
        }

        console.log("arrMinMax=",arrMinMax);

        function middleNumber(min, max) {
            var diff=max-min;
            var mid=diff/2;
            return min+mid;
          }



        for(var i = 0; i < data.slides.slide.length; i++){
            if(i===0)
            {
                visibility.push(true);
            }
            else{
                visibility.push(false);
            }
            arr1.push(new changableSlideModel(i+1,visibility[i],data.slides.slide[i].image,data.slides.slide[i].image.position,data.slides.slide[i].content,data.slides.slide[i].redpointdetails,arrMinMax[i],arrMinMax[i+1]));
        }

        for(var i = 0; i < data.timelinedrawdetails.tval.length; i++){
            
            arr2.push(new timelineDetailsModel(i,data.timelinedrawdetails.tval[i], obj['min'+(i+1)],obj['max'+(i+1)]));
        }

        // this.clickableCards(this.shuffleArray(arr1));    
        // this.matchingItems(arr2);

        this.changableSlides(arr1);
        this.bigLine(arr2);
        console.log("para=",this.bigLine()[0].min());
       
        this.totalItems(data.slides.slide.length);

        var setRedPointDetails = function () {
            var sheet1 = document.createElement('style');
            // console.log("dddd===Raj==",data.slides.slide[0].redpointdetails.desktop.leftpos);
            var str1 = ":root{";
            for(var o = 0; o < data.slides.slide.length; o++){     
                str1 += "--leftpos-"+o+":" +data.slides.slide[o].redpointdetails.rangevalue+"%;";
                str1 += "--desktop-marginleftpos-"+o+":" +data.slides.slide[o].redpointdetails.desktop.marginleftpos+ ";";
                str1 += "--mobile-marginleftpos-"+o+":" +data.slides.slide[o].redpointdetails.mobile.marginleftpos+ ";";
                  }
            str1 += "}";          
            sheet1.innerHTML = str1;
            document.head.appendChild(sheet1);
          }
          setRedPointDetails();
    }

    self.updateSlideDown = function (data, event) {
        console.log("ok");
        ref.showHideClass("");
        return true;
    }
    
    self.updateSlideUp = function (data, event) {
        console.log("ok");
        ref.showHideClass("fill");
        return true;
    }

    self.showRef=function(data, event) {
       
        ref.showHideRef("show");
        ref.showHideTimelineClass("hide");
    };

    self.prevHandler = function(data, event) {
        ref.showHideRef("");
        ref.showHideTimelineClass("");
    };
    self.resetHandlerRef = function(data, event) {
        ref.showHideRef("");
        ref.showHideTimelineClass("");
            hideAllSlide();
            ref.changableSlides()[0].isSlideVisible(true);
            var val=ref.changableSlides()[0].eachrangevalue();
            ref.rangeValue(val);
    };

    self.updateSlide = function (data, event) {
        console.log("=self.index=",event.currentTarget.value);

        var curValue=event.currentTarget.value;

        for(var i = 0; i < ref.changableSlides().length; i++){
            var min=ref.changableSlides()[i].rangemin();
            var max=ref.changableSlides()[i].rangemax();
            // console.log("min=",ref.changableSlides()[i].rangemin());
            // console.log("max=",ref.changableSlides()[i].rangemax());
            
            if(curValue>=min && curValue<=max)
            {
                hideAllSlide();
                ref.changableSlides()[i].isSlideVisible(true);
               setTimeout(function(){
                            var val=ref.changableSlides()[i].eachrangevalue();
                            ref.rangeValue(val);
                        })
                return;
                // break;
            }
            else{
                setTimeout(function(){
                var val=ref.changableSlides()[ref.changableSlides().length-1].eachrangevalue();
                ref.rangeValue(val);
            });
            }

        }
        
        
        
    }

    function hideAllSlide()
        {
            for(var j = 0; j < ref.changableSlides().length; j++){
                ref.changableSlides()[j].isSlideVisible(false);
            }
        }

    self.updateSlideWithButton = function (data, event) {
        // console.log(data.index,"=self.index=");
        
        var curValue=data.index;
        hideAllSlide();
        ref.changableSlides()[curValue-1].isSlideVisible(true);
        var rangeValue=ref.changableSlides()[curValue-1].eachrangevalue();
        console.log('=rangeValue=', rangeValue);
        ref.rangeValue(rangeValue);

        function hideAllSlide()
        {
            for(var i = 0; i < ref.changableSlides().length; i++){
                ref.changableSlides()[i].isSlideVisible(false)
            }
        }

        
    }

    this.init();
}

SteppedGraphicWithSlideTemplate.prototype = new Util();
SteppedGraphicWithSlideTemplate.prototype.constructor = SteppedGraphicWithSlideTemplate;

$(document).ready(function() {
	var obj = new SteppedGraphicWithSlideTemplate();
     console.log('obj=====',obj);
	ko.applyBindings(obj,$("#SteppedGraphicWithSlide_template")[0])

});