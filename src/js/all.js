// 移动端点击效果
document.body.addEventListener('touchstart', function() {});
$(function() {
  FastClick.attach(document.body);
});

//滑动页面改变头部搜索框
function slideSearch() {
  var winOffset;
  $(window).scroll(function() {
    setTimeout(function() {
      winOffset = $(document).scrollTop();
      if (winOffset > 0) {
        $(".searchBar-wrap").addClass("scroll");
        $(".searchBar-wrap .logo").hide();
        $(".searchBar-wrap .search").css({ "width": "70%", "borderColor": "#c6c6c6" });
        $(".searchBar-wrap .search input").css({ "color": "#333" });
        $("#icon-search").removeClass("icon-search").addClass("icon-search-s");
        $(".back").addClass("s");
        $(".login").addClass("s");
        $(".cart").addClass("s");
      } else {
        $(".searchBar-wrap .logo").show();
        $(".searchBar-wrap").removeClass("scroll");
        $(".searchBar-wrap .search").css({ "width": "auto", "borderColor": "#fff" });
        $(".searchBar-wrap .search input").css({ "color": "#fff" });
        $("#icon-search").removeClass("icon-search-s").addClass("icon-search");
        $(".back").removeClass("s");
        $(".login").removeClass("s");
        $(".cart").removeClass("s");
      }
    }, 10)

  })
}

//列表切换
function sildeTab() {

  //tab swiper
  var tabSwiper = new Swiper('.goods-intro-wrap .bd', {
    autoHeight: true,
    onTransitionEnd: function(swiper) {
      var j = tabSwiper.activeIndex;
      $('.goods-intro-wrap .hd ul li').removeClass('cur').eq(j).addClass('cur');
    }
  });

  $('.goods-intro-wrap .hd ul li').on('click', function(e) {
    e.preventDefault();
    //得到当前索引
    var i = $(this).index();
    $('.goods-intro-wrap .hd ul li').removeClass('cur').eq(i).addClass('cur');
    tabSwiper.slideTo(i, 500, false);
  });
}


// textarea 自适应高度
function makeExpandingArea(el) {

  var setStyle = function(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    // console.log(el.scrollHeight);
  }
  var delayedResize = function(el) {
    window.setTimeout(function() {
        setStyle(el)
      },
      0);
  }
  if (el.addEventListener) {
    el.addEventListener('input', function() {
      setStyle(el)
    }, false);
    setStyle(el)
  } else if (el.attachEvent) {
    el.attachEvent('onpropertychange', function() {
      setStyle(el)
    });
    setStyle(el)
  }
  if (window.VBArray && window.addEventListener) { //IE9
    el.attachEvent("onkeydown", function() {
      var key = window.event.keyCode;
      if (key == 8 || key == 46) delayedResize(el);

    });
    el.attachEvent("oncut", function() {
      delayedResize(el);
    }); //处理粘贴
  }
}


/*toast
 *obj: 触发事件的对象
 *text: toast需要显示的内容
 */

function toast(obj, text) {
  if (obj && typeof obj === "object") {
    var that = obj;
    $(that).attr({ "disabled": "disabled", "onclick": "return false" });
  } else {
    console.error("请传入触发toast的对象！");
    return false;
  }

  var toast = $("<p/>").addClass("toast");
  var toastHTML = $("<span/>");
  $(".all-wrap").append(toast);
  toastHTML.html(text);
  toastHTML.appendTo(toast);

  setTimeout(function() {
    toast.remove();
    $(that).attr({ "disabled": false, "onclick": "toast(this,'" + text + "')" });
  }, 1500);
}
// 回到顶部
$.fn.scrollTo = function(options) {
  var defaults = {
    toT: 0, //滚动目标位置
    durTime: 500, //过渡动画时间
    delay: 30, //定时器时间
    callback: null //回调函数
  };
  var opts = $.extend(defaults, options),
    timer = null,
    _this = this,
    curTop = _this.scrollTop(), //滚动条当前的位置
    subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
    index = 0,
    dur = Math.round(opts.durTime / opts.delay),
    smoothScroll = function(t) {
      index++;
      var per = Math.round(subTop / dur);
      if (index >= dur) {
        _this.scrollTop(t);
        window.clearInterval(timer);
        if (opts.callback && typeof opts.callback == 'function') {
          opts.callback();
        }
        return;
      } else {
        _this.scrollTop(curTop + index * per);
      }
    };
  timer = window.setInterval(function() {
    smoothScroll(opts.toT);
  }, opts.delay);
  return _this;
};
//返回顶部
function backTop(obj) {
  $(window).on("scroll", function() {
    var top = $(this).scrollTop();
    if (top > 400) {
      $(obj).show();
    } else {
      $(obj).hide();
    }

  });
  $(obj).on("click", function() {
    $("body").scrollTo({ toT: 0 })
  });
}

// tab
function tab(hd, bd) {
  $(hd).each(function() {
    $(this).on("click", function() {
      var i = $(this).index();
      $(this).addClass("cur").siblings().removeClass("cur");
      $(bd).eq(i).show().siblings().hide();
    });
  });
}
// 展示
function show(obj) {
  $(obj).fadeIn();
}
// 消失
function hide(obj) {
  $(obj).fadeOut();
}