const Vote = {
    header: "رای گیری",
    selectTheSpy: "جاسوس رو انتخاب کن",
    selectTheSpies: (spiesLength: number) =>
        `${spiesLength} جاسوس رو انتخاب کن`,
    backAlert: "مطمئنی؟ (با این کار پیشرفت بازیت پاک می شه!)",
    nextButtonTitle: "بعدی",
    finishButtonTitle: "اتمام",
    spiesLengthError: (spiesLength: number) =>
        `شما باید ${spiesLength} جاسوس را انتخاب کنی`,
};
export default Vote;
