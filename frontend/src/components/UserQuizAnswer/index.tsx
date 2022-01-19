import { Choice } from '../../actions';
import UserQuizAnswer from './UserQuizAnswer';

export default UserQuizAnswer;

export const shuffleChoices = (choices: Choice[] | null): Choice[] | null => {
  if (!choices) return null;

  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
};
