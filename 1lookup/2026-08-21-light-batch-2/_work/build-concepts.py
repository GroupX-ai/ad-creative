#!/usr/bin/env python3
"""Build concepts.json for the 2026-08-21 light batch 2.

Written by hand against the rulebook in ../../2026-08-21-light-batch/_work/RULEBOOK.json
rather than generated, because batch 1 established the recipe and the remaining risk is
per-concept craft, not direction.

Brief: "New ones are significantly better. Make more of these please (unique, disruptive)."
So this batch is weighted to Printed Matter, the borrowed-grammar system that produced
fight-card and public-notice, plus three flat-colour posters (cheapest, lowest render risk,
best proven display economics) and one more face.

Every claim traces to the approved bank in 1Lookup-Marketing/AD-CREATIVE-PLAYBOOK.md.
DATA_PRODUCT_COUNT re-read from 1Lookup-Marketing/src/lib/products.ts and is 41.
"""
import json

# Closing constraint block. An unassigned layout slot always gets filled with invented
# copy, so every prompt ends with a closed inventory of the only text allowed.
def tail(inventory):
    return (
        " US English spelling and US punctuation throughout, for a United States business "
        "audience, no British spellings and no British vocabulary. The ONLY text anywhere in "
        f"this image is: {inventory}. Nothing else whatsoever. No extra headline, no "
        "subheadline beyond what is listed, no body copy, no fine print, no feature chips, no "
        "badges, no captions, no timestamps, no page numbers, no taglines, no statistics, no "
        "percent sign, no currency symbol, no dollar sign, no watermark, no web address, no "
        "phone number other than any listed above, no company name other than 1lookup, no "
        "third-party brand name or logo of any kind, no drawn logo mark or symbol or icon "
        "representing 1lookup, no second button, no rounded call-to-action pill painted over "
        "the photograph, no arrow. The wordmark, where listed, is always the numeral one "
        "immediately followed by the lowercase word lookup as a single word, \"1lookup\", "
        "never \"1Lookup\" with a capital L and never two words. Every letter crisp, correctly "
        "spelled and fully inside the frame with clear margins on all four sides; shrink the "
        "type until every word fits whole rather than cropping any letter. "
        "No rim lighting, no back lighting, no volumetric fog, no haze, no god rays, no lens "
        "flare, no wet or mirror-reflective floor, no floating dust or ember particles, no "
        "teal-orange cinematic colour grading, no gradient, no vignette, no glow, no neon. "
        "One light source, one shadow direction, natural contact shadows where objects touch."
    )


def photo(shape, subject, inventory):
    """A real object photographed flat-on in daylight. Never an object in a void."""
    frame = ("square 1024 by 1024 composition" if shape == "square"
             else "wide landscape 1200 by 624 composition")
    return (
        f"A photograph, {frame}, not a designed graphic and not a screenshot. {subject} "
        "Shot on a phone in real available daylight, slightly off-square so the object is not "
        "perfectly parallel to the frame, with visible surface texture and one natural soft "
        "contact shadow where the object meets the surface beneath it. Flat overcast daylight, "
        "soft and even, no direct sun, no sparkle, no studio lighting. Authentic material "
        "imperfection: paper tooth, a soft fold crease, a slight thumb smudge, faintly uneven "
        "ink absorption. The object is a real physical thing inside a photograph and rests on "
        "a real surface; nothing floats." + tail(inventory)
    )


def flat(shape, ground_name, ground_hex, ink, lines, wordmark_ink):
    """The Economist construction: flat colour field, typography, nothing else."""
    frame = "square" if shape == "square" else "wide landscape"
    quoted = " then ".join(f'"{l}"' for l in lines)
    inv = ", ".join(f'"{l}"' for l in lines) + ', and the wordmark "1lookup"'
    return (
        f"A flat printed poster, {frame} format, not a photograph and not a screenshot. The "
        f"entire image is one solid, absolutely even field of {ground_name}, hex {ground_hex}, "
        "edge to edge and corner to corner. The colour is completely flat: no gradient, no "
        "shading, no vignette, no glow, no texture, no noise, no drop shadow, no border, no "
        "frame, no object, no illustration, no icon, no photograph, no scene, no surface, no "
        "depth and no perspective anywhere in the image. Set on this field, left aligned with a "
        "ragged right edge, occupying the upper two thirds, inside a text column beginning about "
        "one tenth of the image width in from the left edge and one tenth of the image height "
        f"down from the top: {len(lines)} lines of very heavy, wide, geometric sans-serif "
        f"capital letters in {ink}, tightly leaded so the lines almost touch. Set the type as "
        "large as it will go while every line fits the column: the longest line should very "
        "nearly fill the column width and the capitals must be at least one tenth of the image "
        f"height tall. The lines read exactly, one line each, in this order: {quoted}. "
        "In the lower left corner, on the same left margin, one small wordmark reading exactly "
        f"\"1lookup\" in the same heavy geometric sans-serif in {wordmark_ink}, about one "
        "twenty-fifth of the image height tall. All text sits inside the central 80 percent of "
        "the frame." + tail(inv)
    )


C = []

# ---------------------------------------------------------------- Printed Matter (6)
C.append(dict(
    id="phonebook-daily", name="The Phone Book, Updated Daily", system="Printed Matter",
    headline="UPDATED DAILY.", support="Daily FCC & Carrier Data Updates.",
    cta_in_scene="", ground_hex="#F2E8C9", predicted_luminance=180,
    claims_used=['"Daily FCC & Carrier Data Updates" (approved bank, verbatim as the support line)'],
    why_it_stops_a_scroll=(
        "A printed telephone directory is the single most obsolete object in this category and "
        "nobody expects to see one in a feed. The joke lands before any claim is read: the thing "
        "everyone knows is out of date the day it is printed, stamped UPDATED DAILY."),
    buyer_signal=(
        "Anyone who has worked a call list knows exactly what a stale directory costs. A tourist "
        "reads it as nostalgia and scrolls; an ops lead reads it as their own CRM."),
    render_risk=(
        "A directory page is the highest garble surface there is: the model will try to write "
        "thousands of tiny names and numbers and will invent third-party businesses. The prompt "
        "makes every listing an unreadable grey ruled line with no letterforms at all, and puts "
        "the only readable words in the rubber stamp and the one highlighted row."),
    subject_square=(
        "An open printed telephone directory lying flat on a pale wooden desk, photographed from "
        "directly overhead, the page filling about 88 percent of the frame. The paper is thin, "
        "yellowed newsprint stock, colour #F2E8C9, with visible fibre and one soft curl at the "
        "outer edge. The directory listings are rendered as a dense double column of small, "
        "even, unreadable grey horizontal rules standing in for lines of type: there are NO "
        "readable letters, NO names, NO numbers and NO words anywhere in those two columns, only "
        "abstract grey line texture. Across the middle of the page, printed at a slight angle as "
        "a real rubber ink stamp in deep green ink #10B981, partly broken where the stamp lifted, "
        "reading exactly: \"UPDATED DAILY.\" Directly beneath the stamp, one line of small, "
        "clean, near-black printed type reading exactly: \"Daily FCC & Carrier Data Updates.\" "
        "In the bottom right corner of the page, small near-black lowercase type reading exactly: "
        "\"1lookup\"."),
    subject_landscape=(
        "An open printed telephone directory lying flat on a pale wooden desk, photographed from "
        "directly overhead in a wide crop across the open spread, the pages filling the full "
        "width of the frame. The paper is thin, yellowed newsprint stock, colour #F2E8C9, with "
        "visible fibre and one soft curl at the outer edge. The directory listings are rendered "
        "as dense columns of small, even, unreadable grey horizontal rules standing in for lines "
        "of type: there are NO readable letters, NO names, NO numbers and NO words anywhere in "
        "those columns, only abstract grey line texture. Across the centre of the spread, printed "
        "at a slight angle as a real rubber ink stamp in deep green ink #10B981, partly broken "
        "where the stamp lifted, reading exactly: \"UPDATED DAILY.\" Directly beneath the stamp, "
        "one line of small, clean, near-black printed type reading exactly: \"Daily FCC & Carrier "
        "Data Updates.\" In the bottom right corner, small near-black lowercase type reading "
        "exactly: \"1lookup\"."),
    inventory=('the stamped words "UPDATED DAILY.", the line "Daily FCC & Carrier Data Updates.", '
               'and the wordmark "1lookup"'),
))

C.append(dict(
    id="splitflap-board", name="Every Contact On The Board", system="Printed Matter",
    headline="PHONE / EMAIL / DOMAIN / IP, all VALID",
    support="Validate Any Phone, Email, or Domain.", cta_in_scene="",
    ground_hex="#1E3A5F", predicted_luminance=126,
    claims_used=['"Validate Any Phone, Email, or Domain." (approved bank, verbatim)',
                 'Status words are the product\'s own three-state output, not a claim'],
    why_it_stops_a_scroll=(
        "A split-flap departure board is a machine everyone has stared at while waiting, and the "
        "eye reads a column of green VALID before it reads anything else. The colour does the "
        "work, which is exactly what was missing when the only hue was one blue button."),
    buyer_signal=(
        "The four rows name the four things 1Lookup checks. A buyer holding four vendor "
        "contracts reads their own stack on one board."),
    render_risk=(
        "Split-flap character tiles are where letters double or drop. Every string is four to six "
        "characters, all capitals, no punctuation, and the row count is fixed at four so the "
        "model cannot invent a fifth destination row."),
    subject_square=(
        "A close photograph of a real mechanical split-flap departure board mounted on a wall in "
        "an airport concourse in the United States, shot square on from about six feet in "
        "daylight coming through a window off to the left, the board filling about 92 percent of "
        "the frame. The board housing is deep navy #1E3A5F painted metal with visible scuffs and "
        "two exposed screw heads. The board carries EXACTLY four rows and no more, each row made "
        "of physical white-on-black character flaps with visible horizontal seams across every "
        "character and one flap in the second row caught mid-rotation. Reading down, the left "
        "column of the four rows reads exactly: \"PHONE\", \"EMAIL\", \"DOMAIN\", \"IP\". The "
        "right column of all four rows reads exactly \"VALID\" in each row, and those four VALID "
        "flaps are backlit-free flat green #10B981 flaps with black letters. There is no third "
        "column, no time column, no gate column and no row other than those four. Above the four "
        "rows, one printed header strip on the housing in small clean white capitals reading "
        "exactly: \"VALIDATE ANY PHONE, EMAIL, OR DOMAIN.\" On the lower right of the housing, "
        "small white lowercase type reading exactly: \"1lookup\"."),
    subject_landscape=(
        "A close photograph of a real mechanical split-flap departure board mounted on a wall in "
        "an airport concourse in the United States, shot square on from about six feet in "
        "daylight coming through a window off to the left, the board filling the full width of "
        "the frame. The board housing is deep navy #1E3A5F painted metal with visible scuffs and "
        "two exposed screw heads. The board carries EXACTLY four rows and no more, each row made "
        "of physical white-on-black character flaps with visible horizontal seams across every "
        "character and one flap in the second row caught mid-rotation. Reading down, the left "
        "column of the four rows reads exactly: \"PHONE\", \"EMAIL\", \"DOMAIN\", \"IP\". The "
        "right column of all four rows reads exactly \"VALID\" in each row, and those four VALID "
        "flaps are flat green #10B981 flaps with black letters. There is no third column, no time "
        "column, no gate column and no row other than those four. Above the four rows, one "
        "printed header strip on the housing in small clean white capitals reading exactly: "
        "\"VALIDATE ANY PHONE, EMAIL, OR DOMAIN.\" On the lower right of the housing, small white "
        "lowercase type reading exactly: \"1lookup\"."),
    inventory=('the four left-column words "PHONE", "EMAIL", "DOMAIN", "IP", the word "VALID" '
               'repeated once in each of the four rows, the header "VALIDATE ANY PHONE, EMAIL, OR '
               'DOMAIN.", and the wordmark "1lookup"'),
))

C.append(dict(
    id="diner-menu", name="Today's Special", system="Printed Matter",
    headline="TODAY'S SPECIAL", support="41 DATA PRODUCTS. ONE API KEY.",
    cta_in_scene="", ground_hex="#FBF7EC", predicted_luminance=195,
    claims_used=['"41 data products on one API key" (approved bank, split across two printed lines)'],
    why_it_stops_a_scroll=(
        "A diner specials card is a format the eye reads as information rather than advertising, "
        "and it makes 41 products feel like an amount of food rather than a feature list."),
    buyer_signal=(
        "One API key on a menu reads as one bill. The person who feels that is the one currently "
        "reconciling four vendor invoices."),
    render_risk=(
        "A menu invites the model to fill the card with invented dishes and prices, and a price "
        "near the numeral 41 would read as a plan cost. The prompt forbids any currency symbol "
        "and states the card carries only three lines."),
    subject_square=(
        "A single printed diner specials card standing in a chrome table-tent holder on a scuffed "
        "cream formica counter in an American diner, photographed straight on from across the "
        "counter, the card filling about 80 percent of the frame. The card is uncoated off-white "
        "stock #FBF7EC with one soft corner bend and a faint coffee ring on the counter beside "
        "it. Printed in two ink colours only, near-black #111827 and a warm red #C0392B. Reading "
        "down the card: first, in letterspaced red capitals across the top, exactly \"TODAY'S "
        "SPECIAL\"; second, one thin red rule the full width; third, the largest type on the "
        "card by far, heavy near-black condensed capitals on two lines, the upper reading exactly "
        "\"41 DATA PRODUCTS.\" and the lower reading exactly \"ONE API KEY.\"; fourth, at the "
        "very bottom in small near-black lowercase, exactly \"1lookup\". There are no dishes, no "
        "menu items, no prices, no numerals other than the 41, and no other line of any kind on "
        "the card. Out of focus behind: a plain counter edge and a napkin dispenser with no "
        "writing on it."),
    subject_landscape=(
        "A single wide printed diner specials card lying flat on a scuffed cream formica counter "
        "in an American diner, photographed from slightly above and straight on, the card filling "
        "the full width of the frame. The card is uncoated off-white stock #FBF7EC with one soft "
        "corner bend and a faint coffee ring on the counter beside it. Printed in two ink colours "
        "only, near-black #111827 and a warm red #C0392B. Reading down the card: first, in "
        "letterspaced red capitals across the top, exactly \"TODAY'S SPECIAL\"; second, one thin "
        "red rule the full width; third, the largest type on the card by far, heavy near-black "
        "condensed capitals on two lines, the upper reading exactly \"41 DATA PRODUCTS.\" and the "
        "lower reading exactly \"ONE API KEY.\"; fourth, at the bottom right in small near-black "
        "lowercase, exactly \"1lookup\". There are no dishes, no menu items, no prices, no "
        "numerals other than the 41, and no other line of any kind on the card."),
    inventory=('"TODAY\'S SPECIAL", "41 DATA PRODUCTS.", "ONE API KEY.", and the wordmark "1lookup"'),
))

C.append(dict(
    id="ransom-note", name="Validate Anything", system="Printed Matter",
    headline="VALIDATE ANYTHING", support="", cta_in_scene="",
    ground_hex="#FAF7F0", predicted_luminance=190,
    claims_used=['"Validate Anything" (approved CTA label, no factual assertion)'],
    why_it_stops_a_scroll=(
        "Cut-and-glued magazine letters are the least corporate object available and read as "
        "handmade before they read as anything else. Two words is the whole ad."),
    buyer_signal=(
        "Deliberately low: this is the top-of-funnel attention slot in the batch. Qualification "
        "is carried by the other concepts."),
    render_risk=(
        "The highest garble risk in the batch by a distance, which is why it carries exactly "
        "seventeen letters across two words and no punctuation. Every letter is specified as an "
        "individually cut rectangle of paper. Budget re-rolls."),
    subject_square=(
        "An overhead photograph of a sheet of plain off-white paper #FAF7F0 lying on a pale grey "
        "desk, the sheet filling about 85 percent of the square frame, photographed straight down "
        "in flat window daylight. Glued to the sheet, in the ransom-note style, are individually "
        "cut rectangles of paper torn and scissor-cut from magazines and newspapers, each "
        "carrying ONE printed letter, in mismatched typefaces, sizes, weights and paper colours, "
        "each pasted at a slightly different angle with visible glue wrinkle and a small drop "
        "shadow where the paper lifts. Together the cut letters spell exactly two words across "
        "two lines, the upper line reading \"VALIDATE\" and the lower line reading \"ANYTHING\". "
        "Every letter is clearly formed and instantly readable despite the mismatched styles. "
        "There is no third word, no punctuation, no exclamation mark and no other cut letter "
        "anywhere on the sheet. In the bottom right corner of the sheet, written small and neatly "
        "by hand in black ballpoint, exactly: \"1lookup\"."),
    subject_landscape=(
        "An overhead photograph of a wide sheet of plain off-white paper #FAF7F0 lying on a pale "
        "grey desk, the sheet filling the full width of the frame, photographed straight down in "
        "flat window daylight. Glued to the sheet, in the ransom-note style, are individually cut "
        "rectangles of paper torn and scissor-cut from magazines and newspapers, each carrying "
        "ONE printed letter, in mismatched typefaces, sizes, weights and paper colours, each "
        "pasted at a slightly different angle with visible glue wrinkle and a small drop shadow "
        "where the paper lifts. Together the cut letters spell exactly two words on a single line "
        "across the sheet, reading \"VALIDATE ANYTHING\". Every letter is clearly formed and "
        "instantly readable despite the mismatched styles. There is no third word, no "
        "punctuation, no exclamation mark and no other cut letter anywhere on the sheet. In the "
        "bottom right corner of the sheet, written small and neatly by hand in black ballpoint, "
        "exactly: \"1lookup\"."),
    inventory='the cut-letter words "VALIDATE" and "ANYTHING", and the handwritten "1lookup"',
))

C.append(dict(
    id="paint-chips", name="Every Contact, Colour Coded", system="Printed Matter",
    headline="VALID / RISKY / INVALID", support="0-100 risk score on every lookup.",
    cta_in_scene="", ground_hex="#F5F5F4", predicted_luminance=200,
    claims_used=['"0-100 risk score" (approved bank, rendered as the support line)',
                 'The three state words are the product\'s own output, not a claim'],
    why_it_stops_a_scroll=(
        "A hardware-store paint fan is a physical object nobody has used to sell software, and it "
        "carries the product's real three-state colour system as its entire structure. This is "
        "the direct answer to there being no colour in the frame beyond a blue button."),
    buyer_signal=(
        "The three states plus a 0-100 score is precisely what a fraud or lifecycle person "
        "already works in. It is the product's output, shown as an object."),
    render_risk=(
        "Fan decks invite invented colour names and paint codes on every chip. The prompt states "
        "that only three chips carry any text and every other chip is blank."),
    subject_square=(
        "An overhead photograph of a hardware-store paint colour fan deck lying open on a pale "
        "concrete surface in flat daylight, shot straight down, filling about 88 percent of the "
        "square frame. The deck is splayed into an arc from its single riveted pivot at the "
        "bottom left. Most of the chips are blank uncoated card in muted neutral greys and beiges "
        "with NO writing on them at all. Exactly three chips are pulled proud of the others and "
        "fanned clearly into view: the first is flat green #10B981 and carries one word in clean "
        "near-black capitals reading exactly \"VALID\"; the second is flat amber #F59E0B and "
        "carries one word reading exactly \"RISKY\"; the third is flat red #EF4444 and carries "
        "one word reading exactly \"INVALID\". No chip carries a colour name, a paint code, a "
        "number, a brand or any other word. Below the fan on the concrete, one line of small "
        "clean near-black printed type on a plain white card reading exactly: \"0-100 risk score "
        "on every lookup.\" and, on the line under it, smaller, exactly: \"1lookup\"."),
    subject_landscape=(
        "An overhead photograph of a hardware-store paint colour fan deck lying open on a pale "
        "concrete surface in flat daylight, shot straight down in a wide crop, the splayed fan "
        "occupying the right 55 percent of the frame from its single riveted pivot. Most of the "
        "chips are blank uncoated card in muted neutral greys and beiges with NO writing on them "
        "at all. Exactly three chips are pulled proud of the others and fanned clearly into view: "
        "the first is flat green #10B981 and carries one word in clean near-black capitals "
        "reading exactly \"VALID\"; the second is flat amber #F59E0B and carries one word reading "
        "exactly \"RISKY\"; the third is flat red #EF4444 and carries one word reading exactly "
        "\"INVALID\". No chip carries a colour name, a paint code, a number, a brand or any other "
        "word. On the empty concrete in the left 45 percent of the frame, one line of small clean "
        "near-black printed type on a plain white card reading exactly: \"0-100 risk score on "
        "every lookup.\" and, on the line under it, smaller, exactly: \"1lookup\"."),
    inventory=('the three chip words "VALID", "RISKY", "INVALID", the line "0-100 risk score on '
               'every lookup.", and the wordmark "1lookup"'),
))

C.append(dict(
    id="punch-card", name="Live In Five", system="Printed Matter",
    headline="LIVE IN 5 MINUTES OR LESS.", support="", cta_in_scene="Start For Free",
    ground_hex="#EFE6D2", predicted_luminance=178,
    claims_used=['"Live in 5 minutes or less" (approved bank, verbatim)',
                 '"Start For Free" (approved CTA label, printed on the card itself)'],
    why_it_stops_a_scroll=(
        "A coffee-shop punch card is an object people carry in a wallet, and five punched holes "
        "read as five minutes with no analogy to decode. The payoff is the object's own shape."),
    buyer_signal=(
        "Setup time is the objection that stops a self-serve API trial. Naming five minutes on a "
        "card that has already been punched five times answers it before the click."),
    render_risk=(
        "Punch cards invite invented loyalty copy and a coffee brand. The prompt fixes the hole "
        "count at five, states every circle is empty of text, and bans any other printing."),
    subject_square=(
        "An overhead photograph of a small printed punch card lying on a worn wooden cafe table "
        "in the United States in flat window daylight, shot straight down, the card filling about "
        "78 percent of the square frame and tilted a few degrees off square. The card is thick "
        "uncoated cream stock #EFE6D2 with rounded corners, visible paper tooth, one soft bend "
        "across a corner and a faint thumb smudge. Printed in near-black #111827 ink only, except "
        "one element noted below. Across the top of the card, heavy near-black capitals on two "
        "lines reading exactly \"LIVE IN 5 MINUTES\" then \"OR LESS.\" Below that, a single "
        "horizontal row of EXACTLY five printed circles and no more; all five have been punched "
        "clean through the card, so the wooden tabletop is visible through each hole and the "
        "punched edges show a little paper burr. The circles carry no numbers, no letters and no "
        "words. At the bottom of the card, one small solid green #10B981 printed rectangle with "
        "reversed cream capitals inside it reading exactly \"START FOR FREE\". In the bottom "
        "right corner of the card, small near-black lowercase reading exactly \"1lookup\"."),
    subject_landscape=(
        "An overhead photograph of a small printed punch card lying on a worn wooden cafe table "
        "in the United States in flat window daylight, shot straight down in a wide crop, the "
        "card filling about 70 percent of the frame width and tilted a few degrees off square. "
        "The card is thick uncoated cream stock #EFE6D2 with rounded corners, visible paper "
        "tooth, one soft bend across a corner and a faint thumb smudge. Printed in near-black "
        "#111827 ink only, except one element noted below. On the left of the card, heavy "
        "near-black capitals on two lines reading exactly \"LIVE IN 5 MINUTES\" then \"OR LESS.\" "
        "To the right of the type, a single horizontal row of EXACTLY five printed circles and no "
        "more; all five have been punched clean through the card, so the wooden tabletop is "
        "visible through each hole and the punched edges show a little paper burr. The circles "
        "carry no numbers, no letters and no words. Beneath the type, one small solid green "
        "#10B981 printed rectangle with reversed cream capitals inside it reading exactly \"START "
        "FOR FREE\". In the bottom right corner of the card, small near-black lowercase reading "
        "exactly \"1lookup\"."),
    inventory=('"LIVE IN 5 MINUTES", "OR LESS.", "START FOR FREE", and the wordmark "1lookup"'),
))

# ---------------------------------------------------------------- Flat Field (3)
FLATS = [
    ("flat-200-countries", "Two Hundred Countries", "cobalt blue", "#1D4ED8",
     "white", "white", ["200+ COUNTRIES.", "ONE API KEY."], 96,
     ['"200+ Countries Covered" (approved bank)', '"41 data products on one API key" (the one-key half)'],
     "Coverage is the objection that kills an international list, and two flat lines answer it faster than any diagram.",
     "A buyer with EU or LATAM contacts self-selects on the first line. A US-only buyer scrolls, which is correct.",
     "The plus sign after 200 is the garble point and is specified as a plus, never a percent sign."),
    ("flat-7-days", "Seven Days Free", "vermilion red", "#E3120B",
     "white", "white", ["7 DAYS FREE.", "NO CONTRACTS."], 110,
     ['"7-day free trial" (approved bank)', '"No contracts" (approved bank, verbatim)'],
     "The offer with nothing else on the canvas. This is the exact Economist construction that booked 64,000 subscriptions at 25:1, applied to the only two words that answer what it costs me.",
     "No contracts is a procurement sentence. It filters for the self-serve buyer who saves a card, which is the money event.",
     "The digit 7 and the hyphen are the garble points; the hyphen is removed entirely by writing 7 DAYS rather than 7-DAY."),
    ("flat-1000-rpm", "A Thousand A Minute", "verify green", "#10B981",
     "near-black #111827", "near-black #111827", ["1,000 REQUESTS", "A MINUTE.", "INCLUDED."], 150,
     ['"1,000 Requests/min Included" (approved bank, expanded to plain English)'],
     "A concrete throughput number reads as proof rather than a claim, and INCLUDED on its own line is the part that surprises someone who has been metered by a competitor.",
     "Rate limits are a developer and RevOps concern exclusively. Nobody else reads this line at all, which is the point.",
     "The comma inside 1,000 is the single garble point and is specified explicitly as a comma."),
]
for cid, name, gname, ghex, ink, wmink, lines, lum, claims, why, sig, risk in FLATS:
    C.append(dict(
        id=cid, name=name, system="Flat Field", headline=" ".join(lines), support="",
        cta_in_scene="", ground_hex=ghex, predicted_luminance=lum, claims_used=claims,
        why_it_stops_a_scroll=why, buyer_signal=sig, render_risk=risk,
        fal_prompt_square=flat("square", gname, ghex, ink, lines, wmink),
        fal_prompt_landscape=flat("landscape", gname, ghex, ink, lines, wmink),
    ))

# ---------------------------------------------------------------- Desk Light (1)
C.append(dict(
    id="desk-lifecycle-send", name="Send To The Live Ones", system="Desk Light",
    headline="SEND TO THE LIVE ONES.", support="Validate Any Phone, Email, or Domain.",
    cta_in_scene="", ground_hex="#F4F4F5", predicted_luminance=175,
    claims_used=['"Validate Any Phone, Email, or Domain." (approved bank, verbatim support line)',
                 'Screen shows only the approved status output, no invented metric'],
    why_it_stops_a_scroll=(
        "The third role and the third face. Faces are one of only four things eye-tracking shows "
        "reliably break banner blindness, and this batch adds a lifecycle marketer to the sales "
        "ops lead and the engineer already shipped."),
    buyer_signal=(
        "A list of email addresses with green statuses is the lifecycle marketer's own screen the "
        "morning before a send."),
    render_risk=(
        "Stock-photo drift is the failure mode. The prompt bans every stock pose, requires gaze "
        "down at the screen rather than at camera, and forbids any readable brand mark in the room."),
    subject_square=(
        "A candid documentary photograph, square composition, of a real United States lifecycle "
        "marketer in her thirties at her own desk, taken by a coworker on a phone in available "
        "window daylight falling from camera left. The square canvas is split vertically with no "
        "line, border or gap: the LEFT 45 percent is a flat solid pale grey panel #F4F4F5 "
        "carrying type, and the RIGHT 55 percent is the photograph running full bleed to the top, "
        "right and bottom edges. On the grey panel, left aligned: heavy near-black #111827 "
        "geometric sans-serif capitals on three lines reading exactly \"SEND TO\" then \"THE "
        "LIVE\" then \"ONES.\"; beneath that at about one third the size, in the same near-black, "
        "two lines reading exactly \"Validate Any Phone, Email, or\" then \"Domain.\"; and in the "
        "lower left corner of the panel the wordmark reading exactly \"1lookup\" with the numeral "
        "one in blue #3B82F6 and the word lookup in near-black. In the photograph: the woman is "
        "seen from the waist up in three-quarter profile, turned toward a laptop, her gaze "
        "directed DOWN at the laptop screen and never at the camera, mid-action with one hand "
        "resting on the trackpad. She wears a plain knit sweater in a muted colour with no logo, "
        "no slogan and no graphic on it. The laptop screen is the brightest object in the frame "
        "and shows a plain white light-mode list of five rows, each row a generic email address "
        "on the left and a small flat green pill on the right reading exactly \"Valid\" in every "
        "one of the five rows; the email addresses are rendered as short unreadable grey word "
        "shapes with no legible letters, so the only readable word on the screen is \"Valid\". "
        "The desk carries real clutter photographed as found: a plain ceramic mug, a coiled "
        "cable, a small plant in a terracotta pot, a paper notebook lying closed. Shot around f/2.8 "
        "so the room behind falls away softly. Slightly off-horizon framing and a faint focus "
        "miss, so it reads as a real phone photograph and never as stock photography or as an "
        "advertisement. Absolutely no stock-photo posing: no arms crossed, no headset, no "
        "call-centre smile, no handshake, no pointing at the monitor, no thumbs up, no perfect "
        "teeth, no colour grading. No second screen, no external monitor, no phone in shot, no "
        "second person, no lanyard, no laptop sticker, no readable signage, no whiteboard and no "
        "brand mark on any object in the room."),
    subject_landscape=(
        "A candid documentary photograph, wide landscape composition, of a real United States "
        "lifecycle marketer in her thirties at her own desk, taken by a coworker on a phone in "
        "available window daylight falling from camera left. The wide canvas is split vertically "
        "with no line, border or gap: the LEFT 52 percent is a flat solid pale grey panel #F4F4F5 "
        "carrying type, and the RIGHT 48 percent is the photograph running full bleed to the top, "
        "right and bottom edges. On the grey panel, left aligned: heavy near-black #111827 "
        "geometric sans-serif capitals on two lines reading exactly \"SEND TO THE\" then \"LIVE "
        "ONES.\"; beneath that at about one third the size, in the same near-black, one line "
        "reading exactly \"Validate Any Phone, Email, or Domain.\"; and in the lower left corner "
        "of the panel the wordmark reading exactly \"1lookup\" with the numeral one in blue "
        "#3B82F6 and the word lookup in near-black. In the photograph: the woman is seen from the "
        "waist up in three-quarter profile, turned toward a laptop, her gaze directed DOWN at the "
        "laptop screen and never at the camera, mid-action with one hand resting on the trackpad. "
        "She wears a plain knit sweater in a muted colour with no logo, no slogan and no graphic "
        "on it. The laptop screen is the brightest object in the frame and shows a plain white "
        "light-mode list of five rows, each row a generic email address on the left and a small "
        "flat green pill on the right reading exactly \"Valid\" in every one of the five rows; "
        "the email addresses are rendered as short unreadable grey word shapes with no legible "
        "letters, so the only readable word on the screen is \"Valid\". The desk carries real "
        "clutter photographed as found: a plain ceramic mug, a coiled cable, a small plant in a "
        "terracotta pot, a paper notebook lying closed. Shot around f/2.8 so the room behind "
        "falls away softly. Slightly off-horizon framing and a faint focus miss, so it reads as a "
        "real phone photograph and never as stock photography or as an advertisement. Absolutely "
        "no stock-photo posing: no arms crossed, no headset, no call-centre smile, no handshake, "
        "no pointing at the monitor, no thumbs up, no perfect teeth, no colour grading. No second "
        "screen, no external monitor, no phone in shot, no second person, no lanyard, no laptop "
        "sticker, no readable signage, no whiteboard and no brand mark on any object in the room."),
    inventory=('the headline words "SEND TO", "THE LIVE", "ONES.", the line "Validate Any Phone, '
               'Email, or Domain.", the word "Valid" repeated once in each of the five screen '
               'rows, and the wordmark "1lookup"'),
))

# Assemble photo-based prompts for everything that supplied a subject.
for i, c in enumerate(C, 1):
    c["rank"] = i
    if "fal_prompt_square" not in c:
        c["fal_prompt_square"] = photo("square", c.pop("subject_square"), c["inventory"])
        c["fal_prompt_landscape"] = photo("landscape", c.pop("subject_landscape"), c["inventory"])
        c.pop("inventory", None)

json.dump(C, open("concepts.json", "w"), indent=1)
print(f"wrote {len(C)} concepts")
for c in C:
    print(f"  {c['rank']:2} {c['id']:22} {c['system']:16} lum~{c['predicted_luminance']:3}  {c['headline'][:44]}")
