import type { ReactNode } from 'react'
import type { IconName } from '../components/Icons'

export interface HipaaCard {
  title: string
  icon: IconName
  content: ReactNode
}

export interface QAItem {
  question: string
  answer: ReactNode
}

export const hipaaCards: HipaaCard[] = [
  {
    title: 'Encryption',
    icon: 'lock',
    content: <><strong>Patient data must be scrambled (encrypted) so that if someone intercepts it, they can't read it.</strong> This applies to data stored on devices like laptops and phones, as well as data being sent over the internet. Think of it like putting a letter in a locked box before mailing it&mdash;only the person with the key can open it.</>,
  },
  {
    title: 'Access Controls',
    icon: 'shield',
    content: <><strong>Only people who need patient information to do their job should be able to see it.</strong> Everyone gets their own login, systems should automatically log you out after a period of inactivity, and you should only see the minimum amount of information necessary for the task at hand.</>,
  },
  {
    title: 'Audit Logs',
    icon: 'clipboard',
    content: <>Every time someone views, changes, or shares patient data, it gets recorded. <strong>These logs track who accessed what, when, and what they did with it.</strong> Organizations are required to keep these records for at least six years and review them regularly to catch any unauthorized access.</>,
  },
  {
    title: 'Breach Reporting',
    icon: 'alert',
    content: <>If patient data is accidentally exposed or stolen, <strong>the organization must notify the affected patients</strong>. Large breaches (affecting 500 or more people) must also be reported to federal authorities, the media, and can involve hefty fines (and you could be held responsible).</>,
  },
]

export const trainingHighlight = {
  title: 'Training Requirements',
  icon: 'graduation' as IconName,
  content: <>Every organization that handles patient data is <strong>required to train all of its workers on how to keep that data safe.</strong> This includes doctors, nurses, administrative staff&mdash;anyone who might come into contact with patient information. Training has to happen when you first join and be refreshed regularly.</>,
  callout:
    'Sound familiar? You completed a HIPAA training course as part of your medical school onboarding! That wasn\u2019t just a formality\u2014it\u2019s a legal requirement under HIPAA.',
}

export const omnibusRule = {
  title: 'The Key to AI in Healthcare: AI Companies Are on the Hook Too',
  icon: 'scale' as IconName,
  content: <>HIPAA doesn't just apply to hospitals and clinics. Since 2013, <strong>any outside company that handles patient data</strong> on behalf of a healthcare organization&mdash;called a "Business Associate"&mdash;<strong>is also legally responsible for protecting it.</strong> This includes AI companies, cloud storage providers, and other tech vendors.</>,
  callout:
    'This means if an AI company mishandles your patients\u2019 data, they can face the same penalties as you or your health system would. BUT this only applies if your health system has a legal agreement\u2014called a Business Associate Agreement (BAA)\u2014with the AI company.',
}

export const qaItems: QAItem[] = [
  {
    question:
      'If a vendor says they are HIPAA compliant on their website, can you put PHI into their web app?',
    answer:
      <>No&mdash;not unless your health system has signed a Business Associate Agreement (BAA) with that vendor (the AI company). A BAA is a legal contract that makes the vendor responsible for protecting any patient data you share with them. Just because a company says "we're HIPAA compliant" on their website doesn't mean your institution has that agreement in place. <strong>Without a BAA, if the vendor has a data breach, both you and your health system could be held responsible.</strong> Always check with your compliance office before using any outside tool with patient information.</>,
  },
  {
    question:
      'Then why can my patients use ChatGPT or Google to ask about their health questions? What makes my use of these tools different?',
    answer:
      <>Great question. HIPAA only governs how healthcare providers and organizations handle patient data&mdash;it doesn&rsquo;t apply to patients themselves. Your patients are free to Google their symptoms, ask ChatGPT about their medications, or share their health information however they want. That said, even though it may not violate any laws, patients should still be thoughtful about how much of their private health information they share with a big tech company. <strong>That&rsquo;s their choice. But when you type a patient&rsquo;s information into a tool, you&rsquo;re acting as the custodian of their data.</strong> You have a legal duty to make sure it&rsquo;s only shared through approved, secure channels. The same information typed by a patient is their personal choice; typed by you, it could be a HIPAA violation.</>,
  },
]
