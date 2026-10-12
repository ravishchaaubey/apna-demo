#!/usr/bin/env python3
"""Print a random word with the given number of letters.

Usage:
    python random_word.py 5
"""

import argparse
import random
import sys
from pathlib import Path

SYSTEM_DICTIONARY = Path("/usr/share/dict/words")

# Fallback word list used when no system dictionary is available.
BUILTIN_WORDS = """
a i
an at be by do go he if in is it me my no of on or so to up us we
and are bat big box cat cup dog egg fan fox hat ink jam key log map net
owl pen red sun top van web yak zip
bird blue cake desk fish frog game hill jump kite lamp moon nest open
park quiz rain ship tree wolf
apple beach chair dance eagle flame grape house juice knife lemon
music night ocean piano queen river snake tiger water zebra
anchor banana castle dragon forest garden hammer island jungle kitten
laptop magnet orange pencil rabbit silver turtle window
balloon cabinet diamond feather giraffe harmony iceberg jackets kingdom
library monster network octopus penguin rainbow sunrise thunder volcano
backpack calendar dinosaur elephant flamingo goldfish hospital
keyboard mountain notebook painting question sandwich triangle umbrella
adventure butterfly chocolate dandelion education fireworks
gardening happiness invention lightning marathon newspaper pineapple
basketball blackboard chandelier dictionary friendship generation
helicopter impossible television watermelon
accordionist breakthrough championship constellation
""".split()


def load_words():
    """Return a list of lowercase alphabetic words."""
    if SYSTEM_DICTIONARY.exists():
        words = SYSTEM_DICTIONARY.read_text(encoding="utf-8", errors="ignore").split()
        words = [w.lower() for w in words if w.isalpha() and w.isascii()]
        if words:
            return words
    return BUILTIN_WORDS


def random_word(length, words=None):
    """Return a random word with exactly `length` letters, or None if none exist."""
    candidates = [w for w in (words or load_words()) if len(w) == length]
    return random.choice(candidates) if candidates else None


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("length", type=int, help="number of letters in the word")
    args = parser.parse_args()

    if args.length < 1:
        parser.error("length must be a positive integer")

    word = random_word(args.length)
    if word is None:
        print(f"No words with {args.length} letters found.", file=sys.stderr)
        return 1

    print(word)
    return 0


if __name__ == "__main__":
    sys.exit(main())
