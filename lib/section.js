"use strict";
var SectionRenderChain = (function () {
    function SectionRenderChain(base, section) {
        this.section = section;
        this.base = base;
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
    Section.prototype.apply = function (target) {
        return new SectionRenderChain(target, this);
    };
    return Section;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Section;
