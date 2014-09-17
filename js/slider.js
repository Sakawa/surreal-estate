var lcsx;
var lcsy;
var hcsx;
var hcsy;
/**
 * @constructor
 * @param min Minimum value of the slider
 * @param max Maximum value of the slider
 * @param default Default value to display at start
 * @param label Default label to display
 */
function Slider(min, max, lvalue, uvalue, label, width, height, padding, parent) {
    this.min_ = min;
    this.max_ = max;
    this.lvalue_ = lvalue;
    this.uvalue_ = uvalue;
    this.label_ = label;
    this.canvas_ = document.createElement('canvas');
    this.context_ = this.canvas_.getContext('2d');
    this.canvas_.height = height;
    this.canvas_.width = width;

    // Calculate
    this.sx_ = padding;
    this.sy_ = this.canvas_.height / 2;
    this.ex_ = this.canvas_.width - padding;
    this.ey_ = this.canvas_.height / 2;

    this.isMouseDown_ = false;
    this.moveLower_ = false;
    this.moveUpper_ = false;

    // Bind listeners to canvas
    this.canvas_.addEventListener('mousedown', bind(this, this.mousedown), false);
    this.canvas_.addEventListener('mousemove', bind(this, this.mousemove), false);
    this.canvas_.addEventListener('mouseup', bind(this, this.mouseup), false);

    // Draw elements on start
    this.draw(parent);
    this.redraw();
};

/**
 * Sets the value of the slider if in bounds
 */
Slider.prototype.setMinValue = function(value) {
    if (value >= this.min_ && value <= this.uvalue_) {
        this.lvalue_ = value;
    } else if (value < this.min_) {
        this.lvalue_ = this.min_;
    } else if (value > this.uvalue_) {
        this.lvalue_ = this.uvalue_;
    }
    this.lvalue_ = Math.round(this.lvalue_);
    var llx = this.ex_ - this.sx_;
    var lly = this.ey_ - this.sy_;
    var lfrac = (this.lvalue_ - this.min_) / (this.max_ - this.min_);
    lcsx = this.sx_ + llx * lfrac;
    lcsy = this.sy_ + lly * lfrac;
    var hfrac = (this.uvalue_ - this.min_) / (this.max_ - this.min_);
    hcsx = this.sx_ + llx * hfrac;
    hcsy = this.sy_ + lly * hfrac;
};

/**
 * Sets the value of the slider if in bounds
 */
Slider.prototype.setMaxValue = function(value) {
    if (value >= this.lvalue_ && value <= this.max_) {
        this.uvalue_ = value;
    } else if (value < this.min_) {
        this.uvalue_ = this.min_;
    } else if (value < this.lvalue_) {
        this.uvalue_ = this.lvalue_;
    }
    this.uvalue_ = Math.round(this.uvalue_);
};

/**
 * @return value of the slider
 */
Slider.prototype.getMinValue = function() {
    return this.lvalue_;
};

Slider.prototype.getMaxValue = function() {
    return this.uvalue_;
}

/**
 * Redraws all elements of the canvas
 */
Slider.prototype.redraw = function() {
    var canvas = this.canvas_;
    var ctx = this.context_;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawSliderLine(this.sx_, this.sy_, this.ex_, this.ey_, '#A6CDEF', 20);
    this.drawSliderLine(lcsx, lcsy, hcsx, hcsy, '#409AD2', 20);
    this.redrawCircle();
    this.drawLabels();
    this.displayValue();
};

/**
 * Draws the slider on to the container for the first time
 */
Slider.prototype.draw = function(container) {
    container.appendChild(this.canvas_);
    var canvas = this.canvas_;
    var ctx = this.context_;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw line and circle
    this.drawSliderLine(this.sx_, this.sy_, this.ex_, this.ey_, '#A6CDEF', 20);
    this.drawSliderLine(lcsx, lcsy, hcsx, hcsy, '#409AD2', 20);
    this.redrawCircle();

    // Labels
    this.drawLabels();
    this.displayValue();
};

/**
 * Redraws the position of the slider circle based on the current value.
 * @param value Current value
 */
Slider.prototype.redrawCircle = function() {
    var llx = this.ex_ - this.sx_;
    var lly = this.ey_ - this.sy_;
    var lfrac = (this.lvalue_ - this.min_) / (this.max_ - this.min_);
    lcsx = this.sx_ + llx * lfrac;
    lcsy = this.sy_ + lly * lfrac;
    var hfrac = (this.uvalue_ - this.min_) / (this.max_ - this.min_);
    hcsx = this.sx_ + llx * hfrac;
    hcsy = this.sy_ + lly * hfrac;
    this.drawSliderCircle(lcsx-7.5, lcsy-15, '#F8FBFF', 30, '#409AD2', 1);
    this.drawSliderCircle(hcsx-7.5, hcsy-15, '#F8FBFF', 30, '#409AD2', 1);
};

/**
 * Draws the labels for this canvas.
 */
Slider.prototype.drawLabels = function() {
    var ctx = this.context_;
    var minLabel = '' + this.min_;
    var maxLabel = '' + this.max_;
    ctx.save();
    ctx.font = '15pt Lato';
    var minTextWidth = ctx.measureText(minLabel).width;
    var mintx = this.sx_ - minTextWidth - 20;
    var maxtx = this.ex_ + 20;
    ctx.fillStyle = '#333';
    ctx.fillText(minLabel, mintx, this.sy_ + 10);
    ctx.fillText(maxLabel, maxtx, this.sy_ + 10);
    ctx.restore();
};

/**
 * Displays the current value under the circle.
 */
Slider.prototype.displayValue = function() {
    var ctx = this.context_;
    var ltext = '' + this.lvalue_;
    var htext = '' + this.uvalue_;
    ctx.save();
    ctx.font = '300 20pt Lato';
    var ltextWidth = ctx.measureText(ltext).width;
    var htextWidth = ctx.measureText(htext).width;
    var lox = (this.lvalue_ - this.min_) / (this.max_ - this.min_) * (this.ex_ - this.sx_) + this.sx_ - ltextWidth / 2;
    var hox = (this.uvalue_ - this.min_) / (this.max_ - this.min_) * (this.ex_ - this.sx_) + this.sx_ - htextWidth / 2;
    ctx.fillStyle = '#333';
    ctx.fillText(ltext, lox, this.sy_ + 40);
    ctx.fillText(htext, hox, this.sy_ + 40);
    ctx.restore();
};

/**
 * Listener for mouse down
 */
Slider.prototype.mousedown = function() {
    this.isMouseDown_ = true;
    var canvas = this.canvas_;
    var mx = window.event.pageX - canvas.offsetLeft;
    var my = window.event.pageY - canvas.offsetTop;
    if (my <= 65 && my >= 35) {
        var value = (mx - this.sx_) / (this.ex_ - this.sx_) * (this.max_ - this.min_);
        if (Math.abs(value - this.lvalue_) / (this.max_ - this.min_) < 0.0125) {
            this.moveLower_ = true;
            return;
        }
        if (Math.abs(value - this.uvalue_) / (this.max_ - this.min_) < 0.0125) {
            console.log('asdf');
            this.moveUpper_ = true;
            return;
        }
    }
};

/**
 * Listener for mouse move
 * Should only do something if the mouse is down in the first place
 */
Slider.prototype.mousemove = function() {
    if (this.isMouseDown_) {
        var canvas = this.canvas_;
        var mx = window.event.pageX - canvas.offsetLeft;
        var value = (mx - this.sx_) / (this.ex_ - this.sx_) * (this.max_ - this.min_);
        if (this.moveLower_) {
            this.setMinValue(value);
        }
        if (this.moveUpper_) {
            this.setMaxValue(value);
        }
        this.context_.clearRect(0, 0, canvas.width, canvas.height);
        this.redraw();
    }
};

/**
 * Listener for mouse up
 */
Slider.prototype.mouseup = function() {
    this.isMouseDown_ = false;
    this.moveLower_ = false;
    this.moveUpper_ = false;
};

/**
 * Draw a custom line for our slider according to our design
 * Currently blindly copies a default line, but we may want to change our design.
 * @param startX X-coordinate of the starting point of the line
 * @param startY Y-coordinate of the starting point of the line
 * @param endX X-coordinate of the ending point of the line
 * @param endY Y-coordinate of the ending point of the line
 * @param strokeStyle Color of the stroke
 * @param lineWidth Thickness of the line
 */
Slider.prototype.drawSliderLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
    this.drawLine(startX, startY, endX, endY, strokeStyle, lineWidth);
};

/**
 * Draw a line on a HTML canvas
 * @param startX X-coordinate of the starting point of the line
 * @param startY Y-coordinate of the starting point of the line
 * @param endX X-coordinate of the ending point of the line
 * @param endY Y-coordinate of the ending point of the line
 * @param strokeStyle Color of the stroke
 * @param lineWidth Thickness of the line
 */
Slider.prototype.drawLine = function(startX, startY, endX, endY, strokeStyle, lineWidth) {
    var ctx = this.context_;
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};

/**
 * Draws a circle on the slider that is according to our design
 * Currently two concentric circles
 * @param centerX X-coordinate of the center of the circle
 * @param centerY Y-coordinate of the center of the circle
 * @param color Color of the inner circle
 * @param radius Radius of the inner circle
 * @param borderColor Color of the border
 * @param borderRadius Thickness of the border (not included in the inner circle)
 */
Slider.prototype.drawSliderCircle = function(centerX, centerY, color, radius, borderColor, borderThickness) {
    // this.drawCircle(centerX, centerY, borderColor, radius + borderThickness);
    // this.drawCircle(centerX, centerY, color, radius);
    this.drawCircle(centerX-borderThickness, centerY-borderThickness, borderColor, radius/1.5+borderThickness*2, radius+borderThickness*2, 5);
    this.drawCircle(centerX, centerY, color, radius/1.5, radius, 5);
};

/**
 * Draws a basic circle on the canvas
 * @param centerX X-coordinate of the center of the circle
 * @param centerY Y-coordinate of the center of the circle
 * @param color Color of the circle
 * @param radius Radius of the circle
 */
// Slider.prototype.drawCircle = function(centerX, centerY, color, radius) {
//     var ctx = this.context_;
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     ctx.fillStyle = color;
//     ctx.fill();
//     ctx.restore();
// };
Slider.prototype.drawCircle = function(x, y, color, width, height, radius) {
    var ctx = this.context_;
    if (typeof stroke == "undefined" ) {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
};
/**
 * Binds a function listener to a scope
 * @param scope Scope to bind to
 * @param fn Function to bind
 */
function bind(scope, fn) {
    return function() {
        return fn.apply(scope, arguments);
    }
};