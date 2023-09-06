import React from 'react'
import { Weak } from '../../../../helpers'
import TextBundle from '../../../../text_bundle'
import { Translator } from '../../../../translator'
import { PropsUIPageSplashScreen } from '../../../../types/pages'
import { ReactFactoryContext } from '../../factory'
import { PrimaryButton } from '../elements/button'
import { CheckBox } from '../elements/check_box'
import { Label, Title1 } from '../elements/text'
import LogoSvg from '../../../../../assets/images/logo.svg'
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
          You are about to start the process of donating your data for a research project run by the University of Amsterdam and the Weizenbaum Instiute for the Networked Society in Berlin.
          The data that we ask you to donate will be used for academic research to gain insight into how platforms work.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          We will walk you through this process step by step. During this process no data is stored or sent to a server. You can delete rows from the data before donating. Data will only be donated and stored when you click the button “Yes, donate” on the page that shows your data.
        </div>
        <div className='mb-6 text-bodylarge font-body text-grey1'>
          By clicking the button “<span className='font-bodybold'>Yes, donate</span>”:
        </div>
        <div className='flex flex-col gap-3 mb-6'>
          <Bullet>
            <div>you fully and voluntarily agree to donate your data for this research.</div>
          </Bullet>
          <Bullet>
            <div>you are aware that when your data is used for academic publications, or made publicly available in some other form, this will be anonymous.</div>
          </Bullet>
          <Bullet>
            <div>you are aware that you have the right to withdraw your permission.</div>
          </Bullet>
        </div>
        <div className='mb-10'>
          This website keeps track of your activity - for example on which pages of this website you click - as part of this research. More information can be found on our privacy page.
        </div>
      </div>
    </>
  )

  const nlDescription: JSX.Element = (
    <>
      <div className='text-bodylarge font-body text-grey1'>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
          Sie stehen kurz davor, den Prozess zu starten, Ihre Daten für ein Forschungsprojekt der Universität von Amsterdam und des Weizenbaum Instituts für die vernetzte Gesellschaft in Berlin zu spenden.
            Die Daten, um die wir Sie bitten zu spenden, werden für akademische Forschung verwendet, um Einblicke zu gewinnen, wie Plattformen funktionieren.
        </div>
        <div className='mb-4 text-bodylarge font-body text-grey1'>
            Wir werden Sie Schritt für Schritt durch diesen Prozess führen. Während dieses Prozesses werden keine Daten gespeichert oder an einen Server gesendet. Sie können Zeilen aus den Daten löschen, bevor Sie spenden. Daten werden erst gespendet und gespeichert, wenn Sie auf der Seite, die Ihre Daten anzeigt, auf den Button „Ja, spenden“ klicken.        </div>
        <div className='mb-6 text-bodylarge font-body text-grey1'>
          Durch das klicken auf den Button “<span className='font-bodybold'>Ja, spenden</span>”:
        </div>
        <div className='flex flex-col gap-3 mb-6'>
          <Bullet>
            <div> erklären Sie sich vollständig und freiwillig einverstanden, Ihre Daten für diese Forschung zu spenden.</div>
          </Bullet>
          <Bullet>
            <div>sind sie sich bewusst, dass, wenn Ihre Daten für akademische Veröffentlichungen genutzt werden oder in irgendeiner anderen Form öffentlich gemacht werden, dies anonym geschehen wird.</div>
          </Bullet>
          <Bullet>
            <div>sind sie sich darüber im Klaren, dass Sie das Recht haben, Ihre Zustimmung zurückzuziehen.</div>
          </Bullet>
        </div>
        <div className='mb-10'>
            Diese Website verfolgt Ihre Aktivitäten - zum Beispiel, auf welchen Seiten dieser Website Sie klicken - als Teil dieser Forschung. Weitere Informationen finden Sie auf unserer Datenschutzseite.        </div>
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
