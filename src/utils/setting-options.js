export const prayerTimeSettings = {
  calculationMethod: [
    { value: "MuslimWorldLeague", label: "Muslim World League" },
    { value: "MoonsightingCommittee", label: "Moonsighting Committee" },
    { value: "NorthAmerica", label: "ISNA" },
    { value: "Karachi", label: "Karachi" },
    { value: "Egyptian", label: "Egyptian General Authority" },
    { value: "UmmAlQura", label: "Umm al-Qura University" },
  ],
  madhab: [
    { value: "Shafi", label: "Shafi (Standard)" },
    { value: "Hanafi", label: "Hanafi" },
  ],
};

export const defaultSettings = {
  calculationMethod: "MuslimWorldLeague",
  madhab: "Shafi",
};
