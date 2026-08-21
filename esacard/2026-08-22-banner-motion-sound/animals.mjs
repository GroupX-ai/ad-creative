// One row per banner: what the animal is, what it must visibly DO, and what it should sound
// like. The action line is the whole reason the batch works: a prompt that only says "subtle
// movement" produces an animal with its mouth clamped shut, and then the sound plays over a
// still face.
//
// `sound: null` means the animal is silent in real life. Those ship music-only rather than
// with an invented noise.
export const ANIMALS = {
  "w1-turtle-square":        { it: "a turtle", act: "stretches its neck forward and opens its beak-like mouth wide, twice, then blinks slowly", sound: "a turtle hissing softly, one short breathy hiss" },
  "w2-alligator-square":     { it: "a small young alligator", act: "opens its jaws WIDE, twice, showing the pale inside, holding open for a beat each time", sound: "a young alligator hissing, a low throaty rasp" },
  "w3-raven-square":         { it: "a black raven", act: "opens its beak WIDE, twice, throwing its head forward with each call, throat feathers ruffling", sound: "a raven croaking, two harsh deep caws" },
  "w4-snake-square":         { it: "a coiled ball python", act: "opens its mouth wide, twice, and flicks its forked tongue out between them", sound: "a snake hissing, one long dry hiss" },
  "w5-pig-square":           { it: "a small black and white pig", act: "opens its mouth twice and works its snout, ears flapping forward", sound: "a pig oinking, two short grunts" },
  "w6-egg-square":           { it: "a cartoon egg character with a drawn smiling face and little arms", act: "blinks, its smile widens and its small arms wave gently up and down", sound: null },
  "w7-hedgehog-square":      { it: "a hedgehog standing upright", act: "twitches its nose rapidly, opens its small mouth twice, and blinks", sound: "a hedgehog snuffling and giving two small squeaks" },
  "w8-chicken-square":       { it: "a speckled hen", act: "opens its beak WIDE, twice, jerking its head up with each call, comb wobbling", sound: "a chicken clucking, two clear clucks" },
  "w9-axolotl-square":       { it: "a pink axolotl", act: "flutters its feathery external gills and opens and closes its wide mouth twice", sound: "soft underwater bubbles, gentle and quiet" },
  "w10-cockatoo-square":     { it: "a white cockatoo with a yellow crest", act: "raises its yellow crest fully and opens its beak WIDE, twice, leaning forward with each call", sound: "a cockatoo screeching, two loud shrill calls" },
  "x1-bearded-dragon-square":{ it: "a bearded dragon lizard", act: "puffs out its spiny throat and opens its mouth WIDE, twice, holding it open for a beat", sound: "a bearded dragon hissing, one short hiss" },
  "x2-ferret-square":        { it: "a ferret standing upright", act: "opens its mouth twice in a chattering call, head tilting side to side between them", sound: "a ferret dooking, two quick chirpy chatters" },
  "x3-leopard-gecko-square": { it: "a leopard gecko", act: "opens its mouth twice and flicks its tongue up over its own eye", sound: "a gecko chirping, two small clicks" },
  "x4-rat-square":           { it: "a hooded pet rat sitting up", act: "twitches its whiskers fast and opens its mouth twice, front paws moving to its face", sound: "a rat squeaking, two tiny high squeaks" },
  "x5-tortoise-square":      { it: "a large tortoise", act: "stretches its neck out of the shell and opens its mouth wide, twice, then slowly blinks", sound: "a tortoise hissing softly, one slow breathy hiss" },
  "x6-pygmy-goat-square":    { it: "a black and white pygmy goat", act: "opens its mouth WIDE, twice, tipping its head up to bleat, ears flicking", sound: "a goat bleating, two clear bleats" },
  "x7-donkey-square":        { it: "a grey donkey", act: "opens its mouth WIDE, twice, showing its big front teeth and tipping its head back to bray, ears swivelling", sound: "a donkey braying, two loud hee-haw calls" },
  "x8-runner-duck-square":   { it: "an Indian runner duck standing upright", act: "opens its orange beak WIDE, twice, head tipping back with each quack", sound: "a duck quacking, two bright clear quacks" },
  "x9-capybara-square":      { it: "a capybara sitting", act: "opens its mouth twice, nose twitching, and blinks its sleepy eyes slowly", sound: "a capybara squeaking, two soft chirpy purrs" },
  "x10-opossum-square":      { it: "an opossum", act: "opens its long mouth WIDE, twice, showing its many small teeth, whiskers twitching", sound: "an opossum hissing, two short sharp hisses" },
  "x11-corn-snake-square":   { it: "a coiled orange corn snake", act: "opens its mouth wide, twice, and flicks its forked tongue out between them", sound: "a snake hissing, one long dry hiss" },
  "x12-sphynx-cat-square":   { it: "a hairless sphynx cat", act: "opens its mouth WIDE, twice, in a big meow, huge ears swivelling, eyes blinking", sound: "a cat meowing, two clear meows" },
  "x13-sugar-glider-square": { it: "a sugar glider", act: "opens its mouth twice in a chatter, huge dark eyes blinking, ears rotating", sound: "a sugar glider chattering, two quick rattling calls" },
  "x14-highland-cow-square": { it: "a shaggy ginger highland cow", act: "opens its mouth WIDE, twice, tipping its head up to low, long fringe swaying", sound: "a cow mooing, two deep long moos" },
  "x15-alpaca-square":       { it: "a cream alpaca", act: "opens its mouth twice, chewing sideways, ears pricking forward and back", sound: "an alpaca humming, two soft nasal hums" },
  "x16-tarantula-square":    { it: "a large brown tarantula", act: "shifts its front legs slowly and its pedipalps flex, body rising slightly", sound: null },
  "p1-carry-vertical":       { it: "a border terrier sitting on a rug beside a pair of hands holding an open wallet", act: "opens its mouth WIDE, twice, in a clear bark, head tipping with each one, ears lifting. The hands, the wallet and the room stay completely still", sound: "a small dog barking, two sharp clear barks" },
  "p2-offer-vertical":       { it: "a brown tabby cat sitting upright", act: "opens its mouth WIDE, twice, in a big meow, jaw dropping clearly each time, ears swivelling", sound: "a cat meowing, two clear meows" },
  "p2-offer-square":         { it: "a brown tabby cat sitting upright", act: "opens its mouth WIDE, twice, in a big meow, jaw dropping clearly each time, ears swivelling", sound: "a cat meowing, two clear meows" },
  "p6-forever-square":       { it: "a beagle sitting", act: "opens its mouth WIDE, twice, in a clear bark, head tipping back, long ears swinging", sound: "a beagle barking, two clear barks" },
  "p6-forever-vertical":     { it: "a beagle sitting", act: "opens its mouth WIDE, twice, in a clear bark, head tipping back, long ears swinging", sound: "a beagle barking, two clear barks" },
  "p12-no-subscription-vertical": { it: "a corgi sitting on a deep navy background", act: "opens its mouth WIDE, twice, in a clear bark, big ears twitching, tongue showing", sound: "a corgi barking, two bright clear barks" },
};
