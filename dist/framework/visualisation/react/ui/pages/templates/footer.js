var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// function footerLinks (): JSX.Element {
//  return (
//    <div className='flex flex-row gap-4 text-link font-link'>
//      <div className=' text-primary underline'><a href='https://eyra.co' target='_blank' rel='noreferrer'>Privacy</a></div>
//      <div className='bg-grey3 w-1px' />
//      <div className=' text-primary underline'><a href='https://eyra.co' target='_blank' rel='noreferrer'>Support</a></div>
//    </div>
//  )
// }
function footerLinks() {
    return (_jsx("div", { className: 'flex flex-row gap-4 text-link font-link' }));
}
export var Footer = function (_a) {
    var _b = _a.left, left = _b === void 0 ? footerLinks() : _b, middle = _a.middle, right = _a.right;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: 'bg-grey4 h-px' }), _jsx("div", __assign({ className: 'h-full flex flex-col justify-center' }, { children: _jsxs("div", __assign({ className: 'flex flex-row gap-4 px-14' }, { children: [_jsx("div", __assign({ className: 'w-1/3' }, { children: left })), _jsx("div", __assign({ className: 'w-1/3' }, { children: middle })), _jsx("div", __assign({ className: 'w-1/3' }, { children: right }))] })) }))] }));
};
