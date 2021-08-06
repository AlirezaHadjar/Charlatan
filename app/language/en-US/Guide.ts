/* eslint-disable max-len */
const Guide = {
    header: "Guide",
    text: `People in this game are divided into two categories: spy and citizen.
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
};
// Point for citizens: During the game, you will be given questions that you can use if you do not have a question.
export default Guide;
