/* eslint-disable max-len */
const sad = [
    'In this game, there are two roles of "citizen" and "spy", each of which wins the game according to their goal.',
    "For each round, a place is specified that only the citizens know about.",
    "To win, citizens must try to find the spy or spies of the game and at the same time be careful not to reveal the place they have been told and, the spy must try to hide his role and guess what location the citizens were told.",
    "In this game, no one knows about another role, not even the spies",
];

const dsa = [
    "1) Role assignment: The phone goes hand in hand between players and everyone is told the role. If you are a citizen, in addition to the role, the place is also told.",
    "2) Begining of the game: The main part of the game is this stage, each player knows his role and everyone should win the game according to their goal. At this stage of the game a timer starts, citizens should find the spy by discussing, asking questions or doubting each other, and the spy should try not to reveal himself, keep himself away from the accusation. And from the conversations, try to figure out the place that was told to the citizens",
    "3) Voting: After the timer is over, the voting starts and everyone can vote for one or more people as spies according to the conversations that took place in the previous stage and their doubts about the people, the spies themselves can also vote.",
    "4) Result: Whoever gets the most votes is a loser, if that person is a spy, the citizens win and if that person is a citizen, the spy wins.",
    "5) Extra chance for the spy: If the citizen gets the most votes and the spy wins, the game is over, but if the spy gets the most votes, he is given another chance.",
    "If he can guess the location of the game regardless of the voting result, the spy will win the game, otherwise the citizens will win and the game will end.",
];

const score = [
    "1) If spies win the round:",
    "1. spy who guesses the location correctly gets 3 points",
    "2. spy who doesn't guess the location correctly gets 2 points",
    "3. citizen who guesses the spy correctly gets 1 point",
    "4. citizen who doesn't guess the spy correctly gets doesn't get any point",
    "2) If citizens win the round:",
    "1. spy doesn't get any point",
    "2. citizen who guesses the spy correctly gets 2 point",
    "3. citizen who doesn't guess the spy correctly gets 1 point",
];

const Guide = {
    header: "Guide",
    text: [
        {
            title: "How to play",
            description: sad.join("\n"),
        },
        {
            title: "Process of the game",
            description: dsa.join("\n"),
        },
        {
            title: "The scoring process of each round",
            description: score.join("\n"),
        },
    ],
};
export default Guide;

/*
`People in this game are divided into two categories: spy and citizen.
For each game, a place is specified that only the citizens know about.
Citizen's goal: The citizen should try to find the spy of the game, but at the same time not reveal the location of the game.
Spy target: The spy must keep his identity secret and try to guess the location of the game.
Game process:
1. First of all, the phone must goes hand in hand between players, so everyone understand their role. When you get the phone, you are spy or citizen, if you are a citizen, you also can see the specified place. (Note that
    No one knows other people's role!
    2. After announcing the roles, the game timer is activated and the most important part of the game starts. Meanwhile people have to try to accomplish their goals.
    This means that the citizens of the game should not and should not trust anyone in the first place.
    Amd they also should find the spy by doubting each other. They have to ask questions of other people in the game to figure out everyone's identity.
    For example, the place is "North Pole" and one person asks another "Have you ever been there?" And if that person doesn't quickly holds up, "No, I haven't gone yet," or says, "I have been there," or pauses for a moment, it turns out that he is a spy.
    In the meantime, the spies must try to keep their identities secret and also try to guess the location of the game from the conversations of the citizens.
    They also can mislead the citizens and turn the citizens' attention to one of themselves.
    3. After the game timer is over, voting takes place and everyone votes for the one they doubt the most (spies can also vote).
    If the person who gets the most votes is a spy, the citizens will win, otherwise the spies.
    Special point for spies: After voting, the identity of the spies will be revealed and the phone is given to them. If they can guess the location of the game, they will win regardless of the result of votes. So citizens should be careful not to reveal the location of game.
    Enjoy the game. 😉`,
    */

// Point for citizens: During the game, you will be given questions that you can use if you do not have a question.
