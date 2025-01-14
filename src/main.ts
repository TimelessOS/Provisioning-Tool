import { invoke } from "@tauri-apps/api/core"

let usernameInputEl: HTMLInputElement | null
let passwordInputEl: HTMLInputElement | null
let timezoneInputEl: HTMLSelectElement | null
let localeInputEl: HTMLSelectElement | null
let greetMsgEl: HTMLElement | null

async function greet() {
  if (greetMsgEl && usernameInputEl && passwordInputEl && timezoneInputEl && localeInputEl) {
    greetMsgEl.textContent = await invoke("greet", {
      username: usernameInputEl.value,
      password: passwordInputEl.value,
      timezone: timezoneInputEl.value,
      locale: localeInputEl.value
    });
  }
}

async function welcome() {
  let welcomeForm = document.getElementById("welcome-form")
  let greetForm = document.getElementById("greet-form")
  if (welcomeForm && greetForm) {
    welcomeForm.className = "hidden"
    welcomeForm.addEventListener("transitionend", () => {
      welcomeForm.style.display = "none"
      console.log("A")
      greetForm.className = "hidable"
    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  usernameInputEl = document.querySelector("#username-input")
  passwordInputEl = document.querySelector("#password-input")
  timezoneInputEl = document.querySelector("#timezone-list")
  localeInputEl = document.querySelector("#locale-list")
  greetMsgEl = document.querySelector("#greet-msg")
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault()
    greet()
  });
  document.querySelector("#welcome-form")?.addEventListener("submit", (e) => {
    e.preventDefault()
    welcome()
  });
});


// Disable right click
document.addEventListener('contextmenu', event => event.preventDefault());


var tzStrings = [
  { "label": "(GMT-12:00) International Date Line West", "value": "Etc/GMT+12" },
  { "label": "(GMT-11:00) Midway Island, Samoa", "value": "Pacific/Midway" },
  { "label": "(GMT-10:00) Hawaii", "value": "Pacific/Honolulu" },
  { "label": "(GMT-09:00) Alaska", "value": "US/Alaska" },
  { "label": "(GMT-08:00) Pacific Time (US & Canada)", "value": "America/Los_Angeles" },
  { "label": "(GMT-08:00) Tijuana, Baja California", "value": "America/Tijuana" },
  { "label": "(GMT-07:00) Arizona", "value": "US/Arizona" },
  { "label": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "value": "America/Chihuahua" },
  { "label": "(GMT-07:00) Mountain Time (US & Canada)", "value": "US/Mountain" },
  { "label": "(GMT-06:00) Central America", "value": "America/Managua" },
  { "label": "(GMT-06:00) Central Time (US & Canada)", "value": "US/Central" },
  { "label": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "value": "America/Mexico_City" },
  { "label": "(GMT-06:00) Saskatchewan", "value": "Canada/Saskatchewan" },
  { "label": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "value": "America/Bogota" },
  { "label": "(GMT-05:00) Eastern Time (US & Canada)", "value": "US/Eastern" },
  { "label": "(GMT-05:00) Indiana (East)", "value": "US/East-Indiana" },
  { "label": "(GMT-04:00) Atlantic Time (Canada)", "value": "Canada/Atlantic" },
  { "label": "(GMT-04:00) Caracas, La Paz", "value": "America/Caracas" },
  { "label": "(GMT-04:00) Manaus", "value": "America/Manaus" },
  { "label": "(GMT-04:00) Santiago", "value": "America/Santiago" },
  { "label": "(GMT-03:30) Newfoundland", "value": "Canada/Newfoundland" },
  { "label": "(GMT-03:00) Brasilia", "value": "America/Sao_Paulo" },
  { "label": "(GMT-03:00) Buenos Aires, Georgetown", "value": "America/Argentina/Buenos_Aires" },
  { "label": "(GMT-03:00) Greenland", "value": "America/Godthab" },
  { "label": "(GMT-03:00) Montevideo", "value": "America/Montevideo" },
  { "label": "(GMT-02:00) Mid-Atlantic", "value": "America/Noronha" },
  { "label": "(GMT-01:00) Cape Verde Is.", "value": "Atlantic/Cape_Verde" },
  { "label": "(GMT-01:00) Azores", "value": "Atlantic/Azores" },
  { "label": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "value": "Africa/Casablanca" },
  { "label": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "value": "Etc/Greenwich" },
  { "label": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "value": "Europe/Amsterdam" },
  { "label": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "value": "Europe/Belgrade" },
  { "label": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "value": "Europe/Brussels" },
  { "label": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "value": "Europe/Sarajevo" },
  { "label": "(GMT+01:00) West Central Africa", "value": "Africa/Lagos" },
  { "label": "(GMT+02:00) Amman", "value": "Asia/Amman" },
  { "label": "(GMT+02:00) Athens, Bucharest, Istanbul", "value": "Europe/Athens" },
  { "label": "(GMT+02:00) Beirut", "value": "Asia/Beirut" },
  { "label": "(GMT+02:00) Cairo", "value": "Africa/Cairo" },
  { "label": "(GMT+02:00) Harare, Pretoria", "value": "Africa/Harare" },
  { "label": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "value": "Europe/Helsinki" },
  { "label": "(GMT+02:00) Jerusalem", "value": "Asia/Jerusalem" },
  { "label": "(GMT+02:00) Minsk", "value": "Europe/Minsk" },
  { "label": "(GMT+02:00) Windhoek", "value": "Africa/Windhoek" },
  { "label": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "value": "Asia/Kuwait" },
  { "label": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "value": "Europe/Moscow" },
  { "label": "(GMT+03:00) Nairobi", "value": "Africa/Nairobi" },
  { "label": "(GMT+03:00) Tbilisi", "value": "Asia/Tbilisi" },
  { "label": "(GMT+03:30) Tehran", "value": "Asia/Tehran" },
  { "label": "(GMT+04:00) Abu Dhabi, Muscat", "value": "Asia/Muscat" },
  { "label": "(GMT+04:00) Baku", "value": "Asia/Baku" },
  { "label": "(GMT+04:00) Yerevan", "value": "Asia/Yerevan" },
  { "label": "(GMT+04:30) Kabul", "value": "Asia/Kabul" },
  { "label": "(GMT+05:00) Yekaterinburg", "value": "Asia/Yekaterinburg" },
  { "label": "(GMT+05:00) Islamabad, Karachi, Tashkent", "value": "Asia/Karachi" },
  { "label": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "value": "Asia/Calcutta" },
  { "label": "(GMT+05:30) Sri Jayawardenapura", "value": "Asia/Calcutta" },
  { "label": "(GMT+05:45) Kathmandu", "value": "Asia/Katmandu" },
  { "label": "(GMT+06:00) Almaty, Novosibirsk", "value": "Asia/Almaty" },
  { "label": "(GMT+06:00) Astana, Dhaka", "value": "Asia/Dhaka" },
  { "label": "(GMT+06:30) Yangon (Rangoon)", "value": "Asia/Rangoon" },
  { "label": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "value": "Asia/Bangkok" },
  { "label": "(GMT+07:00) Krasnoyarsk", "value": "Asia/Krasnoyarsk" },
  { "label": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "value": "Asia/Hong_Kong" },
  { "label": "(GMT+08:00) Kuala Lumpur, Singapore", "value": "Asia/Kuala_Lumpur" },
  { "label": "(GMT+08:00) Irkutsk, Ulaan Bataar", "value": "Asia/Irkutsk" },
  { "label": "(GMT+08:00) Perth", "value": "Australia/Perth" },
  { "label": "(GMT+08:00) Taipei", "value": "Asia/Taipei" },
  { "label": "(GMT+09:00) Osaka, Sapporo, Tokyo", "value": "Asia/Tokyo" },
  { "label": "(GMT+09:00) Seoul", "value": "Asia/Seoul" },
  { "label": "(GMT+09:00) Yakutsk", "value": "Asia/Yakutsk" },
  { "label": "(GMT+09:30) Adelaide", "value": "Australia/Adelaide" },
  { "label": "(GMT+09:30) Darwin", "value": "Australia/Darwin" },
  { "label": "(GMT+10:00) Brisbane", "value": "Australia/Brisbane" },
  { "label": "(GMT+10:00) Canberra, Melbourne, Sydney", "value": "Australia/Canberra" },
  { "label": "(GMT+10:00) Hobart", "value": "Australia/Hobart" },
  { "label": "(GMT+10:00) Guam, Port Moresby", "value": "Pacific/Guam" },
  { "label": "(GMT+10:00) Vladivostok", "value": "Asia/Vladivostok" },
  { "label": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "value": "Asia/Magadan" },
  { "label": "(GMT+12:00) Auckland, Wellington", "value": "Pacific/Auckland" },
  { "label": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "value": "Pacific/Fiji" },
  { "label": "(GMT+13:00) Nuku'alofa", "value": "Pacific/Tongatapu" }
]

var localeList = [
  { "locale": "en_US.UTF-8", "name": "English (United States)" },
  { "locale": "en_GB.UTF-8", "name": "English (United Kingdom)" },
  { "locale": "en_NZ.UTF-8", "name": "English (New Zealand)" },
  { "locale": "fr_FR.UTF-8", "name": "French (France)" },
  { "locale": "de_DE.UTF-8", "name": "German (Germany)" },
  { "locale": "es_ES.UTF-8", "name": "Spanish (Spain)" },
  { "locale": "it_IT.UTF-8", "name": "Italian (Italy)" },
  { "locale": "pt_PT.UTF-8", "name": "Portuguese (Portugal)" },
  { "locale": "pt_BR.UTF-8", "name": "Portuguese (Brazil)" },
  { "locale": "zh_CN.UTF-8", "name": "Chinese (Simplified, China)" },
  { "locale": "zh_TW.UTF-8", "name": "Chinese (Traditional, Taiwan)" },
  { "locale": "ja_JP.UTF-8", "name": "Japanese (Japan)" },
  { "locale": "ko_KR.UTF-8", "name": "Korean (South Korea)" },
  { "locale": "ru_RU.UTF-8", "name": "Russian (Russia)" },
  { "locale": "ar_SA.UTF-8", "name": "Arabic (Saudi Arabia)" },
  { "locale": "hi_IN.UTF-8", "name": "Hindi (India)" },
  { "locale": "bn_IN.UTF-8", "name": "Bengali (India)" },
  { "locale": "ur_PK.UTF-8", "name": "Urdu (Pakistan)" },
  { "locale": "tr_TR.UTF-8", "name": "Turkish (Turkey)" },
  { "locale": "pl_PL.UTF-8", "name": "Polish (Poland)" },
  { "locale": "nl_NL.UTF-8", "name": "Dutch (Netherlands)" },
  { "locale": "sv_SE.UTF-8", "name": "Swedish (Sweden)" },
  { "locale": "no_NO.UTF-8", "name": "Norwegian (Norway)" },
  { "locale": "fi_FI.UTF-8", "name": "Finnish (Finland)" },
  { "locale": "da_DK.UTF-8", "name": "Danish (Denmark)" },
  { "locale": "cs_CZ.UTF-8", "name": "Czech (Czech Republic)" },
  { "locale": "hu_HU.UTF-8", "name": "Hungarian (Hungary)" },
  { "locale": "el_GR.UTF-8", "name": "Greek (Greece)" },
  { "locale": "he_IL.UTF-8", "name": "Hebrew (Israel)" },
  { "locale": "th_TH.UTF-8", "name": "Thai (Thailand)" },
  { "locale": "vi_VN.UTF-8", "name": "Vietnamese (Vietnam)" },
  { "locale": "uk_UA.UTF-8", "name": "Ukrainian (Ukraine)" },
  { "locale": "id_ID.UTF-8", "name": "Indonesian (Indonesia)" },
  { "locale": "ms_MY.UTF-8", "name": "Malay (Malaysia)" },
  { "locale": "fa_IR.UTF-8", "name": "Persian (Iran)" },
  { "locale": "ro_RO.UTF-8", "name": "Romanian (Romania)" },
  { "locale": "bg_BG.UTF-8", "name": "Bulgarian (Bulgaria)" },
  { "locale": "sl_SI.UTF-8", "name": "Slovenian (Slovenia)" },
  { "locale": "hr_HR.UTF-8", "name": "Croatian (Croatia)" },
  { "locale": "sk_SK.UTF-8", "name": "Slovak (Slovakia)" },
  { "locale": "et_EE.UTF-8", "name": "Estonian (Estonia)" },
  { "locale": "lt_LT.UTF-8", "name": "Lithuanian (Lithuania)" },
  { "locale": "lv_LV.UTF-8", "name": "Latvian (Latvia)" },
  { "locale": "is_IS.UTF-8", "name": "Icelandic (Iceland)" }
]


// Generate Timezones

var timezoneSelect = document.querySelector("#timezone-list")!

for (var i = 0; i < tzStrings.length; i++) {
  var tz = tzStrings[i],
    option = document.createElement("option");

  option.value = tz.value
  option.appendChild(document.createTextNode(tz.label))
  timezoneSelect.appendChild(option)
}

// Generate Locales

var localeSelect = document.querySelector("#locale-list")!

for (var i = 0; i < localeList.length; i++) {
  var locale = localeList[i],
    option = document.createElement("option");

  option.value = locale.locale
  option.appendChild(document.createTextNode(locale.name))
  localeSelect.appendChild(option)
}
