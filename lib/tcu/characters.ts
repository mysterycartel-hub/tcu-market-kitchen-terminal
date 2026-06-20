export const CHARACTER_CARDS = [
  { name: "Trading Chef / Chef Maurice", description: "Clean setups are for disciplined students. Journal the logic and keep your plan simple." },
  { name: "Chef Goldie", description: "Gold setups need respect. Use the practice terminal to learn bias and risk without needing a broker." },
  { name: "Candle Kid", description: "Watch candle structure carefully. Market moves can switch quick, so note the story behind each bar." },
  { name: "Wickie", description: "Confirmation is the key. Don’t pretend it’s there until you can see the market agree." },
  { name: "Louie the Liquidity Chef", description: "Liquidity zones feed real moves. Mark them, then let the journal decide if the trade is strong enough." },
  { name: "Grandma Market", description: "Bias without structure is guesswork. Check the bigger picture and write your directional thesis." },
  { name: "Melissa Mayhem", description: "Emotional entries happen. When you feel pressure, note it and learn from the mistake." },
  { name: "Melody Mayhem", description: "Listen for market rhythm. Consistency comes from process, not from chasing signals." },
  { name: "Rico Rhythm", description: "Stay in tune with price movement. Use the practice mode to improve timing without risking capital." },
  { name: "Burn Alarm", description: "A missing stop is a red flag. Practice defining your burn point before you click save." },
  { name: "Profit Plate", description: "Targets belong in the plan. If it’s not there, the trade is still just an idea." },
  { name: "Penny / Angel Stacks", description: "Risk size should fit the plan. This terminal is for learning position sizing, not for real orders." },
  { name: "Nana Value", description: "Value areas matter. Use them to judge whether the market is offering a good setup." },
  { name: "Mr. Stocks", description: "Markets move with stories. Record yours clearly so you can review the lesson later." },
];

const CHARACTER_WARNING_MAP: Record<string, string> = {
  Bias: "Grandma Market recommends defining bias before entering.",
  Liquidity: "Louie the Liquidity Chef says mark your liquidity before you commit.",
  Confirmation: "Wickie wants confirmation in place before you trust the setup.",
  "Burn Point": "Burn Alarm is ringing because your stop or burn point is missing.",
  Targets: "Profit Plate reminds you to set at least one target for the plan.",
};

export function getCharacterWarningForMissing(step: string) {
  return CHARACTER_WARNING_MAP[step] || `Review ${step} with the coaching crew.`;
}
