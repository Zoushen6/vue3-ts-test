
class canvasSign {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor(el:HTMLCanvasElement) {
        this.canvas = el
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
}