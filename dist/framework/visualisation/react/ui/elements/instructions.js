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
import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Translator } from '../../../../translator';
import { Title3 } from './text';
import TwitterSvg from '../../../../../assets/images/twitter.svg';
import TiktokSvg from '../../../../../assets/images/tiktok.svg';
import FacebookSvg from '../../../../../assets/images/facebook.svg';
import InstagramSvg from '../../../../../assets/images/instagram.svg';
import YoutubeSvg from '../../../../../assets/images/youtube.svg';
import TextBundle from '../../../../text_bundle';
import { Bullet } from './bullet';
var linkTwitter = 'https://eyra.co';
var linkFacebook = 'https://eyra.co';
var linkInstagram = 'https://eyra.co';
var linkYoutube = 'https://eyra.co';
var linkTikTokDe = 'https://drive.google.com/file/d/1IXjq9vHNnAuyJ7sDbBBbb3XIKfeB9kX4/view?usp=sharing';
var linkTikTokEn = 'https://drive.google.com/file/d/1m-Ulhyba-7kLuLq88Jz3LA53g0ciSO4_/view?usp=sharing';
export var Instructions = function (props) {
    var title = prepareCopy(props).title;
    var locale = props.locale;
    var platform = props.platform.toLowerCase();
    function renderBullets(bullets) {
        return bullets.map(function (bullet) { return renderBullet(bullet); });
    }
    function renderContent() {
        return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'flex flex-col gap-4 text-bodymedium font-body text-grey2' }, { children: [links[platform][locale], renderBullets(bullets[platform][locale])] })) }));
    }
    return (_jsxs("div", __assign({ className: 'flex flex-col gap-6 p-8 border-2 border-grey4 rounded' }, { children: [_jsxs("div", __assign({ className: 'flex flex-row gap-8 items-center' }, { children: [_jsx("div", __assign({ className: 'flex-grow' }, { children: _jsx(Title3, { text: title, margin: '' }) })), _jsx("div", __assign({ className: 'h-12' }, { children: _jsx("img", { className: 'h-12', src: icon[platform] }) }))] })), renderContent()] })));
};
function prepareCopy(_a) {
    var platform = _a.platform, locale = _a.locale;
    return {
        title: Translator.translate(title, locale)
    };
}
var title = new TextBundle()
    .add('en', 'Download Instructions')
    .add('nl', 'Download Anleitung');
function renderBullet(text) {
    return (_jsx(Bullet, __assign({ frameSize: 'w-5 h-30px' }, { children: _jsx("div", { children: text }) })));
}
var bulletsTwitterEn = [
    'Check the email that you received from Twitter',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsTwitterNl = [
    'Ga naar de email die u ontvangen heeft van Twitter.',
    'Klik op de link "gedownload” en sla het bestand op',
    'Kies het bestand en ga verder.'
];
var bulletsFacebookEn = [
    'Check the email that you received from Facebook',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsFacebookNl = [
    'Ga naar de email die u ontvangen heeft van Facebook.',
    'Klik op de link “Je gegevens downloaden” en sla het bestand op.',
    'Kies het bestand en ga verder.'
];
var bulletsInstagramEn = [
    'Check the email that you received from Instagram',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsInstagramNl = [
    'Ga naar de email die u ontvangen heeft van Instagram.',
    'Klik op de link “Gegevens downloaden” en sla het bestand op.',
    'Kies het bestand en ga verder.'
];
var bulletsYoutubeEn = [
    'Check the email that you received from Google Takeout',
    'Click on the download link and store the file',
    'Choose the stored file and continue'
];
var bulletsYoutubeNl = [
    'Ga naar de email die u ontvangen heeft van Google Takeout.',
    'Klik op de link “Je bestanden downloaden” en sla het bestand op.',
    'Kies het bestand en ga verder.'
];
var bulletsTikTokEn = [
    'Open your Tiktok App and tap on "Profile" in the lower right corner.',
    'Tap on the three vertical lines in the upper left corner to open a menu at the bottom of the screen.',
    'Tap on "Settings and privacy" and then on "Account".',
    'Here choose the thrid option "Download your data".',
    'Switch to the "Download data" tab and download your data donation. Follow the download instructions by TikTok.',
    'Once downloaded you can close your TikTok App and switch back to this WebApp.',
    'In case you opened the WebApp on the same device on which you use TikTok you can now proceed with tapping the "Choose file" button. Otherwise please transfer the downaloded file to the device where you have this WebApp open and proceed then.',
    'Should any issue occure during this process please reach out directly to lion.wedel@weizenbaum-institut.de.'
];
var bulletsTikTokNl = [
    'Öffnen deine TikTok App & klick auf "Profil" rechts-unten auf dem Bildschirm.',
    'Öffne das Kontextmenü über die drei vertikalen Linien oben-rechts.',
    'Wähle "Einstellungen und Datenschutz" und dann "Konto".',
    'Tippe hier auf die dritte Option "Deine Daten herunterladen".',
    'Wechsel zum "Daten runterladen"-Tab und lade deine Datenspende runter. Folge den Download-Anweisungen von TikTok',
    'Nach dem erfolgreichen Download kannst du die TikTok App schließen und zur Studie zurückkehren.',
    'Wenn du die Studien-Seite auf dem gleichen Gerät geöffnet hast auf dem du auch TikTok benutzt kannst du nun mit "Datei auswählen" fortfahren. Wenn nicht, sende die Datei bitte an das Gerät auf dem du die Studien-Seite geöffnet hast und wähle dann "Datei auswählen".',
    'Wenn irgentwelche Probleme auftauchen sollten, wende dich bitte direkt an lion.wedel@weizenbaum-institut.de.'
];
var bullets = {
    twitter: {
        en: bulletsTwitterEn,
        nl: bulletsTwitterNl
    },
    facebook: {
        en: bulletsFacebookEn,
        nl: bulletsFacebookNl
    },
    instagram: {
        en: bulletsInstagramEn,
        nl: bulletsInstagramNl
    },
    youtube: {
        en: bulletsYoutubeEn,
        nl: bulletsYoutubeNl
    },
    tiktok: {
        en: bulletsTikTokEn,
        nl: bulletsTikTokNl
    }
};
function linkEn(link) {
    return _jsxs("div", { children: ["Click ", _jsx("span", __assign({ className: 'text-primary underline' }, { children: _jsx("a", __assign({ href: link, target: '_blank', rel: 'noreferrer' }, { children: "here" })) })), " for more extensive instructions"] });
}
function linkNl(link) {
    return _jsxs("div", { children: ["Klick ", _jsx("span", __assign({ className: 'text-primary underline' }, { children: _jsx("a", __assign({ href: link, target: '_blank', rel: 'noreferrer' }, { children: "hier" })) })), " f\u00FCr erweiterte Anweisungen."] });
}
var links = {
    twitter: {
        en: linkEn(linkTwitter),
        nl: linkNl(linkTwitter)
    },
    facebook: {
        en: linkEn(linkFacebook),
        nl: linkNl(linkFacebook)
    },
    instagram: {
        en: linkEn(linkInstagram),
        nl: linkNl(linkInstagram)
    },
    youtube: {
        en: linkEn(linkYoutube),
        nl: linkNl(linkYoutube)
    },
    tiktok: {
        en: linkEn(linkTikTokEn),
        nl: linkNl(linkTikTokDe)
    }
};
var icon = {
    twitter: TwitterSvg,
    facebook: FacebookSvg,
    instagram: InstagramSvg,
    youtube: YoutubeSvg,
    tiktok: TiktokSvg
};
