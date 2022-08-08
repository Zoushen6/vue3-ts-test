const defaultConfig = {
    defaultLineStyle: {
        strokeStyle: "black",
        lineWidth: 2,
        // shadowBlur: 2,  //加shadowBlur在crops=false时会导致生成背景颜色时（fillRect）变成黑色背景
        lineCap: 'round',
        shadowColor: 'black',  // 边缘颜色
        lineJoin: 'round',
    },
}

//判断是否是移动端
const isMobile = () => {
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent);
}

type optionSet = {
    format: string,
    quality: number,
    isCrop: boolean
}

class canvasSign {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lineStyle: object;
    private isMouseDown: boolean;
    private hasDrawn: boolean;
    private resultImg?: string;
    private backgroundColor: string;
    constructor(el:HTMLCanvasElement) {
        this.canvas = el
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.lineStyle = {
            ...defaultConfig.defaultLineStyle
        }
        this.backgroundColor = ''
        this.isMouseDown = false
        this.hasDrawn = false
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

    setBackgroundColor(color:string) {
        this.backgroundColor = color
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
            this.hasDrawn = true;
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
        this.hasDrawn = false;
        this.ctx.clearRect(0, 0, width, height);
    }

    getPNGImage(canvas = this.canvas) {
        return canvas.toDataURL('image/png');
    }

    getJPGImage(canvas = this.canvas) {
        return canvas.toDataURL('image/jpeg');
    }

    // 操作
    generate (options?:optionSet) {
        let imgFormat = options && options.format ? options.format: 'image/png'
        let imgQuality = options && options.quality ? options.quality: 1
        return new Promise((resolve, reject) => {
            if (!this.hasDrawn) {
                reject(`Warning: Not Signned!`)
                return
            }
            let resImgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.globalCompositeOperation = "destination-over"
            this.ctx.fillStyle = this.backgroundColor
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
            this.resultImg = this.canvas.toDataURL(imgFormat, imgQuality)
            let resultImg = this.resultImg
            this.ctx.clearRect(0, 0, this.canvas.width ,this.canvas.height)
            this.ctx.putImageData(resImgData, 0, 0)
            this.ctx.globalCompositeOperation = "source-over"
            if (options&&options.isCrop) {
                const crop_area = this.getCropArea(resImgData.data)
                let crop_canvas = document.createElement('canvas')
                const crop_ctx:any = crop_canvas.getContext('2d')
                crop_canvas.width = crop_area[2] - crop_area[0]
                crop_canvas.height = crop_area[3] - crop_area[1]
                const crop_imgData = this.ctx.getImageData(crop_area[0],crop_area[1],crop_area[2],crop_area[3],)
                crop_ctx.globalCompositeOperation = "destination-over"
                crop_ctx.putImageData(crop_imgData, 0, 0)
                crop_ctx.fillStyle = this.backgroundColor
                crop_ctx.fillRect(0, 0, crop_canvas.width , crop_canvas.height)
                resultImg = crop_canvas.toDataURL(imgFormat, imgQuality)
                // crop_canvas = null
            }
            resolve(resultImg)
        })
    }

    getCropArea (imgData) {
        let topX = this.canvas.width; let btmX = 0; let topY = this.canvas.height; let btnY = 0
        for (let i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
                let pos = (i + this.canvas.width * j) * 4
                if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
                    btnY = Math.max(j, btnY)
                    btmX = Math.max(i, btmX)
                    topY = Math.min(j, topY)
                    topX = Math.min(i, topX)
                }
            }
        }
        topX++
        btmX++
        topY++
        btnY++
        const data = [topX-10, topY-10, btmX+10, btnY+10]
        return data
    }

}

export default canvasSign