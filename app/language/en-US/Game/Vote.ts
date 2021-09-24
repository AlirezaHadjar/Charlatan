const Vote = {
    header: "Vote",
    selectTheSpy: "Select The Spy",
    selectTheSpies: (spiesLength: number) => `Select ${spiesLength} Spies`,
    nextButtonTitle: "Next",
    backAlert: "Are You Sure? (By Doing This Your Game Progress will be Lost!)",
    finishButtonTitle: "Finish",
    spiesLengthError: (spiesLength: number) => {
        const spies = spiesLength > 1 ? "spies" : "spy";
        return `You must select ${spiesLength} ${spies}`;
    },
};
export default Vote;
