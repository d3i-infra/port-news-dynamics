import { Translator } from '../../../../translator'
import { ReactFactoryContext } from '../../factory'
import { Title3 } from './text'
import TwitterSvg from '../../../../../assets/images/twitter.svg'
import TiktokSvg from '../../../../../assets/images/tiktok.svg'
import FacebookSvg from '../../../../../assets/images/facebook.svg'
import InstagramSvg from '../../../../../assets/images/instagram.svg'
import YoutubeSvg from '../../../../../assets/images/youtube.svg'
import TextBundle from '../../../../text_bundle'
import { Bullet } from './bullet'

const linkTwitter: string = 'https://eyra.co'
const linkFacebook: string = 'https://eyra.co'
const linkInstagram: string = 'https://eyra.co'
const linkYoutube: string = 'https://eyra.co'
const linkTikTokDe: string = 'https://drive.google.com/file/d/1IXjq9vHNnAuyJ7sDbBBbb3XIKfeB9kX4/view?usp=sharing'
const linkTikTokEn: string = 'https://drive.google.com/file/d/1m-Ulhyba-7kLuLq88Jz3LA53g0ciSO4_/view?usp=sharing'

interface InstructionsProps {
  platform: string
  locale: string
}

type Props = InstructionsProps & ReactFactoryContext

export const Instructions = (props: Props): JSX.Element => {
  const { title } = prepareCopy(props)
  const { locale } = props
  const platform = props.platform.toLowerCase()

  function renderBullets (bullets: string[]): JSX.Element[] {
    return bullets.map((bullet) => renderBullet(bullet))
  }

  function renderContent (): JSX.Element {
    return (
      <>
        <div className='flex flex-col gap-4 text-bodymedium font-body text-grey2'>
          {renderBullets(bullets[platform][locale])}
          {links[platform][locale]}
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col gap-6 p-8 border-2 border-grey4 rounded'>
      <div className='flex flex-row gap-8 items-center'>
        <div className='flex-grow'>
          <Title3 text={title} margin='' />
        </div>
        <div className='h-12'>
          <img className='h-12' src={icon[platform]} />
        </div>
      </div>
      {renderContent()}
    </div>
  )
}

interface Copy {
  title: string
}

function prepareCopy ({ platform, locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale)
  }
}

const title = new TextBundle()
  .add('en', 'Download Instructions')
  .add('nl', 'Download Anleitung')

function renderBullet (text: string): JSX.Element {
  return (
    <Bullet frameSize='w-5 h-30px'>
      <div>{text}</div>
    </Bullet>
  )
}

const bulletsTwitterEn: string[] = [
  'Check the email that you received from Twitter',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsTwitterNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Twitter.',
  'Klik op de link "gedownload” en sla het bestand op',
  'Kies het bestand en ga verder.'
]

const bulletsFacebookEn: string[] = [
  'Check the email that you received from Facebook',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsFacebookNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Facebook.',
  'Klik op de link “Je gegevens downloaden” en sla het bestand op.',
  'Kies het bestand en ga verder.'
]

const bulletsInstagramEn: string[] = [
  'Check the email that you received from Instagram',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsInstagramNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Instagram.',
  'Klik op de link “Gegevens downloaden” en sla het bestand op.',
  'Kies het bestand en ga verder.'
]

const bulletsYoutubeEn: string[] = [
  'Check the email that you received from Google Takeout',
  'Click on the download link and store the file',
  'Choose the stored file and continue'
]

const bulletsYoutubeNl: string[] = [
  'Ga naar de email die u ontvangen heeft van Google Takeout.',
  'Klik op de link “Je bestanden downloaden” en sla het bestand op.',
  'Kies het bestand en ga verder.'
]

const bulletsTikTokEn: string[] = [
  'Open your Tiktok App and tap on "Profile" in the lower right corner.',
  'Tap on the three vertical lines in the upper left corner to open a menu at the bottom of the screen.',
  'Tap on "Settings and privacy" and then on "Account".',
  'Here choose the thrid option "Download your data".',
  'Switch to the "Download data" tab and download your data donation. Follow the download instructions by TikTok.',
  'Once downloaded you can close your TikTok App and switch back to this WebApp.',
  'In case you opened the WebApp on the same device on which you use TikTok you can now proceed with tapping the "Choose file" button. Otherwise please transfer the downaloded file to the device where you have this WebApp open and proceed then.',
  'Should any issue occure during this process please reach out directly to lion.wedel@weizenbaum-institut.de.'
]

const bulletsTikTokNl: string[] = [
  'Öffnen deine TikTok App & klick auf "Profil" rechts-unten auf dem Bildschirm.',
  'Öffne das Kontextmenü über die drei vertikalen Linien oben-rechts.',
  'Wähle "Einstellungen und Datenschutz" und dann "Konto".',
  'Tippe hier auf die dritte Option "Deine Daten herunterladen".',
  'Wechsel zum "Daten runterladen"-Tab und lade deine Datenspende runter. Folge den Download-Anweisungen von TikTok',
  'Nach dem erfolgreichen Download kannst du die TikTok App schließen und zur Studie zurückkehren.',
  'Wenn du die Studien-Seite auf dem gleichen Gerät geöffnet hast auf dem du auch TikTok benutzt kannst du nun mit "Datei auswählen" fortfahren. Wenn nicht, sende die Datei bitte an das Gerät auf dem du die Studien-Seite geöffnet hast und wähle dann "Datei auswählen".',
  'Wenn irgentwelche Probleme auftauchen sollten, wende dich bitte direkt an lion.wedel@weizenbaum-institut.de.'
]

const bullets: Record<string, Record<string, string[]>> = {
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
}

function linkEn (link: string): JSX.Element {
  return <div>Click <span className='text-primary underline'><a href={link} target='_blank' rel='noreferrer'>here</a></span> for more extensive instructions</div>
}

function linkNl (link: string): JSX.Element {
  return <div>Klick <span className='text-primary underline'><a href={link} target='_blank' rel='noreferrer'>hier</a></span> für erweiterte Anweisungen.</div>
}

const links: Record<string, Record<string, JSX.Element>> = {
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
}

const icon: Record<string, string> = {
  twitter: TwitterSvg,
  facebook: FacebookSvg,
  instagram: InstagramSvg,
  youtube: YoutubeSvg,
  tiktok: TiktokSvg
}
