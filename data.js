export const CLICK_AWAY_FACTOR = 0.69;

// Prevalence per 10,000 people (UK) from the DfE "How many people?" tool.
export const IMPAIRMENT_STATS = [
  { key: 'vision', label: 'Vision', per10k: 7700, source: 'https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment' },
  { key: 'low-numeracy', label: 'Low numeracy', per10k: 4900, source: 'https://www.nationalnumeracy.org.uk/research-and-resources/skills-life-survey-2011' },
  { key: 'mental-health', label: 'Mental health', per10k: 2900, source: 'https://researchbriefings.files.parliament.uk/documents/CBP-9602/CBP-9602.pdf' },
  { key: 'low-literacy-scotland', label: 'Low literacy (Scotland)', per10k: 2670, source: 'https://cdn.literacytrust.org.uk/media/documents/Adult_Literacy_2022_report_FINAL.pdf' },
  { key: 'dexterity', label: 'Dexterity impairment', per10k: 2300, source: 'https://researchbriefings.files.parliament.uk/documents/CBP-9602/CBP-9602.pdf' },
  { key: 'any-disability', label: 'Any disability', per10k: 2200, source: 'https://researchbriefings.files.parliament.uk/documents/CBP-9602/CBP-9602.pdf' },
  { key: 'hearing', label: 'Hearing loss', per10k: 1800, source: 'https://rnid.org.uk/about-us/research-and-policy/facts-and-figures/#:~:text=In%20the%20UK%20there%20are,to%201%20in%205%20adults' },
  { key: 'low-literacy-ni', label: 'Low literacy (N. Ireland)', per10k: 1740, source: 'https://cdn.literacytrust.org.uk/media/documents/Adult_Literacy_2022_report_FINAL.pdf' },
  { key: 'low-literacy-eng', label: 'Low literacy (England)', per10k: 1640, source: 'https://cdn.literacytrust.org.uk/media/documents/Adult_Literacy_2022_report_FINAL.pdf' },
  { key: 'low-literacy', label: 'Low literacy (general)', per10k: 1640, source: 'https://literacytrust.org.uk/parents-and-families/adult-literacy/what-do-adult-literacy-levels-mean/' },
  { key: 'anxiety', label: 'Anxiety disorder', per10k: 1500, source: 'https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/pawel-user-with-aspergers' },
  { key: 'low-literacy-wales', label: 'Low literacy (Wales)', per10k: 1200, source: 'https://cdn.literacytrust.org.uk/media/documents/Adult_Literacy_2022_report_FINAL.pdf' },
  { key: 'learning', label: 'Learning impairment', per10k: 1100, source: 'https://researchbriefings.files.parliament.uk/documents/CBP-9602/CBP-9602.pdf' },
  { key: 'memory', label: 'Memory impairment', per10k: 1100, source: 'https://researchbriefings.files.parliament.uk/documents/CBP-9602/CBP-9602.pdf' },
  { key: 'dyslexia', label: 'Dyslexia', per10k: 1000, source: 'https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles/simone-dyslexic-user' },
  { key: 'english-second', label: 'English not first language', per10k: 900, source: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/language/bulletins/languageenglandandwales/census2021' },
  { key: 'colour-men', label: 'Colour vision deficiency (Men)', per10k: 800, source: 'https://www.colourblindawareness.org/colour-blindness/' },
  { key: 'dyscalculia', label: 'Dyscalculia', per10k: 600, source: 'https://www.bdadyslexia.org.uk/dyscalculia/how-can-i-identify-dyscalculia' },
  { key: 'adhd-youth', label: 'ADHD (0-19)', per10k: 500, source: 'https://adhduk.co.uk/adhd-incidence/' },
  { key: 'adhd-adult', label: 'ADHD (20+)', per10k: 351, source: 'https://adhduk.co.uk/adhd-incidence/' },
  { key: 'bipolar', label: 'Bipolar disorder', per10k: 200, source: 'https://www.bipolaruk.org/faqs' },
  { key: 'autism', label: 'Autism', per10k: 150, source: 'https://www.autism.org.uk/advice-and-guidance/what-is-autism#:~:text=Autism%20is%20a%20lifelong%20developmental,and%20children%20in%20the%20UK.' },
  { key: 'javascript', label: 'Cannot use JavaScript', per10k: 111, source: 'https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/' },
  { key: 'colour-women', label: 'Colour vision deficiency (Women)', per10k: 80, source: 'https://www.colourblindawareness.org/colour-blindness/' },
  { key: 'parkinsons', label: 'Parkinson’s', per10k: 30, source: 'https://cks.nice.org.uk/topics/parkinsons-disease/background-information/prevalence/' },
  { key: 'ms', label: 'Multiple Sclerosis', per10k: 20, source: 'https://www.mssociety.org.uk/what-we-do/our-work/our-evidence/ms-in-the-uk' },
  { key: 'bsl', label: 'British Sign Language users', per10k: 17, source: 'https://bda.org.uk/help-resources/#BSL' },
  { key: 'cerebral-palsy', label: 'Cerebral Palsy', per10k: 16, source: 'https://www.scope.org.uk/advice-and-support/cerebral-palsy-introduction' },
];

const CURRENCY_LOCALES = {
  GBP: 'en-GB',
  USD: 'en-US',
  EUR: 'de-DE',
};

export function formatCurrency(value, currency = 'GBP') {
  const locale = CURRENCY_LOCALES[currency] || 'en-GB';
  if (Number.isNaN(value)) return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(0);
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value) {
  if (Number.isNaN(value)) return '0';
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value);
}

