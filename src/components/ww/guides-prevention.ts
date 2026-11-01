import type { Guide } from "@/components/ww/guide-page";

// Guides about avoiding trouble in the first place. Every example address,
// company and person is fictional; example domains use the reserved
// .example top-level domain so none of them can ever be a real site.

export const isThisLinkSafe: Guide = {
  slug: "is-this-link-safe",
  title: "How to check if a link is safe",
  metaTitle: "Is this link safe? How to check a URL before you click",
  description:
    "Is this link safe? How to check a link before you click: read the real domain, spot look-alike and shortened links, and use free URL checkers.",
  intro: [
    "Most scams, account takeovers and malware infections start with a single click on a link. The good news is that you can check almost any link in under a minute, without special tools, once you know where to look.",
  ],
  sections: [
    {
      heading: "Is this link safe? Start by reading the address",
      blocks: [
        {
          p: "What matters is the real domain: the part just before the first single slash, read from right to left. Everything before it can be made up by whoever created the link.",
        },
        {
          example: {
            label: "Fictional examples",
            lines: [
              "https://login.northbank.example/account   → domain: northbank.example",
              "https://northbank.example.account-check.example/login   → domain: account-check.example",
              "https://account-check.example/northbank.example   → domain: account-check.example",
            ],
          },
        },
        {
          p: "Only the first link goes to the (fictional) bank. In the second, \"northbank.example\" is just a subdomain that anyone who owns account-check.example can create. In the third, the bank's name is only part of the path.",
        },
      ],
    },
    {
      heading: "How to check if a link is safe without clicking it",
      blocks: [
        {
          steps: [
            "**Preview the real address.** On a computer, hover the mouse over the link and look at the address shown at the bottom of the browser or email program. On a phone, press and hold the link until a preview appears, without letting it open.",
            "**Find the real domain** as explained above, and ask: is this the organisation it claims to be?",
            "**Look for look-alike letters.** Attackers register addresses that look almost right: \"rn\" instead of \"m\", the number 0 instead of the letter o, an extra letter, a hyphen, or a different ending such as .co instead of .com. Some use letters from other alphabets that look identical.",
            "**Be careful with shortened links.** Services that shorten links hide the real destination. If you don't trust the sender, don't open a shortened link; ask for the full address or go to the website yourself.",
            "**When in doubt, don't click.** Type the organisation's address yourself or use their app. A real bank, delivery company or tax office will show the same message when you log in normally.",
          ],
        },
      ],
    },
    {
      heading: "Check if a link is safe with free URL checkers",
      blocks: [
        {
          p: "Free tools can tell you whether a link is already known to be dangerous:",
        },
        {
          list: [
            "[Google Safe Browsing site status](https://transparencyreport.google.com/safe-browsing/search) shows whether Google currently flags a site as unsafe.",
            "[VirusTotal](https://www.virustotal.com) checks a URL against dozens of security vendors at once.",
          ],
        },
        {
          note: "These tools only know about threats that have already been reported. A brand-new scam page can come back clean. Also, don't paste private links (password resets, invoices, shared documents) into public checkers: VirusTotal shares submitted URLs with security researchers.",
        },
      ],
    },
    {
      heading: "Is this URL safe? Red flags around the link",
      blocks: [
        {
          p: "Often the message around a link gives the game away before the link itself does:",
        },
        {
          list: [
            "You weren't expecting it, or it comes from someone you don't usually hear from.",
            "It pushes you to act fast: \"your account will be closed today\", \"final reminder\".",
            "It asks you to log in, pay, confirm card details or download something.",
            "The link text says one thing but the preview shows a different address.",
            "Spelling, logo or tone feel slightly off for the organisation it claims to be.",
          ],
        },
        {
          p: "Our guide on [how to spot a phishing email](/grants/ai-pentest/ww/phishing) covers these warning signs in more detail.",
        },
      ],
    },
    {
      heading: "Links in text messages, chats and QR codes",
      blocks: [
        {
          p: "Scam links don't only arrive by email. Text messages about parcels, tolls or bank alerts, messages in chat apps, and QR codes on posters or parking meters are all used the same way.",
        },
        {
          list: [
            "On a phone, press and hold a link to see its address before opening it, and check the domain the same way as on a computer.",
            "Most phone cameras show the address inside a QR code before opening it. Read it before you tap.",
            "Be wary of QR codes stuck on top of another sign, or QR codes in emails asking you to log in or pay.",
            "Messages from an unknown number that claim to be a family member with a new phone are a common scam. Call the number you already have for them.",
          ],
        },
      ],
    },
    {
      heading: "How to check if a site is secure (and what the padlock means)",
      blocks: [
        {
          p: "The padlock and \"https\" in your browser only mean that the connection between you and the site is encrypted, so others on the network can't read it. They say nothing about who runs the site. Scam sites get padlocks for free too.",
        },
        {
          p: "To judge whether a site is genuine, check the domain carefully, be wary of sites you reached from an unexpected message, and look for a real address and contact details. For shops, search for independent reviews of the site, not just the product.",
        },
      ],
    },
    {
      heading: "What to do if you already clicked a suspicious link",
      blocks: [
        {
          steps: [
            "**Don't enter anything.** If you only opened the page and didn't type a password or download anything, the risk is usually low. Close the page.",
            "**If you entered a password,** change it right away on the real site, and anywhere else you use the same one. Turn on [two-factor authentication](/grants/ai-pentest/ww/two-factor-authentication).",
            "**If you entered card or bank details,** call your bank on the number on your card or their website, not one from the message.",
            "**If you downloaded or opened a file,** disconnect the device from the internet and run a full scan with your security software. At work, tell whoever handles your IT straight away.",
            "**Report it,** so others are protected too. See the reporting section in our [phishing guide](/grants/ai-pentest/ww/phishing).",
          ],
        },
      ],
    },
  ],
  related: ["phishing", "email-hacked", "two-factor-authentication"],
};

export const phishing: Guide = {
  slug: "phishing",
  title: "How to spot a phishing or scam email",
  metaTitle: "How to spot a phishing email (with examples)",
  description:
    "How to spot a phishing or scam email: the red flags, clearly labelled fictional examples including fake invoices and CEO fraud, and what to do if you clicked.",
  intro: [
    "Phishing emails pretend to come from someone you trust, such as your bank, a delivery company, a supplier or your own boss, to get you to click a link, open an attachment, log in on a fake page or send money.",
    "They're behind a large share of attacks on small organisations, because they target people rather than technology. Once you know the patterns, most are easy to recognise. All examples below are fictional.",
  ],
  sections: [
    {
      heading: "How to spot a phishing email: the red flags",
      blocks: [
        {
          steps: [
            "**The sender address doesn't match.** The display name says \"Northbank Support\", but the actual address is something like support@northbank-secure-mail.example or a free email account.",
            "**It creates urgency or fear.** \"Your account will be suspended in 24 hours\", \"unusual login detected\", \"final notice\". Pressure is designed to stop you thinking.",
            "**The link doesn't go where it says.** Hover over or long-press the link and check the real domain. Our guide [how to check if a link is safe](/grants/ai-pentest/ww/is-this-link-safe) explains how.",
            "**There's an unexpected attachment,** especially a ZIP file, an Office document asking you to \"enable content\", or a file that claims to be an invoice or voicemail.",
            "**It asks for a password, a code or payment details.** Real organisations don't ask you to send these by email.",
            "**It asks you to change how you pay someone,** or to pay an invoice you didn't expect.",
            "**It's from your boss or a colleague, but unusual:** an urgent, secret request for a payment or gift cards.",
            "**Small details are off:** a generic greeting, odd spelling, a logo that looks slightly wrong, or a reply-to address that differs from the sender.",
          ],
        },
      ],
    },
    {
      heading: "Phishing email examples",
      blocks: [
        {
          example: {
            label: "Fictional example 1: fake account warning",
            lines: [
              "From: Northbank Security <alert@northbank-verify.example>",
              "Subject: Unusual sign-in detected - action required",
              "We detected a sign-in from a new device. If this wasn't you,",
              "verify your account within 24 hours or it will be locked:",
              "[Verify my account]   → goes to northbank-verify.example/login",
            ],
          },
        },
        {
          p: "Red flags: the domain isn't the bank's, there's a 24-hour deadline, and the button leads to a login page on that fake domain.",
        },
        {
          example: {
            label: "Fictional example 2: delivery scam",
            lines: [
              "From: ParcelPost <noreply@parcelpost-redelivery.example>",
              "Subject: We couldn't deliver your parcel",
              "Your package is waiting. Pay the 1.99 redelivery fee to",
              "schedule a new delivery: [Pay now]",
            ],
          },
        },
        {
          p: "Red flags: you may not be expecting a parcel at all, and the small fee is a way to collect your card details.",
        },
      ],
    },
    {
      heading: "How to identify a scam email: fake invoices and CEO fraud",
      blocks: [
        {
          p: "Two scams cost small businesses and non-profits a lot of money because they don't need any links or malware, just a convincing email:",
        },
        {
          example: {
            label: "Fictional example 3: changed bank details",
            lines: [
              "From: Accounts <accounts@greenleaf-supplies.example>",
              "Subject: Updated payment details",
              "Please note our bank details have changed. Use the account",
              "below for invoice 4471 and all future payments.",
            ],
          },
        },
        {
          example: {
            label: "Fictional example 4: CEO fraud",
            lines: [
              "From: Sarah Jensen (Director) <s.jensen.office@freemail.example>",
              "Subject: Quick favour - confidential",
              "Are you at your desk? I need you to make an urgent transfer",
              "for a supplier today. I'm in meetings, so email only please.",
            ],
          },
        },
        {
          note: "The rule that stops both: never change bank details or make an unusual payment based on an email alone. Confirm by phone, using a number you already had, not one from the email.",
        },
      ],
    },
    {
      heading: "Spam email example vs phishing: what's the difference?",
      blocks: [
        {
          p: "Spam is unwanted bulk email, like ads for products you never asked about. It's annoying but usually not aimed at you. Phishing is a deliberate trick to get something from you: your password, your money or access to your device. When an unwanted email asks you to log in, pay, open a file or act urgently, treat it as phishing.",
        },
      ],
    },
    {
      heading: "What to do with a suspicious email",
      blocks: [
        {
          list: [
            "Don't click links, open attachments or reply.",
            "If it might be real, contact the organisation through their website, app or a phone number you already know.",
            "At work, forward it to whoever handles your IT or security, without blame. Fast reporting protects your colleagues.",
            "Use your email program's \"report phishing\" or \"report spam\" button, then delete it.",
          ],
        },
      ],
    },
    {
      heading: "How to report phishing",
      blocks: [
        {
          list: [
            "**Everywhere:** the report button in your email program, and the organisation being impersonated (many banks have a dedicated address for this).",
            "**UK:** forward suspicious emails to the National Cyber Security Centre at report@phishing.gov.uk.",
            "**US:** forward phishing emails to reportphishing@apwg.org, and report fraud to the FTC at [ReportFraud.ftc.gov](https://reportfraud.ftc.gov).",
            "**If you lost money:** contact your bank immediately, then the police or your national fraud reporting service.",
          ],
        },
      ],
    },
    {
      heading: "What to do if you clicked a phishing link",
      blocks: [
        {
          p: "Act quickly but calmly. If you entered a password, change it right away and turn on [two-factor authentication](/grants/ai-pentest/ww/two-factor-authentication). If you entered payment details, call your bank. If you opened an attachment, disconnect the device and run a security scan. If your email account starts behaving strangely, follow our guide on [what to do if your email has been hacked](/grants/ai-pentest/ww/email-hacked).",
        },
      ],
    },
  ],
  related: ["is-this-link-safe", "email-hacked", "two-factor-authentication"],
};

export const strongPasswords: Guide = {
  slug: "strong-passwords",
  title: "How to create a strong password (and remember it)",
  metaTitle: "How to create a strong password you can remember",
  description:
    "How to create a strong password: use long passphrases, never reuse passwords, let a password manager remember them, add 2FA and check whether a password has leaked.",
  intro: [
    "Old password advice, like swapping letters for symbols and changing passwords every month, made passwords harder for people to remember without making them much harder for attackers to guess. Current guidance is simpler: make passwords long, make every one unique, and let a tool remember them for you.",
  ],
  sections: [
    {
      heading: "How to create a strong password: length beats complexity",
      blocks: [
        {
          p: "Attackers don't guess passwords one at a time. They use software that tries billions of combinations, starting with leaked passwords, common words and predictable patterns like \"Summer2026!\" or \"P@ssw0rd\". Swapping a letter for a symbol barely slows that software down. Adding length does.",
        },
        {
          p: "A good target for an important account is **at least 15 characters**. Every extra character multiplies the number of possibilities, so a long password made of simple parts is far stronger than a short, complicated one.",
        },
      ],
    },
    {
      heading: "How to make a strong password you can remember: use a passphrase",
      blocks: [
        {
          p: "A passphrase is a string of random, unrelated words. It's long, which makes it strong, and it's a picture you can remember, which makes it usable.",
        },
        {
          example: {
            label: "Fictional example (don't use this one)",
            lines: ["copper umbrella lantern biscuit orbit"],
          },
        },
        {
          list: [
            "Use four to six words, picked at random. Many password managers can generate a passphrase for you.",
            "Don't use song lyrics, quotes, or facts about you such as names, birthdays or your street. Those are guessable.",
            "Spaces or hyphens between words are fine if the site allows them.",
          ],
        },
      ],
    },
    {
      heading: "Strong password tips: never reuse a password",
      blocks: [
        {
          p: "Reuse is the single biggest password risk. Websites get breached all the time, and attackers automatically try leaked email and password pairs on email, banking and shopping sites. This is called credential stuffing. If you reuse a password, one breach anywhere can open every account that uses it.",
        },
        {
          p: "A unique password for every account means a breach stays contained to that one site.",
        },
      ],
    },
    {
      heading: "How do I make a strong password for every account? Use a password manager",
      blocks: [
        {
          p: "Nobody can remember dozens of long, unique passwords. A password manager remembers them for you, fills them in, and generates new ones. You only need to remember one strong passphrase to unlock it.",
        },
        {
          list: [
            "Options include managers built into your browser or phone, and standalone apps. There are good free and paid choices; we don't endorse any particular one.",
            "Look for one that works on all your devices, can generate passwords, supports two-factor authentication for the manager itself, and warns you about reused or leaked passwords.",
            "For teams, choose one that lets you share passwords securely instead of sending them by email or chat.",
          ],
        },
        {
          note: "Protect your password manager and your email account most of all: use a long passphrase and turn on two-factor authentication for both.",
        },
      ],
    },
    {
      heading: "Add two-factor authentication",
      blocks: [
        {
          p: "Even a perfect password can be stolen by a fake login page or malware. Two-factor authentication (2FA) adds a second step, such as a code from an app or a security key, so a stolen password alone isn't enough. Read [two-factor authentication explained](/grants/ai-pentest/ww/two-factor-authentication) to set it up.",
        },
      ],
    },
    {
      heading: "Check whether your password has leaked",
      blocks: [
        {
          list: [
            "[Have I Been Pwned](https://haveibeenpwned.com) shows whether your email address appears in known data breaches.",
            "Its Pwned Passwords check tells you whether a password appears in breach data, without sending the full password over the internet.",
            "Many password managers and browsers check your saved passwords against breach data automatically.",
          ],
        },
        {
          p: "If a password shows up, change it on every account where you used it, starting with email and banking.",
        },
      ],
    },
    {
      heading: "Should I change my passwords regularly?",
      blocks: [
        {
          p: "Not on a fixed schedule. Current guidance, including from the US standards body NIST, is that forcing people to change passwords every few months leads to weaker, predictable passwords like \"Spring2026!\" becoming \"Summer2026!\".",
        },
        {
          p: "Change a password when there's a reason to: it appears in a breach, you typed it into a site you're not sure about, someone else may have seen it, or someone who knew it has left your organisation.",
        },
      ],
    },
    {
      heading: "Passwords for shared and team accounts",
      blocks: [
        {
          p: "Small organisations often have accounts several people use, like the social media profile, the website admin or the shared mailbox. A few habits keep these safe:",
        },
        {
          list: [
            "Where the service allows it, give each person their own login instead of sharing one. Then you can remove one person without changing everyone's access.",
            "If a login has to be shared, share it through a password manager's sharing feature, not by email, chat or a document.",
            "Turn on two-factor authentication for shared accounts too, and agree who holds the second factor.",
            "Change shared passwords when someone who knew them leaves.",
          ],
        },
      ],
    },
    {
      heading: "Strong password mistakes to avoid",
      blocks: [
        {
          list: [
            "Short passwords with a predictable pattern, such as a word with a capital letter, a number and a ! at the end.",
            "Personal details: names, birthdays, pets, your organisation's name.",
            "Changing only one character when you're asked to change a password.",
            "Writing passwords in a spreadsheet, email or sticky note on the screen.",
            "Sharing one login between several people instead of giving each person their own account.",
          ],
        },
      ],
    },
  ],
  related: ["two-factor-authentication", "email-hacked", "phishing"],
};

export const twoFactorAuthentication: Guide = {
  slug: "two-factor-authentication",
  title: "Two-factor authentication explained",
  metaTitle: "Two-factor authentication explained (2FA and MFA)",
  description:
    "Two-factor authentication explained in plain language: what 2FA and MFA are, why they matter, authenticator apps vs SMS vs security keys vs passkeys, and how to turn it on.",
  intro: [
    "Two-factor authentication is one of the most effective things you can do to protect an account. It takes a few minutes to set up and stops the large majority of attacks that rely on stolen passwords.",
  ],
  sections: [
    {
      heading: "Two-factor authentication explained",
      blocks: [
        {
          p: "Normally you prove who you are with one thing: your password. Two-factor authentication (2FA) adds a second, different kind of proof. The factors are usually grouped as:",
        },
        {
          list: [
            "**Something you know:** a password or PIN.",
            "**Something you have:** your phone, an authenticator app or a security key.",
            "**Something you are:** a fingerprint or face scan, usually used to unlock the phone or key.",
          ],
        },
        {
          p: "With 2FA on, someone who steals or guesses your password still can't log in, because they don't have your second factor.",
        },
      ],
    },
    {
      heading: "2FA explained: why it matters",
      blocks: [
        {
          p: "Passwords leak all the time: through data breaches at other websites, phishing pages and malware. Attackers then try those passwords automatically against email, banking and business accounts. 2FA breaks that chain. It's especially important for your email, because email is how most other accounts are reset.",
        },
      ],
    },
    {
      heading: "Multi-factor authentication explained: 2FA vs MFA",
      blocks: [
        {
          p: "Multi-factor authentication (MFA) means using two or more factors. Two-factor authentication is the most common form of MFA. Services also call it two-step verification, login verification or similar. For everyday purposes they all mean the same thing: a second step after your password.",
        },
      ],
    },
    {
      heading: "Types of two-factor authentication: pros and cons",
      blocks: [
        {
          list: [
            "**Authenticator app** (codes that change every 30 seconds): free, works offline, much safer than SMS. A good default for most accounts.",
            "**SMS codes:** easy and better than nothing, but texts can be intercepted, and attackers can trick a phone company into moving your number to their SIM card (SIM swapping). Use another option where you can.",
            "**Push notifications** (\"Is this you trying to sign in?\"): convenient, but attackers sometimes send many requests hoping you'll approve one by mistake. Only approve a request you started yourself. Prompts that ask you to type a number shown on screen are safer.",
            "**Security keys** (a small USB or NFC device): the strongest option. They resist phishing because the key checks it's talking to the real website.",
            "**Passkeys:** a newer way to log in without a password, using your phone or computer's screen lock. Passkeys are also phishing-resistant and increasingly supported by big services.",
          ],
        },
      ],
    },
    {
      heading: "How to turn on two-factor authentication",
      blocks: [
        {
          p: "The exact menus differ, but the steps are nearly always the same:",
        },
        {
          steps: [
            "Log in and open the account's **security** or **sign-in** settings.",
            "Find **two-factor authentication**, **two-step verification** or **passkeys**, and choose to turn it on.",
            "Pick a method. For an authenticator app, scan the QR code shown on screen with the app.",
            "Enter the code the app shows to confirm it works.",
            "Save the **backup codes** you're offered (see below).",
          ],
        },
      ],
    },
    {
      heading: "Backup codes: don't skip this step",
      blocks: [
        {
          p: "Backup or recovery codes are one-time codes that let you in if you lose your second factor. Print them or store them in your password manager, somewhere you can reach even if your phone is gone. Without them, recovering an account can take days.",
        },
      ],
    },
    {
      heading: "What happens if I lose my phone?",
      blocks: [
        {
          list: [
            "Use a backup code to log in, then remove the old phone and set up 2FA on your new one.",
            "Many authenticator apps can back up or sync codes to a new phone. Check that this is switched on before you need it.",
            "Add a second method where possible, such as a second security key or a backup phone number.",
            "If you're locked out with no backup, use the service's official account recovery process. It's slower, but it works.",
          ],
        },
      ],
    },
    {
      heading: "Never share your 2FA code",
      blocks: [
        {
          p: "Attackers know 2FA stops them, so they try to get the code from you. A typical trick is a call or message from \"your bank\" or \"the support team\" saying a code is about to arrive and asking you to read it out to confirm your identity.",
        },
        {
          p: "A 2FA code is only for typing into the real website or app yourself. No genuine company will ever ask you to tell them a code. If someone does, it's a scam: hang up, and if you shared a code, change your password straight away.",
        },
      ],
    },
    {
      heading: "Rolling out 2FA in a small organisation",
      blocks: [
        {
          steps: [
            "Start with the accounts that give the most access: email, the password manager, banking and the website admin.",
            "Pick one method for everyone where you can, such as an authenticator app, so people can help each other.",
            "Set aside half an hour to set it up together, and make sure everyone saves their backup codes.",
            "Decide who to contact if someone loses their phone, and write it down.",
            "If your email or office software allows it, make 2FA required for all accounts, not just recommended.",
          ],
        },
      ],
    },
    {
      heading: "Where to turn on 2FA first",
      blocks: [
        {
          steps: [
            "Your email accounts, because they can reset everything else.",
            "Your password manager.",
            "Banking, payment and payroll services.",
            "Your website, hosting and domain registrar accounts.",
            "Social media accounts, especially your organisation's.",
          ],
        },
        {
          p: "Pair 2FA with long, unique passwords. Our guide on [how to create a strong password](/grants/ai-pentest/ww/strong-passwords) shows how.",
        },
      ],
    },
  ],
  related: ["strong-passwords", "email-hacked", "phishing"],
};
