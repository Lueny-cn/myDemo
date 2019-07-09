(function($) {
  $.fn.scrollLoading = function(options) {
    var defaults = {
      attr: "data-url",
      container: $(window),
      callback: $.noop
    };
    var params = $.extend({}, defaults, options || {});
    params.cache = [];
    $(this).each(function() {
      var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]);
      //重组
      var data = {
        obj: $(this),
        tag: node,
        url: url
      };
      params.cache.push(data);
    });

    var callback = function(call) {
      if ($.isFunction(params.callback)) {
        params.callback.call(call.get(0));
      }
    };
    //动态显示数据
    var loading = function() {

      var contHeight = params.container.height();
      if ($(window).get(0) === window) {
        contop = $(window).scrollTop();
      } else {
        contop = params.container.offset().top;
      }

      $.each(params.cache, function(i, data) {
        var o = data.obj, tag = data.tag, url = data.url, post, posb;

        if (o) {
          post = o.offset().top - contop,  //容器向下滚动时 图片顶部 与 可视区域底部 的 距离
          posb = post + o.height();        //容器向上滚动时 图片底部 与 可视区域顶部 的 距离

          if ( (post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
            if (url) {
              //在浏览器窗口内
              if (tag === "div") {
                //url 加载完（存在浏览器内存）再替换图片
                $('<img/>').attr('src', url).load(function() {
                  $(this).remove(); // prevent memory leaks as @benweet suggested
                  callback(o.css("background", "url("+ url +") no-repeat"));
                  callback(o.css("background-size", "100%"));
                });
              } else {
                o.load(url, {}, function() {
                  callback(o);
                });
              }
            } else {
              // 无地址，直接触发回调
              callback(o);
            }
            data.obj = null;
          }
        }

      });
    };

    //事件触发
    //加载完毕即执行
    loading();
    //滚动执行
    params.container.bind("scroll", loading);
  };
})(jQuery);
