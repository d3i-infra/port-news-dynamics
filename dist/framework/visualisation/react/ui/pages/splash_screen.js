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
import React from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { PrimaryButton } from '../elements/button';
import { CheckBox } from '../elements/check_box';
import { Label, Title1 } from '../elements/text';
//import LogoSvg from '../../../../../assets/images/logo.svg'
import LogoSvg from '../../../../../assets/images/logo.png';
import { Footer } from './templates/footer';
import { Page } from './templates/page';
import { Sidebar } from './templates/sidebar';
import { Bullet } from '../elements/bullet';
function prepareCopy(_a) {
    var locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        continueButton: Translator.translate(continueButton, locale),
        privacyLabel: Translator.translate(privacyLabel, locale)
    };
}
export var SplashScreen = function (props) {
    var _a = React.useState(false), checked = _a[0], setChecked = _a[1];
    var _b = React.useState(false), waiting = _b[0], setWaiting = _b[1];
    var _c = prepareCopy(props), title = _c.title, continueButton = _c.continueButton, privacyLabel = _c.privacyLabel;
    var locale = props.locale, resolve = props.resolve;
    function handleContinue() {
        if (checked && !waiting) {
            setWaiting(true);
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadVoid', value: undefined });
        }
    }
    function handleCheck() {
        setChecked(true);
    }
    function renderDescription() {
        if (locale === 'nl')
            return nlDescription;
        return enDescription;
    }
    var enDescription = (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'text-bodylarge font-body text-grey1' }, { children: [_jsx("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: "You are about to start the process of donating your TikTok data for a research project run by the University of Amsterdam and the Weizenbaum Instiute for the Networked Society in Berlin. The data that we ask you to donate will be used for academic research to gain insight into how social media platforms work." })), _jsx("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: "We will walk you through this process step by step. During this process no data is stored or sent to a server. Data will only be donated and stored when you click the button \u201CYes, donate\u201D on the page that shows your data." })), _jsxs("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: ["For the donation of a valid data package you will receive ", _jsx("span", __assign({ className: 'font-bodybold' }, { children: "20 Euros" })), ". A valid data package contains an activity on at least 5 different days or at least 200 activity instances in total."] })), _jsxs("div", __assign({ className: 'mb-6 text-bodylarge font-body text-grey1' }, { children: ["By clicking the button \u201C", _jsx("span", __assign({ className: 'font-bodybold' }, { children: "Yes, donate" })), "\u201D:"] })), _jsxs("div", __assign({ className: 'flex flex-col gap-3 mb-6' }, { children: [_jsx(Bullet, { children: _jsx("div", { children: "you have read and agreed with the information provided during the onboarding survey." }) }), _jsx(Bullet, { children: _jsx("div", { children: "you fully and voluntarily agree to donate your data for this research." }) }), _jsx(Bullet, { children: _jsx("div", { children: "you are aware that when your data is used for academic publications, or made publicly available in some other form, this will be anonymized." }) }), _jsx(Bullet, { children: _jsx("div", { children: "you are aware that you have the right to withdraw your permission for this data to be used, until the pseudonyms are deleted from the dataset. This will happen once the data collection phase has ended, no later than within 6 weeks." }) })] })), _jsx("div", __assign({ className: 'mb-10' }, { children: "This website keeps track of your activity - for example on which pages of this website you click - as part of this research." }))] })) }));
    var nlDescription = (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'text-bodylarge font-body text-grey1' }, { children: [_jsx("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: "Sie stehen kurz davor, den Prozess zu starten, Ihre TikTok-Daten f\u00FCr ein Forschungsprojekt der Universit\u00E4t von Amsterdam und des Weizenbaum Instituts f\u00FCr die vernetzte Gesellschaft in Berlin zu spenden. Die Daten, um deren Spende wir Sie bitten, werden f\u00FCr die akademische Forschung verwendet, um Einblicke dar\u00FCber zu gewinnen, wie TikTok funktioniert." })), _jsx("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: "Wir werden Sie Schritt f\u00FCr Schritt durch diesen Prozess f\u00FChren. W\u00E4hrend dieses Prozesses werden keine Daten gespeichert oder an einen Server gesendet. Daten werden erst gespendet und gespeichert, wenn Sie auf der Seite, die Ihre Daten anzeigt, auf den Button \u201EJa, spenden\u201C klicken." })), _jsxs("div", __assign({ className: 'mb-4 text-bodylarge font-body text-grey1' }, { children: ["F\u00FCr das Einreichen einer g\u00FCltigen Datenspende erhalten Sie ", _jsx("span", __assign({ className: 'font-bodybold' }, { children: "20 Euro" })), " als Entsch\u00E4digung. Die Datenspende ist nur dann g\u00FCltig wenn diese an mindestens 5 Tagen Aktivit\u00E4ten enth\u00E4lt oder mindestens 200 Aktivit\u00E4ts-Eintr\u00E4ge insgesamt."] })), _jsxs("div", __assign({ className: 'mb-6 text-bodylarge font-body text-grey1' }, { children: ["Durch das klicken auf den Button \u201C", _jsx("span", __assign({ className: 'font-bodybold' }, { children: "Ja, spenden" })), "\u201D:"] })), _jsxs("div", __assign({ className: 'flex flex-col gap-3 mb-6' }, { children: [_jsx(Bullet, { children: _jsx("div", { children: "erkl\u00E4ren Sie, dass Sie die Informationen im Onboarding-Survey zur Kenntnis genommen haben und diesen zustimmen." }) }), _jsx(Bullet, { children: _jsx("div", { children: "erkl\u00E4ren Sie sich vollst\u00E4ndig und freiwillig einverstanden, Ihre Daten f\u00FCr diese Forschung zu spenden." }) }), _jsx(Bullet, { children: _jsx("div", { children: "erkl\u00E4ren Sie sich einverstanden, dass Ihre Daten f\u00FCr akademische Ver\u00F6ffentlichungen genutzt werden oder in einer anderen Form \u00F6ffentlich gemacht werden k\u00F6nnen, dies geschieht in anonymisierter Form." }) }), _jsx(Bullet, { children: _jsx("div", { children: "sind Sie sich dar\u00FCber im Klaren, dass Sie das Recht haben, Ihre Zustimmung zur Teilnahme auch nachtr\u00E4glich zur\u00FCckzuziehen. Jedoch nur, bis die Datenspenden vollst\u00E4ndig anonymisiert werden (d.h. wenn die Pseudonyme aus dem Datensatz entfernt sind). Dies ist sp\u00E4testens in 6 Wochen der Fall." }) })] })), _jsx("div", __assign({ className: 'mb-10' }, { children: "Diese Website verfolgt Ihre Aktivit\u00E4ten - zum Beispiel, auf welchen Seiten dieser Website Sie klicken - als Teil dieser Forschung." }))] })) }));
    var footer = _jsx(Footer, {});
    var sidebar = _jsx(Sidebar, { logo: LogoSvg });
    var body = (_jsxs(_Fragment, { children: [_jsx(Title1, { text: title }), renderDescription(), _jsxs("div", __assign({ className: 'flex flex-col gap-8' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: [_jsx(CheckBox, { id: '0', selected: checked, onSelect: function () { return handleCheck(); } }), _jsx(Label, { text: privacyLabel })] })), _jsx("div", __assign({ className: "flex flex-row gap-4 ".concat(checked ? '' : 'opacity-30') }, { children: _jsx(PrimaryButton, { label: continueButton, onClick: handleContinue, enabled: checked, spinning: waiting }) }))] }))] }));
    return (_jsx(Page, { body: body, sidebar: sidebar, footer: footer }));
};
var title = new TextBundle()
    .add('en', 'Welcome')
    .add('nl', 'Willkommen');
var continueButton = new TextBundle()
    .add('en', 'Start')
    .add('nl', 'Start');
var privacyLabel = new TextBundle()
    .add('en', 'I have read and agree with the above terms.')
    .add('nl', 'Ich habe die obenstehenden Bedingungen gelesen und stimme ihnen zu.');
