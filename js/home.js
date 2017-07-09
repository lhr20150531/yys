/* home.js */

$(function(){

    /* 背景1，小动画 */
    (function(){
        /* 插入flash延时显示，避免页面刷新会闪 */
        setTimeout(function(){
            $("#bg .bg1 .flash").onload = function(){
                $(this).css("opacity","1");
            };
        },1500);

        var $wraps = $("#wraps"),
            $wrap = $wraps.find(".wrap"),
            $menu = $wrap.find(".main .menu"),
            $header = $wrap.find(".main .header"),
            $img = $header.find("img"),
            $logo = $header.find(".bgLogo"),
            $chest = $menu.find(".chest"),// 领取网易严选宝箱
            oLastLi = $("#wraps .head .main .menu").find("ul li").last();

        /* 头部 */
        $wrap.eq(0).animate({"top":"0"},1800);

        /* 鼠标悬浮logo，显示大图片 */
        $header.mouseenter(function(){
            $img.css("opacity","0");
            $logo.css("display","block");
        }).mouseleave(function(){
            $img.css("opacity","1");
            $logo.css("display","none");
        });

        /* logo */
        $wrap.eq(1).animate({
            "left":"0",
            "opacity":"1"
        },2000);

        /* home */
        $wrap.eq(2).animate({
            "right":"25px",
            "opacity":"1"
        },2000);

        /* title */
        $wrap.eq(3).animate({
            "top":"126px",
            "opacity":"1"
        },1500);

        /* download */
        $wrap.eq(5).animate({
            "bottom":"255px",
            "opacity":"1"
        },1800);

        var $btnVedio = $("#wraps .videoBtn img"),
            $btnClose = $("#wraps #video .close");

        //视频弹窗按钮
        $btnVedio.click(function(){
            $("#wraps .video").show();/* 显示视频弹窗 */
            $(document.body).addClass("scroll");/* 隐藏滚动条 */
        });

        //关闭视频弹窗
        $btnClose.click(function(){
            $("#wraps .video").hide();
            $(document.body).removeClass("scroll");
        });
    })();

    /* 新版本情报---详细介绍 */
    (function(){
        var $version = $("#newVersion"),
            $listLi = $version.find(".list li"),/* 图片按钮集合 */
            $detail = $version.find(".detail"),
            $content = $detail.find(".content"),
            $close = $content.find(".close"),
            $contentLi = $content.find("ul li"),/* 图片内容集合 */
            $text = $contentLi.find(".text"),
            $toLeft = $detail.find(".left"),
            $toRight = $detail.find(".right"),
            index = 0,
            length = $contentLi.length;/* li个数 */

        $text.each(function(){
            var $scroll = $(this).find(".scroll"),/* 滚动条 */
                $txt = $(this).find(".txt"),/* 图片内容集合 */
                $bar = $scroll.find(".bar"),/* 方块 */
                $textH = $text.height(),
                $txtH = $txt.height(),
                $barH = $textH * $textH / $txtH,
                contentMaxH = 0,
                contentMinH = $textH - $txtH,
                scrollMaxH = $scroll.height() - $barH,
                scrollMinH = 0;
            //滚动条中方块的高度x , $textH / $txtH = x / $scroll.height()
            //$scroll.height()相当于$textH
            $bar.css("height", $barH +"px");

            $bar.mousedown(function(e){
                var yDown = e.clientY,
                    $This = $(this),
                    startTop = $This.position().top;

                $(document).mousemove(function(e){
                    var yMove = e.clientY,
                        top = yMove - yDown + startTop;

                    top = Math.max(top,scrollMinH);
                    top = Math.min(top,scrollMaxH);
                    $This.css("top",top);
                    $txt.css("top",contentMinH*(top/scrollMaxH));
                });

                $(document).mouseup(function(){
                    $(this).off("mousedown").off("mousemove");
                });
                return false;
            });

            $(this).mousewheel(function(e,a){
                var top = $bar.position().top;
                if(a > 0){
                    top -= 10;
                }else{
                    top += 10;
                }
                top = Math.min(top,scrollMaxH);
                top = Math.max(top,scrollMinH);
                $bar.css("top",top);
                $txt.css("top",contentMinH*(top/scrollMaxH));
                return false;
            });

            $scroll.click(function(e){
                if( e.target === this){
                    var startY = e.clientY - ($(this).offset().top - $(document).scrollTop()),
                        $barTop = $bar.position().top;// 0px
                    if(startY > $barTop){
                        $barTop += 100;
                    }else{
                        $barTop -= 100;
                    }
                    $barTop = Math.min($barTop,scrollMaxH);
                    $barTop = Math.max($barTop,scrollMinH);
                    $bar.animate({"top":$barTop},500);
                    $txt.animate({"top":contentMinH*($barTop/scrollMaxH)},500);
                }
            });
        });

        $detail.hide().css("opacity","1");
        $contentLi.hide();

        //点击图片，显示图片详细内容介绍
        $listLi.click(function(){
            index = $(this).index();
            $(document.body).addClass("scroll");
            $detail.show();
            $contentLi.eq(index).show().siblings().hide();
        });

        //close，关闭图片详细内容介绍
        $close.click(function(){
            $detail.hide();
            $(document.body).removeClass("scroll");
        });

        //向左切换
        $toLeft.click(function(){
            index--;
            if(index === -1) index = length - 1;
            $contentLi.eq(index).show().siblings().hide();
        });

        //向右切换
        $toRight.click(function(){
            index++;
            if(index === 6) index = 0;
            $contentLi.eq(index).show().siblings().hide();
        });
    })();

    /* 滚轮延迟图片加载 */
    (function(){
            //新版本情报
        var $newVersion = $("#newVersion"),
            $title = $newVersion.find(".main .title"),
            $contentLi = $newVersion.find(".main .list ul li"),
            //游戏特色
            $gamegood = $("#gamegood"),
            $gtitle = $gamegood.find(".main .title"),
            //底部
            $foot = $("#foot"),
            $share = $foot.find(".share"),
            $info = $foot.find(".info"),
            arr = [];

        init($title,$contentLi,$gtitle);//初始化

        //当滚轮事件触发的时候，延迟加载arr里面的元素
        $(window).scroll(function(){
            var length = arr.length,
                height = $(window).height() + $(document).scrollTop();
            for(var i = length - 1;i >= 0;i--){
                var obj = arr[i];
                if(height >= obj.Top){//判断当前元素未显示，并且高度大于元素的top
                    (function(obj){
                        setTimeout(function(){
                            $(obj).removeClass("hide");
                        },($(obj).index()%3)*200);
                        arr.slice(i,1);
                    })(obj);
                }
            }
        });

        //初始化
        function init(){
            for(var i = 0,length = arguments.length;i < length;i++){
                arguments[i].each(function(){
                    this.Top = $(this).offset().top;
                    arr.push(this);
                });
            }
        }
    })();

    /* 游戏特色 */
    (function(){
        var $game = $("#gamegood"),
            $title = $game.find(".main .title"),
            $gameLi = $game.find(".list ul li"),
            $btn = $game.find(".list .btn div"),
            length = $gameLi.length,
            index = 0;//记录当前是第几张图片

        //点击图片切换
        $gameLi.click(function(){
            if($(this).index() !== index){
                index = $(this).index();
                getIndex();
            }
        });

        //btn左右切换
        $btn.click(function(){
            if( $(this).index() ){
                index++;
                index %= length;
            }else{
                index--;
                if(index < 0) index = length - 1;
            }
            getIndex();
        });

        function getIndex(){
            var leftIndex = index - 1,
                rightIndex = index + 1;
            if(leftIndex < 0) leftIndex = length - 1;
            rightIndex %= length;
            $gameLi.removeClass("left middle right");
            $gameLi.eq(leftIndex).addClass("left");
            $gameLi.eq(index).addClass("middle");
            $gameLi.eq(rightIndex).addClass("right");
        }
    })();
});

