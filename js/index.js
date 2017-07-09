
$(function(){
    /* header头部导航 */
    (function(){
        $header = $("#header"),
        $navbg = $header.find(".navbg"),/* 背景色 */
        $logo = $navbg.find(".logo"),
        $navLi = $navbg.find(".nav ul li.hover"),/* 同人专区、官方渠道 */
        $navSpan = $navLi.find("a span"),
        $content = $navbg.find(".content"),
        $bit = $content.find(".bit"),
        $headlg = $navbg.find(".header-logo");

        /* 阴阳师logo动画 */
        $headlg.animate({
            "left":"48px","opacity":"1"
        },1300);

        /* 头部 - 右侧导航 */
        $navLi.hover(function(){
            var index = $(this).index(".nav ul li.hover");
            $navbg.addClass("bg");//背景色
            $navSpan.eq(index).addClass("show");//倒三角
            $content.stop().slideDown();
            $bit.eq(index).stop().fadeIn();
        },function(){
            var index = $(this).index(".nav ul li.hover");
            $navbg.removeClass("bg");
            $navSpan.eq(index).removeClass("show");
            $content.stop().slideUp();
            $bit.eq(index).stop().fadeOut();
        });

        $bit.hover(function(){
            var index = $(this).index();
            $navbg.addClass("bg");//背景色
            $navSpan.eq(index).addClass("show");//倒三角
            $content.stop().slideDown();
            $bit.eq(index).stop().fadeIn();
        },function(){
            var index = $(this).index();
            $navbg.removeClass("bg");
            $navSpan.eq(index).removeClass("show");
            $content.stop().slideUp();
            $bit.eq(index).stop().fadeOut();
        });

        /* 头部 - 左侧logo */
        //logo默认是隐藏的，滚动触发显示logo
        $(window).scroll(function(){
            var Top = $(document).scrollTop();
            if(Top){
                $navbg.addClass("scrollbg");
                $logo.stop().animate({"opacity":"1"},200);
                $headlg.addClass("lgscale");
            }else{
                $navbg.removeClass("scrollbg");
                $logo.stop().animate({"opacity":"0"},200);
                $headlg.removeClass("lgscale");
            }
        });
    })();

    /* role图片切换 + 服务器列表 */
    (function(){
        var $role = $("#header").find(".role"),
            $rol1 = $role.find(".img1 .img"),
            $rol2 = $role.find(".img2 .img"),
            $btn = $role.find(".rightBtn"),
            $bunny = $role.find(".bunny"),
            whichShow = false;/* 第三四张图片是隐藏的 */

        //role图片切换
        $rol1.removeClass("hide");
        $btn.click(function () {
            whichShow?change($rol2 , $rol1):change($rol1 , $rol2);
            whichShow = !whichShow;
        });
        function change($obj1 , $obj2) {
            $obj1.stop();
            $obj2.stop();
            $obj1.addClass("hide").delay(900).queue(function () {
                $obj2.removeClass("hide");
            });
        }

        //服务器列表
        var $serverList = $("#header").find(".serverList"),
            $main = $serverList.find(".main"),
            $close = $main.find(".close");

        /* 点击青蛙，显示服务器列表 */
        $bunny.click(function(){
            $serverList.fadeIn();
            $main.addClass("show");
            /*$serverList.addClass("bol");*/
        });

        /* 关闭服务器列表 */
        $close.click(function(){
            $serverList.fadeOut();
            $main.removeClass("show");
        });
    })();

    /* 游戏日历 */
    (function(){
        var $calendar = $("#calendar"),
            $download = $calendar.find(".download"),
            $txtload = $download.find(".txtload"),
            $main = $download.find(".main"),
            $btnRight = $main.find(".btnRight");

        /* 点击扫码下载，展开内容 */
        $txtload.click(function(){
            $download.addClass("changeW");
            $txtload.hide();
            $main.show();
        });

        /* 点击箭头，收缩内容 */
        $btnRight.click(function(){
            $download.removeClass("changeW");
            $(this).stop().delay(200).queue(function(){
                $main.hide();
                $txtload.show();
            });
        });

        /* 活动动画 203 */
        var $avtive = $calendar.find(".activity"),
            $aLi = $avtive.find(".dropList li:lt(6)"),
            $aDiv = $aLi.find(".down");

        $aLi.hover(function(){
            var index = $(this).index(".dropList li");
            $(this).stop().addClass("drop");
            $aDiv.eq(index).show();
        },function(){
            var index = $(this).index(".dropList li");
            $(this).stop().delay(500).queue(function () {
                $(this).removeClass("drop");
                $aDiv.eq(index).hide();
            });
        });

        /* 实时更新内容 */
        var $oLi = $avtive.find("ul.dropList .l5"),
            $oUp = $oLi.find(".up"),
            $op = $oLi.find(".down p"),
            length = $op.length,
            date  = new Date();

        var whichday = date.getDay();//今天是周几
        if(whichday === 0){
            $oUp.html( $op.eq(whichday + (length - 1)).html() );
        }else{
            $oUp.html( $op.eq(whichday - 1).html() );
        }
    })();

    /* 面向对象 */
    (function(){
        function Banner($ul,$li,$tab){
            this.$ul = $ul;
            this.$li = $li;
            this.$tab = $tab;
            this.width = $li.width();
            this.length = $li.length;
            this.time = null;
            this.index = 0;
        }
        Banner.prototype = {
            Init : function(){
                this.tabLiEvent();
                this.auto();//图片自动轮播
                this.stop();//鼠标移入，停止自动轮播
            },
            tabLiEvent : function(){
                var This = this;
                This.$tab.mouseenter(function(){
                    clearTimeout(This.time);
                    var $this = $(this);
                    This.time = setTimeout(function(){
                        var index = This.$tab.index($this);//index()方法传递jquery选择器，返回在原先集合中的索引位置
                        $this.addClass("on").siblings().removeClass("on");
                        This.$ul.stop().animate({"left":-(This.width * index)},500);
                    },200);
                });
            },
            auto : function(){
                var This = this;
                This.time = setInterval(function(){
                    This.index++;
                    This.index %= This.length;
                    This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
                    This.$ul.stop().animate({"left":-(This.width * This.index)},500);
                },3000);
            },
            stop : function(){
                var This = this;
                This.$ul.hover(function(){
                    clearInterval(This.time);
                },function(){
                    This.auto();
                });
            }
        };
        window.Banner = Banner;

        function Info($ul,$li,$tab){
            //私有属性继承
            Banner.call(this,$ul,$li,$tab);
        }
        //公有属性(原型)继承
        function Fn(){}
        Fn.prototype = Banner.prototype;
        Info.prototype = Fn.prototype;
        window.Info = Info;
    })();

    /* 最新消息 */
    (function(){
        var $newinfo = $("#newinfo"),
            $banner = $newinfo.find(".banner"),
            $picUl = $banner.find(".pic"),
            $picLi = $picUl.find("li"),
            /*width = $picLi.width(),*/
            $tabLi = $banner.find(".tab ul li");
            /*time = null;*/

        var ban = new Banner($picUl,$picLi,$tabLi);
        ban.Init();

        var $info = $newinfo.find(".info"),
            $infoTabLi = $info.find(".tab ul li"),
            $infoTxtUl = $info.find(".txt ul"),
            $infoTxtLi = $infoTxtUl.find("li");

        var inf = new Info($infoTxtUl,$infoTxtLi,$infoTabLi);
        inf.tabLiEvent();
    })();

    /* 式神列表 */
    (function(){
        //生成式神列表
        var $listUl = $("#shishenAll").find(".main .view .list .mUl ul");

        var count = [
            [0,null],//ALl
            [0,null],//SSR
            [0,null],//SR
            [0,null],//R
            [0,null]//N
        ];
        for(var i = 0,length = shishenData.length;i < length;i++){
            var index = 0;
            switch(shishenData[i].level){
                case "SSR":
                    index = 1;
                    break;
                case "SR":
                    index = 2;
                    break;
                case "R":
                    index = 3;
                    break;
                case "N":
                    index = 4;
                    break;
            }
            count[0][0]++;
            count[index][0]++;
            //满足条件，创建li标签
            if(count[0][0] % 2){//对2取模，是为了保证每个li只有两个div
                count[0][1] = $("<li></li>");
                $listUl.eq(0).append(count[0][1]);
            }
            if(count[index][0] % 2){
                count[index][1] = $("<li></li>");
                $listUl.eq(index).append(count[index][1]);
            }
            var str;
            str = shishenData[i].isNew?"<span class='icon'></span>":"";
            var $div = $("<div class='sList'>"+
                        "<img src='images/index/shishenall/shishen/"+ shishenData[i].id +".png' alt=''>"+
                        "<p><span>"+ shishenData[i].name +"</span></p>"+ str + "</div>");
            var $clone = $div.clone();//复制标签
            count[0][1].append($div);//ALL
            count[index][1].append($clone);//SSR SR R N
        }
    })();

    /* 式神列表的左右按钮切换 */
    (function(){
        var $shishenAll = $("#shishenAll"),
            $view = $shishenAll.find(".main .view"),
            $mUl = $view.find(".list .mUl"),
            $oA = $view.find(".tab .txt a");


        $mUl.each(function(){
            var $ul = $(this).children("ul"),
                $span = $(this).children("span"),//左右button
                $li = $ul.children("li"),
                width = $(this).width(),//ul的宽度
                length = Math.ceil($li.length / 6),//因为每一块只能放下6个li，Math.ceil()向上取整，就可以知道有几块
                index = 0;//记录当前是第几块

            index === 0?$span.eq(0).hide():$span.eq(0).show();//默认不显示
            index === length - 1?$span.eq(1).hide():$span.eq(1).show();
            $span.click(function(){
                var num = $(this).index();
                if(num === 2){
                    index++;
                    index = Math.min(index,length - 1);
                }else{
                    index--;
                    if(index < 0) index = 0;
                }
                index !== 0?$span.eq(0).show():$span.eq(0).hide();
                index === length - 1?$span.eq(1).hide():$span.eq(1).show();
                $ul.animate({"margin-left":-(width * index)},600);
            });
        });

        /* 式神分类切换 */
        $oA.click(function(){
            var index = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $mUl.eq(index).addClass("show").siblings().removeClass("show");
        });
    })();

    /* 角色切换 */
    (function(){
        var $view = $("#shishenAll").find(".main .view"),//式神部分
            $part = $("#shishenAll").find(".main .part"),//主角部分
            $oP = $("#shishenAll").find(".main .title p"),//标题
            $leftLi = $part.find(".left ul li"),//左边选项卡
            $rightLi = $part.find(".right ul li");//右边内容

        /* 切换标题 */
        $oP.click(function(){
            var index = $(this).index(".main .title p");
            $(this).addClass("on").siblings().removeClass("on");
            if(index){
                /*$view.hide();
                $part.show();*/
                $view.stop().fadeOut();
                $part.stop().fadeIn();
            }else{
                /*$part.hide();
                $view.show();*/
                $part.stop().fadeOut();
                $view.stop().fadeIn();
            }
        });

        //选项卡切换
        $leftLi.click(function(){
            var index = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $rightLi.eq(index).fadeIn().siblings().fadeOut();
        });
    })();

    /* 游戏攻略 */
    (function(){
        var $raiders = $("#raiders"),
            $leftPic = $raiders.find(".left .pic"),
            $leftUl = $leftPic.find("ul"),
            $leftLi = $leftUl.find("li"),
            $leftSpan = $leftPic.find("p span");

        var inf = new Info($leftUl,$leftLi,$leftSpan);
        inf.Init();

        var $rightTitle = $raiders.find(".right .title"),
            $rightTab = $rightTitle.find(".tab"),
            $article = $raiders.find(".txt .article"),
            $rightUl = $article.find("ul");

        $rightUl.each(function(i){//5个ul，i分别为：0、1、2、3、4
            var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "御魂" , "高阶"];
            // !i只有i为0的时候，才会通过，也就是第一个ul，即所有的类别都通过
            for(var j = 0,length = strateData.length;j < length;j++){
                if( !i || new RegExp(i - 1).test(strateData[j].type) ){
                    if(!i){
                        var index = strateData[j].type.slice(-1);
                    }else{
                        index = i - 1;
                    }
                    $(this).append("<li>"+
                            "<a href='#'>"+
                                "<p>"+
                                    "<i></i>"+
                                    "<span>【"+ typeArr[index] +"】 "+ strateData[j].title +"</span>"+
                                "</p>"+
                                "<span>作者："+ strateData[j].author +"</span>"+
                            "</a>"+
                        "</li>");
                }
            }
        });

        var info2 = new Info($article,$rightUl,$rightTab);
        info2.tabLiEvent();
    })();

    /* 同人专区 */
    (function(){
        var $area = $("#area"),
            $titleLi = $area.find(".title .tab ul li"),
            $wrap = $area.find(".pic .wrap"),
            $wrapUl = $wrap.find("ul");

        $wrapUl.each(function(i){
            var num = 0;
            for(var j = 0,length = fanData.length;j < length;j++){
                if( !i || fanData[j].type === i ){
                    $(this).append("<li>"+
                                    "<a href='#'>"+
                                        "<img src="+ fanData[j].url +" alt=''>"+
                                        "<span><i></i></span>"+
                                    "</a>"+
                                    "<p>"+ fanData[j].title +"</p>"+
                                "</li>");
                    num++;
                    if(num === 8) break;
                }
            }
        });

        var info3 = new Info($wrap,$wrapUl,$titleLi);
        info3.tabLiEvent();
    })();

    /* 返回顶部 */
    (function(){
        var $advisory = $("#advisory"),
            $backtop = $advisory.find(".backtop");

        $backtop.click(function(){
            $("html,body").animate({
                "scrollTop":"0"
            },500);
        });
    })();

    /* 底部 */
    (function(){
        var $footer = $("#footer"),
            $experience = $footer.find(".footerbg .experience"),
            $div = $experience.children("div");//获取所有的子元素div

        $experience.hover(function(){
            $div.addClass("on");
        },function(){
            $div.removeClass("on");
        });
    })();
});





