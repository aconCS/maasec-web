import type { Guide } from "@/components/ww/guide-page";

// Guides for when something has already gone wrong. Internal links use the
// full /grants/ai-pentest/ww/... path so they work from any page.

export const emailHacked: Guide = {
  slug: "email-hacked",
  title: "What to do if your email has been hacked",
  metaTitle: "What to do if your email is hacked: step-by-step",
  description:
    "My email has been hacked, what do I do? Regain access, sign out the attacker, check forwarding rules and recovery details, warn contacts and stop it happening again.",
  intro: [
    "A hacked email account is more than an inbox problem. Your email is the key to almost every other account you have: whoever controls it can reset your passwords for banking, social media, your website and your work tools.",
    "The good news is that most email hacks can be fully recovered if you act quickly and in the right order. This guide walks you through it.",
  ],
  sections: [
    {
      heading: "My email has been hacked: what do I do first?",
      blocks: [
        {
          p: "Common signs are contacts receiving messages you never sent, password reset emails you didn't ask for, login alerts from places you've never been, missing emails, or simply not being able to log in any more.",
        },
        {
          p: "Start with the two things that lock the attacker out. Do this from a device you trust, such as your phone or another computer, not from a device you think might be infected.",
        },
        {
          steps: [
            "**Regain access.** If you can still log in, go straight to the next step. If the password has been changed, use your provider's official \"forgot password\" or account recovery page. Type the provider's address yourself rather than clicking a link in an email, because attackers often follow a hack with fake recovery emails.",
            "**Change your password** to a long, new one that you have never used anywhere else. A passphrase of four or five random words works well. See our guide on [how to create a strong password](/grants/ai-pentest/ww/strong-passwords).",
          ],
        },
      ],
    },
    {
      heading: "Email account hacked: what to do next, step by step",
      blocks: [
        {
          p: "Changing the password is not enough on its own. Attackers usually leave themselves a way back in, so work through these steps in your account's security settings.",
        },
        {
          steps: [
            "**Sign out of all other sessions.** Most providers have a \"sign out of all other devices\" or \"sign out everywhere\" option. This kicks out anyone who is still logged in with the old password.",
            "**Turn on two-factor authentication (2FA).** With 2FA, a stolen password alone is no longer enough to get in. An authenticator app, security key or passkey is stronger than SMS. Our guide [two-factor authentication explained](/grants/ai-pentest/ww/two-factor-authentication) covers the options.",
            "**Check forwarding rules and filters.** This is the step people miss most. Attackers often add a rule that quietly forwards a copy of every email to them, or one that deletes security alerts and replies from your bank. Look in settings under forwarding, rules or filters and remove anything you didn't create.",
            "**Check your recovery email and phone number.** If the attacker replaced them with their own, they can take the account back whenever they like. Make sure only your own details are listed.",
            "**Review connected apps and app passwords.** Remove apps, add-ons and app-specific passwords you don't recognise. These can keep access even after a password change.",
            "**Look at your sent, deleted and archived folders.** This shows what the attacker did with your account, such as scam emails sent to your contacts or messages they tried to hide.",
          ],
        },
      ],
    },
    {
      heading: "Warn your contacts",
      blocks: [
        {
          p: "If scam messages went out from your address, tell your contacts that your account was compromised and that they should ignore or delete any unusual message from you, especially ones asking for money, gift cards, payment or a click on a link. Send the warning from your recovered account or another channel they know is really you.",
        },
        {
          p: "For a business or non-profit, warn customers and suppliers too. A common follow-up scam is a fake invoice or \"new bank details\" email sent from the real, hacked account.",
        },
      ],
    },
    {
      heading: "Scan your devices and change reused passwords",
      blocks: [
        {
          p: "Your password may have been stolen by malware on your computer or phone. Update your operating system and run a full scan with the security software built into your device (for example Windows Security on Windows). If anything is found, fix it before you log in to important accounts again.",
        },
        {
          p: "Then change the password on every other account where you used the same or a similar password. Start with the accounts that matter most: banking and payment services, other email accounts, your website or hosting, and social media. From now on, use a different password for every account. A password manager makes that easy.",
        },
      ],
    },
    {
      heading: "Check whether your details were in a data breach",
      blocks: [
        {
          p: "Many email hacks start with a password leaked in a breach of some other website. Free services such as [Have I Been Pwned](https://haveibeenpwned.com) tell you whether your email address appears in known breaches. If it does, change the password on the breached site and anywhere else you used it.",
        },
      ],
    },
    {
      heading: "When and where to report it",
      blocks: [
        {
          list: [
            "**Your email provider:** most have a way to report a hacked account, and their support team can help if you can't get back in.",
            "**Your bank, straight away,** if money was taken or payment details may have been exposed.",
            "**The police or your national cybercrime reporting service** if you lost money or are being blackmailed. Examples are the FBI's IC3 in the US, the Canadian Anti-Fraud Centre, ReportCyber in Australia, and the police in the UK and Ireland.",
            "**Your data protection authority,** if you're an organisation and other people's personal data may have been exposed. In the EU and the UK, organisations generally have to report this within 72 hours of finding out.",
          ],
        },
      ],
    },
    {
      heading: "What to do if your email is hacked again: prevention",
      blocks: [
        {
          list: [
            "Use a long, unique password for your email, stored in a password manager.",
            "Keep 2FA switched on, and prefer an authenticator app, security key or passkey over SMS.",
            "Be suspicious of login pages you reach from a link in an email. Type the address yourself. Our guide on [how to spot a phishing email](/grants/ai-pentest/ww/phishing) shows the warning signs.",
            "Keep your recovery email and phone number up to date.",
            "Keep your devices and browser updated, and check your forwarding rules every few months.",
          ],
        },
      ],
    },
  ],
  related: ["phishing", "strong-passwords", "two-factor-authentication"],
};

export const websiteHacked: Guide = {
  slug: "website-hacked",
  title: "My website was hacked: what to do now",
  metaTitle: "Website hacked? What to do now and how to fix it",
  description:
    "How to fix a hacked website: what to do in the first hour, how to clean and restore it, extra steps for WordPress, and how to get off Google's warning list.",
  intro: [
    "Finding out your website was hacked is stressful, especially when it's your shop window, your booking system or your organisation's main way of reaching people. Signs include strange redirects, pages you didn't create, spam in Google results under your name, a warning from Google or your browser, or a message from your hosting company.",
    "Work through the steps below in order. Rushing to delete things can destroy the clues you need to stop the same attacker getting back in.",
  ],
  sections: [
    {
      heading: "Website hacked: what to do in the first hour",
      blocks: [
        {
          steps: [
            "**Put the site in maintenance mode or take it offline.** This protects your visitors from malware or scam pages while you work. Many CMSs and hosting control panels have a maintenance switch; your host can also do it for you.",
            "**Contact your hosting company.** Tell them what you see. They can often confirm the hack, show access logs, and tell you whether other sites on your account are affected.",
            "**Make a copy of the hacked site before you change anything.** Download the files and a database export and keep them separate. It's evidence, and it helps you find how the attacker got in.",
          ],
        },
      ],
    },
    {
      heading: "How to fix a hacked website, step by step",
      blocks: [
        {
          steps: [
            "**Change every password connected to the site:** hosting control panel, CMS admin accounts, FTP or SFTP, the database, and the email accounts used to manage the site. Use new, unique passwords and turn on two-factor authentication wherever it's offered.",
            "**Restore a clean backup** from before the hack, if you have one. Check its date against the first signs of trouble; attackers are sometimes inside for weeks before anything visible happens.",
            "**Update everything:** the CMS, every plugin, every theme, and anything else installed on the server. Outdated software is the most common way in.",
            "**Remove what you don't recognise:** unknown admin users, plugins, themes, files and scheduled tasks (cron jobs). Attackers often add a hidden admin account or a small \"backdoor\" file to get back in later.",
            "**Check again for malware.** Compare files with clean copies, look for recently changed files, and check the .htaccess file (on Apache servers) for redirect rules you didn't add. Our guide on [how to check your website for malware](/grants/ai-pentest/ww/website-malware-check) explains the tools.",
            "**Bring the site back online** only when you're confident it's clean, then watch it closely for a few weeks.",
          ],
        },
        {
          note: "If you don't have a clean backup, or the site is complex, this is the moment to bring in your web developer or a security company. Restoring from a backup without fixing the original hole usually means being hacked again.",
        },
      ],
    },
    {
      heading: "WordPress hacked: what to do",
      blocks: [
        {
          p: "WordPress powers a large share of small-business websites, so it's targeted a lot. On top of the steps above:",
        },
        {
          list: [
            "Reinstall WordPress core files from the official source. If you have WP-CLI, `wp core verify-checksums` shows which core files were changed.",
            "Delete plugins and themes you don't use, and reinstall the ones you need from their official source rather than restoring possibly infected copies.",
            "Check the list of users for administrators you don't know, and remove them.",
            "Replace the security keys and salts in wp-config.php. This logs everyone out, including the attacker.",
            "Look for .php files in the uploads folder. That folder should normally only contain images and documents.",
          ],
        },
      ],
    },
    {
      heading: "Hacked website recovery: removing Google's warning",
      blocks: [
        {
          p: "If Google flagged your site, visitors may see a red \"deceptive site\" or \"this site may be hacked\" warning. After cleaning up:",
        },
        {
          steps: [
            "Open [Google Search Console](https://search.google.com/search-console) (add and verify your site if you haven't already) and check the **Security issues** report.",
            "Fix every issue listed, then click **Request review** and describe what you cleaned up.",
            "Check your site's status at [Google Safe Browsing](https://transparencyreport.google.com/safe-browsing/search). Reviews typically take from a day to a few weeks.",
          ],
        },
      ],
    },
    {
      heading: "Find the hole: how did they get in?",
      blocks: [
        {
          p: "Cleaning up without finding the way in is the most common reason sites get hacked again within weeks. The usual causes are an outdated plugin or theme, a reused or weak password on an admin or hosting account, an old account nobody removed, or a vulnerable contact form or upload feature.",
        },
        {
          p: "Your hosting logs and the copy you made in the first hour can show which files changed first and from where. A penetration test looks at the cleaned-up site the way an attacker would, to find weaknesses that are still open.",
        },
      ],
    },
    {
      heading: "How to stop your website being hacked again",
      blocks: [
        {
          list: [
            "Turn on automatic updates for your CMS, plugins and themes, or check for updates every month.",
            "Keep automatic backups, with at least one copy stored away from your hosting account, and test that you can restore them.",
            "Use unique passwords and two-factor authentication for every admin, hosting and FTP account.",
            "Give admin rights only to people who need them, and remove accounts when people leave.",
            "Remove plugins, themes and old copies of the site you no longer use.",
          ],
        },
      ],
    },
  ],
  pentestCta: {
    title: "Find out how they got in",
    body: "Run a small business, non-profit or community organisation? Our volunteer cybersecurity specialists offer a free AI penetration test of your website, with every finding checked by hand and a plain-language report on what to fix first.",
    button: "Get a free AI pentest",
  },
  related: ["website-malware-check", "strong-passwords", "two-factor-authentication"],
};

export const websiteMalwareCheck: Guide = {
  slug: "website-malware-check",
  title: "How to check your website for malware",
  metaTitle: "How to check your website for malware (free tools)",
  description:
    "Check your website for malware: the signs of infection, free tools like Google Search Console and Safe Browsing, what scanners can't see, and what to do if you're infected.",
  intro: [
    "Website malware is code that an attacker has slipped into your site. It might redirect visitors to scam pages, show spam in Google results, steal payment details from your checkout, or quietly use your server to attack others.",
    "Most website owners only find out when a customer or Google tells them. This guide shows how to check for yourself, using free tools, and what those tools can and can't tell you.",
  ],
  sections: [
    {
      heading: "Signs your website may have malware",
      blocks: [
        {
          list: [
            "Visitors, especially on phones or arriving from Google, are redirected to other sites.",
            "Google results for your site show titles or descriptions in another language, or for products you don't sell.",
            "Your browser, antivirus or Google shows a warning when people visit your site.",
            "New pages, files or admin users appear that nobody on your team created.",
            "Your hosting company warns you about malware or unusual traffic, or suspends the account.",
            "The site is suddenly slow, or your email from the website's domain starts landing in spam.",
          ],
        },
        {
          p: "Some malware is designed to hide from the site owner. It only shows to visitors who aren't logged in, or only to people arriving from search engines. So a site that looks fine to you can still be infected.",
        },
      ],
    },
    {
      heading: "How to check your website for malware for free",
      blocks: [
        {
          steps: [
            "**Check Google Safe Browsing.** Enter your address at [Google's Safe Browsing site status](https://transparencyreport.google.com/safe-browsing/search). It shows whether Google currently considers your site unsafe.",
            "**Check Google Search Console.** If you've verified your site in [Search Console](https://search.google.com/search-console), the **Security issues** report lists hacked content or malware Google has found, often with example pages.",
            "**Run a free remote scanner.** Reputable free scanners such as [Sucuri SiteCheck](https://sitecheck.sucuri.net) load your public pages and look for known malware, blocklisting and outdated software.",
            "**Check the address with VirusTotal.** [VirusTotal](https://www.virustotal.com) checks a URL against dozens of security vendors at once.",
            "**Look at your site the way a visitor does.** Open it in a private browser window, on a phone, and by clicking through from a Google search result.",
          ],
        },
      ],
    },
    {
      heading: "What a website virus scanner can't see",
      blocks: [
        {
          p: "Online scanners only see what your website sends to visitors. They can't see files on your server, your database, or malware that only activates for certain visitors. A clean result is good news, but it's not proof that your site is clean.",
        },
        {
          p: "For a deeper check, scan from the inside as well:",
        },
        {
          list: [
            "Ask your hosting company whether they offer a server-side malware scan. Many include one.",
            "If you use a CMS like WordPress, a reputable security plugin can compare your files with the official versions and flag changes.",
            "Look at recently modified files on the server, and for files with odd names or in odd places, such as PHP files in an uploads folder.",
          ],
        },
      ],
    },
    {
      heading: "Check my site for malware in Google's search results",
      blocks: [
        {
          p: "A quick, free check that often reveals hidden infections: search Google for `site:yourdomain.com` (with your own domain). This lists the pages Google has found on your site.",
        },
        {
          list: [
            "Look for pages you never created, often with titles about medicines, gambling, cheap designer goods or loans.",
            "Look for titles and descriptions in a language your site doesn't use.",
            "Click a suspicious result from the Google results page. Some malware only redirects visitors who arrive from a search engine.",
          ],
        },
        {
          p: "Spam pages like these usually mean an attacker can create files on your site, so treat them as a hack, not just an SEO problem.",
        },
      ],
    },
    {
      heading: "How malware gets onto small websites",
      blocks: [
        {
          p: "Knowing the usual ways in helps you check the right places and close the gap afterwards:",
        },
        {
          list: [
            "**Outdated plugins, themes or CMS versions** with publicly known vulnerabilities. Attackers scan the internet for them automatically.",
            "**Stolen or weak passwords** for the CMS, hosting control panel or FTP, often reused from another site that was breached.",
            "**Abandoned extras:** an old test copy of the site, a forgotten admin account, or a plugin that's switched off but still installed.",
            "**Upload forms** that accept files without checking what they are.",
            "**Shared hosting neighbours:** on some hosting setups, one infected site can affect others on the same account.",
          ],
        },
      ],
    },
    {
      heading: "Scan my website for malware: a monthly routine",
      blocks: [
        {
          p: "Ten minutes a month catches most problems early:",
        },
        {
          steps: [
            "Check Search Console for new security issues or warnings.",
            "Run a free remote scan and a Safe Browsing check.",
            "Install pending updates for your CMS, plugins and themes.",
            "Review the list of admin users and remove anyone who shouldn't be there.",
            "Make sure your latest backup ran and is stored somewhere safe.",
          ],
        },
      ],
    },
    {
      heading: "What to do if you find malware on your site",
      blocks: [
        {
          p: "Don't just delete the infected file. Malware usually comes back unless you also close the hole the attacker used. Follow our step-by-step guide: [my website was hacked: what to do now](/grants/ai-pentest/ww/website-hacked).",
        },
      ],
    },
    {
      heading: "Malware scan or penetration test: what's the difference?",
      blocks: [
        {
          p: "A **malware scan** looks for signs that your site has *already* been compromised. A **penetration test** looks for the weaknesses an attacker *could* use to get in, such as outdated software, risky settings, exposed files or weak login protection, so you can fix them before anything happens.",
        },
        {
          p: "They complement each other. Our free AI penetration test is not a malware scanner, but it can tell you where your site is vulnerable.",
        },
      ],
    },
  ],
  related: ["website-hacked", "is-this-link-safe", "strong-passwords"],
};
