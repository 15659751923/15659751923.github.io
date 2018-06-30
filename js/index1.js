/*
* 加载完成事件 在该事件 写的js代码 去获取 dom元素 就一定不会出现找不到问题
*/
window.onload = function (){
	//顶部的通栏 滚动效果
	headerScroll();
	//倒计时的效果
	cutDownTime();
	//轮播图效果
	banner();
}

//通栏方法
/*
	获取 导航栏的 高度

	在onscroll 事件中 去修改颜色
		0-1的透明度
		获取到 滚动的距离
		滚动的距离 /导航栏  0-1的浮点数
		滚动的距离 大于导航栏 >1  如果透明度 >1 变为1

		通过js  修改 顶部通栏的 透明度即可
			为了保证 子元素 能够正常显示 rgba()  hsla();
*/
function headerScroll(){
	//1. 获取一些 必须要知道的 参数
	/*
		导航栏的高度
		顶部的通栏 (为了在 onscroll 事件中 使用 避免 一只获取 造成的 性能浪费(很小))
	*/
	// 距离 顶部的 高度
	// console.log('offsetTop:'+document.querySelector('.jd_nav').offsetTop);
	// console.log('offsetHeight:'+document.querySelector('.jd_nav').offsetHeight);
	// 获取 导航栏
	var navDom = document.querySelector('.jd_nav');
	//  希望获取的是 从顶部 到 导航栏 底部的 距离
	var maxDistance = navDom.offsetTop + navDom.offsetHeight; 
	// console.log(maxDistance);
	// // 获取 顶部的通栏
	var headerDom = document.querySelector('.jd_header');
	// 0 为了保证默认是透明度 可以再这里 直接设置 rgba的a 为0
	// 使用js 修改的样式 会变为 行内式
	headerDom.style.backgroundColor = 'rgba(201,21,35,0)';
	// 2.注册 onscroll 事件 注册给谁
	window.onscroll = function(){
		// console.log('123');
		//  获取 滚动的距离 body 是通过 document 点出来的
		//  兼容问题（scrollTop	）
		var scrollDistance = window.document.body.scrollTop ||  window.document.documentElement.scrollTop;
	    // console.log(scrollDistance);
	    // // 计算一个 0-1的百分数
	    var percent = scrollDistance/ maxDistance;
	    // console.log(percent);
	    // 如果 超过了1 没有意义了 所以 还原为1
	    if(percent>1){
	    	percent = 1;
	    }
	    // 到这 获取到的 一定是 0-1
		// 设置 顶部通栏的透明度
		headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
	}	
}

// 倒计时方法
/*
	定义一个 倒计时的 总时间
	获取 想要修改的 li标签

	开启定时器
		判断 是否时间没有了
		递减时间
		修改 对应标签的显示
*/
function cutDownTime() {
	// 定义 总时间 写时间时 建议 这样写
	var totalHour = 3;
	var totalSec = totalHour*60*60;
	// console.log(totalSec);
	// // 加多一秒 让用户看到的时候 是从整数 开始
	// totalSec++;
	 // var totalSec = 5;
	// 获取 想要修改的所有li标签
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	// console.log(liArr);
	// 开启 定时器
	// 有了 定时器id 以后 就能够 干掉该id 对应的 定时器
	var timeId = setInterval(function(){
		// 0 判断 是否 小于0了
		if(totalSec<=0){
			// 干掉 定时器
			clearInterval(timeId);
			console.log('结束啦，你买不到了');
			return;
		}
		totalSec--;
		// 当前的秒 对应到 多少小时 多少分 多少秒
		/*
			3671
			1小时
			1分
			11秒
			/ 除法
			% 取余 
		*/
		var hour = Math.floor(totalSec/3600);
		var minute = Math.floor(totalSec%3600/60);
		var sec = Math.floor(totalSec%60);
		// 2修改dom元素显示

		// 小时
		liArr[0].innerHTML = Math.floor(hour/10);
		liArr[1].innerHTML = hour%10;

		liArr[3].innerHTML = Math.floor(minute/10);
		liArr[4].innerHTML = minute%10;

		liArr[6].innerHTML = Math.floor(sec/10);
		liArr[7].innerHTML = sec%10;
	},1000);

}
	// 轮播图方法

function banner(){
	//1 获取变量
	// 屏幕的宽度
	var width = document.body.offsetWidth;
	// console.log(width);
	//  获取 轮播图的ul
	var moveUl = document.querySelector('.banner_images');
	// 添加过度效果 由于后面已经设置了 所以 这里 已经没有意义了
	// moveUl.style.transition = 'all .3s';

	// 索引的li标签
	var indexLiArr = document.querySelectorAll('.banner_index li');
	var index = 1;
	// 开启定时器
	var startTransition = function(){
		moveUl.style.transition = 'all .3s'; 
	}
	var endTransition = function(){
		moveUl.style.transition = '';
	}

	var startTransform = function(distance){
		moveUl.style.transform = 'translateX('+distance+'px)';
	}
	var timeId = setInterval(function(){
		index++;

		startTransition();

		// moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		startTransform(index*width*-1);
	},1000);
	
	moveUl.addEventListener('webkitTransitionEnd',function(){

		if(index>8){
			index = 1;
			endTransition()
			// moveUl.style.transform = 'translateX('+index*width*-1+'px)';
			startTransform(index*width*-1);
		}else if(index<1){
			index=8;
			endTransition();
			// moveUl.style.transform = 'translateX('+index*width*-1+'px)';
			startTransform(index*width*-1);
		}
		for(var i=0;i<indexLiArr.length;i++){
			indexLiArr[i].className = '';
		}
		indexLiArr[index-1].className = 'current';
	});
	// 注册三个事件
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;

	moveUl.addEventListener('touchstart',function(event){
		clearInterval(timeId);
		endTransition();
		startX = event.touches[0].clientX;
	})
	moveUl.addEventListener('touchmove',function(event){
		moveX = event.touches[0].clientX-startX;
		// moveUl.style.transform = 'translateX('+(moveX+index*-1*width)+'px)';
		startTransform(moveX+index*-1*width);
	})
	moveUl.addEventListener('touchend',function(event){
		var maxDistance = width/3;
		if(Math.abs(moveX)>maxDistance){
			if(moveX>0){
				index--;
			}else{
				index++;
			}
			startTransition();
			startTransform(index*-1*width);
		}else{
			startTransition();
			startTransform(index*-1*width);
		}
		timeId = setInterval(function(){
		index++;
		startTransition();
		startTransform(index*-1*width);
	},1000)

	})
	
}	