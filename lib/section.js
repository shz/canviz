"use strict";
var SectionRenderChain = (function () {
    function SectionRenderChain(base, section, clip) {
        this.section = section;
        this.base = base;
        this.clip = clip;
    }
    SectionRenderChain.prototype.draw = function (f) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.base.draw(function (c) {
            var extendedCanvas = Object.create(c, {
                width: {
                    writable: false,
                    value: _this.section.w
                },
                height: {
                    writable: false,
                    value: _this.section.h
                }
            });
            c.translate(_this.section.x, _this.section.y);
            if (_this.clip) {
                c.beginPath();
                c.moveTo(0, 0);
                c.rect(0, 0, _this.section.w, _this.section.h);
                c.closePath();
                c.clip();
            }
            f.apply(void 0, [extendedCanvas].concat(args));
        });
    };
    return SectionRenderChain;
}());
var Section = (function () {
    function Section(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Section.prototype.apply = function (target, clip) {
        if (clip === void 0) { clip = false; }
        return new SectionRenderChain(target, this, clip);
    };
    return Section;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Section;
