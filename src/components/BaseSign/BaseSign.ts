const defaultConfig = {
    defaultLineStyle: {
        strokeStyle: "black",
        lineWidth: 2,
        shadowBlur: 2,
        lineCap: 'round',
        shadowColor: 'black',  // 边缘颜色
        lineJoin: 'round',
    },
}

//判断是否是移动端
const isMobile = () => {
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent);
}

class canvasSign {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lineStyle: object;
    private isMouseDown: boolean;
    constructor(el:HTMLCanvasElement) {
        this.canvas = el
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.lineStyle = {
            ...defaultConfig.defaultLineStyle
        }
        this.isMouseDown = false
        this.setLineStyle()
        this.draw()
    }

    draw() {
        const arr = isMobile() ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
        arr.forEach(item => {
            this.eventMan(item);
        })
    }

    setLineStyle(style?:object) {
        Object.assign(this.lineStyle,style)
        Object.keys(this.lineStyle).forEach(key => {
            this.ctx[key] = this.lineStyle[key];
        });
    }

    /*
    * beginPath() 路径开始
    * moveTo() 画笔开始位置
    * lineTo() 画笔结束位置
    * stroke() 填充路径
    * */

    handleEvent() {
        const { left, top } = this.canvas.getBoundingClientRect();
        const mobile = isMobile();

        const handleMove = (e) => {
            //判断pc端是否左键按下，移动端不需要做判断
            if ((!this.isMouseDown || e.which != 1) && !mobile) return;
            e = mobile ? e.touches[0] : e;
            // e.preventDefault()
            const position = { x: e.clientX - left , y: e.clientY - top };
            this.ctx.lineTo(position.x,position.y)
            this.ctx.stroke()
        }
        const handleLeave = (e) => {
            //鼠标按下时候移出canvas中并且松开
            this.ctx.beginPath();
            // this.isMouseDown = false;
        }
        const handleUp = (e) => {
            const position = { x: e.clientX - left, y: e.clientY - top };
            this.ctx.lineTo(position.x,position.y)
            this.ctx.stroke()
            this.isMouseDown = false;
        }
        const handleDown = (e) => {
            e = isMobile() ? e.touches[0] : e;
            //按下键时候重置画笔
            this.ctx.beginPath();
            this.isMouseDown = true;
            const position = { x: e.clientX - left , y: e.clientY - top };
            this.ctx.moveTo(position.x,position.y)
        }
        return { handleMove, handleDown, handleLeave, handleUp };
    }

    eventMan(type) {
        const handleEvent = this.handleEvent();
        const raf = window.requestAnimationFrame;
        const move = raf?(e)=>{
            raf(() => {
                handleEvent.handleMove(e);
            });
        }:handleEvent.handleMove;
        const allFn = {
            mousedown: handleEvent.handleDown,
            mouseleave: handleEvent.handleLeave,
            mouseup: handleEvent.handleUp,
            mousemove: move,
            //移动端
            touchmove: move,
            touchstart: handleEvent.handleDown,
            touchend: handleEvent.handleLeave
        }
        this.canvas.addEventListener(type, allFn[type], false)
    }

    clear() {
        let width = this.canvas.width;
        let height = this.canvas.height;
        this.ctx.clearRect(0, 0, width, height);
    }

}

export default canvasSign