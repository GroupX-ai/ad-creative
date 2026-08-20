// ESA Card | weird animals, round 2 | 2026-08-20
//
// Robby, after the first weird-animal batch produced three sales at $5.44 each against a
// $37.57 break-even:
//
//   "Also looks like the banner ads are working amazing - can you add more weird animals?
//    Should be the EXACT same banners, just more weird animals."
//
// So this file contains no layout of its own. `offer` and `forever` are IMPORTED from
// `../2026-08-19-weird-animals/prompts.mjs`, which is where the two winning posters are
// defined, so the cream, the indigo hex #2b2a5c, the marigold hex #f2a93b, the type
// hierarchy, the button, the corner wordmark, the RULES block and every word of copy are
// byte-identical to the batch that sold. They cannot drift, because they are not copied.
//
// **The animal is the only variable.** If a weird animal wins, the win is the animal.
//
// Claim safety is inherited with the copy: every line these posters render ("$39. One time.",
// "Emotional support animal certificate and ID card.", "No renewal fees, ever.",
// "$39. Once. Forever.", "Emotional support animal registration. No renewal fees.") is on the
// green list in `esacard.com/docs/ads/policy.md` §7. Nothing here promises housing, landlords,
// access, travel, therapists, evaluations or legal standing in either direction, and no line
// tells the reader what the product is not (§0).
//
// Square only, same as round 1: `p2-offer-square` and `p6-forever-square` carry the account's
// sales, Facebook Feed serves square, and the vertical cuts of these same two designs sold
// nothing.
//
// ── Layout split, and why it is not all Layout A ──
//
// All three of round 1's sales are Layout A, but Layout B is NOT a proven loser: its five
// banners took $1.71 and 81 impressions between them, which is a delivery difference and not
// a test. So this batch runs 10 A and 6 B, and the six B animals are drawn from across the
// strength ranking rather than being the leftovers, so Layout B finally gets a fair read
// instead of being confounded a second time.

import { offer, forever } from "../2026-08-19-weird-animals/prompts.mjs";

export const BANNERS = [
  // ── Layout A · "$39. One time." (all three of round 1's sales) ──

  // Real exotic pets: the lane the ball python and the baby alligator won in.
  { id: "x1-bearded-dragon", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a tan-and-cream bearded dragon lizard standing " +
      "side-on on all four legs, its spiky throat beard clearly visible, head raised and turned " +
      "toward the lens") },
  { id: "x2-ferret", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a sable-brown-and-cream ferret standing up on its " +
      "back legs with both front paws tucked against its chest, head raised toward the lens") },
  { id: "x3-leopard-gecko", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a yellow-and-black spotted leopard gecko standing " +
      "side-on with its thick banded tail curved behind it, its wide permanent smile turned toward " +
      "the lens") },
  { id: "x4-rat", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a fancy pet rat with a glossy hooded brown-and-white " +
      "coat, sitting up on its haunches and holding one tiny piece of food in both front paws") },
  { id: "x5-tortoise", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a large sulcata tortoise with a tall knobbly " +
      "sand-coloured shell and thick scaled elephantine legs, walking side-on with its neck fully " +
      "extended and its head raised toward the lens") },

  // Farm animals indoors: the lane the pot-bellied pig won in.
  { id: "x6-pygmy-goat", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a small black-and-white pygmy goat standing side-on " +
      "with short upright horns and one ear cocked, head turned toward the lens") },
  { id: "x7-donkey", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a miniature donkey with a soft shaggy grey coat and " +
      "enormous upright ears, standing side-on with its head turned toward the lens") },
  { id: "x8-runner-duck", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a fawn-and-white Indian runner duck standing bolt " +
      "upright like a skittle, side-on, its long neck vertical and its head turned toward the lens") },

  // Pattern breaks that are not really pets: the lane the egg opened.
  { id: "x9-capybara", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a capybara with coarse russet-brown fur sitting " +
      "calmly on its haunches side-on, its blunt square muzzle and half-closed serene eyes turned " +
      "toward the lens") },
  { id: "x10-opossum", shapes: ["square_hd"],
    prompt: offer("A cleanly cut-out photograph of a Virginia opossum with coarse grey-and-white fur, a " +
      "pale pointed face and a bright pink nose, standing on all fours side-on with its head turned " +
      "toward the lens") },

  // ── Layout B · "$39. Once. Forever." (six animals from across the ranking, so B gets a fair read) ──
  { id: "x11-corn-snake", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of an orange-and-red corn snake coiled into a neat " +
      "spiral, its head raised and resting calmly on the top coil") },
  { id: "x12-sphynx-cat", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a hairless sphynx cat with wrinkled warm-grey skin " +
      "and enormous upright ears, sitting upright side-on with its head turned toward the lens") },
  { id: "x13-sugar-glider", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a sugar glider with soft grey fur, a dark dorsal " +
      "stripe and enormous round black eyes, clinging upright to a short bare branch and facing the " +
      "lens") },
  { id: "x14-highland-cow", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a Highland cow calf with a long shaggy ginger coat " +
      "and a thick fringe hanging over its eyes, standing side-on with its head turned toward the " +
      "lens") },
  { id: "x15-alpaca", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a cream-coloured alpaca with a dense woolly fleece " +
      "and a tall fluffy neck, head raised, looking directly toward the lens with a mild curious " +
      "expression") },
  { id: "x16-tarantula", shapes: ["square_hd"],
    prompt: forever("A cleanly cut-out photograph of a Chilean rose hair tarantula with dense velvety " +
      "rose-brown hair, standing on all eight legs side-on") },
];
