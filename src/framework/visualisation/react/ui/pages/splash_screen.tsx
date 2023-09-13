import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { CheckBox } from '../elements/check_box'
import { Label, Title1 } from '../elements/text'
//import LogoSvg from '../../../../../assets/images/logo.svg'
import LogoSvg from '../../../../../assets/images/logo.png'
import { Footer } from './templates/footer'
import { Page } from './templates/page'
import { Sidebar } from './templates/sidebar'
import { Bullet } from '../elements/bullet'

interface Copy {
  title: string
  continueButton: string
  privacyLabel: string
}

type Props = Weak<PropsUIPageSplashScreen> & ReactFactoryContext

function prepareCopy ({ locale }: Props): Copy {
  return {
    title: Translator.translate(title, locale),
    continueButton: Translator.translate(continueButton, locale),
    privacyLabel: Translator.translate(privacyLabel, locale)
  }
}

export const SplashScreen = (props: Props): JSX.Element => {
  const [checked, setChecked] = React.useState<boolean>(false)
  const [waiting, setWaiting] = React.useState<boolean>(false)
  const { title, continueButton, privacyLabel } = prepareCopy(props)
  const { locale, resolve } = props

  function handleContinue (): void {
    if (checked && !waiting) {
      setWaiting(true)
      resolve?.({ __type__: 'PayloadVoid', value: undefined })
    }
  }

  function handleCheck (): void {
    setChecked(true)
  }

  function renderDescription (): JSX.Element {
    if (locale === 'nl') return nlDescription
    return enDescription
  }

  const enDescription: JSX.Element = (
    <>
      <div className='text-bodylarge font-body text-grey1'>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          You are about to start the process of donating your TikTok data for a research project run by the University of Amsterdam and the Weizenbaum Instiute for the Networked Society in Berlin.
          The data that we ask you to donate will be used for academic research to gain insight into how social media platforms work.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          We will walk you through this process step by step. During this process no data is stored or sent to a server. Data will only be donated and stored when you click the button “Yes, donate” on the page that shows your data.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          For the donation of a valid data package you will receive <span className='font-bodybold'>20 Euros</span>. A valid data package contains an activity on at least 5 different days or at least 200 activity instances in total.
        </div>
        <div className='mb-6 text-bodylarge font-body text-grey1'>
          By clicking the button “<span className='font-bodybold'>Yes, donate</span>”:
        </div>
        <div className='flex flex-col gap-3 mb-6'>
          <Bullet>
            <div>you have read and agreed with the information provided during the onboarding survey.</div>
          </Bullet>
          <Bullet>
            <div>you fully and voluntarily agree to donate your data for this research.</div>
          </Bullet>
          <Bullet>
            <div>you are aware that when your data is used for academic publications, or made publicly available in some other form, this will be anonymized.</div>
          </Bullet>
          <Bullet>
            <div>you are aware that you have the right to withdraw your permission for this data to be used, until the pseudonyms are deleted from the dataset. This will happen once the data collection phase has ended, no later than within 6 weeks.</div>
          </Bullet>
        </div>
        <div className='mb-10'>
          This website keeps track of your activity - for example on which pages of this website you click - as part of this research.
        </div>
      </div>
    </>
  )

  const nlDescription: JSX.Element = (
    <>
      <div className='text-bodylarge font-body text-grey1'>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
        Sie stehen kurz davor, den Prozess zu starten, Ihre TikTok-Daten für ein Forschungsprojekt der Universität von Amsterdam und des Weizenbaum Instituts für die vernetzte Gesellschaft in Berlin zu spenden. Die Daten, um deren Spende wir Sie bitten, werden für die akademische Forschung verwendet, um Einblicke darüber zu gewinnen, wie TikTok funktioniert.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          Wir werden Sie Schritt für Schritt durch diesen Prozess führen. Während dieses Prozesses werden keine Daten gespeichert oder an einen Server gesendet. Daten werden erst gespendet und gespeichert, wenn Sie auf der Seite, die Ihre Daten anzeigt, auf den Button „Ja, spenden“ klicken.
          </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          Für das Einreichen einer gültigen Datenspende erhalten Sie <span className='font-bodybold'>20 Euro</span> als Entschädigung. Die Datenspende ist nur dann gültig wenn diese an mindestens 5 Tagen Aktivitäten enthält oder mindestens 200 Aktivitäts-Einträge insgesamt.
          </div>
        <div className='mb-6 text-bodylarge font-body text-grey1'>
          Durch das klicken auf den Button “<span className='font-bodybold'>Ja, spenden</span>”:
        </div>
        <div className='flex flex-col gap-3 mb-6'>
          <Bullet>
            <div>erklären Sie, dass Sie die Informationen im Onboarding-Survey zur Kenntnis genommen haben und diesen zustimmen.</div>
          </Bullet>
          <Bullet>
            <div>erklären Sie sich vollständig und freiwillig einverstanden, Ihre Daten für diese Forschung zu spenden.</div>
          </Bullet>
          <Bullet>
            <div>erklären Sie sich einverstanden, dass Ihre Daten für akademische Veröffentlichungen genutzt werden oder in einer anderen Form öffentlich gemacht werden können, dies geschieht in anonymisierter Form.</div>
          </Bullet>
          <Bullet>
            <div>sind Sie sich darüber im Klaren, dass Sie das Recht haben, Ihre Zustimmung zur Teilnahme auch nachträglich zurückzuziehen. Jedoch nur, bis die Datenspenden vollständig anonymisiert werden (d.h. wenn die Pseudonyme aus dem Datensatz entfernt sind). Dies ist spätestens in 6 Wochen der Fall.</div>
          </Bullet>
        </div>
        <div className='mb-10'>
          Diese Website verfolgt Ihre Aktivitäten - zum Beispiel, auf welchen Seiten dieser Website Sie klicken - als Teil dieser Forschung.
        </div>
      </div>
    </>
  )

  const footer: JSX.Element = <Footer />

  const sidebar: JSX.Element = <Sidebar logo={LogoSvg} />

  const body: JSX.Element = (
    <>
      <Title1 text={title} />
      {renderDescription()}
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-4 items-center'>
          <CheckBox id='0' selected={checked} onSelect={() => handleCheck()} />
          <Label text={privacyLabel} />
        </div>
        <div className={`flex flex-row gap-4 ${checked ? '' : 'opacity-30'}`}>
          <PrimaryButton label={continueButton} onClick={handleContinue} enabled={checked} spinning={waiting} />
        </div>
      </div>
    </>
  )

  return (
    <Page
      body={body}
      sidebar={sidebar}
      footer={footer}
    />
  )
}

const title = new TextBundle()
  .add('en', 'Welcome')
  .add('nl', 'Willkommen')

const continueButton = new TextBundle()
  .add('en', 'Start')
  .add('nl', 'Start')

const privacyLabel = new TextBundle()
  .add('en', 'I have read and agree with the above terms.')
  .add('nl', 'Ich habe die obenstehenden Bedingungen gelesen und stimme ihnen zu.')
